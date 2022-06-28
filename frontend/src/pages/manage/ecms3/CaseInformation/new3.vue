<template>
    <div class="new3">
        <!--二次弹框-->
        <Addscheduling_nt ref='Addscheduling_nt' :isAddscheduling_nt="isAddscheduling_nt" @Schedulingshow='isAddscheduling_nt=false' @sure='surisAddscheduling_nt' @cancel='isAddscheduling_nt=false'></Addscheduling_nt>
        <div class="add" @click="add()">
            <img src="../images/add.png"/>
        </div>
        <div class="table-style">
            <el-table ref="multipleTable" :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                      tooltip-effect="dark"
                      style="width: 100%"  class='casetable' 
                      @selection-change="handleSelectionChange">
                      <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="factStartDate" label="开庭时间"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column  label="审理形式" show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <span v-if="scope.row.trialFormCode==1">普通审理模式</span>
                                        <span v-else-if="scope.row.trialFormCode==2">多案同时审理模式</span>
                                        <span v-else-if="scope.row.trialFormCode==3">多案连续审</span>
                                </template>
                        </el-table-column>
                        <el-table-column  label="审判组织成员" show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <span v-for='item in scope.row.trialMemberList'>
                                            <span v-if="item.trialMemberTypeCode==1">审判长{{item.trialMemberName}}</span>
                                            <span v-if="item.trialMemberTypeCode==2">审判员{{item.trialMemberName}}</span>
                                            <span v-if="item.trialMemberTypeCode==3">人民陪审员{{item.trialMemberName}}</span>
                                            <!-- <span v-if="item.trialMemberTypeCode==6">书记员{{item.trialMemberName}}</span> -->
                                        </span>
                                </template>
                        </el-table-column>
                        <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip>
    
                        </el-table-column>
                        <el-table-column label="庭审状态" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.trialStatus | trialStatus2}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="presidingJudge" label="书记员" show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <span v-for='item in scope.row.trialMemberList'>
                                            <span v-if="item.trialMemberTypeCode==6">{{item.trialMemberName}}</span>
                                        </span>
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
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Addscheduling_nt from '../component/Addscheduling_nt'//新建案件弹框
    import {Indicator} from 'mint-ui'
    export default {
        name: "new3",
        components: {
            Addscheduling_nt,
        },
        data() {
            return {
                row:null,
                parentData:null,
                tableData:[],
                courtTime:"",//庭次
                factStartTime:"",//开庭时间
                trialFormCode:"",//审理形式代码(1.普通审理模式、2.多案同时审理模式、3.多案连续审理模式、4.合并审理模式)
                trialMemberList:"",//审判组织成员 array
                trialStatus:"",//庭审状态
                courtTime:"",//庭次
                courtRoomName:"",//法庭地点
                involvedPersonDtoList:"",
                //接口缺少书记员
                isAddscheduling_nt:false,
                labelPosition: 'left',//form表单左侧靠齐
                radio: '1',//选择刻录画面
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        filters:{
            trialStatus2(v){
                if(v==1)return '等待开庭'
                else if(v==2)return '正在开庭'
                else if(v==3)return '休庭'
                else if(v==4)return '继续庭审'
                else if(v==5)return '庭审结束'
                else if(v==255)return '其它'
            }
        },
        methods: {
            save(){
                //调用子组件的保存
                // let new3info= this.$refs.Addscheduling_nt.sure();
                // return new3info;
            },
            getAllInfoByCaseInfoId(parentData,row){
                this.row = row;
                this.parentData = parentData;
                     if(row){
                        this.involvedPersonDtoList=row;//修改逻辑处理
                        this.tableData=row.trialPlanMemberDto;//jsonArray	涉案人信息列表
                    }else{
                         this.tableData=[];
                        this.involvedPersonDtoList={//表单信息
                            caseNumber:"",//案号
                            caseName:"",//案件名称
                            courtCode:"",//法院代码
                            courtName:"",//法院名称
                            year:"",//年
                            caseTypeName:"",//案件类型名称
                            causeName:"",//案由名称
                            createCaseDate:"",//承办时间
                            departmentName:"",//承办部门名称
                            undertakerName:"",//承办法官姓名
                            applyProgram:"",//适用程序（1普通2简易3特殊）
                        }
                    }
            },
            //打开添加二次弹框
            add(){
                this.isAddscheduling_nt=true;
            },
            edit(row){
                this.isAddscheduling_nt=true;
                this.$refs.Addscheduling_nt.see(row,this.parentData);//传子组件
                this.$refs.Addscheduling_nt.getCourtRooms();// 调用获取法庭的接口
                this.$refs.Addscheduling_nt.getTrialModeInfos();// 调用获取审理模式的接口
                this.$refs.Addscheduling_nt.getTrialFormInfos();// 调用获取审理形式的接口
                this.$refs.Addscheduling_nt.getCourtWayInfos();// 调用获取开庭方式的接口
            },
            deletes(row){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.load = true;
                    this.$http.post('/deleteTrialPlans', {
                        "caseInfoId":this.row.caseInfoId,
                        "trialPlanIds":[{
                            "trialPlanId":row.trialPlanId
                        }]
                    }).then( res =>{
                        if(res.code == 200){
                            this.tableData.splice(row.index,1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch( err => {
                        this.load = false;
                        this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {});
            },
            //排期保存
            surisAddscheduling_nt(trialPlanInfos){
                const _this=this;
                Indicator.open({text: '正在保存...', spinnerType: 'fading-circle'})
                _this.$http.post('/caseManage/saveTrialPlanInfo',{trialPlanInfos}).then(data =>{
                    Indicator.close()
                    if(data.code==200){
                        _this.$msgs('保存成功');
                        this.isAddscheduling_nt=false;
                        _this.$parent.getcaselist();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    Indicator.close()
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
        }
     
    }
</style>