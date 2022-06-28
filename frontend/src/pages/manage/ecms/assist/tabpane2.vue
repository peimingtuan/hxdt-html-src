<template>
    <div class="tabpane2">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model.trim="keyWord" placeholder="按条件搜索"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search(keyWord)">搜索</el-button>
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
                <el-table-column prop="burnServerName" label="刻录服务器名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="burnServerIp" label="IP地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="burnServerPort" label="端口" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="manufacturerName" label="厂商" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否刻录服务器" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.defaulty?'是':'否'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.row)">修改</span>
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
        <addAlert2 ref="addAlert2" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addAlert2 from "./addAlert2" //添加弹框
    export default {
        name: "tabpane2",
        components: {
            addAlert2
        },
        data() {
            return {
                ismain:false,
                keyWord:"",//搜索
                tableData:[],
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10//每页大小
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //列表
            getBurnServerInfo(){
                let {keyWord,pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba')
              return  _this.$http.post('/getBurnServerInfo', {
                    keyWord,
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideLoading('rgba')
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba')
                    console.log(err,'/getBurnServerInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索
            search(keyWord){
                const that=this;
                that.getBurnServerInfo()
            },
            //添加弹框
            add(){
                this.$refs.addAlert2.show()
                this.ismain=true;
            },
            //关闭添加弹框
            addlawsure(){
                this.ismain=false;
            },
            //修改当前行信息
            edit(row){
                this.$refs.addAlert2.show(row)
                this.ismain=true;
            },
            //删除当前行内容
            delinfo(index,row){
                const that=this;
                that.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.post('/deleteBurnServerInfo',{
                        burnServerId:row.burnServerId//刻录服务器id
                    }).then(data =>{
                        if(data.code===200){
                            that.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(that.total)/10)==Number(that.pageIndex) && that.pageIndex!=1 && Number(that.total)%10==1){
                                that.pageIndex=Number(that.pageIndex)-1;
                            }
                            that.getBurnServerInfo()
                        }else{
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getBurnServerInfo();
            },
            addlawsure(formLabelAlign){
              const _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/saveBurnServerInfo', formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功');
                        _this.getBurnServerInfo()
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/saveBurnServerInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpane2{
        .mr();
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