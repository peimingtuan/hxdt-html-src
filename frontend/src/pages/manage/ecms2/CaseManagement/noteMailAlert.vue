<template>
    <div class="noteMailAlert">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <receive-add-alert ref="receiveAddAlert"/>
        </spring-box>
        <div class="head-line">短信接收人:</div>
        <headBox :btnList="btnList" @add="add" />
        <table-box :tableKey="tableKey" :tableData="tableData" :maxHeight="maxHeight" @handleSelectionChange="handleSelectionChange">
            <el-table-column slot="operate" label="操作" width="200">
                <template slot-scope="scope">
                    <div class="isedit">
                        <span  @click="editPhone(scope.$index, scope.row)">修改手机号</span>
                        <span  @click="delInfo(scope.$index, scope.row)">删除</span>
                    </div>
                </template>
            </el-table-column>
        </table-box>
        <div class="head-line">短信内容:</div>
        <div class="remark">
            <textarea v-model.trim="smsTemplateContent"></textarea>
        </div>
    </div>
</template>

<script>
    import Tool from "../../ecms/js/tools"
    export default {
        name: "noteMailAlert",
        components:{
            springBox:()=>import("../../ecms/component/springBox/springBox"),
            headBox: () => import("../../ecms/component/headBox"),
            tableBox:()=>import("../../ecms/component/tableBox"),
            receiveAddAlert:()=>import("./receiveAddAlert")
        },
        data() {
            return {
                mainText:'添加发送对象',
                alertShow:false,
                maxHeight:200,
                btnList:[{name:'添加发送对象',event:'add',icon:'el-icon-plus'}],
                tableKey:[
                    {prop:'participantKindName',label:'角色',tooltip:true},
                    {prop:'participantName',label:'姓名',tooltip:true},
                    {prop:'phone',label:'手机号',tooltip:true},
                    {slot: 'operate'}],
                tableData:[],
                caseInfoId:'',
                trialPlanId:'',
                smsTemplateContent:'',
                selectTableList:[]
            }
        },
        provide:{
            sureText:'确定'
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                this.caseInfoId=row.caseInfoId;
                this.trialPlanId=row.trialPlanId;
                this.getSmsParticipants()
                this.getSMSTemplateByStrategy(row.caseNumber)
            },
            //接收人列表
            async getSmsParticipants(){
                let {caseInfoId,trialPlanId}=this;
                let res=await this.$http.post('/sendSmsMessage/getSmsParticipants',{caseInfoId,trialPlanId},true,'加载中...')
                if(res)this.tableData=res.data;
            },
            //短信内容
            async getSMSTemplateByStrategy(caseNumber){
                let param={
                    trialPlanId:this.trialPlanId,
                    caseNumber,
                    internetSmsStrategyType:'NOTIFY_IMMEDIATELY'
                }
                let res=await this.$http.post('/internetSmsStrategyConfig/getSMSTemplateByStrategy',param,true,'加载中...')
                if(res&&res.data)this.smsTemplateContent=res.data.smsTemplateContent;
            },
            handleSelectionChange(v){
                this.selectTableList=v
            },
            add(){
                this.alertShow=true;
                this.$refs.receiveAddAlert.show()
            },
            sureAdd(){
                if(!this.$refs.receiveAddAlert.etgsGroup.participantName){
                    this.$msgw("请输入姓名")
                    return
                }
                if(!this.$refs.receiveAddAlert.etgsGroup.participantKindName){
                    this.$msgw("请选择角色")
                    return
                }
                if(!this.$refs.receiveAddAlert.etgsGroup.phone){
                    this.$msgw("请输入手机号")
                    return
                }else{
                    if(!Tool.checkPhones(this.$refs.receiveAddAlert.etgsGroup.phone)){
                        this.$msgw("请输入正确的手机号")
                        return
                    }
                }
                this.tableData.push(this.$refs.receiveAddAlert.etgsGroup)
                this.alertShow=false;
            },
            editPhone(index,row) {
                this.$prompt('请输入新手机号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue:row.phone,
                    inputPattern: /^1[3456789]\d{9}$/,
                    inputErrorMessage: '手机号格式不正确'
                }).then(({ value }) => {
                    row.phone=value
                    this.$msgs("修改成功")
                }).catch(() => {

                });
            },
            delInfo(index,row) {
                let _this = this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.tableData.splice(index,1)
                    _this.$msgs('删除成功!');
                }).catch(() => {

                });
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .noteMailAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        max-height:6rem;
        overflow: auto;
        padding:.1rem .2rem .2rem;
        .head-line{
            line-height:.5rem;
            .f20()
        }
        .remark{
            margin: 5px 0;
            border-radius: 3px;
            border: 1px solid #c6c6c6;
            height:100px;
            background:#e3e7e8;
            textarea {
                padding: 5px;
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                overflow: auto;
                resize: none;
                background:#e3e7e8;
            }
        }
    }
</style>
<style lang="less">
    .noteMailAlert {
        .main-box{
            width:8rem!important;
        }
    }
</style>