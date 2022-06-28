<template>
    <div class="setBase">
        <div class="flex-div">
            <div class="flex-left">
                显示方式:
                <el-select v-model="screenShowType" placeholder="请选择">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        ref="tree"
                        show-checkbox
                        check-on-click-node
                        node-key="buttonFunctionId"
                        highlight-current="true"
                        default-expand-all
                        expand-on-click-node="false"
                        @node-click="handleNodeClick"
                ></el-tree>
                <el-button type="primary" @click="saveFunctionShowList">保存设置</el-button>
            </div>
            <!--<div class="flex-right">-->
                <!--<div class="top">-->
                    <!--<div class="le">-->
                        <!--<div class="add" @click="add()">-->
                            <!--<img src="../../images/yingyongpeizhi/add.png" />-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="ri">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-input v-model="input" placeholder="按条件搜索"></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="table-style">-->
                    <!--<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">-->
                        <!--<el-table-column type="index" label="序号" width="100px" :index="indexMethod"></el-table-column>-->
                        <!--<el-table-column prop="trialRoomName" label="庭审室名称" show-overflow-tooltip></el-table-column>-->
                        <!--<el-table-column prop="trialRoomTypeName" label="庭审室类型" show-overflow-tooltip></el-table-column>-->
                        <!--<el-table-column prop="trialUnitName" label="所属单位" show-overflow-tooltip></el-table-column>-->
                        <!--<el-table-column prop="buildDate" label="建设日期" show-overflow-tooltip></el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="trialRoomStatus"-->
                                <!--label="庭审室状态"-->
                                <!--:formatter="formatterTrialRoomStatus"-->
                                <!--show-overflow-tooltip-->
                        <!--&gt;</el-table-column>-->
                        <!--<el-table-column prop="trialRoomDesc" label="描述" show-overflow-tooltip></el-table-column>-->
                        <!--<el-table-column label="操作" show-overflow-tooltip>-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="isedit">-->
                                    <!--<span @click="edit(scope.$index, scope.row)">修改</span>-->
                                    <!--<span @click="delinfo(scope.$index, scope.row)">删除</span>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->
                <!--</div>-->
                <!--<div class="up">-->
                    <!--&lt;!&ndash;分页&ndash;&gt;-->
                    <!--<el-pagination-->
                            <!--class="page"-->
                            <!--background-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page.sync="currentPage"-->
                            <!--:page-size="10"-->
                            <!--layout="total, prev, pager, next, jumper"-->
                            <!--:total="tatalCount"-->
                    <!--&gt;</el-pagination>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "setBase",
        data() {
            return {
                selectList:[{id:1,name:'单屏'},{id:2,name:'双屏'}],
                screenShowType:1,
                treeData: [],
                defaultProps: {
                    children: "childrenNodes",
                    label: "buttonFunctionName",
                }
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
            // 获取数据
            async getTreeData() {
                this.$showLoading("rgba");
                let res=await this.$http.post("/partyLoginConfig/getFunctionShowList",{},true)
                this.$hideLoading("rgba");
                if(res){
                    this.screenShowType=res.data.screenShowType;
                    this.treeData = res.data.buttonFunctionList;
                    let arr=[]
                    this.treeData.map(item=>{
                        if(item.showButton)arr.push(item)
                    })
                   this.$nextTick(()=>{
                       this.$refs.tree.setCheckedNodes(arr)
                   })
                }
            },
            handleNodeClick(data,node,item) {

            },
            async saveFunctionShowList(){
                this.$showLoading("rgba");
                let arr=this.$refs.tree.getCheckedNodes().map(item=>{
                        return item.buttonFunctionId
                    }),
                    buttonFunctionList=this.treeData.map(item=>{
                        if(arr.includes(item.buttonFunctionId))item.showButton=true
                        else item.showButton=false
                        return item
                    });
                let res=await this.$http.post("/partyLoginConfig/saveFunctionShowList",{screenShowType:this.screenShowType,buttonFunctionList},true)
                this.$hideLoading("rgba");
                if(res)this.$msgs("保存成功!")
            }
        }
    }
</script>

<style lang="less">
    @import '../../../css/common.less';
    .setBase{
        .mr();
        .flex-div{
            .fl();
            .flex-left {
                .el-tree {
                    margin:10px auto;
                    width: 3.5rem;
                    max-height:7rem;
                    margin-right:.1rem;
                    overflow: auto;
                    background: #eceff0;
                    .el-tree-node__content {
                        height: 0.5rem;
                    }
                    .el-tree-node__label {
                        width: 3.5rem;
                        overflow: auto;
                        .f18();
                    }
                    .el-tree__empty-text{
                        .f18();
                    }
                }
                .el-input {
                    .el-input__inner {
                        .f18();
                    }
                }
                .el-button{
                    width:1.48rem;
                    height:.48rem;
                    padding: 0;
                    span{
                        font-size:.2rem;
                        color:#fff;
                    }
                }
            }
            .flex-right {
                width: 13rem;
                .top {
                    margin-bottom: 0.2rem;
                    .fb();
                    .le {
                        .fl();
                        cursor: pointer;
                        & > div.add {
                            img {
                                width: 0.8rem;
                            }
                        }
                    }
                    .ri {
                        /*text*/
                        .el-input {
                            width: 2.36rem;
                            margin-right: 0.1rem;

                            .el-input__inner {
                                height: 0.4rem;
                                line-height: 0.4rem;
                                padding: 0 0.15rem;
                                .f18();
                            }
                        }
                        /*button*/
                        .el-button {
                            position: relative;
                            top: -0.02rem;
                            width: 0.9rem;
                            line-height: 0.36rem;
                            padding: 0;

                            .el-icon-search {
                                .f18();
                                color: #fff;
                            }

                            span {
                                .f18();
                                color: #fff;
                            }
                        }
                    }
                }
                /*内容展示区域*/
                @import url("../../../css/element.less");
            }
        }
    }
</style>