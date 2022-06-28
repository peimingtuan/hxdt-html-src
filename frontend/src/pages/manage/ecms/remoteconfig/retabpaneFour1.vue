<template>
    <div class="retabpaneFour1">
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    max-height="500"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" width="100px" label="序号">
                </el-table-column>
                <el-table-column prop="templateGroupName" label="分组名称" >
                </el-table-column>
                <el-table-column prop="templateGroupDesc" label="说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--<div class="up">-->
            <!--&lt;!&ndash;分页&ndash;&gt;-->
            <!--<el-pagination-->
                    <!--class="page"-->
                    <!--background-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page='pageIndex'-->
                    <!--:page-size='pageSize'-->
                    <!--layout="total, prev, pager, next, jumper"-->
                    <!--:total="total">-->
            <!--</el-pagination>-->
        <!--</div>-->
        <!--添加弹框-->
        <addremoteAlertfour1 ref="addremoteAlertfour1" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import {outerring} from "../outerring/datajson"
    import addremoteAlertfour1 from "./addremoteAlertfour1" //添加弹框
    export default {
        name: "retabpaneFour1",
        components: {
            addremoteAlertfour1
        },
        data() {
            return {
                ismain:false,
                tableData:[],//庭室配置管理列表,
                pageIndex:1,
                pageSize:10,
                total:0,
            }
        },
        created() {
            
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //模板分组列表
            getTableData(){
                this.$http.post('/remoteTrial/getRemoteTemplateGroupInfosByPage',{
                    pageIndex:this.pageIndex,//当前页码
                    pageSize:this.pageSize //每页大小
                }).then(data =>{
                    if(data.code===200){
                        //this.total=data.count;
                        this.tableData=data.data;
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    //this.$msge('服务器异常，请稍后重试');
                })
            },
            // 分页
            handleCurrentChange(val){
                this.pageIndex = val;
                this.getTableData();
            },
            // 添加
            addlawsure(formLabelAlign){
                let url = '/remoteTrial/addRemoteTemplateGroupInfo';
                let params = {
                    templateGroupName:formLabelAlign.name,
                    templateGroupDesc:formLabelAlign.desc
                }
                if(formLabelAlign.templateGroupId){
                    url = '/remoteTrial/updateRemoteTemplateGroupInfo';
                    params = {
                        templateGroupName:formLabelAlign.name,
                        templateGroupDesc:formLabelAlign.desc,
                        templateGroupId:formLabelAlign.templateGroupId,
                    }
                }
                if(!formLabelAlign.name){
                    this.$msgw("请输入分组名称")
                    return
                }
                this.$http.post(url,params).then(data =>{
                    if(data.code===200){
                        this.ismain = false;
                        this.$msgs(data.message);
                        this.getTableData();
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            //修改当前行信息
            edit(index,val){
                this.ismain=true;
                this.$refs.addremoteAlertfour1.text='修改模板分组';
                this.$refs.addremoteAlertfour1.formLabelAlign.name=val.templateGroupName;
                this.$refs.addremoteAlertfour1.formLabelAlign.desc=val.templateGroupDesc;
                this.$refs.addremoteAlertfour1.formLabelAlign.templateGroupId=val.templateGroupId;
            },
            //删除当前行内容
            delinfo(index,val){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/remoteTrial/deleteRemoteTemplateGroupInfo', {
                        templateGroupId:val.templateGroupId
                    }).then(data =>{
                        if(data.code===200){
                            this.$msgs(data.message);
                            this.getTableData();
                        }else{
                            this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .retabpaneFour1{
        .mr();
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>