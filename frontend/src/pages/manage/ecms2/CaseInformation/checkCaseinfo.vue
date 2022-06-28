<template>
        <div class="checkCaseinfo">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-show="ischeckCaseinfo">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                        <AlertleftTile :text="text" :text2="text2"/>
                        <div class="content1">
                            <!-- 此功能一期不做 -->
                            <!-- <el-select v-model='caseNumber' placeholder="案件选择" @change='searchCase' style='padding:0.1rem 0;'>
                                <el-option v-for="item in caseNlist" :key="item.caseInfoId" :label="item.name" :value="item.caseInfoId">
                                </el-option>
                            </el-select> -->
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="基本信息" name="check1">
                                    <check1 ref='check1'/>
                                </el-tab-pane>
                                <!--<el-tab-pane label="当事人/代理人信息" name="check2">-->
                                    <!--<check2 ref='check2'/>-->
                                <!--</el-tab-pane>-->
                                <el-tab-pane label="排期信息" name="check3">
                                    <check3 ref='check3'/>
                                </el-tab-pane>
                                <!-- <el-tab-pane label="案件操作留痕" name="check4">
                                        <check4/>
                                </el-tab-pane> -->
                            </el-tabs>
                        </div>
                        <div class="bt">
                            <div class="qure" @click="qure">
                                <img src="../images/courtsupervision/sure.png" />确定
                            </div>
    
                            <div class="cancel" @click="cancel">
                                <img src="../images/courtsupervision/cancel.png" />取消
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </template>
    
    <script>
        import $ from "jquery"
        import {AllInfoByCaseInfoIdList} from "../js/datajson"
        import AlertleftTile from "../component/AlertleftTile"
        import check1 from "./check1" //基本信息
        //import check2 from "./check2" //客户端信息
        import check3 from "./check3" //设备信息
        //import check4 from "./check4" //设备信息

        export default {
            name: "checkCaseinfo",
            props:{
                ischeckCaseinfo:Boolean,
            },
            components: {
                AlertleftTile,
                check1,
                //check2,
                check3,
                //check4
            },
            data() {
                return {
                    getAllInfoByCaseInfoId:AllInfoByCaseInfoIdList,//引入假数据id所有案件信息
                    //caseNlist:[{caseInfoId:"1",name:"0013案件"},{caseInfoId:"2",name:"0014案件"},{caseInfoId:"3",name:"0015案件"}],
                    text:'案件详情',
                    text2:'查看基本信息',
                    activeName:'check1',
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
                //选择案号此时串联并联案件
                // searchCase(caseInfoId){
                //     // console.log(row) //传的是id值
                //     this.$refs.check1.getAllInfoByCaseInfoId(this.getAllInfoByCaseInfoId);//案件下所有信息请求
                //     this.$refs.check2.getAllInfoByCaseInfoId(this.getAllInfoByCaseInfoId);//案件下所有信息请求
                //     this.$refs.check3.getAllInfoByCaseInfoId(this.getAllInfoByCaseInfoId);//案件下所有信息请求
                //     let _this=this;
                //     _this.isload=true;
                //     const params={
                //         "caseInfoId": caseInfoId,//用户id
                //     };
                //     _this.$http.post('/getAllInfoByCaseInfoId', params).then(data => {
                //         _this.isload=false;
                //         if (data.Code == 1){
                //                this.getAllInfoByCaseInfoId=res.data//所有结果
                //             //    this.ischeckCaseinfo=true;
                //             //    this.$refs.checkCaseinfo.getAllInfoByCaseInfoId(row.caseNumber,,this.getAllInfoByCaseInfoId);
                //             }
                //             else
                //             { _this.$msgw(data.Message);}
                //         }).catch(err => {
                //             _this.isload=false;
                //             _this.$msge('服务器异常，请稍后重试');
                //       })
                // },
                //中转站
                getcheck1(data){
                    this.$refs.check1.getAllInfoByCaseInfoId(data);//案件下所有信息请求
                },
                 //中转站
                 getcheck3(caseInfoId){
                    this.$refs.check3.getAllInfoByCaseInfoId(caseInfoId);//案件下所有信息请求
                },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('selectshow');
                },
                qure() {
                    this.$emit('sure');
                },
                cancel() {
                    this.$emit('cancel');
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .checkCaseinfo{
            .el-input__inner{
                font-size: 0.18rem;
            }
            /*弹框*/
            .main{
                width:14rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:1rem;
                margin-left:-7rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
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
                .content1{
                    width:100%;
                    background: #ECEFF0;
                    min-height:4rem;
                    margin-top:.05rem;
                    padding:0 .2rem;
                    .el-tabs__item {
                        font-size: .18rem!important;
                    }
                    .el-tabs__header{
                        margin:0;
                    }
                }
                .up{
                    width:100%;
                    /*分页*/
                    .page{
                        margin:.2rem 0;
                        span{
                            .f18();
                        }
                        input{
                            .f18();
                        }
                        text-align: center;
                        li.number{
                            .f18()
                        }
                    }
                }
                /*底部*/
                .bt{
                    width:100%;
                    margin:.2rem 0;
                    &>div{
                        cursor:pointer;
                        .f20();
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                    .fc();
                    .qure{
                        color: #45A1D1;
                        margin-right:.5rem;
                    }
                }
            }
        }
    </style>