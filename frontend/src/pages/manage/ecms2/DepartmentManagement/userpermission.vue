<template>
        <div class="userpermission">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-show="isuserpermission">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                        <AlertleftTile :text="text" :text2="text2"/>
                        <!-- <div class='admintitle'>209管理员</div> -->
                        <div class="contentid">
                                <el-row>
                                        <el-col :span=6>
                                             <el-tree   show-checkbox   node-key="id" :data="menuList" style="background: transparent;" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
                                        </el-col>
                                        <el-col :span=18>
                                                <el-row>
                                                    <el-checkbox-group v-model="form.type">
                                                        <el-checkbox label="查看" name="type"></el-checkbox>
                                                        <el-checkbox label="修改" name="type"></el-checkbox>
                                                        <el-checkbox label="删除" name="type"></el-checkbox>
                                                        <el-checkbox label="导出案件-排期数据" name="type"></el-checkbox>
                                                    </el-checkbox-group>
                                                </el-row>
                                        </el-col>
                                </el-row>
                        </div>
                        <div class="bt">
                            <div class="qure" @click="qure">
                                <img src="../images/courtsupervision/sure.png" />确定
                            </div>
    
                            <div class="cancel" @click="cancel">
                                <img src="../images/courtsupervision/cancel.png" />取消
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
</template>
    
    <script>
        import $ from "jquery"
        import AlertleftTile from "../component/AlertleftTile"
        const menuList=require('../testdata/leftmenu.js')
        export default {
            name: "userpermission",
            props:{
                isuserpermission:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    menuList:menuList,//左边菜单
                    form: {
                        type: [],
                    },
                    defaultProps: {
                    children: 'child',
                    label: 'name'
                    },
                    labelPosition: 'left',//form表单左侧靠齐
                    text:'添加权限',
                    text2:'填写基本信息',
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
                 //点击树结点
                 handleNodeClick(data){
                    console.log(data);
                },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('Relatedcaseshow');
                },
                qure() {
                    this.$emit('sure');
                },
                cancel() {
                    this.$emit('cancel');
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .userpermission{
            /*弹框*/
            .main{
                width:14rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:.5rem;
                margin-left:-7rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
                /*左上方login*/
                img.imgloge{
                    position:absolute;
                    top: .2rem;
                    left: 0.3rem;
                    width:.4rem;
                }
                /* .admintitle{
                    z-index:222;
                    position: relative;
                    left:45%;
                    top:-0.5rem;
                } */
                /*关闭弹框*/
                img.alert-close{
                    width:.18rem;
                    position:absolute;
                    top: .25rem;
                    right: .35rem;
                    cursor: pointer;
                    z-index:102;
                }
                .contentid{
                    width:100%;
                    background: #ECEFF0;
                    /* min-height:4rem; */
                    padding:0.2rem .2rem;
                      /*label*/
                    .el-form-item__content{
                        margin-left:1.5rem!important;
                    }
                    .el-form-item__label{
                    width:1.5rem!important;
                        .f18();
                    }
                    .el-checkbox__label{
                        font-size: 0.18rem!important;
                    }
                    .el-tabs__item {
                        /*padding: 0 .2rem;*/
                        /*height: .4rem;*/
                        /*line-height: .4rem;*/
                        font-size: .18rem!important;
                    }
                }
                .up{
                    width:100%;
                    /*分页*/
                    .page{
                        margin:.2rem 0;
                        span{
                            .f18();
                        }
                        input{
                            .f18();
                        }
                        text-align: center;
                        li.number{
                            .f18()
                        }
                    }
                }
                /*底部*/
                .bt{
                    width:100%;
                    margin:.2rem 0;
                    &>div{
                        cursor:pointer;
                        .f20();
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                    .fc();
                    .qure{
                        color: #45A1D1;
                        margin-right:.5rem;
                    }
                }
            }
            .el-tree{
                height: 6.9rem;
                overflow: auto;
            }
            .el-tree-node__label{
                font-size: 0.18rem;

            }
            .el-tree-node__content{
                padding:0.2rem 0;
            }
            .el-tree-node__children{
                padding-left:0.1rem;
            }
        }
    </style>