<template>
        <div class="check4">
            <div class="table-style">
                <el-table ref="multipleTable" class='casetable' :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                          tooltip-effect="dark"
                          style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column prop="" type='index'label="序号" width='100'show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sj" label="操作时间"  show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ip" label="电脑IP" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="czr" label="操作人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="cznr" label="操作内容" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="zt" label="操作状态" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
            <div class="up">
                <!--分页-->
                <el-pagination
                        class="page"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page=1
                        :page-size=9
                        layout="total, prev, pager, next, jumper"
                        :total=100>
                </el-pagination>
            </div>
        </div>
    </template>
    
    <script>
        // import {courtyardallocation} from "../js/datajson"
        export default {
            name: "check4",
            components: {
                // secondHead,
                // alertBtn
            },
            data() {
                return {
                    isAddscheduling_nt:false,
                    tableData:[{
                        sj:'2019-3-12 0:30',
                        ip:'10.2.13',
                        czr:"系统",
                        cznr:"开庭",
                        zt:"成功"
                    },
                    {   sj:'2019-3-12 0:30',
                        ip:'10.2.13',
                        czr:"系统",
                        cznr:"开庭",
                        zt:"成功"
                    }],
                    // tableData:courtyardallocation.info2,//客户端信息列表,
                    labelPosition: 'left',//form表单左侧靠齐
                    radio: '1',//选择刻录画面
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
        .check4{
            .add{
                cursor:pointer;
                margin-bottom:.1rem;
                /* img{
                    width:.8rem;
                } */
            }
            .el-radio{
                        /*选框*/
                        .el-radio__inner{ 
                            width:.2rem;
                            height:.2rem;
                            &:after{
                                width:.06rem;
                                height:.06rem;
                            }
                        }
                        /*文本*/
                        .el-radio__label{
                            .f18();
                        }
                    }
        }
    </style>