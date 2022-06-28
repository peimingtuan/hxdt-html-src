<template>
        <div class="new1">
            <el-form :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item label="案号" class='casecss'>
                    <el-select v-model="formLabelAlign.year" placeholder="选择年份">
                            <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                    </el-select>
                    <el-select v-model="formLabelAlign.courtPronoun" placeholder="选择法院代字">
                            <el-option v-for="item in courtUnitPronounlist" :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun" @click.native='select5(item)'> 
                            </el-option>
                    </el-select>
                    <el-select v-model="formLabelAlign.caseTypePronoun" placeholder="选择案件类型代字">
                            <el-option v-for="item in caseTypePronounlist" :key="item.caseTypeId" :label="item.caseTypePronoun" :value="item.caseTypePronoun" v-if="item.caseTypePronoun" @click.native='select7(item)'>
                            </el-option>
                    </el-select>
                    <el-input v-model="formLabelAlign.caseNumber" placeholder="输入案号">
                    </el-input>
                </el-form-item>
                <el-form-item label="案件类型">
                    <el-select v-model="formLabelAlign.caseTypeName" placeholder="选择案件类型">
                        <el-option v-for="item in caseTypelist" :key="item.caseTypeCode" :label="item.caseTypeName" :value="item.caseTypeCode"  @click.native='select4(item)'>
                        </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="案由"> <!-- class="case-yo" -->
                        <el-select v-model="formLabelAlign.causeName" placeholder="选择案件类型">
                                <el-option v-for="item in causeCodelist" :key="item.causeCode" :label="item.causeName" :value="item.causeCode"  @click.native='select6(item)'>
                                </el-option>
                        </el-select>
                         <!-- <el-input v-model='formLabelAlign.causeName'> -->
                                <!-- <a v-for="item in formLabelAlign.caseOfCauseList">
                                        {{item.causeName}}
                                </a> -->
                        <!-- </el-input> -->
                        <!-- <span @click="choicecauseStr">...</span> -->
                </el-form-item>
                <el-form-item label="选择日期">
                        <el-date-picker v-model="formLabelAlign.createCaseDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
                <el-form-item label="承办法官">
                        <el-select v-model="formLabelAlign.undertakerName" placeholder="请选择">
                                <el-option v-for="item in trialMemberList"  :key="item.userId" :label="item.userName" :value="item.userId" @click.native='select1(item)'>
                                </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="承办部门">
                        <el-select v-model="formLabelAlign.departmentName" placeholder="请选择">
                            <el-option
                                v-for="item in departmentIdlist" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId" @click.native='select2(item)'>
                           </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="适用程序">
                        <el-select v-model="formLabelAlign.applyProgram" placeholder="请选择">
                                <el-option
                                v-for="item in applyProgramlist" :key="item.id" :label="item.name" :value="item.id" @click.native='select3(item)'>
                              </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
        </div>
    </template>
    
    <script>
        import {basedata} from "./baseData.js"
        export default {
            name: "new1",
            data() {
                return {
                    yearlist:basedata.year,//年份select,
                    courtUnitPronounlist: [], //basedata.courtUnitPronoun,//法院代字select,
                    caseTypePronounlist: [], //basedata.caseTypePronounlist,
                    caseTypelist: [], //basedata.caseTypelist,//案件类型select,
                    departmentIdlist: [], //basedata.departmentId,//承办部门select,
                    trialMemberList:[],
                    causeCodelist: [], //basedata.causeCodelist,//案由
                    applyProgramlist:basedata.applyProgram,
                    labelPosition: 'left',//form表单左侧靠齐
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
                        causeName:"",//案由名称 23
                        caseOfCauseList:"",//案由列表
                        createCaseDate:"",//承办时间
                        departmentName:"",//承办部门名称
                        undertakerName:"",//承办法官姓名
                        departmentId:"",//承办部门名称
                        undertakerId:"",//承办法官姓名
                        applyProgram:"",//适用程序（1普通2简易3特殊）
                    },
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
                //选择案由
                // choicecauseStr(){

                // },
                select7(e){
                    this.formLabelAlign.caseTypeName = '';
                    this.getCaseTypeInfos(this.formLabelAlign.caseTypePronoun);
                },
                select6(e){
                    this.formLabelAlign.causeName=e.causeName;//案由名称
                    this.formLabelAlign.causeCode=e.causeCode;
                },
                select5(e){
                    this.formLabelAlign.courtName=e.courtName;//法院代字
                    this.formLabelAlign.courtCode=e.courtCode;
                },
                select4(e){
                    this.formLabelAlign.caseTypeName=e.caseTypeName;//案件类型
                    this.formLabelAlign.caseTypeCode=e.caseTypeCode;
                },
                select1(e){
                    this.formLabelAlign.undertakerName=e.userName;//承办法官姓名
                    this.formLabelAlign.undertakerId=e.userId;
                },
                select2(e){
                    this.formLabelAlign.departmentName=e.departmentName;//承办部门
                    this.formLabelAlign.departmentId=e.departmentId;
                },
                select3(e){
                    this.formLabelAlign.departmentName=e.departmentName;//
                    this.formLabelAlign.departmentId=e.departmentId;
                },
                save(){
                   return  this.formLabelAlign;
                },
                //修改逻辑处理
                getAllInfoByCaseInfoId(parentData,row){
                    this.courtUnitPronounlist = parentData.courtUnitPronounlist;
                    this.caseTypePronounlist = parentData.caseTypePronounlist;
                    this.trialMemberList = parentData.trialMemberList;
                    this.departmentIdlist = parentData.departmentIdlist;
                    if(row){
                        this.formLabelAlign=row;//修改逻辑处理
                        let b = '';
                        for(var i=0;i<this.formLabelAlign.caseOfCauseList.length;i++){
                            b=this.formLabelAlign.caseOfCauseList[i].causeName+";"+b;
                        }
                        this.formLabelAlign.causeName=b;
                        //适用程序
                        if(this.formLabelAlign.applyProgram=1){
                            this.formLabelAlign.applyProgram='普通'
                        }else if(this.formLabelAlign.applyProgram=2){
                            this.formLabelAlign.applyProgram='简易'
                        }else if(this.formLabelAlign.applyProgram=3){
                            this.formLabelAlign.applyProgram='特殊'}
                        else{
                            this.formLabelAlign.applyProgram=''
                        }
                    }
                    else{
                        this.formLabelAlign={//表单信息
                            caseOfCauseList:"",
                            caseNumber:"",//案号
                            caseName:"",//案件名称
                            courtCode:"",//法院代码
                            courtName:"",//法院名称
                            year:"",//年
                            caseTypeName:"",//案件类型名称
                            causeName:"",//案由名称
                            createCaseDate:"",//承办时间
                            departmentName:"",//承办部门名称
                            undertakerName:"",//承办法官姓名
                            applyProgram:"",//适用程序（1普通2简易3特殊）
                        }
                    }
                },
                getCaseTypeInfos(caseTypeCodes){
                    //根据案件类型代字
                    let params={
                        caseTypeCode:caseTypeCodes,
                    };
                    this.$http.post('/baseInfo/getCaseTypeInfos',params).then(res =>{
                        if(res.code == 200){
                            this.caseTypelist=res.data;
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        this.$msge('服务器异常，请稍后重试');
                    })
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .new1{
            /*立案案由*/
            .case-yo{
                    position:relative;
                    overflow: hidden;
                    span{
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
            /*input框*/
            .el-date-editor{
                .el-input__inner{
                    padding-left:.5rem!important;
                }
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
        }
    </style>