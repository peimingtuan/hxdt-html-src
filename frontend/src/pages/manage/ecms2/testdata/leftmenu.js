module.exports = [
    {
        id:'1',
        name: '庭室监管',
        child:[
            {
                id:'1-1',
                name: '法庭管理',
                url: '/indexmain/courtmanagement',
            },
            // {
            //     id:'1-2',
            //     imgUrl: require('../images/courtsupervision/xietiaoguanli.png'),
            //     imgUrl2: require('../images/courtsupervision/xietiaoguanli2.png'),
            //     name: '调解室管理',
            //     url: '/indexmain/mediationroom',
            // },
            // {
            //     id:'1-3',
            //     imgUrl: require('../images/courtsupervision/zhengrenshi.png'),
            //     imgUrl2: require('../images/courtsupervision/zhengrenshi.png'),
            //     name: '证人室管理',
            //     url: '/indexmain/witnessroom',
            // },
            // {
            //     id:'1-4',
            //     imgUrl: require('../images/courtsupervision/yuanchengtingshi.png'),
            //     imgUrl2: require('../images/courtsupervision/yuanchengtingshi2.png'),
            //     name: '远程庭审室管理',
            //     url: '/indexmain/remoteroom',
            // },
        ]
    },
    {
        id:'2',
        name: '服务器监管',
        url: '/indexmain/Serversupervision',
    },
    {
        id:'3',
        name: '庭审音视频管理',
        url: '/indexmain/musicvideoment',
    },
    // {
    //     id:'4',
    //     imgUrl: require('../images/courtsupervision/cunchuqianyi.png'),
    //     name: '存储迁移管理',
    //     url: '/indexmain/storagemigration',
    // },
    {
        id:'5',
        name: '案件管理',
        child:[
            {
                id:'5-1',
                name: '案件信息管理',
                url: '/indexmain/CaseInformation',
            },
            {
                id:'5-2',
                name: '排期管理',
                url: '/indexmain/CaseManagement',
            },
            {
                id:'5-3',
                name: '回收站',
                url: '/indexmain/RecycleBin',
            },
            {
                id:'5-4',
                name: '过期排期管理',
                url: '/indexmain/OverdueScheduling',
            },
        ]
    },
    {
        id:'6',
        name: '应用配置',
        child:[
            {
                id:'6-1',
                name: '庭室配置',
                url: '/indexmain/courtyardallocation',
            },
            {
                id:'6-2',
                name: '流媒体服务器配置',
                url: '/indexmain/media',
            },
            {
                id:'6-3',
                name: '平台配置',
                url: '/indexmain/platform',
            },
            {
                id:'6-4',
                name: '法庭外围系统配置',
                url: '/indexmain/outerring',
            },
            {
                id:'6-5',
                name: '法庭辅助服务器配置',
                url: '/indexmain/assist',
            },
            {
                id:'6-6',
                name: '基础数据配置',
                url: '/indexmain/basicdata',
            },
            {
                id:'6-7',
                name: '审理业务配置',
                url: '/indexmain/trialbusiness',
            },
            {
                id:'6-8',
                name: '其它配置',
                url: '/indexmain/otherconfig',
            },
        ]
    },
    // {
    //     id:'7',
    //     imgUrl: require('../images/courtsupervision/tongjifenxi.png'),
    //     name: '统计分析',
    //     url: '/indexmain/storagemigration',
    // },
    {
        id:'8',
        name: '系统管理',
        child:[
            {
                id:'8-1',
                name: '部门管理',
                url: '/indexmain/DepartmentManagement',
            },
            {
                id:'8-2',
                name: '职务管理',
                url: '/indexmain/PositionManagement',
            },
            {
                id:'8-3',
                name: '角色-权限管理',
                url: '/indexmain/Roleprivilege',
            },
            {
                id:'8-4',
                name: '用户管理',
                url: '/indexmain/UserManagement',
            },
            {
                id:'8-5',
                name: '日志管理',
                url: '/indexmain/LogManagement',
            },
        ]
    },
    // {
    //     id:'9',
    //     imgUrl: require('../images/courtsupervision/lawpolicrecord.png'),
    //     name: '法警报警记录管理',
    //     url: '/indexmain/storagemigration',
    // },
    // {
    //     id:'10',
    //     imgUrl: require('../images/courtsupervision/tongzhiinfo.png'),
    //     name: '通知信息',
    //     url: '/indexmain/storagemigration',
    // },
    {
        id:'11',
        name: '测试信息管理',
        url: '/indexmain/Testcase',
    },
]
