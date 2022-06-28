<template>
    <div class="audioShow">
        <slot></slot>
        <audio controls="controls" :src='url'>
        </audio>
    </div>
</template>

<script>
    export default {
        name: "audioShow",
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
    .audioShow{
        text-align: center;
        width:75vw;
    }
</style>