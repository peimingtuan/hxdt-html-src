<template>
    <div class="retabpaneFour2">
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @cell-click="cellClick"
                    @select="selectcheck"
                    @select-all="selecAlltcheck"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" width="100px" label="序号">
                    <!--<template slot-scope="scope">{{scope.row.$index}}</template>-->
                </el-table-column>
                <el-table-column prop="templateName" label="名称" width="200px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="templateGroupName" label="分组">
                </el-table-column>
                <el-table-column prop="courtRoomName" label="法庭" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="templateDesc" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.row)">修改</span>
                            <span @click="delinfo(scope.row)">删除</span>
                        </div>
                    </template>
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
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total='total'>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addremoteAlertfour2 ref="addremoteAlertfour2" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import {outerring} from "../outerring/datajson"
    import addremoteAlertfour2 from "./addremoteAlertfour2" //添加弹框
    export default {
        name: "retabpaneFour2",
        components: {
            addremoteAlertfour2
        },
        data() {
            return {
                ismain:false,
                pageIndex:1,
                total:0,
                templateGroupId:'',
                tableData:[],//庭室配置管理列表,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {

            // 获取列表数据
            getTableData(){
                this.$http.post('/remoteTrial/getRemoteTrialTemplates',{
                    pageIndex: this.pageIndex,
                    pageSize: 10,
                    templateGroupId: this.templateGroupId
                }).then(data =>{
                    if(data.code===200){
                        this.tableData = data.data;
                        this.total = data.count;
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            //修改当前行信息
            edit(val){
                this.$refs.addremoteAlertfour2.getTemplateGroup();
                this.$refs.addremoteAlertfour2.getCourtRoom();
                this.$refs.addremoteAlertfour2.formLabelAlign = val;
                this.ismain=true;
            },
            //删除当前行内容
            delinfo(val){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/remoteTrial/deleteRemoteTemplateInfoByTemplateId',{
                        templateId:val.templateId
                    }).then(data =>{
                        if(data.code===200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTableData();
                        }else{
                            this.$msgw(data.message);
                        }
                    }).catch(err => {
                        this.$msge('服务器异常，请稍后重试');
                    })
                    
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex = page;
                this.getTableData();
            },
            addlawsure(){
                this.getTableData();
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .retabpaneFour2{
        .mr();
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>