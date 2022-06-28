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
                        <div class="text" v-if="textlist.length>0 && index>0" v-for="(item,index) in textlist">
                            <div class="title">{{item.provname}}</div>
                            <div class="cn-text">
                                <span v-html="item.provtext.replace(new RegExp('\r\n','g'),'<br/>')"></span>
                            </div>
                        </div>
                        <div class="empty" v-else-if="textlist.length===0">暂无数据</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
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
            return {
                //加载loading
                isload:false,
                loadingtext:'努力加载中，请稍后...',
                //法律内容
                textlist:[]
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
                _this.$http.post('/cms/nosecure/getCasecontentWebPage.action', {
                    caseid:val//案例id
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {
                        if(data.Result.lawprov.length!=0){
                            console.log(data.Result)
                            _this.textlist=data.Result.lawprov;//法规名称列表
                        }else{
                            _this.$msge('没有数据');
                        }
                    } else {
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.isload=false;
                    _this.$msge('服务器异常，请稍后重试');
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
                    /*暂无数据*/
                    .empty{
                        line-height:.8rem;
                        text-align: center;
                        color: #2F8DED;
                        .f22()
                    }
                }
            }
        }
    }
</style>