<template>
    <div class="addremoteAlert1">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="庭审室类型名称" required>
                                <el-input v-model.trim="formLabelAlign.trialRoomTypeName"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model.trim="formLabelAlign.trialRoomTypeDesc" placeholder="......"></el-input>
                            </el-form-item>
                        </el-form>
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
        name: "addremoteAlert1",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加庭审室类型名称',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    trialRoomTypeId:'',
                    trialRoomTypeName: '',
                    trialRoomTypeDesc: '',
                },
                rules:{
                    trialRoomTypeName:[
                        {required: true,}
                    ]
                }
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
                if(!this.formLabelAlign.trialRoomTypeName){
                    this.$msgw('请输入庭审室类型名称');
                    return
                }
                this.$emit('qure',this.formLabelAlign);
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addremoteAlert1{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-4rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:3rem;
                margin-top:.1rem;
                padding:.8rem .2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.7rem!important;
                }
                .el-form-item__content{
                    margin-left:1.5rem!important;
                }
                /*input框*/
                .el-input{
                    width:4rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }

            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>