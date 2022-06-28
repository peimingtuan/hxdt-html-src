<template>
    <div class="casetext">
        <!--加载loading-->
        <loading class="fill" :load="isload" :text="loadingtext" />
        <div class="head">
            <img src="../images/alert-close.png" @click="closepage"/>
            {{textlist.caseName}}
        </div>
        <!--标题栏-->
        <div class="title">
            <div class="cen">
                <!--<div v-for="item in list">-->
                    <!--<span>{{item.name}}</span>-->
                    <!--{{item.num}}-->
                <!--</div>-->
                <div>
                    <span>【裁判法院】</span>{{textlist.courtOriginalName}}
                </div>
                <div>
                    <span>【裁判性质】</span>{{casetype}}
                </div>
                <div>
                    <span>【案列字号】</span>{{textlist.wordNo}}
                </div>
                <div>
                    <span>【裁判日期】</span>{{textlist.judgeDate}}
                </div>
            </div>
        </div>
        <!--正文-->
        <div class="content">
            <div class="top-1">
                {{textlist.caseName}}
            </div>
            <div class="text" v-if="textlist!=''" v-html="textlist.caseBody.replace(new RegExp('\r\n','g'),'<div>')">
            </div>
        </div>
        <!--底部-->
        <!--<div class="bottom">{{textlist.wordNo}}</div>-->
    </div>
</template>

<script>
    import $ from "jquery"
    import loading from "../component/loading" //loading
    export default {
        name: "casetext",
        components: {
            loading
        },
        data() {
            return {
                //加载loading
                isload:false,
                loadingtext:'加载中，请稍后...',
                textlist:'',
                casetype:this.$route.query.casetype || ''
            }
        },
        beforeCreate() {

        },
        created() {
            this.gethttp();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //返回上一页
            closepage(){
                window.history.back();
            },
            //案列正文
            gethttp(){
                let _this=this;
                _this.isload=true;
                _this.$http.post('/cms/nosecure/getCasecontentWebPage.action', {
                    caseid:_this.$route.query.caseid || 49257884//案例id
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {
                        _this.textlist=data.Result;
                    } else {
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.isload=false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .casetext{
        .head{
            cursor:pointer;
            padding:.31rem .6rem;
            color: #000000;
            line-height:.3rem;
            .f22();
            img{
                width:.2rem;
                margin-right:.2rem;
            }
        }
        .title{
            /*height:2.23rem;*/
            background: #F2F6FC;
            .cen{
                margin:0 2.9rem;
                min-width: 11.85rem;
                padding:.16rem 0;
                .fb();
                flex-wrap: wrap;//必要时进行换行
                &>div{
                    width:5.925rem;
                    line-height:.38rem;
                    color: #1567BA;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span{
                        .f20();
                        margin-right:.05rem;
                    }
                    .f20();
                }
                /*&>div:nth-of-type(even){*/
                    /*text-align: right;*/
                /*}*/
            }
        }
        .content{
            .top-1{
                .f20();
                line-height:.88rem;
                text-align: center;
                color: #000000;
            }
            .text{
                padding:0 .6rem;
                color: #303133;
                .f18();
                line-height:.36rem;
                text-align: justify;
                text-indent:2em;
                margin-bottom: .1rem;
                div{
                    .f18();
                }
            }
        }
        .bottom{
            text-align: center;
            line-height:.36rem;
            .f18();
        }
    }
</style>