<template>
    <div class="Roleprivilege">
            <userpermission :isuserpermission="isuserpermission" @Relatedcaseshow='isuserpermission=false' @sure='isuserpermission=false' @cancel='isuserpermission=false' ></userpermission>
            <addrole  ref='addrole':isaddrole="isaddrole" @Relatedcaseshow='isaddrole=false' @sure='isaddrole=false' @cancel='isaddrole=false'></addrole>
                        <div class="main">
                            <el-row class='tworow2'>
                                    <el-col :span='18'>
                                            <div class='add' @click="addrole">
                                                    <img src="../images/add.png"/>
                                            </div>
                                    </el-col>
                                    <el-col :span=6>
                                            <div class="ri">
                                                    <el-input v-model="rolename" placeholder="角色名称" clearable></el-input>
                                                    <el-button type="primary"  icon="el-icon-search" @click="searchRole()">搜索</el-button>
                                            </div>
                                            <!-- <el-input placeholder="角色名称" style='width:1.5rem'></el-input>
                                            <el-button plain icon="el-icon-search"  type="primary">搜索</el-button> -->
                                    </el-col>
                                    <el-col>
                                            <div>
                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                    @selection-change="handleSelectionChange" class='casetable'>
                                                    <el-table-column type="selection"></el-table-column>
                                                    <el-table-column type='index'label="序号"show-overflow-tooltip width='100px'></el-table-column>
                                                    <el-table-column prop="rolename" label="角色明称" show-overflow-tooltip></el-table-column>
                                                    <el-table-column prop="explain"label="说明" show-overflow-tooltip></el-table-column>
                                                    <el-table-column  prop="cz"label="操作"  show-overflow-tooltip>
                                                        <template slot-scope="scope">
                                                            <div class='isedit'>
                                                                    <el-button type='text' @click='setrole(scope.row)'>角色成员管理</el-button>
                                                                    <el-button type="text" @click="setuserpermission(scope.row)">权限设置</el-button>
                                                                    <el-button type='text' @click='deleter'>删除</el-button>
                                                            </div>
                                                        </template>
                                                </el-table-column>
                                                </el-table>
                                            </div>
                                    </el-col>
                            </el-row>
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
                    
    </div>
</template>

<script>
import addrole from "../DepartmentManagement/addrole" //添加权限弹框
import userpermission from "../DepartmentManagement/userpermission" //添加权限弹框

import $ from "jquery"
export default {
    name: "Roleprivilege",
     //注册子组件
     components: {
        addrole,
        userpermission
    },
    props:{
        isuserpermission:Boolean,
        isaddrole:Boolean,
        Schedulingshow:Function,
    },
    data() {
        return {
            rolename:"",
            pageIndex:"",
            isuserpermission:false,
            isaddrole:false,
            totalpage:'',
            //假数据
            tableData:[],
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
        searchRole(){
            let _this=this;
                if(_this.rolename.replace(/(^\s*)|(\s*$)/g, '')!=''){
                    //进行逻辑处理
                    this.pageIndex=1;
                    //_this.getlawlist();
                }else{
                    _this.$msgw('请输入搜索内容')
                    return
                }
        },
        //添加角色
        addrole(){
            this.isaddrole=true;
            this.$refs.addrole.show()
        },
        setrole(row){
            this.isaddrole=true;
            this.$refs.addrole.show(row)
        },
        setuserpermission(row){
            this.isuserpermission=true;
        },
        deleter(){
            let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/caseManage/deleteCaseInfo', {
                        caseInfoId:row.caseInfoId//案号id
                    }).then(data =>{
                        if(data.code===0){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            _this.$msgw(data.msg);
                        }
                    }).catch(err => {
                        _this.load=false;
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
.Roleprivilege{
    .mr();
    padding:0 0.2rem 0 0.2rem;
    .el-input__inner{
      .f18();  
    }
    .el-textarea__inner{
        .f18();  
    }
    .add{
            cursor:pointer;
            margin:.1rem 0;
            img{
                /*width:.8rem;*/
                height:.4rem;
            }
    }
    .casetable{
        margin-top:.1rem;
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
    .tworow2{
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
                    .el-col-6{
                        padding-top:0.1rem;
                        text-align: right;
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
                text-align: center;
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