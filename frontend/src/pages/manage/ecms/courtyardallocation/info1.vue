<template>
    <div class="info1">
        <div class="base-top">
            <div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="法院">
                        <el-input v-model="formLabelAlign.courtName" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="法庭类型">
                        <el-select v-model="formLabelAlign.courtRoomTypeCode" placeholder="请选择">
                            <el-option
                                    v-for="item in courtRoomTypeNamelist"
                                    @click.native="handleSelectcourtRoomType(item.courtRoomTypeName)"
                                    :key="item.courtRoomTypeCode"
                                    :label="item.courtRoomTypeName"
                                    :value="item.courtRoomTypeCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序号">
                        <el-input v-model.trim="formLabelAlign.sortOrder" @blur="isNum(formLabelAlign.sortOrder)"></el-input>
                    </el-form-item>
                    <el-form-item label="信号来源">
                        <el-select v-model="formLabelAlign.signalResourceCode" placeholder="请选择">
                            <el-option
                                    v-for="item in signalSourcelist"
                                    @click.native="handleSelectsignalResourceName(item.signalResourceName)"
                                    :key="item.signalResourceCode"
                                    :label="item.signalResourceName"
                                    :value="item.signalResourceCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时序电源IP">
                        <el-input v-model="formLabelAlign.timeSeriesPowerIp"></el-input>
                    </el-form-item>
                    <el-form-item label="建设日期">
                        <el-date-picker class="buildDate"  v-model="formLabelAlign.buildDate" type="date">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="客户端直播流">
                        <el-select v-model="formLabelAlign.clientLiveStreaming" placeholder="请选择">
                            <el-option
                                    v-for="item in clientLiveStreaminglist"
                                    :key="item.id"
                                    :label="item.clientLiveStreaming"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="法警报警URL">
                        <el-input v-model="formLabelAlign.bailiffAlarmUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="视频重新编码">
                        <el-select v-model="formLabelAlign.videoRecoding" placeholder="请选择">
                            <el-option
                                    v-for="item in videoRecodinglist"
                                    :key="item.videoRecoding"
                                    :label="item.name"
                                    :value="item.videoRecoding">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item class="red-label" label='法庭名称'>
                        <el-input v-model="formLabelAlign.courtRoomName"></el-input>
                    </el-form-item>
                    <el-form-item label="信号类型">
                        <el-select v-model="formLabelAlign.signalTypeCode" placeholder="请选择">
                            <el-option
                                    v-for="item in signalTypeNamelist"
                                    @click.native="handleSelectsignalType(item.signalTypeName)"
                                    :key="item.signalTypeCode"
                                    :label="item.signalTypeName"
                                    :value="item.signalTypeCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="red-label" label="笔录同步服务器IP">
                        <el-input v-model="formLabelAlign.noteServerIp"></el-input>
                    </el-form-item>
                    <el-form-item label="承建厂商">
                        <el-select v-model="formLabelAlign.manufacturerCode" placeholder="请选择">
                            <el-option
                                    v-for="item in manufacturerlist"
                                    @click.native="handleSelectmanufacturerName(item.manufacturerName)"
                                    :key="item.manufacturerCode"
                                    :label="item.manufacturerName"
                                    :value="item.manufacturerCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备检测">
                        <el-select v-model="formLabelAlign.systemDetectionStatus" placeholder="请选择">
                            <el-option
                                    v-for="item in systemDetectionStatuslist"
                                    :key="item.systemDetectionStatus"
                                    :label="item.name"
                                    :value="item.systemDetectionStatus">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接口标识">
                        <el-input v-model="formLabelAlign.interfaceId"></el-input>
                    </el-form-item>
                    <el-form-item label="允许客户端临时连接">
                        <el-select v-model="formLabelAlign.clientTemporaryConnetion" placeholder="请选择">
                            <el-option
                                    v-for="item in clientTemporaryConnetionlist"
                                    :key="item.clientTemporaryConnetion"
                                    :label="item.name"
                                    :value="item.clientTemporaryConnetion">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="当事人身份核实">
                        <el-select v-model="formLabelAlign.autoverify" placeholder="请选择">
                            <el-option :value="true" label="开启"></el-option>
                            <el-option :value="false" label="关闭"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电子签名方式">
                        <el-select v-model="formLabelAlign.electronicSignature" placeholder="请选择">
                            <el-option
                                    v-for="item in electronicSignatureList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="base-bot">
            <el-form :label-position="labelPosition"  :model="formLabelAlign">
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>
                </el-form-item>
            </el-form>
            <!--<div class="btn">-->
                <!--<el-button class="blu" type="primary" round>状态刷新</el-button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import FoundationTools from '../../../../js/functionAjax'
    import Tool from '../js/tools'
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "info1",
        data() {
            return {
                courtRoomTypeNamelist:[],
                signalTypeNamelist:[],
                signalSourcelist:[],
                systemDetectionStatuslist:[{systemDetectionStatus:true,name:'是'},{systemDetectionStatus:false,name:'否'}],//设备检测
                clientLiveStreaminglist:[{id:0,clientLiveStreaming:'主码流'},{id:1,clientLiveStreaming:'子码流'}],//客户端直播流
                clientTemporaryConnetionlist:[{clientTemporaryConnetion:true,name:'是'},{clientTemporaryConnetion:false,name:'否'}],//允许客户端临时连接
                videoRecodinglist:[{videoRecoding:true,name:'是'},{videoRecoding:false,name:'否'}],//视频重新编码
                electronicSignatureList:[],
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    courtRoomId:'',//法庭id
                    courtRoomName:'',//法庭名字
                    courtCode: '',//法院代码
                    courtName:FoundationTools.getCookie('peicourtName')|| '',//法院名称
                    sortOrder:'',//排序号
                    courtRoomTypeCode:'',//法庭类型代码
                    courtRoomTypeName: '',//法庭类型名称
                    description: '',//描述
                    signalResourceCode:1,//信号来源代码
                    signalResourceName: '华夏',//信号来源名称
                    signalTypeCode:'',//信号类型代码
                    signalTypeName:'',//信号类型名称
                    noteServerIp:'',//笔录同步服务器IP
                    manufacturerCode:'',//厂商代码
                    manufacturerName: "",//厂商名称
                    timeSeriesPowerIp:'',//时序电源ip
                    buildDate:FoundationTools.getFormatDate2(new Date()),//建设时间(日期格式)
                    systemDetectionStatus:true,//设备检测
                    clientLiveStreaming:'',//客户端直播流
                    bailiffAlarmUrl:"",//法警报警url
                    interfaceId:"",//接口标识
                    clientTemporaryConnetion:'',//允许客户端临时连接
                    videoRecoding:'',//视频是否重新编码
                    trialLiveImageUrl:"",//庭审直播图片url
                    trialLiveImageSetUp:'', //庭审直播图片设置
                    autoverify:false,//自动核实身份
                    electronicSignature:1,//签名方式
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
            ...mapState('courtyardallocation',[
                "manufacturerlist",
                "courtRoomId"
            ])
        },
        methods: {
            ...mapActions('courtyardallocation',[
                "getManufacturerInfo",
            ]),
            isNum(value){
                if(value&&!/^[1-9]\d*$/.test(value)){
                    this.$msgw("请输入大于0的整数")
                    this.formLabelAlign.sortOrder='';
                }
            },
            //查询电子签名方式
            ElectronicSignatureWayOption(){
                let _this=this;
                _this.$showToast( '加载中...')
                return _this.$http.post('/client/electronicSignatureWayOption',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.electronicSignatureList=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //查询法庭类型select
            getCourtRoomTypeInfo(){
                let _this=this;
                _this.$showToast( '加载中...')
                return _this.$http.post('/getCourtRoomTypeInfo',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.courtRoomTypeNamelist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getCourtRoomTypeInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectcourtRoomType(courtRoomTypeName){
                this.formLabelAlign.courtRoomTypeName=courtRoomTypeName;
            },
            //查询信号类型select
            getSignalTypeInfo(){
                let _this=this;
                _this.$showToast('加载中...')
                return _this.$http.post('/getSignalTypeInfo',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.signalTypeNamelist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getSignalTypeInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectsignalType(signalTypeName){
                this.formLabelAlign.signalTypeName=signalTypeName;
            },
            //获取城建厂商select，选择
            handleSelectmanufacturerName(manufacturerName){
                this.formLabelAlign.manufacturerName=manufacturerName;
            },
            //查询信号来源select
            getSignalResourceInfo(){
                let _this=this;
                _this.$showToast('加载中...')
                return _this.$http.post('/getSignalResourceInfo',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.signalSourcelist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getSignalResourceInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectsignalResourceName(signalResourceName){
                this.formLabelAlign.signalResourceName=signalResourceName;
            },
            //修改逻辑处理
          async show(row){
                if(this.electronicSignatureList.length===0)this.ElectronicSignatureWayOption();
                if(this.courtRoomTypeNamelist.length===0)this.getCourtRoomTypeInfo();
                if(this.signalTypeNamelist.length===0)this.getSignalTypeInfo();
                if(this.signalSourcelist.length===0)this.getSignalResourceInfo();
                if(this.manufacturerlist.length===0){
                    if(row){
                        this.getManufacturerInfo(this);
                    }else{
                        await this.getManufacturerInfo(this);
                    }
                }
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        courtRoomId:'',//法庭id
                        courtRoomName:'',//法庭名字
                        courtCode: '',//法院代码
                        courtName:FoundationTools.getCookie('peicourtName')|| '',//法院名称
                        sortOrder:'',//排序号
                        courtRoomTypeCode:1,//法庭类型代码,默认取第一条数据
                        courtRoomTypeName:'标准型',//法庭类型名称
                        description: '',//描述
                        signalResourceCode:1,//信号来源代码,默认取华夏
                        signalResourceName:'华夏',//信号来源名称
                        signalTypeCode:1,//信号类型代码,默认取第一条数据
                        signalTypeName:'标清',//信号类型名称
                        noteServerIp:'',//笔录同步服务器IP
                        manufacturerCode:this.manufacturerlist.length>0?2:'',//厂商代码,默认取华夏电通
                        manufacturerName:this.manufacturerlist.length>0?'北京华夏电通科技有限公司':'',//厂商名称
                        timeSeriesPowerIp:'',//时序电源ip
                        buildDate:FoundationTools.getFormatDate2(new Date()),//建设时间(日期格式)
                        clientLiveStreaming:this.clientLiveStreaminglist.length>0?this.clientLiveStreaminglist[0].id:'',//客户端直播流,默认取第一条数据
                        bailiffAlarmUrl:'',//法警报警url
                        interfaceId:'',//接口标识
                        clientTemporaryConnetion:'',//允许客户端临时连接
                        videoRecoding:'',//视频是否重新编码
                        trialLiveImageUrl:"",//庭审直播图片url
                        trialLiveImageSetUp:'',//庭审直播图片设置
                        autoverify:false,//自动核实身份
                        electronicSignature:1,//签名方式
                    }
                }
            },
            //保存信息
            saveinfo1(){
                let {formLabelAlign}=this;
                let _this=this;
                if(formLabelAlign.courtRoomName==''){
                    _this.$msgw('法庭名称不能为空');
                    return false;
                }
                if(formLabelAlign.noteServerIp==''){
                    _this.$msgw('笔录同步服务器IP不能为空');
                    return false;
                }
                if(!Tool.isValidIP(formLabelAlign.noteServerIp)){
                    _this.$msgw('请输入有效笔录同步服务器IP');
                    return false;
                }
               if(formLabelAlign.buildDate){
                   if(typeof formLabelAlign.buildDate==='object'){
                       formLabelAlign.buildDate = FoundationTools.getFormatDate2(formLabelAlign.buildDate)
                       //法庭id (为空就是添加，不为空就是更新)
                   }
               }else{
                   formLabelAlign.buildDate='';
               }
                if(_this.courtRoomId)formLabelAlign.courtRoomId=_this.courtRoomId;
                return _this.$http.syncRequest('/courtRoomConfig/saveAndUpdateCourtRoomInfo',formLabelAlign)
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .info1{
        .base-top{
            .f-s-b();
        }
        /*label*/
        .el-form-item__label{
            .f18();
            width:1.8rem!important;
        }
        .el-form-item__content{
            margin-left:1.8rem!important;
        }
        /*input框*/
        .el-input{
            width:3.7rem;
            .el-input__inner {
                height: .4rem;
                line-height: .4rem;
                padding: 0 .15rem;
                .f18();
            }
        }
        /*建设日期*/
        .buildDate{
            .el-input__inner{
                padding:0 .2rem 0 .4rem!important;
            }
        }
        div.btn{
            .fr();
            width:100%;
            .el-button.is-round {
                padding:.1rem .2rem;
            }
            .blu{
                margin:.2rem 0;
                background:#edf5ff;
                border:1px solid #BEDEFF;
                span{
                    color:#409EFF ;
                    .f16();
                }
            }
        }
    }
</style>