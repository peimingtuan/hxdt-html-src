<template>
    <div class="headTop">
        <img class="imglogo" :src='imgLogo' />
        <div>
            {{mainText}}<br/>
            <span>{{textInfo}}</span>
        </div>
        <img class="alert-close" @click="closePage" src="../../images/alert-close.png"/>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        props:{
            imgLogo:{
                type:String,
                default:require("../../images/yingyongpeizhi/avataradd.png")
            },
            mainText:{
                type:String,
                default:'请填写详细信息'
            },
            textInfo:{
                type:String,
                default:'请填写详细信息'
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
    @import url("../../css/common.less");
    .headTop {
        position:relative;
        img.imglogo{
            position:absolute;
            top: .2rem;
            left: .2rem;
            width:.4rem;
        }
        /*关闭弹框*/
        img.alert-close{
            width:.18rem;
            position:absolute;
            top: .25rem;
            right: .35rem;
            cursor: pointer;
            z-index:102;
        }
        &>div{
            margin-bottom:.15rem;
            padding:.15rem .8rem;
            height:.6rem;
            .f20();
            span{
                .f14();
                color: rgba(0,0,0,0.54);
            }
        }
    }
</style>
<style lang="less">

</style>