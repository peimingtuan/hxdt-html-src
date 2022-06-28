<template>
    <div class="audioShow">
        <slot></slot>
        <audio controls="controls" :src='mp3Url'>
        </audio>
    </div>
</template>

<script>
    export default {
        name: "audioShow",
        props:['mp3Url'],
        data() {
            return {}
        },
        watch: {

        },
        computed: {},
        created() {
        },
        mounted() {
        },
        updated() {
        },
        beforeDestroy() {
            //console.log('离开音频',this.$refs.audio.src)
        }
    }
</script>

<style lang="less" scoped>
    .audioShow{
        text-align: center;
        width:75vw;
    }
</style>