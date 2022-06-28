<template>
    <transition name="slide-fade">
        <div class='second-alert partyinfo' v-show='ispartyinfo'>
            <div class="main1">
                <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                <img class="alert-close" @click="closenewcase" src="../images/alert-close.png"/>
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content2">
                    <div class="base-top">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <div class="fixed-top">
                                <el-form-item label="诉讼地位" required>
                                    <el-select v-model="formLabelAlign.caseStandingName" placeholder="请选择">
                                        <el-option v-for="item in caseStandingList" :key="item.caseStandingCode" :label="item.caseStandingName"
                                                   :value="item.caseStandingName" @click.native='change12(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="formLabelAlign.partyTypeCode==1?'姓名':'单位名称'" required>
                                    <el-input v-model="formLabelAlign.involvedPersonName"></el-input>
                                </el-form-item>
                                <el-form-item label="类型">
                                    <el-select v-model="formLabelAlign.partyTypeCode" placeholder="请选择">
                                        <el-option v-for="item in PartyTypeList" :key="item.partyTypeCode" :label="item.partyTypeName"
                                                   :value="item.partyTypeCode" @click.native='change11(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-if="formLabelAlign.partyTypeCode==1" class="flex-con">
                                <el-form-item label="性别">
                                    <el-select v-model="formLabelAlign.sexName" placeholder="请选择">
                                        <el-option v-for="item in sexList" :key="item.sexCode" :label="item.sexName"
                                                   :value="item.sexName" @click.native='change1(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="民族">
                                    <el-select v-model="formLabelAlign.nationName">
                                        <el-option v-for="item in nationList" :key="item.nationCode"
                                                   :label="item.nationName" :value="item.nationName"
                                                   @click.native='change9(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="出生日期">
                                    <el-date-picker v-model="formLabelAlign.birthDate" type="date" placeholder="选择日期"> </el-date-picker>
                                </el-form-item>
                                <el-form-item label="年龄">
                                    <el-input v-model="formLabelAlign.age"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="国籍">-->
                                <!--<el-select v-model="formLabelAlign.countryAreaName" placeholder="请选择">-->
                                <!--<el-option v-for="item in cityList" :key="item.countryAreaCode"-->
                                <!--:label="item.countryAreaName" :value="item.countryAreaName"-->
                                <!--@click.native='change4(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="身份">-->
                                <!--<el-select v-model="formLabelAlign.partyTypeName" placeholder="请选择">-->
                                <!--<el-option v-for="item in PartyTypeList" :key="item.partyTypeCode"-->
                                <!--:label="item.partyTypeName" :value="item.partyTypeName"-->
                                <!--@click.native='change5(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="刑事责任能力">-->
                                <!--<el-select v-model="formLabelAlign.criminalAbilityName" placeholder="请选择">-->
                                <!--<el-option v-for="item in CriminalAbilityList"-->
                                <!--:key="item.criminalAbilityCode" :label="item.criminalAbilityName"-->
                                <!--:value="item.criminalAbilityName" @click.native='change7(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="行为能力状况">-->
                                <!--<el-select v-model="formLabelAlign.activeAbilityName" placeholder="请选择">-->
                                <!--<el-option v-for="item in ActiveAbilityList" :key="item.activeAbilityCode"-->
                                <!--:label="item.activeAbilityName" :value="item.activeAbilityName"-->
                                <!--@click.native='change6(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--<el-form-item label="政治面貌">-->
                                <!--<el-select v-model="formLabelAlign.politicalFaceName" placeholder="请选择">-->
                                <!--<el-option v-for="item in PoliticalFaceList" :key="item.politicalFaceCode"-->
                                <!--:label="item.politicalFaceName" :value="item.politicalFaceName"-->
                                <!--@click.native='change2(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <el-form-item label="文化程度">
                                    <el-select v-model="formLabelAlign.educationName">
                                        <el-option v-for="item in EducationInfosList" :key="item.educationCode"
                                                   :label="item.educationName" :value="item.educationName"
                                                   @click.native='change3(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="联系电话">
                                    <el-input v-model.trim="formLabelAlign.phone" @blur="isPhone(formLabelAlign.partyTypeCode,formLabelAlign.phone)" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="证件类型">
                                    <el-select v-model="formLabelAlign.identityTypeName" placeholder="请选择">
                                        <el-option v-for="item in IdentityTypeInfosList"
                                                   :key="item.identityTypeCode" :label="item.identityTypeName"
                                                   :value="item.identityTypeName" @click.native='changetype(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="证件号">
                                    <el-input class="lang-card" v-model.trim="formLabelAlign.identityNumber" @blur="iscardId(formLabelAlign.partyTypeCode,formLabelAlign.identityNumber,formLabelAlign.identityTypeCode)" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="户籍所在地">
                                    <el-input class="lang" v-model="formLabelAlign.householdRegisterPlace" clearable></el-input>
                                </el-form-item>
                                <!--<el-form-item label="经常居住地">-->
                                <!--<el-input v-model="formLabelAlign.commonAddress" clearable></el-input>-->
                                <!--</el-form-item>-->
                                <el-form-item label="现住地">
                                    <el-input class="lang" v-model="formLabelAlign.nowAddress" clearable></el-input>
                                </el-form-item>
                                <!--<el-form-item label="婚姻状况">-->
                                <!--<el-select v-model="formLabelAlign.maritalStatusName">-->
                                <!--<el-option v-for="item in MaritalStatusList" :key="item.maritalStatusCode"-->
                                <!--:label="item.maritalStatusName" :value="item.maritalStatusName"-->
                                <!--@click.native='change8(item)'>-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                            </div>
                            <div v-if="formLabelAlign.partyTypeCode==2 || formLabelAlign.partyTypeCode==3" class="flex-con2">
                                <!--<el-form-item label="单位名称">-->
                                    <!--<el-input v-model="formLabelAlign.involvedPersonName"></el-input>-->
                                <!--</el-form-item>-->
                                <el-form-item label="单位类型">
                                    <el-select v-model="formLabelAlign.unitTypeCode" placeholder="请选择">
                                        <el-option v-for="item in unitTypeList" :key="item.unitTypeCode" :label="item.unitTypeName"
                                                   :value="item.unitTypeCode" @click.native='changeunitTypeName(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单位状态">
                                    <el-select v-model="formLabelAlign.unitStatusCode">
                                        <el-option v-for="item in unitStatusList" :key="item.unitStatusCode"
                                                   :label="item.unitStatusName" :value="item.unitStatusCode"
                                                   @click.native='changeunitStatusName(item)'
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!--<el-form-item label="是否法人单位">-->
                                <!--<el-select v-model="formLabelAlign.juridicalPersonUnit" placeholder="请选择">-->
                                <!--<el-option v-for="item in selectList" :key="item.id" :label="item.name"-->
                                <!--:value="item.id">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <el-form-item label="证照类型">
                                    <el-select v-model="formLabelAlign.certificateTypeName" placeholder="请选择">
                                        <el-option v-for="item in certificateTypeList"
                                                   :key="item.certificateTypeCode" :label="item.certificateTypeName"
                                                   :value="item.certificateTypeName" @click.native='changecertificateTypeCode(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="证照号码">
                                    <el-input v-model="formLabelAlign.certificateTypeNumber" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="注册登记国家/地区">
                                    <el-select v-model="formLabelAlign.registrationCountryName" filterable placeholder="请选择">
                                        <el-option v-for="item in cityList" :key="item.countryAreaCode"
                                                   :label="item.countryAreaName" :value="item.countryAreaName"
                                                   @click.native='changeCity(item)'>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="注册登记地">
                                    <el-input class="lang" v-model.trim="formLabelAlign.registrationPlace"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="主要办事机构所在地">-->
                                <!--<el-input v-model.trim="formLabelAlign.age"></el-input>-->
                                <!--</el-form-item>-->
                                <el-form-item label="法定代表人姓名">
                                    <el-input v-model="formLabelAlign.legalRepresentative"></el-input>
                                </el-form-item>
                                <el-form-item label="法定代表人证件类型">
                                    <el-select v-model="formLabelAlign.legalRepresenDocumentType">
                                        <el-option v-for="item in IdentityTypeInfosList"
                                                   @click.native='changeLegalRe(item.identityTypeName)'
                                                   :key="item.identityTypeCode"
                                                   :label="item.identityTypeName"
                                                   :value="item.identityTypeCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="法定代表人证件号码">
                                    <el-input v-model.trim="formLabelAlign.legalRepresenDocumentNumber" @blur="iscardId(formLabelAlign.partyTypeCode,formLabelAlign.legalRepresenDocumentNumber,formLabelAlign.legalRepresenDocumentType)"></el-input>
                                </el-form-item>
                                <el-form-item label="法定代表人联系电话">
                                    <el-input v-model.trim="formLabelAlign.legalRepresenPhone" @blur="isPhone(formLabelAlign.partyTypeCode,formLabelAlign.legalRepresenPhone)"></el-input>
                                </el-form-item>
                                <el-form-item label="法定代表人住址">
                                    <el-input class="lang" v-model="formLabelAlign.legalRepresenAddr"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="base-box">
                        <el-tabs v-model="activeName" type='card' @tab-click="handleClick">
                            <el-tab-pane label="身份证信息" name="info1">
                                <div>
                                    身份证信息
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="指纹信息" name="info2">
                                <div>
                                    指纹信息
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="人脸信息" name="info3">
                                <div>
                                    人脸信息采集
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="bt">
                    <div class="qure" @click='sure'>
                        <img src="../images/sure.png"/>保存
                    </div>

                    <div class="cancel" @click='cancel'>
                        <img src="../images/cancel.png"/>取消
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import $ from "jquery"
    import {basedata} from "./baseData.js"//引入数据
    import AlertleftTile from "../component/AlertleftTile"
    import {mapState,mapActions} from 'vuex'
    import FoundationTools from '../../../../js/functionAjax'
    import Tools from '../../ecms/js/tools'
    export default {
        name: "partyinfo",
        components: {
            AlertleftTile,
        },

        data() {
            return {
                ispartyinfo:false,
                sexList: basedata.sexList,//性别
                activeName:'info1',
                text: '当事人',//二次弹框头部
                text2: "请填写详细信息",
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    "involvedPersonId": "",
                    "caseStandingCode": '',
                    "caseStandingName": "",
                    "thirdPeopleTypeCode": '',
                    "involvedPersonName": "",
                    "partyTypeCode": 1,
                    partyTypeName:'自然人',//当事人类型名称
                    "sexCode": '',
                    "sexName": "",
                    "commonAddress": "",
                    "politicalFaceCode": '',
                    "politicalFaceName": "",
                    "educationCode": '',
                    "educationName": "",
                    "age": '',
                    "birthDate": "",
                    "countryAreaCode": '',
                    "countryAreaName": "",
                    "identityTypeCode": '',
                    "identityTypeName": '',
                    "identityNumber": '',
                    "activeAbilityCode": '',
                    "activeAbilityName": '',
                    "criminalAbilityCode": '',
                    "criminalAbilityName": '',
                    "maritalStatusCode": '',
                    "maritalStatusName": '',
                    "householdRegisterPlace": '',
                    "nowAddress": '',
                    "phone": '',
                    "organizationName": '',
                    "unitTypeCode": '',
                    "unitTypeName": '',
                    "organizationCode": '',
                    "juridicalPersonUnit": '',
                    "unitStatusCode": '',//单位状态代码
                    "unitStatusDes": '',//单位状态名称
                    "registrationCountryCode": '',
                    "registrationCountryName": '',
                    "registrationPlace": '',
                    "legalRepresentative": "",
                    "legalRepresenDocumentType": '',
                    legalRepresenDocumentTypeName:'',//法定代表人证件种类名称
                    "legalRepresenDocumentNumber": "",
                    "legalRepresenPhone": "",
                    "legalRepresenAddr": "",
                    certificateTypeCode:'',//证照类型代码
                    certificateTypeName:'',//证照类型名称
                    certificateTypeNumber:''//证照号码
                },
                index:'',
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            selectList(){
                return this.$store.state.selectlist;
            },
          ...mapState('partyinfo',[
              'caseStandingList',
              'PartyTypeList',
              'cityList',
              'nationList',
              'EducationInfosList',
              'IdentityTypeInfosList',
              //'CriminalAbilityList',
              //'ActiveAbilityList',
              //'PoliticalFaceList',
              //'MaritalStatusList',
              'unitTypeList',
              'unitStatusList',
              'certificateTypeList'
          ])
        },
        methods: {
            ...mapActions('partyinfo',[
                'getPartyTypeInfos',
                'getCountryAreaInfos',
                'getNationInfos',
                'getEducationInfos',
                'getIdentityTypeInfos',
                //'getCriminalAbilityInfos',
                //'getActiveAbilityInfos',
                //'getPoliticalFaceInfos',
                //'getMaritalStatusInfos',
                'getUnitTypeInfos',
                'getUnitStatusInfos',
                'getCertificateTypeInfos'

            ]),
            isPhone(type,phone){
                if(!Tools.validatePhTelNumber(phone)){
                    this.$msgw('请输入正确的电话')
                    if(type==1)this.formLabelAlign.phone=''
                    else this.formLabelAlign.legalRepresenPhone=''
                    return
                }
            },
            iscardId(type,number,code){
                if(code&&code==1){
                    if(!Tools.cardId(number)) {
                        this.$msgw('请输入正确的身份证号')
                        if(type==1)this.formLabelAlign.identityNumber=''
                        else this.formLabelAlign.legalRepresenDocumentNumber=''
                        return
                    }
                }
            },
            getInfo(){
                const t=this;
                t.$showToast('加载中...')
                Promise.all([t.getPartyTypeInfos(t),t.getCountryAreaInfos(t),t.getNationInfos(t),
                t.getEducationInfos(t),t.getCertificateTypeInfos(t),
                    t.getUnitTypeInfos(t),t.getUnitStatusInfos(t),t.getIdentityTypeInfos(t)]).then(()=>{
                    t.$hideToast()
                }).catch(err=>{
                    t.$hideToast()
                })
            },
            getAgentinfo(index,row) {
                this.ispartyinfo = true;
                if(this.IdentityTypeInfosList.length===0)this.getInfo()
                if (row) {
                    this.formLabelAlign=Object.assign({},row);
                    this.index=index;
                } else {
                    this.index='';
                    this.formLabelAlign = {
                        involvedPersonId: "",	//	涉案人id
                        caseStandingCode: "",	//案件地位代码
                        caseStandingName: "",	//案件地位名称（原告，被告，第三人）
                        thirdPeopleTypeCode: '',//第三人类型代码
                        involvedPersonName: "",	//	涉案人名称
                        partyTypeCode:1,	//当事人类型代码 （1:自然人 2：法人 3：非法人组织）
                        partyTypeName:'自然人',//当事人类型名称
                        sexCode: "",	//性别代码
                        sexName: "",	//性别名称
                        commonAddress: "",	//经常居住地
                        politicalFaceCode: "",//政治面貌代码
                        politicalFaceName: "",	//政治面貌名称
                        educationCode: "",	//文化程度代码
                        nationCode: "",
                        educationName: "",	//文化程度名称
                        age: "",//年龄
                        birthDate: "",//当事人出生日期
                        countryAreaCode: "",//国家和地区代码
                        countryAreaName: "",	//国家和地区名称
                        identityTypeCode: "",	//身份证件类型代码
                        identityTypeName: "",	//身份证件类型名称
                        identityNumber: "",	//身份证号码
                        activeAbilityCode: "",	//行为能力状况代码
                        activeAbilityName: "",	//行为能力状况名称
                        criminalAbilityCode: "",//Long32	刑事责任能力代码
                        criminalAbilityName: "",//刑事责任能力名称
                        maritalStatusCode: "",	//婚姻状况代码
                        maritalStatusName: "",	//婚姻状况名称
                        householdRegisterPlace: "", //户籍所在地
                        nowAddress: "",	//现住址
                        phone: "",	//电话号码
                        organizationName: "",//公司名称
                        unitTypeCode: "",	//单位类型代码
                        unitTypeName: "",	//单位类型名称
                        organizationCode: "",	//组织机构代码
                        juridicalPersonUnit: "",//是否法人单位（1是，2否）
                        unitStatusCode: "",		//单位状态代码
                        unitStatusDes: "",		//单位状态名称
                        registrationCountryCode: "",//注册登记地国别代码
                        registrationCountryName: "",//注册登记地国别
                        registrationPlace: "",	//注册登记地
                        legalRepresentative: "",	//法定代表人姓名
                        legalRepresenDocumentType: "",	//法定代表人证件种类
                        legalRepresenDocumentTypeName:'',//法定代表人证件种类名称
                        legalRepresenDocumentNumber: "",		//法定代表人证件号码
                        legalRepresenPhone: "",		//法定代表人联系电话
                        legalRepresenAddr: "",	//法定代表人现住址
                        certificateTypeCode:'',//证照类型代码
                        certificateTypeName:'',//证照类型名称
                        certificateTypeNumber:''//证照号码
                    }
                }
            },
            closenewcase() {
                this.ispartyinfo = false;
            },
            //保存新建的消息
            sure() {
                if(!this.formLabelAlign.caseStandingName){
                    this.$msgw("请选择诉讼地位！")
                    return
                }
                if(!this.formLabelAlign.involvedPersonName){
                    if(this.formLabelAlign.partyTypeCode==1){
                        this.$msgw("请输入姓名！")
                    }else{
                        this.$msgw("请输入单位名称！")
                    }
                    return
                }
                this.ispartyinfo = false;
                if(this.formLabelAlign.birthDate && typeof this.formLabelAlign.birthDate !='string')this.formLabelAlign.birthDate=FoundationTools.getFormatDate2(this.formLabelAlign.birthDate);
                if(this.index!==''){
                    this.$parent.tableData.splice(this.index,1,this.formLabelAlign)
                }else{
                    this.$parent.tableData.push(this.formLabelAlign)
                }
            },
            cancel() {
                this.ispartyinfo = false;
            },
            //诉讼地位
            change12(item) {
                this.formLabelAlign.caseStandingCode = item.caseStandingCode;
            },
            //类型
            change11(item) {
                this.formLabelAlign.partyTypeName = item.partyTypeName;
            },
            //性别
            change1(item) {
                this.formLabelAlign.sexCode = item.sexCode;
            },
            //教育程序
            change3(item) {
                this.formLabelAlign.educationCode = item.educationCode;
            },
            //国籍
            change4(item) {
                this.formLabelAlign.countryAreaCode = item.countryAreaCode;
            },
            //注册登记国家
            changeCity(item) {
                this.formLabelAlign.registrationCountryCode = item.countryAreaCode;
            },
            //身份类型
            change5(item) {
                //this.formLabelAlign.partyTypeCode = item.partyTypeCode;
            },
            //民族
            change9(item) {
                this.formLabelAlign.nationCode = item.nationCode;
            },
            //刑事能力
            change7(item) {
                this.formLabelAlign.criminalAbilityCode = item.criminalAbilityCode;
            },
            //行为能力
            change6(item) {
                this.formLabelAlign.activeAbilityCode = item.activeAbilityCode;
            },
            //政治身份
            change2(item) {
                this.formLabelAlign.politicalFaceCode = item.politicalFaceCode;
            },
            //婚姻状态
            change8(item) {
                this.formLabelAlign.maritalStatusCode = item.maritalStatusCode;
            },
            //证件类型
            changetype(item){
                this.formLabelAlign.identityTypeCode = item.identityTypeCode;
            },
            //单位类型
            changeunitTypeName(item){
                this.formLabelAlign.unitTypeName = item.unitTypeName;
            },
            //单位状态
            changeunitStatusName(item){
                this.formLabelAlign.unitStatusDes = item.unitStatusName;
            },
            //证照类型
            changecertificateTypeCode(item){
                this.formLabelAlign.certificateTypeCode = item.certificateTypeCode;
            },
            //法定代表人证件类型
            changeLegalRe(identityTypeName){
                this.formLabelAlign.legalRepresenDocumentTypeName = identityTypeName;
            }
        }
    }

