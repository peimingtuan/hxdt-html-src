<template>
    <div class="headBox">
        <div v-for="(item,index) in btnList" :key="index" @click="pointTrag(item.event)">
            <img v-if="item.png" :style="{width:item.width?item.width:''}" :src="item.png"/>
            <el-button v-else type="primary" :icon="item.icon">{{item.name}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headBox",
        props:{
            btnList:{
                type:Array
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            pointTrag(n){
                this.$emit(n)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../css/common.less");
    .headBox {
        .fl();
        margin-bottom:.1rem;
        &>div{
            cursor:pointer;
            margin-right:.1rem;
            img{

            }
        }
    }
</style>
<style lang="less">
    @import url("../../css/common.less");
    .headBox{
        .el-button {
            line-height: .35rem;
            padding:0 .2rem;
            background:#edf5ff;
            border:1px solid #bedeff;
            i{
                .f18();
                color:#409eff;
            }
            span {
                .f18();
                color:#409eff;
            }
        }
    }
</style>