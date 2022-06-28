<template>
    <div class="courtmanagement">
        <!--头部-->
        <div class="head">
            <div class="head-top">
                <img src="../images/courtsupervision/lawguanli3.png"/>
                法庭管理 <span>FA TING GUAN LI</span>
            </div>
            <div class="head-foot">
                <div class="le">
                    <el-select v-model="courtRoomStatus" placeholder="状态选择">
                        <el-option
                                v-for="item in options"
                                @click.native="handleSelectcourtRoomStatus(item.id)"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input v-model="courtRoomName" placeholder="法庭名称"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </div>
                <div class="ri">
                    <div class="left-1">
                        <div>
                            智慧法庭总数：{{info.courtTotalNum || 0}}个
                            <span>|</span>
                        </div>
                        <div>
                            正在开庭数：{{info.courtStartNum || 0}}个
                            <span>|</span>
                        </div>
                        <!--<div>-->
                            <!--正在休庭数：{{info.courtAdjournNum || 0}}个-->
                            <!--<span>|</span>-->
                        <!--</div>-->
                        <div>
                            未开庭：{{info.courtCloseNum || 0}}个
                            <!--<span>|</span>-->
                        </div>
                        <!--<div>-->
                            <!--展示顺序-->
                        <!--</div>-->
                    </div>
                    <!--<div class="right-1">-->
                        <!--<el-select v-model="sortvalue" placeholder="状态选择">-->
                            <!--<el-option-->
                                    <!--v-for="item in options2"-->
                                    <!--@change="cityChange"-->
                                    <!--:key="item.id"-->
                                    <!--:label="item.name"-->
                                    <!--:value="item.name">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!--实体-->
        <div class="main" v-if="videolist.length>0">
            <div class="video-box" v-for="(item,index) in videolist" :key="index">
                <div class="t-p" :class="!item.trialPlanId?'gray':(item.hostStatus==3&&item.trialStatus==2)?'f56c6c':''">{{item.courtRoomName}}</div>
                <div class="c-t">
                    <div class="le">
                        <div class="status">
                            <span>状态：{{item.trialStatus==2?'正在开庭':item.trialStatus==4?'正在休庭':'未开庭'}}</span>
                        </div>
                        <div class="btn" v-if="item.trialStatus==1||item.trialStatus==3">
                            <el-button class="blu" @click="closedcourt(1,item.courtRoomId,item.trialPlanId,item.caseInfoId,item)">开庭</el-button>
                            <el-button disabled>闭庭</el-button>
                        </div>
                        <div class="btn" v-else-if="item.trialStatus==4">
                            <el-button class="blu" @click="closedcourt(3,item.courtRoomId,item.trialPlanId,item.caseInfoId,item)">继续开庭</el-button>
                            <el-button class="blu" @click="closedcourt(4,item.courtRoomId,item.trialPlanId,item.caseInfoId,item)">闭庭</el-button>
                        </div>
                        <div class="btn" v-else-if="item.trialStatus==2">
                            <el-button class="blu" @click="closedcourt(2,item.courtRoomId,item.trialPlanId,item.caseInfoId,item)">休庭</el-button>
                            <el-button class="blu" @click="closedcourt(4,item.courtRoomId,item.trialPlanId,item.caseInfoId,item)">闭庭</el-button>
                        </div>
                        <div class="num">
                            案号：{{item.caseNumber}}<br/>
                            开庭时间：{{item.startTrialTime}}<br/>
                            <span>设备关闭</span>
                            <span @click="morevisa(item.courtRoomId)">更多排期</span>
                        </div>
                    </div>
                    <div class="ri" v-if="item.trialStatus==2" @click="player(item.trialPlanId)">
                        <img class="player" src="../images/courtsupervision/player.png"/>
                        <img src="../images/courtsupervision/clickimg.png" />
                    </div>
                    <div class="ri" v-else>
                        <img class="player" src="../images/courtsupervision/player.png"/>
                        <img src="../images/courtsupervision/unclickimg.png" />
                    </div>
                </div>
                <div class="b-t">
                    <div @click="client(item.courtRoomId)">
                        <span>客户端状态</span>
                    </div>
                    <div>
                        <span>音视频质量：{{item.vedioStatus}}</span>
                    </div>
                    <div @click="mainstatus(item.courtRoomId)">
                        <span :class="(item.hostStatus==3&&item.trialStatus==2)?'red':''">庭审主机:{{item.hostStatus==1?'正常':'离线'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-else>暂无数据</div>
        <!--底部-->
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=9
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--客户端状态-->
        <clientalert ref="clientalert" :alertshow="isclient" @selectshow="isclient=false" @qure="clientsure" @cancel="isclient=false"/>
        <!--警告弹框-->
        <waringalert :iswaring="iswaring" :text="waretext" @wareshow="iswaring=false" @qure="waresure" @cancel="iswaring=false"/>
        <!--更多排期弹框-->
        <visaalert ref="visaalert" :alertshow="ismore" @selectshow="ismore=false" @qure="visasure" @cancel="ismore=false"/>
        <!--庭审主机状态弹框-->
        <mainalert ref="mainalert" :alertshow="ismain" @selectshow="ismain=false" @qure="mainsure" @cancel="ismain=false"/>
    </div>
</template>
<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {courtmanagement} from "../js/datajson"
    export default {
        name: "courtmanagement",
        components: {
            clientalert:resolve=>{require(["../courtmanagement/clientalert"],resolve)},//客户端状态弹框
            waringalert:resolve=>{require(["../courtmanagement/waringalert"],resolve)},//警告弹框
            visaalert:resolve=>{require(["../courtmanagement/visaalert"],resolve)},//更多排期弹框
            mainalert:resolve=>{require(["../courtmanagement/mainalert"],resolve)}//庭审主机状态弹框
        },
        data() {
            return {
                courtRoomName:'',//搜索内容,法庭名称
                options:courtmanagement.options,
                courtRoomStatus:'',//法庭状态选择
                options2:courtmanagement.options2,
                sortvalue:'最近开庭',//展示顺序选择
                info:courtmanagement.info,//法庭信息
                videolist:[],
                isclient:false,//客户端状态
                iswaring:false,//警告弹框
                waretext:'',
                ismore:false,//更多排期
                ismain:false,//庭审主机状态弹框
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:9,//每页大小
                maxMain:true
            }
        },
        watch:{
            courtRoomStatus(v){
                this.pageIndex=1;
                this.getlawlist();
            }
        },
        computed:{

        },
        async created() {
            let that=this;
            that.$showLoading('rgba');
            if(!sessionStorage.getItem('hx-lawcourtcode')){
                await that.getCourtInfo(that);
            }
            that.getlawlist();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            ...mapActions('indexmain',[
                "getCourtInfo",//查询法院
            ]),
            //状态选择
            handleSelectcourtRoomStatus(id){
                // this.pageIndex=1;
                // this.getlawlist();
            },
            //获取法庭分页信息列表
            getlawlist(){
                let {courtRoomStatus,courtRoomName,pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba');
                _this.$http.post('/courtRoomManage/getCourtRoomPageInfos', {
                    courtRoomStatus,//法庭状态
                    courtRoomName,//法庭名称
                    pageIndex,//当前页码
                    pageSize,//每页大小
                    //displaySort:'',//展示顺序,暂时去掉
                }).then(data =>{
                    _this.$hideLoading('rgba');
                    if(data.code===200){
                        _this.total=data.data.courtTotalNum;//总条数
                        _this.info=data.data;
                        _this.videolist=data.data.courtRoomInfos;//庭审管理列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba');
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索
            search(){
                let _this=this;
                //进行逻辑处理
                _this.pageIndex=1;
                _this.getlawlist();
            },
            //视频播放
            player(trialPlanId){
                const _this=this;
                _this.$http.post('/checkTrialPlanByTrialPlanId', {
                    trialPlanId
                }).then(data =>{
                    if(data.code===200){
                        const href='../videoPlayer/player.html?btn=1&trialPlanId='+trialPlanId;
                        window.open(href,'_blank','top=0,left=0,toolbar=no,width='+ screen.availWidth +', height='+ screen.availHeight +', menubar=no,resizable=yes, scrollbars=no,location=yes, status=no,alwaysRaised=yes,z-look=yes')
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('连接服务器失败，请稍后再试');
                })
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getlawlist();
            },
            //客户端状态
            client(courtRoomId){
                this.isclient=true;
                //调用子组件弹框方法
                this.$refs.clientalert.show(courtRoomId)
            },
            //确定后关闭客户端状态
            clientsure(){
                this.isclient=false;
            },
            //开庭、休庭、继续开庭、闭庭
            closedcourt(index,courtRoomId,trialPlanId,caseInfoId,item){
                let _this=this;
                _this.$showLoading('rgba');
                _this.$http.post('/trialOperation',{
                    operate:index,
                    mark:2,
                    courtRoomId,
                    trialPlanId,
                    caseInfoId
                }).then(data =>{
                    _this.$hideLoading('rgba');
                    if(data.code==200){
                        if(index==1){
                            _this.$msgs('开庭成功');
                        }else if(index==2){
                            _this.$msgs('休庭成功');
                        }else if(index==3){
                            _this.$msgs('继续开庭成功');
                        }else if(index==4){
                            _this.$msgs('闭庭成功');
                        }
                        _this.getlawlist();
                    }else{
                        _this.waretext='';
                        _this.iswaring=true;
                        _this.waretext=data.message;
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba');
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //关闭警告弹框
            waresure(){
                this.iswaring=false;
            },
            //更多排期
            morevisa(courtRoomId){
                this.ismore=true;
                //调用子组件弹框方法
                this.$refs.visaalert.pageIndex=1;
                this.$refs.visaalert.choiceTime=0;
                this.$refs.visaalert.getvisa(courtRoomId)
            },
            //关闭更多排期弹框
            visasure(){
                this.ismore=false;
            },
            //庭审主机状态弹框
            mainstatus(courtRoomId){
                //调用子组件弹框方法
                this.$refs.mainalert.getmaininfo(courtRoomId).then(()=>{
                    this.ismain=true;
                })
            },
            //关闭庭审主机状态弹框
            mainsure(){
                this.ismain=false;
            }
        }
    }
</script>
<style lang="less">
    @import url('../css/common.less');
    .courtmanagement {
        .mr();
        padding: 0 .2rem;
        .head {
            margin-bottom:.15rem;
            .head-top {
                padding: .2rem 0;
                .f20();

                img {
                    width: .3rem;
                }

                span {
                    margin-left: .05rem;
                    .f14();
                    color: #1296DB;
                }
            }

            .head-foot {
                .fb();
                .le {
                    /*select*/

                    .el-select {
                        width: 2.36rem;
                        margin-right: .1rem;

                        .el-input--suffix .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .3rem 0 .15rem;
                            .f18();
                        }

                        .el-input__icon {
                            height: 100%;
                            width: .25rem;
                            text-align: center;
                            line-height: .4rem;
                        }
                    }

                    /*text*/

                    .el-input {
                        width: 2.36rem;
                        margin-right: .1rem;

                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }

                    /*button*/

                    .el-button {
                        position: relative;
                        top: -.02rem;
                        width: .9rem;
                        line-height: .36rem;
                        padding: 0;

                        .el-icon-search {
                            .f18();
                            color: #fff;
                        }

                        span {
                            .f18();
                            color: #fff;
                        }
                    }
                }

                /*右半部分*/

                .ri {
                    .fb();
                    .left-1 {
                        .fr();
                        &>div{
                            cursor: pointer;
                            line-height: 3vh;
                            .f18();
                            & > span {
                                margin: 0 .1rem;
                                .f18();
                            }
                        }
                    }

                    .right-1 {
                        margin-left:.1rem;
                        .el-select {
                            width: 1.45rem;

                            .el-input--suffix .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .3rem 0 .15rem;
                                .f18();
                            }

                            .el-input__icon {
                                height: 100%;
                                width: .25rem;
                                text-align: center;
                                line-height: .4rem;
                            }
                        }
                    }
                }
            }
        }
        /*中部*/
        .main{
            .fl();
            flex-wrap: wrap;
            .video-box{
                width:5.28rem;
                margin-right:.05rem;
                margin-bottom:.1rem;
                background: url('../images/courtsupervision/videobg.png') no-repeat;
                background-size: 100% 100%;
                .t-p{
                    .f20();
                    padding-left:.15rem;
                    line-height:.4rem;
                    color:#fff;
                    background: #409EFF;
                }
                /*红色*/
                .f56c6c{
                    background:#f56c6c;
                }
                /*灰色*/
                .gray{
                    background:#909399;
                }
                .c-t{
                    .fb();
                    padding:0 .15rem;
                    .le{
                        width:2.32rem;
                        .status{
                            line-height:.45rem;
                            span{
                                .f18();
                            }
                        }
                        .btn{
                            .el-button{
                                width: .99rem;
                                line-height: .37rem;
                                padding: 0;
                                span{
                                    .f16();
                                }
                            }
                            .blu{
                                background:#edf5ff;
                                border:1px solid #BEDEFF;
                                span{
                                    color:#409EFF ;
                                }
                            }
                        }
                        .num{
                            margin-top:.1rem;
                            .f16();
                            color: rgba(0,0,0,0.54);
                            line-height:.3rem;
                            cursor:pointer;
                            span{
                                margin-right:.2rem;
                                .f16();
                                color:#409EFF ;
                                text-decoration: underline;
                                text-underline:#409EFF;
                            }
                        }
                    }
                    .ri{
                        width:2.66rem;
                        margin:.1rem 0;
                        position:relative;
                        cursor:pointer;
                        img{
                            width:2.66rem;
                        }
                        img.player{
                            position:absolute;
                            top:50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            width:.5rem;
                        }
                    }
                }
                .b-t{
                    .fb();
                    cursor:pointer;
                    padding:0 .15rem;
                    margin-bottom:.15rem;
                    &>div{
                        line-height:.3rem;
                        span{
                            .f16();
                            color:#409EFF ;
                            text-decoration: underline;
                            text-underline:#409EFF;
                        }
                        span.red{
                            color:#F56C6C;
                            text-underline:#F56C6C;
                        }
                    }
                }
            }
            &>.video-box:nth-of-type(3n+3){
                margin-right:0;
            }
        }
        /*列表为空*/
        .empty{
            .f20();
            text-align: center;
            color:#45A1D1;
            line-height:1rem;
        }
        .up{
            /*分页*/
            .page{
                margin:.2rem 0;
                span{
                    .f18();
                }
                input{
                    .f18();
                }
                text-align: center;
                li.number{
                    .f18()
                }
            }
        }
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>