<template>
    <div class="addoutAlert2">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <div>
                            <el-form :label-position="labelPosition" :model="formLabelAlign.casClient">
                                <el-form-item label="显示屏名称">
                                    <el-input v-model="formLabelAlign.casClient.casName"></el-input>
                                </el-form-item>
                                <el-form-item label="显示屏IP地址">
                                    <el-input v-model="formLabelAlign.casClient.casIp"></el-input>
                                </el-form-item>
                                <el-form-item label="显示屏端口号">
                                    <el-input v-model="formLabelAlign.casClient.casPort"></el-input>
                                </el-form-item>
                                <el-form-item label="对应法庭" class="overtext">
                                    <div v-for="(item,index) in formLabelAlign.casCourtRoomRelations" :key="item.courtRoomId">
                                        <el-checkbox v-model="item.casUsed" @change="changecheck(item)">{{item.courtRoomName}}</el-checkbox>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div>
                            <el-form :label-position="labelPosition" :model="formLabelAlign.casClient">
                                <el-form-item label="语音呼叫">
                                    <el-select v-model="formLabelAlign.casClient.enableSpeech" placeholder="请选择">
                                        <el-option
                                                v-for="item in speechlist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="red-label" label="显示模板">
                                    <el-select v-model="formLabelAlign.casClientTemplet.templetName" placeholder="请选择">
                                        <el-option
                                                v-for="item in showtemplatelist"
                                                @click.native="handleSelectcasTempletType(item.casTempletType)"
                                                :key="item.templetId"
                                                :label="item.templetName"
                                                :value="item.templetName">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="软件版本">
                                    <el-input v-model="formLabelAlign.casClient.casVersion"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="界面标题">
                                    <el-input v-model.trim="formLabelAlign.casClient.title"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="模板预览">-->
                                <!--<div>123</div>-->
                                <!--</el-form-item>-->
                                <el-form-item label="翻页时间">
                                    <el-input v-model="formLabelAlign.casClient.turnTime"></el-input>秒
                                </el-form-item>
                                <el-form-item label="定时消息时间">
                                    <el-input v-model="formLabelAlign.casClient.tmTime"></el-input>秒
                                </el-form-item>
                                <el-form-item label="报警记录时间">
                                    <el-input v-model="formLabelAlign.casClient.alertRecordIntervalTime"></el-input>秒
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../../component/AlertleftTile"
    export default {
        name: "addoutAlert2",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加法警系统配置',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                speechlist:[{id:true,name:'开启'},{id:false,name:'关闭'}],
                showtemplatelist:[],
                formLabelAlign: {
                    "casClient":{
                        "casId": "",
                        "casName": "",
                        "casIp": "",
                        "casPort":'18680',
                        "enableSpeech":true,
                        "casVersion": "",//软件版本
                        "casState":'',
                        "turnTime":'7',
                        "title": "",
                        "tmTime":'20',
                        alertRecordIntervalTime:'',
                        "heartbeatTime":'',
                        "individualOrNo":'',
                        "alertRecordIntervalTime":'',
                        "courtCode":''
                    },
                    "casClientTemplet":{
                        templetName:'',//显示模板名称
                        "casTempletType": ""
                    },
                    "casCourtRoomRelations":[{
                        "screenId":"D49C636B_D50C_75F0_DB36_3DD1C1301D01",
                        "relationId":"",
                        "courtroomId":"D49C636B_D50C_75F0_DB36_3DD1C1301D01",
                        "courtroomName":"第一法庭"
                    },{
                        "screenId":"D49C636B_D50C_75F0_DB36_3DD1C1301D01",
                        "relationId":"",
                        "courtroomId":"D49C736B_D50C_75F0_DB36_3DD1C1301D01",
                        "courtroomName":"第二法庭"
                    }]
                },
            }
        },
        beforeCreate() {

        },
        created() {
            this.getCASClientTemplets()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取模板列表
            getCASClientTemplets(){
                let that=this;
                that.$http.post('/casconfig/getCASClientTemplets', {

                }).then(data =>{
                    if(data.code===200){
                        that.showtemplatelist=data.data;
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/casconfig/getCASClientTemplets')
                })
            },
            //选择
            handleSelectcasTempletType(casTempletType){
                this.formLabelAlign.casClientTemplet.casTempletType=casTempletType;
            },
            //查询公告系统配置信息
            getCASClient(casId){
                let that=this;
                that.$http.post('/casconfig/getCASClient', {
                    casId:casId?casId:'',
                }).then(data =>{
                    if(data.code===200){
                        that.formLabelAlign=data.data;
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/casconfig/getCASClient')
                })
            },
            //添加、修改保存
            saveCASClient(){
                let that=this,
                    {formLabelAlign}=that,
                    url='/casconfig/saveCASClient';//添加
                if(formLabelAlign.casClient.casId)url='/casconfig/updateCASClient';//修改
                that.$showToast('正在保存...')
                return that.$http.post(url,formLabelAlign).then(data =>{
                    that.$hideToast()
                    if(data.code===200){
                        that.$msgs('保存成功！');
                    }else{
                        that.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    that.$hideToast()
                    console.log(err,url)
                })
            },
            //对应法庭选择
            changecheck(item){
                //暂时没用到
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
    @import url('../../css/common.less');
    .addoutAlert2{
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-7rem;
            border-radius:2px;
            @import url('../../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                .overtext{
                    height:2rem;
                    overflow: auto;
                }
                .f-s-b();
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
                    position: relative;
                    top: -.02rem;
                    width: 1.5rem;
                    line-height: .36rem;
                    padding: 0;
                    background:#409eff;
                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
            /*底部*/
            @import url('../../css/alertbtn.less');
        }
    }
</style>