<template>
    <div class="waringalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="iswaring">
                <div class="main">
                    <img class="imgloge" src="../images/courtsupervision/wareiocn.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <div class="head">
                        警告提示<br/>
                        <span>重要警告</span>
                    </div>
                    <div class="content">
                        {{text || ''}}
                    </div>
                    <!--底部按钮-->
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
    export default {
        name: "waringalert",
        props:[
            'iswaring',
            'text',
        ],
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('wareshow');
            },
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .waringalert{
        .main {
            width: 4.22rem;
            padding: 0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38,78,119,.2);
            background: #fff;
            position: absolute;
            left: 50%;
            top: 3rem;
            margin-left: -2.11rem;
            border-radius: 2px;
            @import url('../css/alertimg.less');
            /*头部*/
            .head{
                width:100%;
                padding:.15rem 0;
                height:.6rem;
                .f20();
                span{
                    .f14();
                    color: rgba(0,0,0,0.54);
                }
            }
            /*主体*/
            .content{
                width:100%;
                padding: 0 0 .15rem;
                .f18();
                color: rgba(0,0,0,0.54);
                line-height:.24rem;
                border-bottom: 1px solid rgba(0,0,0,0.12);
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>