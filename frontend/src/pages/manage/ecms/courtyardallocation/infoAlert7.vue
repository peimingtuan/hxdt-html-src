<template>
    <div class="infoAlert7">
        <el-form :label-position="labelPosition"
                 :model="courtInternetTrialDevice"
                 ref="elForm"
        >
            <el-form-item label="庭审主机IP" required>
                <el-input v-model.trim="courtInternetTrialDevice.trialDeviceIp"></el-input>
            </el-form-item>
            <el-form-item label="通道号" required>
                <el-input v-model.trim="courtInternetTrialDevice.channelNumber"></el-input>
            </el-form-item>
            <el-form-item label="编码类型" required>
                <el-select v-model="courtInternetTrialDevice.signalSourceType">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流地址" :required="courtInternetTrialDevice.signalSourceType===2?false:true">
                <el-input v-model.trim="courtInternetTrialDevice.flowAddress"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "infoAlert7",
        data() {
            return {
                labelPosition: 'left',
                selectList:[{id:1,name:'编码'},{id:2,name:'解码'}],
                courtInternetTrialDevice: {
                    trialDeviceIp:'',
                    channelNumber:'',
                    signalSourceType:'',
                    flowAddress:'',
                    internetTrialDeviceId:''
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
            show(row){
                if(row){
                    for(let i in row){
                        this.courtInternetTrialDevice[i]=row[i];
                    }
                }else{
                    this.courtInternetTrialDevice={
                        trialDeviceIp:'',
                        channelNumber:'',
                        signalSourceType:'',
                        flowAddress:'',
                        internetTrialDeviceId:''
                    }
                }
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlert7{
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.2rem;
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
</style>