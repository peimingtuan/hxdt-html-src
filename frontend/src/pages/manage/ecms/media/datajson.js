//假数据
//流媒体庭审配置
const media={
    count:100,
    SMSInfolist:Array(10).fill({
        smsInfoId:'dD-51DC',//流媒体id
        smsInfoName:'主流媒体服务器1',//流媒体名称
        intranet1Ip:'10.1.2.3',//列表展示内网Ip
        intranet1Name:'内网网卡名',//内网网卡名称
        extranet1Ip:'126.9.10',//外网ip
        extranet1Name:'外网网卡',//外网网卡名称
        serialNumber:'547bca40-8d6d-11e7-9036-7f6350367f63',//序列号
        version:'6.0.0.1',//版本号
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
        transmit: true,//是否传输
        retainOriginalDocument:true,//是否保留原文件
        targetPath: "/home/movies",//目的路径
        startTime: "12:00",//开始时间
        endTime: "20:00"//结束时间
    }),
    //流媒体id获取挂载路径列表
    id_getMountPathslist:Array(10).fill({
        smsInfoId:'流媒体id',//流媒体id
        storagePathId:'存储路径id',//存储路径id
        storagePathName:'trials',//存储路径名称
        sourceStoreIp:'10.2.8',//源存储ip
        mountPathId:'/svn',//挂载路径Id
        sharedPath:'12353',//共享路径
        userName:'',//共享名
        password:'',//密码
    })
}

exports.media = media;
