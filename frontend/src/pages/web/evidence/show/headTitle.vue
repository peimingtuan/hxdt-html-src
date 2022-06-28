<template>
    <div class="head">
        <el-button @click="returnInfo" class="save-icon" :disabled="currentState==1?false:true" type="primary">
            {{currentState==3?'已退回':'退回'}}
        </el-button>
        <el-button @click="sign" class="edit-icon" :disabled="currentState==1?false:true" type="primary">
            {{currentState==2?'已签收':'签收'}}
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "headTitle",
        props:['currentState'],
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            returnInfo(){
                this.$emit('returnInfo')
            },
            sign(){
                this.$emit('sign')
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
    .head{
        padding:5px 20px;
        text-align:right;
        height:50px;
        .f18();
        background: #F5F7FA;
    }
</style>
<style lang="less">
    .head{
        .is-disabled,.is-disabled:hover{
            background: #C0C4CC;
            border-color: #C0C4CC;
        }
    }
</style>