<template>
    <div class="clientConfig">
        <div class="moduleItem" v-for="(item,index) in basicData" :key="index">
            <!-- 模块头部始 -->
            <p class="moduleTitle">{{item.label}}</p>
            <!-- 模块内容始 -->
            <div class="moduleContent">
                <el-form
                        ref="form"
                        :label-position="labelPosition"
                        label-width="252px"
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
                        <template v-else-if="inner.type == 'textarea'">
                            <el-input
                                    type="textarea"
                                    v-model="formLabelAlign[inner.variable]"
                            ></el-input>
                            <span class="unit">{{inner.unit}}</span>
                        </template>
                        <template v-else>
                            <el-select v-model="formLabelAlign[inner.variable]" placeholder="请选择">
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
    import { clientConfig } from "..//data.js"
    export default {
        name: "clientConfig",
        data() {
            return {
                basicData:clientConfig,
                labelPosition: "left",
                formLabelAlign: {
                    moreFunctionShow:true,
                }
            }
        },
        created() {
        },
        mounted() {

        },
        watch:{

        },
        methods: {
            getInfoData(){
                let _this = this;
                _this.$showLoading("rgba");
                _this.$http
                    .post("/dataRelatedConfig/otherConfig/getJosClientPageConfig", {})
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
                        console.log(err,"/dataRelatedConfig/otherConfig/getJosClientPageConfig")
                    });
            },
            saveBtn(name) {
                let _this = this;
                let { formLabelAlign } = this;
                _this.$showToast("正在保存...")
                if(name==='saveBtn'){
                    _this.$http
                        .post("/dataRelatedConfig/otherConfig/saveJosClientPageConfig",formLabelAlign)
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
                            console.log(err,"/dataRelatedConfig/otherConfig/saveJosClientPageConfig")
                        });
                }
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .clientConfig {
        width:16rem;
        /*height:100%;*/
        display: flex;
        justify-content:flex-start;
        flex-wrap: wrap;
        margin-bottom: 70px;
        .moduleItem {
            margin: 0 10px 10px 0;
            width: calc(41.5vw - 10px);
            height: calc(50vh - 10px);
            border-radius: 5px;
            background-color: rgb(241, 245, 249);
            .moduleTitle {
                padding: 10px;
            }
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
        .moduleItem:nth-child(2n) {
            margin-right: 0;
        }
        .unit {
            font-size: 0.18rem;
        }
    }
</style>
<style lang="less">
    .clientConfig{
        .el-button{
            padding:0 10px;
            height:40px;
        }
    }
</style>