<template>
    <div class="showToastBox" id="showToastBox">
        <div class="box-loading">
            <i class="el-icon-loading"></i><br/>
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "showToastBox",
        data(){
            return {
                text:'加载中,请稍后...'
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
    .showToastBox{
        position: fixed;
        left: 0;
        top:0;
        width: 100%;
        height: 100%;
        /*background: #fff;*/
        background:rgba(255,255,255,0);
        z-index: 2000;
        .fc();
        .box-loading{
            min-width:100px;
            border-radius:5px;
            padding:.15rem;
            background: rgba(0, 0, 0,.7);
            span{
                .f20();
                color:#fff;
            }
           i{
               /*color:#2F8DED;*/
               color:#fff;
               font-size:40px;
               margin-bottom:.1rem;
           }
            text-align: center;
        }
    }
</style>