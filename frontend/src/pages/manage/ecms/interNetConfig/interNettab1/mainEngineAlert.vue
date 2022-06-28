<template>
    <div class="mainEngineAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="庭审主机IP" required>
                <el-input v-model.trim="formLabelAlign.trialDeviceIp"></el-input>
            </el-form-item>
            <el-form-item label="通道号" required>
                <el-input v-model.trim="formLabelAlign.channelNumber"></el-input>
            </el-form-item>
            <el-form-item label="编解码类型" required>
                <el-select v-model="formLabelAlign.signalSourceType">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流地址" :required="formLabelAlign.signalSourceType==1?true:false">
                <el-input v-model.trim="formLabelAlign.flowAddress"></el-input>
            </el-form-item>
            <el-form-item label="字幕位置">
                <el-select v-model="formLabelAlign.subtitlePosition">
                    <el-option
                            v-for="item in positionList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字幕内容">
                <el-select v-model="formLabelAlign.subtitleType">
                    <el-option
                            v-for="item in subtitleTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "mainEngineAlert",
        data() {
            return {
                selectList:[{id:1,name:'编码'},{id:2,name:'解码'}],
                positionList:[{id:1,name:'左上'},{id:2,name:'左下'},{id:3,name:'右上'},{id:4,name:'右下'}],
                subtitleTypeList:[{id:1,name:'诉讼地位'},{id:2,name:'当事人名称'},{id:255,name:'诉讼地位+当事人名称'}],
                labelPosition: 'left',
                formLabelAlign: {
                    trialDeviceIp:'',
                    channelNumber: '',
                    signalSourceType:'',
                    flowAddress:'',
                    subtitlePosition:'',
                    subtitleType:''
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .mainEngineAlert {
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
            .el-textarea{
                width:6rem;
            }
        }
    }
</style>
<style lang="less">

</style>