//流媒体庭审配置
const media={
        count:100,
        SMSInfolist:Array(10).fill({
                smsInfoId:'dD-51DC',//流媒体id
                smsInfoName:'主流媒体服务器1',//流媒体名称
                intranet1Ip:'10.1.2.3',//内网Ip
                intranet1Name:'内网网卡名',//内网网卡名称
                extranet1Ip:'126.9.10',//外网ip
                extranet1Name:'外网网卡',//外网网卡名称
                serialNumber:'547bca40-8d6d-11e7-9036-7f6350367f63',//序列号
                version:'6.0.0.1',//版本号
        }),
        //流媒体id获取挂载路径列表
        id_getMountPathslist:Array(10).fill({
            smsInfoId:'流媒体id',//流媒体id
            storagePathId:'存储路径id',//存储路径id
            storagePathName:'trials',//存储路径名称
            physicalPath:'trials',//物理路径
            password:'123',//密码
            sourceStoreIp:'10.2.8',//源存储ip
            mountPathId:'/svn',//挂载路径Id
            sharedPath:'',//共享路径
            username:'chnsysadmin',//用户名
    }),
        //添加流媒体存储路径表格数据
        StoragePathlist:Array(10).fill({
            smsInfoId:'流媒体id',//流媒体id
            storagePathId:'存储路径id',//存储路径id
            storagePathName:'trials',//存储路径名称
            virtualPath:'trials',//虚拟路径
            playchannelName:'MP4',//点播频道名
            physicalPath:'/home/ftp/Movies/trials/',//物理路径
            ftpPath:'/trials/',//ftp路径
            ftpUserName:'chnsysftp',//ftp用户名
            ftpPassword:'chnsysftp',//ftp密码
            ftpPort:'21',//ftp端口号
            description:'描述',//描述
    })
}
//平台配置信息
const platform={
    SMSInfolist:Array(10).fill({
            platformId:'10000',//平台id
            platformIp:'10.1.2.3',//平台ip
            platformPort:'1234',//平台端口
            platformType:'后台能力集管理平台',//平台类型
            description:'平台数据说明',//说明
            ruleCode:1,//规则代码
            ruleName:'规则名称',//规则名称
            courtId:'id12',//法庭id
            courtCode:10000,//法院代码
            courtName:'江苏法院' ,//法院名称
    }),
}
exports.media = media;
exports.platform = platform;

