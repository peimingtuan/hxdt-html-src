<template>
    <div class="partyinfo">
        <addagent :isaddagent="isaddagent" @closenewcase='isaddagent=false' @sure='isaddagent=false'
                  @cancel='isaddagent=false'></addagent>
        <transition name="slide-fade">
            <div class='second-alert' v-if='ispartyinfo'>
                <div class="main1">
                    <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                    <img class="alert-close" @click="closenewcase" src="../images/alert-close.png"/>
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content2">
                        <div class="base-top">
                            <div>
                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                    <el-form-item label="姓名">
                                        <el-input v-model="formLabelAlign.involvedPersonName" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="年龄">
                                        <el-input v-model="formLabelAlign.age" clearable></el-input>
                                    </el-form-item>

                                    <el-form-item label="经常居住地">
                                        <el-input v-model="formLabelAlign.commonAddress" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="现住地">
                                        <el-input v-model="formLabelAlign.nowAddress" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="婚姻状况">
                                        <el-select v-model="formLabelAlign.maritalStatusName">
                                            <el-option v-for="item in MaritalStatusList" :key="item.maritalStatusCode"
                                                       :label="item.maritalStatusName" :value="item.maritalStatusCode"
                                                       @click.native='change8(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="文化程度">
                                        <el-select v-model="formLabelAlign.educationName">
                                            <el-option v-for="item in EducationInfosList" :key="item.educationCode"
                                                       :label="item.educationName" :value="item.educationCode"
                                                       @click.native='change3(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <div>
                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                    <el-form-item label="性别">
                                        <el-select v-model="formLabelAlign.sexName" placeholder="请选择">
                                            <el-option v-for="item in sexList" :key="item.sexCode" :label="item.sexName"
                                                       :value="item.sexCode" @click.native='change1(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="出生日期">
                                        <el-input v-model="formLabelAlign.birthDate" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="证件号">
                                        <el-input v-model="formLabelAlign.identityNumber" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="户籍所在地">
                                        <el-input v-model="formLabelAlign.householdRegisterPlace" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="国籍">
                                        <el-select v-model="formLabelAlign.countryAreaName" placeholder="请选择">
                                            <el-option v-for="item in cityList" :key="item.countryAreaCode"
                                                       :label="item.countryAreaName" :value="item.countryAreaCode"
                                                       @click.native='change4(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="民族">
                                        <el-select v-model="formLabelAlign.nationName">
                                            <el-option v-for="item in nationList" :key="item.nationCode"
                                                       :label="item.nationName" :value="item.nationCode"
                                                       @click.native='change9(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div>
                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                    <el-form-item label="联系电话">
                                        <el-input v-model="formLabelAlign.phone" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="证件类型">
                                        <el-select v-model="formLabelAlign.identityTypeName" placeholder="请选择">
                                            <el-option v-for="item in IdentityTypeInfosList"
                                                       :key="item.identityTypeCode" :label="item.identityTypeName"
                                                       :value="item.identityTypeCode" @click.native='change3(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="身份类型">
                                        <el-select v-model="formLabelAlign.partyTypeName" placeholder="请选择">
                                            <el-option v-for="item in PartyTypeList" :key="item.partyTypeCode"
                                                       :label="item.partyTypeName" :value="item.partyTypeCode"
                                                       @click.native='change5(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="政治面貌">
                                        <el-select v-model="formLabelAlign.politicalFaceName" placeholder="请选择">
                                            <el-option v-for="item in PoliticalFaceList" :key="item.politicalFaceCode"
                                                       :label="item.politicalFaceName" :value="item.politicalFaceCode"
                                                       @click.native='change2(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="行为能力状况">
                                        <el-select v-model="formLabelAlign.activeAbilityName" placeholder="请选择">
                                            <el-option v-for="item in ActiveAbilityList" :key="item.activeAbilityCode"
                                                       :label="item.activeAbilityName" :value="item.activeAbilityCode"
                                                       @click.native='change6(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="刑事责任能力">
                                        <el-select v-model="formLabelAlign.criminalAbilityName" placeholder="请选择">
                                            <el-option v-for="item in CriminalAbilityList"
                                                       :key="item.criminalAbilityCode" :label="item.criminalAbilityName"
                                                       :value="item.criminalAbilityCode" @click.native='change7(item)'>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                        <div class="box">
                            <div class="agentbox">

                                <el-tabs v-model="activeName" type='card' @tab-click="handleClick">
                                    <el-tab-pane label="代理人" name="agent1">
                                        <!-- <div  v-if='formLabelAlign.agentInfoList.length>0'> -->
                                        <div v-for='(item,index) in formLabelAlign.agentInfoList'>
                                            <div class="agenttitle">
                                                <div>代理人{{index+1}}</div>
                                                <div class='isedit' @click='deleteinfos'>删除</div>
                                            </div>
                                            <div class="base-top">
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="代理人姓名">
                                                            <el-input v-model="item.personalInfoName"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="工作单位">
                                                            <el-input v-model="item.unitName"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="职务">
                                                            <el-input v-model="item.job"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证件号码">
                                                            <el-input v-model="item.identityNumber"></el-input>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="联系电话">
                                                            <el-input v-model="item.phone"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="代理人性别">
                                                            <el-select v-model="item.sexName" placeholder="">
                                                                <el-option v-for="item in sexList" :key="item.sexCode"
                                                                           :label="item.sexName" :value="item.sexName">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="代理种类">
                                                            <el-select v-model="item.agentKind" placeholder="">
                                                                <el-option v-for="item in AgentTypeInfosList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.name">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="代理权限">
                                                            <el-select v-model="item.agentJurisdiction" placeholder="">
                                                                <el-option v-for="item in AgentJurisdictionList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.name">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="辩护种类">
                                                            <el-select v-model="item.defendKind" placeholder="">
                                                                <el-option v-for="item in AgentJurisdictionList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.name">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="证件类型">
                                                            <el-select v-model="item.identityTypeName" placeholder="">
                                                                <el-option v-for="item in idenList" :key="item.code"
                                                                           :label="item.name" :value="item.name">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- </div> -->
                                        <!-- <div  v-else>
                                            <div class="add" @click="addagent()">
                                                        <img src="../images/add.png"/>
                                            </div>
                                            <div v-for='(pushAgentInfoList,index) of nums' :key='index'>
                                                    <div class="agenttitle">
                                                            <div>代理人</div>
                                                            <div class='isedit' @click='deleteinfos(index)'>删除</div>
                                                    </div>
                                                    <div class="base-top">
                                                            <div>
                                                                    <el-form :label-position="labelPosition" :model="pushAgentInfoList">
                                                                            <el-form-item label="代理人姓名">
                                                                                <el-input v-model="pushAgentInfoList.personalInfoName"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="工作单位">
                                                                                <el-input v-model="pushAgentInfoList.unitName"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="职务">
                                                                                    <el-input v-model="pushAgentInfoList.job"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="证件号码">
                                                                                    <el-input v-model="pushAgentInfoList.identityNumber"></el-input>
                                                                            </el-form-item>
                                                                    </el-form>
                                                            </div>
                                                            <div>
                                                                    <el-form :label-position="labelPosition" model="pushAgentInfoList">
                                                                            <el-form-item label="联系电话">
                                                                                    <el-input v-model="pushAgentInfoList.phone"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="代理人性别">
                                                                                    <el-select v-model="pushAgentInfoList.sexName" placeholder="请选择">
                                                                                            <el-option v-for="item in sexList"  :key="item.sexCode" :label="item.sexName" :value="item.sexName">
                                                                                            </el-option>
                                                                                    </el-select>
                                                                            </el-form-item>
                                                                            <el-form-item label="代理种类">
                                                                                    <el-select v-model="pushAgentInfoList.agentKind" placeholder="请选择">
                                                                                            <el-option v-for="item in AgentTypeInfosList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                    </el-select>
                                                                            </el-form-item>
                                                                    </el-form>
                                                            </div>
                                                            <div>
                                                                    <el-form :label-position="labelPosition" model="pushAgentInfoList">
                                                                        <el-form-item label="代理权限">
                                                                                <el-select v-model="pushAgentInfoList.agentJurisdiction" placeholder="请选择">
                                                                                        <el-option v-for="item in AgentJurisdictionList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                        <el-form-item label="辩护种类">
                                                                                <el-select v-model="pushAgentInfoList.defendKind" placeholder="请选择">
                                                                                        <el-option v-for="item in AgentJurisdictionList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                        <el-form-item label="证件类型">
                                                                                <el-select v-model="pushAgentInfoList.identityTypeName" placeholder="请选择">
                                                                                        <el-option v-for="item in idenList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                        </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                </el-form>
                                                            </div>
                                                    </div>
                                            </div>
                                         </div> -->
                                    </el-tab-pane>
                                    <el-tab-pane label="辩护人" name="agent2">
                                        <!-- <div  v-if='formLabelAlign.defendInfoList.length>0'> -->
                                        <div v-for='(item,index) in formLabelAlign.defendInfoList' :key='index'>
                                            <div class="agenttitle">
                                                <div>辩护人{{index+1}}</div>
                                                <div class='isedit' @click='deleteinfos()'>删除</div>
                                            </div>
                                            <div class="base-top">
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="辩护人姓名">
                                                            <el-input v-model="item.personalInfoName"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="工作单位">
                                                            <el-input v-model="item.unitName"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="职务">
                                                            <el-input v-model="item.job"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="证件号码">
                                                            <el-input v-model="item.identityNumber"></el-input>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="联系电话">
                                                            <el-input v-model="item.phone"></el-input>
                                                        </el-form-item>
                                                        <el-form-item label="辩护人性别">
                                                            <el-select v-model="item.sexName" placeholder="请选择">
                                                                <el-option v-for="item in sexList" :key="item.sexCode"
                                                                           :label="item.sexName" :value="item.sexName">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="代理种类">
                                                            <el-select v-model="item.agentKind" placeholder="请选择">
                                                                <el-option v-for="item in AgentTypeInfosList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                                <div>
                                                    <el-form :label-position="labelPosition">
                                                        <el-form-item label="代理权限">
                                                            <el-select v-model="item.agentJurisdiction"
                                                                       placeholder="请选择">
                                                                <el-option v-for="item in AgentJurisdictionList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="辩护种类">
                                                            <el-select v-model="item.defendKind" placeholder="请选择">
                                                                <el-option v-for="item in AgentJurisdictionList"
                                                                           :key="item.code" :label="item.name"
                                                                           :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="证件类型">
                                                            <el-select v-model="item.identityTypeName"
                                                                       placeholder="请选择">
                                                                <el-option v-for="item in idenList" :key="item.code"
                                                                           :label="item.name" :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- </div> -->
                                        <!-- <div  v-else >
                                            <div class="add" @click="addagent()">
                                                        <img src="../images/add.png"/>
                                            </div>
                                            <div  v-for='(pushAgentInfoList,index) of nums' :key='index'>
                                                    <div class="agenttitle">
                                                            <div>辩护人</div>
                                                            <div class='isedit' @click='deleteinfos()'>删除</div>
                                                    </div>
                                                    <div class="base-top">
                                                            <div>
                                                                    <el-form :label-position="labelPosition" :model="pushAgentInfoList">
                                                                            <el-form-item label="代理人姓名">
                                                                                <el-input v-model="pushAgentInfoList.personalInfoName"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="工作单位">
                                                                                <el-input v-model="pushAgentInfoList.unitName"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="职务">
                                                                                    <el-input v-model="pushAgentInfoList.job"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="证件号码">
                                                                                    <el-input v-model="pushAgentInfoList.identityNumber"></el-input>
                                                                            </el-form-item>
                                                                    </el-form>
                                                            </div>
                                                            <div>
                                                                    <el-form :label-position="labelPosition" model="pushAgentInfoList">
                                                                            <el-form-item label="联系电话">
                                                                                    <el-input v-model="pushAgentInfoList.phone"></el-input>
                                                                            </el-form-item>
                                                                            <el-form-item label="代理人性别">
                                                                                    <el-select v-model="pushAgentInfoList.sexName" placeholder="请选择">
                                                                                            <el-option v-for="item in sexList"  :key="item.sexCode" :label="item.sexName" :value="item.sexName">
                                                                                            </el-option>
                                                                                    </el-select>
                                                                            </el-form-item>
                                                                            <el-form-item label="代理种类">
                                                                                    <el-select v-model="pushAgentInfoList.agentKind" placeholder="请选择">
                                                                                            <el-option v-for="item in AgentTypeInfosList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                    </el-select>
                                                                            </el-form-item>
                                                                    </el-form>
                                                            </div>
                                                            <div>
                                                                    <el-form :label-position="labelPosition" model="pushAgentInfoList">
                                                                        <el-form-item label="代理权限">
                                                                                <el-select v-model="pushAgentInfoList.agentJurisdiction" placeholder="请选择">
                                                                                        <el-option v-for="item in AgentJurisdictionList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                        <el-form-item label="辩护种类">
                                                                                <el-select v-model="pushAgentInfoList.defendKind" placeholder="请选择">
                                                                                        <el-option v-for="item in AgentJurisdictionList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                            </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                        <el-form-item label="证件类型">
                                                                                <el-select v-model="pushAgentInfoList.identityTypeName" placeholder="请选择">
                                                                                        <el-option v-for="item in idenList"  :key="item.code" :label="item.name" :value="item.name">
                                                                                        </el-option>
                                                                                </el-select>
                                                                        </el-form-item>
                                                                </el-form>
                                                            </div>
                                                    </div>
                                           </div>
                                        </div> -->
                                    </el-tab-pane>
                                </el-tabs>
                            </div>

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
    </div>
