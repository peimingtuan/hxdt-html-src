<template>
    <div class="auditModule2">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" :textInfo="textInfo" @sure="alertShow=false">
            <player-detail ref="playerDetail"/>
        </spring-box>
        <div class="auditModule2-top">
            <div class="title">二维码设置</div>
            <div class="box">
                <div class="box-img">
                    <img v-if="qrcodeUrl" :src="qrcodeUrl" />
                    <img v-else src="../../images/pangtingfuzhu/qrcode.png"/>
                </div>
            </div>
            <div class="btn">
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        action=""
                        accept=".png"
                        :file-list="fileList"
                        :show-file-list="false"
                        :http-request="uploadSectionFile"
                >
                    <el-button type="primary">更换二维码</el-button>
                </el-upload>
            </div>
        </div>
        <div class="auditModule2-bot">
            <div>
                <div class="title">
                    播放视频设置
                </div>
                <div>
                    <el-upload
                            ref="upload"
                            class="upload-demo"
                            :action=url
                            :data=dataform
                            accept=".mp4"
                            name="file"
                            :before-upload="beforeAvatarUpload"
                            :on-success="finsh"
                            :on-error="uploadError"
                            :file-list="fileList"
                            :show-file-list="false"
                    >
                        <el-button class="upload-btn" type="primary" icon="el-icon-plus">添加</el-button>
                    </el-upload>
                    <headBox :btnList="btnList" @del="del"/>
                </div>
            </div>
            <table-box :tableKey="tableKey" :maxHeight="maxHeight" :tableData="tableData" @handleSelectionChange="handleSelectionChange">
                <el-table-column slot="operate" label="操作" width="150">
                    <template slot-scope="scope">
                        <div class="isedit" @click="openVideo(scope.row.url)">
                            <img src="../../images/pangtingfuzhu/player.png"/>
                            <span>播放</span>
                        </div>
                    </template>
                </el-table-column>
            </table-box>
        </div>
    </div>
</template>

<script>
    import getApiUrl from "../../js/getApiUrl"
    import FoundationTools from '../../../../../js/functionAjax'
    export default {
        name: "auditModule2",
        components:{
            headBox: () => import("../../component/headBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            playerDetail:()=>import("./playerDetail")
        },
        data() {
            return {
                mainText:'视频播放',
                textInfo:"详细信息",
                alertShow:false,
                btnList:[
                    {name:'删除',event:'del',icon:'el-icon-delete'}
                    ],
                tableKey:[
                    {prop:'fileDescription',label:'视频列表',tooltip:true},
                    {slot: 'operate'}],
                maxHeight:250,
                tableData:[
                    {fileDescription:'第一视频'},
                    {fileDescription:'第一视频'}
                ],
                fileList:[],
                qrcodeUrl:'',
                selectList:[],
                dataform:{
                    courtCode:Number(sessionStorage.getItem('hx-lawcourtcode')),
                    userId:JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userid
                },
                url:getApiUrl('/chasInfoConfig/uploadVideoInfo'),
            }
        },
        watch:{
            alertShow(v){
                if(v===false)this.$refs.playerDetail.url=''
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            show(){
                Promise.all([this.getQrCodeUrl(),this.getVideoInfo()]).then(res=>{

                })
            },
            //获取旁听辅助二维码Url
            async getQrCodeUrl(){
                this.$showLoading('rgba')
                let res=await this.$http.post('/chasInfoConfig/getQrCodeUrl',{},true)
                this.$hideLoading('rgba')
                if(res)this.qrcodeUrl=res.data.url;
            },
            //获取旁听辅助视频信息
            async getVideoInfo(){
                this.$showLoading('rgba')
                let res=await this.$http.post('/chasInfoConfig/getVideoInfo',{},true)
                this.$hideLoading('rgba')
                if(res)this.tableData=res.data;
            },
            async uploadQrCode(qrCodeBase64,strBase64){
                let res=await this.$http.post('/chasInfoConfig/uploadQrCode',{qrCodeBase64},true,'正在上传...')
                if(res){
                    this.$msgs("上传成功!")
                    this.qrcodeUrl=strBase64;
                    //this.getQrCodeUrl();
                    this.$refs.upload.clearFiles()
                }
            },
            //上传二维码
            uploadSectionFile(file) {
                let _this = this;
                let pictureSuffix=null;
                if(file.file.name.split(".").length>1){
                    pictureSuffix = file.file.name.split(".")[
                    file.file.name.split(".").length - 1];
                    if(!['png'].includes(pictureSuffix.toLowerCase())){
                        _this.$msgw("仅支持png的图片")
                        _this.$refs.upload.clearFiles();
                        return
                    }
                }
                let fr = new FileReader();
                fr.readAsDataURL(file.file);
                fr.onload = function (e) {
                    _this.uploadQrCode(fr.result.split("base64,")[1],fr.result)
                };
            },
            handleSelectionChange(v){
                this.selectList=v;
            },
            del(){
                if(this.selectList.length===0){
                    this.$msgw("请勾选要删除的项")
                    return
                }
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let arr=this.selectList.map(item=>{
                        return item.fileName
                    })
                    let res=await  _this.$http.post('/chasInfoConfig/deleteVideoInfo', {
                        fileName:arr.toString()
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        _this.getVideoInfo();
                    }
                }).catch(() => {

                });
            },
            //上传视频
            beforeAvatarUpload(file){
                // 文件类型进行判断
                if(file.name){
                    if(file.name.split('.')[1].toLowerCase()!=='mp4'){
                        this.$msgw("视频只能上传mp4格式!");
                        return false
                    }
                }
                this.$showToast("正在上传...")
            },
            finsh(){
                this.$hideToast()
                this.$msgs("上传成功！")
                this.getVideoInfo()
            },
            uploadError(){
                this.$hideToast()
                this.$msgw("上传失败！")
            },
            openVideo(url){
                this.$refs.playerDetail.url=url;
                this.alertShow=true;
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../css/common.less");
    .auditModule2 {
        padding:.1rem 0;
        &-top{
            padding:.2rem;
            background:#fff;
            .title{
                .f20();
                color: #333333;
                line-height:30px;
                font-weight:600;
            }
            .box{
                .fc();
                height:25vh;
                &-img{
                    border: 1px solid #3F9EFF;
                    border-radius: 16px;
                    padding:5px;
                    img{
                        .wh(1.5rem;1.5rem)
                    }
                }
            }
            .btn{
                text-align: center;
            }
        }
        &-bot{
            &>div:first-child{
                .fb();
                .title{
                    .f20();
                    color: #333333;
                    line-height:30px;
                    padding:10px 0;
                    font-weight:600;
                }
                &>div:last-of-type{
                    padding-top:5px;
                    display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: flex-start;
                }
            }
            .isedit{
                img{
                    position: relative;
                    top:-.03rem;
                    width:.2rem;
                }
            }
        }
    }
</style>
<style lang="less">
    .auditModule2 {
        min-height:90vh;
        &-top{
            .el-button{
                width:1.7rem;
            }
        }
        &-bot{
            .upload-btn{
                margin-right:.1rem;
                line-height: .35rem;
                padding:0 .2rem;
                background:#edf5ff;
                border:1px solid #bedeff;
                i{
                    font-size:.18rem;
                    color:#409eff;
                }
                span {
                    font-size:.18rem;
                    color:#409eff;
                }
            }
        }
    }
</style>