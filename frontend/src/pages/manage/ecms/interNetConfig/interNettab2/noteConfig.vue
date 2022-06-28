<template>
    <div class="noteConfig">
        <!--<p class="title">-->
            <!--<el-checkbox>自动短信通知</el-checkbox>-->
        <!--</p>-->
        <p class="con title">通知策略：</p>
        <div class="con">
            <div v-for="(item,index) in groupList" :key="index">
                <el-checkbox v-model="item.enabled"></el-checkbox>
                <span v-if="item.internetSmsStrategyType==='NOTIFY_FEW_HOURS_BEFORE'">
                    开庭前
                    <el-input class="number" type="number"  v-model="item.hour"  :min="0" :max="24"></el-input>
                    小时通知
                </span>
                <span v-else>
                    {{item.internetSmsStrategyType==='NOTIFY_IMMEDIATELY'?'排期后立即通知':'开庭前一天通知'}}
                </span>
                <span class="span-line" :class="item.internetSmsStrategyType==='NOTIFY_FEW_HOURS_BEFORE'?'leave-span':''">使用模板</span>
                <el-select v-model="item.smsTemplateId">
                    <el-option
                            v-for="item in selectList"
                            :key="item.smsTemplateId"
                            :label="item.smsTemplateName"
                            :value="item.smsTemplateId">
                    </el-option>
                </el-select>&nbsp;<font v-if="item.internetSmsStrategyType==='NOTIFY_FEW_HOURS_BEFORE'">例：开庭前1小时通知，开庭时间是在14:00~14:59之间时，发短信的时间为13:00</font>
            </div>
        </div>
        <div class="saveBox">
            <el-button type="primary" @click="saveInfo">保存设置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noteConfig",
        data() {
            return {
                selectList:[],
                groupList:[
                    {
                        internetSmsStrategyType:'NOTIFY_IMMEDIATELY',
                        smsTemplateId:'',
                        enabled:false,
                    },
                    {
                        internetSmsStrategyType:'NOTIFY_ONE_DAY_BEFORE',
                        smsTemplateId:'',
                        enabled:false,
                    },
                    {
                        internetSmsStrategyType:'NOTIFY_FEW_HOURS_BEFORE',
                        enabled:false,
                        smsTemplateId:'',
                        hour:''
                    }
                ],
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取模板
            async getSMSTemplates(){
                let res=await this.$http.post('/smsTemplateConfig/getSMSTemplates',{smsBussinessType:'INTERNET_SMS_BUSSINESS_TYPE',pageIndex:-1,pageSize:-1},true)
                if(res)this.selectList=res.data;
            },
            async getInternetSmsStrategies(){
                this.$showLoading('rgba')
                let res=await this.$http.post('/internetSmsStrategyConfig/getInternetSmsStrategies',{},true)
                this.$hideLoading('rgba')
                if(res&&res.data.length>0)this.groupList=res.data;
            },
            async saveInfo(){
                let res=await this.$http.post('/internetSmsStrategyConfig/saveInternetSmsStrategies',{internetSmsStrategies:this.groupList},true,'保存中...')
                if(res)this.$msgs("保存成功")
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .noteConfig {
        .title{
            margin:.3rem;
        }
        .con{
            margin-left:1rem;
            &>div{
                margin-top:.5rem;
                span.span-line{
                    margin:0 .2rem 0 1.5rem;
                }
                span.leave-span{
                    margin-left:.4rem;
                }
            }
        }
        .saveBox{
            width:100vw;
            position:fixed;
            bottom:.2rem;
            left:0;
            text-align: center;
        }
    }
</style>
<style lang="less">
    @import url("../../css/common.less");
    .noteConfig{
        .number{
            width:1rem!important;
        }
        .el-checkbox{
            span{
                .f18();
            }
        }
        .el-input{
            width:4rem;
            .el-input__inner {
                height: .4rem;
                line-height: .4rem;
                padding: 0 .15rem;
                .f18();
            }
        }
    }
</style>