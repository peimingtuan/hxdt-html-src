//庭室管理
const musicvideoment={
    yearlist:[{id: 1, name: "全部"}, {id: 2, name: new Date().getFullYear()}, {id: 3, name: new Date().getFullYear()-1}, {id: 4, name: new Date().getFullYear()-2}],//年份
    courtUnitPronoun:[{courtCode: 1, courtPronoun: "全部"}, {courtCode: 2,courtPronoun: '豫1601'}, {courtCode: 3, courtPronoun: '豫1602'}, {courtCode: 4, courtPronoun: '豫1603'}],//法院代字
    caseTypePronoun:[{caseTypeId: 1, caseTypeName:111,caseTypePronoun: "全部"}, {caseTypeId: 2,caseTypeName:111, caseTypePronoun:'民一庭'}, {caseTypeId: 3,caseTypeName:111, caseTypePronoun:'民二庭'}, {caseTypeId: 4,caseTypeName:111, caseTypePronoun: '民三庭'}],//案件类型代字
    departmentId:[{departmentId: 1, departmentName: "全部"}, {departmentId: 2,departmentName: '民一庭'}, {departmentId: 3, departmentName: '民二庭'}, {departmentId: 4, departmentName: '民三庭'}],//承办部门
    // undertakerId:[{id: 1, name: "全部"}, {id: 2, name:'民一庭'}, {id: 3, name:'民二庭'}, {id: 4, name: '民三庭'}],//承办法官
    trialMemberListss:[{	
        trialMemberId:"",	//审判长
        userId:"",	//	用户id
        trialMemberName:"张三",	//姓名
        trialMemberTypeCode:"1",//
    },{	
        trialMemberId:"",	//审判员
        userId:"",	//	用户id
        trialMemberName:"李四",	//姓名
        trialMemberTypeCode:"2",//
    },{	
        trialMemberId:"",	//人民陪审员
        userId:"",	//	用户id
        trialMemberName:"王六",	//姓名
        trialMemberTypeCode:"3",//
    },
    {	
        trialMemberId:"",	//书记员
        userId:"",	//	用户id
        trialMemberName:"李七",	//姓名
        trialMemberTypeCode:"6",//
    }],
    //更多排期信息
    caseinfolist:Array(10).fill({
        trialPlanId:'D8246520_E82D_6853_30DC_919AF89031C2',
        caseNumber:'（2019）辽0782民初001号',//案号
        courtTime:1,//(庭次)
        caseAyStr:"离婚纠纷",
        courtRoomName:'第一法庭',
        departmentName:"民一庭",
        cbr:"张三",
        factStartTime:'10:00',//(开庭时间)
        undertakeJudge:'承办人',
        lastJudgeName:"张传佳",
        partyDes:"原告:李大大",
        judgeName:'张三',//承办法官名称
        department:'民一庭',//部门
        clerkName:'业余书记员',//书记员名称
    })
}


export{
    musicvideoment,
}