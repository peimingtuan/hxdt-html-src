<template>
    <div class="AlertleftTile">
        {{text}}<br/>
        <span>{{text2}}</span>
    </div>
</template>

<script>
    export default {
        name: "AlertleftTile",
        props:['text','text2'],
        data() {
            return {}
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .AlertleftTile{
        width:100%;
        margin-bottom:.15rem;
        padding:.15rem 0;
        height:.6rem;
        .f20();
        span{
            .f14();
            color: rgba(0,0,0,0.54);
        }
    }
</style>