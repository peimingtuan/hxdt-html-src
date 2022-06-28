<template>
        <div class="Relatedcase">
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="alert-window" v-if='isRelatedcase'>
                            <div class="main">
                                <el-row class='onerow5'>
                                                <img class="imgloge" src="../images/../images/CaseManagement/casemanage.png" />
                                                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                                <div class="head">关联案件
                                                    <!-- <span>特殊权限管理</span> -->
                                                </div>
                                </el-row>
                                <el-row  class='tworow5'>
                                        <div style='border:1px solid #E5E5E5' class='casetable5'>
                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                @selection-change="handleSelectionChange">
                                                <el-table-column prop="ah"label="案号"min-width=8%></el-table-column>
                                                    <el-table-column prop="tc"label="庭次"min-width=6%></el-table-column>
                                                    <el-table-column prop="cbfg"label="承办法官"min-width=4%></el-table-column>
                                                    <el-table-column prop="spz"label="审判长/员"min-width=4%></el-table-column>                           
                                                    <el-table-column prop="sjy"label="书记员"min-width=6%></el-table-column>
                                                    <el-table-column prop="dsr"label="当事人"min-width=8%></el-table-column>
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
        import $ from "jquery"
        export default {
            name: "Relatedcase",
            props:{
                isRelatedcase:Boolean,
                Schedulingshow:Function,
            },
            data() {
                return {
                    tableData:[{
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安;被告：潘金莲',
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲',
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲'
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲'
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
        /* @import url('../css/common.less'); */
        .Relatedcase{
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
            z-index: 222!important;
            .main{
                width:14rem;
                padding:0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:50%;
                top:.5rem;
                margin-left:-rem;
                /*margin-top:-3.425rem;*/
                border-radius:2px;
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
                        /* left: .2rem; */
                        width:.4rem;
                        }
                /*头部*/
                .head{
                                width:100%;
                                padding:.25rem 0 0.1rem 0.4rem;
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
            .tworow5{
                height: 7.15rem;
                /* width: 12.75rem; */
                margin: 0 auto;
                background:#eceff0;
                /* padding:0rem 0  0.2rem 1rem;
                border-bottom:1px solid #000; */
                .casetable5{
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
                        text-align:center;
                    }
                    /*暂无数据*/
                    .el-table__empty-text{
                        font-size: 0.18rem;
                    }
                }
            }
        }
    }
    </style>