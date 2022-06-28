<template>
    <div class="checkpdf">
        <transition name="slide-fade">
            <div class="alert-window" v-show="alertshow">
                <div class="content">
                    <div class="title">
                        <img class="alert-close" @click="alertshow=false" src="../images/alert-close.png" />
                    </div>
                    <div class="main-pdf">
                        <iframe width="100%" height="100%" style="border:none" :src=url></iframe>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "checkpdf",
        data(){
            return {
                alertshow:false,
                url:''
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .checkpdf{
        .content {
            width: 90%;
            height:90%;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            background: #fff;
            position: absolute;
            left: 50%;
            top: 5%;
            margin-left: -45%;
            /*margin-top:-40%;*/
            border-radius: 2px;
            .title{
                position:relative;
                height:10%;
                background:#FAFAFA;
                .alert-close{
                    cursor:pointer;
                    position:absolute;
                    width:20px;
                    top:50%;
                    right:10px;
                    transform: translate(-50%,-50%);
                }
            }
            .main-pdf{
                height:90%;
            }
        }
    }
</style>