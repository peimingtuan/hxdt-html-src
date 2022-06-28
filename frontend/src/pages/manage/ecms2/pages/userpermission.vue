<template>
        <div class="userpermission">
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="alert-window" v-if='isuserpermission'>
                            <div class="main">
                                <el-row class='onerow5'>
                                                <img class="imgloge" src="../images/../images/CaseManagement/casemanage.png" />
                                                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                                <div class="head">添加用户权限
                                                </div>
                                </el-row>
                                <div  class='content'style='height:6.9rem;border:1px solid #ddd'>
                                        <el-row>
                                            <el-col :span=6>
                                                 <el-tree :data="menuList" style="background: transparent;" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
                                            </el-col>
                                            <el-col :span=18>
                                                    <el-row>
                                                            <!-- <el-form ref="form" :model="form" label-width="80px">
                                                                    <el-form-item label="民一庭">
                                                                            <el-checkbox-group v-model="form.type">
                                                                              <el-checkbox label="查看" name="type"></el-checkbox>
                                                                              <el-checkbox label="修改" name="type"></el-checkbox>
                                                                              <el-checkbox label="删除" name="type"></el-checkbox>
                                                                              <el-checkbox label="导出案件-排期数据" name="type"></el-checkbox>
                                                                            </el-checkbox-group>
                                                                    </el-form-item>
                                                                    <el-form-item label="民一庭" v-for='(item,index) in roledata2'>
                                                                            <el-checkbox-group v-model="form.type">
                                                                              <el-checkbox label="查看" name="type"></el-checkbox>
                                                                              <el-checkbox label="修改" name="type"></el-checkbox>
                                                                              <el-checkbox label="删除" name="type"></el-checkbox>
                                                                              <el-checkbox label="导出案件-排期数据" name="type"></el-checkbox>
                                                                            </el-checkbox-group>
                                                                    </el-form-item>
                                                                    <el-form-item label="民一庭" v-for='(item,index) in roledata3'>
                                                                            <el-checkbox-group v-model="form.type">
                                                                              <el-checkbox label="查看" name="type"></el-checkbox>
                                                                              <el-checkbox label="修改" name="type"></el-checkbox>
                                                                              <el-checkbox label="删除" name="type"></el-checkbox>
                                                                              <el-checkbox label="导出案件-排期数据" name="type"></el-checkbox>
                                                                            </el-checkbox-group>
                                                                    </el-form-item>
                                                            </el-form> -->
                                                    </el-row>
                                            </el-col>
                                        </el-row>
                                </div>
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
        const menuList=require('../testdata/leftmenu.js')
        import $ from "jquery"
        export default {
            name: "userpermission",
            props:{
                isuserpermission:Boolean,
                Schedulingshow:Function,
            },
            data() {
            //  const menuList=require('../js/leftmenu')
                return {
                    defaultProps: {
                    children: 'child',
                    label: 'name'
                    },
                    menuList:menuList,//左边菜单
                    roledata1:['民一庭','民二庭','邢一庭'],
                    roledata2:['法官','书记员','庭长'],
                    roledata3:['管理员','民二庭书记员','邢一庭书记员'],
                    form: {
                    type: [],
                    // roledata1:['民一庭','民二庭','邢一庭'],
                    // roledata2:['法官','书记员','庭长'],
                    // roledata3:['管理员','民二庭书记员','邢一庭书记员'],
                    },
                    checkList: [''],
                    data: [{
                    label: '广州市中级人民法院',
                    children: [{
                        label: '荔湾区人民法院',
                    },
                    {
                        label: '黄浦区人民法院',
                    },
                    {
                        label: '越秀区人民法院',
                    }
                    ]
                }],
                data1:[{
                    label: '部门',
                    children: [{
                        label: '民一庭',
                    },
                    {
                        label: '民二庭',
                    },
                    {
                        label: '邢一庭',
                    }]
                    }],
                    data2:[{
                    label: '职务',
                    children: [{
                        label: '法官',
                    },
                    {
                        label: '书记员',
                    },
                    {
                        label: '庭长',
                    },
                    {
                        label: '院长',
                    }]
                    }],
                    data3:[{
                    label: '角色',
                    children: [{
                        label: '管理员',
                    },
                    {
                        label: '民一庭管理员',
                    },
                    {
                        label: '民二庭管理员',
                    },
                   ]
                    }]

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
                closenewcase() {
                    this.$emit('Relatedcaseshow');
                },
                sure(){
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    <style lang="less">
        .userpermission{
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
            /*选中节点当前颜色*/
            .el-tree-node.is-current > .el-tree-node__content {
                    color:#2F8DED!important;
                    /* background-color: #2F8DED!important; */
            }
        }
    </style>
    <style lang="less" scoped>
        .userpermission{
                 /*操作颜色*/
                div.isedit{
                        color: #409eff;
                }
                /*操作颜色*/
                div.isedit span{
                        color: #409eff;
                }
            .alert-window{
            position:absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 111;
            .main{
                background: #fff;
                width:13rem;
                padding: 0rem 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                /*min-height:6.85rem;*/
                position:absolute;
                left:12%;
                top:.5rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
                .content{
                    width:100%;
                    height:6.5rem;
                    background:#eceff0;

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
        .onerow5{
            /*左上方login*/
            img.imgloge{
                        position:absolute;
                        top: .2rem;
                        left: 0rem;
                        width:.4rem;
                        }
                /*头部*/
                .head{
                                width:100%;
                                padding:.25rem 0 0 0.4rem;
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
                                right: 0rem;
                                cursor: pointer;
                                /* z-index: 1002; */
                }
            }
        }
    }
    </style>