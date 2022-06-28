<template>
    <div class="visaalert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/courtsupervision/kehuduanzhuangtai.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="top">
                        <el-select v-model="choiceTime" placeholder="时间选择">
                            <el-option
                                    v-for="item in options"
                                    @click.native="changestatus"
                                    :key="item.choiceTime"
                                    :label="item.name"
                                    :value="item.choiceTime">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="table-style">
                        <el-table
                                ref="multipleTable"
                                :data="visaInfos"
                                tooltip-effect="dark"
                                style="width: 100%"
                                @selection-change="handleSelectionChange">
                            <el-table-column
                                    type="index"
                                    :index="indexMethod"
                                    width="100px"
                                    label="序号"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="caseNumber"
                                    label="案号"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="courtTime"
                                    label="庭次"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    label="开庭时间"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.factStartDate}} {{scope.row.factStartTime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="courtRoomName"
                                    label="法庭"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    label="承办法官"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class="isedit2" @click="nameAlert(scope.row.undertakeJudge)">{{scope.row.undertakeJudge.judgeName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="书记员"
                                    show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span class="isedit2" @click="nameAlert(scope.row.clerk)">{{scope.row.clerk.clerkName}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="up">
                        <!--分页-->
                        <el-pagination
                                class="page"
                                background
                                @current-change="handleCurrentChange"
                                :current-page=pageIndex
                                :page-size=10
                                layout="total, prev, pager, next, jumper"
                                :total=total>
                        </el-pagination>
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
        <!--更多排期展示人物信息二次弹框-->
        <visasecondAlert ref="visasecondAlert"/>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"
    import visasecondAlert from "./visasecondAlert" //更多排期展示人物信息二次弹框
    export default {
        name: "visaalert",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
            visasecondAlert
        },
        data() {
            return {
                text:'更多排期',
                text2:'详细数据显示',
                options:[//select查询框
                    {choiceTime: 0, name: "全部"},
                    {choiceTime: 1, name: "今日"},
                    {choiceTime: 2, name: "本周"},
                    {choiceTime: 3, name: "本月"}
                ],
                //visaInfos:courtmanagement.visaalert,//排期信息列表
                visaInfos:[],
                multipleSelection: [],//表格存值
                choiceTime:null,//查询条件，0全部1今日2本周3本月
                total:0,//总数
                pageIndex:1,//当前页面
                pageSize:10,//每页大小
                courtRoomId:''
            }
        },
        watch:{
            // choiceTime(v){
            //     this.pageIndex=1;
            //     this.getvisa();
            // },
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
             //按条件查询
            changestatus() {
                this.pageIndex=1;
                this.getvisa();
            },
            //获取当前法庭更多排期信息
            getvisa(courtRoomId){
                if(courtRoomId)this.courtRoomId=courtRoomId;//当前法庭id
                let {choiceTime}=this;
                let _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomManage/getMoreTrialPlanInfos', {
                    courtRoomId:_this.courtRoomId,//法庭id
                    choiceTime,//0全部1今日2本周3本月
                    pageIndex:_this.pageIndex,//当前页码
                    pageSize:10 //每页大小
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.total=data.data.trialPlanTotalNum;//总数
                        _this.visaInfos=data.data.trialPlanInfos;//列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomManage/getMoreTrialPlanInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //获取人物信息弹框
            nameAlert(info){
                this.$refs.visasecondAlert.getinfo(info);
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getvisa();
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
    .visaalert{
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
            /*头部*/
            .top{
                width:100%;
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
            .table-style{
                width:100%;
                min-height:4rem;
                max-height:6rem;
                overflow: auto;
                margin-top:.05rem;
                /*人员信息*/
                .isedit2{
                    color:#45A1D1;
                }
            }
            .up{
                width:100%;
            }
            @import url('../css/element.less');
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>