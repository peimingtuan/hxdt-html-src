// module.exports = [
//     {

//        'caseId':'D8246520_E82D_6853_30DC_919AF89031C2',//案件Id
//        'caseNumber':'(2019)粤01民初字0101号',//案号
//        'year':'2019',//年份
//        'courtPronoun':'粤01',//法院代字
//        'caseTypeId':'D8246520_E82D_6853_30DC_919AF89031C2',//案件类型Id
//        'caseTypePronoun':'民初',//案件类型代字
//        'caseNum':'0101',//案件编码
//        'createCaseAyId':'D8246520_E82D_6853_30DC_919AF89031C2',//立案案由id
//        'createCaseAy':'先予执行',//立案案由
//        'departmentId':'D8246520_E82D_6853_30DC_919AF89031C2',//承办部门Id
//        'departmentName':'民一庭',//承办部门
//        'undertakeJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',//承办法官Id
//        'undertakeJudge':'张三',//承办法官
//        'presidingJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',
//        'presidingJudge':'张三',//审判长/员
//        'trialOrganizationMode':0,// 0合议庭 1独任审理
//        'trialMembers':[
//             {
//                 'role':0,//角色 0审判长1审判员2人民陪审员
//                 'name':'张三',//名字
//              },
//         ],
//        'partyInfo':[
//            {
//              'partyId':'D8246520_E82D_6853_30DC_919AF89031C2',
//                      'caseStatusId':'D8246520_E82D_6853_30DC_919AF89031C2',
//                      'caseStatus':'原告',//案件地位
//                      'partyName':'王五',//当事人名称
//            },
//            {
//             'partyId':'D8246520_E82D_6853_30DC_919AF89031C2',
//                     'caseStatusId':'D8246520_E82D_6853_30DC_919AF89031C2',
//                     'caseStatus':'被告',//案件地位
//                     'partyName':'李四',//当事人名称
//           },
//         ],//当事人信息（当事人代理人UI图没出，待信息确认再补充）
//        'createDate':'2019-03-02',//立案日期
//        'trialMode':0,//审理方式 0公开审理1不公开审理
//        'trialPlans':[
//            {
//                'trialPlanId':'',
//                'courtTime':1,//庭次
//                'planStartDateTime':'2019-3-23 10:30-12:00',
//                'courtRoomId':'',
//                'courtRoomName':'第一法庭',
//                'trialStatus':0 //庭审状态 0未开庭1正在开庭2休庭3闭庭
//             },
//         ]
//      },
// ]
  
module.exports = Array(14).fill(
    {

        'caseId':'D8246520_E82D_6853_30DC_919AF89031C2',//案件Id
        'caseNumber':'(2019)粤01民初字0101号',//案号
        'year':'2019',//年份
        'courtPronoun':'粤01',//法院代字
        'caseTypeId':'D8246520_E82D_6853_30DC_919AF89031C2',//案件类型Id
        'caseTypePronoun':'民初',//案件类型代字
        'caseNum':'0101',//案件编码
        'createCaseAyId':'D8246520_E82D_6853_30DC_919AF89031C2',//立案案由id
        'createCaseAy':'先予执行',//立案案由
        'departmentId':'D8246520_E82D_6853_30DC_919AF89031C2',//承办部门Id
        'departmentName':'民一庭',//承办部门
        'undertakeJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',//承办法官Id
        'undertakeJudge':'张三',//承办法官
        'presidingJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',
        'presidingJudge':'张三',//审判长/员
        'trialOrganizationMode':0,// 0合议庭 1独任审理
        'trialMembers':[
             {
                 'role':0,//角色 0审判长1审判员2人民陪审员
                 'name':'张三',//名字
              },
         ],
        'partyInfo':[
            {
              'partyId':'D8246520_E82D_6853_30DC_919AF89031C2',
                      'caseStatusId':'D8246520_E82D_6853_30DC_919AF89031C2',
                      'caseStatus':'原告',//案件地位
                      'partyName':'王五',//当事人名称
            },
            {
             'partyId':'D8246520_E82D_6853_30DC_919AF89031C2',
                     'caseStatusId':'D8246520_E82D_6853_30DC_919AF89031C2',
                     'caseStatus':'被告',//案件地位
                     'partyName':'李四',//当事人名称
           },
         ],//当事人信息（当事人代理人UI图没出，待信息确认再补充）
        'createDate':'2019-03-02',//立案日期
        'trialMode':0,//审理方式 0公开审理1不公开审理
        'trialPlans':[
            {
                'trialPlanId':'',
                'courtTime':1,//庭次
                'planStartDateTime':'2019-3-23 10:30-12:00',
                'courtRoomId':'',
                'courtRoomName':'第一法庭',
                'trialStatus':0 //庭审状态 0未开庭1正在开庭2休庭3闭庭
             },
         ]
      },
)   
