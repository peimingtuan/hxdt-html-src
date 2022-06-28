<template>
    <div class="signContent">
        <div class="signContent-title">
            选择目录：
            <el-input class="files" v-model="keyWord" readonly></el-input>
        </div>
        <div class="signContent-box">
            <div class="signContent-box-left">
                <el-tree
                        :props="defaultProps"
                        :data="dossierChildrens"
                        icon-class="no"
                        ref="tree1"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        :highlight-current="true"
                        @node-click="nodeClick"
                >
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <img src="../images/parent.png"/>
                        <span>{{node.label}}</span>
                    </div>
                </el-tree>
            </div>
            <div class="signContent-box-right">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column label="文件名称" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="file-type-icon">
                                <img v-if="scope.row.isFile" :src=choiceType(scope.row.fileType) />
                                 <img v-else src="../images/parent.png"/>
                                {{scope.row.catalogName}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="文件类型">
                        <template slot-scope="scope">
                            <span>
                                {{scope.row.isFile?scope.row.fileType&&scope.row.fileType.toUpperCase()+'文件':'文件夹'}}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "signContent",
        props:{
            dossierChildrens:Array,
            tableData:Array
        },
        data() {
            return {
                IMG:['bmp','jpg','png','gif','jpeg','svg','webp'],
                MP3:['mp3','wma','amr'],
                MP4:['mp4','ogg'],
                PDF:['doc','docx','pdf'],
                keyWord:null,
                defaultProps: {
                    children: 'dossierChildrens',
                    label: 'catalogName',
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
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
            nodeClick(data){
                this.keyWord=data.catalogName;
                this.$emit('nodeClick',data)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .signContent {
        max-height:500px;
        overflow: auto;
        &-title{
            padding:10px 25px;
            background: #F0F2F5;
            border-bottom: 1px solid #C0C4CC;
            .files{
                width:600px;
            }
        }
        &-box{
            border-bottom: 1px solid #C0C4CC;
            padding:0 25px;
            max-height:500px;
            .f-s-b();
            &-left{
              width:40%;
                /*background: #FAFAFA;*/
                border-right: 1px solid #C0C4CC;
            }
            &-right{
                width:60%;
                padding-left:20px;
                max-height:400px;
                overflow: auto;
            }
        }
    }
</style>
<style lang="less">
    .signContent{
        .el-table:before{
            height:0;
        }
        thead{
            display: none;
        }
        tr td{
            border:none;
            span{
                color: #909399;
                img{
                    width:20px;
                    position:relative;
                    top:-1px;
                }
            }
            span.file-type-icon{
                color: #606266;
            }
        }
        .el-tree {
            width: 100%;
            min-height:200px;
            max-height: 400px;
            overflow: auto;
            .el-tree-node__expand-icon:not(.is-leaf){
                width:20px;
                height:20px;
                margin-right:5px;
                background:url("../images/close.png") no-repeat 50% 50%;
            }
            .expanded{
                background:url("../images/open.png") no-repeat 50% 50%!important;
                transform: rotate(360deg);
            }
            .custom-tree-node{
                img{
                    width:20px;
                    position:relative;
                    top:-1px;
                }
            }
            .el-tree-node>.el-tree-node__children{
                overflow: visible;
            }
            .el-tree-node__content{
                /*margin-bottom: 10px;*/
                padding:10px 0;
                height:auto;
            }
        }
    }
</style>