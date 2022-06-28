<template>
    <div class="noteModule">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <note-moduleadd-alert ref="noteModuleaddAlert"/>
        </spring-box>
        <headBox :btnList="btnList" @add="add" />
        <table-box :tableKey="tableKey" :tableData="tableData">
            <el-table-column slot="operate" label="操作" width="150">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="edit(scope.$index, scope.row)">修改</span>
                        <span  @click="delInfo(scope.$index, scope.row)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
        <paging-box :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"/>
    </div>
</template>

<script>
    export default {
        name: "noteModule",
        components: {
            headBox: () => import("../../component/headBox"),
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            noteModuleaddAlert:()=>import("./noteModuleaddAlert")
        },
        data() {
            return {
                mainText:'短信模板',
                alertShow:false,
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'},],
                tableKey:[{prop:'smsTemplateName',label:'模板名称',tooltip:true},
                    {prop:'smsTemplateContent',label:'模板内容',tooltip:true},
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
            async getSMSTemplates(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/smsTemplateConfig/getSMSTemplates',{smsBussinessType:'INTERNET_SMS_BUSSINESS_TYPE',pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            add(){
                this.$refs.noteModuleaddAlert.show();
                this.alertShow=true;
            },
            edit(index,row){
                this.$refs.noteModuleaddAlert.show(row);
                this.alertShow=true;
            },
            delInfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res=await  _this.$http.post('/smsTemplateConfig/deleteSMSTemplate', {
                        smsTemplate:{smsTemplateId:row.smsTemplateId}
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getSMSTemplates();
                    }
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex=page
                this.getSMSTemplates()
            },
            async sureAdd(){
                if(!this.$refs.noteModuleaddAlert.formLabelAlign.smsTemplateName){
                    this.$msgw("请输入模板名称")
                    return
                }
                let res=await this.$http.post('/smsTemplateConfig/saveSMSTemplate',{smsTemplate:this.$refs.noteModuleaddAlert.formLabelAlign},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getSMSTemplates()
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
    .noteModule {

    }
</style>
<style lang="less">

</style>