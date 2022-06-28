<template>
    <div class="policeNumaddAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="姓名" required>
                <el-input v-model.trim="formLabelAlign.devOpsPersonName"></el-input>
            </el-form-item>
            <el-form-item label="手机号" required>
                <el-input v-model.trim="formLabelAlign.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" required>
                <el-input v-model.trim="formLabelAlign.mail"></el-input>
            </el-form-item>
            <!--<el-form-item label="说明" prop="desc">-->
                <!--<el-input type="textarea" v-model.trim="formLabelAlign.desc" placeholder="......"></el-input>-->
            <!--</el-form-item>-->
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "policeNumaddAlert",
        data() {
            return {
                labelPosition: 'left',
                formLabelAlign: {
                    devOpsPersonId: '',
                    devOpsPersonName:'',
                    mail:'',
                    phoneNumber:'',
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
                      devOpsPersonId: '',
                      devOpsPersonName:'',
                      mail:'',
                      phoneNumber:'',
                  }
              }
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .policeNumaddAlert {
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
<style lang="less" scoped>

</style>