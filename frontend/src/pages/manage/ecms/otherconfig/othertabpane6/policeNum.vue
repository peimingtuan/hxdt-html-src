<template>
    <div class="policeNum">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <police-numadd-alert ref="policeNumaddAlert"/>
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
    import Tool from "../../js/tools"
    export default {
        name: "policeNum",
        components:{
            headBox: () => import("../../component/headBox"),
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            policeNumaddAlert:()=>import("./policeNumaddAlert")
        },
        data() {
            return {
                mainText:'账号信息',
                alertShow:false,
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'},],
                tableKey:[{prop:'devOpsPersonName',label:'姓名',tooltip:true},
                    {prop:'phoneNumber',label:'手机号',tooltip:true},
                    {prop:'mail',label:'电子邮箱',tooltip:true},
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
            async getDevOpsPersonInfos(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/devOpsPersonInfoConfig/getDevOpsPersonInfos',{pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            add(){
                this.$refs.policeNumaddAlert.show();
                this.alertShow=true;
            },
            edit(index,row){
                this.$refs.policeNumaddAlert.show(row);
                this.alertShow=true;
            },
            delInfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res=await  _this.$http.post('/devOpsPersonInfoConfig/deleteDevOpsPersonInfo', {
                        devOpsPersonIds:row.devOpsPersonId
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getDevOpsPersonInfos();
                    }
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex=page
                this.getDevOpsPersonInfos()
            },
            async sureAdd(){
                if(!this.$refs.policeNumaddAlert.formLabelAlign.devOpsPersonName){
                    this.$msgw("请输入姓名")
                    return
                }
                if(!this.$refs.policeNumaddAlert.formLabelAlign.phoneNumber){
                    this.$msgw("请输入手机号")
                    return
                }else{
                    if(!Tool.checkPhone(this.$refs.policeNumaddAlert.formLabelAlign.phoneNumber)){
                        this.$msgw("请输入正确的手机号")
                        return
                    }
                }
                if(!this.$refs.policeNumaddAlert.formLabelAlign.mail){
                    this.$msgw("请输入电子邮箱")
                    return
                }else{
                    if(!Tool.isEmail(this.$refs.policeNumaddAlert.formLabelAlign.mail)){
                        this.$msgw("请输入正确的电子邮箱")
                        return
                    }
                }
                let res=await this.$http.post('/devOpsPersonInfoConfig/saveDevOpsPersonInfo',{devOpsPersonInfo:this.$refs.policeNumaddAlert.formLabelAlign},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getDevOpsPersonInfos()
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
    .policeNum {

    }
</style>
<style lang="less">
    .policeNum {
        .main-box{
            width:10rem!important;
        }
    }
</style>