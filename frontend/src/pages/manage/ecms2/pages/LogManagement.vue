<template>
        <div class="LogManagement">
               <!--头部-->
               <div class="head">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户日志" name="first">
                            <othertabpane1 />
                        </el-tab-pane>
                        <el-tab-pane label="登录日志" name="second">
                            <othertabpane2 />
                        </el-tab-pane>
                        <el-tab-pane label="系统日志" name="three">
                            <othertabpane3 />
                        </el-tab-pane>
                        <el-tab-pane label="文件下载日志" name="four">
                            <othertabpane4 />
                        </el-tab-pane>
                        <el-tab-pane label="刻录日志" name="five">
                            <othertabpane5 />
                        </el-tab-pane>
                        <el-tab-pane label="客户端日志" name="six">
                            <othertabpane6 />
                        </el-tab-pane>
                    </el-tabs>
                </div>
        </div>
 </template>
    
    <script>
    import $ from "jquery"
    import othertabpane1 from "../LogManagement/tabpane1" //
    import othertabpane2 from "../LogManagement/tabpane2" //
    import othertabpane3 from "../LogManagement/tabpane3" //
    import othertabpane4 from "../LogManagement/tabpane4" //
    import othertabpane5 from "../LogManagement/tabpane5" //
    import othertabpane6 from "../LogManagement/tabpane6" //
        export default {
            name: "LogManagement",
            components: {
            othertabpane1,
            othertabpane2,
            othertabpane3,
            othertabpane4,
            othertabpane5,
            othertabpane6
            },
            data() {
                return {
                    activeName:'first',
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
    .LogManagement{
         .add{
                cursor:pointer;
                margin:.2rem 0;
                img{
                    width:.8rem;
                }
            }
            padding:0 0.2rem 0 0.2rem;
            .head{
                float:right;
                /* position:relative; */
                padding: .1rem 0;
                .fb();
                .el-tabs__item{
                    padding: 0 .2rem;
                    height:.4rem;
                    line-height:.4rem;
                    .f18();
                }
                .el-tabs__active-bar{
                    width:100%;
                }
                /*内容填充区域*/
                .el-tabs__content{
                    width:100%;
                    position:absolute;
                    left:0;
                    /* top:1rem; */
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
</style>