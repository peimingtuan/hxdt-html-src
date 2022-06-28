<template>
    <div class="addremoteAlertfour2">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="复用模板">
                                <el-select v-model="formLabelAlign.aa" placeholder="请选择">
                                    <el-option v-for="(list,index) in aa" :key="index" :label="list.name" :value="list.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="模板分组">
                                <el-select v-model="formLabelAlign.templateGroupId" placeholder="请选择">
                                    <el-option v-for="(list,index) in templateGroupList" :key="index" :label="list.templateGroupName" :value="list.templateGroupId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="模板名称" required>
                                <el-input v-model="formLabelAlign.templateName"></el-input>
                            </el-form-item>
                            <el-form-item label="法庭" required>
                                <el-select v-model="formLabelAlign.courtRoomId" placeholder="请选择">
                                    <el-option v-for="(list,index) in courtRoomList" :key="index" :label="list.courtRoomName" :value="list.courtRoomId"></el-option>
                                </el-select>
                                <el-button class="blu" type="primary" round @click="openAlert2(-1)">软中控配置</el-button>
                            </el-form-item>
                            <el-form-item label="远端">
                                <div>
                                    <div class="zkt">
                                        <div class="zkt-left">
                                            <div v-for="(list,index) in formLabelAlign.remoteTrialTemplateTrialRooms">
                                                远{{index+1}}：
                                                <div class="case-yo">
                                                    <el-input v-model="list.trialRoomName" disabled></el-input>
                                                    <span class="span-btn" @click="openAlert1(list,index)">...</span>
                                                </div>
                                                <el-button class="blu" type="primary" round @click="openAlert2(index)">软中控配置</el-button>
                                                <img v-if="index != 0" @click="deleteZkt(index)" src="../images/yingyongpeizhi/yuancheng/del.png" />
                                            </div>
                                        </div>
                                        <div class="zkt-right" @click="addZkt()">
                                            <img src="../images/yingyongpeizhi/yuancheng/add.png" />
                                        </div>
                                    </div>
                                    <div>
                                        <el-button class="blu" type="primary" @click="openAlert3()">编解码通道配置</el-button>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="模板描述" prop="desc">
                                <el-input type="textarea" v-model="formLabelAlign.templateDesc" placeholder="......"></el-input>
                            </el-form-item>
                        </el-form>
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
        <!-- 弹框 -->
        <addremoteAlertfour21 ref="addremoteAlertfour21" :alertshow="ismain1" @selectshow="ismain1=false" @qure="addlawsure1" @cancel="ismain1=false"/>
        <addremoteAlertfour22 ref="addremoteAlertfour22" :alertshow="ismain2" @selectshow="ismain2=false" @qure="addlawsure2" @cancel="ismain2=false"/>
        <addremoteAlertfour23 ref="addremoteAlertfour23" :alertshow="ismain3" @selectshow="ismain3=false" @qure="addlawsure3" @cancel="ismain3=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    import addremoteAlertfour21 from "./addremoteAlertfour21"
    import addremoteAlertfour22 from "./addremoteAlertfour22"
    import addremoteAlertfour23 from "./addremoteAlertfour23"
    export default {
        name: "addremoteAlertfour2",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
            addremoteAlertfour21,
            addremoteAlertfour22,
            addremoteAlertfour23
        },
        data() {
            return {
                ismain1:false,
                ismain2:false,
                ismain3:false,
                text:'添加模板管理',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                // 复用模板
                aa:[],
                // 模板分组
                templateGroupList:[],
                // 法庭
                courtRoomList:[],
                formLabelAlign: {
                    // isDefaultTemplate:false,
                    templateId:'',
                    templateGroupId: '',
                    templateName: '',
                    courtRoomId: '',
                    centralCommand:'',
                    remoteTrialTemplateTrialRooms: [
                        {
                            remoteTrialTemplateTrialRoomId:'',
                            trialRoomId:'',
                            trialRoomName:'',
                            templateId:'',
                            centralCommand:'',
                        },
                    ],
                    remoteTrialTemplateEnDes:[
                        {
                            encodePosition:'',
                            decodeId:'',
                            solution:'',
                            remoteTrialTemplateEnDeId:'',
                            decodeName:'',
                            encodeNum:'',
                            decodePosition:'',
                            encodeId:'',
                            templateId:'',
                            decodeNum:'',
                            encodeName:''
                        }
                    ],
                    templateDesc:'',
                },
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            // 获取模板分组
            getTemplateGroup(){
                this.$http.post('/remoteTrial/getRemoteTemplateGroupInfosByPage',{
                    pageIndex:-1,//当前页码
                    pageSize:-1 //每页大小
                }).then(data =>{
                    if(data.code===200){
                        this.templateGroupList = data.data;
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            // 获取法庭
            getCourtRoom(){
                this.$http.post('/courtRoomConfig/getCourtRoomPageInfo',{
                    pageIndex:-1,//当前页码
                    pageSize:-1 //每页大小
                }).then(data =>{
                    if(data.code===200){
                        this.courtRoomList = data.data;
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                if(this.formLabelAlign.templateName == ''){
                    this.$msgw('模板名称不能为空！');
                    return;
                }
                if(this.formLabelAlign.courtRoomId == ''){
                    this.$msgw('法庭名称不能为空！');
                    return;
                }
                let url = '';
                if(this.formLabelAlign.templateId){
                    url = '/remoteTrial/updateRemoteTrialTemplate';
                }else{
                    url = '/remoteTrial/addRemoteTrialTemplate';
                }
                this.$http.post(url,
                    this.formLabelAlign
                ).then(data =>{
                    if(data.code===200){
                        this.$msgs(data.message);
                        this.cancel();
                        this.$emit('qure');
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })

            },
            cancel() {
                this.$emit('cancel');
            },
            // 添加远端
            addZkt(){
                let length = this.formLabelAlign.remoteTrialTemplateTrialRooms.length;
                if(this.formLabelAlign.remoteTrialTemplateTrialRooms[length-1].trialRoomId == ''){
                    this.$msgw('请选择庭审室！');
                    return;
                }
                let data = {
                    remoteTrialTemplateTrialRoomId:'',
                    trialRoomId:'',
                    trialRoomName:'',
                    templateId:'',
                    centralCommand:'',
                }
                this.formLabelAlign.remoteTrialTemplateTrialRooms.push(data)
            },
            // 删除远端
            deleteZkt(index){
                this.formLabelAlign.remoteTrialTemplateTrialRooms.splice(index,1);
            },
            // 庭审室选择
            openAlert1(list,index){
                this.ismain1=true;
                if(this.formLabelAlign.templateId){
                    this.$refs.addremoteAlertfour21.trialRoomId = this.formLabelAlign.remoteTrialTemplateTrialRooms[index].trialRoomId;
                    this.$refs.addremoteAlertfour21.trialRoomName = this.formLabelAlign.remoteTrialTemplateTrialRooms[index].trialRoomName;
                }else{
                    this.$refs.addremoteAlertfour21.trialRoomId = '';
                    this.$refs.addremoteAlertfour21.trialRoomName = '';
                }
                this.$refs.addremoteAlertfour21.getTreeData();
                this.$refs.addremoteAlertfour21.dataIndex = index;
            },
            // 拿到庭审室选择
            addlawsure1(obj,index){
                this.formLabelAlign.remoteTrialTemplateTrialRooms[index].trialRoomId = obj.trialRoomId;
                this.formLabelAlign.remoteTrialTemplateTrialRooms[index].trialRoomName = obj.trialRoomName;
            },
            // 软中控配置
            openAlert2(index){
                this.ismain2=true;
                if(index == -1){
                    // if(this.formLabelAlign.templateId){
                        this.$refs.addremoteAlertfour22.centralCommand = this.formLabelAlign.centralCommand;
                    // }else{
                        // this.$refs.addremoteAlertfour22.centralCommand = '';
                    // }
                }else{
                    // if(this.formLabelAlign.templateId){
                        this.$refs.addremoteAlertfour22.centralCommand = this.formLabelAlign.remoteTrialTemplateTrialRooms[index].centralCommand;
                    // }else{
                        // this.$refs.addremoteAlertfour22.centralCommand = '';
                    // }
                }
                this.$refs.addremoteAlertfour22.dataIndex = index;
            },
            // 拿到法庭h或远端的软中控配置
            addlawsure2(val,index){
                if(index == -1){
                    this.formLabelAlign.centralCommand = val;
                }else{
                    this.formLabelAlign.remoteTrialTemplateTrialRooms[index].centralCommand = val;
                }
            },
            // 编解码通道配置
            openAlert3(){

                let relativeRooms = [
                    {
                        roomId: this.formLabelAlign.courtRoomId,
                        roomType: 0
                    }
                ];
                for(let i = 0; i < this.formLabelAlign.remoteTrialTemplateTrialRooms.length; i ++){
                    relativeRooms.push({
                        roomId:this.formLabelAlign.remoteTrialTemplateTrialRooms[i].trialRoomId,
                        roomType: 1
                    })
                };
                this.$refs.addremoteAlertfour23.tableData = this.formLabelAlign.remoteTrialTemplateEnDes;
                this.ismain3=true;
                this.$refs.addremoteAlertfour23.relativeRooms = relativeRooms;
                this.$refs.addremoteAlertfour23.getSelect1();
                this.$refs.addremoteAlertfour23.getSelect2();
            },
            // 拿到编解码通道配置
            addlawsure3(val){
                this.formLabelAlign.remoteTrialTemplateEnDes = val;
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addremoteAlertfour2{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-5rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                max-height:6rem;
                overflow: auto;
                margin-top:.1rem;
                padding:.2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.2rem!important;
                }
                .el-form-item__content{
                    margin-left:1.2rem!important;
                }
                /*input框*/
                .el-input{
                    width:4rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    padding:0 .2rem;
                    height:.4rem;
                }
                .blu{
                    margin-top:.1rem;
                    background:#edf5ff;
                    border:1px solid #BEDEFF;
                    span{
                        color:#409EFF ;
                        .f16();
                    }
                }
                /*远端*/
                .zkt{
                    .fl-v();
                    img{
                        cursor:pointer;
                    }
                    &-left{
                        &>div{
                            .fl-v();
                            .f16();
                        }
                        padding:.1rem;
                        border:1px solid #D2CFCF;
                        border-radius:3px;
                        .blu{
                            margin:0 .05rem;
                        }
                        .case-yo{
                            position:relative;
                            overflow: hidden;
                            .el-input{
                                width:3.2rem;
                                .el-input__inner{
                                    padding: 0 .35rem 0 .05rem!important;
                                    .f16();
                                }
                            }
                            span{
                                position:absolute;
                                right:0rem;
                                top:-.05rem;
                                cursor:pointer;
                                .f16();
                                width:.4rem;
                                line-height:.4rem;
                                text-align: center;
                                display:inline-block;
                            }
                        }
                    }
                    &-right{
                        margin-left:.05rem;
                    }
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>