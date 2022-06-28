<template>
    <div class="PositionManagement">
            <addposts  ref='addposts':isaddposts="isaddposts" @Relatedcaseshow='isaddposts=false' @sure='isaddposts=false' @cancel='isaddposts=false'></addposts>
                        <!-- <div class="main"> -->
                            <el-row class='tworow2'>
                                    <el-col :span='18'>
                                        <div class='add' @click="addposts">
                                                <img src="../images/add.png"/>
                                        </div>
                                        <!-- <div class="isedit"> -->
                                                <!-- <el-button type="text" @click="addposts">添加</el-button>
                                                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">导入</el-button>
                                        </div> -->
                                    </el-col>
                                    <el-col :span=6>
                                            <div class="ri">
                                                    <el-input v-model="input" placeholder="按条件搜索" clearable></el-input>
                                                    <el-button type="primary"  icon="el-icon-search" @click="searchP()">搜索</el-button>
                                            </div>
                                            <!-- <el-input laceholder="按条件查询" style='width:1.5rem'></el-input>
                                            <el-button plain icon="el-icon-search"  type="primary">搜索</el-button> -->
                                    </el-col>
                                            <div>
                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                    @selection-change="handleSelectionChange"  class='casetable'>
                                                    <el-table-column type="selection"></el-table-column>
                                                    <el-table-column type='index'label="序号" width='100px'></el-table-column>
                                                    <el-table-column prop="PositionName" label="职务名称" show-overflow-tooltip></el-table-column>
                                                    <el-table-column prop="explain"label="说明" show-overflow-tooltip></el-table-column>
                                                    <el-table-column label="权限"show-overflow-tooltip>
                                                            <template slot-scope="scope">
                                                                    <div class='isedit'>
                                                                            <span @click="editP(scope.row)">修改</span>
                                                                            <span @click="seerole">删除</span>
                                                                    </div>
                                                            </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                            </el-row>
                        <!-- </div> -->
                        <div class="up">
                                <el-pagination
                                class="page"
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page=1
                                :page-size=10
                                layout="total, prev, pager, next, jumper"
                                :total=0>
                                </el-pagination>
                        </div>
    </div>
</template>

<script>
import addposts from "../DepartmentManagement/addposts" //添加权限弹框
//import {PositionManagement} from "../js/system"

import $ from "jquery"
export default {
    name: "PositionManagement",
      //注册子组件
    components: {
        addposts
    },
    props:{
        isaddposts:Boolean,
        Schedulingshow:Function,
    },
    data() {
        return {
            input:"",
            isaddposts:false,
            totalpage:'',
            //假数据
            //tableData:PositionManagement.casetableData,
            tableData:[]
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
        //添加职务
        addposts(){
            this.isaddposts=true;
            this.$refs.addposts.show()
        },
        editP(row){
            this.isaddposts=true;
            //调用子组件弹框方法
            this.$refs.addposts.show(row)
        },
        searchP(){
            let _this=this;
                if(_this.input.replace(/(^\s*)|(\s*$)/g, '')!=''){
                    //进行逻辑处理
                    this.pageIndex=1;
                    //_this.getlawlist();
                }else{
                    _this.$msgw('请输入搜索内容')
                    return
                }
        },
        //注册弹框显示与否事件
        closenewcase() {
            this.$emit('Schedulingshow');
        },
        sure(){
            //console.log(22)
            this.$emit('sure');
        },
        cancel(){
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="less">
@import url('../css/common.less');
.PositionManagement{
    .mr();
    padding:0 0.2rem 0 0.2rem;
    /*height:8.68rem;*/
    .add{
        cursor:pointer;
        margin:.2rem 0;
        img{
            height:.4rem;
        }
    }
    .tworow2{
        .el-col-6{
            padding-top:0.1rem;
            text-align: right;
        }
        .ri{
                        /*text*/
                        .el-input {
                            width: 2.36rem;
                            margin-right: .1rem;
                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                font-size: 0.18rem;
                            }
                        }
                        /*button*/
                        .el-button {
                            position: relative;
                            top: -.02rem;
                            line-height: .36rem;
                            padding:0 .2rem;
                            .el-icon-search {
                                font-size: 0.18rem;
                                color: #fff;
                            }

                            span {
                                font-size: 0.18rem;
                                color: #fff;
                            }
                        }
        }
        .casetable{
            margin-top:0.2rem;
            cursor:pointer;
            th,td{
                text-align:center;
            }
            th{
                background:#cbe5f3;
                div{
                    .f20()
                }
            }
            td{
                div{
                    .f18();
                    span{
                        .f18()
                    }
                }
                div.isedit span{
                    color:#409EFF;
                    margin-right:.1rem;
                }
            }
            /*暂无数据*/
            .el-table__empty-text{
                .f18();
            }
        }
    }
    .up{
        /*分页*/
        .page{
            margin:.2rem 0;
            span{
                font-size: 0.18rem;
            }
            input{
                font-size: 0.18rem;
            }
            text-align:center;
            li.number{
                font-size: 0.18rem;

            }
        }
    }
}
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>