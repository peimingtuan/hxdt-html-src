<template>
    <div class="waringalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window" v-show="iswaring">
                <div class="main">
                    <!-- <img class="imgloge" src="../images/courtsupervision/kehuduanzhuangtai.png" /> -->
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <div class="head">
                        客户端状态<br/>
                        <span>详细数据显示</span>
                    </div>
                    <div class="content">
                        客户端在开庭状态，不允许后台操作
                    </div>
                    <!--底部按钮-->
                    <alertBtn @qure="sure" @cancel="cancel"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import alertBtn from "../component/alertBtn" //底部按钮
    export default {
        name: "waringalert",
        props:{
            iswaring:Boolean,
            wareshow:Function,
            // sure:Function,
            // cancel:Function,
        },
        components: {
            alertBtn
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
            showAlert() {
                this.$emit('wareshow');
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

<style lang="less" scoped>
    /* @import url('../css/common.less'); */
    .waringalert{
        .alert-window {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
            .main {
                width: 4.22rem;
                padding: 0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.20);
                /*min-height:6.85rem;*/
                background: #fff;
                position: absolute;
                left: 50%;
                top: 3rem;
                margin-left: -2.11rem;
                /*margin-top:-3.425rem;*/
                border-radius: 2px;
                /*左上方login*/

                img.imgloge {
                    position: absolute;
                    top: .2rem;
                    left: .2rem;
                    width: .4rem;
                }

                /*关闭弹框*/

                img.alert-close {
                    width: .18rem;
                    position: absolute;
                    top: .25rem;
                    right: .35rem;
                    cursor: pointer;
                    z-index: 1002;
                }
                /*头部*/
                .head{
                    width:100%;
                    padding:.15rem 0;
                    height:.6rem;
                    /* .f20(); */
                    span{
                        /* .f14(); */
                        color: rgba(0,0,0,0.54);
                    }
                }
                /*主体*/
                .content{
                    /* .f18(); */
                    color: rgba(0,0,0,0.54);
                    line-height:.24rem;
                }
            }
        }
    }
</style>