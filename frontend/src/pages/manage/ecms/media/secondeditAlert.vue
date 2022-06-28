<template>
    <div>
        <transition name="slide-fade">
            <div class="second-alert" v-show="true">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/kehuduan.png" />
                    <img class="alert-close" @click="showAlert=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content1">
                        <div class="content1-div1">
                            网络配置
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <div class="flex">
                                    <el-form-item label="内网网卡">
                                        <el-input v-model="formLabelAlign.intranet1Name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="内网IP地址">
                                        <el-input v-model="formLabelAlign.intranet1Ip"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="flex">
                                    <el-form-item label="外网网卡">
                                        <el-input v-model="formLabelAlign.extranet1Name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="外网IP地址">
                                        <el-input v-model="formLabelAlign.extranet1Ip"></el-input>
                                    </el-form-item>
                                </div>
                                <el-form-item label="网卡描述" prop="desc">
                                    <el-input type="textarea" v-model="formLabelAlign.desc" placeholder="......"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="sureedit">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="showAlert=false">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "secondeditAlert",
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
        methods: {}
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    /*弹框*/
    .main{
        width:14rem;
        padding:0 .8rem;
        box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
        background:#fff;
        position:absolute;
        left:50%;
        top:1.5rem;
        margin-left:-7rem;
        border-radius:2px;
        @import url('../css/alertimg.less');
        .content1{
            width:100%;
            background: #ECEFF0;
            min-height:4rem;
            margin-top:.1rem;
            padding:0 .2rem;
            .el-form{
                .fb();
                flex-wrap: wrap;
            }
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
            }
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
            /*文本域*/
            .el-textarea{
                width:5rem;
            }
            /*button*/
            .el-button {
                position: relative;
                top: -.02rem;
                width: .9rem;
                line-height: .36rem;
                padding: 0;
                background:#409eff;
                span {
                    .f18();
                    color: #fff;
                }
            }
            &-div1{
                .f20();
                .el-form{
                    .flex{
                        width:100%;
                        .fb();
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
                    background: #E3E7E8;
                    .b(1px,#C6C6C6);
                    margin:.1rem 0;
                    padding:.1rem .3rem;
                    .el-form-item__label{
                        width:1.2rem!important;
                    }
                    .el-form-item__content{
                        margin-left:1.2rem!important;
                    }
                }
            }
        }
        /*底部*/
        @import url('../css/alertbtn.less');
    }
</style>