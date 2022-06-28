<template>
    <div class="infoAlertfirst5">
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
                                <el-form-item class="red-label" label="设备编号">
                                    <el-select v-model="formLabelAlign.deviceNumber">
                                        <el-option
                                                v-for="(item,index) in deviceNumList"
                                                :key="index"
                                                :label="index+1"
                                                :value="index+1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="设备名称">
                                    <el-input type="text" v-model.trim="formLabelAlign.audioDeviceName"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="设备IP">
                                    <el-input type="text" v-model.trim="formLabelAlign.deviceIp"></el-input>
                                    <el-button @click="getAudioDeviceSNAndVer()">获取</el-button>
                                </el-form-item>
                                <el-form-item class="red-label" label="设备类型">
                                    <el-select v-model="formLabelAlign.deviceType">
                                        <el-option
                                                v-for="item in deviceTypelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!--<el-form-item class="red-label" label="主从角色">-->
                                    <!--<el-select v-model="formLabelAlign.masterSlaveRole">-->
                                        <!--<el-option-->
                                                <!--v-for="item in rolelist"-->
                                                <!--:key="item.masterSlaveRole"-->
                                                <!--:label="item.name"-->
                                                <!--:value="item.masterSlaveRole">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="主设备名称">-->
                                    <!--<el-select v-model="formLabelAlign.parentDeviceId">-->
                                        <!--<el-option-->
                                                <!--v-for="item in devicelist"-->
                                                <!--@click.native="handleSelectparentDeviceName(item.audioDeviceName)"-->
                                                <!--:key="item.audioDeviceId"-->
                                                <!--:label="item.audioDeviceName"-->
                                                <!--:value="item.audioDeviceId">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <el-form-item class="red-label" label="声道">
                                    <el-select v-model="formLabelAlign.trackNum">
                                        <el-option
                                                v-for="item in trackNumlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="序列号">
                                    <el-input type="text" v-model="formLabelAlign.serialNumber"></el-input>
                                </el-form-item>
                                <el-form-item label="版本号">
                                    <el-input type="text" v-model="formLabelAlign.version"></el-input>
                                </el-form-item>
                                <el-form-item label="厂商">
                                    <el-select v-model="formLabelAlign.manufacturerCode">
                                        <el-option
                                                v-for="item in manufacturerlist"
                                                :key="item.manufacturerCode"
                                                @click.native="handleSelectmanufacturerName(item.manufacturerName)"
                                                :label="item.manufacturerName"
                                                :value="item.manufacturerCode">
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
    import Tool from "../js/tools"
    export default {
        name: "infoAlertfirst5",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'音频设备配置',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                deviceTypelist:[{id:1,name:'DAP1000H'}],//设备类型select
                rolelist:[{masterSlaveRole:1,name:'主1'},{masterSlaveRole:2,name:'从1'},{masterSlaveRole:3,name:'从2'}],//主从角色select
                trackNumlist:[{id:8,name:8},{id:10,name:10}],//声道select
                devicelist:[],//主设备名称select
                deviceNumList:new Array(30),//设备编号
                formLabelAlign: {//表单信息
                    deviceNumber:'',
                    "manufacturerCode":'',//厂商代码
                    "trackNum":'',//声道数
                    "audioDeviceId": "",//音频设备id
                    "audioDeviceName": "",//音频设备名称
                    "serverId": "",//服务器id没用
                    "masterSlaveRole":'',//主从关系
                    "serialNumber": "",//序列号
                    "manufacturerName": "",//厂商名称
                    "parentDeviceId": "",//主设备id
                    "parentDeviceName": "",//主设备名称
                    "deviceIp": "",//设备ip
                    "deviceType":'',//设备类型
                    "version": "",//版本号
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
        watch:{
            'formLabelAlign.masterSlaveRole': function(v){
                if(v==1)this.formLabelAlign.trackNum=8
                else this.formLabelAlign.trackNum=10
            }
        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
                "manufacturerlist"
            ])
        },
        methods: {
            //序列号，版本号
            getAudioDeviceSNAndVer(){
                let {formLabelAlign}=this;
                const _this=this;
                if(!formLabelAlign.deviceIp){
                    _this.$msgw('请先输入设备IP')
                    return
                }
                if(formLabelAlign.deviceIp && !Tool.isValidIP(formLabelAlign.deviceIp)){
                    _this.$msgw('请输入有效设备IP');
                    return;
                }
                if(!formLabelAlign.deviceType){
                    _this.$msgw('请先选择设备类型')
                    return
                }
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/getAudioDeviceSNAndVer',{
                    deviceIp:formLabelAlign.deviceIp,
                    deviceType:formLabelAlign.deviceType
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        formLabelAlign.serialNumber=data.data.serialNumber;
                        formLabelAlign.version=data.data.version;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/getAudioDeviceSNAndVer')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //打开弹框,修改逻辑处理
           async show(row){
                this.secondshow=true;
                if(this.devicelist.length===0){
                  await this.getMainAudioDeviceInfo();
                }
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        deviceNumber:1,
                        "manufacturerCode":this.manufacturerlist.length>0?2:'',//厂商代码
                        "manufacturerName":this.manufacturerlist.length>0?'北京华夏电通科技有限公司':'',//厂商名称
                        "trackNum":'',//声道数
                        "audioDeviceId": "",//音频设备id
                        "audioDeviceName": "",//音频设备名称
                        "serverId": "",//服务器id没用
                        "masterSlaveRole":this.rolelist[0].masterSlaveRole,//主从关系,默认选择第一条
                        "serialNumber": "",//序列号
                        //"parentDeviceId":this.devicelist.length>0?this.devicelist[0].audioDeviceId:'',//主设备id
                        //"parentDeviceName":this.devicelist.length>0?this.devicelist[0].audioDeviceName:'',//主设备名称,默认选择第一条
                        "deviceIp": "",//设备ip
                        "deviceType":this.deviceTypelist[0].id,//设备类型,默认选择第一条
                        "version": "",//版本号
                        "courtRoomId": ""//法庭id
                    }
                }
            },
            //主设备名称select
            getMainAudioDeviceInfo(){
                let _this=this;
                _this.$showToast('加载中...')
                return _this.$http.post('/courtRoomConfig/getMainAudioDeviceInfo',{
                    courtRoomId:_this.courtRoomId
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.devicelist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/getMainAudioDeviceInfo')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //选择
            handleSelectparentDeviceName(audioDeviceName){
                this.formLabelAlign.parentDeviceName=audioDeviceName
            },
            //厂商选择
            handleSelectmanufacturerName(manufacturerName){
                this.formLabelAlign.manufacturerName=manufacturerName;
            },
            //确定保存编辑信息
            sureedit(){
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.deviceNumber){
                    _this.$msgw('请选择设备编号');
                    return false;
                }
                if(!formLabelAlign.audioDeviceName){
                    _this.$msgw('请输入设备名称');
                    return false;
                }
                if(!formLabelAlign.deviceIp){
                    _this.$msgw('请输入设备IP');
                    return false;
                }
                if(formLabelAlign.deviceIp && !Tool.isValidIP(formLabelAlign.deviceIp)){
                    _this.$msgw('请输入有效设备IP');
                    return false;
                }
                if(!formLabelAlign.deviceType){
                    _this.$msgw('请选择设备类型');
                    return false;
                }
                // if(!formLabelAlign.masterSlaveRole){
                //     _this.$msgw('请选择主从角色');
                //     return false;
                // }
                if(!formLabelAlign.trackNum){
                    _this.$msgw('请选择声道');
                    return false;
                }
                formLabelAlign.courtRoomId=_this.courtRoomId
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateAudioDeviceInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo1();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/saveOrUpdateAudioDeviceInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlertfirst5{
        /*二次弹框*/
        .second-main{
            position:absolute;
            left:50%;
            margin-left:-5rem;
            top:1.5rem;
            width:10rem;
            background: #fff;
            border-radius: 2px;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
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