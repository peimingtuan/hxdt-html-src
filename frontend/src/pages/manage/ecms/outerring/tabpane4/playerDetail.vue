<template>
    <div class="playerDetail">
        <video controls="controls" :src='url'></video>
    </div>
</template>

<script>
    export default {
        name: "playerDetail",
        components: {

        },
        data() {
            return {
                url:''
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {

        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../css/common.less");
    .playerDetail{
        margin:0 .8rem;
        .fc();
        video{
            width:400px;
            height:400px;
            outline: none;
        }
    }
</style>
<style lang="less">

</style>