<template>
    <div class="infoAlert2">
        <!--二次弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-if="secondshow">
                <div class="second-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info2">
                        <div class="content-info2-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item class="red-label" label="客户端类型">
                                    <el-select v-model="formLabelAlign.clientType">
                                        <el-option
                                                v-for="item in clientTypeklist"
                                                @click.native="handleSelectclientTypeName(item.clientTypeName)"
                                                :key="item.clientTypeCode"
                                                :label="item.clientTypeName"
                                                :value="item.clientTypeCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="客户端名称">
                                    <el-input type="text" v-model.trim="formLabelAlign.clientName"></el-input>
                                </el-form-item>
                                <el-form-item label="客户端画面地址">
                                    <el-input type="text" v-model.trim="formLabelAlign.clientViewUrl"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="网卡IP">
                                    <el-input class="input-ip" type="text" v-model.trim="formLabelAlign.netWorkIp"></el-input>
                                    <el-button @click="getIp()">自动获取</el-button>
                                </el-form-item>
                                <el-form-item label="是否校验笔录">
                                    <el-select v-model="formLabelAlign.checkRecordNote">
                                        <el-option
                                                v-for="item in checkRecordNotelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="网卡MAC地址">
                                    <el-input type="text" v-model.trim="formLabelAlign.macAddress"></el-input>
                                </el-form-item>
                                <el-form-item label="笔录批注画笔宽度">
                                    <el-select v-model="formLabelAlign.penWide">
                                        <el-option
                                                v-for="(item,index) in penWidelist"
                                                :key="index+1"
                                                :label="index+1"
                                                :value="index+1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="笔录批注画笔颜色">
                                    <el-select v-model="formLabelAlign.penColor">
                                        <el-option
                                                v-for="(item,index) in penColorlist"
                                                :key="index"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!--<el-form-item label="开庭前预览视频URL">-->
                                    <!--<el-input type="text" v-model="formLabelAlign.trialPreviewUrl"></el-input>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="开庭前预览视频名称">-->
                                    <!--<el-input type="text" v-model="formLabelAlign.trialPreviewName"></el-input>-->
                                <!--</el-form-item>-->
                                <el-form-item label="保存笔录天数">
                                    <el-input type="text" v-model="formLabelAlign.temporaryNoteSaveTime"></el-input>
                                </el-form-item>
                                <el-form-item label="CPU报警阈值">
                                    <el-input type="text" v-model="formLabelAlign.temporaryNoteSaveTime"></el-input>
                                </el-form-item>
                                <el-form-item label="内存报警阈值">
                                    <el-input type="text" v-model="formLabelAlign.temporaryNoteSaveTime"></el-input>
                                </el-form-item>
                                <el-form-item label="磁盘报警阈值">
                                    <el-input type="text" v-model="formLabelAlign.temporaryNoteSaveTime"></el-input>
                                </el-form-item>
                                <el-form-item label="笔录备份">
                                    <el-input class="input-time" type="text" v-model="formLabelAlign.sendNoteRecordTime"></el-input>
                                    doc格式向后台发送笔录的时间间隔(秒)
                                    <el-input class="input-time" type="text" v-model="formLabelAlign.sendNoteRecordTime"></el-input>
                                    html格式向后台发送笔录的时间间隔(秒)
                                    <el-input class="input-time" type="text" v-model="formLabelAlign.sendNoteRecordTime"></el-input>
                                    xml格式向后台发送笔录的时间间隔(秒)
                                </el-form-item>
                                <el-form-item label="描述">
                                    <el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>
                                </el-form-item>
                                <el-form-item label="音量柱位置">
                                    <el-select v-model="formLabelAlign.playerVoiceColumnPos">
                                        <el-option
                                                v-for="(item,index) in penWidelist"
                                                :key="index+1"
                                                :label="index+1"
                                                :value="index+1">
                                        </el-option>
                                    </el-select>
                                    <el-checkbox v-model="formLabelAlign.playerVoiceColumn">音量柱显示</el-checkbox>
                                </el-form-item>
                                <el-form-item label="默认登录方式">
                                    <el-select v-model="formLabelAlign.defaultLoginWay">
                                        <el-option
                                                v-for="(item,index) in penWidelist"
                                                :key="index+1"
                                                :label="index+1"
                                                :value="index+1">
                                        </el-option>
                                    </el-select>
                                    <el-checkbox v-model="formLabelAlign.rememberPassword">允许记录登录密码</el-checkbox>
                                </el-form-item>
                                <el-form-item label="">
                                    <el-checkbox v-model="formLabelAlign.collapseStopTrial">客户端崩溃自动闭庭</el-checkbox>
                                    <el-checkbox v-model="formLabelAlign.hostMessageCheck">本机系统信息监测</el-checkbox>
                                    <el-checkbox v-model="formLabelAlign.deviceConnectedCheck">设备连通性监测</el-checkbox>
                                    <el-checkbox v-model="formLabelAlign.clientUpgradeCheck">客户端升级监测</el-checkbox>
                                    <el-checkbox v-model="formLabelAlign.autoClientUpgrade">客户端自动升级</el-checkbox>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <alertBtn @cancel="secondshow=false" @qure="sureAlert2"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"//二次弹框title
    import alertBtn from "../component/alertBtn"//二次弹框底部按钮
    import FoundationTools from '../../../../js/functionAjax'
    import {mapState} from 'vuex'
    import Tool from '../js/tools'
    export default {
        name: "infoAlert2",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'客户端添加',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                clientTypeklist:[{clientTypeCode:0,clientTypeName:'书记员客户端'},{clientTypeCode:1,clientTypeName:'法官客户端'}],//客户端类型select
                penWidelist:Array(10),//笔录批注画笔宽度select
                penColorlist:['红色','蓝色'],//笔录批注画笔颜色select
                formLabelAlign: {//表单信息
                    courtRoomId:'',//法庭id
                    courtRoomName:FoundationTools.getCookie('peicourtRoomName') || '',//法庭名称
                    clientId:'',//客户端id
                    clientType:'',//客户端类型
                    clientTypeName:'',//客户端类型名称
                    clientViewUrl:'',//书记员画面地址
                    clientName:'',//客户端名字
                    netWorkIp:'',//网卡ip
                    macAddress:'',//网卡MAC地址
                    checkRecordNote:'',//是否校验笔录 true是false否
                    penWide:'',//笔录批注画笔宽度
                    penColor:'',//笔录批注画笔颜色
                    //trialPreviewUrl:'',//庭前预览视频URL
                    //trialPreviewName:'',//庭前预览视频名称
                    description:'',//描述
                    defaultLoginWay:'',//默认登陆方式
                    temporaryNoteSaveTime:'',//保存笔录天数
                    sendNoteRecordTime:'',  //发送笔录时间间隔（秒）
                    hostMessageCheck:'',//本机系统信息检测
                    playerVoiceColumnPos:'',//音量柱位置
                    playerVoiceColumn:'', //是否显示音量柱 如果这个是否，音量住位置不让选择
                    collapseStopTrial:'', //客户端崩溃是否自动闭庭
                    rememberPassword:'',//是否允许记录密码
                    deviceConnectedCheck:'', //设备连通性是否检测
                    clientUpgradeCheck:'', //客户端是否升级检测
                    autoClientUpgrade:'', //客户端是否自动升级
                },
            }
        },
        computed:{
            checkRecordNotelist(){
                return this.$store.state.selectlist;
            },
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        created() {
            this.getCourtRoomClientTypeInfo()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取ip和MAC地址
            getIp(){
                if(!Tool.isIE()){
                    this.$msgw('该功能仅支持IE浏览器获取')
                    return
                }
                //let host=window.location.host.split(':8')[0];
                this.$showToast('加载中...')
                setTimeout(()=>{
                    this.$hideToast()
                    if(sessionStorage.getItem('IPAddr')){
                        this.formLabelAlign.netWorkIp=sessionStorage.getItem('IPAddr');
                    }
                    if(sessionStorage.getItem('MACAddr')){
                        this.formLabelAlign.macAddress=sessionStorage.getItem('MACAddr');
                    }
                    if(!sessionStorage.getItem('IPAddr')&&!sessionStorage.getItem('MACAddr')){
                        this.$msgw('获取IP、Mac地址失败')
                    }else if(!sessionStorage.getItem('IPAddr')){
                        this.$msgw('获取IP失败')
                    }else if(!sessionStorage.getItem('MACAddr')){
                        this.$msgw('获取Mac地址失败')
                    }
                },200)
            },
            //查询客户端类型select
            getCourtRoomClientTypeInfo(){
                let _this=this;
                return _this.$http.post('/getCourtRoomClientTypeInfo',{}).then(data =>{
                    if(data.code===200){
                        _this.clientTypeklist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    console.log(err,'/getCourtRoomClientTypeInfo')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //选择
            handleSelectclientTypeName(clientTypeName){
                this.formLabelAlign.clientTypeName=clientTypeName;
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.secondshow=true;
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        courtRoomId:'',//法庭id
                        courtRoomName:FoundationTools.getCookie('peicourtRoomName') || '',//法庭名称
                        clientId:'',//客户端id
                        clientType:'',//客户端类型
                        clientTypeName:'',//客户端类型名称
                        clientViewUrl:'',//书记员画面地址
                        clientName:'',//客户端名字
                        netWorkIp:'',//网卡ip
                        macAddress:'',//网卡MAC地址
                        checkRecordNote:'',//是否校验笔录 true是false否
                        penWide:'',//笔录批注画笔宽度
                        penColor:'',//笔录批注画笔颜色
                        //trialPreviewUrl:'',//庭前预览视频URL
                        //trialPreviewName:'',//庭前预览视频名称
                        description:'',//描述
                        defaultLoginWay:'',//默认登陆方式
                        temporaryNoteSaveTime:'',//保存笔录天数
                        sendNoteRecordTime:'',  //发送笔录时间间隔（秒）
                        hostMessageCheck:'',//本机系统信息检测
                        playerVoiceColumnPos:'',//音量柱位置
                        playerVoiceColumn:'', //是否显示音量柱 如果这个是否，音量住位置不让选择
                        collapseStopTrial:'', //客户端崩溃是否自动闭庭
                        rememberPassword:true,//是否允许记录密码
                        deviceConnectedCheck:'', //设备连通性是否检测
                        clientUpgradeCheck:'', //客户端是否升级检测
                        autoClientUpgrade:'', //客户端是否自动升级
                    }
                }
            },

            //确定保存编辑信息,新增或修改该流媒体存储路径
            sureAlert2(){
                let {courtRoomId,formLabelAlign}=this;
                let _this=this;
                //courtRoomId//法庭id   (为空就是添加，不为空就是更新)
                if(!formLabelAlign.clientType){
                    _this.$msgw('请选择客户端类型');
                    return false;
                }
                if(!formLabelAlign.clientName){
                    _this.$msgw('请输入客户端名称');
                    return false;
                }
                if(!formLabelAlign.netWorkIp){
                    _this.$msgw('请输入网卡IP');
                    return false;
                }
                if(formLabelAlign.netWorkIp && !Tool.isValidIP(formLabelAlign.netWorkIp)){
                    _this.$msgw('请输入网卡有效IP');
                    return false;
                }
                if(!formLabelAlign.macAddress){
                    _this.$msgw('请输入网卡MAC地址');
                    return false;
                }
                if(courtRoomId)formLabelAlign.courtRoomId=courtRoomId;
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomClientInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.httpinfo();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlert2{
        /*二次弹框*/
        .second-main{
            position:absolute;
            left:50%;
            margin-left:-6rem;
            top:1.3rem;
            width:12rem;
            background: #fff;
            border-radius: 2px;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            .secondHead {
                background: #cbe5f3;
            }
            .content-info2 {
                height: 6rem;
                overflow: auto;
                background: #ECEFF0;
                &-div1 {
                    padding:.2rem;
                    .el-form {
                        .fb();
                        flex-wrap: wrap;
                        padding: .2rem;
                        background: #E3E7E8;
                        .b(1px, #C6C6C6);
                        .el-form-item {
                            margin-bottom: .1rem;
                        }

                        /*label*/

                        .el-form-item__label {
                            .f18();
                            width: 1.8rem !important;
                        }

                        .el-form-item__content {
                            margin-left: 1.8rem !important;
                            .f18();
                        }

                        /*input框*/

                        .el-input {
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
                            width:2.8rem;
                        }
                        /*网卡ip input框*/
                        .input-ip{
                            width:1.9rem;
                        }
                        /*button*/
                        .el-button {
                            position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;
                            background: #409eff;

                            span {
                                .f18();
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>