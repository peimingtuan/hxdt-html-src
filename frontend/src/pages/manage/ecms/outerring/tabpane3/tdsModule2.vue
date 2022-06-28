<template>
    <div class="tdsModule2">
        <div class="moduleItem">
            <div class="moduleContent">
                <el-form
                        ref="form"
                        :label-position="labelPosition"
                        label-width="252px"
                        :model="formLabelAlign"
                >
                    <el-form-item label="呼叫次数">
                        <el-input v-model.trim="formLabelAlign.speechCount"></el-input>
                    </el-form-item>
                    <el-form-item label="音调范围">
                        <el-input v-model.trim="formLabelAlign.voicePicth"></el-input>
                    </el-form-item>
                    <el-form-item label="文本滚动速度">
                        <el-input v-model.trim="formLabelAlign.textScrollSpeed"></el-input>
                    </el-form-item>
                    <el-form-item label="音速范围">
                        <el-input v-model.trim="formLabelAlign.voiceSpeed"></el-input>
                    </el-form-item>
                    <el-form-item label="音量范围">
                        <el-input v-model.trim="formLabelAlign.voiceVolume"></el-input>
                    </el-form-item>
                    <el-form-item label="排期时间排序">
                        <el-select v-model="formLabelAlign.voiceGender" placeholder="请选择">
                            <el-option
                                    v-for="innerItem in selectData"
                                    :key="innerItem.id"
                                    :label="innerItem.name"
                                    :value="innerItem.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="呼叫语音内容">
                        <el-input type="textarea" v-model.trim="formLabelAlign.voiceContent"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="saveInfo">
                <el-button type="primary" @click="saveBtn">保存设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tdsModule2",
        data() {
            return {
                labelPosition: "left",
                selectData: [
                    {
                        id:'1',
                        name: '男'
                    },
                    {
                        id: '2',
                        name: '女'
                    }
                ],
                formLabelAlign: {
                    speechCount: "",//呼叫次数
                    voicePicth: "",//音调范围
                    textScrollSpeed: "",//文本滚动速度
                    voiceSpeed: "",//音速范围
                    voiceVolume: "",//音量范围
                    voiceGender: "",//语音性别
                    voiceContent: "",//呼叫语音内容
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            getTDSSettings(){
                let _this = this;
                _this.$showLoading("rgba");
                _this.$http
                    .post("/tdsconfig/getTDSSettings", {})
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {
                            for(let i in data.data){
                                _this.formLabelAlign[i] = data.data[i];
                            }
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading("rgba");
                        console.log(err,"/tdsconfig/getTDSSettings")
                    });
            },
            saveBtn() {
                let _this = this;
                let { formLabelAlign } = this;
                _this.$showToast("正在保存...")
                _this.$http
                    .post("/tdsconfig/saveTDSSettings",formLabelAlign)
                    .then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            _this.$msgs("保存成功")
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideToast()
                        console.log(err,"/tdsconfig/saveTDSSettings")
                    });
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .tdsModule2 {
        .moduleItem {
            padding-top:.1rem;
            border-radius: 5px;
            background-color: rgb(241, 245, 249);
            .moduleTitle {
                padding: 10px;
            }
            .moduleContent {
                overflow: auto;
                /*height: calc(50vh - 100px);*/
                padding: 0 20px;
            }
            .saveInfo{
                box-shadow: 1px -2px 2px #e8e8e8;
                text-align: center;
                padding:5px 0;
            }
        }
    }
</style>
<style lang="less">
    .tdsModule2{
        .el-input{
            width:5rem;
        }
        .el-button{
            padding:0 10px;
            height:40px;
        }
    }
</style>