<template>
    <div class="mediainfo1">
        <div class="content1">
            <div class="content1-div1">
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item class="red-label" label="服务器名称">
                        <el-input v-model.trim="formLabelAlign.smsInfoName"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="服务器模式">-->
                    <!--<el-input v-model="formLabelAlign.name"></el-input>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
            <div class="content1-div2">
                网络配置
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <div class="flex">
                        <el-form-item class="red-label" label="内网IP地址">
                            <el-input v-model.trim="formLabelAlign.intranet1Ip"></el-input>
                        </el-form-item>
                        <el-form-item label="内网网卡">
                            <el-input v-model.trim="formLabelAlign.intranet1Name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="flex">
                        <el-form-item label="外网IP地址">
                            <el-input v-model.trim="formLabelAlign.extranet1Ip"></el-input>
                        </el-form-item>
                        <el-form-item label="外网网卡">
                            <el-input v-model="formLabelAlign.extranet1Name"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="网卡描述" prop="desc">
                        <el-input type="textarea" v-model="formLabelAlign.desc" placeholder="......"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="content1-div1">
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="序列号">
                        <el-input v-model="formLabelAlign.serialNumber"></el-input>
                        <el-button @click="getVersion(formLabelAlign.intranet1Ip)">获取</el-button>
                    </el-form-item>
                    <el-form-item label="版本号">
                        <el-input v-model="formLabelAlign.version"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                        <el-input type="textarea" v-model="formLabelAlign.desc" placeholder="......"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mediainfo1",
        data() {
            return {
                url:'/smsInfoConfig/addSMSInfoConfig',//请求接口路径处理,保存
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {//表单信息
                    smsInfoId:'',//流媒体id
                    smsInfoName:'',//流媒体名称
                    intranet1Ip:'',//列表展示内网Ip
                    intranet1Name:'',//内网网卡名称
                    extranet1Ip:'',//外网ip
                    extranet1Name:'',//外网网卡名称
                    serialNumber:'',//序列号
                    version:'',//版本号
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
            //修改逻辑处理
            show(row){
                if(row){
                    for(let i in row){//修改逻辑处理
                        if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={//表单信息
                            smsInfoId:'',//流媒体id
                            smsInfoName:'',//流媒体名称
                            intranet1Ip:'',//列表展示内网Ip
                            intranet1Name:'',//内网网卡名称
                            extranet1Ip:'',//外网ip
                            extranet1Name:'',//外网网卡名称
                            serialNumber:'',//序列号
                            version:'',//版本号
                    }
                }
            },
            //获取版本号和序列号
            getVersion(intranet1Ip){
                const that=this;
                if(!intranet1Ip){
                    that.$msgw('请先输入内网ip地址')
                    return
                }
                that.$showToast('加载中...')
                that.$http.post('/smsInfoConfig/getSMSVersionAndSN',{
                    smsIp:intranet1Ip
                }).then(data=>{
                    that.$hideToast()
                    if(data.code===200){
                        that.formLabelAlign.serialNumber=data.data.serialNumber;
                        that.formLabelAlign.version=data.data.version;
                    }else{
                        that.$msgw(data.message)
                    }
                }).catch(err=>{
                   that.$hideToast()
                    that.$msge('服务器异常，请稍后重试')
                    console.log(err,'/smsInfoConfig/getSMSVersionAndSN')
                })
            },
            //保存信息
            saveinfo1(smsInfoId){
                let {url,formLabelAlign}=this;
                if(smsInfoId){//修改逻辑接口
                    url='/smsInfoConfig/updateSMSInfoConfig';
                    formLabelAlign.smsInfoId=smsInfoId;
                }
                let _this=this;
                return _this.$http.syncRequest(url,formLabelAlign)
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .mediainfo1{
        .content1{
            width:100%;
            background: #ECEFF0;
            min-height:4rem;
            margin-top:.1rem;
            padding:0 .2rem;
            &-div1{
                padding-top:.1rem;
            }
            .el-form{
                .fb();
                flex-wrap: wrap;
            }
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
                background:#409eff;
                span {
                    .f18();
                    color: #fff;
                }
            }
            &-div2{
                .f20();
                .el-form{
                    .flex{
                        width:100%;
                        .fb();
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
                    background: #E3E7E8;
                    .b(1px,#C6C6C6);
                    margin:.1rem 0;
                    padding:.1rem .3rem;
                    .el-form-item__label{
                        width:1.2rem!important;
                    }
                    .el-form-item__content{
                        margin-left:1.2rem!important;
                    }
                }
            }
        }
    }
</style>