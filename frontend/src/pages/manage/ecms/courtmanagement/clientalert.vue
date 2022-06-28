<template>
    <div class="clientalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/courtsupervision/kehuduanzhuangtai.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <div class="head">
                        客户端状态<br/>
                        <span>详细数据显示</span>
                    </div>
                    <div class="top">
                        <el-select v-model="clientId" placeholder="客户端选择">
                            <el-option
                                    v-for="item in choicelist"
                                    @click.native="changeChoice"
                                    :key="item.clientId"
                                    :label="item.clientName"
                                    :value="item.clientId">
                            </el-option>
                        </el-select>
                        <div class="ri">
                            <div>
                                客户端总数：{{clientTotalNum}}个
                                <span>|</span>
                            </div>
                            <div>
                                在线数：{{clientLiveNum}}个
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="name">名称：{{clientStatusInfos.clientName}}</div>
                        <div class="info">
                            <div class="le">
                                <span>状态</span>{{clientStatusInfos.clientStatus | clientStatus}}<br/>
                                <span>开庭状态</span>
                                    <font v-if="clientStatusInfos.courtRoomStatus==1">未使用状态</font>
                                    <font v-else-if="clientStatusInfos.courtRoomStatus==2">休庭状态</font>
                                    <font v-else-if="clientStatusInfos.courtRoomStatus==3">正在开庭</font>
                                <br/>
                                <span>IP地址</span>{{clientStatusInfos.ip}}<br/>
                                <span>客户端操作系统</span>{{clientStatusInfos.system}}<br/>
                                <span>当前软件版本</span>{{clientStatusInfos.currentVersion}}<br/>
                                <span>最新软件版本</span>{{clientStatusInfos.latestVersion}}<br/>
                                <span>当前登录用户名</span>{{clientStatusInfos.userName}}
                            </div>
                            <div class="ri">
                                <span>硬盘使用情况：</span>
                                <div v-for="item in clientStatusInfos.diskUseInfos">
                                    <span >{{item.diskName}}</span> 总空间：{{item.totalSpace}} 使用：{{item.usedSpace}} 剩余：{{item.availableSpace}}<br/>
                                </div>
                                <span>CPU使用情况</span>{{clientStatusInfos.cpuUsedPercentage}}<br/>
                                <span>内存使用情况</span>{{clientStatusInfos.usedMemoryRate}}
                                <div class="btn">
                                    <el-button @click="upload" class="blu" type="primary" round>状态刷新</el-button>
                                    <el-button @click="history(clientStatusInfos.clientId)" class="blu" type="primary" round>软件升级历史</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!--客户端软件升级二次弹框-->
        <clientsecondAlert ref="clientsecondAlert"/>
    </div>
</template>

<script>
    import clientsecondAlert from "./clientsecondAlert" //客户端软件升级二次弹框
    export default {
        name: "clientalert",
        components: {
            clientsecondAlert
        },
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        data() {
            return {
                choicelist:[ //下拉框
                ],
                courtRoomId:'',//当前法庭id 打开弹框时父组件带进来
                clientId:'',//客户端id
                clientTypeCode:'',//客户端类型
                clientTotalNum:'',//客户端总数
                clientLiveNum:'',//在线数
                clientStatusInfos:'',
                secondshow:false,//软件升级历史弹框变量
            }
        },
        watch:{
            clientId(v){
                this.getclient();
            }
        },
        filters:{
            clientStatus(v){
                if(v)return '在线'
                else return '离线'
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //展示
            show(courtRoomId){
                    if(courtRoomId){
                        this.courtRoomId=courtRoomId;//当前法庭id
                    }else{
                        this.courtRoomId='';
                    }
                    this.getCourtRoomClientInfo()
            },
            //查询法庭客户端信息列表
            getCourtRoomClientInfo(){
                let _this=this;
               return _this.$http.post('/courtRoomConfig/getCourtRoomClientInfo', {
                            id:_this.courtRoomId,//法庭id
                            clientId:_this.clientId,//客户端id
                            pageIndex:0,
                            pageSize:0
                        }).then(data =>{
                            if(data.code===200){
                                _this.choicelist=data.data;
                                if(data.data.length>0){
                                    _this.clientTypeCode=data.data[0].clientType;
                                    _this.clientId=data.data[0].clientId;
                                }else{
                                    _this.clientTypeCode='';
                                    _this.clientId='';
                                }
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            console.log(err,'/courtRoomConfig/getCourtRoomClientInfo')
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //获取当前法庭客户端信息
            getclient(){
                let {clientTypeCode,clientId}=this;
                let _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomManage/getClientStatusInfo', {
                    courtRoomId:_this.courtRoomId,//法庭id
                    clientTypeCode,//客户端类型
                    clientId,//客户端id
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                         _this.clientTotalNum=data.data.clientTotalNum;
                         _this.clientLiveNum=data.data.clientLiveNum;
                         _this.clientStatusInfos=data.data.clientStatusInfos;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomManage/getClientStatusInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //select选择信息
            changeChoice(){
                //this.getclient();
            },
            //状态刷新
            upload(){
                this.getclient();
            },
            //软件升级历史
            history(clientId,courtRoomId){
                this.$refs.clientsecondAlert.getinfo(clientId,courtRoomId)
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .clientalert{
        /*弹框*/
        .main{
            width:12rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-6rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            /*头部*/
            .head{
                width:100%;
                padding:.15rem 0;
                height:.6rem;
                .f20();
                span{
                    .f14();
                    color: rgba(0,0,0,0.54);
                }
            }
            .top{
                width:100%;
                .fb();
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
                .ri{
                    .fr();
                    &>div{
                        cursor: pointer;
                        /*line-height: 3vh;*/
                        color: rgba(0,0,0,0.54);
                        .f18();
                        & > span {
                            color: rgba(0,0,0,0.54);
                            margin: 0 .1rem;
                            .f18();
                        }
                    }
                }
            }
            .content{
                width:100%;
                margin-top:.05rem;
                background: #ECEFF0;
                .name{
                    .f20();
                    font-weight:400;
                    line-height:.6rem;
                    padding-left:.2rem;
                }
                .info{
                    .fb();
                    .le{
                        padding-left:.8rem;
                    }
                    .ri{
                        margin-right:.8rem;
                        &>div.btn{
                            margin:.2rem 0;
                            &>button:first-of-type{
                                margin-right:.2rem;
                            }
                        }
                        .blu{
                            background:#edf5ff;
                            border:1px solid #BEDEFF;
                            span{
                                color:#409EFF ;
                                .f16();
                            }
                        }
                    }
                    &>div{
                        .f18();
                        line-height:.8rem;
                        .el-button.is-round {
                            border-radius: 20px;
                             padding:.1rem .2rem;
                            span{
                                margin-right:0;
                            }
                        }
                        span{
                            .f20();
                            font-weight:400;
                            margin-right:.2rem;
                        }
                    }
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>