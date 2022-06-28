<template>
    <div class="courtOutline2">
        <!--查看pdf弹框-->
        <checkpdf ref="checkpdf" />
        <!--精细化-->
        <div v-if="listinfo.isAnalsis">
            <!--有分类-->
            <div>
                <div class="main2"  v-for="(item,index) in listinfo.titleList" :key="index">
                    <!--无异议要素-->
                    <div class="main3" v-if="item.trailElementType==2">
                        <div class="main-top-head" v-if="item.trailElementType==2">
                            <div class="le">无异议要素</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
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
                            <div class="main" v-else :class="index==listinfo.titleList.length-1 && index2==item.contentList.length-1?'last':''" v-for="(its,index2) in item.contentList" :key="index2">
                                <div class="title">
                                    <div class="title-text">{{its.trialNodeName}}</div>
                                </div>
                                <div v-for="it in its.trailoutlineContents">
                                    <div class="void-em">
                                        <span v-html="it.content"></span>
                                        <img v-if="it.trailType==1" src="../images/courtOutline/fagaun.png"/>
                                    </div>
                                    <div v-if="type==1" class="content" v-for="i in it.trialOutlineRels" :key="i.id">
                                        <span @click="openpdf(i.pdfFileUrl)" >{{i.fileName}}</span>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="main3" v-else>
                        <!--有异议要素-->
                        <div class="main-top-head" v-if="item.trailElementType==1">
                            <div class="le">有异议要素</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
                        </div>
                        <!--缺失要素-->
                        <div class="main-top-head" v-else-if="item.trailElementType==3">
                            <div class="le">缺失要素</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
                        </div>
                        <!--法官添加-->
                        <div class="main-top-head" v-else-if="item.trailElementType==4">
                            <div class="le">法官添加</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
                        </div>
                        <div class="main" :class="index==listinfo.titleList.length-1 && index2==item.contentList.length-1?'last':''"   v-for="(its,index2) in item.contentList" :key="index2">
                            <div class="title">
                                <div class="title-text">{{its.trialNodeName}}</div>
                            </div>
                            <div v-for="it in its.trailoutlineContents">
                                <div class="void-em" >
                                    <span v-html="it.content"></span>
                                    <img v-if="it.trailType==1" src="../images/courtOutline/fagaun.png"/>
                                </div>
                                <div v-if="type==1" class="content" v-for="i in it.trialOutlineRels" :key="i.id">
                                    <span @click="openpdf(i.pdfFileUrl)">{{i.fileName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--非精细化-->
        <div class="main main3" v-else :class="index==listinfo.notAnalsis.length-1?'last':''" v-for="(item,index) in listinfo.notAnalsis" :key="index">
            <div class="title">
                <div class="title-text">
                    <span v-html="item.content"></span>
                    <img v-if="item.trailType==1" src="../images/courtOutline/fagaun.png"/>
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
        name: "courtOutline2",
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
                    "isAnalsis":true,//是否精细化案由 true是,false不
                    //"isShowType": "0",//是否有一级标题 1是,0不 1有镖头
                    "titleList": [
                        {
                            "trailElementType": "1",//1=有异议要素； 2=无异议要素； 3=缺失要素； 4=法官添加
                            "contentList": [
                                {
                                    "trialNodeName": "原告损失情况",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "残疾赔偿金被告有无异议",
                                            "trailType": "1",
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "28787874531",
                                            "content": "原告主张被抚养人生活费是否有证据，如何计算？被告有无异议？",
                                            "trailType": "系统推送",
                                            "trialOutlineRels": []
                                        }
                                    ]
                                },
                                {
                                    "trialNodeName": "交通事故认定",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "双方对交通事故过程及事故认定是否有异议？",
                                            "trailType": "系统推送",//1是法官,2是系统
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "trailElementType": "2",//1=有异议要素； 2=无异议要素； 3=缺失要素； 4=法官添加
                            "contentList": [
                                {
                                    "trialNodeName": "原告损失情况",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "残疾赔偿金被告有无异议",
                                            "trailType": "1",
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "28787874531",
                                            "content": "原告主张被抚养人生活费是否有证据，如何计算？被告有无异议？",
                                            "trailType": "系统推送",
                                            "trialOutlineRels": []
                                        }
                                    ]
                                },
                                {
                                    "trialNodeName": "交通事故认定",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "双方对交通事故过程及事故认定是否有异议？",
                                            "trailType": "系统推送",
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "trailElementType": "3",//1=有异议要素； 2=无异议要素； 3=缺失要素； 4=法官添加,0不显示
                            "contentList": [
                                {
                                    "trialNodeName": "原告损失情况",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "残疾赔偿金被告有无异议",
                                            "trailType": "1",
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "28787874531",
                                            "content": "原告主张被抚养人生活费是否有证据，如何计算？被告有无异议？",
                                            "trailType": "系统推送",
                                            "trialOutlineRels": []
                                        }
                                    ]
                                },
                                {
                                    "trialNodeName": "交通事故认定",
                                    "trailoutlineContents": [
                                        {
                                            "id": "1231231",
                                            "content": "双方对交通事故过程及事故认定是否有异议？",
                                            "trailType": "系统推送",
                                            "trialOutlineRels": [
                                                {
                                                    "fileName": "伤残鉴定书",
                                                    "sfId": "222222",
                                                    "pdfFileUrl": "www.baidu.com"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "notAnalsis":[//非精细化
                        {
                            "id":"id",
                            "content":"庭审提纲内容",
                            "trailType":"庭审类型 1法官、2系统",
                            "trialOutlineRels":[
                                {
                                    "fileName":"相关证据名称",
                                    "sfId":"卷宗id",
                                    "wordFileUrl":"电子卷宗对应word地址",
                                    "pdfFileUrl":"电子对应pdf地址"
                                }
                            ]
                        }
                    ]
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
                _this.$http.post('/client/getTrailoutlines',{
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
    .courtOutline2{
        width:100%;
        padding:10px 50px;
        .main3{
            margin-bottom:15px;
            padding-bottom:5px;
            box-shadow: -1px 1px 1px 0 rgba(38,78,119,.2),1px -1px 1px 0 rgba(38,78,119,.2);
        }
        .main{
            .title{
                margin-top:5px;
                padding-left:10px;
                position:relative;
                background: #F5F7FA;
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
           .main-top-head{
               padding:10px 20px;
               border-bottom:1px solid #DCDFE6;
               .fb();
               .le{
                   border-left:4px solid #1989FA;
                   padding-left:10px;
                   line-height:26px;
               }
               .ri{
                   .cb();
                   cursor:pointer;
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