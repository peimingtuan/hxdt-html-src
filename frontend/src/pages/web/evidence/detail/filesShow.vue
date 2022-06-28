<template>
    <div class="filesShow">
        <div v-for="(item,index) in fileList" :key="index" @click="checkDetail(item)">
            <img class="icon-img" v-if="item.isFile" :src="choiceIcon(item.currentState)" />
            <img v-if="item.isFile" :src="choiceType(item.fileType)" />
            <img v-else src="../images/files/file.png"/><br/>
            <span>{{item.catalogName}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "filesShow",
        props:{
          fileList:Array
        },
        data() {
            return {
                IMG:['bmp','jpg','png','gif','jpeg','svg','webp'],
                MP3:['mp3','wma','amr'],
                MP4:['mp4','ogg'],
                PDF:['doc','docx','pdf']
            }
        },
        created() {
        },
        mounted() {
        },
        computed:{

        },
        methods: {
            choiceIcon(v){
                let URL=null;
                switch(Number(v)){
                    case 1:
                        URL=require('../images/icon-D.png');
                        break;
                    case 2:
                        URL=require('../images/icon-S.png');
                        break;
                    case 3:
                        URL=require('../images/icon-T.png');
                        break;
                }
                return URL
            },
            choiceType(fileType){
                let val=fileType?fileType.toLowerCase():'';
                let {IMG,MP3,MP4,PDF}=this;
                let type=IMG.includes(val)?'IMG':MP3.includes(val)?'MP3':MP4.includes(val)?'MP4':PDF.includes(val)?'PDF':'';
                let URL=null;
                switch(type){
                    case 'IMG':
                        URL=require('../images/files/img.png');
                        break;
                    case 'MP3':
                        URL=require('../images/files/mp3.png');
                        break;
                    case 'MP4':
                        URL=require('../images/files/mp4.png');
                        break;
                    case 'PDF':
                        URL=require('../images/files/pdf.png');
                        break;
                    default:
                        URL=require('../images/files/nofine.png');
                }
                return URL
            },
            checkDetail(item){
                this.$emit("checkDetail",item,true)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .filesShow {
        width:75vw;
        height:100vh;
        overflow: auto;
        display:flex;
        justify-content:flex-start;
        flex-wrap:wrap;
        align-content: flex-start;
        &>div{
            position:relative;
            margin:20px;
            text-align: center;
            cursor:pointer;
            span{
                display: inline-block;
                line-height:40px;
                max-width:200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .icon-img{
                position:absolute;
                right:-10px;
                top:-8px;
            }
        }
    }
</style>
<style lang="less">

</style>