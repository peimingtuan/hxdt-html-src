<template>
    <div class="addpermission">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-if='isaddpermission'>
                <div class="main">

                    <el-row class='onerow5'>
                        <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                        <img class="alert-close" @click="closenewcase" src="../images/alert-close.png"/>
                        <div class="head">添加权限
                        </div>
                    </el-row>
                    <div class='content' style='height:6.9rem;border:1px solid #ddd'>
                        <el-row class='boxrow'>
                            <el-col :span=6>
                                <el-tree :data="data" style="background: transparent;" :props="defaultProps"
                                         @node-click="handleNodeClick" default-expand-all></el-tree>
                            </el-col>
                            <el-col :span=18>
                                <div class="contentppp">
                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                        <el-tabs v-model="activeName" :tab-position="tabPosition"
                                                 style="height: 200px;">
                                            <el-tab-pane label="部门" name="new1">
                                                <div v-for='item in departmentlist'>
                                                    <el-row>
                                                        <el-col :span=5>{{item.name}}</el-col>
                                                        <el-col :span=19>
                                                            <el-checkbox-group v-model="form.type">
                                                                <el-checkbox label="查看" name="type"></el-checkbox>
                                                                <el-checkbox label="修改" name="type"></el-checkbox>
                                                                <el-checkbox label="删除" name="type"></el-checkbox>
                                                            </el-checkbox-group>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="职务" name="new2">
                                                <div v-for='item in positionlist'>
                                                    <el-row>
                                                        <el-col :span=5>{{item.name}}</el-col>
                                                        <el-col :span=19>
                                                            <el-checkbox-group v-model="form.type">
                                                                <el-checkbox label="查看" name="type"></el-checkbox>
                                                                <el-checkbox label="修改" name="type"></el-checkbox>
                                                                <el-checkbox label="删除" name="type"></el-checkbox>
                                                            </el-checkbox-group>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="角色" name="new3">
                                                <div v-for='item in rolelist'>
                                                    <el-row>
                                                        <el-col :span=5>{{item.name}}</el-col>
                                                        <el-col :span=19>
                                                            <el-checkbox-group v-model="form.type">
                                                                <el-checkbox label="查看" name="type"></el-checkbox>
                                                                <el-checkbox label="修改" name="type"></el-checkbox>
                                                                <el-checkbox label="删除" name="type"></el-checkbox>
                                                            </el-checkbox-group>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>
                                    </el-tabs>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--底部按钮-->
                    <div class="bt">
                        <div class="qure" @click='sure'>
                            <img src="../images/sure.png"/>确定
                        </div>

                        <div class="土" @click='cancel'>
                            <img src="../images/cancel.png"/>取消
                        </div>
                    </div>
                </div>

            </div>

        </transition>
    </div>
</template>
<script>
    export default {
        name: "addpermission",
        props: {
            isaddpermission: Boolean,
            Schedulingshow: Function,
        },
        data() {
            return {
                tabPosition: 'left',//靠左导航
                departmentlist: [{id: "1", name: "民一庭"}, {id: "2", name: "民二庭"}, {id: "3", name: "邢一庭"}],
                positionlist: [{id: "1", name: "法官"}, {id: "2", name: "书记员"}, {id: "3", name: "庭长"}],
                rolelist: [{id: "1", name: "管理员"}, {id: "2", name: "民一庭书记员"}, {id: "3", name: "民二庭书记员"}],
                activeName: "new1",
                form: {
                    type: ''
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
            handleNodeClick(data) {
                console.log(data);
            },
            //注册弹框显示与否事件
            closenewcase() {
                this.$emit('Relatedcaseshow');
            },
            sure() {
                this.$emit('sure');
            },
            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>
<style lang="less">
    .addpermission {
        .el-tree-node__content {
            padding: 0.2rem 0;
        }

        .el-tree-node__label {
            font-size: 0.18rem;

        }

        .el-form-item__label {
            font-size: 0.18rem;
        }

        .el-checkbox__label {
            font-size: 0.18rem;
        }

        .second-alert {
            .main {
                width: 14rem;
                padding: 0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.20);
                min-height: 6.85rem;
                background: #fff;
                position: absolute;
                left: 13%;
                top: .5rem;
                /*margin-top:-3.425rem;*/
                border-radius: 2px;

                .content {
                    width: 100%;
                    background: #eceff0;
                    /* .boxrow{
                        height: 100%;
                    } */

                }

                .contentppp {
                    .el-tabs__content {
                        padding: 0 0.5rem;

                    }

                    .el-tabs__item {
                        font-size: .18rem !important;
                    }

                    .el-row {
                        padding: 0.2rem 0;
                    }

                    .el-checkbox-group {
                        padding-left: 1rem;
                    }
                }

                .bt {
                    display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    margin: 0.3rem 0;

                    & > div {
                        cursor: pointer;
                        font-size: 0.2rem;
                        line-height: .3rem;
                    }

                    img {
                        width: .2rem;
                        margin-right: .05rem;
                    }

                    /* .fc(); */

                    .qure {
                        color: #45A1D1;
                        margin-right: .5rem;
                    }
                }
            }

            .onerow5 {
                /*左上方login*/

                img.imgloge {
                    position: absolute;
                    top: .2rem;
                    left: -0.5rem;
                    width: .4rem;
                }

                /*头部*/

                .head {
                    width: 100%;
                    padding: .25rem 0 0 0rem;
                    height: .6rem;
                    font-size: 0.2rem;

                    span {
                        font-size: 0.14rem;
                        color: rgba(0, 0, 0, 0.54);
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
        }
    }
</style>