<template>
    <div class="typeShow">
        <div v-if="type==='PDF'">
            <pdf-show ref="pdfShow" :pdfUrl="pdfUrl">
            </pdf-show>
        </div>
        <div v-else-if="type==='IMG'">
            <img-show ref="imgShow" :imgUrl="imgUrl">
            </img-show>
        </div>
        <div v-else-if="type==='MP3'">
            <audio-show ref="audioShow" :mp3Url="mp3Url">
            </audio-show>
        </div>
        <div v-else-if="type==='MP4'">
            <video-show ref="videoShow" :mp4Url="mp4Url">
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
        props:['type','imgUrl','mp3Url','mp4Url','pdfUrl'],
        components:{
            imgShow,
            audioShow,
            videoShow,
            pdfShow,
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        watch:{

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
    .typeShow {
        display: flex;
        justify-content: center;
        align-items: center;
        width:75vw;
        height:calc(100vh - 50px);
        overflow: auto;
        .title-info{
            /*text-align:center;
            margin-bottom:10px;
            .f16();*/
        }
        .color-2f8ded{
            text-align: center;
            color: #C0C4CC;
            .f24();
        }
    }
</style>
<style lang="less">

</style>