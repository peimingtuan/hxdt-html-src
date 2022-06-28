<template>
    <div class="receiveAddAlert">
        <el-form :label-position="labelPosition"
                 :model="etgsGroup"
                 ref="elForm"
        >
            <el-form-item label="姓名" required>
                <el-input v-model.trim="etgsGroup.participantName"></el-input>
            </el-form-item>
            <el-form-item label="角色" required>
                <el-select v-model="etgsGroup.participantKindName">
                    <el-option
                            v-for="item in selectList"
                            :key="item.caseStandingId"
                            :label="item.caseStandingName"
                            :value="item.caseStandingName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号" required>
                <el-input v-model="etgsGroup.phone"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "receiveAddAlert",
        data() {
            return {
                selectList:[],
                labelPosition: 'left',
                etgsGroup: {
                    participantName:'',
                    participantKindName: '',
                    phone:'',
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                this.getCaseStandingConfigs()
                if(row){
                    for(let i in row){
                        this.etgsGroup[i]=row[i];
                    }
                }else{
                    this.etgsGroup={
                        participantName:'',
                        participantKindName: '',
                        phone:'',
                    }
                }
            },
            //角色
            async getCaseStandingConfigs(){
                let res=await this.$http.post('/caseStandingConfig/getCaseStandingConfigs',{pageIndex:-1,pageSize:-1},true,'加载中...')
                if(res&&res.data)this.selectList=res.data;
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../css/common.less");
    .receiveAddAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:3rem;
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
            .el-textarea{
                width:6rem;
            }
        }
    }
</style>
<style lang="less">

</style>