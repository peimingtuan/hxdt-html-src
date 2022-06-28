<template>
        <div class="Scheduling">
                <!-- 添加权限弹框 -->
                <addpermission :isaddpermission="isaddpermission" @Relatedcaseshow='isaddpermission=false' @sure='isaddpermission=false' @cancel='isaddpermission=false' ></addpermission>
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="alert-window" v-if='isScheduling'>
                            <div class="main">
                                <el-row class='onerow2'>
                                                <img class="imgloge" src="../images/../images/CaseManagement/casemanage.png" />
                                                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                                <div class="head">特殊权限管理
                                                    <!-- <span>特殊权限管理</span> -->
                                                </div>
                                </el-row>
                    <el-row class='tworow2'>
                            <div class="add" @click="handleadd()">
                                    <img src="../images/add.png"/>
                                </div>
                                    <div>
                                        <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                            @selection-change="handleSelectionChange" class='casetable'>
                                            <el-table-column type="selection"show-overflow-tooltip></el-table-column>
                                            <el-table-column prop='xh'label="序号"width=80px type="index"></el-table-column>
                                            <el-table-column prop="fqfy"label="赋权对象所属法院"show-overflow-tooltip></el-table-column>
                                            <el-table-column prop="fqfy"label="赋权对象"show-overflow-tooltip></el-table-column>
                                            <!-- <el-table-column  prop="qx"label="权限" min-width=13% >
                                                    <template slot-scope="scope"><div class='isedit'>
                                                        </div></template>
                                            </el-table-column> -->
                                            <el-table-column prop="qx"label="权限"show-overflow-tooltip></el-table-column>
                                            <el-table-column label="操作" show-overflow-tooltip>
                                                    <template slot-scope="scope">
                                                        <div class="isedit">
                                                            <span @click="handleadd">修改</span>
                                                            <span @click="delete(scope.row)">删除</span>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                        </el-table>
                                    </div>
                    </el-row>
                        <!--底部按钮-->
                        <div class="bt">
                                <div class="qure" @click='sure'>
                                    <img src="../images/sure.png" />确定
                                </div>

                                <div class="土" @click='cancel'>
                                    <img src="../images/cancel.png" />取消
                                </div>
                        </div>
                            </div>
                        </div>
                </transition>
        </div>
</template>

<script>
     import addpermission from "./addpermission" //添加权限弹框
    import $ from "jquery"
    export default {
        name: "Scheduling",
          //注册子组件
          components: {
            addpermission
         },
        props:{
            isaddpermission:Boolean,
            isScheduling:Boolean,
            Schedulingshow:Function,
        },
        data() {
            return {
                isaddpermission:false,
                //假数据
                tableData:[{
                    xh:'1',
                    fqfy:"广州市中级人民法院",
                    fqfy:"部门：民一庭",
                    qx:"查看，修改，删除"
                },
                 {xh:'1',
                    fqfy:"广州市中级人民法院",
                    fqfy:"部门：民一庭",
                    qx:"查看，修改，删除"
                }
             ]
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
              //添加/修改特殊权限按钮弹框
              handleadd(){
                this.isaddpermission=true;
            },
            //删除
            delete(row){
                let _this=this;
                        _this.$confirm('确认删除', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.$http.post('/baseInfo/deleteTrialPlanInfo', {
                                trialPlanId:row.trialPlanId,
                            }).then(data =>{
                                if(data.code===0){
                                    //_this.tableData.splice(index,1)//物理删除
                                    //_this.getlawlist();
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }else{
                                    _this.$msgw(data.msg);
                                }
                            }).catch(err => {
                                _this.$msge('服务器异常，请稍后重试');
                            })
                        }).catch(() => {

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
            },
          
        }
</script>

<style lang="less">
    @import url('../css/common.less');
    .Scheduling{
         /*弹框*/
         .alert-window{
            position:fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 100;
            .main{
                overflow: auto;
                width:14rem;
                height: 8.5rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:.5rem;
                margin-left:-7rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
            
            }
        /*操作颜色*/
        div.isedit span{
                color: #409eff;
        }
        .onerow2{
             /*左上方login*/
                img.imgloge{
                                position:absolute;
                                top: .2rem;
                                left: -0.5rem;
                                width:.4rem;
                            }
                /*头部*/
                .head{
                                width:100%;
                                padding:0.25rem 0 0 0rem;
                                height:.6rem;
                                font-size: 0.2rem;
                                span{
                                    font-size: 0.14rem;
                                    color: rgba(0,0,0,0.54);
                                }
                            }
                img.alert-close {
                                width: .18rem;
                                position: absolute;
                                top: .25rem;
                                right: -0.4rem;
                                cursor: pointer;
                                /* z-index: 1002; */
                }
        }
        .tworow2{
            padding:0.1rem 0.2rem 0 0.2rem;
            height: 6.90rem;
            margin: 0 auto;
            background:#eceff0;
            /* padding:0rem 0  0.2rem 1rem;
            border-bottom:1px solid #000; */
            .casetable2{
                th,td{
                        text-align:center;
                    }
                    th{
                        color: #151515;
                        background:#cbe5f3;
                        div{
                            font-size: 0.2rem;
                        }
                    }
                    /*表格高度*/
                    .el-table{
                        overflow: hidden;
                        /* height:8.62rem; */
                        text-align:center;
                    }
                   .el-table .cell{
                    text-align: center;
                     height: 0.25rem; 
                    line-height: 0.25rem;
            } 
            .el-button{
                    position: relative;
                    top:-0.13rem;
                } 
        }
        }
        .threerow2{
            padding-top:0.25rem
          
        }
        .bt{
                   display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    margin:0.3rem 0;
                    &>div{
                        cursor:pointer;
                        font-size: 0.2rem;
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                 
                    /* .fc(); */
                    .qure{
                        color: #45A1D1;
                        margin-right:.5rem;
                    }
                }
        
    }
}
</style>