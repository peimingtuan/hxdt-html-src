<template>
        <div class="addRelatedcase">
                <!--弹框-->
                <addSM_case :isaddSM_case=isaddSM_case @closenewcase='isaddSM_case=false' @sure='isaddSM_case=false' @cancel='isaddSM_case=false'></addSM_case>
                <transition name="slide-fade">
                    <div class="second-alert" v-if='isaddRelatedcase'>
                            <div class="main">
                                    <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                                    <AlertleftTile :text="text" :text2="text2"/>
                                <div  class='tworow5' style='padding-top:0.25rem'>
                                        <el-form :label-position="labelPosition" :model="formLabelAlign" class='formcss'>
                                            <el-row>
                                                <el-col :span=12>
                                                        <el-form-item label="庭次">
                                                                <el-input v-model="formLabelAlign.courtTime" placeholder="先予执行"> </el-input>
                                                            </el-form-item>
                                                            <el-form-item label="案理模式">
                                                                <el-select v-model="formLabelAlign.trialFormName" placeholder="是">
                                                                        <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                                                                        </el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                            <el-form-item label="法庭">
                                                                    <el-select v-model="formLabelAlign.courtRoomName" placeholder="是">
                                                                            <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                                                                            </el-option>
                                                                    </el-select>
                                                                </el-form-item>
                                                            <el-form-item label="开庭日期">
                                                                    <el-date-picker v-model="formLabelAlign.factStartDate"type="date"placeholder="选择日期"> </el-date-picker>
                                                            </el-form-item>
                                                </el-col>                                              
                                                <el-col :span=12>
                                                        <el-form-item label="审理形式">
                                                                <el-select v-model="formLabelAlign.trialFormCode" placeholder="是">
                                                                        <el-option v-for="item in TrialWay"  :key="item.code" :label="item.name" :value="item.name">
                                                                        </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="书记员">
                                                                <el-select v-model="formLabelAlign.name" placeholder="是">
                                                                        <!-- <el-option v-for="item in TrialWay"  :key="item.code" :label="item.name" :value="item.name">
                                                                        </el-option> -->
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="开庭方式">
                                                                <el-select v-model="formLabelAlign.courtWay" placeholder="是">
                                                                        <el-option v-for="item in CourtWaylist"  :key="item.code" :label="item.name" :value="item.name">
                                                                        </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="是否公开审理">
                                                                <el-radio-group v-model="formLabelAlign.soleTrial">
                                                                        <el-radio label="是"></el-radio>
                                                                        <el-radio label="否"></el-radio>
                                                                </el-radio-group>
                                                        </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <!-- 审判长，审判员 -->
                                                <el-form-item label="是否独任审理">
                                                        <el-select v-model="formLabelAlign.publicTrial">
                                                                <el-option v-for="item in publicTriallist"  :key="item.code" :label="item.name" :value="item.code">
                                                                </el-option>
                                                        </el-select>
                                                        <div  v-if='formLabelAlign.publicTrial==1'>
                                                            <el-select v-model="formLabelAlign.courtWay" placeholder="审判长">
                                                                <el-option v-for="item in CourtWaylist"  :key="item.code" :label="item.name" :value="item.name">
                                                                </el-option>
                                                            </el-select>
                                                        </div>
                                                        
                                                        <div  v-else-if='formLabelAlign.publicTrial==2'>
                                                                <el-select v-model="formLabelAlign.courtWay" placeholder="审判长">
                                                                        <el-option v-for="item in CourtWaylist"  :key="item.code" :label="item.name" :value="item.name">
                                                                        </el-option>
                                                                </el-select>
                                                                <el-select v-model="formLabelAlign.courtWay" placeholder="书记员">
                                                                        <el-option v-for="item in CourtWaylist"  :key="item.code" :label="item.name" :value="item.name">
                                                                        </el-option>
                                                                </el-select>
                                                        </div>
                                                </el-form-item>
                                            </el-row>
                                        </el-form>
                                    
                                        <div style='padding:0 0.2rem'>
                                                <div class="add" @click="add()">
                                                        <img src="../images/add.png"/>
                                                </div>
                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                @selection-change="handleSelectionChange"  class='casetable'>
                                                <el-table-column prop="caseNumber"label="案号"show-overflow-tooltip>
                                                    </el-table-column>
                                                    <el-table-column prop="courtTime"label="庭次" show-overflow-tooltip></el-table-column>
                                                    <el-table-column  show-overflow-tooltip label="审判长/员" >
                                                            <template slot-scope="scope">
                                                                <span v-for='item in scope.row.trialMemberList'>
                                                                        {{item.undertakerName}}
                                                                </span>
                                                            </template>
                                                    </el-table-column>
                                                    <el-table-column  show-overflow-tooltip label='承办法官'>
                                                            <template slot-scope="scope">
                                                                <span v-for='item in scope.row.trialMemberList'>
                                                                        {{item.lastJudgeName}}
                                                                </span>
                                                            </template>
                                                    </el-table-column>
                                                    <el-table-column  show-overflow-tooltip label="书记员">
                                                            <template slot-scope="scope">
                                                                <span v-for='item in scope.row.trialMemberList'>
                                                                        {{item.clerkName}}
                                                                </span>
                                                            </template>
                                                    </el-table-column>
                                                    <el-table-column  show-overflow-tooltip label="当事人">
                                                            <template slot-scope="scope">
                                                                <span v-for='item in scope.row.trialMemberList'>
                                                                        {{item.partyDes}}
                                                                </span>
                                                            </template>
                                                    </el-table-column>
                                                    <el-table-column  prop="cz"label="操作"show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                <div class="isedit">
                                                                        <el-button type="text" @click="Relatedcase">上移</el-button>
                                                                        <el-button type="text" @click="add">下移</el-button> 
                                                                        <el-button type="text" @click="handleDelete">删除</el-button>
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
                                                        @size-change="handleSizeChange"
                                                        @current-change="handleCurrentChange"
                                                        :current-page=1
                                                        :page-size=9
                                                        layout="total, prev, pager, next, jumper"
                                                        :total=100>
                                                </el-pagination>
                                        </div>
                                    </div>
                                   <!--底部按钮-->
                                   <div class="bt">
                                        <div class="qure" @click='sure'>
                                            <img src="../images/sure.png" />确定
                                        </div>

                                        <div class="土" @click='cancel'>
                                            <img src="../images/cancel.png" />取消
                                        </div>
                                </div>
                            </div>

            </div>
            </transition>
        </div>
