//假数据
const outerring={
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
    }),
    info4:Array(10).fill({
        "createTime":'',
        "timestamp":'',
        "sortOrder":'',
        "deleteFlag": false,
        "validityFlag": true,
        "chasId": "",//旁听客户端id
        "chasUUID": "A6:7B:0A:2C:E8:62",//法庭辅助序列号
        "chasName": "",//旁听辅助客户端
        "chasIp": "138.0.64.220",
        "courtRoomName":'',//法庭名称
        "courtRoomId": ""
    }),
    info8:Array(10).fill({
        "createTime": "2019-09-06 03:51:27",
        "timestamp": "2019-09-05 19:51:27",
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": true,
        "downloadIp": "1.1.1.1",
        "downloadPort": 33,
        "courtCode": 1912,
        "courtName":'',
    })
}

exports.outerring = outerring;
