<template>
    <div class="pagingBox">
        <el-pagination
                class="page"
                background
                @current-change="handleCurrentChange"
                :current-page='pageIndex'
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total'>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagingBox",
        props:['pageIndex','pageSize','total'],
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            handleCurrentChange(page){
                this.$emit('handleCurrentChange',page)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .pagingBox {
        z-index:100;
        position: fixed;
        width:16.6rem;
        bottom: 0;
        left:2.6rem;
        background:#f9f9f9;
        .page{
            margin: .2rem 0;
            text-align: center;
        }
    }
</style>
<style lang="less">

</style>