<template>
    <div class="cloudAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="账户类型" required>
                <el-input v-model.trim="formLabelAlign.accountType"></el-input>
            </el-form-item>
            <el-form-item label="appId" required>
                <el-input v-model.trim="formLabelAlign.appId"></el-input>
            </el-form-item>
            <el-form-item label="第三人ID" required>
                <el-input v-model.trim="formLabelAlign.appIdAt3rd"></el-input>
            </el-form-item>
            <el-form-item label="appKey" required>
                <el-input v-model.trim="formLabelAlign.appKey"></el-input>
            </el-form-item>
            <el-form-item label="有效期天数" required>
                <el-input v-model.trim="formLabelAlign.expireDay"></el-input>
            </el-form-item>
            <el-form-item label="厂商类型" required>
                <el-select v-model="formLabelAlign.rtcType">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "cloudAlert",
        data() {
            return {
                selectList:[{id:1,name:'腾讯'}],
                labelPosition: 'left',
                formLabelAlign: {
                    accountType: '',
                    appId:'',
                    appIdAt3rd:'',
                    appKey:'',
                    expireDay:'',
                    //privateKey:'',
                    //publicKey:'',
                    rtcType:'',
                    //enabled:false
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                if(row){
                    for(let i in row){
                        this.formLabelAlign[i]=row[i]
                    }
                }else{
                    this.formLabelAlign={
                        rtcId:'',
                        accountType: '',
                        appId: '',
                        appIdAt3rd: '',
                        appKey: '',
                        expireDay: '',
                        rtcType:1,
                    }
                }
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
    .cloudAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.2rem;
        .el-form{
            .f-s-b();
            flex-wrap: wrap;
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
                width:9.9rem;
                textarea{
                    height:100px;
                }
            }
        }
    }
</style>
<style lang="less">

</style>