</template>
    <script>
        import {basedata} from "./baseData.js"//引入数据
        import AlertleftTile from "../component/AlertleftTile"
        import addSM_case from "./addSM_case"

        import $ from "jquery"
        export default {
            name: "addRelatedcase",
            props:{
                isaddRelatedcase:Boolean,
                isaddSM_case:Boolean,
                Schedulingshow:Function,
            },
            components: {
                AlertleftTile,
                addSM_case
            },
            data() {
                return {
                    TrialModeInfosList:basedata.TrialModeInfosList,//代理种类
                    CourtWaylist:basedata.CourtWaylist,//当事人类型 
                    TrialWay:basedata.TrialWay,//国别和地区信息
                    publicTriallist:basedata.publicTriallist,//是否独任审理
                    isaddSM_case:false,
                    labelPosition: 'left',//form表单左侧靠齐
                    formLabelAlign: {
                        courtRoomName: "",
                        courtTime: '',
                        factEndDate: "",
                        factEndTime: "",
                        factStartDate:"",
                        name: '',
                        trialMode:'',//审理模式（1常规审理2要素审理）
                        trialFormCode:'',//审理形式代码(1.普通审理模式、2.多案同时审理模式、3.多案连续审理模式、4.合并审理模式
                        planStartDate:'',//计划开庭日期
                        planStartTime:'',//计划开庭时间
                        courtRoomName:'',//法庭名称）
                        courtRoomId:"",
                    },
                    //表格信息
                    tableData:[{
                        caseNumber:'（2019）粤01民初1234号',//案号
                        caseInfoId:'',//案件id
                        courtTime:'2',//庭次
                        //审判组织成员
                        trialMemberList:[{
                            'undertakerName':'张三',
                            'lastJudgeName':'王审判长',
                            'clerkName':'李四',
                            'partyDes':'原告：李三安;被告：潘金莲',
                        }]
                    }],
                    text:'添加排期',
                    text2:'填写基本信息',
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
            methods: {
                add(){
                    this.isaddSM_case=true;
                },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('Relatedcaseshow');
                },
                show(row){
                    console.log(row)
                    if(row)this.formLabelAlign=row;//修改逻辑处理
                        else{
                            this.formLabelAlign={//表单信息
                                courtRoomName: "",
                                courtTime: '',
                                factEndDate: "",
                                factEndTime: "",
                                factStartDate:"",
                                factStartTime:"",
                                trialFormName: "",
                                trialPlanId:"",
                                trialStatus:"",

                                name: '',
                                trialMode:'',//审理模式（1常规审理2要素审理）
                                trialFormCode:'',//审理形式代码(1.普通审理模式、2.多案同时审理模式、3.多案连续审理模式、4.合并审理模式
                                planStartDate:'',//计划开庭日期
                                planStartTime:'',//计划开庭时间
                                courtRoomName:'',//法庭名称）
                                courtRoomId:"",
                            }
                        }
                },
                sure(){
                    //添加案件排期信息不全
                    // let _this=this;
                    // _this.isload=true;
                    // const params={
                    //     "caseInfoId":caseInfoId
                    // };
                    // _this.$http.post('/createCase', params).then(data => {
                    //     _this.isload=false;
                    //     if (data.Code == 1){
                    //             this.tableData=data.data
                    //         }
                    //         else
                    //         { _this.$msgw(data.Message);}
                    //     }).catch(err => {
                    //         _this.isload=false;
                    //         _this.$msge('服务器异常，请稍后重试');
                    //     })
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    
    <style lang="less">
 @import url('../css/common.less');
    .addRelatedcase{
        
                .add{
                cursor:pointer;
                margin-bottom:.1rem;
                }
                 /*操作颜色*/
                div.isedit{
                        color: #409eff;
                }
                /*操作颜色*/
                div.isedit span{
                        color: #409eff;
                }
                    /*左上方login*/
                    img.imgloge{
                    position:absolute;
                    top: .2rem;
                    left: .2rem;
                    width:.4rem;
                }
                /*关闭弹框*/
                img.alert-close{
                    width:.18rem;
                    position:absolute;
                    top: .25rem;
                    right: .35rem;
                    cursor: pointer;
                    z-index:102;
            }
            .main{
                width:14.5rem;
                padding:0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                min-height:6.85rem;
                background:#fff;
                position:absolute;
                left:13%;
                top:.5rem;
                border-radius:2px;
                .formcss{
                        /*input框*/
                        .el-input{
                            width:4rem;
                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                .f18();
                            }
                        }
                }
                 /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
            }
          
                .bt{
                   display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    margin:0.3rem 0;
                    &>div{
                        cursor:pointer;
                        font-size: 0.2rem;
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                 
                    /* .fc(); */
                    .qure{
                        color: #45A1D1;
                        margin-right:.5rem;
                    }
                }
            }
          
            .tworow5{
                height: 7.15rem;
                margin: 0 auto;
                background:#eceff0;
        }
        
    }
    </style>