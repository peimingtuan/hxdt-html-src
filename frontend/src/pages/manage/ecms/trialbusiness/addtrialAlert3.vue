<template>
    <div class="addtrialAlert3">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="笔录文件名称">
                                <el-input v-model="formLabelAlign.name"></el-input>
                            </el-form-item>
                            <el-form-item label="案由">
                                <el-input v-model="formLabelAlign.name"></el-input>
                                <el-button>案由选择</el-button>
                            </el-form-item>
                            <el-form-item label="适用程序">
                                <el-select v-model="formLabelAlign.name" placeholder="请选择活动区域">
                                    <el-option label="简易程序(非小额诉讼)" value="shanghai"></el-option>
                                    <el-option label="简易程序(小额诉讼)" value="beijing"></el-option>
                                    <el-option label="普通程序" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="适用人">
                                <el-select v-model="formLabelAlign.name" placeholder="请选择活动区域">
                                    <el-option label="法官" value="shanghai"></el-option>
                                    <el-option label="书记员" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="选择文件">
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :data="{name:123}"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="10"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                    <el-button size="small" type="primary">导入本地文件</el-button>
                                    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述" prop="desc">
                                <el-input type="textarea" v-model="formLabelAlign.desc" placeholder="......"></el-input>
                            </el-form-item>
                            <el-form-item label="是否使用">
                                <el-select v-model="formLabelAlign.name" placeholder="请选择活动区域">
                                    <el-option label="是" value="shanghai"></el-option>
                                    <el-option label="否" value="beijing"></el-option>
                                </el-select>
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
        name: "addtrialAlert3",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加默认笔录文件',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    desc:''
                },
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //上传文件
            handleRemove(file, fileList) {//移除
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {//文件超出个数限制时的钩子
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {//删除文件前的钩子
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addtrialAlert3{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-5rem;
            /*margin-top:-3.425rem;*/
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