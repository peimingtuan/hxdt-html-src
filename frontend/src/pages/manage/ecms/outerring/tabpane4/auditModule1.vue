<template>
    <div class="auditModule1">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model.trim="keyWord" placeholder="旁听辅助名称/IP"></el-input>
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
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="chasName" label="旁听辅助名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="chasIp" label="旁听辅助IP" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mac" label="MAC地址" width="200px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="courtRoomName" label="法庭名称" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column prop="chasUUID" label="旁听辅助序列号" show-overflow-tooltip>-->
                <!--</el-table-column>-->
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
        <add-audit-alert ref="addAuditAlert"/>
    </div>
</template>

<script>
    import addAuditAlert from "./addAuditAlert1"
    export default {
        name: "auditModule1",
        components: {
            addAuditAlert
        },
        data() {
            return {
                tableData:[],//法庭外围旁听辅助客户端配置列表,
                keyWord:'',//搜索
                total:0,
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                multipleSelection:[]
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取旁听辅助列表
            getChasInfo(){
                let {keyWord,pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba');
                return _this.$http.post('/chasInfoConfig/getChasInfo',{
                    keyWord,//搜索关键词
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideLoading('rgba');
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba');
                    console.log(err,'/chasInfoConfig/getChasInfo')
                })
            },
            //搜索信息
            search(v){
                let _this=this;
                _this.pageIndex=1;
                _this.getChasInfo()
            },
            //添加弹框
            add(){
                //调用子组件方法
                this.$refs.addAuditAlert.show()
            },
            //修改当前行信息
            edit(index,row){
                //调用子组件方法
                this.$refs.addAuditAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/chasInfoConfig/deleteChasInfo', {
                        chasId:row.chasId//要删除的旁听客户端id
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getChasInfo();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/chasInfoConfig/deleteChasInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getChasInfo();
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    .auditModule1 {
        .mr();
        .top{
            margin-bottom:.1rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div{
                    margin-right:.1rem;
                    img{
                        width:1.2rem;
                    }
                }
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
        @import url('../../css/element.less');
    }
</style>
<style lang="less" scoped>
    @import url('../../css/uppage.less');
</style>