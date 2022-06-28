<template>
        <div class="idcardCollection">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-show="isidcardCollection">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                        <AlertleftTile :text="text" :text2="text2"/>
                        <div class="contentid">
                                <el-form :label-position="labelPosition">
                                        <el-form-item label="姓名">韦小宝</el-form-item>
                                        <el-form-item label="性别">男</el-form-item>
                                        <el-form-item label="出生日期">1654年12月20日</el-form-item>
                                        <el-form-item label="住址">北京市公安局东城分局</el-form-item>
                                        <el-form-item label="身份证号码">11204416541220243x</el-form-item>
                                        <el-form-item label="发证机关">发证机关：北京市公安局东城分局</el-form-item>
                                        <el-form-item label="有效期">1675.03.12-2175.03.11</el-form-item>
                                </el-form>
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
        import AlertleftTile from "../component/AlertleftTile"

        export default {
            name: "idcardCollection",
            props:{
                isidcardCollection:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    text:'身份证采集',
                    text2:'查看基本信息',
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
                //中转站
                getcheck1(data,e){
                    //console.log(data,e)
                    this.$refs.check1.getAllInfoByCaseInfoId(data,e);//案件下所有信息请求
                },
                 //中转站
                 getcheck2(data){
                    //console.log(data,e)
                    this.$refs.check2.getAllInfoByCaseInfoId(data);//案件下所有信息请求
                },
                 //中转站
                 getcheck3(data){
                    //console.log(data,e)
                    this.$refs.check3.getAllInfoByCaseInfoId(data);//案件下所有信息请求
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
        .idcardCollection{
            /*弹框*/
            .main{
                width:14rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:1.5rem;
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
                .contentid{
                    width:100%;
                    background: #ECEFF0;
                    min-height:4rem;
                    margin-top:.05rem;
                    padding:0 .2rem;
                    .el-form-item__label{
                        .f18();
                    }
                    .el-tabs__item {
                        /*padding: 0 .2rem;*/
                        /*height: .4rem;*/
                        /*line-height: .4rem;*/
                        font-size: .18rem!important;
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
                    margin:.3rem 0;
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