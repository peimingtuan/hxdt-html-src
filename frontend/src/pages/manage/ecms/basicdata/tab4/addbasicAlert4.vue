<template>
    <div class="addbasicAlert4">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="人民陪审员名称" required>
                                <el-input v-model.trim="formLabelAlign.peopleAssessorName"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../../component/AlertleftTile"
    export default {
        name: "addbasicAlert4",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加人民陪审员',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    peopleAssessorId:'',//人民陪审员Id
                    peopleAssessorName:'',//人民陪审员名称
                    description:''//描述,
                },
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            show(row){
                if(row){
                    this.text='修改人民陪审员'
                    this.formLabelAlign=JSON.parse(JSON.stringify(row))
                }else{
                    this.text='添加人民陪审员'
                    this.formLabelAlign={
                        peopleAssessorId:'',//人民陪审员Id
                        peopleAssessorName:'',//人民陪审员名称
                        description:''//描述,
                    }
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure',this.formLabelAlign);
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .addbasicAlert4{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-5rem;
            border-radius:2px;
            @import url('../../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.8rem .2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.8rem!important;
                }
                .el-form-item__content{
                    margin-left:1.8rem!important;
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
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width: 1.5rem;
                    line-height: .36rem;
                    padding: 0;
                    background:#409eff;
                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
            /*底部*/
            @import url('../../css/alertbtn.less');
        }
    }
</style>