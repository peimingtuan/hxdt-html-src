<template>
    <div class="trialtabpane1">
        <div class="menu">
            <!--树形菜单-->
            <el-tree
                    :props="defaultProps"
                    :load="loadNode"
                    lazy
                    show-checkbox
                    @node-click="handleNodeClick"
                    @check-change="handleCheckChange">
            </el-tree>
        </div>
        <!--底部保存-->
        <div class="select-btn">
            <el-button type="primary" @click="leftselect">保存</el-button>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import {courtyardallocation} from "../js/datajson"
    export default {
        name: "trialtabpane1",
        data() {
            return {
                tableData:courtyardallocation.tableData,//庭室配置管理列表,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .trialtabpane1{
        .menu{
            /*width:4.7rem;*/
            /*height:10rem;*/
            /*overflow: auto;*/
            cursor:pointer;
            .el-tree-node__content{
                height:.58rem;
                .el-tree-node__label{
                    /*width:4.7rem;*/
                    /*overflow: hidden;*/
                    /*text-overflow: ellipsis;*/
                    /*white-space: nowrap;*/
                    .f22();
                }
                /*icon*/
                .el-icon-caret-right:before {
                    font-size: .2rem;
                }
                .el-checkbox__inner:before{
                    top: .07rem;
                    height: .02rem;
                }
            }
            /*span*/
            .el-tree-node__label{
                .f20();
                color: #303133;
            }
            /*checkbox*/
            .el-checkbox__inner{
                width:.18rem;
                height:.18rem;
            }
            /*选中*/
            .el-checkbox__inner:after{
                top: .02rem;
                left: .06rem;
                width: .04rem;
                height: .08rem;
            }
        }
        /*底部保存*/
        .select-btn{
            /*width:4.7rem;*/
            /*position:absolute;*/
            /*left:0;*/
            /*bottom:.1rem;*/
            margin-top:.5rem;
            text-align: center;
            .el-button{
                width:1.48rem;
                height:.48rem;
                padding: 0;
                span{
                    .f20();
                    color:#fff;
                }
            }
        }
    }
</style>