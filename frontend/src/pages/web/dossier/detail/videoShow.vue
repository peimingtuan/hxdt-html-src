<template>
    <div class="videoShow">
        <slot></slot>
        <video id="my-video" controls="controls" :src='url'>
        </video>

    </div>
</template>

<script>
    export default {
        name: "videoShow",
        props:['url'],
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
        #my-video{
            width:100%;
            height:95vh;
        }
    }
</style>