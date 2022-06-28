<template>
    <div class="check1">
        <el-form :label-position="labelPosition" :model="checkinfo1">
            <el-form-item label="案号" class='casecss'>
                {{caseNumber}}
            </el-form-item>
            <el-form-item label="案件类型">
                {{caseTypeName}}
            </el-form-item>
            <el-form-item label="案由">
                <template v-for='item in caseOfCauseList '>
                    {{item.causeName}}
                </template>
            </el-form-item>
            <el-form-item label="立案日期">
                {{createCaseDate}}
            </el-form-item>
            <el-form-item label="承办法官">
                {{undertakerName}}
            </el-form-item>
            <el-form-item label="承办部门">
                {{departmentName}}
            </el-form-item>
            <el-form-item label="适用程序">
                <template v-if='applyProgram==1'>普通</template>
                <template v-else-if='applyProgram==2'>简易</template>
                <template v-else-if='applyProgram==3'>特殊</template>
            </el-form-item>
        </el-form>
    </div>
</template>
    
    <script>
        export default {
            name: "check1",
            data() {
                return {
                    caseNumber:"",//案号
                    caseTypeName: "", //案件类型
                    caseOfCauseList:"", //案由
                    createCaseDate:"", //立案日期
                    undertakerName:"", //承办法官
                    departmentName:"", //承办部门
                    applyProgram:"", //适用程序
                    labelPosition: 'left', //form表单左侧靠齐
                }
            },
            beforeCreate() {
    
            },
            created() {

            },
            mounted() {
             
            },
            destroyed() {
    
            },
            methods: {
                getAllInfoByCaseInfoId(info){
                    console.log(info)
                    this.caseNumber = info.caseNumber; //案号
                    this.caseTypeName = info.caseTypeName; //案件类型
                    this.caseOfCauseList = info.caseOfCauseList; //案由
                    this.createCaseDate = info.createCaseDate; //立案日期
                    this.undertakerName=info.undertakerName; //承办法官
                    this.departmentName=info.departmentName; //承办部门
                    this.applyProgram=info.applyProgram;
                },
                //查看当事人信息
                lookparty(){
                    this.ispartyinfo=true;
                },
                closenewcase(){
                    this.$emit('selectshow');
                },
                sure(){
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .check1{
            /* .el-form-item__label:first-child(1){
                width:1rem!important;
            } */
            .casecss{
                 /*input框*/
            .el-input{
                width:2rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
            }
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
            }
            /*input框*/
            .el-input{
                width:4rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
            .el-radio{
                /*选框*/
                .el-radio__inner{ 
                    width:.2rem;
                    height:.2rem;
                    &:after{
                        width:.06rem;
                        height:.06rem;
                    }
                }
                /*文本*/
                .el-radio__label{
                    .f18();
                }
            }
        }
    </style>