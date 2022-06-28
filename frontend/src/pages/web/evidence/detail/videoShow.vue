<template>
    <div class="videoShow">
        <slot></slot>
        <video id="my-video" controls="controls" :src='mp4Url'>
        </video>
    </div>
</template>

<script>
    export default {
        name: "videoShow",
        props:['mp4Url'],
        data() {
            return {}
        },
        watch: {},
        computed: {},
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
    .videoShow{
        width:75vw;
        height:calc(100vh - 50px);
        #my-video{
            width:100%;
            height:calc(100vh - 50px);
        }
    }
</style>