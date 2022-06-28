<template>
    <div class="mainAlert">
        <el-form ref="form" :label-position="labelPosition">
            <el-form-item label="排期状态排序">
                <el-checkbox-group v-model="trialStatusArr" @change="hanlderChange">
                    <el-checkbox label="等待开庭" name="1" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="wait" style="display:inline-block;width:30%">{{wait}}</span>
                    <el-checkbox label="正在开庭" name="2" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="open" style="display:inline-block;width:30%">{{open}}</span>
                    <el-checkbox label="庭审结束" name="3" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="finish" style="display:inline-block;width:30%">{{finish}}</span>
                    <el-checkbox label="休庭" name="4" style="display:inline-block;width:50%"></el-checkbox>
                    <span v-if="sleep" style="display:inline-block;width:30%">{{sleep}}</span>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "mainAlert",
        data() {
            return {
                labelPosition: "left",
                trialStatusArr:[],
                open: 0, //正在开庭是否被选择
                sleep: 0, //休庭是否被选择
                wait: 0, //等待开庭是否被选择
                finish: 0 //结束庭审是否被选择
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 复选框的点击事件
            hanlderChange(val) {
                this.wait = 0;
                this.open = 0;
                this.finish = 0;
                this.sleep = 0;
                for (let i = 0; i < this.trialStatusArr.length; i++) {
                    let item = this.trialStatusArr[i];
                    if(item == undefined){
                        this.trialStatusArr.splice(i,1)
                        continue;
                    }
                    if (item == "等待开庭") {
                        this.wait = i + 1;
                    } else if (item == "正在开庭") {
                        this.open = i + 1;
                    } else if (item == "庭审结束") {
                        this.finish = i + 1;
                    } else if (item == "休庭") {
                        this.sleep = i + 1;
                    }
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
            }
        }
    }
</style>