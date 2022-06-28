<template>
        <!-- <div class='Newcases'> -->
    <div class="Newcases">
            <agentinfo :isagentinfo="isagentinfo" @Schedulingshow='isagentinfo=false' @sure='isagentinfo=false' @cancel='isagentinfo=false'></agentinfo>
            <partyinfo :ispartyinfo="ispartyinfo" @selectshow='ispartyinfo=false' @sure='ispartyinfo=false' @cancel='ispartyinfo=false'></partyinfo>
            <Addscheduling_nt  :isAddscheduling_nt="isAddscheduling_nt" @selectshow='isAddscheduling_nt=false' @sure='isAddscheduling_nt=false' @cancel='isAddscheduling_nt=false'></Addscheduling_nt>
            <transition name="slide-fade">
            <div class='alert-window' v-if='newcasebox'>
            <div class="main">
                <el-row class='onerow1'>
                                <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
                                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                <div class="head">新建管理<br/>
                                    <span>请填写详细信息</span>
                                </div>
                </el-row>
                <el-row class='tworow1'>
            <!-- <el-col :span=1></el-col> -->
                <el-col  class='newbox'>
                    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                            <el-tab-pane label="基本信息" name="first">
                                <div class="firstbox">
                                        <el-row>
                                                <el-col :span=2>
                                                <div class='title'>案号</div>
                                                </el-col>
                                                <el-col :span=22>
                                                     <el-row class='firstboxone'>
                                                             <el-select v-model="value" placeholder="2019"></el-select>
                                                             <el-select v-model="value" placeholder="01"></el-select>
                                                             <el-select v-model="value" placeholder="民初"></el-select>
                                                             <el-select v-model="value" placeholder="0000011"></el-select>号
                                                     </el-row>
                                                </el-col>
                                            </el-row>
                                            <el-row class=''>
                                                    <el-col :span=2>
                                                    <div class='title'>案件类型</div>
                                                    </el-col>
                                                    <el-col :span=22>
                                                         <el-row>
                                                                 <el-select v-model="value" placeholder="先予执行"></el-select>
                                                         </el-row>
                                                    </el-col>
                                                </el-row>
                                            <el-row class=''>
                                                 <el-col :span=2>
                                                 <div class='title' >案由</div>
                                                 </el-col>
                                                 <el-col :span=22>
                                                      <el-row>
                                                              <el-select v-model="value" placeholder="先予执行"></el-select>
                                                      </el-row>
                                                 </el-col>
                                             </el-row>
                                             <el-row>
                                                     <el-col :span=2>
                                                     <div  class='title'>立案日期</div>
                                                     </el-col>
                                                     <el-col :span=22>
                                                          <el-row>
                                                                 <el-date-picker
                                                                     v-model="value1"
                                                                     type="date"
                                                                     placeholder="选择日期">
                                                                 </el-date-picker>
                                                          </el-row>
                                                     </el-col>
                                                 </el-row>
                                                 <el-row>
                                                         <el-col :span=2>
                                                         <div  class='title'>承办人</div>
                                                         </el-col>
                                                         <el-col :span=22>
                                                              <el-row>
                                                                     <el-select v-model="value" placeholder="承办人"></el-select>
                                                              </el-row>
                                                         </el-col>
                                                     </el-row>
                                                     <el-row>
                                                             <el-col :span=2>
                                                             <div  class='title'>承办部门</div>
                                                             </el-col>
                                                             <el-col :span=22>
                                                                  <el-row>
                                                                         <el-select v-model="value" placeholder="承办部门"></el-select>
                                                                  </el-row>
                                                             </el-col>
                                                    </el-row>
                                                    <el-row>
                                                            <el-col :span=2>
                                                            <div  class='title'>适用程序</div>
                                                            </el-col>
                                                            <el-col :span=22>
                                                                 <el-row>
                                                                        <el-select v-model="value" placeholder="普通程序"></el-select>
                                                                 </el-row>
                                                            </el-col>
                                                   </el-row>
                                                    
                                </div>
                             
                            </el-tab-pane>
                            <el-tab-pane label="当事人/代理人信息" name="third">
                                <div class="thirdbox">
                                    <div>
                                            <el-row>
                                                    <el-col　:span=2>当事人信息</el-col>
                                                    <el-col　:span=22>
                                                            <img src="../images/CaseManagement/neiwensaomiao.png" alt="">
                                                            <span>添加当事人</span>
                                                            <img src="../images/CaseManagement/neiwentianjia.png" alt="">
                                                            <span>扫描身份证</span>
                                                    </el-col>
                                            </el-row>
                                                <el-row>
                                                        <div style='border:1px solid #E5E5E5' class='newcasetable2'>
                                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                                @selection-change="handleSelectionChange">
                                                                <el-table-column prop="ssdw"label="诉讼地位"min-width=3%></el-table-column>
                                                                <el-table-column prop="xm"label="姓名"min-width=2%></el-table-column>
                                                                <el-table-column prop="zjhm"label="证件号码"min-width=6%></el-table-column>
                                                                <el-table-column prop="zsd"label="住所地"min-width=8%></el-table-column>
                                                                <el-table-column prop="lx"label="类型"min-width=5%></el-table-column>
                                                                <el-table-column prop="lx"label="代理人"min-width=5%></el-table-column>
                                                                <el-table-column  prop="cz"label="操作" min-width=10%> -->
                                                                        <template slot-scope="scope">
                                                                            <div class="isedit">
                                                                                    <!-- <el-button type="text" @click="checkparty">查看</el-button> -->
                                                                                    <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                                                                    <el-button type="text" @click="checkparty">修改</el-button>
                                                                            </div>
                                                                        </template>
                                                                </el-table-column>
                                                                </el-table>
                                                        </div>
                                                </el-row>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="排期信息" name="fifth">
                                <div class="fifthbox">
                                        <el-row>
                                                <el-col>
                                                    <div class="isedit">
                                                            <el-button type="text" @click="addpq">添加</el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                             <div style='border:1px solid #E5E5E5' class='newcasetable1'>
                                                 <el-table ref="multipleTable":data="paiqidata" tooltip-effect="dark" style="width: 100%"
                                                 @selection-change="handleSelectionChange">
                                                     <el-table-column prop="tc"label="庭次"></el-table-column>
                                                     <el-table-column prop="ktsj"label="开庭时间"></el-table-column>
                                                     <el-table-column prop="slxs"label="审理形式"></el-table-column>
                                                     <el-table-column prop="spcy"label="审判组织成员"></el-table-column>
                                                     <el-table-column prop="ft"label="法庭"></el-table-column>
                                                     <el-table-column prop="tszt"label="庭审状态"></el-table-column>
                                                     <el-table-column prop="sjy"label="书记员"></el-table-column>
                                                     <el-table-column  prop="cz"label="操作"> 
                                                            <template slot-scope="scope">
                                                                <div class="isedit">
                                                                        <!-- <el-button type="text" @click="checkparty">查看</el-button> -->
                                                                        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                                                        <el-button type="text" @click="addpq">修改</el-button>
                                                                </div>
                                                            </template>
                                                    </el-table-column>
                                                 </el-table>
                                             </div>
                                            </el-row>
                                </div>
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

                        <div class="cancel" @click='cancel'>
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
    import Addscheduling_nt from '../component/Addscheduling_nt'//新建案件弹框
    import partyinfo from './partyinfo'//新建当事人详情
    import agentinfo from './agentinfo'//新建当事人详情

    const tableData=require('../testdata/dangshiren')
    export default{
         //注册子组件
         components: {
            Addscheduling_nt,
            partyinfo,
            agentinfo
        },
        props:{
                newcasebox:Boolean,//弹框
                selectshow:Function,
        },
        data(){
            return{
                isagentinfo:false,
                ispartyinfo:false,
                isAddscheduling_nt:false,
                tableData:tableData,
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
                value1: '',
                radio2: 3,
                radio3:3,
                activeName: 'first'
            }
        },
        methods: {
            addpq(){
                this.isAddscheduling_nt=true;
            },
            checkparty(){
                this.ispartyinfo=true;
            },

        closenewcase(){
            this.$emit('selectshow');
        },
        checkagent(){
            this.isagentinfo=true;
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
.Newcases{
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
    .Newcases{
        /*弹框*/
        .alert-window{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
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