</template>

<script>
    import $ from "jquery"
    import {basedata} from "./baseData.js"//引入数据
    import AlertleftTile from "../component/AlertleftTile"
    import addagent from "./addagent"

    export default {
        name: "partyinfo",
        props: {
            ispartyinfo: Boolean,
        },
        components: {
            AlertleftTile,
            addagent
        },

        data() {
            return {
                nums: [
                    {
                        "personalInfoId": "",
                        "personalInfoName": "",
                        "agentPersonTypeCode": '',
                        "agentPersonTypeName": "",
                        "agentKind": '',
                        "agentJurisdiction": '',
                        "phone": "",
                        "identityTypeCode": '',
                        "identityTypeName": "",
                        "identityNumber": "",
                        "unitName": "",
                        "job": ""
                    }
                ],//生成几个庭次按键
                AgentKindList: basedata.AgentKindList,//代理种类
                PartyTypeList: basedata.PartyTypeList,//当事人身份类型
                cityList: basedata.cityList,//国别和地区信息
                nationList: basedata.nationList,// 民族信息
                sexList: basedata.sexList,//性别
                IdentityTypeInfosList: basedata.IdentityTypeInfosList,//当事人证件类型
                PoliticalFaceList: basedata.PoliticalFaceList,//获取政治面貌信息
                EducationInfosList: basedata.EducationInfosList,//文化教育程序
                MaritalStatusList: basedata.MaritalStatusList,//婚姻
                CriminalAbilityList: basedata.CriminalAbilityList,//政治地位
                ActiveAbilityList: basedata.ActiveAbilityList,//行动能力
                getIdentityTypeInfos: basedata.getIdentityTypeInfos,//当事人证件类型
                AgentTypeInfosList: basedata.AgentTypeInfosList,//代理种类
                AgentJurisdictionList: basedata.AgentJurisdictionList,//代理权限
                DefendKindList: basedata.DefendKindList,//辩护种类
                number: 1,

                isaddagent: false,
                activeName: 'agent1',
                text: '身体证信息',//二次弹框头部
                text2: "基本信息",
                labelPosition: 'left',//form表单左侧靠齐

                formLabelAlign: {
                    "involvedPersonId": "",
                    "caseStandingCode": '',
                    "caseStandingName": "",
                    "thirdPeopleTypeCode": '',
                    "involvedPersonName": "",
                    "partyTypeCode": '',
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
                    "unitStatusCode": '',
                    "unitStatusDes": '',
                    "registrationCountryCode": '',
                    "registrationCountryName": '',
                    "registrationPlace": '',
                    "legalRepresentative": "",
                    "legalRepresenDocumentType": '',
                    "legalRepresenDocumentNumber": "",
                    "legalRepresenPhone": "",
                    "legalRepresenAddr": "",
                    "agentInfoList": [],//代理人信息
                    "defendInfoList": [],//辩护人信息
                }
            }
        },
        beforeCreate(){

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //性别
            change1(e) {
                console.log(e)
                this.formLabelAlign.sexCode = e.sexCode;//案由名称
                this.formLabelAlign.sexName = e.sexName;
            },
            //政治身份
            change2(e) {
                this.formLabelAlign.politicalFaceCode = e.politicalFaceCode;//案由名称
                this.formLabelAlign.politicalFaceName = e.politicalFaceName;
            },
            //教育程序
            change3(e) {
                console.log(e)
                this.formLabelAlign.educationCode = e.educationCode;//案由名称
                this.formLabelAlign.educationName = e.educationName;
            },
            //国籍
            change4(e) {
                console.log(e)
                this.formLabelAlign.countryAreaCode = e.countryAreaCode;//案由名称
                this.formLabelAlign.countryAreaName = e.countryAreaName;
            },
            //身份证类型不正常获取
            change5(e) {
                console.log(e)
                this.formLabelAlign.identityTypeCode = e.identityTypeCode;//案由名称
                this.formLabelAlign.identityTypeName = e.identityTypeName;
            },
            //行为能力
            change6(e) {
                console.log(e)
                this.formLabelAlign.activeAbilityCode = e.activeAbilityCode;//案由名称
                this.formLabelAlign.activeAbilityName = e.activeAbilityName;
            },
            //刑事能力
            change7(e) {
                console.log(e)
                this.formLabelAlign.criminalAbilityCode = e.criminalAbilityCode;//案由名称
                this.formLabelAlign.criminalAbilityName = e.criminalAbilityName;
            },
            //婚姻状态
            change8(e) {
                console.log(e)
                this.formLabelAlign.maritalStatusCode = e.maritalStatusCode;//案由名称
                this.formLabelAlign.maritalStatusName = e.maritalStatusName;
            },
            //民族
            change9(e) {
                console.log(e)
                this.formLabelAlign.nationCode = e.nationCode;//案由名称
                this.formLabelAlign.nationName = e.nationName;
            },
            //  //单位类型 法制单位
            //  change9(e){
            //     console.log(e)
            //     this.formLabelAlign.unitTypeCode=e.unitTypeCode;//案由名称
            //     this.formLabelAlign.unitTypeName=e.unitTypeName;
            // },

            //删除当前块
            deleteinfos(index) {
                console.log('删除')
                console.log(index)
                // let array=this.nums;
                // function remove(array,index)
                //     {
                //         if(index<=(array.length-1))
                //         {
                //             for(var i=index;i<array.length;i++)
                //             {
                //                 array[i]=array[i+1];
                //             }
                //         }
                //         else
                //         {
                //             throw new Error('超出最大索引！');
                //         }
                //         array.length=array.length-1;
                //         return array;
                //     }
                if (this.nums.length > 0) {
                } else {
                    for (var i = 0; i < this.nums.length; i++) {
                        this.nums.splice(index, 1)
                    }
                }
            },
            getAgentinfo(row) {
                this.ispartyinfo = true;
                this.formLabelAlign = row;
                console.log(this.formLabelAlign)
                if (row) {
                    let b;
                    this.formLabelAlign = row;//修改逻辑处理
                    for (var i = 0; i < this.formLabelAlign.agentInfoList.length; i++) {
                        b = this.formLabelAlign.agentInfoList[i].agentKind
                    }
                } else {
                    this.formLabelAlign = {//表单信息
                        involvedPersonId: "",	//	涉案人id
                        caseStandingCode: "",	//Long32	案件地位代码
                        caseStandingName: "",	//	案件地位名称（原告，被告，第三人）
                        thirdPeopleTypeCode: '',	//Int	第三人类型代码
                        involvedPersonName: "",	//	涉案人名称
                        partyTypeCode: "",	//Long32	当事人类型代码 （1:自然人 2：法人 3：非法人组织）
                        sexCode: "",	//	性别代码
                        sexName: "",	//性别名称
                        commonAddress: "",	//	经常居住地
                        politicalFaceCode: "",//政治面貌代码
                        politicalFaceName: "",	//	政治面貌名称
                        educationCode: "",	//Long32文化程度代码
                        nationCode: "",
                        educationName: "",	//	文化程度名称
                        age: "",//	Long32	年龄
                        birthDate: "",//当事人出生日期
                        countryAreaCode: "",//Long32	国家和地区代码
                        countryAreaName: "",	//	国家和地区名称
                        identityTypeCode: "",	//Long32	身份证件类型代码
                        identityTypeName: "",	//	身份证件类型名称
                        identityNumber: "",	//	身份证号码
                        activeAbilityCode: "",	//Long32	行为能力状况代码
                        activeAbilityName: "",	//	行为能力状况名称
                        criminalAbilityCode: "",//Long32	刑事责任能力代码
                        criminalAbilityName: "",	//	刑事责任能力名称
                        maritalStatusCode: "",	//Long32	婚姻状况代码
                        maritalStatusName: "",	//	婚姻状况名称
                        householdRegisterPlace: "",  //户籍所在地
                        nowAddress: "",		//现住址
                        phone: "",	//电话号码
                        organizationName: "",	//	公司名称
                        unitTypeCode: "",	//Long32	单位类型代码
                        unitTypeName: "",	//string	单位类型名称
                        organizationCode: "",	//Long32	组织机构代码
                        juridicalPersonUnit: "",//	boolean	是否法人单位（1是，2否）
                        unitStatusCode: "",		//单位状态代码
                        unitStatusName: "",		//单位状态名称
                        registrationCountryCode: "",	//int	注册登记地国别代码
                        registrationCountryName: "",		//注册登记地国别
                        registrationPlace: "",	//注册登记地
                        legalRepresentative: "",	//法定代表人姓名
                        legalRepresenDocumentType: "",	//Long32	法定代表人证件种类
                        legalRepresenDocumentNumber: "",		//法定代表人证件号码
                        legalRepresenPhone: "",		//法定代表人联系电话
                        legalRepresenAddr: "",	//法定代表人现住址
                        agentInfoList: [
                            {
                                personalInfoName: "",//代理人名称
                                phone: "",//联系电话
                                identityTypeName: "",//证件种类名称
                                identityNumber: "",//证件号码
                                unitName: "",//工作单位
                                job: "",//职务
                                defendKind: '',//辩护种类1委托辩护2指定辩护
                                sexName: "",
                                agentKind: "",
                                agentJurisdiction: "",
                            }
                        ],
                        defendInfoList: [
                            {
                                personalInfoName: "",//代理人名称
                                phone: "",//联系电话
                                identityTypeName: "",//证件种类名称
                                identityNumber: "",//证件号码
                                unitName: "",//工作单位
                                job: "",//职务
                                defendKind: '',//辩护种类1委托辩护2指定辩护
                                sexName: "",
                                agentKind: "",
                                agentJurisdiction: "",
                            }
                        ],
                    }
                }
            },
            closenewcase() {
                this.ispartyinfo = false;
                this.$parent.ispartyinfo = false;
            },
            //保存新建的消息
            sure() {
                this.ispartyinfo = false;
                this.$parent.ispartyinfo = false;
                this.formLabelAlign.agentInfoList = this.nums;
                // console.log(this.formLabelAlign.agentInfoList)
                return this.formLabelAlign;
            },
            //添加按键
            addagent() {
                // this.number++;
                for (var i = 0; i < 1; i++) {
                    this.nums.push({
                        "personalInfoId": "",
                        "personalInfoName": "",
                        "agentPersonTypeCode": '',
                        "agentPersonTypeName": "",
                        "agentKind": '',
                        "agentJurisdiction": '',
                        "phone": "",
                        "identityTypeCode": '',
                        "identityTypeName": "",
                        "identityNumber": "",
                        "unitName": "",
                        "job": ""
                    })
                }
                // console.log(111)
                // this.isaddagent=true;没用了呵呵
            },
            cancel() {
                this.ispartyinfo = false;
                this.$parent.ispartyinfo = false;
                // this.$emit('cancel');
            },
            //请求选型的all请求
            getCountryAreaInfos() {
                //1.8获取国别和地区信息
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getCountryAreaInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getNationInfos() {
                //1.9民族信息
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getNationInfos', params).then(data => {
                    if (data.code === 200) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getPartyTypeInfos() {
                //1.1.10事人类型信息
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getPartyTypeInfos', params).then(data => {
                    if (data.code === 200) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getIdentityTypeInfos() {
                //1.1.当事人证件类型
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getIdentityTypeInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getPoliticalFaceInfos() {
                //1.1.政治面貌
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getPoliticalFaceInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getActiveAbilityInfos() {
                //1.1.行为能力状况
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getActiveAbilityInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getCriminalAbilityInfos() {
                //1.1.刑事责任能力状况
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getCriminalAbilityInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getCriminalAbilityInfos() {
                //1.1.刑事责任能力状况
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getCriminalAbilityInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getMaritalStatusInfos() {
                //1.1.婚姻状况
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getMaritalStatusInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getEducationInfos() {
                //1.1.文化程度
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getEducationInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getUnitTypeInfos() {
                //1.1.单位类型
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getUnitTypeInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getUnitStatusInfos() {
                //1.1.单位状态
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getUnitStatusInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getCertificateTypeInfos() {
                //1.1.证照类型
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getCertificateTypeInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getAgentTypeInfos() {
                //1.1.代理人类型
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getAgentTypeInfos', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getAgentKind() {
                //1.1.代理人种类
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getAgentKind', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getAgentJurisdiction() {
                //1.1.代理人权限
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getAgentJurisdiction', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            getDefendKind() {
                //1.1.辩护种类
                let params = {
                    requestSource: "",
                    method: ""
                };
                let _this = this;
                _this.$http.post('/getDefendKind', params).then(data => {
                    if (data.code === 0) {
                        _this.storagePathId = data.data.storagePathId;//存储路径id
                        _this.$msge('保存成功');
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }

</script>

<style lang="less">
    @import url('../css/common.less');

    .partyinfo {
        .el-tabs--card > .el-tabs__header .is-active {
            border: 1px solid #2f8ded;
        }

        .secondHead {
            background: #cbe5f3;
        }

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
                    display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: space-between;
                }
                .box {
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

                    /*代理人标题*/

                    .agenttitle {
                        margin-bottom: 0.2rem;
                        z-index: 222;
                        .fb();
                        border-bottom: 1px solid #ddd;

                        div:nth-child(1) {
                            padding: 0rem 0.1rem;
                            margin: 0.1rem 0.1rem;
                            height: 0.3rem;
                            border-left: 3px solid #2f8ded;
                        }
                    }

                    .add {
                        cursor: pointer;
                        margin:0;
                        .fr();
                        z-index: 2;
                    }
                }
                .el-tabs__item {
                    .f18()
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

        /*label*/

        .el-form-item__label {
            .f18();
            width: 1.5rem !important;
        }

        .el-form-item__content {
            margin-left: 1.5rem !important;
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
    }
</style>