//假数据
//服务器监管假数据
const Serversupervision={
    serverlist:[
        {serverId: 1, serverName: "流媒体服务器"},
        {serverId: 2, serverName: "法律法规服务器"},
        {serverId: 3, serverName: "智慧质证服务器"},
        {serverId: 4, serverName: "卷宗管理服务器"},
        {serverId: 4, serverName: "语音识别服务器"},
    ],
    data:{
        'serverId':'D8246520_E82D_6853_30DC_919AF89031C2',
        'hostName':'sms1',//主机名
        'status':1,//0在线 1离线
        'ip':'10.2.34.78',
        'systemType':'Centos_x64',//操作系统
        'memory':{
                      'totalCapacity':'64G',//总量
                      'usedCapacity':'15G',//已使用
                      'available':'49G' //可用
                 },
        'CPU':'65%',//使用率
        'hardDisc':Array(5).fill({
                           'phycicalPath':'tempfs',//物理路径
                           'mountPoint':'/boot',//挂载点
                           'totalSpace':'4005408',//总空间
                           'usedSpace':'0',//已用空间
                           'usedRate':'0%', //已用百分比
                           'leftSpace':'4005408' //剩余空间
                         },
                         {
                           'disc':'C盘',//磁盘
                           'totalSpace':'4005408',//总空间
                           'usedSpace':'0',//已用空间
                           'usedRate':'0%', //已用百分比
                           'leftSpace':'4005408' //剩余空间
                          })
     },
}
//案件信息管理
const CaseInformation={
    yearlist:[{id: 1, name: "全部"}, {id: 2, name: new Date().getFullYear()}, {id: 3, name: new Date().getFullYear()-1}, {id: 4, name: new Date().getFullYear()-2}],//年份
    courtUnitPronoun:[{courtCode: 1, courtPronoun: "全部"}, {courtCode: 2,courtPronoun: '豫1601'}, {courtCode: 3, courtPronoun: '豫1602'}, {courtCode: 4, courtPronoun: '豫1603'}],//法院代字
    caseTypePronoun:[{caseTypeId: 1, caseTypeName:111,caseTypePronoun: "全部"}, {caseTypeId: 2,caseTypeName:111, caseTypePronoun:'民一庭'}, {caseTypeId: 3,caseTypeName:111, caseTypePronoun:'民二庭'}, {caseTypeId: 4,caseTypeName:111, caseTypePronoun: '民三庭'}],//案件类型代字
    departmentId:[{departmentId: 1, departmentName: "全部"}, {departmentId: 2,departmentName: '民一庭'}, {departmentId: 3, departmentName: '民二庭'}, {departmentId: 4, departmentName: '民三庭'}],//承办部门
    undertakerId:[{id: 1, name: "全部"}, {id: 2, name:'民一庭'}, {id: 3, name:'民二庭'}, {id: 4, name: '民三庭'}],//承办法官
    casetableData:Array(10).fill({
            caseInfoId:'D8246520_E82D_6853_30DC_919AF89031C2',//案件id
            caseNumber:'（2019）辽0782奥请调111号',//案号
            causeStr:'离婚纠纷',//案由
            createCaseTime:'2019-2-12',//立案日期
            departmentName:'民一庭',//承办部门
            undertakerName:'张三',//承办法官
            lastJudgeName:'张三',//审判长/员
            partyDes:'原告:张三,被告：李四',
            startTrialTime :1
    }),
    caseInfolists:Array(10).fill({
                'caseId':'12',
                'year':2019,
                'courtPronoun':'辽0782',
                'caseTypePronoun':'澳请调',
                'caseNum':'001',
                'caseType':'' ,   // 案件类型
                'createCaseTime':'2019-2-12',//立案日期
                'departmentId':'D8246520_E82D_6853_30DC_919AF89031C2',
                'departmentName':'D8246520_E82D_6853_30DC_919AF89031C2',
                'undertakerId':'D8246520_E82D_6853_30DC_919AF89031C2',
                'undertakerName':'D8246520_E82D_6853_30DC_919AF89031C2',
                'applyProgram':1,
        }),
        'trialMemberList':[{
                    'judgePeopleId':'12212121',
                    'judgePeopleName':'王五'
        },{
            'judgePeopleId':'12212121',
            'judgePeopleName':'李四'
        }],
        'caseOfCauseList':[{
                    'causeId':'888888',
                    'causeName':'离婚'
        }],
        // }
        'partyDtoList':Array(2).fill(
        {
        'caseStandingId':'123',
        'caseStandingName':'原告',
        'partyId':'1221',
        'partyName':'自然人',
        'partyTypeCode':1 ,// 1:自然人 2：法人 3：非法人组织
        'partyInfolist':[
            {
            'politicalFaceId':'', // 政治面貌
            'birthDate':'', // 出生日期
            'sexCode':'', // 性别
            'age':'', // 年龄
            'countryAreaId':'' ,// 国籍id
            'countryAreaName':'', // 国籍
            'nationId':'', // 民族
            'nationName':'',
            'educationId':'', // 文化程度
            'educationName':'本科',
            'identityTypeId':'', // 身份证件类型
            'identityTypeName':'',
            'identityNumber':'', // 证件号
            'employmentStatusId':'',  // 从业状态
            'employmentStatusName':'',
            'criminalAbilityId':'', // 刑事责任能力
            'criminalAbilityName':'具备刑事能力',
            'activeAbilityId':'', // 行为能力
            'householdRegisterPlace':'北京石景区第一号院', // 户籍所在地
            'commonAddress':'',  // 经常居住地
            'nowAddress':'', // 现住地
            'maritalStatusId':'', // 婚姻状况
            'maritalStatusName':'',
            'phone':'' ,// 电话
            // 'agentInfoList':[
            //     {
            //         'agentKind':'' // 
            //         ''：''
            //  }
            }]
        })
}
//一个案件id下所有的信息
const AllInfoByCaseInfoIdList={
    caseNumber:'（2019）辽0782奥请调111号',//案号
    caseName:'粤01',	//案件名称
    courtCode:'EDC2058',		//法院代码
    courtName:'民初',//法院名称
    year:'2019',
    courtPronoun:'EDC2058',	//法院代字
    caseNum	:'EDC2058',
    caseTypeName:'民事一审',	//案件类型名称
    caseTypeCode:'msys',		//案件类型代码
    caseTypePronoun	:'案件类型代字',	//案件类型代字
    applyProgram:1,	//适用程序（1普通2简易3特殊）     
    undertakerId:"",		//承办法官ID
    undertakerName:"王法官",		//承办法官姓名
    departmentId:"",		//承办部门ID
    departmentName:"邢一庭",		//承办部门名称
    createCaseDate:"2018-7-12",		//立案日期
    // //jsonArray	案由信息列表
    caseOfCauseList:[{   
        causeCode:'.01',//案由代码
        causeName:'民事纠纷',//案由名称
    },
    {   
        causeCode:'02',//案由代码
        causeName:'离婚纠纷',//案由名称
    }],
    // //jsonArray	涉案人信息列表
    involvedPersonDtoList:Array(6).fill({
        involvedPersonId:"involvedPersonIdID123",	//	涉案人id	
        caseStandingCode:"",	//Long32	案件地位代码	
        caseStandingName:"原告",	//	案件地位名称（原告，被告，第三人）	
        thirdPeopleTypeCode:1,	//Int	第三人类型代码	
        involvedPersonName:"当事人李四",	//	涉案人名称	  
        partyTypeCode:"1",	//Long32	当事人类型代码 （1:自然人 2：法人 3：非法人组织）	
        sexCode:"",	//	性别代码	
        sexName	:"女",	//性别名称	
        commonAddress:"北京市海淀区",	//	经常居住地	
        politicalFaceCode	:"",//政治面貌代码
        politicalFaceName:"团员",	//	政治面貌名称	
        educationCode:"",	//Long32文化程度代码	
        nationCode:"01",
        nationName:"汉",
        educationName:"大学本科",	//	文化程度名称	
        age:"15岁",//	Long32	年龄	
        birthDate:"1992-12-12",//当事人出生日期	
        countryAreaCode	:"",//Long32	国家和地区代码	
        countryAreaName:"中国",	//	国家和地区名称	
        identityTypeCode:"",	//Long32	身份证件类型代码	
        identityTypeName:"身份证",	//	身份证件类型名称	
        identityNumber:"13018984994091258",	//	身份证号码	
        activeAbilityCode:"",	//Long32	行为能力状况代码	
        activeAbilityName:"有劳动能力",	//	行为能力状况名称	
        criminalAbilityCode	:"01",//Long32	刑事责任能力代码	
        criminalAbilityName:"完全刑事能力",	//	刑事责任能力名称	
        maritalStatusCode:"",	//Long32	婚姻状况代码	
        maritalStatusName:"已婚",	//	婚姻状况名称	
        householdRegisterPlace:"北京市海淀区万寿路", //户籍所在地	
        nowAddress:"现住北京昌平",		//现住址	
        phone:"15322538951",	//电话号码	
        organizationName:"",	//	公司名称	
        unitTypeCode:"",	//Long32	单位类型代码	
        unitTypeName:"",	//string	单位类型名称	
        organizationCode:"",	//Long32	组织机构代码	
        juridicalPersonUnit:"",//	boolean	是否法人单位（1是，2否）	
        unitStatusCode:"",		//单位状态代码	
        unitStatusName:"",		//单位状态名称	
        registrationCountryCode:2,	//int	注册登记地国别代码	
        registrationCountryName:"",		//注册登记地国别	
        registrationPlace:"",	//注册登记地	
        legalRepresentative	:"",	//法定代表人姓名	
        legalRepresenDocumentType:"",	//Long32	法定代表人证件种类	
        legalRepresenDocumentNumber:"",		//法定代表人证件号码	
        legalRepresenPhone:"",		//法定代表人联系电话	
        legalRepresenAddr:"",	//法定代表人现住址	
        agentInfoList:[{//代理人信息列表
            defendKind:1,//辩护种类
            personalInfoId:"1id",	//	代理人id
            sexName:"男",
            personalInfoName:"彭平",	//	代理人名称
            agentPersonTypeCode:"",	//	代理人类型代码
            agentPersonTypeName:"",	//	代理人类型名称
            agentKind:1,//Int代理种类
            agentJurisdiction:"代理人1",//Int	代理权限
            phone:"18834789023",	//
            identityTypeCode:"",//long32	证件种类代码
            identityTypeName:"律师证",//	证件种类名称
            identityNumber:"135151",	//	证件号码
            unitName:"保证赢律师所",//工作单位
            job	:"合伙人",//	职务
        },
        {//代理人信息列表
            defendKind:1,//辩护种类
            personalInfoId:"2id",	//	代理人id
            sexName:"男",
            personalInfoName:"李平",	//	代理人名称
            agentPersonTypeCode:"",	//	代理人类型代码
            agentPersonTypeName:"",	//	代理人类型名称
            agentKind:1,//Int代理种类
            agentJurisdiction:"代理人2",//Int	代理权限
            phone:"18834789023",	//
            identityTypeCode:"",//long32	证件种类代码
            identityTypeName:"律师证",//	证件种类名称
            identityNumber:"135151",	//	证件号码
            unitName:"保证赢律师所",//工作单位
            job	:"合伙人",//	职务
        }],
        defendInfoList:Array(2).fill({//辩护人信息
            defendKind:"2",//辩护种类
            sexName:"女",
            personalInfoId:"",	//	代理人id
            personalInfoName:"李四",	//	代理人名称
            agentPersonTypeCode:"",	//	代理人类型代码
            agentPersonTypeName:"",	//	代理人类型名称
            agentKind:1,//Int代理种类
            agentJurisdiction:"代理权限",//Int	代理权限
            phone:"18834789023",	//
            identityTypeCode:"",//long32	证件种类代码
            identityTypeName:"律师证",//	证件种类名称
            identityNumber:"135151",	//	证件号码
            unitName:"保证赢律师所",//工作单位
            job	:"合伙人",//	职务
        })
    }),
    trialPlanMemberDto:Array(6).fill({//排期和审判人员信息列表
        trialPlanId:"",	
        trialMode:1,	//审理模式
        trialFormCode:2,//审理形式	
        factStartDate:"2018-9-12",	//开庭日期
        factStartTime:"10:30",	//开庭时间
        factEndTime:"2018-12-9",	//结束时间
        courtRoomId	:"DD",//开庭地点id
        courtRoomName:"江苏人民法院",//	开庭地点（法庭名称）
        publicTrial:0,	//是否公开审理
        soleTrial:1, //是否独任审理
        courtTime:"2",//庭次	
        courtWay:"开庭方式",//案由？？	
        trialStatus:"已开庭",//庭审状态	
        multipleCourtCause:"",	
        //JsonArray	审判组织成员
        trialMemberList:[{	
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
    }),
}

//案件排期管理
const CaseManagement={
    year:[{id: 1, name: "全部"}, {id: 2, name: new Date().getFullYear()}, {id: 3, name: new Date().getFullYear()-1}, {id: 4, name: new Date().getFullYear()-2}],//年份
    }


//存储迁移排期管理
const StorageMigration={
    casetableData:Array(10).fill({
        "transferTaskId":"D8246520_E82D_6853_30DC_919AF89031C2",//传输任务id
        "taskName":"(2019)粤01民初1234号",
        "taskStatus":0,//0等待1传输中
        "taskType": 0,//0定时，1实时
        "startDate":"2019.3.12",
        "startTime":"18:00:00",
        "endDate":"2019.3.12",
        "endTime":"19:00:00",
        "sourcePath":"10.1.1.1/home/",
        "destPath":"10.1.1.2/home",
        "taskSource":"集中备份",//任务来源
        "remarks":"备注"//备注
        }),
}
//过期管理
// {
//     index:'1',
//     ah:'(2019)辽0782澳情调111号',
//     tc:'1',
//     cbbm:'民一庭',
//     cbr:'张三',
//     dsr:'李四',
//     spz:'张晓明',
//     sjy:'刘涛',
//     ktrq:'2019-03-23',
//     tszt:'未开庭',
//     ft:'第一法庭',
// },
//id下的排期信息
const SchedulingM={
    casetableData:Array(8).fill({
        trialFormCode:4,
        courtTime:1,
        factStartDate:'2019.02.12',//开庭日期
        factStartTime:'10:30',//开庭时间
        factEndDate:'2019.02.12',//闭庭日期
        factEndTime:'12:00',//闭庭时间
        courtRoomName:'第一法庭',
        trialStatus:3,//开庭状态
        trialPlanId:"D1511eEDD",//排期id
      })
}
const userdata={
    sexlist:[
        {code: 1, name: "全部"},
        {code: 2, name: "男"},
        {code: 3, name: "女"},
    ],
    departmentlist:[
        {code: 1, name: "全部"},
        {code: 2, name: "院长办公室"},
        {code: 3, name: "主任办公室"},
    ], 
    rolelist:[
        {code: 1, name: "全部"},
        {code: 2, name: "院长"},
        {code: 3, name: "主任"},
    ],
    zhlist:[
        {code: 1, name: "全部"},
        {code: 2, name: "男"},
        {code: 3, name: "女"},
    ],
    userlist:Array(10).fill(
        {
            'xm':'辉',
            'dlm':'123132',
            'bm':'院长办公室',
            'zw':'审判长',
            'dw':'黑龙江省高级人民法院',
            'yhlx':"永久用户"
    })
}

//日志
const LogManagement={
        //模块类型
        modulesNameList: [
                { value: '1', label: '庭室管理' },
                { value: '2', label: '庭室音视频管理' },
                { value: '3', label: '案件信息排期管理'},
                { value: '4',label: '统计分析' },
                { value: '5', label: '应用管理'} ,
                { value: '6', label: '系统管理'}],
        //客户端类型
        clientTypeList: [{value: '1', label: '全部'},
                {value: '2',  label: '书记员客户端'}, 
                {value: '3',label: '法官客户端'}, 
                {value: '4', label: '当事人客户端'},
                {value: '5', label: '显示客户端'}],
         //全部法庭类型
         courtTypeList: [
            {
            value: '1',
            label: '全部'
            },
            {
            value: '2',
            label: '第一法庭'
            }, {
            value: '3',
            label: '第二法庭'
            }, {
            value: '4',
            label: '第三法庭'
            }
        ],
       //用户日志列表
       userlogData:Array(5).fill({
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": null,
        "operationTime": null,
        "logTypeCode": 1,
        "userId": "7D74D44F_0CC2_4A0D_746A_9ED2DF6A6EEE",
        "moduleName": "配置大声点",
        "description": "SDD",
        "operationDate": "2018-01-11",
        "userLogId": "7D74D45F_0CC3_4A0D_746A_9ED1DF6A6EEE",
        "operationTypeCode": 1,
        "courtUnitCode": 1,
        "moduleId": "7D74D45D_0CC2_4A0D_746A_9ED1DF7A6EEE",
        "userName": "大声点"
     }),
       //登录日志列表
       logData:Array(5).fill({
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": null,
        "loginIp": "10.1.2.13",
        "loginTime": null,
        "courtUnitCode": 1000,
        "userId": "09950950_A32F_ECBD_A34A_C7A0DA47A88A",
        "logTypeCode": 2,
        "loginLogId": "09950950_A32F_ECBD_A34A_C7A0DA46A88A",
        "logoutTime": '10:30',
        "loginDate": "2018-01-11",
        "description": "我登录了",
        "logoutDate": '2018-9-12',
        "userName": "大王"
    }),
    //系统日志列表
    systemData:Array(5).fill({
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": null,
        "recordDate": "2018-01-12",
        "moduleName": "庭室监管",
        "logTypeCode": 3,
        "recordTime": null,
        "courtUnitCode": 1000,
        "systemLogId": "09950950_A32F_ECBD_A34A_C7A0DA56A88A",
        "description": "奔溃",
        "moduleId": "7D54D45D_0CC2_4A0D_746A_9ED1DF7A6EEE"
    }),
    //文件下载
    downloadData:Array(5).fill({
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": null,
        "caseInfoId": "09950950_A32F_ECBD_A34A_C7A11A56A88A",
        "courtUnitCode": 1000,
        "userId": "09950950_A32F_ECBD_A34A_C7A2DA56A88A",
        "logTypeCode": 4,
        "caseNumber": "默认案号",
        "recordTime": '12:20',
        "description": "下载东西中",
        "courtTime": 2,
        "recordDate": "2018-01-11",
        "startTrialTime": null,
        "videoCount": 3,
        "clientIp": "09950950_A32F_ECBD_A34A_C7A0FA56A88A",
        "startTrialDate": "2019-11-02",
        "downloadLogId": "09950950_A32F_ECBD_A34A_C7A0DA56A88A",
        "userName": "小文"
    }),
      //刻录日志下载
      imprintData:Array(5).fill({
        recordTDate:"2018-6-2",
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": null,
        "caseInfoId": "09950950_A32F_ECBD_A34A_C7A11A56A88A",
        "courtUnitCode": 1000,
        "userId": "09950950_A32F_ECBD_A34A_C7A2DA56A88A",
        "logTypeCode": 4,
        "caseNumber": "默认案号",
        "recordTime": null,
        "description": "下载东西中",
        "courtTime": 2,
        "recordDate": "2018-01-11",
        "startTrialTime": null,
        "videoCount": 3,
        "clientIp": "09950950_A32F_ECBD_A34A_C7A0FA56A88A",
        "startTrialDate": "2019-11-02",
        "downloadLogId": "09950950_A32F_ECBD_A34A_C7A0DA56A88A",
        "userName": "小文"
    }),
     //客户端日志下载
     clientData:Array(5).fill({
            "createTime": null,
            "timestamp": null,
            "sortOrder": null,
            "deleteFlag": false,
            "validityFlag": null,
            "recordDate": "2018-01-12",
            "moduleName": "庭室监管",
            "logTypeCode": 3,
            "recordTime": null,
            "courtUnitCode": 1000,
            "systemLogId": "09950950_A32F_ECBD_A34A_C7A0DA56A88A",
            "description": "奔溃",
            "moduleId": "7D54D45D_0CC2_4A0D_746A_9ED1DF7A6EEE"
    })
}





exports.Serversupervision = Serversupervision;
exports.CaseInformation = CaseInformation;
exports.CaseManagement = CaseManagement;
exports.SchedulingM = SchedulingM;
exports.AllInfoByCaseInfoIdList = AllInfoByCaseInfoIdList;
exports.LogManagement = LogManagement;
exports.userdata = userdata;
exports.StorageMigration = StorageMigration;
