<template>
    <div class="adduploadAlert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="alertshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition">
                            <el-form-item label="选择文件">
                                <el-upload
                                        class="upload-demo"
                                        :action=url
                                        :data=data
                                        name="controlFileStream"
                                        :on-change="handleChange"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :before-upload="beforeAvatarUpload"
                                        :on-success="finsh"
                                        multiple
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list=fileList>
                                    <el-button size="small" type="primary">导入本地文件</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
                                </el-upload>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="alertshow=false">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="alertshow=false">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"
    import getApiUrl from "../js/getApiUrl"
    import FoundationTools from '../../../../js/functionAjax'
    export default {
        name: "adduploadAlert",
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加上传控制文件',
                text2:'请填写详细信息',
                data:{
                    courtRoomIds:'',
                    userId:JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid
                },
                url:getApiUrl('/courtControl/uploadControlFile'),//form请求路径
                labelPosition: 'left',//form表单左侧靠齐
                fileList:[],
                alertshow:false,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //上传文件
            handleRemove(file, fileList) {//移除事件前的钩子
                console.log(file, fileList);
            },
            beforeAvatarUpload(file){
                // 文件类型进行判断
                // const isTxt = file.type === "image/jpeg";
                // if (!isTxt) {
                //     this.$msgw("只能上传TXT格式!");
                // }
            },
            //上传成功
            finsh(){
                console.log("成功")
                //this.alertshow=false;
            },
            handleChange(file,fileList) {//文件改变时的钩子，成功或失败都会调用
                console.log(file,fileList);
            },
            handleExceed(files, fileList) {//文件超出个数限制时的钩子
                this.$msgw('目前只支持上传一个文件');
            },
            beforeRemove(file, fileList) {//删除文件前的钩子
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .adduploadAlert{
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