<template>
    <div class="check1">
        <div class="check1-base-info" >
            <el-form :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item label="案号" class='casecss red-label'>
                    <el-input v-model="formLabelAlign.year" disabled></el-input>
                    <el-input v-model="formLabelAlign.courtPronoun" disabled></el-input>
                    <el-input v-model="formLabelAlign.caseTypePronoun" disabled></el-input>
                    <el-input v-model="formLabelAlign.caseNum" disabled></el-input>号
                </el-form-item>
                <div class="div-cen">
                    <el-form-item class="red-label" label="案件类型">
                        <el-input v-model="formLabelAlign.caseTypeName" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="red-label" label="案由">
                        <div class="case-yo">
                            <el-select
                                    v-model="values"
                                    multiple
                                    placeholder="案由"
                                    disabled
                            >
                                <el-option
                                        v-for="item in options"
                                        :key="item.causeCode"
                                        @click.native="selectChangecauseCode(item)"
                                        :label="item.causeName"
                                        :value="item.causeName">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="适用程序">
                        <el-input v-model="formLabelAlign.applyProgramStr" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="立案日期">
                        <el-input v-model="formLabelAlign.createCaseDate" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="red-label" label="承办部门">
                        <el-input v-model="formLabelAlign.departmentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item class="red-label" label="承办法官">
                        <el-input v-model="formLabelAlign.undertakerName" disabled></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="new1-people-info">
            <div class="title">
                <div class="bold">当事人信息</div>
            </div>
            <div class="table-style">
                <el-table ref="multipleTable" :data="tableData"
                          tooltip-effect="dark"  class='casetable'
                          style="width: 100%"
                          max-height="200"
                          @selection-change="handleSelectionChange">
                    <el-table-column prop="caseStandingName" label="诉讼地位" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="involvedPersonName" label="姓名/名称"  show-overflow-tooltip>
                    </el-table-column>
                    <!--<el-table-column prop="identityNumber" label="证件号码" show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="householdRegisterPlace" label="住所地" show-overflow-tooltip>-->
                    <!--</el-table-column>-->
                    <el-table-column  label="类型" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.partyTypeCode==1?'自然人':scope.row.partyTypeCode==2?'法人':'非法人组织'}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="代理人" show-overflow-tooltip>-->
                        <!--<template slot-scope="scope">-->
                                            <!--<span v-for='(item,index) in scope.row.agentInfoList' :key="index">-->
                                                    <!--{{item.personalInfoName}}-->
                                            <!--</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
            </div>
        </div>
    </div>
</template>
    
    <script>
        export default {
            name: "check1",
            data() {
                return {
                    options:[],
                    formLabelAlign: {
                        caseInfoId:"",
                        caseName:"",//案件名称 张三告李四
                        year:"",//年
                        courtCode:"",//法院代码 001
                        courtName:"",//法院名称 第一法庭
                        courtPronoun: '',//"京2",
                        caseNumber:"",//案号 2018京2刑初23
                        caseTypeCode: '',//案件类型23,
                        caseTypeName:"",//案件类型名称
                        causeCode:"",//案由id
                        causeName:"",//案由名称
                        caseOfCauseList:"",//案由列表
                        createCaseDate:"",//承办时间
                        departmentName:"",//承办部门名称
                        undertakerName:"",//承办法官姓名
                        departmentId:"",//承办部门名称
                        undertakerId:"",//承办法官姓名
                        applyProgramStr:"",//适用程序（1普通2简易3特殊）
                    },
                    tableData:[],
                    values:[],
                    labelPosition: 'left', //form表单左侧靠齐
                }
            },
            created() {

            },
            mounted() {
             
            },
            destroyed() {
    
            },
            methods: {
                getAllInfoByCaseInfoId(row){
                    //基本信息
                    for(let i in row){
                        this.formLabelAlign[i]=row[i];
                    }
                    let arr=[];
                    if(Array.isArray(row.caseOfCauseList)){
                        row.caseOfCauseList.map(item=>{
                            arr.push(item.causeName);
                        })
                    }
                    this.values=arr;
                    //当事人
                    this.tableData=row.involvedPersonDtoList;
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .check1{
            padding:0 .1rem;
            &-base-info{
                padding-left:.05rem;
                max-height:3.8rem;
                overflow: auto;
                /*立案案由*/
                .case-yo{
                    position:relative;
                    overflow: hidden;
                    .el-input__suffix{
                        right:.4rem;
                    }
                    .span1{
                        position:absolute;
                        left:3.6rem;
                        top:-.1rem;
                        cursor:pointer;
                        .f18();
                        width:.4rem;
                        line-height:.5rem;
                        text-align: center;
                        display:inline-block;
                    }
                    .el-select__caret{
                        display:none!important;
                    }
                }
                .casecss{
                    /*input框*/
                    .el-input{
                        width:2.3rem;
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .1rem;
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
                .el-input{
                    width:4rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .1rem;
                        .f18();
                    }
                }
                .div-cen{
                    .fb();
                    flex-wrap: wrap;
                }
                .el-form-item{
                    margin-bottom:.1rem;
                }
            }
            &-people-info{
                margin-top:.05rem;
                .title{
                    .fl();
                    .addparty{
                        margin-left:.1rem;
                        color:#409eff;
                        cursor:pointer;
                    }
                }
            }
        }
    </style>
<style scoped>
    .table-style{
        min-height:2rem;
        /*max-height:4rem;*/
        overflow:auto;
    }
</style>