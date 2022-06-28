<template>
    <div class="othertabpane8">
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="courtName" label="法院名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="downloadIp" label="下载IP" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="downloadPort" label="下载端口">
                </el-table-column>
                <el-table-column label="操作">
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
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addotherAlert8 ref="addotherAlert8" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addotherAlert8 from "./addotherAlert8" //添加弹框
    export default {
        name: "othertabpane8",
        components: {
            addotherAlert8
        },
        data() {
            return {
                ismain:false,
                tableData:[],
                total:0,
                pageIndex:1,//当前页码
                pageSize:10,
                multipleSelection:[]
            }
        },
        created() {
            this.getCourtDossierConfig()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取下载地址配置列表
            getCourtDossierConfig(){
                let {pageIndex,pageSize}=this;
                let _this=this;
                return _this.$http.post('/courtDossierConfig/getCourtDossierConfig',{
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtDossierConfig/getCourtDossierConfig')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //添加弹框
            add(){
                this.ismain=true;
                this.$refs.addotherAlert8.show();
            },
            //关闭添加弹框
            addlawsure(){
                let _this=this;
                if(!_this.$refs.addotherAlert8.isValidIP(_this.$refs.addotherAlert8.formLabelAlign.downloadIp)){
                    _this.$msgw("请输入有效IP")
                    return false;
                }
                if(!_this.$refs.addotherAlert8.isPort(_this.$refs.addotherAlert8.formLabelAlign.downloadPort)){
                    _this.$msgw("请输入有效端口")
                    return false;
                }
                _this.$refs.addotherAlert8.saveCourtDossierConfig().then(data=>{
                    _this.ismain=false;
                    _this.getCourtDossierConfig();
                })
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                this.$refs.addotherAlert8.show(row);

            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtDossierConfig/delCourtDossierConfig', {
                        chasId:row.courtCode//要删除的法院 id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getCourtDossierConfig();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtDossierConfig/delCourtDossierConfig')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getCourtDossierConfig();
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane8{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.1rem;
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
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>