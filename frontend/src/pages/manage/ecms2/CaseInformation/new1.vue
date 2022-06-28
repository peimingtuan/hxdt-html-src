<template>
        <div class="new1">
            <!--添加当事人弹框-->
            <partyinfo ref='partyinfo':ispartyinfo="ispartyinfo" @closenewcase='ispartyinfo=false'></partyinfo>
            <!--案由选择弹框-->
            <eltree-alert ref="eltreeAlert" @sureChoice="sure"></eltree-alert>
            <div class="new1-base-info">
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="案号" class='casecss red-label'>
                        <el-select v-model="formLabelAlign.year" placeholder="选择年份">
                            <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                        <el-select v-model="formLabelAlign.courtCode" @focus="courtUnitPronounClick()" clearable filterable placeholder="选择法院代字">
                            <el-option v-for="item in courtUnitPronounlist2" :key="item.courtCode" :label="item.courtPronoun" :value="item.courtCode" @click.native='select5(item)'>
                            </el-option>
                        </el-select>
                        <el-select v-model="formLabelAlign.caseTypePronoun" @focus="caseTypePronounClick()" clearable filterable placeholder="选择案件类型代字">
                            <el-option v-for="item in caseTypePronounlist2" :key="item.caseTypeId" :label="item.caseTypePronoun" :value="item.caseTypePronoun" v-if="item.caseTypePronoun" @click.native='select7(item)'>
                            </el-option>
                        </el-select>
                        <el-input type="number" v-model="formLabelAlign.caseNum" placeholder="输入案号">
                        </el-input>号
                    </el-form-item>
                    <div class="div-cen">
                        <el-form-item class="red-label" label="案件类型">
                            <el-select v-model="formLabelAlign.caseTypeName" clearable filterable placeholder="选择案件类型">
                                <el-option v-for="item in caseTypelist" :key="item.caseTypeCode" :label="item.caseTypeName" :value="item.caseTypeName"  @click.native='select4(item)'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="red-label" label="案由">
                            <div class="case-yo">
                                <el-select
                                        v-model="values"
                                        multiple
                                        placeholder="案由"
                                        remote
                                        >
                                    <el-option
                                            v-for="item in options"
                                            :key="item.causeCode"
                                            @click.native="selectChangecauseCode(item)"
                                            :label="item.causeName"
                                            :value="item.causeName">
                                    </el-option>
                                </el-select>
                                <span class="span1" @click="choicecauseStr">...</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="适用程序">
                            <el-select v-model="formLabelAlign.applyProgram" placeholder="请选择">
                                <el-option
                                        v-for="item in applyProgramlist"
                                        :key="item.applyProgramCode"
                                        :label="item.applyProgramName"
                                        @click.native='selectapplyProgramStr(item.applyProgramName)'
                                        :value="item.applyProgramCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="立案日期">
                            <el-date-picker v-model="formLabelAlign.createCaseDate" type="date" placeholder="选择日期"> </el-date-picker>
                        </el-form-item>
                        <el-form-item class="red-label" label="承办部门">
                            <el-select v-model="formLabelAlign.departmentName" @focus="departmentClick()" clearable filterable placeholder="请选择">
                                <el-option
                                        v-for="item in departmentIdlist2" :key="item.departmentId" :label="item.departmentName" :value="item.departmentName" @click.native='select2(item)'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="red-label" label="承办法官">
                            <el-select v-model="formLabelAlign.undertakerName" @focus="userListClick()" clearable filterable placeholder="请选择">
                                <el-option v-for="item in userList2"  :key="item.userId" :label="item.userName" :value="item.userName" @click.native='select1(item)'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="new1-people-info">
                <div class="title">
                    <div class="bold">当事人信息</div>
                    <div @click='addparty' class="addparty">
                        <img src="../images/CaseManagement/neiwentianjia.png">
                        添加当事人
                    </div>
                </div>
                <div class="table-style">
                    <el-table ref="multipleTable" :data="tableData"
                              tooltip-effect="dark"  class='casetable'
                              style="width:100%"
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
                        <!--<el-table-column  label="代理人" show-overflow-tooltip>-->
                            <!--<template slot-scope="scope">-->
                                            <!--<span v-for='(item,index) in scope.row.agentInfoList' :key="index">-->
                                                    <!--{{item.personalInfoName}}-->
                                            <!--</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="checkparty(scope.$index,scope.row)">修改</span>
                                    <span @click="deleteN2(scope.$index,scope.row)">删除</span>
                                    <!--<span @click="addAgent(scope.row)">代理/辩护人管理</span>-->
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </template>
    
    <script>
        import {basedata} from "./baseData.js"
        import partyinfo from './partyinfo'//新建当事人详情
        import eltreeAlert from "../component/eltreeAlert3"; //案由选择弹框
        import {mapState,mapMutations,mapActions} from 'vuex'
        import FoundationTools from '../../../../js/functionAjax'
        export default {
            name: "new1",
            components: {
                partyinfo,
                eltreeAlert
            },
            data() {
                return {
                    yearlist:basedata.year,//年份select,
                    caseTypelist: [], //basedata.caseTypelist,//案件类型select,
                    applyProgramlist:[],
                    labelPosition: 'left',//form表单左侧靠齐
                    formLabelAlign: {
                        caseInfoId:"",
                        caseName:"",//
                        year:new Date().getFullYear()||"",//年
                        courtCode:Number(sessionStorage.getItem('hx-lawcourtcode'))||"",//法院代码 001
                        courtName:"",
                        courtPronoun: '',//法院代字,
                        caseTypePronoun:'',//案件类型代字
                        caseNumber:"",//案号
                        caseNum:'',//案号数字
                        caseTypeCode: '',//案件类型23,
                        caseTypeName:"",//案件类型名称
                        causeCode:"",//案由id
                        causeName:"",//案由名称
                        caseOfCauseList:[],//案由列表
                        createCaseDate:FoundationTools.getFormatDate2(new Date()) || '',//承办时间
                        departmentName:"",//承办部门名称
                        undertakerName:"",//承办法官姓名
                        departmentId:"",//承办部门名称
                        undertakerId:"",//承办法官姓名
                        applyProgram:1,//适用程序（1普通2简易3特殊）
                        applyProgramStr:'普通程序',
                    },
                    tableData:[],
                    options:[],
                    partyList:[],
                    values:[],
                    valueCodes:[],
                }
            },
            created() {
    
            },
            mounted() {

            },
            destroyed() {
    
            },
            watch:{
                values(n,o){
                    if(this.values.length!==this.valueCodes.length){
                        o.map((item,index)=>{
                            if(!n.includes(item)){
                                this.valueCodes.splice(index,1)
                            }
                        })
                    }
                }
            },
            computed:{
                ...mapState('indexmain',[
                    'choicecourt',
                ]),
                ...mapState('CaseMangement',[
                    'courtUnitPronounlist',
                    'caseTypePronounlist',
                    'departmentIdlist',
                    'userList'
                ]),
                courtUnitPronounlist2(){
                    let arr=JSON.parse(JSON.stringify(this.courtUnitPronounlist));
                    if(arr.length>0){
                        arr.shift();
                    }
                    return arr;
                },
                caseTypePronounlist2(){
                    let arr=JSON.parse(JSON.stringify(this.caseTypePronounlist));
                    if(arr.length>0){
                        arr.shift();
                    }
                    return arr;
                },
                departmentIdlist2(){
                    let arr=JSON.parse(JSON.stringify(this.departmentIdlist));
                    if(arr.length>0){
                        arr.shift();
                    }
                    return arr;
                },
                userList2(){
                    let arr=JSON.parse(JSON.stringify(this.userList));
                    if(arr.length>0){
                        arr.shift();
                    }
                    return arr;
                }
            },
            methods: {
                ...mapMutations('partyinfo',[
                    'setcaseStandingList',
                ]),
                ...mapActions('CaseMangement',[
                    'getAllcourtPronoun',
                    'getCaseTypePronoun',
                    'getBusinessByCourt',
                    'getUserByCourt'
                ]),
                courtUnitPronounClick(){
                    if(this.courtUnitPronounlist.length===0){
                        this.$showToast('加载中...')
                        this.getAllcourtPronoun(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                },
                caseTypePronounClick(){
                    if(this.caseTypePronounlist.length===0){
                        this.$showToast('加载中...')
                        this.getCaseTypePronoun(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                },
                departmentClick(){
                    if(this.departmentIdlist.length===0){
                        this.$showToast('加载中...')
                        this.getBusinessByCourt(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                },
                userListClick(){
                    if(this.userList.length===0){
                        this.$showToast('加载中...')
                        this.getUserByCourt(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                },
                //适用程序
                getApplyProgramConfigs(){
                    const that=this;
                    that.$http.post("/applyProgramConfig/getApplyProgramConfigs",{pageIndex:1,pageSize:100})
                        .then(data => {
                            if (data.code === 200) {
                                that.applyProgramlist=data.data;
                            } else {
                                that.$msgw(data.message);
                            }
                        })
                        .catch(err => {

                        });
                },
                //修改逻辑处理
               async getAllInfoByCaseInfoId(row){
                    this.getApplyProgramConfigs();
                    if(this.courtUnitPronounlist.length===0){
                        this.$showToast('加载中...')
                       await this.getAllcourtPronoun(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                           this.$hideToast()
                        })
                    }
                    if(row){
                        //基本信息
                        for(let i in row){
                            this.formLabelAlign[i]=row[i];
                        }
                        let arr=[],arr1=[];
                        if(Array.isArray(row.caseOfCauseList)){
                            row.caseOfCauseList.map(item=>{
                                arr.push(item.causeName);
                                arr1.push(item.causeCode);
                            })
                        }
                        this.values=arr;
                        this.valueCodes=arr1;
                        this.formLabelAlign.causeName=arr.toString()
                        this.formLabelAlign.causeCode=arr1.toString()
                        //当事人
                        this.tableData=row.involvedPersonDtoList;
                    }else{
                        //基本信息
                        this.formLabelAlign={//表单信息
                            caseInfoId:"",
                            caseOfCauseList:[],
                            caseNumber:"",//案号
                            caseNum:'',//案号数字
                            caseName:"",//案件名称
                            courtCode:Number(sessionStorage.getItem('hx-lawcourtcode'))||"",//法院代码
                            courtName:this.choicecourt,//法院名称
                            courtPronoun:'',//法院代字,
                            caseTypePronoun:'',//案件类型代字
                            year:new Date().getFullYear()||"",
                            caseTypeName:"",//案件类型名称
                            causeCode:"",//案由id
                            causeName:"",//案由名称
                            createCaseDate:FoundationTools.getFormatDate2(new Date()) || "",//承办时间
                            departmentName:"",//承办部门名称
                            undertakerName:"",//承办法官姓名
                            applyProgram:1,//适用程序（1普通2简易3特殊）
                            applyProgramStr:'普通程序',
                        }
                        this.caseTypelist=[];//案件类型置空
                        this.values=[];
                        this.valueCodes=[];
                        //当事人
                        this.tableData=[];
                    }
                },
                //基本信息
                //案由模糊搜索
                remoteMethod(causeName){
                    if(!causeName){
                        this.formLabelAlign.causeName=''
                        this.formLabelAlign.causeCode=''
                        this.options=[]
                        return
                    }
                    const that=this;
                    that.$http.post("/baseInfo/getCauseStrByName",{causeName})
                        .then(data => {
                            if (data.code === 200) {
                                that.options=data.data;
                            } else {
                                that.$msgw(data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err, "/baseInfo/getCauseStrByName");
                        });

                },
                selectChangecauseCode(item){
                    if(this.values.includes(item.causeName)){
                        this.valueCodes.push(item.causeCode)
                    }else{
                        if(this.valueCodes.includes(item.causeCode))this.valueCodes.splice(this.valueCodes.indexOf(item.causeCode),1)
                    }
                },
                //案由选择
                choicecauseStr() {
                    this.$refs.eltreeAlert.show(this.valueCodes,this.values);
                },
                select7(item){
                    this.formLabelAlign.caseTypeName = '';
                    this.getCaseTypeInfos(item.caseTypePronoun);
                },
                select5(e){
                    this.formLabelAlign.courtPronoun=e.courtPronoun;
                },
                select4(e){
                    this.formLabelAlign.caseTypeCode=e.caseTypeCode;//案件类型
                },
                select1(e){
                    this.formLabelAlign.undertakerId=e.userId;//承办法官姓名
                },
                select2(e){
                    this.formLabelAlign.departmentId=e.departmentId;//承办部门
                },
                selectapplyProgramStr(applyProgramStr){
                    this.formLabelAlign.applyProgramStr=applyProgramStr;//适用程序名称
                },
                getCaseTypeInfos(caseTypePronoun){
                    //根据案件类型
                    this.$http.post('/baseInfo/getCaseTypeInfos',{caseTypePronoun}).then(res =>{
                        if(res.code == 200){
                            this.caseTypelist=res.data;
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        this.$msge('服务器异常，请稍后重试');
                    })
                },
                //当事人信息
                //添加
                 addparty(){
                    if(!this.formLabelAlign.caseTypeCode){
                        this.$msgw("请先选择案件类型！")
                        return
                    }
                    this.getcaseStanding(this.formLabelAlign.caseTypeCode)
                    this.$refs.partyinfo.getAgentinfo();
                },
                //诉讼地位信息
                getcaseStanding(caseTypeCode) {
                    this.$showToast('加载中...')
                    const _this=this;
                    return _this.$http.post('/baseInfo/getCaseStanding',{
                        caseTypeCode
                    }).then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            _this.setcaseStandingList(data.data)
                        } else {
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$hideToast()
                        //_this.$msge('服务器异常，请稍后重试');
                    })
                },
                //修改
                checkparty(index,row){
                    this.getcaseStanding(this.formLabelAlign.caseTypeCode)
                    this.$refs.partyinfo.getAgentinfo(index,row);//传子组件
                },
                //删除
                deleteN2(index,row){
                    const _this=this;
                    _this.$confirm('确认删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.tableData.splice(index,1)//物理删除
                        _this.$msgs('删除成功!');
                    }).catch(() => {

                    });
                },
                save(){
                    let param=this.formLabelAlign;
                    // param.causeName=this.values.join(';');
                    // param.causeCode=this.valueCodes.join(';');
                    param.caseOfCauseList=[];
                    this.values.map((item,index)=>{
                        param.caseOfCauseList.push({causeName:item,causeCode:this.valueCodes[index]})
                    })
                    if(param.courtCode){
                        let arr=this.courtUnitPronounlist2;
                        for(let i=0;i<arr.length;i++){
                            if(param.courtCode==arr[i].courtCode){
                                param.courtPronoun=arr[i].courtPronoun;
                                break;
                            }
                        }
                    }
                    param.involvedPersonDtoList=this.tableData;
                    param.trialPlanMemberDto=[];//排期为空
                    if(param.createCaseDate && typeof param.createCaseDate !='string')param.createCaseDate=FoundationTools.getFormatDate2(param.createCaseDate);
                    //if(param.createCaseDate)param.createCaseDate=param.createCaseDate.substing(0,10)
                    return  param
                },
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .new1{
            &-base-info{
                padding-left:.05rem;
                padding-right:.2rem;
                max-height:3.8rem;
                overflow:auto;
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