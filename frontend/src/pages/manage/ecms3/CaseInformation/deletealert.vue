<template>
        <div class="deletealert">
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="alert-window" v-if='isdelete'>
                            <div class="main">
            <!--弹框-->
            <el-row class='onerow5'>
                            <img class="imgloge" src="../images/CaseManagement/casemanage.png" />
                            <img class="alert-close" @click="closeAlert" src="../images/alert-close.png" />
                            <div class="head">删除案件<br/>
                                <span>重要警告</span>
                            </div>
                            <div class="content">
                                    确定要删除此案件吗
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
            </el-row>
                            </div>
                    </div>
                </transition>
        </div>
    </template>
    
    <script>
        export default {
            name: "deletealert",
            props:{
                isdelete:Boolean,
            },
            data() {
                return {}
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
                //注册弹框显示与否事件
                closeAlert() {
                    this.$emit('closeAlert');
                },
                sure(){
                    // console.log(caseInfoId)
                    // let _this=this;
                    // _this.isload=true;
                    // const params={
                    //     "caseInfoId":caseInfoId
                    // };
                    // _this.$http.post('/caseManage/deleteCaseInfo', params).then(data => {
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
        .deletealert{
                   /*弹框*/
                   .alert-window{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
            /* .main{
                width:14rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                min-height:6.85rem;
                background:#fff;
                position:absolute;
                left:50%;
                top:.5rem;
                margin-left:-7rem;
                margin-top:-3.425rem;
                border-radius:2px;
        } */
        }
                    /*底部*/
                    .onerow5{
                        position:absolute;
                        left:35%;
                        top:2.12rem;
                        width:4.22rem;
                        height: 2rem;
                        background: #fff;
                        box-shadow: 0 0 24px 0 rgba(0,0,0,0.22), 0 24px 24px 0 rgba(0,0,0,0.30);

                        /*左上方login*/
                            img.imgloge{
                                            position:absolute;
                                            top: .2rem;
                                            left: .2rem;
                                            width:.4rem;
                                        }
                            /*头部*/
                         .head{
                                width:100%;
                                padding:0.2rem 0 0 0.7rem;
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
                                right: .35rem;
                                cursor: pointer;
                                /* z-index: 1002; */
                }
                      /*主体*/
                      .content{

                          padding: 0.2rem 0 0 1.2rem;
                        /* .f18(); */
                        color: rgba(0,0,0,0.54);
                        /* line-height:.24rem; */
                    }
        }
              
                    .bt{
                   display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    margin:0.4rem 0;
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
    </style>