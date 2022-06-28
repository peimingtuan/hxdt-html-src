<template>
    <div class="interNettab3">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <cloud-alert ref="cloudAlert"/>
        </spring-box>
        <headBox :btnList="btnList" @add="add" />
        <table-box :tableKey="tableKey" :tableData="tableData">
            <el-table-column slot="rtcType" label="厂商类型">
                <template slot-scope="scope">
                   <span>{{scope.row.rtcType==1?'腾讯':''}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column slot="enabled" label="是否启用">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.enabled?'已启用':'未启用'}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column slot="operate" label="操作">
                <template slot-scope="scope" width="200">
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
    import Tool from "../js/tools"
    export default {
        name: "interNettab3",
        components: {
            headBox: () => import("../component/headBox"),
            pagingBox: () => import("../component/pagingBox"),
            tableBox:()=>import("../component/tableBox"),
            springBox:()=>import("../component/springBox/springBox"),
            cloudAlert:()=>import("./interNettab3/cloudAlert")
        },
        data() {
            return {
                mainText:'云账号',
                alertShow:false,
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'},],
                tableKey:[{prop:'accountType',label:'账户类型',width:'150px',tooltip:true},
                    {prop:'appId',label:'appId'},
                    {prop:'appIdAt3rd',label:'第三人ID'},
                    {prop:'appKey',label:'appKey'},
                    {prop:'expireDay',label:'有效期天数'},
                    // {prop:'privateKey',label:'私钥'},
                    // {prop:'publicKey',label:'公钥'},
                    {slot: 'rtcType'},
                    //{slot: 'enabled'},
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
        destroyed() {

        },
        watch:{

        },
        methods: {
            //获取
            async getRTCConfigs(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/rtcConfig/getRTCConfigs',{pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getRTCConfigs()
            },
            add(){
                this.$refs.cloudAlert.show()
                this.alertShow=true
            },
            edit(index,row){
                this.$refs.cloudAlert.show(row)
                this.alertShow=true
            },
            //删除
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res=await  _this.$http.post('/rtcConfig/deleteRTCConfig', {
                        realTimeCommunication:{rtcId:row.rtcId}
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getRTCConfigs();
                    }
                }).catch(() => {

                });
            },
            //保存
            async sureAdd(){
                if(!this.$refs.cloudAlert.formLabelAlign.accountType){
                    this.$msgw("请输入账户类型")
                    return
                }
                if(!this.$refs.cloudAlert.formLabelAlign.appId){
                    this.$msgw("请输入appId")
                    return
                }
                if(!this.$refs.cloudAlert.formLabelAlign.appIdAt3rd){
                    this.$msgw("请输入第三人ID")
                    return
                }
                if(!this.$refs.cloudAlert.formLabelAlign.appKey){
                    this.$msgw("请输入appKey")
                    return
                }
                if(!this.$refs.cloudAlert.formLabelAlign.expireDay){
                    this.$msgw("请输入有效期天数")
                    return
                }else{
                    if(!Tool.ispositiveInteger(this.$refs.cloudAlert.formLabelAlign.expireDay)){
                        this.$msgw("输入有效期的天数必须为整数")
                        return
                    }
                }
                // if(!this.$refs.cloudAlert.formLabelAlign.privateKey){
                //     this.$msgw("请输入私钥")
                //     return
                // }
                // if(!this.$refs.cloudAlert.formLabelAlign.publicKey){
                //     this.$msgw("请输入公钥")
                //     return
                // }
                let res=await this.$http.post('/rtcConfig/saveRTCConfig',{realTimeCommunication:this.$refs.cloudAlert.formLabelAlign},true,'加载中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getRTCConfigs()
                }
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .interNettab3{

    }
</style>
<style lang="less" scoped>
    .interNettab3{
        min-height:8rem;
    }
</style>