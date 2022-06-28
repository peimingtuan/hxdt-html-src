<template>
    <transition name="slide-fade">
        <div class="chat" v-show="isShow">
            <div class="title">
                <div>即时通讯</div>
                <div @click="isShow=false"><img src="../images/alert-close.png" /></div>
            </div>
            <div class="main">
                <div>1111</div>
            </div>
            <div class="bottom">
                <textarea autofocus v-model.trim="text" @keyup.enter="enter(text)"></textarea>
                <!--<el-input-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 2, maxRows: 4}"-->
                        <!--placeholder="请输入内容"-->
                        <!--v-model="textarea3">-->
                <!--</el-input>-->
                <el-button type="primary" @click="enter(text)">发送(Enter)</el-button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "chat",
        data() {
            return {
                isShow:false,
                text:''
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            enter(text){
                if(!text){
                    this.$msgw('发送内容不能为空')
                    return
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .chat{
        position:fixed;
        top:calc(50% - 383px);
        left:calc(50% - 333px);
        z-index:1000000;
        width:666px;
        height:766px;
        background: #F5F6F7;
        border-radius:3px;
        box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
        .title{
            padding:0 20px;
            height:66px;
            background: #F2F6FC;
            border-bottom: 1px solid #C0C4CC;
            div{
                font-size:24px;
            }
            .fb();
            img{
                width:18px;
                cursor:pointer;
            }
        }
        .main{
            height:500px;
            border-bottom: 1px solid #C0C4CC;
            overflow: auto;
            padding:10px 20px;
        }
        .bottom{
            position:relative;
            padding:10px 20px;
            height:200px;
            textarea{
                border:none;
                outline: none;
                width:100%;
                height:100px;
                padding:5px;
                border-radius:3px;
                resize: none;
                background: #F5F6F7;
            }
        }
    }
</style>
<style lang="less">
    .chat{
        .el-button{
            padding:10px 20px;
            position:absolute;
            bottom:20px;
            right:20px;
        }
    }
</style>