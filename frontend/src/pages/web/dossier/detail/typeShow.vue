<template>
    <div class="main-right">
        <div v-if="type==='PDF'">
            <pdf-show ref="pdfShow" :pdfUrl="fileUrl">
            </pdf-show>
        </div>
        <div v-else-if="type==='IMG'">
            <img-show ref="imgShow" :url="fileUrl">
            </img-show>
        </div>
        <div v-else-if="type==='MP3'">
            <audio-show ref="audioShow" :url="fileUrl">
            </audio-show>
        </div>
        <div v-else-if="type==='MP4'">
            <video-show ref="videoShow" :url="fileUrl">
            </video-show>
        </div>
        <div v-else class="color-2f8ded">
            <img src="../images/emptyform.png"/><br/><br/>
            当前文件格式暂不支持
        </div>
    </div>
</template>

<script>
    const pdfShow=()=>import('./pdfShow')
    const imgShow=()=>import('./imgShow')
    const audioShow=()=>import('./audioShow')
    const videoShow=()=>import('./videoShow')
    export default {
        name: "typeShow",
        props:['type','fileUrl'],
        components:{
            imgShow,
            audioShow,
            videoShow,
            pdfShow
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .main-right {
        display: flex;
        justify-content: center;
        align-items: center;
        width:75vw;
        height:calc(95vh - 60px);
        overflow: auto;
       /* .title-info{
            text-align:center;
            margin-bottom:10px;
            .f16();
        }*/
        .color-2f8ded{
            text-align: center;
            color: #C0C4CC;
            .f24();
        }
    }
</style>
<style lang="less">

</style>