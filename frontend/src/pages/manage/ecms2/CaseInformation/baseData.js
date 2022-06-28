//代理人类型1.20
const basedata={
    year:[{id: 2, name: new Date().getFullYear()+3},{id: 3, name: new Date().getFullYear()+2},{id:4, name: new Date().getFullYear()+1},{id: 5, name: new Date().getFullYear()}, {id: 6, name: new Date().getFullYear()-1}, {id: 7, name: new Date().getFullYear()-2}],//年份
 //审理模式 TrialModeInfosList 
 TrialModeInfosList:[
    {code:1,name:'常规审理'},
    {code:2,name:'要素审理'},
 ],
 //审理方式 TrialWay  
 TrialWay:[
    {code:1,name:'普通审理形式'},
    {code:2,name:'合并审理(单笔录)'},
    {code:3,name:'合并审理(多笔录)'},
 ],
 //开庭方式 CourtWay
 CourtWaylist:[
    {code:1,name:'远程'},
    {code:2,name:'本地'},
 ],

 publicTriallist:[
   {code:1,name:'是'},
   {code:2,name:'否'},
],

 //AgentKindList 代理种类
 AgentKindList:[
    {id:"1",name:'代理一'},
    {id:"2",name:'代理二'},
 ],
sexList:[
    {sexCode:1,sexName:'男'},
    {sexCode:2,sexName:'女'},
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
