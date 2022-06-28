<template>
    <div class="dossier-manage">
        <div class="moduleItem" v-for="(item,index) in basicData" :key="index">
            <!-- 模块内容始 -->
            <div class="moduleContent">
                <el-form
                        ref="form"
                        :label-position="labelPosition"
                        label-width="300px"
                        :model="formLabelAlign"
                >
                    <el-form-item v-for="(inner,index) in item.children" :key="index" :label="inner.label">
                        <template v-if="inner.type == 'input'">
                            <el-input
                                    :type="inner.pwd"
                                    :show-password="inner.showPwd"
                                    v-model="formLabelAlign[inner.variable]"
                                    :max="inner.max"
                                    :min="inner.min"
                                    :placeholder="inner.placeHolder"
                            ></el-input>
                            <span class="unit">{{inner.unit}}</span>
                        </template>
                        <template v-else>
                            <el-select v-model="formLabelAlign[inner.variable]" :popper-append-to-body="false" :multiple="inner.multiple?true:false" placeholder="请选择">
                                <el-option
                                        v-for="innerItem in inner.selectData"
                                        :key="innerItem.value"
                                        :label="innerItem.label"
                                        :value="innerItem.value"
                                ></el-option>
                            </el-select>
                            <span class="unit">{{inner.unit}}</span>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div class="saveInfo">
                <el-button type="primary" @click="saveBtn(item.saveBtn)">保存设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dossierManage",
        data() {
            return {
                labelPosition: "left", //表单的对齐方式
                formLabelAlign: {
                    saveFileDay:'',
                    dossierDownloadTaskTiming:'',
                    isUseDownloadServer:false,
                    wisdomSource:'',
                    dossierAuthoriation:false,
                    shareApply:false,
                },
                basicData:[
                    {
                        label: '卷宗数据管理',
                        saveBtn:'saveBtn1',
                        children: [
                            {
                                label: '客户端保存卷宗时间 :',
                                type: 'input',
                                unit: '天',
                                variable: 'saveFileDay'
                            },
                            {
                                label: '同步未来几天卷宗',
                                type: 'input',
                                unit: '天',
                                variable: 'dossierDownloadTaskTiming',
                                pwd: 'number',
                                max: 7,
                                min: 1,
                                placeHolder: '7天之内'
                            },
                            {
                                label: '是否使用下载代理服务',
                                type: 'select',
                                unit: '',
                                variable: 'isUseDownloadServer',
                                selectData: [
                                    {
                                        label: '是',
                                        value: true
                                    },
                                    {
                                        label: '否',
                                        value: false
                                    }
                                ]
                            },
                            {
                                label: '智慧质证来源',
                                type: 'select',
                                unit: '',
                                variable: 'wisdomSource',
                                selectData: [
                                    {
                                        label: '卷宗目录',
                                        value:'1'
                                    },
                                    {
                                        label: '证据目录',
                                        value:'2'
                                    }
                                ]
                            },
                            {
                                label: '当事人授权总开关',
                                type: 'select',
                                unit: '',
                                variable: 'dossierAuthoriation',
                                selectData: [
                                    {
                                        label: '开',
                                        value: true
                                    },
                                    {
                                        label: '关',
                                        value: false
                                    }
                                ]
                            },
                            {
                                label: '共享需要法官同意',
                                type: 'select',
                                unit: '',
                                variable: 'shareApply',
                                selectData: [
                                    {
                                        label: '是',
                                        value: true
                                    },
                                    {
                                        label: '否',
                                        value: false
                                    }
                                ]
                            }
                        ]
                    },
                ]
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
            getPosConfig(){
                let _this = this;
                _this.$showLoading("rgba");
                _this.$http
                    .post("/getPosConfig", {})
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {

                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading("rgba");
                    });
            },
            saveBtn(){
                let _this = this;
                let { formLabelAlign } = this;
                _this.$showToast("正在保存...")
                _this.$http
                    .post("/savePosConfig", {dossierDataManage:formLabelAlign})
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
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    .dossier-manage {
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
    .dossier-manage {
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