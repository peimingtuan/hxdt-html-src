<template>
    <div class="casealert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window" v-if="alertshow">
                <div class="main">
                    <!--加载loading-->
                    <loading :load="isload" :text="loadingtext" />
                    <img class="alert-close" @click="show" src="../images/alert-close.png" />
                    <div class="page-num">
                        <div class="text" v-for="item in textlist">
                            <div class="title">{{item.head}}</div>
                            <div class="cn-text" v-for="li in item.list">
                                <span class="bold">{{li.title}}</span>
                                <span>{{li.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
    import http from "../js/http" //http请求
    import getApiUrl from "../js/getApiUrl"
    import loading from "./loading" //loading
    export default {
        name: "casealert",
        components: {
            loading
        },
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        data() {
            const item={
                head:'合同法',
                list:[
                    {
                        title:'第一百九十条',
                        text:'侵害公民身体造成侵害的，侵害公民身体侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公造成侵害的侵害公民身体造成侵害的侵害公民身体造成侵害的。',

                    } ,
                    {
                        title:'第一百九十条',
                        text:'侵害公民身体造成侵害的，侵害公民身体造成侵害的侵害公民身体造成侵害的侵害公民身体造成侵害的。',
                    }
                ]
            };
            return {
                //加载loading
                isload:false,
                loadingtext:'努力加载中，请稍后...',
                //法律内容
                textlist:Array(10).fill(item)
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
            //获取内容接口
            gethttp(val){
                console.log(val)
                let _this=this;
                _this.isload=true;
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    id:name
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {

                    } else {
                        _this.$message({
                            message: data.Message,
                            showClose: true,
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    _this.isload=false;
                    _this.$message({
                        message: '服务器异常，请稍后重试',
                        showClose: true,
                        type: 'error'
                    });
                })
            },
            //注册弹框显示与否事件
            show() {
                this.$emit('selectshow');
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .casealert{
        /*弹框*/
        .alert-window{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
            .main{
                width:9.14rem;
                height:6.85rem;
                background:#fff;
                position:absolute;
                left:50%;
                top:50%;
                margin-left:-4.57rem;
                margin-top:-3.425rem;
                border-radius:5px;
                img.alert-close{
                    width:.18rem;
                    position:absolute;
                    top: .25rem;
                    right: .35rem;
                    cursor: pointer;
                    z-index:1002;
                }
                .page-num{
                    height:6rem;
                    overflow: auto;
                    &>div.text {
                        margin:0 .63rem;
                        padding-bottom:.3rem;
                        line-height: .36rem;
                        border-bottom: 1px solid #DCDFE6;
                        .title{
                            .f20();
                            text-align: center ;
                            font-weight:bold;
                            line-height:.85rem;
                        }
                        .cn-text{
                            line-height:.36rem;
                            span {
                                .f18();
                            }
                            .bold {
                                margin-right: .2rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>