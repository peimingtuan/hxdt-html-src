<template>
    <div class="mainalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/courtsupervision/tingshenzhujistatus.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content1" v-if="mainalertinfo">
                        <div class="top">
                            <div>庭审主机型号 {{mainalertinfo.courtDeviceModelName}}</div>
                            <div>版本号 {{mainalertinfo.courtDeviceVersion}}</div>
                            <div>序列号 {{mainalertinfo.courtDeviceSerialNumber}}</div>
                            <div>IP地址 {{mainalertinfo.courtDeviceIp}}</div>
                        </div>
                        <div class="cente">
                            编码器：<br/>
                            <span>总数：{{mainalertinfo.totalEncodeDevice}}</span>
                            <span>正常：{{mainalertinfo.normalTotalEncode}}</span>
                            <span>不正常：{{mainalertinfo.wrongTotalEncode}}</span>
                            <span>离线：{{mainalertinfo.offTotalEncode}}</span>
                            <span>未监控：0</span>
                        </div>
                        <div class="cente">
                            解码器：<br/>
                            <span>总数：{{mainalertinfo.totalDecodeDevice}}</span>
                            <span>正常：{{mainalertinfo.normalTotalDecode}}</span>
                            <span>不正常：{{mainalertinfo.wrongTotalDecode}}</span>
                            <span>离线：{{mainalertinfo.offTotalDecode}}</span>
                            <span>未监控：0</span>
                        </div>
                        <div class="cente">
                            资源使用情况：<br/>
                            <span>CPU：{{mainalertinfo.systemStatusInfo.cpuUsedPercent}}</span><br/>
                            <span>内存：</span>
                            <span v-if="mainalertinfo.systemStatusInfo.memoryUsage">总容量：{{mainalertinfo.systemStatusInfo.memoryUsage.totalMemory}}GB</span>
                            <span v-if="mainalertinfo.systemStatusInfo.memoryUsage">使用容量：{{mainalertinfo.systemStatusInfo.memoryUsage.usedMemory}}GB</span>
                            <span v-if="mainalertinfo.systemStatusInfo.memoryUsage">使用百分比：{{mainalertinfo.systemStatusInfo.memoryUsage.usedMemoryRate}}</span>
                        </div>
                        <div class="cente">
                            <el-button class="blu" @click="upload()" round>状态刷新</el-button>
                        </div>
                    </div>
                    <div class="content2" v-if="mainalertinfo">
                        <div class="title">硬盘使用情况</div>
                        <el-table
                                ref="multipleTable"
                                :data="mainalertinfo.systemStatusInfo.diskUseInfo"
                                @cell-click="cellClick"
                                tooltip-effect="dark"
                                style="width:100%"
                                >
                            <el-table-column
                                    prop="physicalPathName"
                                    label="物理路径"
                                    width="240px"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="mountPathName"
                                    label="挂载点"
                                    width="150px"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    label="总空间"
                                    width="200px"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.totalSpace}}GB</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="已用空间"
                                    width="200px"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.usedSpace}}GB</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="percentageUsed"
                                    label="已用百分比"
                                    width="200px"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    width="200px"
                                    label="剩余空间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.availableSpace}}GB</span>
                                </template>
                            </el-table-column>
                        </el-table>
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
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"
    export default {
        name: "mainalert",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile
        },
        data() {
            return {
                text:'庭审主机状态',
                text2:'详细数据显示',
                mainalertinfo:'',
                courtRoomId:'',//法庭id
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //状态刷新
            upload(){
                this.getmaininfo();
            },
            //获取当前法庭庭审主机信息
            getmaininfo(courtRoomId){
                let _this=this;
                if(courtRoomId)_this.courtRoomId=courtRoomId;
                _this.$showToast('加载中...')
              return  _this.$http.post('/courtRoomManage/getHostStatusInfos', {
                    courtRoomId:_this.courtRoomId,//法庭id
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                       _this.mainalertinfo=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomManage/getHostStatusInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
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
    .mainalert{
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-7rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content1{
                width:100%;
                background: #ECEFF0;
                /*height:4rem;*/
                margin-top:.05rem;
                padding:0 .2rem;
                .top{
                    .fb();
                    line-height:.5rem;
                    div{
                        .f20();
                    }
                }
                .cente{
                    padding:.2rem 0;
                    border-top: 1px solid #D2D6D8;
                    line-height:.4rem;
                    .f20();
                    span{
                        .f20();
                    }
                    .el-button.is-round {
                        padding:.1rem .2rem;
                    }
                    .blu{
                        background:#edf5ff;
                        border:1px solid #BEDEFF;
                        span{
                            color:#409EFF ;
                        }
                    }
                }
            }
            .content2{
                width:12.4rem;
                min-height:1rem;
                max-height:3rem;
                overflow: auto;
                cursor: pointer;
                .title{
                    line-height:.5rem;
                    .f20();
                }
                th,td{
                    text-align:center;
                }
                th{
                    background:#cbe5f3;
                    div{
                        .f20();
                        font-weight:400;
                    }
                }
                td{
                    div{
                        .f18();
                        span{
                            .f18()
                        }
                    }
                }
                /*暂无数据*/
                .el-table__empty-text{
                    .f18();
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>