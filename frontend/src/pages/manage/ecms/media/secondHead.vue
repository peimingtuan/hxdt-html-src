<template>
    <div class="secondHead">
        {{secondtitle}}
        <img class="alert-close2" @click="showAlert2" src="../images/alert-close.png" />
    </div>
</template>

<script>
    export default {
        name: "secondHead",
        props:{
            secondtitle:String
        },
        data() {
            return {}
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //注册二次弹框显示与否事件
            showAlert2() {
                this.$emit('showAlert2');
            },
        }
    }
</script>

<style lang="less" scoped>
    .secondHead{
        position:relative;
        text-align:center;
        line-height:.5rem;
        .alert-close2{
            position:absolute;
            right:.1rem;
            top:.1rem;
            width:.18rem;
            cursor:pointer;
        }
    }
</style>