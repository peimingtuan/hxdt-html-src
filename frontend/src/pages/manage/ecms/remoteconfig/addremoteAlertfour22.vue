<template>
    <div class="addremoteAlertfour22">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-input class="textarea" type="textarea" v-model="centralCommand" placeholder="......"></el-input>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    export default {
        name: "addremoteAlertfour22",
        props:{
            alertshow:Boolean
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'软中控配置',
                text2:'请填写详细信息',
                dataIndex:'',
                centralCommand:''
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure',this.centralCommand,this.dataIndex);
                this.cancel();
            },
            cancel() {
                this.$emit('cancel');
            },
            
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addremoteAlertfour22{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-5rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                height:4rem;
                /*max-height:6rem;*/
                overflow: auto;
                margin-top:.1rem;
                padding:.2rem;
                .el-textarea__inner{
                    height: 3rem;
                }
                
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>