<template>
    <div class="superMainAlert">
        <spring-box :alertShow.sync="alertShow" mainText="庭审主机配置" @sure="sureAdd">
            <main-Engine-alert ref="mainEngineAlert"/>
        </spring-box>
        <headBox :btnList="btnList" @add="add" />
        <table-box :tableKey="tableKey" :tableData="tableData">
            <el-table-column slot="signalSourceType" label="编解码类型" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.signalSourceType==1?'编码':'解码'}}</span>
                </template>
            </el-table-column>
            <el-table-column slot="operate" label="操作" width="120">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="edit(scope.$index, scope.row)">修改</span>
                        <span  @click="delinfo(scope.$index, scope.row)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
    </div>
</template>

<script>
    import Tool from "../../js/tools"
    export default {
        name: "superMainAlert",
        components: {
            headBox: () => import("../../component/headBox"),
            pagingBox: () => import("../../component/pagingBox"),
            tableBox:()=>import("../../component/tableBox"),
            springBox:()=>import("../../component/springBox/springBox"),
            mainEngineAlert:()=>import("./mainEngineAlert"),
        },
        data() {
            return {
                alertShow:false,
                btnList:[{name:'添加',event:'add',icon:'el-icon-plus'}],
                tableKey:[{prop:'trialDeviceIp',label:'庭审主机IP',width:'150px',tooltip:true},
                    {prop:'channelNumber',label:'通道号',tooltip:true},
                    {prop:'flowAddress',label:'流地址'},
                    {slot: 'signalSourceType'},
                    {slot: 'operate'}],
                tableData:[],
                etgsId:'',
                editBoolean:false
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取
            async getETGSTrialDevices(){
                let {etgsId}=this
                let res=await this.$http.post('/etgsTrialDeviceConfig/getETGSTrialDevices',{etgsTrialDevice:{etgsId}},true,'加载中...')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            add(){
                this.$refs.mainEngineAlert.formLabelAlign={
                        trialDeviceIp:'',
                        channelNumber: '',
                        signalSourceType:1,
                        flowAddress:'',
                        subtitlePosition:1,
                        subtitleType:''
                }
                this.editBoolean=false;
                this.alertShow=true;
            },
            edit(index,row){
                for(let i in row){
                    this.$refs.mainEngineAlert.formLabelAlign[i]=row[i];
                }
                this.editBoolean=true
                this.alertShow=true
            },
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if(_this.editBoolean){
                        let res=await  _this.$http.post('/etgsTrialDeviceConfig/deleteETGSTrialDevice', {
                            etgsTrialDevice:{etgsTrialDeviceId:row.etgsTrialDeviceId}
                        },true)
                        if(res){
                            _this.$msgs('删除成功!');
                            _this.getETGSTrialDevices();
                        }
                    }else{
                        _this.tableData.splice(index,1);
                        _this.$msgs('删除成功!');
                    }

                }).catch(() => {

                });
            },
            async sureAdd(){
                if(!this.$refs.mainEngineAlert.formLabelAlign.trialDeviceIp){
                    this.$msgw("请输入庭审主机IP")
                    return
                }else{
                    if(!Tool.isValidIP(this.$refs.mainEngineAlert.formLabelAlign.trialDeviceIp)){
                        this.$msgw("请输入正确的IP")
                        return
                    }
                }
                if(!this.$refs.mainEngineAlert.formLabelAlign.channelNumber){
                    this.$msgw("请输入通道号")
                    return
                }
                if(this.$refs.mainEngineAlert.formLabelAlign.signalSourceType==1&&!this.$refs.mainEngineAlert.formLabelAlign.flowAddress){
                    this.$msgw("请输入流地址")
                    return
                }
                if(!this.editBoolean){
                    this.tableData.push(this.$refs.mainEngineAlert.formLabelAlign);
                    this.$msgs("保存成功")
                    this.alertShow=false
                    return
                }
                let res=await this.$http.post('/etgsTrialDeviceConfig/saveETGSTrialDevice',{etgsTrialDevice:this.$refs.mainEngineAlert.formLabelAlign},true,'加载中...')
                if(res){
                    this.$msgs("保存成功")
                    this.alertShow=false
                    this.getETGSTrialDevices()
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
    @import url("../../css/common.less");
    .superMainAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.2rem;
        .tableBox{
            min-height:4rem;
            max-height:6rem;
            overflow: auto;
        }
        .pagingBox{
            position:relative;
            left:0;
            top:0;
            width:100%;
            background: #ECEFF0;
        }
    }
</style>
<style lang="less">

</style>