<template>
    <div class="supervise">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <super-add-alert ref="superAddAlert" @mainConfig="main" :selectList="selectList"/>
        </spring-box>
        <spring-box :alertShow.sync="mainShow" mainText="庭审主机配置" @sure="sureMain">
            <super-main-alert ref="superMainAlert" />
        </spring-box>
        <spring-box :alertShow.sync="configShow" mainText="场景配置" @sure="sureConfig">
            <superscence-config-alert ref="superscenceConfigAlert"/>
        </spring-box>
        <headBox :btnList="btnList" @add="add" @advise="advise" />
        <table-box :tableKey="tableKey" :tableData="tableData" :pageIndex="pageIndex" @handleSelectionChange="handleSelectionChange">
            <el-table-column slot="etgsVersion" label="音视频网关版本">
                <template slot-scope="scope">
                    <div>{{scope.row.etgsVersion==1?'ETGS一期':'ETGS二期'}}</div>
                </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作" width="320">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="edit(scope.$index, scope.row)">修改</span>
                        <span  @click="delinfo(scope.$index, scope.row)">删除</span>
                        <span  @click="upload(scope.$index, scope.row)">下载</span>
                        <span  @click="config(scope.$index, scope.row)">场景配置</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
        <paging-box :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"/>
    </div>
</template>

<script>
    import getApiUrl from "../../js/getApiUrl"
    import Tool from "../../js/tools"
    export default {
        name: "supervise",
        components: {
            headBox: () => import("../../component/headBox"),
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            superAddAlert:()=>import("./superaddAlert"),
            superMainAlert:()=>import("./superMainAlert"),
            superscenceConfigAlert:()=>import("./superscenceConfigAlert")
        },
        data() {
            return {
                mainText:'网关添加',
                alertShow:false,
                mainShow:false,
                configShow:false,
                selectList:[],
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'},
                    {name:'通知',event:'advise'}],
                tableKey:[
                    {prop:'etgsName',label:'名称',tooltip:true},
                    {prop:'etgsSerialNumber',label:'序列号',tooltip:true,width:200},
                    {prop:'etgsDeploymentPlanName',label:'方案',tooltip:true,width:200},
                    //{prop:'sdkNum',label:'SDK数量'},
                    //{prop:'sdkUsableNum',label:'SDK可用数量'},
                    {prop:'etgsIp',label:'IP地址'},
                    {slot: 'etgsVersion'},
                    {prop:'softCentralCommand',label:'软中控命令'},
                    {slot: 'operate'}],
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:0,
                multipleSelection: [],//表格存值
            }
        },
        created() {

        },
        mounted() {
        },
        methods: {
            //获取网关设备列表
            async getETGSConfigs(){
                this.$showLoading('rgba')
                let {pageIndex,pageSize}=this;
                let res=await this.$http.post('/etgsConfig/getETGSConfigs',{pageIndex,pageSize},true)
                this.$hideLoading('rgba')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            //获取部署方案
            async getDeploymentPlans(){
                let res=await this.$http.post('/etgsConfig/getDeploymentPlans',{},true)
                if(res){
                    this.selectList=res.data;
                }
            },
            //添加网关设备
            add(){
                this.$refs.superAddAlert.show()
                this.alertShow=true
            },
            edit(index,row){
                this.$refs.superAddAlert.show(row)
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
                    let res=await  _this.$http.post('/etgsConfig/deleteETGSConfig', {
                        etgs:{etgsId:row.etgsId}
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getETGSConfigs();
                    }
                }).catch(() => {

                });
            },
            handleSelectionChange(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
            //通知
            async advise(){
                let {multipleSelection}=this;
                if(multipleSelection.length===0){
                    this.$msgw("请先勾选选框")
                    return
                }
                let res=await this.$http.post('/etgsConfig/syncETGSInfo',{etgsList:multipleSelection},true)
                if(res){
                    this.$msgw("通知成功!")
                }
            },
            //下载
            upload(index,row){
                window.open(getApiUrl('/etgsConfig/downloadETGSRSAPrivate?id='+row.etgsId))
                // Tool.saveAs(getApiUrl(
                //     '/etgsConfig/downloadETGSRSAPrivate?id='+row.etgsId+'&fileName=etgs.key'
                // ));
            },
            //保存
            async sureAdd(){
                if(!this.$refs.superAddAlert.formLabelAlign.etgsName){
                    this.$msgw("请输入名称")
                    return
                }
                if(!this.$refs.superAddAlert.formLabelAlign.etgsSerialNumber){
                    this.$msgw("请输入序列号")
                    return
                }
                if(!this.$refs.superAddAlert.formLabelAlign.etgsDeploymentPlan){
                    this.$msgw("请选择方案")
                    return
                }
                if(this.$refs.superAddAlert.formLabelAlign.sdkNum&&!Tool.ispositiveInteger(this.$refs.superAddAlert.formLabelAlign.sdkNum)){
                    this.$msgw("SDK数量必须为非负整数")
                    return
                }
                if(this.$refs.superAddAlert.formLabelAlign.sdkUsableNum&&!Tool.ispositiveInteger(this.$refs.superAddAlert.formLabelAlign.sdkUsableNum)){
                    this.$msgw("SDK可用数量必须为非负整数")
                    return
                }
                if(!this.$refs.superAddAlert.formLabelAlign.etgsIp){
                    this.$msgw("请输入IP地址")
                    return
                }else{
                    if(!Tool.isValidIP(this.$refs.superAddAlert.formLabelAlign.etgsIp)){
                        this.$msgw("请输入正确的IP")
                        return
                    }
                }
                if(this.$refs.superAddAlert.formLabelAlign.etgsDeploymentPlan&&this.$refs.superAddAlert.formLabelAlign.etgsDeploymentPlan!=='DeploymentPlan2'){
                    if(!this.$refs.superAddAlert.formLabelAlign.appId){
                        this.$msgw("请选择云账号")
                        return
                    }
                }
                //庭审主机配置信息
                if(this.$refs.superAddAlert.formLabelAlign.etgsDeploymentPlan=='DeploymentPlan3'){
                    this.$refs.superAddAlert.formLabelAlign.etgsTrialDevices=this.$refs.superMainAlert.tableData
                }else this.$refs.superAddAlert.formLabelAlign.etgsTrialDevices=[]
                let res=await this.$http.post('/etgsConfig/saveETGSConfig',{etgs:this.$refs.superAddAlert.formLabelAlign},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getETGSConfigs()
                }
            },
            handleCurrentChange(page){
                this.pageIndex=page
                this.getETGSConfigs()
            },
            //庭审主机配置
            main(etgsId){
                this.mainShow=true
                if(etgsId){
                    this.$refs.superMainAlert.etgsId=etgsId;
                    this.$refs.superMainAlert.getETGSTrialDevices()
                }else{
                    this.$refs.superMainAlert.etgsId='';
                    this.$refs.superMainAlert.tableData=[];
                }
            },
            sureMain(){
                this.mainShow=false
            },
            //场景配置
            config(index,row){
                this.configShow=true;
                this.$refs.superscenceConfigAlert.getETGSViewOutputConfig(row.etgsId)
            },
            sureConfig(){
                this.$refs.superscenceConfigAlert.saveETGSViewOutputConfig()
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    .supervise {
        &>div.tableBox{
            width:16.2rem;
        }
    }
</style>
<style lang="less">

</style>