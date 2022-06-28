//代理人类型1.20
const basedata={
    year:[{id: 1, name: "全部"}, {id: 2, name: new Date().getFullYear()}, {id: 3, name: new Date().getFullYear()-1}, {id: 4, name: new Date().getFullYear()-2}],//年份
    courtUnitPronoun:[{courtCode: 1, courtName: "全部"}, {courtCode: 2,courtName: '豫1601'}, {courtCode: 3, courtName: '豫1602'}, {courtCode: 4, courtName: '豫1603'}],//法院代字
//案件类型代字
caseTypePronounlist:[
      {caseTypePronoun:"刑初"},
      { caseTypePronoun:'刑一'}, 
      { caseTypePronoun:'刑二'},
      { caseTypePronoun:'刑三'}
   ],
   //案件类型
   caseTypelist:[
      {caseTypeCode:1,caseTypeName:'刑事案件'},
      {caseTypeCode: 2,caseTypeName:'刑一案件'}, 
      {caseTypeCode: 3,caseTypeName:'刑二案件'},
      {caseTypeCode: 4,caseTypeName:'刑三案件'}
   ],
   //案由
   causeCodelist:[
      {causeCode:1,causeName:'刑事纠纷'},
      {causeCode: 2,causeName:'刑一纠纷'}, 
      {causeCode: 3,causeName:'刑二纠纷'},
      {causeCode: 4,causeName:'刑三纠纷'}
   ],
    departmentId:[{departmentId: 1, departmentName: "全部"}, {departmentId: 2,departmentName: '民一庭'}, {departmentId: 3, departmentName: '民二庭'}, {departmentId: 4, departmentName: '民三庭'}],//承办部门
    undertakerId:[{undertakerId: 1, undertakerName: "周法官"}, {undertakerId: 2, undertakerName:'李法官'}, {undertakerId: 3, undertakerName:'王法官'}, {undertakerId: 4, undertakerName: '郭法官'}],//承办法官
//书记员
    "trialMemberList": [{
      "trialMemberId": "",
      "userId": "0125DD6E_E2D9_F9DE_D8DC_0F5730EAA208",
      "trialMemberName": "院机关团委",
      "trialMemberTypeCode": 1
   }, {
      "trialMemberId": "",
      "userId": "011E326C_2F38_499A_4005_CEC9E562C33A",
      "trialMemberName": "王雅露",
      "trialMemberTypeCode": 1
   }],
    clerklist:[{id: 1, name: "周书记员"}, {id: 2, name:'李书记员'}, {id: 3, name:'郭书记员'}, {id: 4, name: '田书记员'}],//书记员

    judgelist:[{id: 1, name: "周审判"}, {id: 2, name:'李审判'}, {id: 3, name:'王审判'}, {id: 4, name: '郭审判'}],//审判长
    ftlist:[{courtRoomId: 1, courtRoomName: "第一法庭"}, {courtRoomId: 2, courtRoomName:'第二法庭'}, {courtRoomId: 3, courtRoomName:'第三法庭'}, {courtRoomId: 4, courtRoomName: '第四法庭'}],//法庭

    applyProgram:[
            {id:"1",name:'普通'},
            {id:"2",name:'简易'},
            {id:"2",name:'特殊'}], //适用程序
 //排期信息下的三个选项
 //审理模式 TrialModeInfosList 
 TrialModeInfosList:[
    {code:"1",name:'常规审理'},
    {code:"2",name:'要素审理'},
 ],
 //审理方式 TrialWay  
 TrialWay:[
    {code:"1",name:'普通审理模式'},
    {code:"2",name:'多案同时审理模式'},
    {code:"3",name:'多案连续审理模式'},
    {code:"4",name:'合并审理模式'},
 ],
 //开庭方式 CourtWay
 CourtWaylist:[
    {code:"1",name:'远程'},
    {code:"2",name:'本地'},
 ],

 publicTriallist:[
   {code:"1",name:'是'},
   {code:"2",name:'否'},
],




 //AgentKindList 代理种类
 AgentKindList:[
    {id:"1",name:'代理一'},
    {id:"2",name:'代理二'},
 ],
 //身份类型  -- 当事人类型 PartyTypeList
 PartyTypeList:[
    {partyTypeCode:'1', partyTypeName:'自然人'},
    {partyTypeCode:"2",partyTypeName:'法人'},
    {partyTypeCode:"3",partyTypeName:'非法人组织'},
 ],
  //获取国别和地区信息国籍getCountryAreaInfos
  cityList: [
    { countryAreaCode: '1', countryAreaName: '河北'},
    { countryAreaCode: '2', countryAreaName: '天津'},
    { countryAreaCode: '3', countryAreaName: '邢台'},
    { countryAreaCode: '4', countryAreaName: '广州'},
    { countryAreaCode: '5', countryAreaName: '江苏'},
 ],
 //getNationInfos 民族信息
 getNationInfos:[
    {id:"1",name:'汉族'},
    {id:"2",name:'蒙古族'},
 ],
sexList:[
    {sexCode:"1",sexName:'男'},
    {sexCode:"2",sexName:'女'},
],

//当事人证件类型
IdentityTypeInfosList:[
    { identityTypeCode: '1', identityTypeName: '身份证'},
    { identityTypeCode: '2', identityTypeName: '居民证'},
 ],
  //getPoliticalFaceInfos .12获取政治面貌信息
  PoliticalFaceList:[
    { politicalFaceCode: '1', politicalFaceName: '党员'},
    { politicalFaceCode: '2', politicalFaceName: '团员'},
    { politicalFaceCode: '3', politicalFaceName: '群众'},

 ],
 nationList:[
    {nationCode:"1",nationName:'汉族'},
    {nationCode:"2",nationName:'蒙古'},
 ],
  //EducationInfosList 文化程序
  EducationInfosList:[
    {educationCode:"1",educationName:'本科'},
    {educationCode:"2",educationName:'专科'},
    {educationCode:"3",educationName:'研究生'},
 ],
 //MaritalStatusList 文化程序
 MaritalStatusList:[
    {maritalStatusCode:"1",maritalStatusName:'已婚'},
    {maritalStatusCode:"2",maritalStatusName:'未婚'},
 ],
//具备刑事能力 CriminalAbilityList
CriminalAbilityList:[
    {criminalAbilityCode:"1",criminalAbilityName:'具备刑事能力'},
    {criminalAbilityCode:"2",criminalAbilityName:'不具备'},
 ],
 //文化程序 ActiveAbilityList
 ActiveAbilityList:[
    {activeAbilityCode:"1",activeAbilityName:'健康'},
    {activeAbilityCode:"2",activeAbilityName:'正常'},
 ],
 //getIdentityTypeInfos1.11获取文化程序
 getIdentityTypeInfos:[
    {id:"1",name:'身份证'},
    {id:"2",name:'居住证'},
 ],
 //certificateTypeCode	long32	证照类型代码?
//certificateTypeName	string	证照类型名称 ?
//证件类型 AgentTypeInfosList
idenList:[
    {code:"1",name:'居住证'},
    {code:"2",name:'身份证'},
 ],
 //代理种类 AgentTypeInfosList
 AgentTypeInfosList:[
    {code:"1",name:'委托代理'},
    {code:"2",name:'法定代理'},
    {code:"3",name:'指定代理'},
 ],
//AgentJurisdictionList 代理权限 
AgentJurisdictionList:[
    {code:"1",name:'有代理'},
    {code:"2",name:'单一代理'},
 ],
 //DefendKindList 辩护种类 
 DefendKindList:[
    {code:"1",name:'一辩'},
    {code:"2",name:'二辩'},
 ],
}


exports.basedata = basedata;
