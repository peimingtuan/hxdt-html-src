<template>
    <div class="search">
        <el-input v-model="keyWord" placeholder="请输入关键字"></el-input>
        <img src="../images/search.png"/>
    </div>
</template>

<script>
    export default {
        name: "searchModule",
        data() {
            return {
                keyWord:null
            }
        },
        watch:{
            keyWord(v){
                this.$emit('inputKeyWord',v)
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

<style lang="less" scoped>
    .search{
        margin:10px 25px;
        position:relative;
        img{
            width:20px;
            position:absolute;
            right:5px;
            top:12px;
        }
    }
</style>
<style lang="less">

</style>