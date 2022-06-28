const settingData = {
    first: [
        {
            label: '基础配置',
            saveBtn:'saveBtn1',
            children: [
                {
                    label: '开庭最小磁盘空间',
                    type: 'input',
                    unit: 'G',
                    variable: 'minspace'
                },
                {
                    label: '书记员画面使用流媒体',
                    type: 'select',
                    unit: '',
                    variable: 'clientIsLive',
                    selectData: [
                        {
                            label: '是',
                            value: true
                        },
                        {
                            label: '否',
                            value:false
                        }
                    ]
                },
                {
                    label: '书记员端是否存在任务栏',
                    type: 'select',
                    unit: '',
                    variable: 'cosExistTaskbar',
                    selectData: [
                        {
                            label: '是',
                            value: true
                        },
                        {
                            label: '否',
                            value:false
                        }
                    ]
                }
            ]
        },
        {
            label: '笔录打点管理',
            saveBtn:'saveBtn2',
            children: [
                {
                    label: '默认笔录打点快捷键',
                    type: 'input',
                    unit: '',
                    variable: 'defaultNoteKey',
                    quickCode: true,
                    quickArr: [],
                    charpress: false,
                    ctrl: false
                },
                {
                    label: '默认语音自动转写快捷键',
                    type: 'input',
                    unit: '',
                    variable: 'defaultVoiceKey',
                    quickCode: true,
                    quickArr: []
                },
                {
                    label: '默认打点间隔时间',
                    type: 'input',
                    unit: 's',
                    variable: 'defaultIntervalTime'
                },
            ]
        },
    ],
    second: [
        {
            label: '案件排期数据管理',
            saveBtn:'saveBtn2',
            children: [
                {
                    label: '审流来源',
                    type: 'select',
                    unit: '',
                    variable: 'slSourcename',
                    selectData: [],
                    server: true
                },
                {
                    label: '是否自动推送案件排期到律典通',
                    type: 'select',
                    unit: '',
                    variable: 'pushCasePlanToLDT',
                    selectData: [
                        {
                            label: '是',
                            value: true
                        },
                        {
                            label: '否',
                            value: false
                        }
                    ]
                }
            ]
        },
        {
            label: '笔录上传相关设置',
            saveBtn:'saveBtn3',
            children: [
                {
                    label: '后台直播页面笔录同步方式',
                    type: 'select',
                    unit: '',
                    variable: 'recordSyncType',
                    selectData: [
                        {
                            label: 'FTP方式',
                            value: 'ftp'
                        },
                        {
                            label: '同步服务器方式',
                            value: 'sync'
                        }
                    ],
                    server: true
                }
            ]
        },
        {
            label: '权限控制',
            saveBtn:'saveBtn4',
            children: [
                {
                    label: '案件跟用户是否绑定',
                    type: 'select',
                    unit: '',
                    variable: 'caseInfoBindingUser',
                    selectData: [
                        {
                            label: '是',
                            value: true
                        },
                        {
                            label: '否',
                            value: false
                        }
                    ]
                }
            ]
        },
        {
            label: '文书相关配置',
            saveBtn:'saveBtn5',
            children: [
                {
                    label: '审判流程节点配置',
                    type: 'select',
                    unit: '',
                    multiple:true,
                    variable: 'trialProcess',
                    selectData: [],
                    server: true
                }
            ]
        }
    ],
    third: [
        {
            label: '阿里人脸识别服务配置项',
            saveBtn:'saveBtn1',
            children: [
                {
                    label: '用户名',
                    type: 'input',
                    unit: '',
                    variable: 'cId'
                },
                {
                    label: '密码',
                    type: 'input',
                    unit: '',
                    variable: 'cSecret',
                    pwd: '',//password
                    showPwd: ''//TRUE
                },
                {
                    label: '客户名称',
                    type: 'input',
                    unit: '',
                    variable: 'vendorId'
                },
                {
                    label: '人脸识别最小相似度',
                    type: 'input',
                    unit: '%',
                    variable: 'minLike',
                },
                {
                    label: '人证匹配最小相似度',
                    type: 'input',
                    unit: '%',
                    variable: 'aliFaceRecognizeSimilarityThreshold',
                },
                {
                    label: '阿里SDK_密钥',
                    type: 'input',
                    unit: '',
                    variable: 'aliFaceRecognizeKey',
                    pwd: 'textarea'
                }
            ]
        },
        {
            label: '福昕PDF License',
            saveBtn:'saveBtn2',
            children: [
                {
                    label: '福昕PDF账号',
                    type: 'input',
                    unit: '',
                    variable: 'foxitPdfLicenseSn'
                },
                {
                    label: '福昕PDF密码',
                    type: 'input',
                    unit: '',
                    variable: 'foxitPdfLicenseUnlockCode',
                    pwd: '',//password
                    showPwd: ''//true
                }
            ]
        },
        {
            label: '上报CMS服务配置项',
            saveBtn:'saveBtn3',
            children: [
                {
                    label: '上报服务ip',
                    type: 'input',
                    unit: '',
                    variable: 'cmsIp'
                },
                {
                    label: '上报服务端口',
                    type: 'input',
                    unit: '',
                    variable: 'cmsPort'
                },
                {
                    label: '是否推送至上报服务',
                    type: 'select',
                    unit: '',
                    variable: 'enablePushcms',
                    selectData: [
                        {
                            label: '是',
                            value:true
                        },
                        {
                            label: '否',
                            value: false
                        }
                    ]
                }
            ]
        }
    ],
}
const clientConfig=[
    {
        label:'法官客户端',
        saveBtn:'saveBtn',
        children:[
            {
                label: '更多功能是否显示',
                type: 'select',
                unit: '',
                variable: 'moreFunctionShow',
                selectData: [
                    {
                        label: '显示',
                        value:true
                    },
                    {
                        label: '不显示',
                        value: false
                    }
                ]
            }
        ]
    }
]
export{
    settingData,
    clientConfig
}