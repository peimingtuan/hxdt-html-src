<template>
    <div class="noteModuleaddAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="模板名称" required>
                <el-input v-model.trim="formLabelAlign.smsTemplateName"></el-input>
            </el-form-item>
        </el-form>
        <div class="title">模板变量:</div>
        <div class="list">
            <div v-for="(item,index) in returnLabelList" :key="index">
                {{item.templateVariableName}}<el-button round @click="copyCon(item)">复制</el-button>
            </div>
        </div>
        <div class="title">
            模板内容:<span>(将变量粘贴在需要的位置,快捷方式ctrl+v)</span>
        </div>
        <div class="remark">
            <textarea v-model.trim="formLabelAlign.smsTemplateContent" ref="void_writeinfo"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noteModuleaddAlert",
        data() {
            return {
                labelPosition: 'left',
                formLabelAlign: {
                    smsBussinessType: "",//短信业务类型
                    smsTemplateContent: "",//短信模版内容
                    smsTemplateDesc: "",//描述
                    smsTemplateId: "",//短信模版id
                    smsTemplateName: "",//短信模版名称
                    smsBussinessType:'ALARM_SMS_BUSSINESS_TYPE',
                },
                returnLabelList:[]
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                this.getMessageTemplateVariables()
                if(row){
                    for(let i in row){
                        this.formLabelAlign[i]=row[i]
                    }
                }else{
                    this.formLabelAlign={
                        smsBussinessType: "",
                        smsTemplateContent: "",
                        smsTemplateDesc: "",
                        smsTemplateId: "",
                        smsTemplateName: "",
                        smsBussinessType:'ALARM_SMS_BUSSINESS_TYPE',
                    }
                }
            },
            //消息模板变量
           async getMessageTemplateVariables(){
                let res=await this.$http.post('/messageTemplateVariableConfig/getMessageTemplateVariables',{templateVariableType:'ALARM_SMS_BUSSINESS_TYPE'},true)
                if(res)this.returnLabelList=res.data;
            },
            copyCon(v){
                this.copy(v.templateVariableName)
            },
            copy(v){
                let transfer = document.createElement('input');
                document.body.appendChild(transfer);
                transfer.value = '$'+`{${v}}`;  // 这里表示想要复制的内容
                transfer.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                }
                console.log('复制成功');
                document.body.removeChild(transfer);
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .noteModuleaddAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.2rem;
        .el-form{
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
            }
            /*input框*/
            .el-input,.el-select{
                width:4rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
        }
        .list{
            .el-button {
                margin-left:.1rem;
                padding:0 .2rem;
                height:.35rem;
                background:#edf5ff;
                border:1px solid #BEDEFF;
                span{
                    color:#409EFF;
                    .f18();
                }
            }
        }
    }
</style>
<style lang="less" scoped>
    @import url("../../css/common.less");
    .noteModuleaddAlert{
        .title{
            line-height:.4rem;
            .f20();
            span{
                margin-left:10px;
                color:#777878;
                .f16()
            }
        }
        .list{
            .fl();
            flex-wrap: wrap;
            margin: 5px 0;
            padding:.1rem;
            border-radius: 3px;
            border: 1px solid #c6c6c6;
            min-height:1rem;
            max-height:2rem;
            overflow: auto;
            background:#e3e7e8;
            &>div{
                margin:5px;
                color:#409EFF ;
            }
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