<template>
    <div class="tabpanel">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="printServerName" label="打印服务器名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="printServerIp" label="IP地址" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="printServerPort" label="端口" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否默认打印服务器">
                    <template slot-scope="scope">
                        <div>{{scope.row.defaulty==true?'是':'否'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=pageSize
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <add-alert
                ref="addAlert"
                :alertshow="ismain"
                @selectshow="ismain=false"
                @qure="addlawsure"
                @cancel="ismain=false"
        />
    </div>
</template>

<script>
    import addAlert from "./addAlert1" //添加弹框
    import Tool from "../js/tools"
    export default {
        name: "tabpanel",
        components: {
            addAlert
        },
        data() {
            return {
                ismain:false,
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:0,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            getPrintServerConfigs(){
                let {pageIndex,pageSize}=this;
                const that=this;
                that.$showLoading('rgba')
                that.$http.post('/printServerConfig/getPrintServerConfigs', {
                    pageIndex,
                    pageSize
                }).then(data => {
                    that.$hideLoading('rgba')
                    if (data.code === 200) {
                        that.total=data.count;
                        that.tableData=data.data;
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideLoading('rgba')
                })
            },
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //添加弹框
            add(){
                this.ismain=true;
                this.$refs.addAlert.show()
            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                if(!formLabelAlign.printServerName){
                    this.$msgw("请输入打印服务器名称!")
                    return
                }
                if(!formLabelAlign.printServerIp){
                    this.$msgw("请输入IP地址!")
                    return
                }
                if(!formLabelAlign.printServerPort){
                    this.$msgw("请输入端口号!")
                    return
                }
                if(!Tool.isValidIP(formLabelAlign.printServerIp)){
                    this.$msgw("请输入有效IP地址!")
                    formLabelAlign.printServerIp='';
                    return
                }
                if(!Tool.isPort(formLabelAlign.printServerPort)){
                    this.$msgw("请输入有效端口号!")
                    formLabelAlign.printServerPort='';
                    return
                }
                const that=this;
                that.$showToast('正在保存...')
                that.$http.post('/printServerConfig/saveOrUpdatePrintServerConfig', {
                    printServer:formLabelAlign
                }).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.ismain=false;
                        that.$msgs('保存成功!');
                        that.getPrintServerConfigs()
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideToast()
                })
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                this.$refs.addAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                const _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/printServerConfig/deletePrintServerConfig',{
                        printServer:{
                            printServerId:row.printServerId
                        }
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getPrintServerConfigs()
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getPrintServerConfigs();
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpanel{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div.add{
                    img{
                        width:.8rem;
                    }
                }
            }
            .ri{
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: .1rem;

                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width: .9rem;
                    line-height: .36rem;
                    padding: 0;

                    .el-icon-search {
                        .f18();
                        color: #fff;
                    }

                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>