<template>
    <div class="jos-config">
        <div class="moduleItem">
            <!-- 模块内容始 -->
            <div class="moduleContent">
                <el-form
                        ref="form"
                        :label-position="labelPosition"
                        label-width="300px"
                        :model="formLabelAlign"
                >
                    <el-form-item label="登录模式">
                        <el-select v-model="formLabelAlign.loginMode">
                            <el-option
                                    v-for="item in loginModeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="系统展示模式">
                        <el-select v-model="formLabelAlign.systemDisplayMode">
                            <el-option
                                    v-for="item in systemDisplayModeList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="记住密码是否开启">
                        <el-select v-model="formLabelAlign.enableRemeberPwd">
                            <el-option
                                    v-for="item in selectList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="更多功能是否显示">
                        <el-select v-model="formLabelAlign.moreFunctionShow">
                            <el-option
                                    v-for="item in selectList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="saveInfo">
                <el-button type="primary" @click="saveBtn()">保存设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "josConfig",
        data() {
            return {
                loginModeList:[{id:1,name:'普通登录'},{id:2,name:'自动登录'}],
                systemDisplayModeList:[{id:1,name:'庭审主界面'},{id:2,name:'书记员画面'}],
                loginTypeList:[{id:0,name:'账号密码'},{id:1,name:'人脸识别'},{id:2,name:'指纹识别'}],
                labelPosition: "left", //表单的对齐方式
                formLabelAlign: {
                    loginMode:1,
                    systemDisplayMode:1,
                    enableRemeberPwd:false,
                    moreFunctionShow:false
                },
            }
        },
        computed:{
            selectList(){
                return this.$store.state.selectlist
            }
        },
        created() {
        },
        mounted() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        methods: {
            getBaseConfig(){
                let _this = this;
                _this.$showLoading("rgba");
                _this.$http
                    .post("/getLoginSettingConfig", {})
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {
                            for(let i in data.data){
                                _this.formLabelAlign[i]=data.data[i]
                            }
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
            },
            // 保存
            saveBtn() {
                let _this = this;
                let { formLabelAlign } = this;
                _this.$showToast("正在保存...")
                _this.$http
                    .post("/saveJosConfig", formLabelAlign)
                    .then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            _this.$msgs("保存成功");
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideToast()
                        _this.$msge("服务器异常，请稍后重试");
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    .jos-config {
        .moduleItem {
            margin: 0 10px 10px 0;
            width: calc(41.5vw - 10px);
            height: calc(50vh - 10px);
            border-radius: 5px;
            background-color: rgb(241, 245, 249);
            .moduleContent {
                overflow: auto;
                height: calc(50vh - 100px);
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
    .jos-config{
        .moduleItem {
            // input框的样式
            .el-form-item__label {
                font-size: 0.18rem !important;
            }
            .el-input {
                width: 240px;
            }
            .el-form-item__label {
                padding: 0;
            }
            .el-button {
                padding: 0 10px;
                height: 40px;
            }
        }
    }
</style>