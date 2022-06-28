<template>
        <div class='StorageMigration'>
             <el-row class='onerow'>
                <el-col :span=8>
                        <div class="head-top">
                                <img src="../images/CaseManagement/过期排期管理.png"/>
                                存储迁移管理<span>CUN CHU QIAN YI GUAN LI</span>
                        </div>
                </el-col>
             </el-row>
                    <div>
                            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange" class='casetable'>
                            <el-table-column type="selection" width='80'></el-table-column>
                            <el-table-column label="序号" type='index'></el-table-column>
                            <el-table-column prop="taskName"label="任务名称"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="taskStatus"label="任务状态"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="taskType"label="任务类型"show-overflow-tooltip></el-table-column>
                            <el-table-column label="开始时间"show-overflow-tooltip>
                                    <template slot-scope="scope">
                                         {{scope.row.startDate}} {{scope.row.startTime}}
                                    </template>
                            </el-table-column>
                            <el-table-column label="结束时间"show-overflow-tooltip>
                                    <template slot-scope="scope">
                                            {{scope.row.endDate}} {{scope.row.endTime}}
                                    </template>
                            </el-table-column>
                            <el-table-column prop="sourcePath"label="源地址"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="destPath"label="目的地址"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="taskSource"label="任务来源"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="remarks"label="备注"show-overflow-tooltip></el-table-column>
                            <el-table-column  prop="cz"label="操作" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <div class="isedit">
                                                <el-button type="text" @click="">查看详情</el-button>
                                                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
                                        </div>
                                    </template>
                            </el-table-column>
                          </el-table>
                      </div>
                <!--底部-->
                <div class="up">
                    <!--分页-->
                    <el-pagination
                            class="page"
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page=1
                            :page-size=9
                            layout="total, prev, pager, next, jumper"
                            :total=100>
                    </el-pagination>
                </div>
        </div>
</template>
<script>
    import {StorageMigration} from "../js/datajson"
    export default{
        data(){
            return{
                tableData:StorageMigration.casetableData,
            }
        },
        mounted(){
            
        },
        methods: {
            choicecauseStr(){
                    
            },
            handleDelete(row){
                let _this=this;
                        _this.$confirm('确认删除', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.$http.post('/caseManage/deleteCaseInfo', {
                                caseInfoId:row.caseInfoId//案号id
                            }).then(data =>{
                                if(data.code===0){
                                    //_this.tableData.splice(index,1)//物理删除
                                    //_this.getlawlist();
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }else{
                                    _this.$msgw(data.msg);
                                }
                            }).catch(err => {
                                _this.load=false;
                                _this.$msge('服务器异常，请稍后重试');
                            })
                        }).catch(() => {
                            // this.$message({
                            //     type: 'info',
                            //     message: '已取消删除'
                            // });
                        });
            },
            //页面加载过期请求数据
            getExpriedTrialPlansByPages(){
                let {year,courtUnitPronoun,
                    caseTypePronoun,caseNum,
                    startCreateCaseDate,endCreateCaseDate,
                    partyDes,causeId,
                    causeStr,departmentId,
                    undertakerId,lastJudgeName,
                    pageIndex,pageSize}=this;
                let _this=this;
                if(startCreateCaseDate!='')startCreateCaseDate=FoundationTools.getFormatDate2(startCreateCaseDate)
                if(endCreateCaseDate!='')endCreateCaseDate=FoundationTools.getFormatDate2(endCreateCaseDate)
                //根据查询条件获取案件(案件无是否刻录)
                _this.$http.post('/caseManage/searchCaseInfo', {
                    year,//年份
                    courtUnitPronoun,//法院代字
                    caseTypePronoun,//案件类型代字
                    caseNum,//案件编号
                    startCreateCaseDate,//起始立案日期（搜索用）
                    endCreateCaseDate,//结束立案日期（搜索用）
                    partyDes,//当事人名称
                    causeId,//立案案由Id
                    causeStr,//立案案由名称（单选）
                    departmentId,//承办部门id
                    undertakerId,//承办法官id
                    lastJudgeName,//审判长/员id
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    if(data.code===0){
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.load=false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
    }
    }
</script>
<style lang='less'>
    .StorageMigration{
        padding:0 0.2rem 0 0.2rem;
        .onerow{
            .el-col-16{
            text-align: right;
         }
        }
        .head-top{
                    padding:.2rem 0 0 0;
                    font-size: .2rem;
                    img{
                        width:0.3rem;
                    }
                    span{
                        margin-left:.05rem;
                        font-size:0.14rem;
                        color:#1296DB;
                    }
        }
        .el-select
            {
                width:3.8rem;
                padding-top:0.15rem;
                margin-right: 0.2rem;
            }
        .el-input{
                font-size:0.18rem;
                    .el-input__icon{
                        /* width: 0.34rem; */
                        line-height: .4rem;
                        color: #e7e9ee;
                        font-size:0.18rem;
                    }
            }
            .el-input__inner{
                height:0.4rem;
            }
            /* .el-button [class*=el-icon-]+span{
                font-size: 0.18rem;
            } */
              /*button*/
              .el-button.search{
                            position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;

                            .el-icon-search {
                                font-size:0.18rem;
                                color: #fff;
                            }

                            span {
                                font-size:0.18rem;
                                color: #fff;
                            }
                        }
             @import url('../css/element.less');
    }
</style>
