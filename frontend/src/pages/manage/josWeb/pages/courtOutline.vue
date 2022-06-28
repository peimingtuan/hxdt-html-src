<template>
    <div class="courtOutline">
        <!--查看pdf弹框-->
        <checkpdf ref="checkpdf" />
        <!--精细化-->
        <div v-if="listinfo.isAnalsis">
            <!--有分类-->
            <div>
                <div class="empty" v-if="listinfo.titleList.length===0">暂无数据</div>
                <div class="main2"  v-for="(item,index) in listinfo.titleList" :key="index">
                    <!--无异议要素-->
                    <div v-if="item.trialElementType==2">
                        <div class="btn">
                            <img class="icon-img" src="../images/courtOutline/green.png"/>
                            <el-button type="primary" round>无异议要素</el-button>
                            <span @click="turnshow">
                                展示具体问题
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                             </span>
                        </div>
                        <transition name="slide2-fade">
                            <div v-if="turn" class="table-list">
                                <div class="top flex">
                                    <div class="flex-1 top-1">案件要素</div>
                                    <div class="flex-2 top-2">原告方确认信息</div>
                                    <div class="flex-3 top-3">被告方确认信息</div>
                                </div>
                                <div class="content">
                                    <div class="bg">保证合同</div>
                                    <div class="flex">
                                        <div class="flex-1">文件要素</div>
                                        <div class="flex-2">是</div>
                                        <div class="flex-3">否</div>
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="bg">保证合同</div>
                                    <div class="flex">
                                        <div class="flex-1">文件要素</div>
                                        <div class="flex-2">是</div>
                                        <div class="flex-3">否</div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        <transition name="slide2-fade">
                            <div v-if="!turn">
                                <div class="main" :class="index==listinfo.titleList.length-1 && index2==item.contentList.length-1?'last':''" v-for="(its,index2) in item.contentList" :key="index2">
                                    <div class="title">
                                        <div class="icon"></div>
                                        <div class="title-text">{{its.trialNodeName}}</div>
                                    </div>
                                    <div v-for="it in its.trialoutlineContents">
                                        <div class="void-em">
                                            <span v-html="it.content"></span>
                                            <img v-if="it.trialType==1" src="../images/courtOutline/fagaun.png"/>
                                        </div>
                                        <div v-if="type==1" class="content" v-for="i in it.trialOutlineRels" :key="i.id">
                                            <span @click="openpdf(i.pdfFileUrl)" >{{i.fileName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div v-else>
                        <!--有异议要素-->
                        <div class="btn" v-if="item.trialElementType==1">
                            <img class="icon-img" src="../images/courtOutline/red.png"/>
                            <el-button type="primary" round>有异议要素</el-button>
                        </div>
                        <!--缺失要素-->
                        <div class="btn" v-else-if="item.trialElementType==3">
                            <img class="icon-img" src="../images/courtOutline/orange.png"/>
                            <el-button type="primary" round>缺失要素</el-button>
                        </div>
                        <!--法官添加-->
                        <div class="btn" v-else-if="item.trialElementType==4">
                            <img class="icon-img" src="../images/courtOutline/orange.png"/>
                            <el-button type="primary" round>法官添加</el-button>
                        </div>
                        <div class="main" :class="index==listinfo.titleList.length-1 && index2==item.contentList.length-1?'last':''"   v-for="(its,index2) in item.contentList" :key="index2">
                            <div class="title">
                                <div class="icon"></div>
                                <div class="title-text">{{its.trialNodeName}}</div>
                            </div>
                            <div v-for="it in its.trialoutlineContents">
                                <div class="void-em" >
                                    <span v-html="it.content"></span>
                                    <img v-if="it.trialType==1" src="../images/courtOutline/fagaun.png"/>
                                </div>
                                <div v-if="type==1" class="content" v-for="i in it.trialOutlineRels" :key="i.id">
                                    <span @click="openpdf(i.pdfFileUrl)">{{i.fileName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--无分类-->
            <!--<div v-else>-->
                <!--<div class="main2"  v-for="(item,index) in listinfo.titleList" :key="index">-->
                    <!--<div class="main" :class="index==listinfo.titleList.length-1 && index2==item.contentList.length-1?'last':''"   v-for="(its,index2) in item.contentList" :key="index2">-->
                        <!--<div class="title">-->
                            <!--<div class="icon"></div>-->
                            <!--<div class="title-text">{{its.trialNodeName}}</div>-->
                        <!--</div>-->
                        <!--<div v-for="it in its.trialoutlineContents">-->
                            <!--<div class="void-em" >-->
                                <!--<span v-html="it.content"></span>-->
                                <!--<img v-if="it.trialType==1" src="../images/courtOutline/fagaun.png"/>-->
                            <!--</div>-->
                            <!--<div class="content" v-for="i in it.trialOutlineRels" :key="i.id">-->
                                <!--<span @click="openpdf(i.pdfFileUrl)" >{{i.fileName}}</span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <!--非精细化-->
        <div class="main" v-else :class="index==listinfo.notAnalsis.length-1?'last':''" v-for="(item,index) in listinfo.notAnalsis" :key="index">
            <div class="title">
                <div class="icon"></div>
                <div class="title-text">
                    <span v-html="item.content"></span>
                    <img v-if="item.trialType==1" src="../images/courtOutline/fagaun.png"/>
                </div>
            </div>
            <div v-if="type==1" class="content" v-for="its in item.trialOutlineRels" :key="its.id">
                <span @click="openpdf(its.pdfFileUrl)" >{{its.fileName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import checkpdf from  '../component/checkpdf'
    export default {
        name: "courtOutline",
        components: {
            checkpdf
        },
        data() {
            return {
                type:this.$route.query.type || 1,//分类，1位jos法官端，2为cos书记员端
                turn:false,
                userId:"",//用户Id
                caseNumber:"",//案号
                courtTime:'',//庭次,
                courtCode:'',//法院代码
                listinfo: {

                }
            }
        },
        created() {
            this.userId=this.$route.query.userId;
            this.caseNumber=this.$route.query.caseNumber;
            this.courtTime=this.$route.query.courtTime;
            this.courtCode=this.$route.query.courtCode;
            this.getInfo()
        },
        methods: {
            //获取庭审提纲信息
            getInfo(){
                let {userId,caseNumber,courtTime,courtCode}=this;
                let _this=this;
                _this.$showLoading();
                _this.$http.post('/client/web/getTrialoutlines',{
                    userId,//用户id
                    caseNumber,//案号
                    courtTime,//庭次
                    courtCode,//法院代码
                }).then(data =>{
                    _this.$hideLoading();
                    if(data.code===200){
                        _this.listinfo=data.data;
                        console.log(_this.listinfo)
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading();
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //展示具体问题
            turnshow(){
                this.turn=!this.turn;
            },
            //打开pdf文档
            openpdf(pdfFileUrl){
                this.$refs.checkpdf.url=pdfFileUrl;
                this.$refs.checkpdf.alertshow=true;
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .courtOutline{
        width:100%;
        padding:10px 50px;
        .empty{
            margin:100px auto;
            .cb();
            .f22();
            text-align: center;
        }
        .main,.main2{
            position:relative;
            &:before{
                content: "";
                width: 1px;
                height: 100%;
                border-radius: 100%;
                background: #2F8DED;
                position: absolute;
                left: -10px;
                /*top:12px;*/
                top:14px;
            }
            &.last:before{
                background: #fff !important;
            }
        }
        .main{
            .title{
                padding-left:10px;
                position:relative;
                .icon{
                    &:before{
                        content: "";
                        width:10px;
                        height:10px;
                        border-radius: 100%;
                        background:#2F8DED ;
                        position: absolute;
                        left:-14px;
                        /*top:10px;*/
                        top:14px;
                    }
                }
                &-text{
                    line-height:38px;
                    span{
                        .f20();
                    }
                    img{
                        margin-left:5px;
                        width:48px;
                        position:relative;
                        top:-2px;
                    }
                }
            }
            .content{
                padding-left:10px;
                line-height:36px;
                span{
                    .cb();
                    cursor:pointer;
                    text-decoration:underline;
                }
            }
        }
        .main2{
            .title-text{
                .cb();
            }
            .void-em{
                padding-left:10px;
                line-height:38px;
                img{
                    margin-left:5px;
                    width:48px;
                    position:relative;
                    top:-2px;
                }
            }
            .btn{
                padding-left:10px;
                margin:10px 0;
                position:relative;
                .el-button.is-round{
                    padding:10px 23px;
                    span{
                        .f20();
                    }
                }
                .el-button--primary{
                    .cb();
                    background:#edf5ff;
                    border-color:#2F8DED;
                }
                &>span{
                    .cb();
                    cursor:pointer;
                }
                .icon-img{
                    position:absolute;
                    width:22px;
                    left:-21px;
                    top:8px;
                }
                .transform{
                    transform:rotate(180deg);
                    -webkit-transform:rotate(180deg);
                }
            }
            .table-list{
                margin:10px 0;
                padding-left:10px;
                .top{
                    background:#2F8DED;
                    line-height:48px;
                    text-align:center;
                    color:#fff;
                    &-2,&-3{
                        border-left:1px solid #fff;
                    }
                }
                .content,.content2{
                    border-left:1px solid #DCDFE6;
                    border-right:1px solid #DCDFE6;
                    .bg{
                        background: #F5F7FA;
                        line-height:48px;
                        padding:0 20px;
                    }
                    .flex{
                        &-1{
                            padding:0 20px;
                            border-bottom:1px solid #DCDFE6;
                        }
                        &-2,&-3{
                            text-align:center;
                            border-left:1px solid #DCDFE6;
                            border-bottom:1px solid #DCDFE6;
                        }
                    }
                }
                div.flex{
                    .fb();
                    line-height:48px;
                    &-1{
                        width:50%;
                    }
                    &-2,&-3{
                        width:25%;
                    }
                }
            }
        }
    }
</style>