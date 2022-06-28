<template>
    <div class="casetext">
        <!--加载loading-->
        <loading class="fill" :load="isload" :text="loadingtext" />
        <div class="head">
            <img src="../images/alert-close.png" @click="closepage"/>
            {{textlist.CaseName}}
        </div>
        <!--标题栏-->
        <div class="title">
            <div class="cen">
                <div v-for="item in list">
                    <span>{{item.name}}</span>
                    {{item.num}}
                    <!--<div>-->
                        <!--<span>【裁判法院】</span>-->
                        <!--123-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<span>【案列字号】</span>-->
                    <!--</div>-->
                    <!--<div>【裁判程序】</div>-->
                    <!--<div>【案由主题】</div>-->
                    <!--<div>【审判员】</div>-->
                </div>
            </div>
        </div>
        <!--正文-->
        <div class="content">
            <div class="top-1">
                {{textlist.name}}
            </div>
            <div class="text" v-for="item in textlist.list">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import http from "../js/http" //http请求
    import getApiUrl from "../js/getApiUrl"
    import loading from "../component/loading" //loading
    export default {
        name: "casetext",
        components: {
            loading
        },
        data() {
            const item={
                text:"[裁判摘要]双方当事人明知所发送的电子信息为商业广告性质，却无视手机用户群体是否同意接收商业广告信息的主观意愿，强行向不特定公众发送商业广告短信息，侵害不特定公众的利益，所发送的短信息应认定为垃圾短信，其签订的相关合同无效，所涉价款属于非法所得，人民法院应予收缴。原告：无锡市掌柜无线网络技术有限公司，住所地：江苏省无锡新区长江北路。法定代表人：钟丛姜，该公司总经理。被告：无锡嘉宝置业有限公司，住所地：江苏省无锡市南长区红星路。"
                };
            const item2={
                name:"【裁判法院】",
                num:123
            };
            return {
                //加载loading
                isload:false,
                loadingtext:'加载中，请稍后...',
                textlist:{
                    CaseName:'王某诉王宝',
                    name:'无锡市掌柜无线网络技术有限公司诉无锡嘉宝置业有限公司网络服务合同纠纷案',
                    CourtOriginalName:"江苏法院",
                    WordNo:"案号",
                    JudgeDate:"裁判日期",
                    men:"书记员",
                    list:Array(10).fill(item)
                },
                list:Array(9).fill(item2)
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
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    caseid:_this.$route.query.id//案例id
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {
                        if(data.Result.catlist.length!=0){
                            _this.textlist=data.Result.catlist;//法规名称列表
                        }else{
                            _this.$message({
                                message: '没有数据',
                                showClose: true,
                                type: 'error'
                            });
                        }
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
                flex-wrap: wrap;
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
            }
        }
    }
</style>