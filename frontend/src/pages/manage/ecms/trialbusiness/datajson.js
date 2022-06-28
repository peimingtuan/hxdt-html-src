//假数据
const trialbusiness={
    info:Array(10).fill({
        caseId:'D8246520_E82D_6853_30DC_919AF89031C2',//案件id
        caseNumber:'（2019）辽0782奥请调111号',//案号
        caseAyId:'D8246520_E82D_6853_30DC_919AF89031C2',//案由id
        caseAyStr:'离婚纠纷',//案由
        createdDate:'2019-2-12',//立案日期
        isBurn:0,//是否刻录 0否1是
        departmentId:'',//承办部门Id
        departmentName:'民一庭',//承办部门
        undertakeJudgeId:'D8246520_E82D_6853_30DC_919AF89031C2',//承办法官Id
        undertakeJudge:'张三',//承办法官
        presidingJudgeId:'D8246520_E82D_6853_30DC_919AF89031C2',
        presidingJudge:'张三',//审判长/员
    })
}

exports.trialbusiness = trialbusiness;
