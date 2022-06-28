<template>
    <div class="imgShow">
        <!--<img :src='imgUrl' />-->
        <el-image
                :src="imgUrl"
                :preview-src-list="srcList">
        </el-image>
    </div>
</template>

<script>
    export default {
        name: "imgShow",
        props:['imgUrl'],
        data() {
            return {}
        },
        watch: {

        },
        computed: {
            srcList(){
                let arr=[this.imgUrl]
               return arr
            }
        },
        created() {
        },
        mounted() {

        },
        updated() {
        },
        beforeDestroy() {

        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .imgShow{
        width:75vw;
        height:calc(100vh - 50px);
        .fc();
        img{
            max-width:100%;
        }
    }
</style>
<style lang="less">
    .imgShow{
        .el-image-viewer__wrapper{
            i{
                color:#fff;
            }
            i.el-icon-circle-close{
                font-size:40px!important;
            }
        }
    }
</style>