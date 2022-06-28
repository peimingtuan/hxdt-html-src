<template>
    <div class="tabpanel">
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
        <!--左侧查询-->
        <div class="select-btn">
            <el-button type="primary" @click="leftselect">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabpanel",
        data() {
            return {

            }
        },
        beforeCreate() {

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
    .tabpanel{
        .menu{
            cursor:pointer;
            .el-tree-node__content{
                height:.58rem;
                .el-tree-node__label{
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
                .wh(.18rem,.18rem);
            }
            /*选中*/
            .el-checkbox__inner:after{
                .wh(.04rem,.08rem);
                top: .02rem;
                left: .06rem;
            }
        }
        /*底部保存*/
        .select-btn{
            margin-top:.5rem;
            text-align: center;
            .el-button{
                .wh(1.48rem,.48rem);
                padding: 0;
                span{
                    .f20();
                    color:#fff;
                }
            }
        }
    }
</style>