<template>
    <div class="imgShow">
        <!--<slot></slot>-->
        <img :src="url" />
        <!--<el-image-->
                <!--:src="url"-->
                <!--:preview-src-list="srcList">-->
        <!--</el-image>-->
    </div>
</template>

<script>
    export default {
        name: "imgShow",
        props:['url'],
        data() {
            return {}
        },
        watch: {},
        computed: {
            srcList(){
                let arr=[this.url]
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
        height:calc(95vh - 60px);
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