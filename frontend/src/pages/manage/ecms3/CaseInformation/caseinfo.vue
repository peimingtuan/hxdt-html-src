<template>
    <div class="caseinfo">
        <partyinfo :ispartyinfo=ispartyinfo @closenewcase='ispartyinfo=false' @sure='ispartyinfo=false' @cancel='ispartyinfo=false'></partyinfo>
        <transition name="slide-fade">
            
        <div class='alert-window' v-if='iscaseinfo'>
            <div class="main">
                <el-row class='onerow1'>
                                <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
                                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                <div class="head">案件信息<br/>
                                    <span>详细信息</span>
                                </div>
                </el-row>
                <el-row class='tworow1'>
                <el-col  class='newbox'>
                    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                            <el-tab-pane label="基本信息" name="first">
                                <div class="firstbox">
                                        <el-form ref="form" :model="form" label-width="120px">
                                                <el-form-item label="案号">{{idallinfo.caseNumber}}
                                                </el-form-item>
                                                <el-form-item label="案由">{{idallinfo.causeStr}}
                                                </el-form-item>
                                                <el-form-item label="立案日期">{{idallinfo.createCaseTime}}
                                                </el-form-item>
                                                <el-form-item label="承办人">{{idallinfo.lastJudgeName}}
                                                    </el-form-item>
                                                <el-form-item label="承办部门">{{idallinfo.departmentName}}
                                                </el-form-item>
                                        </el-form>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="审判组织成员" name="second">
                                   <div class="secondbox">
                                        <el-form ref="form" :model="form" label-width="120px">
                                                <el-form-item label="合议庭成员">
                                                  <!-- <el-input v-model="form.name"></el-input> -->
                                                </el-form-item>
                                                <el-form-item label="审判长">
                                                </el-form-item>
                                                <el-form-item label="审判员">
                                                </el-form-item>
                                        </el-form>
                                   </div>
                            </el-tab-pane>
                            <el-tab-pane label="当事人/代理人信息" name="third">
                                <div class="thirdbox">
                                    <div>
                                            <el-row>
                                                    <el-col　:span=2>当事人信息</el-col>
                                            </el-row>
                                                <el-row>
                                                        <div style='border:1px solid #E5E5E5' class='newcasetable2'>
                                                                <el-table ref="multipleTable":data="partyInfo" tooltip-effect="dark" style="width: 100%"
                                                                @selection-change="handleSelectionChange">
                                                                <el-table-column prop="caseStandingName"label="诉讼地位"min-width=3%></el-table-column>
                                                                <el-table-column prop="name"label="姓名"min-width=2%></el-table-column>
                                                                <el-table-column prop="countryAreaId"label="证件号码"min-width=6%></el-table-column>
                                                                <el-table-column prop="householdRegisterPlace"label="住所地"min-width=8%></el-table-column>
                                                                <el-table-column prop="partyName"label="类型"min-width=5%></el-table-column>
                                                                </el-table>
                                                        </div>
                                                </el-row>
                                    </div>
                                    <div>
                                            <el-row>
                                                    <el-col　:span=2>代理人信息</el-col>
                                            </el-row>
                                                <el-row>
                                                        <div style='border:1px solid #E5E5E5' class='newcasetable2'>
                                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                                @selection-change="handleSelectionChange">
                                                                <el-table-column prop="caseStandingName"label="诉讼地位"min-width=3%></el-table-column>
                                                                <el-table-column prop="name"label="姓名"min-width=2%></el-table-column>
                                                                <el-table-column prop="countryAreaId"label="证件号码"min-width=6%></el-table-column>
                                                                <el-table-column prop="householdRegisterPlace"label="住所地"min-width=8%></el-table-column>
                                                                <el-table-column prop="partyTypeName"label="类型"min-width=5%></el-table-column>
                                                                </el-table>
                                                        </div>
                                                </el-row>
                                    </div>
                                    <div>
                                            <el-row>
                                                    <el-col　:span=2>辩护人信息</el-col>
                                            </el-row>
                                                <el-row>
                                                        <div style='border:1px solid #E5E5E5' class='newcasetable2'>
                                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                                @selection-change="handleSelectionChange">
                                                                <el-table-column prop="caseStandingName"label="诉讼地位"min-width=3%></el-table-column>
                                                                <el-table-column prop="name"label="姓名"min-width=2%></el-table-column>
                                                                <el-table-column prop="countryAreaId"label="证件号码"min-width=6%></el-table-column>
                                                                <el-table-column prop="householdRegisterPlace"label="住所地"min-width=8%></el-table-column>
                                                                <el-table-column prop="partyTypeName"label="类型"min-width=5%></el-table-column>
                                                                </el-table>
                                                        </div>
                                                </el-row>
                                    </div>
                                    
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="审理方式" name="fourth">
                                            <el-row>
                                                    <el-col :span=2></el-col>
                                                    <el-col :span=22>
                                                            <el-radio-group v-model="radio2">
                                                                    <el-radio :label="3">公开审理</el-radio>
                                                                    <el-radio :label="6">不开审理</el-radio>
                                                            </el-radio-group>
                                                    </el-col>
                                              </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="排期信息" name="fifth">
                                <div class="fifthbox">
                                            <el-row>
                                             <div style='border:1px solid #E5E5E5' class='newcasetable1'>
                                                 <el-table ref="multipleTable":data="paiqidata" tooltip-effect="dark" style="width: 100%"
                                                 @selection-change="handleSelectionChange">
                                                     <el-table-column prop="tc"label="庭次"min-width=1%></el-table-column>
                                                     <el-table-column prop="ktsj"label="开庭时间"min-width=2%></el-table-column>
                                                     <el-table-column prop="ft"label="法庭"min-width=2%></el-table-column>
                                                     <el-table-column prop="tszt"label="庭审状态"min-width=2%></el-table-column>
                                                 </el-table>
                                             </div>
                                            </el-row>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="案件操作留痕" name="six">
                                    <el-row>
                                      </el-row>
                        </el-tab-pane>
                    </el-tabs>
            </el-col>
            <!-- <el-col :span=1></el-col> -->
        </el-row>
        <el-row>
                <div class="bt">
                        <div class="qure" @click='sure'>
                            <img src="../images/sure.png" />确定
                        </div>

                        <div class="土" @click='cancel'>
                            <img src="../images/cancel.png" />取消
                        </div>
                    </div>
        </el-row>
            </div>
        </div>
            </transition>
    </div>
