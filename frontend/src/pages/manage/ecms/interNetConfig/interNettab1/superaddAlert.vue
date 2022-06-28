<template>
    <div class="superaddAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="名称" required>
                <el-input v-model.trim="formLabelAlign.etgsName"></el-input>
            </el-form-item>
            <el-form-item label="序列号" required>
                <el-input v-model.trim="formLabelAlign.etgsSerialNumber"></el-input>
            </el-form-item>
            <el-form-item label="网关分组">
                <el-select v-model="formLabelAlign.etgsGroupId" clearable>
                    <el-option
                            v-for="item in groupList"
                            :key="item.etgsGroupId"
                            :label="item.etgsGroupName"
                            :value="item.etgsGroupId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="方案" required>
                <el-select class="way" v-model="formLabelAlign.etgsDeploymentPlan">
                    <el-option
                            v-for="item in selectList"
                            :key="item.name"
                            :label="item.desc"
                            :value="item.name">
                    </el-option>
                </el-select>
                <el-button type="primary" :disabled="formLabelAlign.etgsDeploymentPlan=='DeploymentPlan3'?false:true" @click="mainConfig">庭审主机配置</el-button>
            </el-form-item>
            <el-form-item label="SDK数量">
                <el-input v-model.trim="formLabelAlign.sdkNum"></el-input>
            </el-form-item>
            <el-form-item label="SDK可用数量">
                <el-input v-model.trim="formLabelAlign.sdkUsableNum"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" required>
                <el-input v-model.trim="formLabelAlign.etgsIp"></el-input>
            </el-form-item>
            <el-form-item label="音视频网关版本" required>
                <!--<el-input v-model.trim="formLabelAlign.etgsVersion" disabled></el-input>-->
                <el-select v-model="formLabelAlign.etgsVersion" disabled>
                    <el-option
                            v-for="item in etgsVersionList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="软中控命令">
                <el-input v-model.trim="formLabelAlign.softCentralCommand"></el-input>
            </el-form-item>
            <el-form-item label="云账号" :required="formLabelAlign.etgsDeploymentPlan=='DeploymentPlan2'?false:true">
                <el-select v-model="formLabelAlign.appId">
                    <el-option
                            v-for="item in appIdList"
                            :key="item.rtcId"
                            :label="item.appId"
                            :value="item.appId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="formLabelAlign.etgsSchemeDec" placeholder="......"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {dec} from "./dec.js"
    export default {
        name: "superaddAlert",
        props:{
            selectList:Array,
            default:[]
        },
        data() {
            return {
                labelPosition: 'left',
                groupList:[],
                appIdList:[],
                etgsVersionList:[{id:'1',name:'ETGS一期'},{id:'2',name:'ETGS二期'}],
                formLabelAlign: {
                    etgsId:'',
                    etgsSerialNumber:'',
                    etgsName:'',
                    etgsDeploymentPlan:'',
                    sdkNum:'',
                    sdkUsableNum:'',
                    etgsIp:'',
                    etgsVersion:'1',
                    softCentralCommand:'',
                    etgsSchemeDec:'',
                    rtcId:"",
                    appId:"",
                    etgsGroupId:''
                },
            }
        },
        watch:{
          'formLabelAlign.etgsDeploymentPlan':function(v){
              //DeploymentPlan1
              if(v){
                  this.formLabelAlign.softCentralCommand=dec[v][0]
                  this.formLabelAlign.etgsVersion=dec[v][1]
                  this.formLabelAlign.etgsSchemeDec=dec[v][2]
              }
          },
            'formLabelAlign.appId':function(v){
                if(v){
                    for(let i=0;i<this.appIdList.length;i++){
                        if(v==this.appIdList[i].appId){
                           this.formLabelAlign.rtcId=this.appIdList[i].rtcId
                            break;
                        }
                    }
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                this.getETGSGroups();
                this.getRTCConfigs();
                if(row){
                    for(let i in row){
                        this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={
                        etgsId:'',
                        etgsSerialNumber:'',
                        etgsName:'',
                        etgsDeploymentPlan:'',
                        sdkNum:'',
                        sdkUsableNum:'',
                        etgsIp:'',
                        etgsVersion:'',
                        softCentralCommand:'',
                        etgsSchemeDec:'',
                        rtcId:"",
                        appId:"",
                        etgsGroupId:''
                    }
                }
            },
            async getETGSGroups(){
                let res=await this.$http.post('/etgsGroupConfig/getETGSGroups',{pageIndex:-1,pageSize:-1},true,'加载中...')
                if(res)this.groupList=res.data;
            },
            async getRTCConfigs(){
                let res=await this.$http.post('/rtcConfig/getRTCConfigs',{pageIndex:-1,pageSize:-1},true)
                if(res)this.appIdList=res.data;
            },
            mainConfig(){
                this.$emit("mainConfig",this.formLabelAlign.etgsId)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .superaddAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.2rem;
        .el-form{
            .f-s-b();
            flex-wrap: wrap;
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
            .way .el-input{
                width:2.8rem;
            }
            .el-button {
                line-height: .3rem;
                padding:.01rem .04rem;
            }
            .el-textarea{
                width:10rem;
            }
        }
    }
</style>
<style lang="less">

</style>