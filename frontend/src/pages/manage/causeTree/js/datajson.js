//假数据
//主页法院
const indexmain={
    lawlist:[
        {courtCode: 1, courtName: "北京中级人民法院"},
        {courtCode: 2, courtName: "上海中级人民法院"},
        {courtCode: 3, courtName: "郑州中级人民法院"},
        {courtCode: 4, courtName: "广州中级人民法院"}
    ]
}
//庭室管理
const courtmanagement={
    options:[
        {id:'', name: "全部法庭"},
        {id:3, name: "正在开庭"},
        {id:2, name: "正在休庭"},
        {id:1, name: "未开庭"}
    ],
    options2:[
        {id:1, name:'最近开庭'},
        {id:2, name:'法庭序号'},
    ],
    info:{//主页列表
        courtTotalNum:10,//法庭总数
        courtStartNum:3,//正在开庭数
        courtAdjournNum:1,//休庭数
        courtCloseNum:6,//未开庭数
        videolist:Array(9).fill({
            courtRoomId:'D8246520_E82D_6853_30DC_919AF89031C2',//法庭id
            courtRoomName:'第一法庭',//法庭名称
            caseNumber:'粤01民终001号',//案号
            startTrialDate:'2019.03.10',//开庭日期
            startTrialTime:'10:00',//开庭时间
            courtRoomStatus:0,//法庭状态(0正在开庭，1休庭，2未开庭)
            vedioStatus:'正常',//(音视频质量)
            hostStatus:'正常',//（主机状态）
            phontoUrl:require('../images/courtsupervision/test-viedo.png'),//播放图片路径
            //serialNumber:1//（法庭序号）
        })
    },
    //当前法庭客户端信息
    clientStatusInfos:{
        clientId:'D8246520_E82D_6853_30DC_919AF89031C2',//客户端id
        clientName:'书记员客户端1',
        ip:'10.1.2.18',
        status:0,//(0在线，1离线)
        system:'win10 64位',
        currentVersion:'1.0.3.4',//当前软件版本
        latestVersion:'1.0.3.4',//最新软件版本
        username:'正常',//当前登录用户
        harddisc:Array(1).fill({
            diskName:'C盘',//（盘符）
            totalSpace:'100G',//(总空间)
            usedSpace:'60G',//(使用空间)
            availableSpace:'40G'//(剩余空间)
        }),
        cpuUsedPercentage:'65%',//(cpu当前使用百分比)
        usedMemoryRate:'65%' //(内存当前使用百分比)
    },
    //更多排期信息
    visaalert:Array(6).fill({
        trialPlanId:'D8246520_E82D_6853_30DC_919AF89031C2',
        caseNumber:'（2019）辽0782民初001号',//案号
        courtTime:1,//(庭次)
        factStartDate:'2019.02.12',//(开庭日期)
        factStartTime:'10:00',//(开庭时间)
        courtRoomName:'第一法庭',
        undertakeJudge:{
            judgeId:'xxx',//承办法官id
            judgeName:'红衣主教',//承办法官名称
            duty:'法官',
            unit:'北镇市人民法院',
            phoneNumber:'1864567890',
            department:'民一庭',//部门
            iM:6789089,
            pictur:'XXXXXXXXX',
                    },    //承办法官信息
        clerk:{
            clerkId:'',//书记员id
            clerkName:'业余书记员',//书记员名称
            duty:'书记员',
            unit:'北镇市人民法院',
            phoneNumber:'1864567890',
            department:'民一庭',//部门
            iM:6789089,
            picture:'XXXXXXXXX'
              },    //书记员信息
        }),
    //庭审主机信息
    mainalertinfo:{
        //主机资源信息
        systemStatusInfo: {
            cpuUsedPercent: '50%',//cpu使用百分比
            memoryUsage: {
                totalMemory: '1000',//总内存
                usedMemory: '100',//已使用内存
                usedMemoryRate: '98%',//内存使用率
            },
            diskUseInfo: [{
                physicalPathName: 'c/dihvsvh',// 物理路径名称
                mountPathName: 'c/dihvsvh',// 挂载路径名称
                totalSpace: '100G',//总空间
                availableSpace: '50G',//可用空间
                usedSpace: '10G',// 已用空间
                percentageUsed: '50%',//已用百分比
            }],
        },
        totalEncodeDevice:'10',//编码设备总数
        normalTotalEncode:'2',//编码设备正常数
        wrongTotalEncode:'1',//编码设备不正常数
        offTotalEncode:'2',//编码设备离线数
        totalDecodeDevice:'10',//解码设备总数
        normalTotalDecode:'2',//编码设备正常数
        wrongTotalDecode:'2',//编码设备不正常数
        offTotalDecode:'1',//编码设备离线数
        courtDeviceModelName:'HMCP20000',//主机型号
        courtDeviceIp:'162.236.20',//设备ip
        courtDeviceSerialNumber:'1233.254.545',//序列号
        courtDeviceVersion:'122333',//版本号
    }
}
//音视频管理
const musicvideoment={
    year:[{id: 1, name: "全部"}, {id: 2, name: new Date().getFullYear()}, {id: 3, name: new Date().getFullYear()-1}, {id: 4, name: new Date().getFullYear()-2}],//年份
    courtUnitPronoun:[{courtCode: 1, courtPronoun: "全部"}, {courtCode: 2,courtPronoun: '豫1601'}, {courtCode: 3, courtPronoun: '豫1602'}, {courtCode: 4, courtPronoun: '豫1603'}],//法院代字
    caseTypePronoun:[{caseTypeId: 1, caseTypeName:111,caseTypePronoun: "全部"}, {caseTypeId: 2,caseTypeName:111, caseTypePronoun:'民一庭'}, {caseTypeId: 3,caseTypeName:111, caseTypePronoun:'民二庭'}, {caseTypeId: 4,caseTypeName:111, caseTypePronoun: '民三庭'}],//案件类型代字
    departmentId:[{departmentId: 1, departmentName: "全部"}, {departmentId: 2,departmentName: '民一庭'}, {departmentId: 3, departmentName: '民二庭'}],//承办部门
    undertakerId:[{userId: 1, userName: "全部"}, {userId: 2, userName:'民一庭'}, {userId: 3, userName:'民二庭'}],//承办法官
    casetableData:Array(10).fill({
        caseInfoId:'D8246520_E82D_6853_30DC_919AF89031C2',//案件id
        caseNumber:'（2019）辽0782奥请调111号',//案号
        caseAyStr:'离婚纠纷',//案由(目前接口没有返回)
        createCaseTime:'2019-2-12',//立案日期
        isBurn:0,//是否刻录 0否1是
        departmentName:'民一庭',//承办部门
        undertakerName:'张三',//承办法官
        lastJudgeName:'张三',//审判长/员
        partyDes:'原告:张三,被告：李四',
        startTrialTime:2,//开庭次数
    }),
    isburn:[{id:'', name: "全部"}, {id:1, name:'已刻录'},{id: 2, name:'未刻录'},{id:3, name:'部分刻录'}],//1 已刻录 2未刻录3部分刻录
    courtRoomaddress:[{id: 0, name: "全部"}, {id: 1, name:'第一法庭'}, {id: 2, name:'第二法庭'}],//是否刻录
    casesorttableData:Array(10).fill({
        caseInfoId:'D8246520_E82D_6853_30DC_919AF89031C2',//案件id
        caseNumber:'（2019）辽0782奥请调111号',//案号
        caseAyStr:'离婚纠纷',//案由(目前接口没有返回)
        createCaseTime:'2019-2-12',//立案日期
        burn:1,// 1 已刻录 2未刻录3部分刻录
        departmentName:'民一庭',//承办部门
        undertakerName:'张三',//承办法官
        lastJudgeName:'张三',//审判长/员
        partyDes:'原告:张三,被告：李四',
        startTrialTime:2,//开庭次数
        factStartDate:'2019.02.12',//开庭日期
        factStartTime:'10:30',//开庭时间
        factEndDate:'2019.02.12',//闭庭日期
        factEndTime:'12:00',//闭庭时间
        trialStatus:1,//1已开庭
        courtRoomName:'第一法庭',//开庭地点
    })
}
//应用配置
//庭室配置
const courtyardallocation={
    tableData:Array(10).fill({
        courtRoomId: "7027FD75_3CF7_B5DE_60A1_F5051492B201",//法庭id
        courtRoomName: "第五法庭",//法庭名称
        courtCode: 10001,//法院代码
        courtName: "河北高级人民法院",//法院名称
        sortOder:'1',//排序号
        courtRoomTypeCode: 1,//法庭类型代码
        courtRoomTypeName: "简易型",//法庭类型名称
        noteServerIp: "10.1.2.13",//笔录同步服务器ip
        noteServerId:"D9246520_E82D_6853_23DC_919AF89031C2",//笔录同步服务器id
        signalTypeCode:"D9276520_E82D_6853_30DC_919AF89031C2",//信号类型代码
        signalTypeName:"信号类型名称",//信号类型名称
        signalResourceCode:1,//信号来源代码
        signalResourceName: "华夏电通",//信号来源名称
        manufacturerCode:1,//厂商代码
        manufacturerName: "华夏",//厂商名称
        timeSeriesPowerIp: "10.1.3.12",//时序电源ip
        description: "法庭基本信息",//描述
        buildDate:"2019-07-11",//建设日期
        systemDetectionStatus:true,//设备检测
        clientLiveStreaming:1,//客户端直播流
        bailiffAlarmUrl:"http://10.50.12.133/emd",//法警报警url
        interfaceId:"1",//接口标识
        clientTemporaryConnetion:true,//允许客户端临时连接
        videoRecoding:true,//视频是否重新编码
        trialLiveImageUrl:"d://e.png",//庭审直播图片url
        trialLiveImageSetUp:1 //庭审直播图片设置
    }),
    info2:Array(10).fill({
        courtRoomId:'',//法庭id
        clientId:'',//客户端id
        clientType:'',//客户端类型
        clientTypeName:'客户端类型名称',//客户端类型名称
        clientName:'',//客户端名称
        netWorkIp:'101.12.23',//网卡ip
        macAddress:'网卡MAC地址',//网卡MAC地址
        checkRecordNote:0,//是否校验笔录 0是1否
        penWide:10,//笔录批注画笔宽度
        penColor:'',//笔录批注画笔颜色
        trialPreviewUrl:'122222',//庭前预览视频URL
        trialPreviewName:'313164',//庭前预览视频名称
        description:'描述',//描述
        defaultLoginWay:'默认登陆方式',//默认登陆方式
        temporaryNoteSaveTime:'保存笔录天数',//保存笔录天数
        sendNoteRecordTime:133,  //发送笔录时间间隔（秒）
        hostMessageCheck:0,//本机系统信息检测
        playerVoiceColumnPos:'',//音量柱位置
        playerVoiceColumn:true, //是否显示音量柱 如果这个是否，音量住位置不让选择
        collapseStopTrial:true, //客户端崩溃是否自动闭庭
        rememberPassword:true,//是否允许记录密码
        deviceConnectedCheck:1, //设备连通性是否检测
        clientUpgradeCheck:0, //客户端是否升级检测
        autoClientUpgrade:0, //客户端是否自动升级
    }),
    info3:{
        first:Array(2).fill({
            courtRoomId:'D8246520_E82D_6853_30DC_919AF89031C2',//法庭设备id
            courtDeviceId:'D8246520_E82D_6853_30DC_919AF89031C2',//设备id
            courtDeviceIp:'213548',//设备ip
            deviceType:0,//0编解码器，1编码器，2解码器
            courtDeviceModel:1,//设备型号代码
            courtDeviceModelName:'设备型号名称',//设备型号名称
            courtDeviceSerialNumber:'序列号',//序列号
            courtDeviceVersion:'版本号',//版本号
            manufacturerName:'厂商名称',//厂商名称
            manufacturerId:'厂商id',//厂商id
        }),
        second:Array(2).fill({
            createTime: "2019-07-07 15:23:42",//创建日期
            timestamp: "2019-07-07 15:23:41",//时间戳
            sortOrder: 2,//排序号
            deleteFlag: false,//删除标记
            validityFlag: true,//是否有效
            pullFlowType: -1,//解码拉流方式
            viewId: "01936084_97FA_49E9_A1F7_5C650BD1051D",//视角id
            signalSourceId: "C05EBAAD_BE66_EFBB_60D8_D861F2C9C619",//信号源id
            outputDeviceName: "-",//输出设备名称
            extranetChannelName: "externet_live_10.50.12.98_m1a1",//外网直播频道名
            intranetChanneUrl: "rtsp://10.50.12.98/internal_live_10.50.12.98_m1a1",//内网直播频道url
            intranetChannelName: "internal_live_10.50.12.98_m1a1",//内网直播频道名
            signalSourceType: -1,//编解类型(1编码2解码)
            recordInSign: true,//签名阶段是否录制（1是0否）
            record: true,//庭审阶段是否录制
            ecosRecord: null,//ECOS是否录制(1是，0否)
            liveBurn: null,//是否实时刻录(1是，0否)
            courtRoomName: "-",//法庭名称
            flowAddress: "10.54.12.133",//流地址
            viewName: "全景",//视角名称
            flowType: 1,//流类型
            channelNum: -1,//通道号
            courtRoomId: "-",//法庭id
            viewLocation: 1,//画面位置
            startIntranetChannel:true,//是否开启内网直播通道
            startExtranetChannel:true,//是否开启外网直播通道
            captionsSource: "011",//字幕内容
            subtitleContent: "自定义字幕内容",//自定义字幕内容
            contentPosition: "UPPER_LEFT",//字幕显示位置 0不显示  1 左上  2左下  3 右上  4 右下
            contentDuration:1,//字幕样式显示时长
            contentColor:"",//字幕颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
            timePosition: "",//字幕叠加系统时间显示位置
            timeColor: "",//字幕叠加系统时间字体颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
            timeDuration: 0,//系统时间设置显示时长
            bitratePosition: "",//字幕叠加码率显示位置
            bitrateColor: "",//	字幕叠加码率字体颜色
            bitrateDuration: 0,//字幕码率显示时长
            pushSubtitle: true,//是否设置字幕 1是 0否
            pushTime: true,//是否设置时间 1是0否
            courtDeviceModel: -1,//法庭设备类型
            courtDeviceModelName: "-"//法庭设备类型名称



            // sourceId:'',
            // courtRoomId:'gdsgfd',
            // viewName:'信号源名称',//信号源名称
            // viewLocation:'对应合成画面位置',//对应合成画面位置
            // flowAddress:'流地址',//流地址
            // intranetChannelName:'内网直播频道名',//内网直播频道名
            // extranetChannelName:'对外直播频道名',//对外直播频道名
            // intranetChanneUrl:'内网直播频道url',//内网直播频道url
            // flowType:1, //流类型
            // record:'1',//庭审阶段是否录制 1是0否
            // recordInSign:'1',//签名阶段是否录制 1是0否
            // captionsSource:'字幕内容设置',//字幕内容设置： 法庭名称 / 案号/ 画面名称   1是选中 0是不选中，如 001，000，111
            // pushTime:0,//是否设置时间 0不设置 1设置
            // subtitleContent:'自定义字幕',//自定义字幕
            // contentPosition:0,//字幕显示位置 0不显示  1 左上  2左下  3 右上  4 右下
            // contentDuration:'12',//字幕样式显示时长
            // contentColor:1, //字幕颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
            // timePosition:0,//字幕叠加系统时间显示位置0不显示  1 左上  2左下  3 右上  4 右下
            // timeColor:1, //字幕颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
            // timeDuration:'1022',//系统时间设置显示时长
        }),
        three:Array(2).fill({
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
    },
    info4:Array(10).fill({
        courtRoomId:'xxx',//法院id
        rtRecordSupport:0, //是否刻录  0 不刻录  1 刻录
        burnType:'刻录方式',//刻录方式
        burnServerIp:'刻录服务器ip',//刻录服务器ip
        noteRecord:1,//是否支持刻录  0 不支持 1支持
        viewInfoList:[{
            viewId: '',//画面id
            checkStatus: 0 //是否选中  0 不选中 1 选中
        }],
    }),
    info5:{
        first:Array(2).fill({
            "createTime": "2019-07-31 10:32:52",
            "timestamp": null,
            "sortOrder": -1,
            "deleteFlag": false,
            "validityFlag": true,
            "manufacturerCode": 1,//厂商代码
            "trackNum": 23,//声道
            "audioDeviceId": "DE95A564_4368_6EF4_3961_A898A3A7079E",//音频设备id
            "serverId": "-",//服务器id没用
            "masterSlaveRole": 1,//主从关系
            "serialNumber": "PH23432",//序列号
            "manufacturerName": "华夏电通",//厂商名称
            "parentDeviceId": "123456543245643",//主设备id
            "parentDeviceName": "主设备A",//主设备名称
            "deviceIp": "10.1.2.3",//设备ip
            "deviceType": 1,//设备类型
            "version": "v1.0.1",//版本号
            "audioDeviceName": "音频设备名称",//音频设备名称
            "courtRoomId": "05B46099_0283_6011_1535_6E99FA981511"//法庭id
        }),
        second:Array(2).fill({
            "createTime": "2019-07-31 15:09:07",
            "timestamp": "2019-07-31 15:09:06",
            "sortOrder": 1,
            "deleteFlag": false,
            "validityFlag": true,
            "voiceCall": false,//是否语音识别
            "connectDeviceIp": "10.2.2.3",//连接设备ip
            "flowAddress": "rtsp://10.1.23.3",//流地址
            "record": true,//是否录制
            "audioTrack": 1,//声道
            "courtRoomName": "-",//法庭名称
            "flowPackageMode": 1,//流封装模式
            "audioRoleId": "01936084_97FA_49E9_A1F7_5C650BD1051D",//音频角色id
            "audioSignalSourceId": "039B35F8_1A47_D856_F070_0487EEDEE810",//音频信号源id
            "remarks": "-",//备注
            "syncFluidization":true,//同步流化
            "audioRoleName": "审判长",//音频角色名称
            "channelNum": 10,//通道数
            "soundColumn": true,//是否显示音柱
            "courtRoomId": "039B35F8_1A47_D856_F070_0484EEDEE810"//法庭id
        }),
    },
    info6:Array(10).fill({
        courtRoomId:'',//法庭设备id
        storagePathId:'',//存储路径id
        storagePathName:'存储路径名称',//存储路径名称
        smsInfoId:'',//流媒体id
        smsInfoName:'流媒体名称', //流媒体名称
        courtRoomSmsId:'',//法庭流媒体id
    })
}
export{
    indexmain,
    courtmanagement,
    musicvideoment,
    courtyardallocation
}
