<template>
    <div class="new3">
        <!--二次弹框-->
        <Addscheduling_nt
                ref='Addscheduling_nt'
                :isAddscheduling_nt="isAddscheduling_nt"
                @Schedulingshow='isAddscheduling_nt=false'
                @sure='surisAddscheduling_nt'
                @cancel='isAddscheduling_nt=false'>
        </Addscheduling_nt>
        <div class="add" @click="add()">
            <img src="../images/add.png"/>
        </div>
        <div class="table-style">
            <el-table ref="multipleTable"
                      :data="tableData"
                      @select-all="selecAlltcheck"
                      tooltip-effect="dark"
                      style="width: 100%"
                      max-height="350"
                      class='casetable'
                      @selection-change="handleSelectionChange">
                <el-table-column label="审理形式" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.trialFormCode | trialFormCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="factStartDate" label="开庭日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="开庭时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.factStartTime}}-{{scope.row.factEndTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="庭审状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.trialStatus | trialStatus2}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.row)">修改</span>
                            <span @click="deletes(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import Addscheduling_nt from '../component/Addscheduling_nt'//新建案件弹框
    export default {
        name: "new3",
        components: {
            Addscheduling_nt,
        },
        data() {
            return {
                caseInfoId:'',
                tableData:[],
                isAddscheduling_nt:false,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        filters:{
            trialFormCode(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='普通审理形式';
                        break;
                    case 2:
                        s='合并审理(单笔录)';
                        break;
                    case 3:
                        s='合并审理(多笔录)';
                        break;
                }
                return s
            },
            trialStatus2(v){
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
        methods: {
            show(caseInfoId){
                if (caseInfoId) {
                    this.caseInfoId=caseInfoId;
                    this.getTrialPlan()
                }
            },
            //根据id获得当前排期信息
            getTrialPlan() {
                const _this = this;
                return _this.$http.post('/caseManage/getTrialPlanByCaseInfoId', {
                    caseInfoId:_this.caseInfoId
                }).then(data => {
                    if (data.code ===200) {
                        _this.tableData=data.data
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/caseManage/getTrialPlanByCaseInfoId')
                    // _this.$msge('服务器异常，请稍后重试');
                })
            },
            //打开添加二次弹框
            add(){
                this.$refs.Addscheduling_nt.show();
                this.$refs.Addscheduling_nt.see(this.tableData);//传子组件
                this.isAddscheduling_nt=true;
            },
            edit(row){
                this.$refs.Addscheduling_nt.show();
                this.$refs.Addscheduling_nt.see(this.tableData,row);//传子组件
                this.isAddscheduling_nt=true;
            },
            deletes(row){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/baseInfo/deleteTrialPlanInfo', {
                        "caseInfoId":this.caseInfoId,
                        "trialPlanId":row.trialPlanId
                    }).then( res =>{
                        if(res.code == 200){
                            this.getTrialPlan()
                            this.$msgs('删除成功!');
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch( err => {
                        this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {});
            },
            //排期保存
            surisAddscheduling_nt(trialPlanInfos){
                const _this=this;
                _this.$showToast('正在保存...')
                trialPlanInfos[0].caseInfoId=_this.caseInfoId;
                _this.$http.post('/caseManage/saveTrialPlanInfo',{trialPlanInfos}).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.$msgs('保存成功');
                        this.isAddscheduling_nt=false;
                        _this.getTrialPlan();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/caseManage/saveTrialPlanInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .new3{
        .add{
            cursor:pointer;
            margin:0!important;
        }
     
    }
</style>
<style scoped>
    .table-style{
        /*max-height:6rem;*/
        overflow:auto;
    }
</style>