</template>
<script>
    import {CaseInformation} from "../js/datajson"
    import partyinfo from './partyinfo.vue'//新建案件弹框
    // const tableData=require('../testdata/dangshiren')
    export default{
         //注册子组件
         components: {
            partyinfo,
        },
        props:{
                iscaseinfo:Boolean,//弹框
                selectshow:Function,
        },
        data(){
            return{
                partyInfo:CaseInformation.partyDtoList,
                publicTrial:"",//是否公开审理
                soleTrial:"",//是否独任审理
                form:{
                    name:""
                },
                idallinfo:"",//id父带过来的所有信息
                caseNum:"",//案号
                ispartyinfo:false,
                // tableData:tableData,
                paiqidata:[
                     {
                        tc:'1',
                        ktsj:'2019-3-23 10:30-12:00',
                        ft:'第一法庭',
                        tszt:'未开庭',
                    },
                ],
                newcasebox:false,
                value:"",
                pickerOptions: { //时间选择器
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
                value1: '',
                radio2: 3,
                radio3:3,
                activeName: 'first'
            }
        },
        mounted() {
            // this.getAllInfoByCaseInfoId()
        },
        methods: {
            //根据案件id获取当前案件的全部数据
            getAllInfoByCaseInfoId(e){
                 this.idallinfo=e;
                let _this=this;
                _this.isload=true;
                const params={
                    "caseInfoId": e.caseInfoId,//用户id
                  };
                _this.$http.post('/getAllInfoByCaseInfoId', params).then(data => {
                    _this.isload=false;
                    if (data.Code == 1){

                        }
                        else
                        { _this.$msgw(data.Message);}
                    }).catch(err => {
                        _this.isload=false;
                        _this.$msge('服务器异常，请稍后重试');
                  })
               // console.log(this.idallinfo)
            },
        //查看当事人信息
        lookparty(){
            this.ispartyinfo=true;
        },
        closenewcase(){
            this.$emit('selectshow');
        },
            sure(){
            this.$emit('sure');
        },
        cancel(){
            this.$emit('cancel');
        },
            //菜单选项卡
        handleClick(tab, event) {
            this.activeName=tab.name;
        //console.log(tab.name);
      }
    }
    }
</script>
<style lang='less'> 
.caseinfo{
            th,td{
                text-align:center;
            }
            th{
                color: #151515;
                background:#cbe5f3;
                div{
                    font-size: 0.2rem;
                }
            }
        /*底部*/
        .bt{
                   display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    margin:.2rem 0;
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
                .el-form-item__label{
                    font-size:0.18rem;
                }
            .el-radio__label{
                font-size: 0.18rem;
            }
            .el-table .cell{
                            text-align: center;
                            height: 0.25rem; 
                            line-height: 0.25rem;
                       
            } 
                /*选项卡身体*/
            .el-tabs--border-card>.el-tabs__content{
                height:6.8rem;
                background:#ECEFF0;
                width:100%;
                overflow: auto;
            }
                /*选项卡菜单点击时*/
            .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
                background:#ECEFF0;
            }
                /*选项卡头部*/
            .el-tabs__nav .is-top{
                width: 2rem;
                height: 0.5rem;
                text-align: center;
                font-size:0.18rem;
                color:#333;
            }  
            .el-input--prefix .el-input__inner{
                        width: 4.42rem;
            }
            /*操作颜色*/
            div.isedit{
                    color: #409eff;
            }
            /*操作颜色*/
            div.isedit span{
                    color: #409eff;
            }
}
</style>

<style  lang='less'>
    .caseinfo{
        /*弹框*/
        .alert-window{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 222!important;
            .main{
                width:14rem;
                padding:0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:.5rem;
                margin-left:-7rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
                .onerow1{
                    width:12.75rem;

                        /*左上方login*/
                img.imgloge{
                                position:absolute;
                                top: .2rem;
                                left: 0rem;
                                width:.4rem;
                            }
                /*头部*/
                .head{
                                width:100%;
                                padding:0.25rem 0  0 .4rem;
                                height:.6rem;
                                font-size: 0.2rem;
                                span{
                                    font-size: 0.14rem;
                                    color: rgba(0,0,0,0.54);
                                }
                            }
                img.alert-close {
                                width: .18rem;
                                position: absolute;
                                top: .25rem;
                                right: 0rem;
                                cursor: pointer;
                }

                }
        
            }
        }
        .tworow1{
            width:12.75rem;
            margin:0 auto;
            .firstbox{
            .firstboxone{
                .el-select{
                width:1.63rem;
                }  
                .el-select:nth-child(1){
                width:2.58rem;
                }  
                
            }
            .el-select{
            width:4.42rem;
            }   
          
        }
        .secondbox{
            color: #333333;
            .el-input--suffix .el-input__inner{
                /* background: #ECEFF0; */
                color: #333333;
            }
            .el-select{
                width:2.58rem;
                color: #333333;
            }  
        
            span{
                font-size: 0.14rem;
            }
        }
        .thirdbox{
            span{
                font-size:0.16rem;
                opacity: 0.8;
                color: #46A1FF;
            }
            .newcasetable2{
                /* .el-table .cell{
                    text-align: center;
                     height: 0.25rem; 
                    line-height: 0.25rem;
                }  */
                .el-button{
                    position: relative;
                    top:-0.1rem;
                }
            }
        }
        .fifthbox{
            font-size:0.18rem;
            newcasetable1{
                /* .el-table .cell{
                    text-align: center;
                     height: 0.25rem; 
                    line-height: 0.25rem;
                }  */
            }
        }
        }
        .newbox{
            margin:0 auto;
            color:#000;
            background: #ECEFF0;
            .el-row{
                    margin-bottom: 0.2rem;
                    div.title{
                    width: 0.72rem;
                    line-height: 0.4rem;
                    text-align: center;
                    font-size: 0.18rem;
                }
            } 
        
        }
        .el-col-5{
            text-align: right;
        }
    }
</style>