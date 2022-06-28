<template>
    <div class="addAuditAlert1">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="ismain">
                <div class="main">
                    <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="ismain=false" src="../../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="旁听辅助名称">
                                <el-input v-model.trim="formLabelAlign.chasName"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="旁听辅助IP">
                                <el-input v-model.trim="formLabelAlign.chasIp"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="Mac地址">
                                <el-input v-model.trim="formLabelAlign.mac"></el-input>
                                <el-button @click="getMac(formLabelAlign.chasIp)">获取</el-button>
                            </el-form-item>
                            <el-form-item class="red-label" label="法庭名称">
                                <el-select v-model="formLabelAlign.courtRoomName" @focus="getCourtRoomPageInfo">
                                    <el-option
                                            v-for="item in courtlist"
                                            @click.native="handleSelectcourtRoomName(item.courtRoomId)"
                                            :key="item.courtRoomId"
                                            :label="item.courtRoomName"
                                            :value="item.courtRoomName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item label="旁听辅助序列号">-->
                                <!--<el-input v-model="formLabelAlign.chasUUID"></el-input>-->
                                <!--<el-button>获取</el-button>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="ismain=false">
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
    import Tool from "../../js/tools"
    export default {
        name: "addAuditAlert1",
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加旁听辅助客户端',
                text2:'请填写详细信息',
                courtlist:[{courtRoomId:1,courtRoomName:'第一法庭'}],//法庭select
                ismain:false,//弹框
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    "sortOrder":'',
                    "deleteFlag":'',
                    "validityFlag":'',
                    "chasId": "",//旁听客户端id
                    "chasUUID": "",//法庭辅助序列号
                    "chasName": "",//旁听辅助客户端
                    "chasIp": "",
                    mac:'',//mac地址
                    "courtRoomName":'',//法庭名称
                    "courtRoomId": ""
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
            //mac地址
            getMac(chasIp){
                const that=this;
                if(!chasIp){
                    that.$msgw('请先输入旁听辅助IP');
                    return
                }
                if(!Tool.isValidIP(chasIp)){
                    that.$msgw('请输入有效IP');
                    return
                }
                that.$showToast("加载中...")
                that.$http.post('/chasInfoConfig/getChasMacAddress', {
                    chasIp,
                }).then(data =>{
                    that.$hideToast()
                    if(data.code===200){
                        that.formLabelAlign.mac=data.data.mac;
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideToast()
                    console.log(err,'/chasInfoConfig/getChasMacAddress')
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //法庭列表
            getCourtRoomPageInfo(){
                let that=this;
                that.$http.post('/baseInfo/getCourtRooms', {

                }).then(data =>{
                    if(data.code===200){
                        that.courtlist=data.data;
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/baseInfo/getCourtRooms')
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectcourtRoomName(courtRoomId){
                this.formLabelAlign.courtRoomId=courtRoomId;
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.ismain=true;
                if(row){
                    for(let i in row){//修改逻辑处理
                        if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={//表单信息
                        "sortOrder":'',
                        "deleteFlag":'',
                        "validityFlag":'',
                        "chasId": "",//旁听客户端id
                        "chasUUID": "",//法庭辅助序列号
                        "chasName": "",//旁听辅助客户端
                        "chasIp": "",
                        mac:'',//mac地址
                        "courtRoomName":'',//法庭名称
                        "courtRoomId": ""
                    }
                }
            },
            qure() {
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.chasName){
                    _this.$msgw('请输旁听辅助名称');
                    return
                }
                if(!Tool.isValidIP(formLabelAlign.chasIp)){
                    _this.$msgw('请输入有效IP');
                    return
                }
                if(!formLabelAlign.mac){
                    _this.$msgw('请输入MAC地址');
                    return
                }
                if(!formLabelAlign.courtRoomName){
                    _this.$msgw('请选择法庭名称');
                    return
                }
                _this.$showToast("正在保存...")
                _this.$http.post('/chasInfoConfig/saveOrUpdateChasInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功');
                        _this.$parent.getChasInfo();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/chasInfoConfig/saveOrUpdateChasInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .addAuditAlert1{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-5rem;
            border-radius:2px;
            @import url('../../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.6rem!important;
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