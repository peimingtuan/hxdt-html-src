<template>
    <div class="alertBtn">
        <div class="qure" @click="qure">
            <img src="../images/courtsupervision/sure.png" />确定
        </div>

        <div class="cancel" @click="cancel">
            <img src="../images/courtsupervision/cancel.png" />取消
        </div>
    </div>
</template>

<script>
    export default {
        name: "alertBtn",
        props:{
            // qure:Function,
            // cancel:Function
        },
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
            //注册弹框显示与否事件
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .alertBtn{
        width:100%;
        margin:.2rem 0;
        &>div{
            font-size: 0.2rem;
             line-height:.3rem;
         }
        img{
            width:.2rem;
            margin-right:.05rem;
        }
        .fc();
        .qure{
            color: #45A1D1;
            margin-right:.5rem;
        }
    }
</style>