<template>
    <!--弹框-->
    <transition name="slide-fade">
        <div class="alert-window2 addotherAlert2" v-if="alertshow">
            <div class="main">
                <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content">
                    <el-form :label-position="labelPosition"
                             :model="formLabelAlign"
                             ref="elForm"
                             >
                        <el-form-item label="文件名称" required>
                            <el-input v-model.trim="formLabelAlign.fileName"></el-input>
                        </el-form-item>
                        <el-form-item label="文件类型" required>
                            <el-select v-model="formLabelAlign.fileType">
                                <el-option
                                        v-for="item in selectList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="文件" v-show="formLabelAlign.fileType!==2">
                            <el-upload
                                    ref="upload"
                                    class="upload-demo"
                                    :action=url
                                    :data=formLabelAlign
                                    name="picFile"
                                    :auto-upload="false"
                                    :on-change="handleChange"
                                    :on-remove="handleRemove"
                                    :on-success="finsh"
                                    :on-error="fail"
                                    :before-upload="beforeAvatarUpload"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list=fileList>
                                <el-button size="small" type="primary">上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="文本">
                            <el-input type="textarea" :disabled="formLabelAlign.fileType!==2?true:false" v-model.trim="formLabelAlign.fileContent" placeholder="......"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="remark">
                        备注：图片格式：jpeg、png、jpg；视频格式：ogg、mp4
                    </div>
                </div>
                <div class="bt">
                    <div class="qure" @click="sure(formLabelAlign)">
                        <img src="../images/courtsupervision/sure.png" />确定
                    </div>

                    <div class="cancel" @click="cancel">
                        <img src="../images/courtsupervision/cancel.png" />取消
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery"
    import axios from 'axios';
    import AlertleftTile from "../component/AlertleftTile"
    import getApiUrl from "../js/getApiUrl"
    import FoundationTools from '../../../../js/functionAjax'
    export default {
        name: "addotherAlert2",
        props:{
            alertshow:Boolean,
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加',
                text2:'请填写详细信息',
                labelPosition: 'left',
                selectList:[{id:1,name:'图片'},{id:2,name:'文字'},{id:3,name:'视频'}],
                url:getApiUrl('/partyLoginConfig/savePartyLoginConfig'),
                formLabelAlign: {
                    userId:JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid,
                    courtCode:Number(sessionStorage.getItem('hx-lawcourtcode')),
                    fileName: '',//文件名称
                    fileType:1,//文件类型
                    id:'',
                    fileContent:'',//文字内容,
                },
                file:'',
                isUpload:false,
                fileList:[],
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
                this.file='';
                this.formLabelAlign.autoplay=this.$parent.autoplay;
                if(this.$parent.intervalTime){
                    this.formLabelAlign.intervalTime=this.$parent.intervalTime;
                }else{
                    this.formLabelAlign.intervalTime='';
                }
                if(row){
                    this.text='修改';
                    this.formLabelAlign.fileName=row.fileName;
                    this.formLabelAlign.fileType=row.fileType;
                    //this.formLabelAlign.picFile='';
                    this.formLabelAlign.id=row.id;
                    this.formLabelAlign.fileContent=row.fileContent;
                    if(row.fileType===2){
                        this.isUpload=false;
                    }else{//是图片
                        this.isUpload=true;
                    }
                }else{
                    this.text='添加';
                    this.formLabelAlign.fileName='';//文件名称
                    this.formLabelAlign.fileType=1;//文件类型
                    //this.formLabelAlign.picFile='';
                    this.formLabelAlign.id='';
                    this.formLabelAlign.fileContent='';//文字内容
                }
            },
            beforeAvatarUpload(file){
                let isShow=true,
                    toL=file.type.toLowerCase();
                //文件类型进行判断
                if(this.formLabelAlign.fileType===1){
                    if (toL !== "image/jpeg" && toL !== "image/jpg" && toL !== "image/png") {
                        this.$msgw("上传图片格式不支持!");
                        isShow=false
                    }
                }else if(this.formLabelAlign.fileType===3){
                    if(toL){
                        if (toL !== "video/mp4" && toL !== "video/ogg" && toL !== "audio/ogg") {
                            this.$msgw("上传视频格式不支持!");
                            isShow=false
                        }
                    }
                }
                console.log(file)
                return isShow
            },
            //上传成功
            finsh(){
                this.$msgs("保存成功")
                this.$parent.ismain=false;
                this.$parent.select()
            },
            fail(){
                this.$msgw("文件上传失败")
            },
            handleChange(file,fileList) {//文件改变时的钩子，成功或失败都会调用
                this.file=1;
            },
            handleRemove(file, fileList) {//移除事件前的钩子
                this.file='';
            },
            handleExceed(files, fileList) {//文件超出个数限制时的钩子
                this.$msgw('目前只支持上传一个文件');
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            sure(formLabelAlign) {
                if(!formLabelAlign.fileName){
                    this.$msgw("请输入文件名称")
                    return false
                }
                if(formLabelAlign.id){//修改
                    if(formLabelAlign.fileType===2){
                        if(!formLabelAlign.fileContent){
                            this.$msgw("请输入文本内容")
                            return false
                        }
                        let fd = new FormData();
                        const _this=this;
                        fd.append("userId", JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid);
                        fd.append("courtCode",Number(sessionStorage.getItem('hx-lawcourtcode')));
                        fd.append("fileName",formLabelAlign.fileName);
                        fd.append("fileType",formLabelAlign.fileType);
                        fd.append("id",formLabelAlign.id);
                        fd.append("fileContent",formLabelAlign.fileContent);
                        fd.append("picFile",'');
                        fd.append("autoplay",formLabelAlign.autoplay);
                        fd.append("intervalTime",formLabelAlign.intervalTime);
                        $.ajax({
                            url: _this.url,
                            type: 'POST',
                            data: fd,
                            dataType: 'JSON',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success:function (data) {
                                if(data.code===200){
                                    _this.$msgs("保存成功")
                                    _this.$parent.ismain=false;
                                    _this.$parent.select()
                                }else{
                                    _this.$msgw(data.message)
                                }
                            }
                        });
                    }else{
                        if(this.file){
                            formLabelAlign.fileContent='';
                            this.$refs.upload.submit()
                        }else{
                            if(this.isUpload){//是图片
                                let fd = new FormData();
                                const _this=this;
                                fd.append("userId", JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid);
                                fd.append("courtCode",Number(sessionStorage.getItem('hx-lawcourtcode')));
                                fd.append("fileName",formLabelAlign.fileName);
                                fd.append("fileType",formLabelAlign.fileType);
                                fd.append("id",formLabelAlign.id);
                                fd.append("fileContent",formLabelAlign.fileContent);
                                fd.append("picFile",'');
                                fd.append("autoplay",formLabelAlign.autoplay);
                                fd.append("intervalTime",formLabelAlign.intervalTime);
                                $.ajax({
                                    url: _this.url,
                                    type: 'POST',
                                    data: fd,
                                    dataType: 'JSON',
                                    cache: false,
                                    processData: false,
                                    contentType: false,
                                    success:function (data) {
                                        if(data.code===200){
                                            _this.$msgs("保存成功")
                                            _this.$parent.ismain=false;
                                            _this.$parent.select()
                                        }else{
                                            _this.$msgw(data.message)
                                        }
                                    }
                                });
                            }else{
                                this.$msgw("请上传文件")
                            }
                        }
                    }
                }else{//添加
                    if(formLabelAlign.fileType===2){
                        if(!formLabelAlign.fileContent){
                            this.$msgw("请输入文本内容")
                            return false
                        }
                        let fd = new FormData();
                        const _this=this;
                        fd.append("userId", JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid);
                        fd.append("courtCode",Number(sessionStorage.getItem('hx-lawcourtcode')));
                        fd.append("fileName",formLabelAlign.fileName);
                        fd.append("fileType",formLabelAlign.fileType);
                        fd.append("id",formLabelAlign.id);
                        fd.append("fileContent",formLabelAlign.fileContent);
                        fd.append("picFile",'');
                        fd.append("autoplay",formLabelAlign.autoplay);
                        fd.append("intervalTime",formLabelAlign.intervalTime);
                        $.ajax({
                            url: _this.url,
                            type: 'POST',
                            data: fd,
                            dataType: 'JSON',
                            cache: false,
                            processData: false,
                            contentType: false,
                            success:function (data) {
                                if(data.code===200){
                                    _this.$msgs("保存成功")
                                    _this.$parent.ismain=false;
                                    _this.$parent.select()
                                }else{
                                    _this.$msgw(data.message)
                                }
                            }
                        });
                    }else{
                        if(this.file){
                            formLabelAlign.fileContent='';
                            this.$refs.upload.submit()
                            //this.$parent.ismain=false;
                        }else{
                            this.$msgw("请上传文件")
                        }
                    }
                }
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addotherAlert2{
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
                .el-textarea{
                    width:4rem;
                }
                .remark{
                    .f16();
                    color:red;
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>