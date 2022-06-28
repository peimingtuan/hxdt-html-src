<template>
    <div class="caseTree">
        <div class="all-check">
            <el-checkbox v-model="checked" @change="setState">自动签收</el-checkbox>
        </div>
        <el-tree
                :data=resdata
                node-key="id"
                icon-class="no"
                ref="tree"
                :filter-node-method="filterNode"
                :highlight-current="true"
                :default-expand-all="true"
                :expand-on-click-node="false"
                :props="defaultProps"
                @node-click="handleNodeClick"
                >
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <span v-if="data.isFile">
                    <img :src="choiceType(data.fileType)"/>
                </span>
                <span v-else>
                    <img src="../images/parent.png"/>
                </span>
                <span>{{node.label}}</span>
                <img v-if="data.isFile" class="img-icon" :src="currentState(data.currentState)"/>
            </div>
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "caseTree",
        props:{
            resdata:Array,
        },
        data() {
            return {
                checked:false,
                IMG:['bmp','jpg','png','gif','jpeg','svg','webp'],
                MP3:['mp3','wma','amr'],
                MP4:['mp4','ogg'],
                PDF:['doc','docx','pdf'],
                defaultProps: {
                    children: 'fileChildrens',
                    label: 'catalogName',
                }
            }
        },
        created() {
        },
        mounted() {

        },
        watch:{

        },
        methods: {
            setState(v){
                this.$emit('setAutoSign',v)
            },
            choiceType(fileType){
                let val=fileType?fileType.toLowerCase():'';
                let {IMG,MP3,MP4,PDF}=this;
                let type=IMG.includes(val)?'IMG':MP3.includes(val)?'MP3':MP4.includes(val)?'MP4':PDF.includes(val)?'PDF':'';
                let URL=null;
                switch(type){
                    case 'IMG':
                        URL=require('../images/directorys/img.png');
                        break;
                    case 'MP3':
                        URL=require('../images/directorys/mp3.png');
                        break;
                    case 'MP4':
                        URL=require('../images/directorys/mp4.png');
                        break;
                    case 'PDF':
                        URL=require('../images/directorys/pdf.png');
                        break;
                    default:
                        URL=require('../images/directorys/nofine.png');
                }
                return URL
            },
            currentState(v){
                let URL=null;
                switch(Number(v)){
                    case 2:
                        URL=require('../images/directorys/take.png');
                        break;
                    case 1:
                        URL=require('../images/directorys/dai.png');
                        break;
                    case 3:
                        URL=require('../images/directorys/sendBack.png');
                        break;
                }
                return URL
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.catalogName.indexOf(value) !== -1;
            },
            //选中当前节点
            handleNodeClick(data) {
                this.$emit('handleNodeClick',data)
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .caseTree{
        .all-check{
            padding-left:28px;
            margin-bottom:10px;
        }
    }
</style>
<style lang="less">
    @import url("../css/common.less");
    .caseTree {
        padding-left:5px;
        .el-checkbox__inner{
            .wh(18px,18px)
        }
        .el-checkbox__inner:after {
            height: 9px;
            left: 6px;
            width:5px;
        }
        .el-tree{
            width:100%;
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
            .el-tree-node>.el-tree-node__children{
                overflow: visible;
            }
            .el-tree-node__content{
                /*margin-bottom:10px;*/
                padding:10px 0;
                height:auto;
            }
            .el-tree__empty-block{
                span{
                    color: #2F8DED;
                }
            }
            .el-checkbox__input.is-indeterminate .el-checkbox__inner:before{
                top:7px;
            }
            .custom-tree-node{
                img{
                    width:20px;
                    position:relative;
                    top:-1px;
                }
                img.img-icon{
                    width:30px;
                    margin-left:20px;
                }
            }
        }
    }
</style>