<template>
        <div class="checkAgentinfo">
             <transition name="slide-fade">
                <div class='second-alert' v-if='ischeckAgentinfo'>
                    <div class="main1">
                            <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
                            <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                            <AlertleftTile :text="text" :text2="text2"/>
                            <div class="content2">
                                    <div class="base-top">
                                        <div>
                                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                                        <el-form-item label="姓名">{{formLabelAlign.involvedPersonName}}
                                                        </el-form-item>
                                                        <el-form-item label="年龄">{{formLabelAlign.age}}
                                                        </el-form-item>
                                                        <el-form-item label="经常居住地">{{formLabelAlign.commonAddress}}
                                                        </el-form-item>
                                                        <el-form-item label="现住地">{{formLabelAlign.nowAddress}}
                                                        </el-form-item>
                                                        <el-form-item label="联系电话">{{formLabelAlign.phone}}
                                                        </el-form-item>
                                                        <el-form-item label="户籍所在地">{{formLabelAlign.householdRegisterPlace}}
                                                        </el-form-item>
                                                    </el-form>
                                        </div>
                                        <div>
                                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                                        <el-form-item label="性别">{{formLabelAlign.sexName}}
                                                            </el-form-item>
                                                            <el-form-item label="出生日期">{{formLabelAlign.birthDate}}
                                                        </el-form-item>
                                                        <el-form-item label="国籍">{{formLabelAlign.countryAreaName}}
                                                        </el-form-item>
                                                        <el-form-item label="民族">{{formLabelAlign.nationName}}
                                                        </el-form-item>
                                                        <el-form-item label="证件号">{{formLabelAlign.identityNumber}}
                                                        </el-form-item>
                                                      
                                                        <el-form-item label="婚姻状况">{{formLabelAlign.maritalStatusName}}
                                                        </el-form-item>
                                                </el-form>
                                        </div>
                                        <div>
                                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                                        <el-form-item label="证件类型">{{formLabelAlign.identityTypeName}}</el-form-item>
                                                        <el-form-item label="身份">{{formLabelAlign.caseStandingName}}
                                                        </el-form-item>
                                                        <el-form-item label="政治面貌">{{formLabelAlign.politicalFaceName}}
                                                        </el-form-item>
                                                        <el-form-item label="行为能力状况">{{formLabelAlign.activeAbilityName}}
                                                        </el-form-item>
                                                        <el-form-item label="刑事责任能力">{{formLabelAlign.criminalAbilityName}}
                                                        </el-form-item>
                                                </el-form>
                                        </div>
                                    </div>
                                    <div class="box">
                                        <div class="agentbox">
                                            <el-tabs v-model="activeName"  type='card'@tab-click="handleClick">
                                                    <el-tab-pane label="代理人一" name="agent1">
                                                        <div v-for='(item,index) in formLabelAlign.agentInfoList'>
                                                                <div class="agenttitle">
                                                                        <div>代理人{{index+1}}</div>
                                                                </div>
                                                                        <div class="base-top">
                                                                                <div>
                                                                                        <el-form :label-position="labelPosition" >
                                                                                                <el-form-item label="代理人1姓名">{{item.personalInfoName}}</el-form-item>
                                                                                                <el-form-item label="工作单位">{{item.unitName}}</el-form-item>
                                                                                                <el-form-item label="职务">{{item.job}} </el-form-item>
                                                                                                <el-form-item label="证件号码">{{item.identityNumber}} </el-form-item>
                                                                                            </el-form>
                                                                                </div>
                                                                                <div>
                                                                                        <el-form :label-position="labelPosition">
                                                                                                <el-form-item label="代理权限">{{item.agentJurisdiction}}</el-form-item>
                                                                                                    <el-form-item label="辩护种类">
                                                                                                            <span v-if='item.defendKind==1'>委托辩护</span>
                                                                                                            <span v-else-if='item.defendKind==2'>指定辩护</span>
                                                                                                    </el-form-item>
                                                                                                    <el-form-item label="证件类型">{{item.identityTypeName}}</el-form-item>
                                                                                                </el-form-item>
                                                                                        </el-form>
                                                                                </div>
                                                                                <div>
                                                                                        <el-form :label-position="labelPosition">
                                                                                                <el-form-item label="联系电话">{{item.phone}} </el-form-item>
                                                                                                <el-form-item label="代理人性别">{{item.sexName}}</el-form-item>
                                                                                                <el-form-item label="代理种类">
                                                                                                    <span v-if='item.agentKind==1'>委托代理</span>
                                                                                                    <span v-else-if='item.agentKind==2'>法定代理</span>
                                                                                                    <span v-else-if='item.agentKind==3'>指定代理</span>
                                                                                                </el-form-item>
                                                                                        </el-form>
                                                                                </div>
                                                                        </div>      
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="辩护人" name="agent2">
                                                            <div v-for='(item,index) in formLabelAlign.defendInfoList'>
                                                                    <div class="agenttitle">
                                                                            <div>辩护人{{index+1}}</div>
                                                                    </div>
                                                                    <div class="base-top">
                                                                            <div>
                                                                                    <el-form :label-position="labelPosition" >
                                                                                            <el-form-item label="辩护人1姓名">{{item.personalInfoName}}</el-form-item>
                                                                                            <el-form-item label="工作单位">{{item.unitName}}</el-form-item>
                                                                                            <el-form-item label="职务">{{item.job}} </el-form-item>
                                                                                            <el-form-item label="证件号码">{{item.identityNumber}} </el-form-item>
                                                                                        </el-form>
                                                                            </div>
                                                                            <div>
                                                                                    <el-form :label-position="labelPosition">
                                                                                            <el-form-item label="代理权限">{{item.agentJurisdiction}}</el-form-item>
                                                                                                <el-form-item label="辩护种类">
                                                                                                        <span v-if='item.defendKind==1'>委托辩护</span>
                                                                                                        <span v-else-if='item.defendKind==2'>指定辩护</span>
                                                                                                </el-form-item>
                                                                                                <el-form-item label="证件类型">{{item.identityTypeName}}</el-form-item>
                                                                                            </el-form-item>
                                                                                    </el-form>
                                                                            </div>
                                                                            <div>
                                                                                    <el-form :label-position="labelPosition">
                                                                                            <el-form-item label="联系电话">{{item.phone}} </el-form-item>
                                                                                            <el-form-item label="代理人性别">{{item.sexName}}</el-form-item>
                                                                                            <el-form-item label="代理种类">
                                                                                                <span v-if='item.agentKind==1'>委托代理</span>
                                                                                                <span v-else-if='item.agentKind==2'>法定代理</span>
                                                                                                <span v-else-if='item.agentKind==3'>指定代理</span>
                                                                                            </el-form-item>
                                                                                    </el-form>
                                                                            </div>
                                                                    </div>       
                                                            </div>      
                                                    </el-tab-pane>
                                                </el-tabs>
                                        </div>
                                 
                                    </div>
                            </div>
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
            import AlertleftTile from "../component/AlertleftTile"
            export default {
                name: "checkAgentinfo",
                props:{
                    ischeckAgentinfo:Boolean,
                },
                components: {
                    AlertleftTile,
                },
                
                data() {
                    return {
                        activeName:'agent1',
                        text:'身体证信息',//二次弹框头部
                        text2:"基本信息",
                        labelPosition: 'left',//form表单左侧靠齐
                        formLabelAlign: {
                            agentInfoList:"",
                            involvedPersonName:"",
                            age:"",
                            commonAddress:"",
                            nowAddress:"",
                            phone:"",
                            identityNumber:"",
                            householdRegisterPlace:"",
                            sexName:"",
                            birthDate:"",
                            countryAreaName:"",
                            maritalStatusName:"",
                            activeAbilityName:"",
                            identityTypeName:"",
                            caseStandingName:"",
                            politicalFaceName:"",
                            criminalAbilityCode:"",
                        },
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
                getAgentinfo(row){
                    this.formLabelAlign=row;
                   // console.log(this.formLabelAlign)
                },
                closenewcase() {
                    this.$emit('closenewcase');
                },
                sure(){
                    //console.log(22)
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
            .checkAgentinfo{
                .el-tabs--card>.el-tabs__header .is-active{
                border:1px solid #2f8ded;
                }
                .secondHead{
                    background: #cbe5f3;
                }
                .main1{
                width:14rem;
                padding:0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                background:#fff;
                position:absolute;
                top:0.2rem;
                left:14%;
                border-radius:2px;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
                }
                .content2{
                    overflow: auto;
                    height: 7rem;
                    width:100%;
                    background: #ECEFF0;
                    min-height:4rem;
                    padding:0.2rem 0.3rem 0 0;
                    .el-tabs__item {
                        /*padding: 0 .2rem;*/
                        /*height: .4rem;*/
                        /*line-height: .4rem;*/
                        font-size: .18rem!important;
                    }
                }
                .base-top{
                    display: flex;
                display: -webkit-flex; /* Safari */
                justify-content: space-between;
                            }
                /*label*/
                .el-form-item__label{
                    .f18();
                    top:-0.1rem;
                    width:1.5rem!important;
                }
                .el-form-item__content{
                    .f18();
                    margin-left:1.5rem!important;
                }
                .box{
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
                    /*代理人标题*/
                    .agenttitle{
                        margin-bottom: 0.2rem;
                        border-bottom: 1px solid #ddd;
                        div:nth-child(1){
                            padding: 0rem 0.1rem;
                            margin: 0.1rem 0.1rem;
                            height: 0.3rem;
                            border-left:3px solid #2f8ded;
                        }
                       
                    }
                }
                /*input框*/
                .el-input{
                    width:2rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                .bt{
                       display: flex;
                        display: -webkit-flex; 
                        justify-content: center;
                        align-items: center;
                        width:100%;
                        margin:0.2rem 0;
                        &>div{
                            cursor:pointer;
                            font-size: 0.2rem;
                            line-height:.3rem;
                        }
                        img{
                            width:.2rem;
                            margin-right:.05rem;
                        }
                        .qure{
                            color: #45A1D1;
                            margin-right:.5rem;
                        }
                    }
                div.btn{
                    .fr();
                    width:100%;
                    .el-button.is-round {
                        padding:.1rem .2rem;
                    }
                    .blu{
                        margin:.2rem 0;
                        background:#edf5ff;
                        border:1px solid #BEDEFF;
                        span{
                            color:#409EFF ;
                            .f16();
                        }
                    }
                }
            }
        </style>