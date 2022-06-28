<template>
        <div class='OverdueScheduling'>
             <el-row class='onerow'>
                <el-col :span=8>
                        <div class="head-top">
                                <img src="../images/CaseManagement/overdue.png"/>
                                过期排期管理 <span>GUO QI PAI QI GUAN LI</span>
                        </div>
                </el-col>
                <el-col :span=16>
                        <div class="head-foot">
                                <el-button type="primary">
                                    <img class="leadOut" src="../images/OverdueScheduling/leadOut.png" />
                                    导出列表
                                </el-button>
                        </div>
                </el-col>
             </el-row>
                    <div>
                            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                             class='casetable'  @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width=50></el-table-column>
                            <el-table-column label="序号" width="80px" type='index' :index="indexMethod"></el-table-column>
                            <el-table-column prop="caseNumber" label="案号" show-overflow-tooltip width='230px'></el-table-column>
                            <el-table-column prop="courtTime" label="庭次"></el-table-column>
                            <el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="undertakerName" label="承办人" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="partyDes"label="当事人" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="presidingJudge" label="审判长" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="clerkName" label="书记员" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="factStartDate" label="开庭日期" show-overflow-tooltip></el-table-column>
                            <el-table-column label="庭审状态">
                                <template slot-scope="scope">
                                    <div>{{scope.row.trialStatus | trialStatus}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip></el-table-column>
                            <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <div class="isedit">
                                                <span @click="handleDelete(scope.row,scope.$index)">删除</span>
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
                            @current-change="handleCurrentChange"
                            :current-page=pageIndex
                            :page-size=10
                            layout="total, prev, pager, next, jumper"
                            :total=total>
                    </el-pagination>
                </div>
        </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData:[],
                pageSize:10,
                pageIndex:1,
                total:0,
                multipleSelection:[]
            }
        },
        filters:{
            trialStatus(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='等待开庭';
                        break;
                    case 2:
                        s='正在开庭';
                        break;
                    case 3:
                        s='庭审结束';
                        break;
                    case 4:
                        s='休庭';
                        break;
                }
                return s
            }
        },
        created(){
          this.getOverDueTrialPlans()
        },
        mounted(){
            
        },
        methods: {
            getOverDueTrialPlans(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let _this=this;
                _this.$http.post('/caseManage/getOverDueTrialPlans', {
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
                })
            },
            handleSelectionChange(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.courtRoomId
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
               //选中当前页码
               handleCurrentChange(val){
                this.pageIndex=val;
                let that=this;
                that.getOverDueTrialPlans();
            },
            handleDelete(row,index){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/caseManage/delOverDueTrialPlans', {
                        ids:row.trialPlanId
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getOverDueTrialPlans();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
               //table表格索引值
               indexMethod(index) {
                   return (this.pageIndex-1) * 10+index+1;//当前条数
            },
        }
    }
</script>
<style lang='less'>
    .OverdueScheduling{
        .mr();
        padding:0 0.2rem;
        .onerow{
            .el-col-16{
                 text-align: right;
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
            .head-foot{
                margin-top:0.12rem;
                .el-button {
                    line-height: .4rem;
                    padding:0 .2rem;
                    background:#edf5ff;
                    border:1px solid #bedeff;
                    span {
                        .f18();
                        color:#409eff;
                    }
                }
                .leadOut{
                    width:.2rem;
                    position:relative;
                    top:-.01rem;
                    /*cursor:pointer;*/
                }
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
             @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
