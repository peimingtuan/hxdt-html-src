<template>
    <div class="addtrialAlert5">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-if="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <!--<el-form-item class="red-label" label="模板名称">-->
                                <!--<el-input v-model.trim="formLabelAlign.witnessTemplateName"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item class="red-label" label="审理类型">-->
                                <!--<el-select v-model="formLabelAlign.trialType" placeholder="请选择">-->
                                    <!--<el-option-->
                                            <!--v-for="item in trialTypelist"-->
                                            <!--:key="item.id"-->
                                            <!--:label="item.name"-->
                                            <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="选择本地文件">
                                <el-upload
                                        class="upload-demo"
                                        :http-request="post"
                                        :on-remove="handleRemove"
                                        multiple
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">导入本地文件</el-button>
                                </el-upload>
                            </el-form-item>
                            <!--<el-form-item label="描述" prop="desc">-->
                                <!--<el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="是否使用">-->
                                <!--<el-select v-model="formLabelAlign.validityFlag" placeholder="请选择">-->
                                    <!--<el-option-->
                                            <!--v-for="item in selectList"-->
                                            <!--:key="item.id"-->
                                            <!--:label="item.name"-->
                                            <!--:value="item.id">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
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
    import getApiUrl from "../js/getApiUrl"
    export default {
        name: "addtrialAlert5",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加证人证言模板',
                text2:'请填写详细信息',
                trialTypelist:[{id:1,name:'独任审理'},{id:2,name:'合议审理'}],
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    // validityFlag:'',//是否使用
                    // description: "",//描述
                    trialType: "",//审理类型1独任2合议
                    fileStream: "",//base64文件流
                    //witnessTemplateName: "",//模板名称
                    witnessTemplateId: "",//模板id
                    //fileName: ""//上传文件名称
                },
                fileList:[],
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            selectList(){
                return this.$store.state.selectlist;
            }
        },
        methods: {
            post(file){
                const that=this;
                //that.formLabelAlign.fileName=file.file.name;
                let reader = new FileReader();
                reader.readAsDataURL(file.file);
                reader.onload = function (e) {
                    that.formLabelAlign.fileStream = this.result;
                }
            },
            show(row){
                if(row){
                    this.formLabelAlign.trialType=row.trialType;
                    this.formLabelAlign.witnessTemplateId=row.witnessTemplateId;
                }else{
                    this.formLabelAlign={
                        //validityFlag:'',//是否使用
                        //description: "",//描述
                        trialType: "",//审理类型1独任2合议
                        fileStream: "",//base64文件流
                        //witnessTemplateName: "",//模板名称
                        witnessTemplateId: "",//模板id
                        //fileName: ""//上传文件名称
                    }
                }
            },
            handleRemove(file, fileList) {//移除事件前的钩子
                this.formLabelAlign.fileName='';
                this.formLabelAlign.fileStream='';
            },
            handleExceed(files, fileList) {//文件超出个数限制时的钩子
                this.$msgw('目前只支持上传一个文件');
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
    @import url('../css/common.less');
    .addtrialAlert5{
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
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.5rem!important;
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
            @import url('../css/alertbtn.less');
        }
    }
</style>