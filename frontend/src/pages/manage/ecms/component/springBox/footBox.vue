<template>
    <div class="footBox">
        <div class="sure" @click="sure">
            <img src="../../images/courtsupervision/sure.png" />{{sureText}}
        </div>

        <div class="cancel" @click="cancel">
            <img src="../../images/courtsupervision/cancel.png" />取消
        </div>
    </div>
</template>

<script>
    export default {
        name: "footBox",
        inject:{
            sureText:{
                type:String,
                default:'确定'
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {
            cancel(){
                this.$emit('cancel')
            },
            sure(){
                this.$emit('sure')
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../css/common.less");
    .footBox {
        margin:.2rem 0;
        &>div{
            cursor:pointer;
            .f20();
            line-height:.3rem;
        }
        img{
            width:.2rem;
            margin-right:.05rem;
        }
        .fc();
        .sure{
            color: #45A1D1;
            margin-right:.5rem;
        }
    }
</style>