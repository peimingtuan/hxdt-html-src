<template>
    <div class="lawalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window" v-if="alertshow">
                    <div class="main">
                        <!--加载loading-->
                        <loading :load="pageindex&&isload" :text="loadingtext" />
                        <!--加载loading-->
                        <loading class="rgba" :load="!pageindex&&isload" :text="loadingtext" />
                        <div class="title">
                            中华人民共和国合同法
                            <img @click="show" src="../images/alert-close.png" />
                        </div>
                        <div class="page-num">
                            <div class="text" :class="pageindex&&backcolor&&index==2?'backcolor':''" v-for="(item,index) in textlist2">
                                <span class="bold">{{item.title}}</span>
                                <span>{{item.text}}</span>
                            </div>
                        </div>
                        <!--分页-->
                        <el-pagination
                                class="page"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="1"
                                :page-sizes="[10]"
                                :page-size=size
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=total>
                        </el-pagination>
                    </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
    import loading from "./loading" //loading
    export default {
        name: "lawalert",
        components: {
            loading
        },
        props:{
            alertshow:Boolean,//弹框
            selectshow:Function,
        },
        data() {
            const item={
                title:'第一百九十条',
                text:'侵害公民身体造成侵害的，侵害公民身体侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公侵害公民身体造成侵害的侵害公造成侵害的侵害公民身体造成侵害的侵害公民身体造成侵害的。',
                num:20
            };
            return {
                //加载loading
                isload:false,
                loadingtext:'努力加载中，请稍后...',
                //法律内容
                textlist2:Array(10).fill(item),
                //分页
                total:100,//总条数
                size:10,//每页条数
                pageindex:true,//首次加载
                backcolor:false,//是否需要展示背景
                catinid:''//当前法规id
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
            //接口请求
            gethttp(catinid,page,isfirst,qure){//catinid法规id,page当前页码,isfirst是否是第一次加载,qure控制背景变量
                let _this=this;
                if(isfirst){//首次加载
                    _this.pageindex=true
                    if(qure)_this.backcolor=true
                }else{
                    _this.pageindex=false
                }
                _this.isload=true;
                _this.$http.post('/vehicle-examine/car-order-list', {
                    id:catinid,//法规id
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {

                    } else {
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.isload=false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //注册弹框打开关闭事件
            show() {
                this.$emit('selectshow');
            },
            //分页
            //每页展示条数
            handleSizeChange(size){
                this.size=size;
                console.log(size)
            },
            //当前页数
            handleCurrentChange(page){
                this.gethttp(this.catinid,page,false);//catinid法规id,page当前页码,false是否是第一次加载
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .lawalert{
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
                width:14.07rem;
                height:8.6rem;
                background:#fff;
                position:absolute;
                left:50%;
                top:50%;
                margin-left:-7.035rem;
                margin-top:-4.3rem;
                border-radius:5px;
                .title{
                    /*margin:.28rem 0;*/
                    line-height:.8rem;
                    position:absolute;
                    .f20();
                    text-align: center ;
                    font-weight:bold;
                    position:relative;
                    box-shadow:0 1px 1px 0 rgba(38,78,119,0.20);
                    img{
                        width:.2rem;
                        position:absolute;
                        top:.3rem;
                        right:.3rem;
                        cursor:pointer;
                        z-index:1002;
                    }
                }
                .page-num{
                    position:relative;
                    height:7rem;
                    overflow: auto;
                    /*选中的添加背景色*/
                    .backcolor{
                        background: rgba(47,141,237,.1);
                    }
                    &>div.text {
                        padding:.2rem .63rem .3rem;
                        line-height: .36rem;
                        span {
                            font-size: .2rem;
                        }

                        .bold {
                            margin-right: .2rem;
                        }
                    }
                }
                /*分页*/
                .page{
                    span{
                        .f18();
                    }
                    input{
                        .f18();
                    }
                    margin:.1rem 0;
                    text-align: center;
                    li.number{
                        .f18()
                    }
                }
            }
        }
    }
</style>