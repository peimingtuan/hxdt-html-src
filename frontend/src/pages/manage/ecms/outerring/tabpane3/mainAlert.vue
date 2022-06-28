<template>
    <div class="mainAlert">
        <el-form ref="form" :label-position="labelPosition" :model="formLabelAlign">
            <el-form-item label="显示内容" prop="openSelect">
                <el-checkbox-group v-model="trialStatusArr" @change="hanlderChange">
                    <el-checkbox label="等待开庭" name="1" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="wait" style="display:inline-block;width:30%">{{wait}}</span>
                    <el-checkbox label="开庭" name="2" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="open" style="display:inline-block;width:30%">{{open}}</span>
                    <el-checkbox label="闭庭" name="3" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="finish" style="display:inline-block;width:30%">{{finish}}</span>
                    <el-checkbox label="休庭" name="4" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="sleep" style="display:inline-block;width:30%">{{sleep}}</span>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="数据排序" prop="statusOrder">
                <el-radio-group v-model="formLabelAlign.statusOrder">
                    <el-radio label="1">以时间排序</el-radio>
                    <el-radio label="2">以法庭编号排序</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "mainAlert",
        props: {
            currentData: Object,
            templetId: String
        },
        data() {
            return {
                showlist: [
                    { id: 1, name: 1 },
                    { id: 2, name: 2 },
                    { id: 3, name: 3 },
                    { id: 4, name: 4 }
                ],
                formLabelAlign: {
                    openSelect: "", //正在开庭顺序
                    sleepSelect: "", //休庭顺序
                    waitSelect: "", //等待开庭顺序
                    finishSelect: "", //结束庭审顺序
                    statusOrder: "1"
                },
                labelPosition: "left",
                trialStatusArr: [], //'等待开庭','开庭','闭庭','休庭'
                templateId: "",
                open: 0, //正在开庭是否被选择
                sleep: 0, //休庭是否被选择
                wait: 0, //等待开庭是否被选择
                finish: 0 //结束庭审是否被选择
            }
        },
        computed: {
            openSelect() {
                return this.formLabelAlign.openSelect;
            },
            sleepSelect() {
                return this.formLabelAlign.sleepSelect;
            },
            waitSelect() {
                return this.formLabelAlign.waitSelect;
            },
            finishSelect() {
                return this.formLabelAlign.finishSelect;
            }
        },
        watch: {
            openSelect(val, oldVal) {
                this.getdiabledSelect(val, oldVal, "id", this.showlist);
            },
            sleepSelect(val, oldVal) {
                this.getdiabledSelect(val, oldVal, "id", this.showlist);
            },
            waitSelect(val, oldVal) {
                this.getdiabledSelect(val, oldVal, "id", this.showlist);
            },
            finishSelect(val, oldVal) {
                this.getdiabledSelect(val, oldVal, "id", this.showlist);
            },
            showlist: {
                handler(newVal, oldVal) {
                    this.showlist = newVal;
                },
                deep: true,
                immediate: true
            },
            trialStatusArr: {
                handler(newVal, oldVal) {
                    this.hanlderChange()
                },
                deep: true,
                immediate: true
            },
            currentData: {
                handler(newVal, oldVal) {
                    // if (newVal.trialStatusConfig) {
                    this.currentData = newVal;
                    this.backFillData();
                    // }
                },
                deep: true,
                immediate: true
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 复选框的点击事件
            hanlderChange(val) {
                console.log("-----")
                console.log(this.trialStatusArr)
                this.wait = 0;
                this.open = 0;
                this.finish = 0;
                this.sleep = 0;
                for (var i = 0; i < this.trialStatusArr.length; i++) {
                    let item = this.trialStatusArr[i];
                    if(item == undefined){
                        this.trialStatusArr.splice(i,1)
                    }
                    if (i == 0) {
                        if (item == "等待开庭") {
                            this.wait = i + 1;
                        } else if (item == "开庭") {
                            this.open = i + 1;
                        } else if (item == "闭庭") {
                            this.finish = i + 1;
                        } else if (item == "休庭") {
                            this.sleep = i + 1;
                        }
                    } else if (i == 1) {
                        if (item == "等待开庭") {
                            this.wait = i + 1;
                        } else if (item == "开庭") {
                            this.open = i + 1;
                        } else if (item == "闭庭") {
                            this.finish = i + 1;
                        } else if (item == "休庭") {
                            this.sleep = i + 1;
                        }
                    } else if (i == 2) {
                        if (item == "等待开庭") {
                            this.wait = i + 1;
                        } else if (item == "开庭") {
                            this.open = i + 1;
                        } else if (item == "闭庭") {
                            this.finish = i + 1;
                        } else if (item == "休庭") {
                            this.sleep = i + 1;
                        }
                    } else if (i == 3) {
                        if (item == "等待开庭") {
                            this.wait = i + 1;
                        } else if (item == "开庭") {
                            this.open = i + 1;
                        } else if (item == "闭庭") {
                            this.finish = i + 1;
                        } else if (item == "休庭") {
                            this.sleep = i + 1;
                        }
                    }
                }
            },
            // 对配置数据进行回填
            backFillData() {
                if(this.currentData.trialStatusConfig){
                    let order = this.currentData.trialStatusConfig.split(":");
                    order = order.map((item, index) => {
                        if (item == 1) return "等待开庭";
                        if (item == 2) return "开庭";
                        if (item == 3) return "闭庭";
                        if (item == 4) return "休庭";
                    });
                    this.trialStatusArr = order;
                    this.open = 0;
                    this.sleep = 0;
                    this.finish = 0;
                    this.wait = 0;
                    for (var i = 0; i < this.trialStatusArr.length; i++) {
                        if (i == 0) {
                            if (this.trialStatusArr[i] == "等待开庭") {
                                this.wait = this.trialStatusArr.length;
                            } else if (this.trialStatusArr[i] == "开庭") {
                                this.open = this.trialStatusArr.length;
                            } else if (this.trialStatusArr[i] == "闭庭") {
                                this.finish = this.trialStatusArr.length;
                            } else if (this.trialStatusArr[i] == "休庭") {
                                this.sleep = this.trialStatusArr.length;
                            }
                        } else if (i == 1) {
                            if (this.trialStatusArr[i] == "等待开庭") {
                                this.wait = this.trialStatusArr.length;
                            } else if (this.trialStatusArr[i] == "开庭") {
                                this.open = this.trialStatusArr.length - 1;
                            } else if (this.trialStatusArr[i] == "闭庭") {
                                this.finish = this.trialStatusArr.length - 1;
                            } else if (this.trialStatusArr[i] == "休庭") {
                                this.sleep = this.trialStatusArr.length - 1;
                            }
                        } else if (i == 2) {
                            if (this.trialStatusArr[i] == "等待开庭") {
                                this.wait = this.trialStatusArr.length - 2;
                            } else if (this.trialStatusArr[i] == "开庭") {
                                this.open = this.trialStatusArr.length - 2;
                            } else if (this.trialStatusArr[i] == "闭庭") {
                                this.finish = this.trialStatusArr.length - 2;
                            } else if (this.trialStatusArr[i] == "休庭") {
                                this.sleep = this.trialStatusArr.length - 2;
                            }
                        } else if (i == 3) {
                            if (this.trialStatusArr[i] == "等待开庭") {
                                this.wait = this.trialStatusArr.length - 3;
                            } else if (this.trialStatusArr[i] == "开庭") {
                                this.open = this.trialStatusArr.length - 3;
                            } else if (this.trialStatusArr[i] == "闭庭") {
                                this.finish = this.trialStatusArr.length - 3;
                            } else if (this.trialStatusArr[i] == "休庭") {
                                this.sleep = this.trialStatusArr.length - 3;
                            }
                        }
                    }
                    this.formLabelAlign.statusOrder = String(this.currentData.statusOrder);
                }
            },
            // 对下拉数组进行过滤
            getdiabledSelect(val, oldVal, dbSourceId, dataArray) {
                dataArray = dataArray.filter((value, key, arr) => {
                    if (value[dbSourceId] === oldVal) {
                        value.disabled = false;
                    } else if (value[dbSourceId] === val) {
                        value.disabled = true;
                    }
                    return value;
                });
            },
            //注册弹框显示与否事件
            qure() {
                this.$emit("qure");
            },
            // 取消按钮逻辑
            cancel() {
                this.$emit("cancel");
            },
            // 确认按钮的逻辑
            submitForm() {
                let { formLabelAlign, trialStatusArr } = this;
                // 对数组进行映射
                trialStatusArr = trialStatusArr.map((item, index) => {
                    if (item == "等待开庭") return 1;
                    if (item == "开庭") return 2;
                    if (item == "闭庭") return 3;
                    if (item == "休庭") return 4;
                });
                // 将映射后的数组拼接成所需的字段
                let trialStatusConfig = "";
                trialStatusConfig = trialStatusArr.join(":");
                const _this = this;
                _this.$refs["form"].validate(valid => {
                    if (valid) {
                        _this.$showToast("正在保存...")
                        _this.$http
                            .post("/tdsconfig/updateTemplateConfig", {
                                templateId: this.templetId,
                                trialStatusConfig: trialStatusConfig,
                                statusOrder: this.formLabelAlign.statusOrder
                            })
                            .then(data => {
                                _this.$hideToast()
                                if (data.code === 200) {
                                    _this.$msgs("保存成功");
                                    // for (let key in this.formLabelAlign) {
                                    //   this.formLabelAlign[key] = "";
                                    //   this.$parent.getTableData();
                                    // }
                                    _this.$emit("cancel");
                                    _this.$parent.$parent.getTableData();
                                } else {
                                    _this.$msgw(data.message);
                                }
                            })
                            .catch(err => {
                                _this.$hideToast()
                                _this.$msge("服务器异常，请稍后重试");
                            });
                    } else {
                        return false;
                    }
                });
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .mainAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        padding:.2rem;
        mine-height:4rem;
    }
</style>
<style lang="less">
    @import url("../../css/common.less");
    .mainAlert {
        .el-form{
            /*label*/
            .el-form-item__label {
                .f18();
                width: 1.5rem !important;
            }
            .el-form-item__content {
                margin-left: 1.5rem !important;
            }
            .el-checkbox {
                width: 2rem;
                margin-right: 30px;
                display: block;
            }
            /*input框*/
            .el-input {
                width: 2rem;
                .el-input__inner {
                    height: 0.4rem;
                    line-height: 0.4rem;
                    padding: 0 0.15rem;
                    .f18();
                }
            }
        }
    }
</style>