<template>
    <transition name="slide-fade">
        <div class="springBox alert_window" v-show="alertShow">
            <div class="main-box">
                <head-top
                        :mainText="mainText"
                        :imgLogo="imgLogo"
                        :textInfo="textInfo"
                        @closePage="closeAlert"
                />
                <slot></slot>
                <foot-box
                        @cancel="closeAlert"
                        @sure="sure"
                />
            </div>
        </div>
    </transition>
</template>

<script>
    const headTop=()=>import("./headTop")
    const footBox=()=>import("./footBox")
    export default {
        name: "springBox",
        props:['alertShow','imgLogo','mainText','textInfo'],
        components:{
            headTop,
            footBox
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            closeAlert(){
                this.$emit('update:alertShow',false)
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
    .springBox {
        .main-box{
            width:70vw;
            min-width:500px;
            background:#fff;
            border-radius:5px;
            box-shadow: 0 0 5px rgba(38,78,119,.2);
        }
    }
</style>
<style lang="less">

</style>