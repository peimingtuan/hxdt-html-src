//假数据
//庭室管理
const courtmanagement={
    options:[
        {id: 1, name: "全部法庭"},
        {id: 2, name: "正在开庭"},
        {id: 3, name: "正在休庭"},
        {id: 4, name: "未开庭"}
    ],
    options2:[
        {id:1, name:'最近开庭'},
        {id:2, name:'法庭序号'},
    ],
    videolist:Array(9).fill({
        caseId:'D8246520_E82D_6853_30DC_919AF89031C2',
        courtRoomUseId:'D8246520_E82D_6853_30DC_919AF89031C2',
        caseNumber:'粤01民终001号',
        startDate:'2019.03.10',
        startTime:'10:00',
        status:0,//(0正在开庭，1休庭，2未开庭)
        courtRoomId:'D8246520_E82D_6853_30DC_919AF89031C2',
        courtRoomName:'第一法庭',
        vedioStatus:'正常',//(音视频质量)
        hostDeviceStatus:'正常',//（主机状态）
        serialNumber:1//（法庭序号）
    })
}
//音视频管理
const musicvideoment={
    tableData:Array(12).fill({
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
        partyInfo:[
            {
                partyId:'D8246520_E82D_6853_30DC_919AF89031C2',
                caseStatusId:'D8246520_E82D_6853_30DC_919AF89031C2',
                caseStatus:'原告',//案件地位
                partyName:'王五',//当事人名称
            },
            {
                partyId:'D8246520_E82D_6853_30DC_919AF89031C2',
                caseStatusId:'D8246520_E82D_6853_30DC_919AF89031C2',
                caseStatus:'原告',//案件地位
                partyName:'王五',//当事人名称
            }
        ],
        times:2,//开庭次数
        courtRoomUses:[

        ],
    })
}
//应用配置
//庭室配置
const courtyardallocation={
    tableData:Array(9).fill({
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
        times:2,//开庭次数
    }),
    info2:Array(8).fill({
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
    info3:Array(2).fill({
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
let disWarn = [
   {status:0, name:'全部'},
   {status:2, name:'待追车'},
   {status:3, name:'追车中'},
]
exports.courtmanagement = courtmanagement;
exports.musicvideoment = musicvideoment;
exports.courtyardallocation = courtyardallocation;
