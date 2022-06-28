<template>
    <div class="pointoutModule">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <pointout-alert ref="pointoutAlert"/>
        </spring-box>
        <table-box :tableKey="tableKey" :tableData="tableData">
            <el-table-column slot="enabled" label="是否开启">
                <template slot-scope="scope">
                    <div>{{scope.row.enabled?'开启':'关闭'}}</div>
                </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="edit(scope.$index, scope.row)">修改</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
        <paging-box :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"/>
    </div>
</template>

<script>
    export default {
        name: "pointoutModule",
        components:{
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            pointoutAlert:()=>import("./pointoutAlert")
        },
        data() {
            return {
                mainText:'提示语设置',
                alertShow:false,
                tableKey:[{prop:'violationName',label:'违规项',tooltip:true},
                    {prop:'tip',label:'提示语',tooltip:true},
                    {slot: 'enabled'},
                    {slot: 'operate'}],
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:0
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            async getAuditInspectorViolations(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/auditInspectorViolationConfig/getAuditInspectorViolations',{pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            edit(index,row){
                this.$refs.pointoutAlert.show(row);
                this.alertShow=true;
            },
            handleCurrentChange(page){
                this.pageIndex=page
                this.getAuditInspectorViolations()
            },
            async sureAdd(){
                if(!this.$refs.pointoutAlert.formLabelAlign.violationName){
                    this.$msgw("请输入违规项")
                    return
                }
                if(!this.$refs.pointoutAlert.formLabelAlign.tip){
                    this.$msgw("请输入提示语")
                    return
                }
                let res=await this.$http.post('/auditInspectorViolationConfig/updateAuditInspectorViolation',{auditInspectorViolation:this.$refs.pointoutAlert.formLabelAlign},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getAuditInspectorViolations()
                }
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .pointoutModule {

    }
</style>
<style lang="less">
    .pointoutModule {
        .main-box{
            width:10rem!important;
        }
    }
</style>