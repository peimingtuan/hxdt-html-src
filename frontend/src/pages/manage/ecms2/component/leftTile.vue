<template>
    <div class="leftTile">
        <img :src="imgurl"/>
        {{text}} <span>{{text2}}</span>
    </div>
</template>

<script>
    export default {
        name: "leftTile",
        props:['imgurl','text','text2'],
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
    .leftTile{
        .f20();
        img {
            width: .3rem;
        }

        span {
            margin-left: .05rem;
            .f14();
            color: #1296DB;
        }
    }
</style>