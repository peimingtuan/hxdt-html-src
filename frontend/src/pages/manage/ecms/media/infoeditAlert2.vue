<template>
    <div class="infoeditAlert2">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-show="showAlert">
                <div class="main-second">
                    <img class="imgloge" src="../images/yingyongpeizhi/kehuduan.png" />
                    <img class="alert-close" @click="showAlert=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content1">
                        <div class="content1-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign2">
                                <div class="flex">
                                    <el-form-item class="red-label" label="存储路径名称">
                                        <el-input v-model.trim="formLabelAlign2.storagePathName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="虚拟目录">
                                        <el-input v-model="formLabelAlign2.virtualPath"></el-input>
                                    </el-form-item>
                                    <el-form-item label="点播频道类型">
                                        <el-select v-model="formLabelAlign2.playchannelName">
                                            <el-option
                                                    v-for="item in playtypelist"
                                                    @click.native="handleSelectplaychannelType(item.playchannelType)"
                                                    :key="item.playchannelType"
                                                    :label="item.playchannelName"
                                                    :value="item.playchannelName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="本地物理路径">
                                        <el-input v-model="formLabelAlign2.physicalPath"></el-input>
                                    </el-form-item>
                                    <el-form-item label="FTP路径">
                                        <el-input v-model="formLabelAlign2.ftpPath"></el-input>
                                    </el-form-item>
                                    <el-form-item label="FTP用户名">
                                        <el-input v-model="formLabelAlign2.ftpUserName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="FTP密码">
                                        <el-input type="passward" v-model="formLabelAlign2.ftpPassword"></el-input>
                                    </el-form-item>
                                    <el-form-item label="FTP端口">
                                        <el-input v-model="formLabelAlign2.ftpPort"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="flex">
                                    <el-form-item label="">
                                        <el-checkbox v-model="formLabelAlign2.transmit">是否传输</el-checkbox>
                                        <el-checkbox v-model="formLabelAlign2.retainOriginalDocument">保留原文件</el-checkbox>
                                    </el-form-item>
                                    <el-form-item label="目的路径">
                                        <el-input v-model="formLabelAlign2.targetPath"></el-input>
                                        <el-button>选择</el-button>
                                    </el-form-item>
                                    <el-form-item label="开始时间">
                                        <el-time-select
                                                placeholder=""
                                                v-model="formLabelAlign2.startTime"
                                                :editable=false
                                                :picker-options="{
                                                  start:'0:00',
                                                  step:'0:10',
                                                  end:'23:50',
                                                  maxTime: formLabelAlign2.endTime
                                                }"
                                                >
                                        </el-time-select>
                                        <!--<el-input v-model=""></el-input>-->
                                    </el-form-item>
                                    <el-form-item label="结束时间">
                                        <el-time-select
                                                placeholder=""
                                                v-model="formLabelAlign2.endTime"
                                                :editable=false
                                                :picker-options="{
                                                  start:'0:00',
                                                  step:'0:10',
                                                  end:'23:50',
                                                  minTime: formLabelAlign2.startTime
                                                }"
                                        >
                                        </el-time-select>
                                        <!--<el-input v-model="formLabelAlign2.endTime"></el-input>-->
                                    </el-form-item>
                                </div>
                                <el-form-item label="网卡描述">
                                    <el-input type="textarea" v-model="formLabelAlign2.description" placeholder="......"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="sureedit">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="showAlert=false">
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
    import {mapState} from 'vuex'
    export default {
        name: "infoeditAlert2",
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'流媒体服务器存储路径管理',
                text2:'详细数据显示',
                showAlert:false,
                deleteFlag:false,
                playtypelist:[{playchannelType:1,playchannelName:'MP4'}],//点播频道类型select
                formLabelAlign2: {//表单信息
                    smsInfoId:'',//流媒体id
                    storagePathId:'',//存储路径id
                    storagePathName:'',//存储路径名称
                    virtualPath:'',//虚拟路径
                    playchannelName:'',//点播频道名
                    playchannelType:'',//点播频道id
                    physicalPath:'',//物理路径
                    ftpPath:'',//ftp路径
                    ftpUserName:'',//ftp用户名
                    ftpPassword:'',//ftp密码
                    ftpPort:'',//ftp端口号
                    description:'',//描述
                    transmit: true,//是否传输
                    retainOriginalDocument:true,//是否保留原文件
                    targetPath: "",//目的路径
                    startTime: "",//开始时间
                    endTime: ""//结束时间
                },
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('media',[
                "smsInfoId",//当前流媒体id
                "serialNumber"//序列号
            ])
        },
        methods: {
            //点播频道类型选择
            handleSelectplaychannelType(playchannelType){
                this.formLabelAlign2.playchannelType=playchannelType;
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.showAlert=true;
                if(row){
                    for(let i in row){//修改逻辑处理
                        if(this.formLabelAlign2.hasOwnProperty(i))this.formLabelAlign2[i]=row[i];
                    }
                }else{
                    this.formLabelAlign2={//表单信息,默认填写
                        smsInfoId:'',//流媒体id
                        storagePathId:'',//存储路径id
                        storagePathName:'trials',//存储路径名称
                        virtualPath:'trial',//虚拟路径
                        playchannelName:'MP4',//点播频道名
                        physicalPath:'/home/ftp/Movies/trials/',//物理路径
                        ftpPath:'/trials/',//ftp路径
                        ftpUserName:'chnsysftp',//ftp用户名
                        ftpPassword:'chnsys\n',//ftp密码
                        ftpPort:'21',//ftp端口号
                        description:'',//描述
                        transmit: false,//是否传输
                        retainOriginalDocument:false,//是否保留原文件
                        targetPath:'',//目的路径
                        startTime: "",//开始时间
                        endTime: ""//结束时间
                    }
                }
            },

            //确定保存编辑信息,新增或修改该流媒体存储路径
            sureedit(){
                let {formLabelAlign2}=this;
                let _this=this;
                if(!formLabelAlign2.storagePathName){
                    _this.$msgw('请输入存储路径名称');
                    return false;
                }
                formLabelAlign2.ftpPort=Number(formLabelAlign2.ftpPort)
                formLabelAlign2.smsInfoId=_this.smsInfoId
                formLabelAlign2.serialNumber=_this.serialNumber
                _this.$showToast('加载中...')
                _this.$http.post('/smsInfoConfig/saveStoragePath',formLabelAlign2).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.storagePathId=data.data.storagePathId;//存储路径id
                        _this.$msgs('保存成功');
                        _this.showAlert=false;
                        _this.$parent.getmediaroad();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/smsInfoConfig/saveStoragePath')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoeditAlert2{
        /*弹框*/
        .main-second{
            width:12rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-6rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content1{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                &-div1{
                    .f20();
                    .el-form{
                        background: #E3E7E8;
                        .b(1px,#C6C6C6);
                        padding:.1rem;
                        .flex{
                            flex-wrap: wrap;
                            .fb();
                        }
                        /*label*/
                        .el-form-item__label{
                            .f18();
                            width:1.5rem!important;
                        }
                        .el-form-item__content{
                            margin-left:1.5rem!important;
                        }
                        /*input框*/
                        .el-input{
                            width:2.8rem;
                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                .f18();
                            }
                        }
                        /*文本域*/
                        .el-textarea{
                            width:5rem;
                        }
                        /*button*/
                        .el-button {
                            position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;
                            background:#409eff;
                            span {
                                .f18();
                                color: #fff;
                            }
                        }
                        /*时间选择器*/
                        .el-date-editor{
                            input{
                                padding:0 .5rem!important;
                            }
                        }
                    }
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>