</script>

<style lang="less">
    @import url('../css/common.less');
    .partyinfo {
        .main1 {
            width: 14rem;
            padding: 0 0.8rem;
            background: #fff;
            position: absolute;
            top:1rem;
            left:calc(50% - 7rem);
            border-radius: 2px;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            .content2 {
                width: 100%;
                overflow: auto;
                max-height: 7rem;;
                background: #ECEFF0;
                min-height: 4rem;
                padding:.2rem;
                .base-top {
                    .el-form{
                        .fixed-top{
                            .fl();
                            border-bottom:1px solid #D2D6D8;
                        }
                        .flex-con{
                            margin-top:.1rem;
                            .fl();
                            flex-wrap: wrap;
                        }
                        .flex-con2{
                            margin-top:.1rem;
                            .fb();
                            flex-wrap: wrap;
                            /*label*/
                            .el-form-item__label {
                                .f18();
                                width: 2rem !important;
                            }
                            .el-form-item__content {
                                margin-left: 2rem !important;
                                margin-right:.5rem;
                            }
                            .lang{
                                width:9.5rem!important;
                            }
                            /*input框*/
                            .el-input {
                                width:3rem;
                                .el-input__inner {
                                    height: .4rem;
                                    line-height: .4rem;
                                    padding: 0 .15rem;
                                    .f18();
                                }
                            }
                        }
                        .el-form-item{
                            margin-bottom:.1rem;
                        }
                        /*label*/
                        .el-form-item__label {
                            .f18();
                            width: 1.5rem !important;
                        }
                        .el-form-item__content {
                            margin-left: 1.5rem !important;
                            margin-right:.5rem;
                        }
                        .lang{
                            width:9.5rem!important;
                        }
                        .lang-card{
                            width:4rem!important;
                        }
                        /*input框*/
                        .el-input {
                            width: 2rem;
                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                .f18();
                            }
                        }
                        .el-date-editor{
                            .el-input__inner{
                                padding-left:.5rem!important;
                            }
                        }
                    }
                }
                .base-box {
                    .el-tabs--card > .el-tabs__header .is-active {
                        border: 1px solid #2f8ded;
                    }
                }
            }
            .bt {
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                margin: 0.2rem 0;

                & > div {
                    cursor: pointer;
                    font-size: 0.2rem;
                    line-height: .3rem;
                }

                img {
                    width: .2rem;
                    margin-right: .05rem;
                }

                .qure {
                    color: #45A1D1;
                    margin-right: .5rem;
                }
            }
        }
    }
</style>