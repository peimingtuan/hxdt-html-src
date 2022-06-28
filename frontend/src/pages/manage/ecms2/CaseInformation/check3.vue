<template>
        <div class="check3">
            <div class="table-style">
                <el-table ref="multipleTable"
                          :data="tableData"
                          @select-all="selecAlltcheck"
                          tooltip-effect="dark"
                          style="width: 100%"
                          max-height="350"
                          class='casetable'
                          @selection-change="handleSelectionChange">
                    <el-table-column label="审理形式" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.trialFormCode | trialFormCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="factStartDate" label="开庭日期" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="开庭时间" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.factStartTime}}-{{scope.row.factEndTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="庭审状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.trialStatus | trialStatus2}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "check3",
            components: {

            },
            data() {
                return {
                    isAddscheduling_nt:false,
                    tableData:[],
                }
            },
            filters:{
                trialFormCode(v){
                    let s='';
                    switch(Number(v)){
                        case 1:
                            s='普通审理形式';
                            break;
                        case 2:
                            s='合并审理(单笔录)';
                            break;
                        case 3:
                            s='合并审理(多笔录)';
                            break;
                    }
                    return s
                },
                trialStatus2(v){
                    let s='';
                    switch(Number(v)){
                        case 1:
                            s='等待开庭';
                            break;
                        case 2:
                            s='正在开庭';
                            break;
                        case 3:
                            s='庭审结束';
                            break;
                        case 4:
                            s='休庭';
                            break;
                    }
                    return s
                }
            },
            created() {
    
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                getAllInfoByCaseInfoId(caseInfoId){
                    const _this = this;
                    return _this.$http.post('/caseManage/getTrialPlanByCaseInfoId', {
                        caseInfoId
                    }).then(data => {
                        if (data.code ===200) {
                            _this.tableData=data.data
                        } else {
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/caseManage/getTrialPlanByCaseInfoId')
                        // _this.$msge('服务器异常，请稍后重试');
                    })
                }
            }
        }
    </script>
    
    <style lang="less" scoped>
        @import url('../css/common.less');
        .check3{
            .casetable{
                /*max-height:6rem;*/
                overflow:auto;
            }
        }
    </style>