<template>
    <div class="addotherAlert3">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="下载IP">
                                <el-input v-model.trim="formLabelAlign.downloadIp"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="下载端口">
                                <el-input v-model.trim="formLabelAlign.downloadPort"></el-input>
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
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"
    import FoundationTools from '../../../../js/functionAjax'
    export default {
        name: "addotherAlert3",
        props:{
            alertshow:Boolean,
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加下载地址',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    downloadIp: '',
                    downloadPort: '',
                    courtName:FoundationTools.getCookie('peicourtName')//当前法院名称
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
            //打开弹框,修改逻辑处理
            show(row){
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={
                        downloadIp:'',
                        downloadPort:'',
                        courtName:FoundationTools.getCookie('peicourtName')//当前法院名称
                    }
                }
            },
            //保存
            saveCourtDossierConfig(){
                let that=this,
                    {formLabelAlign}=that,
                    url='/courtDossierConfig/saveCourtDossierConfig';
                that.$showToast('正在保存...')
                return that.$http.post(url,formLabelAlign).then(data =>{
                    that.$hideToast()
                    if(data.code===200){
                        that.$msgs('保存成功！');
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideToast()
                    console.log(err,url)
                    that.$msge('服务器异常，请稍后重试');
                })
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
            //IP验证
            isValidIP(ip) {
                let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
                return reg.test(ip);
            },
            //端口验证
            isPort(port){
                let reg=/^\d+(-\d+)?(,\d+(-\d+)?)*$/
                if(reg.test(port)&&port<65536)return true
                else return false
                //return reg.test(port);
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addotherAlert3{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-4rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:1rem .2rem;
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

            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>