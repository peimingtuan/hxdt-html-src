<template>
    <div class="infoAlertsecond3">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-if="secondshow">
                <div class="secondinfo-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info2">
                        <div class="content-info2-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item class="red-label" label="信号源名称">
                                    <el-select v-model="formLabelAlign.viewId">
                                        <el-option
                                                v-for="item in viewIdlist"
                                                @click.native="handleSelectviewName(item.viewName)"
                                                :key="item.viewId"
                                                :label="item.viewName"
                                                :value="item.viewId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="对应合成画面位置">
                                    <el-select v-model="formLabelAlign.viewLocation">
                                        <el-option
                                                v-for="item in viewLocationlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="编码器IP">
                                    <el-input type="text" v-model.trim="formLabelAlign.signalSourceIp"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="流地址">
                                    <el-input type="text" v-model.trim="formLabelAlign.flowAddress"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="送流通道号">
                                    <el-input type="text" v-model.trim="formLabelAlign.sendChannelNumber"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="编码通道号">
                                    <el-input type="text" v-model.trim="formLabelAlign.channelNum"></el-input>
                                </el-form-item>
                                <el-form-item label="签名阶段是否录制">
                                    <el-select v-model="formLabelAlign.recordInSign">
                                        <el-option
                                                v-for="item in recordInSignlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="流类型">
                                    <el-select v-model="formLabelAlign.flowType">
                                        <el-option
                                                v-for="item in flowTypelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="分辨率">
                                    <el-select v-model="formLabelAlign.resolution">
                                        <el-option
                                                v-for="item in resolutionlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="庭审阶段是否录制">
                                    <el-select v-model="formLabelAlign.record">
                                        <el-option
                                                v-for="item in recordlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="内网直播频道URL">
                                    <el-input type="text" v-model.trim="formLabelAlign.intranetChanneUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="是否字幕设置">
                                    <el-select v-model="formLabelAlign.pushSubtitle">
                                        <el-option
                                                v-for="item in selectlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="内网直播频道名">
                                    <el-input type="text" v-model.trim="formLabelAlign.intranetChannelName"></el-input>
                                    <el-checkbox v-model="formLabelAlign.startIntranetChannel">是否开启</el-checkbox>
                                </el-form-item>
                                <el-form-item label="分割模式">
                                    <el-select v-model="formLabelAlign.splitMode">
                                        <el-option
                                                v-for="item in splitModeList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="对外直播频道名">
                                    <el-input type="text" v-model="formLabelAlign.extranetChannelName"></el-input>
                                    <el-checkbox v-model="formLabelAlign.startExtranetChannel">是否开启</el-checkbox>
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
    import FoundationTools from '../../../../js/functionAjax'
    import {mapState} from 'vuex'
    import Tool from "../js/tools"
    export default {
        name: "infoAlertsecond3",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'信号源配置',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                viewIdlist:[],//[{viewId:0,viewName:'书记员客户端'},{viewId:1,viewName:'法官客户端'}],//信号源类型select
                viewLocationlist:[{id:1,name:'复合画面'},{id:2,name:'第一画面'},{id:3,name:'第二画面'},{id:4,name:'第三画面'},{id:5,name:'第四画面'},{id:6,name:'第五画面'},{id:7,name:'第六画面'},{id:8,name:'第七画面'}],//对应合成画面位置
                resolutionlist:[{id:1,name:'PAL'},{id:2,name:'NTSC'},{id:3,name:'1080P'},{id:4,name:'720P'},{id:5,name:'576P'},{id:6,name:'480P'},{id:7,name:'800x600'},{id:8,name:'1024x768'},{id:9,name:'1280x1024'},{id:10,name:'1366x768'},{id:11,name:'1440x900'},{id:12,name:'1280x800'},{id:13,name:'2560X1440'}],//分辨率
                flowTypelist:[{id:101,name:'DVC-CHNSYS'},{id:102,name:'AVS3.0'},{id:103,name:'DVC-CHNSYS-TCP'}],//流类型
                recordlist:[{id:true,name:'是'},{id:false,name:'否'}],//庭审阶段是否录制select
                recordInSignlist:[{id:true,name:'是'},{id:false,name:'否'}],//签名阶段是否录制select
                splitModeList:[
                    {id:'ONE',name:'1分割'},
                    {id:'TWO_D',name:'2分割'},
                    {id:'THREE_A',name:'3分割'},
                    {id:'FOUR_A',name:'4分割'},
                    {id:'FIVE_A',name:'5分割'},
                    {id:'SIX_A',name:'6分割'},
                    {id:'EIGHT_A',name:'8分割'},
                    {id:'NINE_A',name:'9分割'},
                ],
                formLabelAlign: {//表单信息
                    signalSourceIp:'',//编码器IP
                    resolution:'',//分辨率
                    sortOrder:'',//排序号
                    deleteFlag:'',//删除标记
                    validityFlag:'',//是否有效
                    pullFlowType:'',//解码拉流方式
                    viewId: "",//视角id
                    signalSourceId: "",//信号源id
                    outputDeviceName: "",//输出设备名称
                    extranetChannelName: "",//外网直播频道名
                    intranetChanneUrl: "",//内网直播频道url
                    intranetChannelName: "",//内网直播频道名
                    signalSourceType:1,//编解类型(1编码2解码)
                    recordInSign:'',//签名阶段是否录制（1是0否）
                    record:'',//庭审阶段是否录制
                    ecosRecord:'',//ECOS是否录制(1是，0否)
                    liveBurn:'',//是否实时刻录(1是，0否)
                    courtRoomName: "",//法庭名称
                    flowAddress: "",//流地址
                    channelNum:'',//编码通道号
                    sendChannelNumber:'',//送流通道号
                    viewName: "",//视角名称
                    flowType:103,//流类型
                    courtRoomId: "",//法庭id
                    viewLocation:1,//画面位置
                    startIntranetChannel:'',//是否开启内网直播通道
                    startExtranetChannel:'',//是否开启外网直播通道
                    captionsSource: "",//字幕内容
                    subtitleContent: "",//自定义字幕内容
                    contentPosition: "",//字幕显示位置
                    contentDuration:'',//字幕显示时长
                    contentColor: "",//字幕颜色
                    timePosition: "",//字幕叠加系统时间显示位置
                    timeColor: "",//字幕叠加系统时间字体颜色
                    timeDuration:'',//字幕时间显示时长
                    bitratePosition: "",//字幕叠加码率显示位置
                    bitrateColor: "",//	字幕叠加码率字体颜色
                    bitrateDuration:'',//字幕码率显示时长
                    pushSubtitle:'',//是否设置字幕 1是 0否
                    splitMode:'',//分割模式
                    pushTime:'',//是否设置时间 1是0否
                    courtDeviceModel:'',//法庭设备类型
                    courtDeviceModelName: ""//法庭设备类型名称
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
            selectlist(){
              return this.$store.state.selectlist;
            },
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        methods: {
            //获取信号源名称/视角
            getViewInfo(){
                let _this=this;
                _this.$showToast('加载中...')
                return _this.$http.post('/getViewInfo',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.viewIdlist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getViewInfo')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //选择
            handleSelectviewName(viewName){
                this.formLabelAlign.viewName=viewName;
            },
            //打开弹框,修改逻辑处理
           async show(row){
                this.secondshow=true;
                if(this.viewIdlist.length===0){
                    this.getViewInfo();
                }
                if(row){
                    for(let i in row){//修改逻辑处理
                        //this.formLabelAlign=JSON.parse(JSON.stringify(Object.assign(this.formLabelAlign,row)))
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        signalSourceIp:'',//编码器IP
                        resolution:'',//分辨率
                        sortOrder:'',//排序号
                        deleteFlag:'',//删除标记
                        validityFlag:'',//是否有效
                        pullFlowType:'',//解码拉流方式
                        viewId: "",//视角id
                        signalSourceId: "",//信号源id
                        outputDeviceName: "",//输出设备名称
                        extranetChannelName: "",//外网直播频道名
                        intranetChanneUrl: "",//内网直播频道url
                        intranetChannelName: "",//内网直播频道名
                        signalSourceType:1,//编解类型(1编码2解码)
                        recordInSign:'',//签名阶段是否录制（1是0否）
                        record:'',//庭审阶段是否录制
                        ecosRecord:'',//ECOS是否录制(1是，0否)
                        liveBurn:'',//是否实时刻录(1是，0否)
                        courtRoomName: "",//法庭名称
                        flowAddress: "",//流地址
                        viewName: "",//视角名称
                        flowType:103,//流类型,默认选择第一个
                        channelNum:'',//编码通道号
                        sendChannelNumber:'',//送流通道号
                        courtRoomId: "",//法庭id
                        viewLocation:1,//
                        startIntranetChannel:'',//是否开启内网直播通道
                        startExtranetChannel:'',//是否开启外网直播通道
                        captionsSource: "",//字幕内容
                        subtitleContent: "",//自定义字幕内容
                        contentPosition: "",//字幕显示位置
                        contentDuration:'',//字幕显示时长
                        contentColor: "",//字幕颜色
                        timePosition: "",//字幕叠加系统时间显示位置
                        timeColor: "",//字幕叠加系统时间字体颜色
                        timeDuration:'',//字幕时间显示时长
                        bitratePosition: "",//字幕叠加码率显示位置
                        bitrateColor: "",//	字幕叠加码率字体颜色
                        bitrateDuration:'',//字幕码率显示时长
                        pushSubtitle:'',//是否设置字幕 1是 0否
                        splitMode:'',//分割模式
                        pushTime:'',//是否设置时间 1是0否
                        courtDeviceModel:'',//法庭设备类型
                        courtDeviceModelName: ""//法庭设备类型名称
                    }
                }
            },

            //确定保存编辑信息,新增或修改信号源配置信息
            sureedit(){
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.viewId){
                    formLabelAlign.viewId='';
                    formLabelAlign.viewName='请选择';
                }
                if(!formLabelAlign.viewLocation){
                    _this.$msgw('对应合成画面位置不能为空');
                    return false
                }else if(!formLabelAlign.signalSourceIp){
                    _this.$msgw('编码器IP不能为空');
                    return false
                }else if(!formLabelAlign.flowAddress){
                    _this.$msgw('流地址不能为空');
                    return false
                }else if(!formLabelAlign.sendChannelNumber){
                    _this.$msgw('送流通道号不能为空');
                    return false
                }else if(!formLabelAlign.channelNum){
                    _this.$msgw('编码通道号不能为空');
                    return false
                }
                if(formLabelAlign.signalSourceIp&&!Tool.isValidIP(formLabelAlign.signalSourceIp)){
                    _this.$msgw('请输入有效IP');
                    return false
                }
                formLabelAlign.courtRoomId=_this.courtRoomId;//法庭id
                formLabelAlign.courtRoomName=FoundationTools.getCookie('peicourtRoomName') || '';//法庭名称
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo2();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlertsecond3{
        /*二次弹框*/
        .secondinfo-main{
            position:absolute;
            left:50%;
            margin-left:-7rem;
            top:1rem;
            width:14rem;
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
                        .fb();
                        flex-wrap: wrap;
                        .b(1px, #C6C6C6);
                        .el-form-item {
                            margin-bottom:.1rem;
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
                            width:3rem!important;

                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                .f18();
                            }
                        }
                    }
                }
            }
        }
    }
</style>