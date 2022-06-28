<template>
    <div class="pdfShow">
        <div class="arrow">
            <el-button type="primary" size="small"  @click="scaleD" :disabled="scale>=100?true:false">放大</el-button>
            <el-button type="primary" size="small" @click="scaleX" :disabled="scale<=20?true:false">缩小</el-button>
            <el-button type="primary" size="small" @click="changePdfPage(0)" :disabled="currentPage<=1?true:false" >上一页</el-button>
            {{currentPage}} / {{pageCount}}
            <el-button type="primary" size="small" @click="changePdfPage(1)" :disabled="currentPage==pageCount?true:false">下一页</el-button>
        </div>
        <pdf
                :src="pdfUrl"
                class="pdf_show"
                ref="wrapper"
                :page="currentPage"
                @num-pages="pageCount=$event"
                @page-loaded="currentPage=$event"
                @loaded="loadPdfHandler"
                @error="errorLoaded">
        </pdf>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'
    export default {
        name: "pdfShow",
        components:{
            pdf
        },
        props:['pdfUrl'],
        data() {
            return {
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                fileType: 'pdf', // 文件类型
                scale:100
            }
        },
        watch:{

        },
        computed: {},
        created() {
            // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
            //this.src = pdf.createLoadingTask(this.src)
        },
        mounted() {

        },
        methods:{
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage (val) {
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                }
                if (val === 1 && this.currentPage < this.pageCount) {
                    this.currentPage++
                }
            },

            // pdf加载时
            loadPdfHandler (e) {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
            //放大
            scaleD() {
               if(this.scale<100){
                   this.scale += 5;
                    //this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
                   this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
               }
            },

            //缩小
            scaleX() {
                if(this.scale == 20) {
                    return;
                }
                this.scale += -5;
                this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
                //this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
            },
            errorLoaded(){
                //this.$msgw("pdf加载失败")
                console.log("pdf加载失败")
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .pdfShow{
        width:74vw;
        height:calc(95vh - 60px);
        overflow: auto;
        position:relative;
        .arrow{
            padding:5px 20px;
            height:40px;
        }
        .pdf_show{
            height:calc(95vh - 100px);
            overflow:auto;
        }
    }
</style>
<style lang="less">
    .pdfShow{
        .el-button {
            padding: 0 10px;
            line-height: 25px;
        }
    }
</style>