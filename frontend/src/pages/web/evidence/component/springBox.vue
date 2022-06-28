<template>
    <transition name="slide-fade">
        <div class="springBox alert-window" v-show="alertShow">
            <div class="main-box">
                <head-top
                        :text="textInfo"
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
        props:['alertShow','textInfo'],
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
            width:80vw;
            min-width:500px;
            background:#fff;
            border-radius:10px;
            box-shadow: 0 0 5px rgba(38,78,119,.2);
        }
    }
</style>
<style lang="less">

</style>