<template>
    <div id="example-2">
        <!--<button @click="show = !show">Toggle show</button>-->
        <!--<transition name="bounce">-->
            <!--<p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>-->
        <!--</transition>-->
        <!--<div class="div1">-->
            <!--123-->
            <!--<div class="div2">456</div>-->
        <!--</div>-->
        <!--<div :class="classObject"><a :href='url | add_protocol'>文字</a></div>-->
        <!--<div class="div1 div2">-->

        <!--</div>-->
        <!--&lt;!&ndash;3d旋转&ndash;&gt;-->
        <!--<div class="block">-->
            <!--<div class="block-in"></div>-->
        <!--</div>-->

        <!--<div class="block2">-->
            <!--<div class="block2-in2"></div>-->
        <!--</div>-->
        <div class="test-btn">
            确定
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    export default {
        name: "test",
        data() {
            return {
                show:true,
                url:'baidu.com'
            }
        },
        filters: {
            add_protocol(value) {
                if (!value) {
                    return '';
                } else {
                    return 'https://' + value;
                }
            }
        },
        computed: {
            classObject() {
                // 计算过程省略，假设得出了isActive和isDanger的布尔值
                return {
                    'active': true,
                    'text-danger': true
                }
            }
        },
        beforeCreate() {

        },
        created() {

        },
        destroyed() {

        },
        mounted(){
            $(".test-btn").on("click",function(){
                $(this).toggle()
            })
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .bounce-enter-active {
        animation: bounce-in 2s;
    }
    .bounce-leave-active {
        animation: bounce-in 2s reverse;
    }
    @keyframes bounce-in {
        0% {
            //transform: scale(0);
            transform: rotateX(0deg);
        }
        /*50% {*/
            /*//transform: scale(1.5);*/
            /*transform: rotateX(180deg);*/
        /*}*/
        100% {
            //transform: scale(1);
            transform: rotateX(360deg);
        }
    }
    .div1{
        .br(@radius:10px);
        .wh(100px,200px);
        background:pink;
        .fco(50px,red);
        div{
            &:first-child{
                color:black;
            }
        }

    }
    div.div2
    {
        animation: rotation 0.4s linear infinite;//动画一直运行
        //linear:表示动画从头到尾的速度都是相同的
        //ease-in:表示动画以低速开始。
        //ease-out:表示动画以低速结束。
        //ease-in-out:表示动画以低速开始和结束。
        //transform:rotate3d(0,1,0,130deg)
        /*transform:rotate3d(130deg);*/
        /*-webkit-transform3d:rotateY(130deg); !* Safari and Chrome *!*/
    }
    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    .block {
        width: 200px;
        height: 200px;
        cursor: pointer;
        &-in {
            background: orange;
            height: 100%;
            transition:2s;
            //transition:2s;//transition-property渡效果的 CSS 属性的名称
            //transition-duration过渡效果需要多少秒或毫秒
            //transition-timing-function规定速度效果的速度曲线
            //transition-delay过渡效果何时开始
        }

        &:hover .block-in {
            transform: rotateX(360deg);
            //transform: rotateY(180deg);
        }
    }

    .block2 {
        width: 200px;
        height: 200px;
        cursor: pointer;
        &-in2{
            background: pink;
            height: 100%;
            animation: bounce-in2 2s infinite;
            //transition:2s;
            //transition:2s;//transition-property渡效果的 CSS 属性的名称
            //transition-duration过渡效果需要多少秒或毫秒
            //transition-timing-function规定速度效果的速度曲线
            //transition-delay过渡效果何时开始
        }
        /*&:hover .block2-in2 {*/
            /*transform: rotateY(360deg);*/
            /*//transform: rotateY(180deg);*/
        /*}*/
        @keyframes bounce-in2 {
            0% {
                //transform: scale(0);
                transform: rotateZ(0deg);
            }
            50% {
            //transform: scale(1.5);
            transform: rotateZ(180deg);
            }
            100% {
                //transform: scale(1);
                transform: rotateZ(360deg);
            }
        }
    }
    .test-btn{
        width:100px;
        line-height:30px;
        background:pink;
    }
    .color-btn{
        background:orange!important;
    }
</style>