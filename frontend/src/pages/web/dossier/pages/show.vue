<template>
    <transition name="slide-fade">
        <div class="show">
            <head-title
                    ref="headTitle"
                    :caseNumber="caseNumber"
                    :selected.sync="newAddisAuthorization"
                    @closePage="closePage"
                    @saveInfo="saveInfo"
                    @editInfo="editInfo"
            />
            <div class="main">
                <div class="main-left">
                    <searchModule
                        @inputKeyWord="inputKeyWord"
                        />
                    <case-tree
                        ref="caseTree"
                        @handleNodeClick="handleNodeClick"
                        :editBoolen="editBoolen"
                        :resdata="resdata"
                        :treeArr="treeArr">
                    </case-tree>
                </div>
                <type-show
                        :type="type"
                        :fileUrl="fileUrl"
                />
            </div>
        </div>
    </transition>
</template>

<script>
    import recursion from '../js/recursion'
    const headTitle=()=>import("../show/headTitle")
    const searchModule=()=>import("../show/searchModule")
    const caseTree=()=>import('../component/caseTree')
    const typeShow=()=>import('../detail/typeShow')
    import Tools from '../js/tools'
    import getApiUrl from "../js/getApiUrl"
    export default {
        name: "show",
        components:{
            headTitle,
            searchModule,
            caseTree,
            typeShow
        },
        data() {
            return {
                editBoolen:true,
                treeArr:[],
                resdata: [],
                fileUrl:'',
                keyWord:null,
                caseNumber:null,
                type:'',
                newAddisAuthorization:false
            }
        },
        async created() {
            this.$showLoading()
            sessionStorage.setItem('userId',this.$route.query.userId)
            if(this.$route.query.caseNumber)this.caseNumber=this.$route.query.caseNumber;
            else this.$msgw('url中没有获取到案号信息')
            await this.dossierInfo()
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
            editInfo(){
                this.editBoolen=false
                this.filterNum(false)
            },
            filterNum(num){
                this.treeArr=[]
                let selectArr=[];
                recursion(this.resdata,num,this.treeArr,selectArr)
                this.$refs.caseTree.$refs.tree.setCheckedKeys(selectArr)
            },
            async handleNodeClick(data){
                if(data.isFile){
                    let fileId=data.id
                    let fileType=data.fileForm?String(data.fileForm).toLowerCase():'';
                    const IMG=['bmp','jpg','png','gif','jpeg','svg','webp'],
                        MP3=['mp3','wma'],
                        MP4=['mp4'],
                        PDF=['doc','docx','pdf'];
                    if(['bmp','jpg','png','gif','jpeg','svg','webp','mp3','wma','mp4','ogg','doc','docx','pdf'].includes(fileType)){
                        this.type=IMG.includes(fileType)?'IMG':MP3.includes(fileType)?'MP3':MP4.includes(fileType)?'MP4':'PDF';
                        this.$showLoading()
                        if(this.type==='PDF'){
                            //let res=await this.$http.post('/dossier/pdfFileInfo',{fileId})
                            this.$hideLoading()
                            this.fileUrl=getApiUrl('/dossier/getPdfFileInfo?fileId='+fileId)
                            //if(res)this.fileUrl=this.getObjectURL(new Blob([res]));
                            //if(res)this.fileUrl=res;
                        }else{
                            let res=await this.$http.post('/dossier/fileInfo',{fileId})
                            if(res)this.fileUrl=res.data.fileUrl;
                            this.$hideLoading()
                        }
                    }else{
                        this.type='';
                    }
                }
            },
            // 处理文件流
            getObjectURL(file) {
                let url = null
                if (window.createObjectURL !== undefined) { // basic
                    url = window.createObjectURL(file)
                } else if (window.webkitURL !== undefined) { // webkit or chrome
                    try {
                        url = window.webkitURL.createObjectURL(file)
                    } catch (error) {
                        console.log(error)
                    }
                } else if (window.URL !== undefined) { // mozilla(firefox)
                    try {
                        url = window.URL.createObjectURL(file)
                    } catch (error) {
                        console.log(error)
                    }
                }
                return url
            },
           async dossierInfo(){
                let {caseNumber}=this;
                let res=await this.$http.post('/dossier/dossierInfo',{caseNumber})
               if(res){
                   this.resdata=res.data.dossierInfos;
                   this.newAddisAuthorization=res.data.newAddisAuthorization
                   if(!res.data.dossierInfos)this.filterNum(false)
                   else this.filterNum(true)
                   this.$nextTick(()=>{
                       if(this.resdata.length>0){
                           this.$refs.caseTree.$refs.tree.setCurrentKey(this.resdata[0].id);
                       }
                   })
               }
            },
            async saveInfo(){
                let {caseNumber,newAddisAuthorization}=this;
                let dossierIdList=this.$refs.caseTree.$refs.tree.getCheckedKeys(),
                    caseNumberList=[];
                caseNumberList=this.resdata.map(item=>{
                    return item.catalogId
                })
                let res=await this.$http.post('/dossier/saveDossierInfo',{caseNumber,newAddisAuthorization,dossierIdList,caseNumberList},'正在保存...')
                this.$refs.headTitle.disabled=true
                this.editBoolen=true
                //this.filterNum(true)
                if(res)this.$msgs('保存成功')
                this.dossierInfo()
                return res
            },
            closePage(){
                if(this.newAddisAuthorization){
                    this.$confirm('尚未保存授权结果，是否保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(Tools.isIE()){
                            this.saveInfo().then(()=>{
                                window.close()
                            })
                        }else{
                            this.saveInfo().then(()=>{
                                window.location.href="about:blank";
                                window.close();
                            })
                        }

                    }).catch(() => {
                        if(Tools.isIE()){
                            window.close()
                        }else{
                            window.location.href="about:blank";
                            window.close();
                        }
                    });
                }else{
                    if(Tools.isIE()){
                        window.close()
                    }else{
                        window.location.href="about:blank";
                        window.close();
                    }
                }
            },

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
                height:calc(95vh - 60px);
                overflow: auto;
                border-right: 1px solid #DCDFE6;
                padding-bottom:20px;
            }
        }
    }
</style>
<style lang="less">
    @import url('../css/common.less');
    .show{
        .el-tree .el-tree-node__label {
            width:25vw;
            overflow: auto;
        }
        .el-button {
            padding: 0 10px;
            line-height:34px;
            span {
                .f16();
                color: #fff;
            }
        }
        .el-input__inner{
            padding-right:30px;
        }
        .el-icon-folder:before{
            .f16();
            color: #fff;
        }
        .el-icon-edit-outline:before {
            .f16();
            color: #2F8DEE;
        }
        .icon{
            .edit-icon{
                border:2px solid #92c2f4;
                span{
                    color:#2F8DEE;
                }
            }
        }
    }
</style>