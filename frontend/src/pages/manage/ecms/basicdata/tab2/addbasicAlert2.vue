<template>
    <!--弹框-->
    <transition name="slide-fade">
        <div class="addbasicAlert2 alert-window2" v-show="alertshow">
            <div class="main">
                <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
                <img class="alert-close" @click="showAlert" src="../../images/alert-close.png" />
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content">
                    <el-form :label-position="labelPosition" :model="formLabelAlign">
                        <el-form-item label="案件类型名称" required>
                            <el-input v-model.trim="formLabelAlign.caseTypeName"></el-input>
                        </el-form-item>
                        <el-form-item label="案件类型代码" required>
                            <el-input v-model.trim="formLabelAlign.caseTypeCode"></el-input>
                        </el-form-item>
                        <el-form-item label="案件类型代字" required>
                            <el-input v-model.trim="formLabelAlign.caseTypePronoun"></el-input>
                        </el-form-item>
                        <el-form-item label="案件种类代码">
                            <el-input v-model="formLabelAlign.caseKindCode" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="案件种类名称">
                            <el-input v-model="formLabelAlign.caseKindName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="父案件">
                            <el-input v-model="formLabelAlign.caseTypeParentName" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="bt">
                    <div class="qure" @click="qure(formLabelAlign)">
                        <img src="../../images/courtsupervision/sure.png" />确定
                    </div>

                    <div class="cancel" @click="cancel">
                        <img src="../../images/courtsupervision/cancel.png" />取消
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import AlertleftTile from "../../component/AlertleftTile"
    export default {
        name: "addbasicAlert2",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加案由',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    caseTypeParentCode:"",//上级代码
                    caseTypeParentName:"",
                    caseTypePronoun:"",//案件类型代字
                    caseTypeName:"",//案件类型名称
                    description:"",//描述
                    caseTypeId:"",//案件类型Id
                    caseTypeCode:"",//案件类型代码
                    leaf:"",//是否叶子节点
                    caseTypeSource:"",//案件类型来源
                    caseKindCode:'',//案件种类代码
                    caseKindName:'',//案件种类名称
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
            show(info,type){
                if(type==1){
                    this.text='添加案件类型';
                    this.formLabelAlign={
                        caseTypeParentCode:info.caseTypeCode || "",//上级代码
                        caseTypeParentName:info.caseTypeName || "",
                        caseTypePronoun:"",//案件类型代字
                        caseTypeName:"",//案件类型名称
                        description:"",//描述
                        caseTypeId:"",//案件类型Id
                        caseTypeCode:"",//案件类型代码
                        leaf:"",//是否叶子节点
                        caseTypeSource:"",//案件类型来源
                        caseKindCode:info.caseKindCode || '',//案件种类代码
                        caseKindName:info.caseKindName || '',//案件种类名称
                    }
                }else{
                    this.text='修改案件类型';
                    this.formLabelAlign=JSON.parse(JSON.stringify(info))
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure(formLabelAlign) {
                this.$emit('qure',formLabelAlign);
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .addbasicAlert2{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-4rem;
            border-radius:2px;
            @import url('../../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.6rem!important;
                }
                .el-form-item__content{
                    margin-left:1.6rem!important;
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
            @import url('../../css/alertbtn.less');
        }
    }
</style>