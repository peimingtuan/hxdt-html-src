<template>
        <div class="addoperate">
                <waringalert  :iswaring="iswaring" @wareshow='iswaring=false'  @sure='iswaring=false' @cancel='iswaring=false'></waringalert>
                <Addscheduling_nt ref='Addscheduling_nt' :isAddscheduling_nt="isAddscheduling_nt" @Schedulingshow='isAddscheduling_nt=false' @sure='surisAddscheduling_nt' @cancel='isAddscheduling_nt=false'></Addscheduling_nt>
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="alert-window2" v-if='isaddoperate'>
                        <div class="main">
                            <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                            <img class="alert-close" @click="closeAlert" src="../images/alert-close.png"/>
                            <div class="head">更多操作</div>
                            <div class="contentadd">
                                <el-row>
                                    <el-button class="blu" type="primary" round @click='trial1'>开庭</el-button>
                                    <el-button class="blu" type="primary" round @click='trial2' >休庭</el-button>
                                    <el-button class="blu" type="primary" round @click='trial3' >继续开庭</el-button>
                                    <el-button class="blu" type="primary" round @click='trial4'  >闭庭</el-button>
                                </el-row>
                                <el-row>
                                    <el-button class="blu" type="primary"  round @click='kt' >关闭签名录制</el-button>
                                    <el-button class="blu" type="primary"  round  @click='kt' >关闭调试</el-button>
                                    <el-button class="blu" type="primary"  round @click='kt' >恢复排期状态</el-button>
                                </el-row>
                                <el-row>
                                    <el-button class="blu" type="primary" round @click='kt'  >开启直播</el-button>
                                    <el-button class="blu" type="primary" round @click='kt'  >关闭直播</el-button>
                                    <el-button class="blu" type="primary" round @click='kt'  >导出案件-排期数据</el-button>
                                </el-row>
                                <el-row>
                                    <el-upload
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            multiple
                                            :limit="3"
                                            :on-exceed="handleExceed"
                                            :file-list="fileList">
                                        <el-button class="blu" type="primary" round>导入笔录</el-button>
                                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                                    </el-upload>
                                    <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button class="blu" type="primary" round>导入视频</el-button>
                                            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                                    </el-upload>
                                        <!-- <el-button type='text'  @click='kt' >导入笔录</el-button>
                                        <el-button type='text'  @click='kt' >导入视频</el-button> -->
                                    <el-button class="blu" type="primary" round  @click='editcase' >修改排期</el-button>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </transition>
        </div>
    </template>
    
    <script>
        import waringalert from './waringalert'//警告提示
        import Addscheduling_nt from './Addscheduling_nt'//新建案件弹框
        import {Indicator} from 'mint-ui'
        export default {
            name: "addoperate",
            props:{
                isaddoperate:Boolean,

            },
            components: {
            Addscheduling_nt,
            waringalert
            },
            data() {
                return {
                    trialPlanId:"",//排期id
                    caseInfoId:"",//案件id
                    courtRoomId:"",//法庭id
                    isAddscheduling_nt:false,
                    iswaring:false,
                    row:null,
                }
            },
            created() {
    
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                saveid(row){
                    this.row = row;
                    this.isaddoperate=true;
                    this.courtRoomId=row.courtRoomId;
                    this.caseInfoId=row.caseInfoId;
                    this.trialPlanId=row.trialPlanId;
                },
                //修改排期
                editcase(){
                    this.isaddoperate=false;
                    this.$refs.Addscheduling_nt.see(this.row);
                    this.isAddscheduling_nt=true;
                },
                //开庭
                trial1(){
                    if(this.row.trialStatus == 2){
                        this.$msgw("正在处于开庭状态！");
                        return;
                    }
                    this.isaddoperate=false;
                    let params={
                        courtRoomId:this.courtRoomId,
                        trialPlanId:this.trialPlanId,
                        caseInfoId:this.caseInfoId,
                        mark:2,
                        operate:1,
                    };
                    this.$http.post('/trialOperation',params).then( res =>{
                        if(res.code == 200){
                            this.$msgs('开庭成功');
                            this.$parent.getcaselist();
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch( err => {
                        this.$msge('服务器异常，请稍后重试');
                    })
                },
                 //休庭
                 trial2(){
                     if(this.row.trialStatus == 3){
                         this.$msgw("正在处于休庭状态！");
                         return;
                     }
                     this.isaddoperate=false;
                     let params={
                         courtRoomId:this.courtRoomId,
                         trialPlanId:this.trialPlanId,
                         caseInfoId:this.caseInfoId,
                         mark:2,
                         operate:2,
                     };
                        const _this=this;
                    _this.$http.post('/trialOperation',params).then(data =>{
                        if(data.code==200){
                            _this.$msgs('休庭成功');
                            _this.$parent.getcaselist();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                //继续开庭
                trial3(){
                    this.isaddoperate=false;
                    let params={
                        courtRoomId:this.courtRoomId,
                        trialPlanId:this.trialPlanId,
                        caseInfoId:this.caseInfoId,
                        mark:2,
                        operate:3,
                    };
                        const _this=this;
                    _this.$http.post('/trialOperation',params).then(data =>{
                        if(data.code==200){
                            _this.$msgs('开庭成功');
                            _this.$parent.getcaselist();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                //闭庭
                trial4(){
                    this.isaddoperate=false;
                    let params={
                        courtRoomId:this.courtRoomId,
                        trialPlanId:this.trialPlanId,
                        caseInfoId:this.caseInfoId,
                        mark:2,
                        operate:4,
                    };
                        const _this=this;
                    _this.$http.post('/trialOperation',params).then(data =>{
                        if(data.code==200){
                            _this.$msgs('闭庭成功');
                            _this.$parent.getcaselist();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                //修改排期保存
                surisAddscheduling_nt(trialPlanInfos){
                    const _this=this;
                    Indicator.open({text: '正在保存...', spinnerType: 'fading-circle'})
                    _this.$http.post('/caseManage/saveTrialPlanInfo',{trialPlanInfos}).then(data =>{
                        Indicator.close()
                        if(data.code==200){
                            _this.$msgs('保存成功');
                            this.isAddscheduling_nt=false;
                            _this.$parent.getcaselist();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        Indicator.close()
                        console.log(err,'/caseManage/saveTrialPlanInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                //注册弹框显示与否事件
                closeAlert() {
                   this.isaddoperate=false;
                },
                sure(){
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    
    <style lang="less">
     @import url('../css/common.less');
        .addoperate{
            .alert-window2{
                .el-button {
                    color:#409eff;
                    padding: 0 0.2rem;
                    .el-icon-search {
                        .f18();
                    }
                    span {
                        .f18();
                        color: #409eff;
                    }
                }
                /* 注意这是上传 */
                .el-upload{
                    float: left;
                    margin-right:.15rem;
                }
                /*弹框*/
                .main{
                    position:absolute;
                    left:calc(50% - 3.5rem);
                    top:3rem;
                    width:7rem;
                    background: #fff;
                    box-shadow: 0 0 24px 0 rgba(0,0,0,0.22), 0 24px 24px 0 rgba(0,0,0,0.30);
                    /*左上方login*/
                    img.imgloge{
                        position:absolute;
                        top: .2rem;
                        left: .2rem;
                        width:.4rem;
                    }
                    /*头部*/
                    .head{
                        width:100%;
                        padding:0.2rem 0 0 0.7rem;
                        height:.6rem;
                        font-size: 0.2rem;
                        span{
                            font-size: 0.14rem;
                            color: rgba(0,0,0,0.54);
                        }
                    }
                    img.alert-close {
                        width: .18rem;
                        position: absolute;
                        top: .25rem;
                        right: .35rem;
                        cursor: pointer;
                        /* z-index: 1002; */
                    }
                    /*主体*/
                    .contentadd{
                        width: 85%;
                        margin:.1rem auto .5rem;
                        background:#eceff0;
                        .el-row{
                            padding:0.15rem;
                            //.f-c-b()
                        }
                        .el-button {
                            min-width:1.25rem;
                            padding:0 .1rem;
                            height:.35rem;
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
                }
            }
        }
    </style>