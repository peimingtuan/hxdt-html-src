<template>
    <div class="tab3">
        <div class="top-btn">
            <div class="add">
                <img @click="add()" src="../images/yingyongpeizhi/add.png"/>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @select-all="selecAlltcheck"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" width="100px" label="序号" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="caseStandingName" label="案件地位名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseStandingCode" label="案件地位代码" show-overflow-tooltip>
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
                    :current-page=pageIndex
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addbasic-alert
                ref="addbasicAlert"
                :alertshow="ismain"
                @selectshow="ismain=false"
                @qure="addlawsure"
                @cancel="ismain=false"
        />
    </div>
</template>

<script>
    import addbasicAlert from "./tab3/addbasicAlert3" //添加弹框
    export default {
        name: "tab3",
        components:{
            addbasicAlert,
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
            getCaseStandingConfigs(){
                let {pageIndex,pageSize}=this;
                const that=this;
                that.$showLoading('rgba')
                that.$http.post('/caseStandingConfig/getCaseStandingConfigs', {
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
                this.$refs.addbasicAlert.show()
            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                if(!formLabelAlign.caseStandingName){
                    this.$msgw("请输入案件地位名称!")
                    return
                }
                if(!formLabelAlign.caseStandingCode){
                    this.$msgw("请输入案件地位代码!")
                    return
                }
                let r=/^\+?[0-9][0-9]*$/;
                if(!r.test(formLabelAlign.caseStandingCode)){
                    this.$msgw("案件地位代码必须为非负整数!")
                    formLabelAlign.caseStandingCode='';
                    return
                }
                const that=this;
                that.$showToast('正在保存...')
                that.$http.post('/caseStandingConfig/sveOrUpdateCaseStandingConfig', {
                    caseStanding:formLabelAlign
                }).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.ismain=false;
                        that.$msgs('保存成功!');
                        that.getCaseStandingConfigs()
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
                this.$refs.addbasicAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                const _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/caseStandingConfig/deleteCaseStandingConfig',{
                        caseStanding:{
                            caseStandingId:row.caseStandingId
                        }
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getCaseStandingConfigs()
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
                this.getCaseStandingConfigs();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .tab3 {
        .mr();
        .top-btn {
            .fl();
            cursor: pointer;
            margin-bottom: .1rem;

            & > div {
                margin-right: .1rem;

                img {
                    width: .8rem;
                }
            }
        }
        @import url('../css/uppage.less');
    }
</style>