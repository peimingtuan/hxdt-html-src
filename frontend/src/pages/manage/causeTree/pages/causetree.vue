<template>
    <transition name="slide-fade">
        <div class="causetree">
            <div class="box-div">
                <el-input v-model.trim="caseNumber" placeholder="请输入案号"></el-input>
                <el-button @click="getCauseTree(caseNumber)">搜索</el-button>
            </div>
            <div class="menu">
                <!--树形菜单-->
                <el-tree
                        :props="defaultProps"
                        :data="data"
                        icon-class="false"
                        default-expand-all="true"
                        ref="tree"
                        node-key="id"
                        @node-click="handleNodeClick">
                     <div class="custom-tree-node" slot-scope="{ node, data }">
                         <span v-if="data.isParent">
                             <i v-if="!data.isShow" class="el-icon-circle-plus-outline"></i>
                             <i v-else class="el-icon-remove-outline"></i>
                             <i class="el-icon-message"></i></span>
                         <span v-else><i class="el-icon-document
"></i></span>
                         <span>{{node.label}}</span>
                     </div>
                </el-tree>
            </div>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery"
    import getApiUrl from "../js/getApiUrl"
    import {Indicator} from 'mint-ui'
    export default {
        name: "causetree",
        data() {
            return {
                caseNumber:null,
                //树配置
                defaultProps: {
                    children:'children',
                    label:'name',
                    //isLeaf:'hasChildren'
                },
                data:[]
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        watch:{

        },
        methods: {
            //选中当前节点
            handleNodeClick(data) {
                data.isShow=!data.isShow;
            },
            getCauseTree(caseNumber){
                const that=this;
                if(!caseNumber){
                    that.$msgw("请输入案号！")
                    return
                }
                Indicator.open({text: '正在查询...', spinnerType: 'fading-circle'})
                $.ajax({
                    type : "get",
                    data : null,//JSON.stringify(param),
                    url : location.href.split('/causeTree')[0]+'/getDossiers?caseNumber='+caseNumber,
                    contentType : "application/json",
                    dataType : "json",
                    timeout:30000,
                    success : function(data) {
                        Indicator.close()
                        if (data.code === 200) {
                            that.data=data.data;
                        } else {
                            that.$msgw(data.message);
                        }
                    },
                    error : function(err) {
                        Indicator.close()
                        that.$msge("连接服务器失败，请稍后再试");
                    }
                });
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .causetree{
        margin:.2rem;
        .box-div{
            margin:.5rem 0;
            .fl();
            .el-input {
                width: 5rem;
                .el-input__inner {
                    height: 0.5rem;
                    line-height: 0.5rem;
                    padding: 0 0.15rem;
                    .f18();
                }
            }
            .el-button {
                margin-left:.5rem;
                width:1.5rem;
                position: relative;
                top: -.02rem;
                line-height: .5rem;
                padding: 0;
                background:#409eff;
                span {
                    .f18();
                    color: #fff;
                }
            }
        }
        .menu {
            .el-tree{
                min-height:4rem;
                /*max-height:6rem;*/
                overflow: auto;
                /*background: #eceff0;*/
                .el-tree-node__content {
                    height: .58rem;
                    .el-tree-node__label {
                        width: 4.7rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .f22();
                    }
                    /*icon*/
                    .el-icon-circle-plus-outline,.el-icon-remove-outline{
                        color: #c0c4cc;
                        .f22()
                    }
                    .el-icon-caret-right:before {
                        .f22();
                    }
                    .el-icon-message:before{
                        color:#f6e794;
                        .f22();
                    }
                    .el-icon-document:before{
                        color:#e8f5fe;
                        .f22();
                    }
                }
            }
        }
    }
</style>