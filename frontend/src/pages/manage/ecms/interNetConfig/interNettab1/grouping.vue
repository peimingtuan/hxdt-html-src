<template>
    <div class="grouping">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <group-add-alert ref="groupAddAlert"/>
        </spring-box>
        <headBox :btnList="btnList" @add="add" />
        <table-box :tableKey="tableKey" :tableData="tableData">
            <el-table-column slot="operate" label="操作" width="150">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="edit(scope.$index, scope.row)">修改</span>
                        <span  @click="delinfo(scope.$index, scope.row)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
        <paging-box :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"/>
    </div>
</template>

<script>
    export default {
        name: "grouping",
        components: {
            headBox: () => import("../../component/headBox"),
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            groupAddAlert:()=>import("./groupaddAlert")
        },
        data() {
            return {
                mainText:'网关分组',
                alertShow:false,
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'}],
                tableKey:[
                    {prop:'etgsGroupName',label:'网关组名称',tooltip:true},
                    {prop:'description',label:'描述'},
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
            //获取音视频网关组列表
            async getETGSGroups(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/etgsGroupConfig/getETGSGroups',{pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            add(){
                this.$refs.groupAddAlert.show()
                this.alertShow=true
            },
            edit(index,row){
                this.$refs.groupAddAlert.show(row)
                this.alertShow=true
            },
            //删除网关设备
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res=await  _this.$http.post('/etgsGroupConfig/deleteETGSGroup', {
                        etgsGroup:{etgsGroupId:row.etgsGroupId}
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getETGSGroups();
                    }
                }).catch(() => {

                });
            },
            //保存
            async sureAdd(){
                if(!this.$refs.groupAddAlert.etgsGroup.etgsGroupName){
                    this.$msgw("请输入分组名称")
                    return
                }
                let res=await this.$http.post('/etgsGroupConfig/saveETGSGroup',{etgsGroup:this.$refs.groupAddAlert.etgsGroup},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getETGSGroups()
                }
            },
            handleCurrentChange(page){
                this.pageIndex=page
                this.getETGSGroups()
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .grouping {

    }
</style>
<style lang="less">
    .grouping {
        .main-box{
            width:10rem!important;
        }
    }
</style>