<template>
    <div class="videoplayerAlert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/courtsupervision/kehuduanzhuangtai.png" />
                    <img class="alert-close" @click="alertshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="top">
                        庭次：
                        <el-select :disabled=disabled v-model="choicecourtTime" placeholder="庭次选择">
                            <el-option
                                    v-for="(item,index) in options"
                                    @click.native="changeSelect"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="content">
                        <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                        >
                            <el-table-column
                                    prop="description"
                                    label="阶段"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="videoTimeLength"
                                    label="时长"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    >
                                <template slot-scope="scope">
                                    <span class="isedit2" @click="player(scope.row.videoFileStage)">
                                        播放
                                    </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--分页-->
                    <div class="up">
                        <!--分页-->
                        <el-pagination class="page" background  @current-change="handleCurrentChange" :current-page=1
                                       :page-size=10
                                       layout="total, prev, pager, next, jumper"
                                       :total=total>
                        </el-pagination>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="alertshow=false">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="alertshow=false">
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
        name: "videoplayerAlert",
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'播放选择',
                text2:'详细数据显示',
                options:[],//select查询框
                alertshow:false,
                tableData:[],
                total:0,
                caseInfoId:'',//案件id
                courtTime:'',//庭次
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                disabled:false,
                choicecourtTime:''
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        watch:{
            // courtTime(v){
            //     this.pageIndex=1;
            //     this.getmusicfilelist();
            // }
        },
        computed:{

        },
        methods: {
            //展示弹框
            show(row,index){
                this.alertshow=true;
                this.caseInfoId=row.caseInfoId;
                if(index==2){
                    this.courtTime=row.courtTime;
                    this.choicecourtTime=row.courtTime;
                    this.disabled=true;
                }else{
                    this.options=[];
                    this.courtTime='';
                    this.choicecourtTime='';
                    this.disabled=false;
                }
                this.getmusicfilelist();
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getmusicfilelist();
            },
            changeSelect(){
                this.pageIndex=1;
                this.getmusicfilelist();
            },
            //获取音视频文件列表
            getmusicfilelist(){
                let {caseInfoId,courtTime,pageIndex,pageSize}=this;
                let _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/videoManager/getvideoFileByCaseTrial', {
                    caseInfoId,//案件id
                    courtTime,//庭次
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.total=data.count;
                        if(data.data.length>0){
                            if(courtTime){//排期
                                _this.tableData=data.data[0].videoFile;
                            }else{//案件
                                if(_this.options.length===0){
                                    data.data.map((item)=>{
                                        _this.options.push(item.trialTime)
                                    })
                                    _this.choicecourtTime=data.data[0].trialTime;
                                    _this.tableData=data.data[0].videoFile;
                                }else{
                                    let index=_this.options.indexOf(_this.choicecourtTime)
                                    _this.tableData=data.data[index].videoFile;
                                }
                                _this.total= _this.tableData.length;
                            }
                        }else{
                            _this.tableData=[];
                        }
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/videoManager/getvideoFileByCaseTrial')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //播放
            player(videoFileStage){
                let {caseInfoId,choicecourtTime}=this;
                const _this=this;
                _this.$http.post('/checkTrialPlanByCase', {
                    caseInfoId,
                    courtTime:choicecourtTime
                }).then(data =>{
                    if(data.code===200){
                        const href='../videoPlayer/player.html?btn=2&videoFileStage='+videoFileStage+'&caseInfoId='+caseInfoId+'&choicecourtTime='+choicecourtTime;
                        window.open(href,'_blank','top=0,left=0,toolbar=no,width='+ screen.availWidth +', height='+ screen.availHeight +', menubar=no,resizable=yes, scrollbars=no,location=yes, status=no,alwaysRaised=yes,z-look=yes')
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('连接服务器失败，请稍后再试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .videoplayerAlert{
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.2rem;
            margin-left:-7rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            /*头部*/
            .top{
                width:12.4rem;
                .el-input {
                    width: 2.36rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
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
            /*内容区域*/
            @import url('../css/element.less');
            .content{
                width:12.4rem;
                min-height:4rem;
                max-height:6rem;
                overflow: auto;
                margin-top:.05rem;
                cursor:pointer;
                tr{

                }
                th,td{
                    text-align:center;
                }
                th{
                    background:#cbe5f3;
                    div{
                        .f20()
                    }
                }
                td{
                    div{
                        .f18();
                        span{
                            .f18()
                        }
                        span.isedit2{
                            color:#409EFF;
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