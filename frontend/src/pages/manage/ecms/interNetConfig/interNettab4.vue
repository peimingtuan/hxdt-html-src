<template>
    <div class="interNettab4">
        <p class="title">
            与ETMS交互设置:(用于设置在有网闸的情况下cms和etms的交互)
        </p>
        <div class="con">
            <el-form :label-position="labelPosition" :model="form">
                <el-form-item label="ETMS本地IP地址" required>
                    <el-input v-model.trim="form.localIp"></el-input>
                </el-form-item>
                <el-form-item label="ETMS映射IP地址" required>
                    <el-input v-model.trim="form.mappingIp"></el-input>
                </el-form-item>
                <el-form-item label="http端口" required>
                    <el-input v-model.trim="form.httpPort"></el-input>
                </el-form-item>
                <el-form-item label="websocket端口" required>
                    <el-input v-model.trim="form.websocketPort"></el-input>
                </el-form-item>
                <el-form-item label="是否加解密">
                    <el-switch v-model="form.encrypt">
                    </el-switch>
                </el-form-item>
                <el-form-item label="协议传输AES密钥">
                    <el-input v-model.trim="form.protocolTransAesKey"></el-input>
                </el-form-item>
                <el-form-item label="获取token地址" required>
                    <el-select
                            v-model.trim="form.tokenUrl"
                            filterable
                            allow-create
                            default-first-option>
                        <el-option v-for="item in tokenUrlList"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.name">
                        </el-option>
                    </el-select>&nbsp;<span>无光闸选择etms,有光闸选择fgapdtr</span>
                </el-form-item>
                <el-form-item label="通⽤协议地址" required>
                    <el-select
                            v-model.trim="form.commonProtocolUrl"
                            filterable
                            allow-create
                            default-first-option>
                        <el-option v-for="item in commonProtocolUrlList"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.name">
                        </el-option>
                    </el-select>&nbsp;<span>无光闸选择etms,有光闸选择fgapdtr</span>
                </el-form-item>
                <el-form-item label="⽂件上传地址" required>
                    <el-select
                            v-model.trim="form.fileUploadUrl"
                            filterable
                            allow-create
                            default-first-option>
                        <el-option v-for="item in fileUploadUrlList"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.name">
                        </el-option>
                    </el-select>&nbsp;<span>无光闸选择etms,有光闸选择fgapdtr</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="saveBox">
            <el-button type="primary" @click="saveETMSServer">保存设置</el-button>
        </div>
    </div>
</template>

<script>
    import Tools from "../js/tools"
    export default {
        name: "interNettab4",
        components: {

        },
        data() {
            return {
                labelPosition: 'left',
                tokenUrlList:[
                    {id:1,name:'/etms/getToken'},
                    {id:2,name:'/fgapdtr/getToken'}
                ],
                commonProtocolUrlList:[
                    {id:1,name:'/etms/v1/httpCommonProtocol'},
                    {id:2,name:'/fgapdtr/v1/httpCommonProtocol'}
                ],
                fileUploadUrlList:[
                    {id:1,name:'/etms/v1/httpCommonSubmitFile'},
                    {id:2,name:'/fgapdtr/v1/httpCommonSubmitFile'}
                ],
                form:{
                    etmsServerId:"",
                    localIp:"",
                    mappingIp:"",
                    httpPort:'8088',
                    websocketPort:"19888",
                    encrypt:false,
                    protocolTransAesKey:'',
                    tokenUrl:'',
                    commonProtocolUrl:'',
                    fileUploadUrl:''
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

        },
        methods: {
            //获取
            async getETMSServer(){
                this.$showLoading('rgba')
                let res=await this.$http.post('/etmsServerConfig/getETMSServer',{},true)
                this.$hideLoading('rgba')
                if(res){
                    if(res.data){
                        for(let i in res.data){
                            this.form[i]=res.data[i];
                        }
                    }
                }
            },
            //保存
            async saveETMSServer(){
                let {form}=this
                if(form.localIp&&!Tools.isValidIP(form.localIp)){
                    this.$msgw("请输入ETMS本地的合法IP")
                    return
                }
                if(form.mappingIp&&!Tools.isValidIP(form.mappingIp)){
                    this.$msgw("请输入ETMS映射的合法IP")
                    return
                }
                if(form.httpPort&&!Tools.isPort(form.httpPort)){
                    this.$msgw("请输入http的合法端口")
                    return
                }
                if(form.websocketPort&&!Tools.isPort(form.websocketPort)){
                    this.$msgw("请输入websocket的合法端口")
                    return
                }
                if(form.encrypt){
                    if(!form.protocolTransAesKey){
                        this.$msgw("请输入协议传输AES密钥")
                        return
                    }
                }
                if(form.protocolTransAesKey){
                    if(form.protocolTransAesKey.length!==16){
                        this.$msgw("协议传输AES密钥的长度必须为16位")
                        return
                    }
                }
                if(!form.tokenUrl){
                    this.$msgw("请输入token地址")
                    return
                }
                if(!form.commonProtocolUrl){
                    this.$msgw("请输入通⽤协议地址")
                    return
                }
                if(!form.fileUploadUrl){
                    this.$msgw("请输入⽂件上传地址")
                    return
                }
                let res=await this.$http.post('/etmsServerConfig/saveETMSServer',{etmsServer:form},true,'保存中...')
                if(res)this.$msgs("保存成功")
            }
        }
    }
</script>

<style lang="less" scoped>
    .interNettab4{
        .title{
            margin:.2rem;
        }
        .con{
            margin-left:1rem;
        }
        .saveBox{
            width:100vw;
            position:fixed;
            bottom:.2rem;
            left:0;
            text-align: center;
        }
    }
</style>
<style lang="less">
    @import url('../css/common.less');
    .interNettab4{
        .el-form-item__label{
            .f18();
            width:1.8rem!important;
        }
        .el-form-item__content{
            margin-left:1.8rem!important;
        }
        .el-input{
            width:4rem;
            .el-input__inner {
                height: .4rem;
                line-height: .4rem;
                padding: 0 .15rem;
                .f18();
            }
        }
    }
</style>