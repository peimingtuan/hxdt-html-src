//假数据
const otherconfig={
    radioList:[
        {
            id:'1',
            bgur:require('../images/yingyongpeizhi/1.png'),
            bgur2:require('../images/yingyongpeizhi/selectd1.png'),
            selected:false
        },
        {
            id:'2',
            bgur:require('../images/yingyongpeizhi/2.png'),
            bgur2:require('../images/yingyongpeizhi/selectd2.png'),
            selected:false
        },
        {
            id:'2-1',
            bgur:require('../images/yingyongpeizhi/2-1.png'),
            bgur2:require('../images/yingyongpeizhi/selectd2-1.png'),
            selected:false
        },
        {
            id:'3',
            bgur:require('../images/yingyongpeizhi/3.png'),
            bgur2:require('../images/yingyongpeizhi/selectd3.png'),
            selected:false
        },
        {
            id:'3-1',
            bgur:require('../images/yingyongpeizhi/3-1.png'),
            bgur2:require('../images/yingyongpeizhi/selectd3-1.png'),
            selected:false
        },
        {
            id:'3-2',
            bgur:require('../images/yingyongpeizhi/3-2.png'),
            bgur2:require('../images/yingyongpeizhi/selectd3-2.png'),
            selected:false
        },
        {
            id:'3-3',
            bgur:require('../images/yingyongpeizhi/3-3.png'),
            bgur2:require('../images/yingyongpeizhi/selectd3-3.png'),
            selected:false
        }
    ],
    info1:Array(10).fill({
        viewId:'',//视角id
        viewCode:'',//视角代码
        viewName:'视角名称',//视角名称
        describe:'描述',//描述
        source:2, //来源 1 法标  2 本地
    }),
    info2:Array(10).fill({
        courtRoomTypeId:'',//法庭类型id
        courtRoomTypeCode:'',//视角代码
        courtRoomTypeName:'',//视角名称
        describe:'',//描述
        source:2 //来源 1 法标  2 本地
    }),
    info3:Array(10).fill({
        signalTypeId:'',//信号类型id
        signalTypeCode:'视角代码',//视角代码
        signalTypeName:'信号类型名称',//信号类型名称
        describe:'描述',//描述
        source:2 //来源 1 法标  2 本地
    }),
    info4:Array(10).fill({
        playConfigId:'',//播放配置id  可以为空，空就是设置
        playPattern:'播放布局模式',//播放布局模式
        region1:'',//区域1内容,palyer-播放器，list-信息展示，note-笔录
        region2:'',//区域2内容,palyer-播放器，list-信息展示，note-笔录
        region3:'',//区域3内容,palyer-播放器，list-信息展示，note-笔录
        //案件信息、播放列表显示配置
        messageWordColor:'播放信息字体颜色',//播放信息字体颜色,颜色十六进制值，格式如（255，225，255）
        messageBackgroundColor:'播放信息背景颜色',//播放信息背景颜
        //区域显示配置
        screenNameDisplay:0,//画面名称是否显示,1-显示，0-不显示
        messageDisplay:1,//信息显示,1-只显播放列表，2-只显示案件，3-两者都显示
        //播放器操作配置
        doubleClick:1, //双击设置,1-数码拉伸，2-全屏
        leftDrag:1,//左键拖拉,1-数码拉伸2-窗口交换
        playListLineSpacing:2,//播放器列表行间距
        openLight:'on',//开关灯,on-开灯，off-关灯
        //片头显示配置
        isShow:0,//是否显示(0 不显示 1 显示)
        showtimelength:1,//显示时长
        fontcolor:'字体颜色',//字体颜色,颜色十六进制值，格式如（255，225，255）
        movieWordSize:10,//字号大小
        //片头内容配置
        courtRoomName:false,//法院
        secretary:false,//书记员
        chiefJudge:false,//审判长
        casename:false,//案号
        utilname:false,//开庭地点
        judge:false,//审判员
        caseconcept:false,//案由
        startdate:false,//开庭时间
        judgepeople:false,//人民陪审员
        dsr:false,//当事人
        divisions:false,//承办部门
    }),
    info5:Array(10).fill({
        deviceId:'',//监控设备id
        deviceName:'监控设备名称',//监控设备名称
        deviceIp:'1223.1223.23',//设备ip
        operationSystem:'操作系统',//操作系统
        diskAlarmThreshold:60,//磁盘报警阀值
        memoryAlarmThreshold:60, //内存报警阀值
        cpuAlarmThreshold:60, //cpu报警阀值
        description:'描述'//描述
    }),
    info6:Array(10).fill({
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
    info9:Array(10).fill({
        "createTime": null,
        "timestamp": null,
        "sortOrder": null,
        "deleteFlag": false,
        "validityFlag": true,
        "content": "发范德萨发",
        "caseTypeName": "案件类型",
        "id": "12315223",
        "caseTypeCode": 12,
        "type": 1,//1是法庭纪律，2是权利义务
        "courtCode": 1915,
        courtName:''
    }),
}

exports.otherconfig = otherconfig;
