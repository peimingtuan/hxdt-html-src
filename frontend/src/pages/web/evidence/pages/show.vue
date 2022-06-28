<template>
    <transition name="slide-fade">
        <div class="show">
            <spring-box :textInfo="text1" :alertShow.sync="returnShow" @sure="saveBackInfo">
                <return-content
                        ref="returnContent"
                        :returnLabelList="returnLabelList"
                        @removeItem="removeItem"
                        @addItem="addItem"
                />
            </spring-box>
            <spring-box :textInfo="text2" :alertShow.sync="signShow" @sure="saveSignInfo">
                <sign-content
                    ref="signContent"
                    :dossierChildrens="dossierChildrens"
                    :tableData="tableData"
                    @nodeClick="nodeClick"
                />
            </spring-box>
            <div class="main">
                <div class="main-left">
                    <searchModule
                        @inputKeyWord="inputKeyWord"
                        />
                    <case-tree
                        ref="caseTree"
                        @setAutoSign="setAutoSign"
                        @handleNodeClick="handleNodeClick"
                        :resdata="resdata"
                        >
                    </case-tree>
                </div>
                <div class="main-right" v-if="fileList.length===0">
                    <head-title
                            v-show="type"
                            :currentState="currentState"
                            @returnInfo="returnInfo"
                            @sign="sign"
                    />
                    <type-show
                            :type="type"
                            :imgUrl="imgUrl"
                            :mp3Url="mp3Url"
                            :mp4Url="mp4Url"
                            :pdfUrl="pdfUrl"
                    />
                </div>
                <div class="main-right" v-else>
                    <files-show
                        :fileList="fileList"
                        @checkDetail="checkDetail"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    //import recursion from '../js/recursion'
    const headTitle=()=>import("../show/headTitle")
    const searchModule=()=>import("../show/searchModule")
    const caseTree=()=>import('../component/caseTree')
    const typeShow=()=>import('../detail/typeShow')
    const springBox=()=>import("../component/springBox")
    const returnContent=()=>import("../show/returnContent")
    const signContent=()=>import("../show/signContent")
    const filesShow=()=>import('../detail/filesShow')
    import getApiUrl from "../js/getApiUrl"
    export default {
        name: "show",
        components:{
            headTitle,
            searchModule,
            caseTree,
            typeShow,
            springBox,
            returnContent,
            signContent,
            filesShow
        },
        data() {
            return {
                returnShow:false,
                signShow:false,
                resdata:[],
                imgUrl:'',
                mp3Url:'',
                mp4Url:'',
                pdfUrl:'',
                keyWord:null,
                caseNumber:null,
                type:'',
                fileList:[],
                currentState:'',
                returnLabelList:[],
                text1:'退回理由',
                text2:'请选择签收文件所保存的电子卷宗目录',
                dossierChildrens:[],
                tableData:[],
                dataInfo:null,//当前点击的证据树data
                evidencefileId:'',//证据树文件ID
                catalogId:'',//权限树目录id
            }
        },
        async created() {
            this.$showLoading()
            sessionStorage.setItem('userId',this.$route.query.userId)
            if(this.$route.query.caseNumber)this.caseNumber=this.$route.query.caseNumber;
            else this.$msgw('url中没有获取到案号信息')
            await this.edvienceInfo()
            this.$hideLoading()
        },
        mounted() {

        },
        destroyed() {

        },
        updated(){

        },
        watch: {

        },
        methods: {
            inputKeyWord(val){
                this.$refs.caseTree.$refs.tree.filter(val);
            },
            async setAutoSign(autoSign){
                    let {caseNumber}=this
                    let res=await this.$http.post('/newSubmitEvience/autoSignEvidence',{autoSign,caseNumber},'加载中...')
                if(res){
                    if(autoSign)this.edvienceInfo()
                }
            },
            handleNodeClick(data){
                this.checkDetail(data,false)
            },
            async checkDetail(data,bo){
                if(bo)this.$refs.caseTree.$refs.tree.setCurrentKey(data.id);
                if(data.isFile){
                    this.dataInfo=data;
                    this.currentState=data.currentState;
                    this.fileList=[];
                    this.evidencefileId=data.id
                    let fileType=data.fileType?data.fileType.toLowerCase():'';
                    const IMG=['bmp','jpg','png','gif','jpeg','svg','webp'],
                        MP3=['mp3','wma'],
                        MP4=['mp4','ogg'],
                        PDF=['doc','docx','pdf'];
                    this.type=IMG.includes(fileType)?'IMG':MP3.includes(fileType)?'MP3':MP4.includes(fileType)?'MP4':'PDF';
                    if(['bmp','jpg','png','gif','jpeg','svg','webp','mp3','wma','mp4','ogg','doc','docx','pdf'].includes(fileType)){
                        this.$showLoading()
                        if(this.type==='PDF'){
                            this.$hideLoading()
                            this.pdfUrl=getApiUrl('/newSubmitEvience/getNewSubmitEvidencePdfFile?fileId='+this.evidencefileId)
                        }else{
                            let res=await this.$http.post('/newSubmitEvience/getNewSubmitEvidenceFile',{fileId:this.evidencefileId})
                            this.$hideLoading()
                            if(res){
                                if(this.type==='IMG')this.imgUrl=res.data.fileUrl;
                                if(this.type==='MP3')this.mp3Url=res.data.fileUrl;
                                if(this.type==='MP4')this.mp4Url=res.data.fileUrl;
                            }
                        }
                    }else{
                        this.type='';
                    }
                }else{
                    this.fileList=data.fileChildrens;
                }
            },
            async edvienceInfo(){
                let {caseNumber}=this;
                let res=await this.$http.post('/newSubmitEvience/getNewSubmitEvienceInfo',{caseNumber})
               if(res){
                   this.resdata=res.data.evidenceCatalogInfos;
                   this.$nextTick(()=>{
                       this.$refs.caseTree.checked=res.data.autoSign
                       if(this.resdata.length>0){
                           this.$refs.caseTree.$refs.tree.setCurrentKey(this.resdata[0].id);
                           this.fileList=this.resdata[0].fileChildrens;
                       }
                   })
               }
            },
            //回退
            async returnInfo(){
                this.returnShow=true;
                let res=await this.$http.post('/newSubmitEvience/getReturnReasonInfo',{},'加载中...')
                if(res)this.returnLabelList=res.data.returnLabelList;
            },
            async removeItem(id,index){
                let res=await this.$http.post('/newSubmitEvience/deleteReturnReason',{id},'加载中...')
                if(res){
                    this.$msgs('删除成功')
                    this.returnLabelList.splice(index,1)
                }
            },
            async addItem(keyWord){
                let res=await this.$http.post('/newSubmitEvience/addReturnReason',{labelName:keyWord},'保存中...')
                if(res){
                    this.$msgs('添加成功')
                    this.returnLabelList.push({id:res.data.id,labelName:keyWord})
                }
            },
            async saveBackInfo(){
                let backReason=this.$refs.returnContent.backReason;
                if(!backReason){
                    this.$confirm('请输入退回理由！', '提示信息', {
                        confirmButtonText: '确定',
                        showCancelButton:false,
                        type: 'warning'
                    }).then(() => {}).catch(() => {});
                    return
                }
                let res=await this.$http.post('/newSubmitEvience/backReason',{backReason,fileId:this.evidencefileId},'正在提交...')
                if(res){
                    this.$msgs('回退成功')
                    this.dataInfo.currentState=3;
                    this.currentState=3;
                    this.returnShow=false;
                    this.$refs.returnContent.backReason='';
                }
            },
            //签收
            async sign(){
                let {caseNumber}=this;
                this.signShow=true;
                let res=await this.$http.post('/newSubmitEvience/getDossierTreeInfo',{caseNumber},'加载中...')
                if(res)this.dossierChildrens=res.data.dossierInfos;
            },
            async nodeClick(data){
                this.catalogId=data.catalogId;
                let res=await this.$http.post('/newSubmitEvience/getDossierFile',{catalogId:this.catalogId},'加载中...')
                if(res){
                    this.tableData=res.data.fileList;
                }
            },
            async saveSignInfo(){
                    if(!this.$refs.signContent.keyWord){
                        this.$confirm('请选择目录！', '提示信息', {
                            confirmButtonText: '确定',
                            showCancelButton:false,
                            type: 'warning'
                        }).then(() => {}).catch(() => {});
                        return
                    }
                let {caseNumber,catalogId,evidencefileId}=this
                let res=await this.$http.post('/newSubmitEvience/manualSignEvidence',{caseNumber,catalogId,fileId:evidencefileId},'正在提交...')
                if(res){
                    this.$msgs('操作成功')
                    this.dataInfo.currentState=2;
                    this.currentState=2;
                    this.signShow=false;
                    this.$refs.signContent.keyWord='';
                    this.tableData=[];
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .show{
        .wh(100vw,100vh);
        min-width:700px;
        .main{
            .fb();
            &-left{
                width:25vw;
                height:100vh;
                overflow: auto;
                border-right: 1px solid #DCDFE6;
                padding-bottom:20px;
            }
            &-right{
                /*width:75vw;*/
                /*height:calc(100vh - 50px);*/
            }
        }
    }
</style>
<style lang="less">
    @import url('../css/common.less');
    .show{
        .el-button {
            padding: 0 20px;
            line-height:34px;
            span {
                .f18();
                color: #fff;
            }
        }
        .el-tree .el-tree-node__label {
            width:25vw;
            overflow: auto;
        }
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
            background: #E4E7ED;
        }
    }
</style>