<template>
    <div class="infoAlertsecond5">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-show="secondshow">
                <div class="second-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info2">
                        <div class="content-info2-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item class="red-label" label="角色名称">
                                    <el-select v-model="formLabelAlign.audioRoleId">
                                        <el-option
                                                v-for="item in roleInfolist"
                                                @click.native="handleSelectaudioRoleName(item.audioRoleName)"
                                                :key="item.audioRoleId"
                                                :label="item.audioRoleName"
                                                :value="item.audioRoleId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="音频信号源名称">
                                    <el-input type="text" v-model.trim="formLabelAlign.audioSignalSourceName"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="连接设备IP">
                                    <el-select v-model="formLabelAlign.connectDeviceIp" @focus="getAudioDeviceInfo">
                                        <el-option
                                                v-for="item in connectDeviceIpList"
                                                :key="item.deviceIp"
                                                :label="item.deviceIp"
                                                :value="item.deviceIp">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="编码通道">
                                    <el-select v-model="formLabelAlign.channelNum">
                                        <el-option
                                                v-for="item in numList"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="声道">
                                    <el-select v-model="formLabelAlign.audioTrack">
                                        <el-option
                                                v-for="item in numList"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="流地址">
                                    <el-input type="text" v-model="formLabelAlign.flowAddress"></el-input>
                                </el-form-item>
                                <el-form-item label="流封装模式">
                                    <el-select v-model="formLabelAlign.flowPackageMode">
                                        <el-option
                                                v-for="item in flowPackageModelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否录制">
                                    <el-select v-model="formLabelAlign.record">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-checkbox v-model="formLabelAlign.syncFluidization">同步流化</el-checkbox>
                                </el-form-item>
                                <el-form-item label="是否语音识别">
                                    <el-select v-model="formLabelAlign.voiceCall">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="是否显示音柱">
                                    <el-select v-model="formLabelAlign.soundColumn">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <alertBtn @cancel="secondshow=false" @qure="sureedit"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"//二次弹框title
    import alertBtn from "../component/alertBtn"//二次弹框底部按钮
    import {mapState} from 'vuex'
    export default {
        name: "infoAlertsecond5",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'角色管理',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                roleInfolist:[],
                numList:[1,2,3,4,5,6,7,8,9,10],//编码通道、声道select
                flowPackageModelist:[{id:1,name:'单流多声道'},{id:2,name:'单流单声道'}],//流封装模式
                connectDeviceIpList:[],
                formLabelAlign: {//表单信息
                    "voiceCall": '',//是否语音识别
                    "connectDeviceIp": "",//连接设备ip
                    "flowAddress": "",//流地址
                    "record": '',//是否录制
                    "audioTrack":'',//声道
                    "courtRoomName": "",//法庭名称
                    'audioSignalSourceName':'',
                    "flowPackageMode":'',//流封装模式
                    "audioRoleId": "",//音频角色id
                    "audioSignalSourceId": "",//音频信号源id
                    "remarks": "",//备注
                    "syncFluidization":'',//同步流化
                    "audioRoleName": "",//音频角色名称
                    "channelNum": '',//通道数
                    "soundColumn": '',//是否显示音柱
                    "courtRoomId": ""//法庭id
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
            options(){
                return this.$store.state.selectlist
            },
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        methods: {
            getAudioDeviceInfo(){
                let {courtRoomId}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getAudioDeviceInfo',{
                    id:courtRoomId,//法庭id
                    pageIndex:1,
                    pageSize:100
                }).then(data =>{
                    if(data.code===200){
                        _this.connectDeviceIpList=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getAudioDeviceInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //打开弹框,修改逻辑处理
           async show(row){
                this.secondshow=true;
                if(this.roleInfolist.length===0){
                    await this.getAudioRoleInfo()
                }
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        "voiceCall": '',//是否语音识别
                        "connectDeviceIp": "",//连接设备ip
                        "flowAddress": "",//流地址
                        "record": '',//是否录制
                        "audioTrack":this.numList[0],//声道,默认选择第一条
                        "courtRoomName": "",//法庭名称
                        "flowPackageMode":this.flowPackageModelist[0].id,//流封装模式,默认选择第一条
                        "audioRoleId": "",//音频角色id
                        "audioSignalSourceId": "",//音频信号源id
                        "remarks": "",//备注
                        "syncFluidization":'',//同步流化
                        "audioRoleName": "",//音频角色名称
                        'audioSignalSourceName':'',
                        "channelNum":this.numList[0],//通道数,默认选择第一条
                        "soundColumn": '',//是否显示音柱
                        "courtRoomId": ""//法庭id
                    }
                }
            },
            //角色名称select
            getAudioRoleInfo(){
                let _this=this;
                _this.$showToast('加载中...')
                return _this.$http.post('/getAudioRoleInfo',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.roleInfolist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getAudioRoleInfo')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //角色名称选择
            handleSelectaudioRoleName(audioRoleName){
                this.formLabelAlign.audioRoleName=audioRoleName
                this.formLabelAlign.audioSignalSourceName=audioRoleName
            },
            //确定保存编辑信息
            sureedit(){
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.audioRoleName){
                    _this.$msgw('请输入角色名称');
                    return false;
                }
                if(!formLabelAlign.audioSignalSourceName){
                    _this.$msgw('请输入音频信号源名称');
                    return false;
                }
                if(!formLabelAlign.connectDeviceIp){
                    _this.$msgw('请选择连接设备IP');
                    return false;
                }
                // if(formLabelAlign.connectDeviceIp && !Tool.isValidIP(formLabelAlign.connectDeviceIp)){
                //     _this.$msgw('请输入有效IP');
                //     return false;
                // }
                formLabelAlign.courtRoomId=_this.courtRoomId
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateAudioSignalInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo2();//更新列表
                    }else{
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/saveOrUpdateAudioSignalInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlertsecond5{
        /*二次弹框*/
        .second-main{
            position:absolute;
            left:50%;
            margin-left:-5rem;
            top:1rem;
            width:10rem;
            background: #fff;
            border-radius: 2px;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            .secondHead {
                background: #cbe5f3;
            }
            .content-info2 {
                background: #ECEFF0;
                &-div1 {
                    padding:.2rem;
                    .el-form {
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
                        }

                        /*input框*/

                        .el-input {
                            width: 4rem;

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