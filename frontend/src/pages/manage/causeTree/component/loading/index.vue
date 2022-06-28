<template>
    <div class="loading">
        <div class="text-loading">
            <img src="../../images/wait.gif" /><br/>
            加载中,请稍后...
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        data(){
            return {

            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    @import url('../../css/common.less');
    .loading{
        position: fixed;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        /*background: #fff;*/
        background:rgba(255,255,255,1);
        z-index: 1000;
        .fc();
        .text-loading{
            .f20();
            color:#2F8DED;
            text-align: center;
            img{
                width:1rem;
                margin-bottom:.2rem;
            }
        }
    }
    #rgba{
        //background:rgba(255,255,255,.8);
        background: rgba(0, 0, 0,.7);
    }
</style>