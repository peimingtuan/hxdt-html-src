<template>
    <div class="headTop">
        <div>{{text || '退回理由'}}</div>
        <div>
            <img @click="closePage" src="../images/iconclose.png"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        props:['text'],
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            closePage(){
                this.$emit('closePage')
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .headTop {
        padding:0 25px;
        background: #DFE9F8;
        height:70px;
        .fb();
        img{
            width:16px;
            cursor:pointer;
        }
    }
</style>
<style lang="less">

</style>