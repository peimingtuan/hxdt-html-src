<template>
    <div class="footBox">
        <el-button class="color-606266" @click="cancel">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
    </div>
</template>

<script>
    export default {
        name: "footBox",
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            cancel(){
                this.$emit('cancel')
            },
            sure(){
                this.$emit('sure')
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .footBox {
        padding:20px 25px;
        text-align: right;
    }
</style>
<style lang="less">
    .footBox{
        .color-606266 {
            span {
                color: #606266;
            }
        }
    }
</style>