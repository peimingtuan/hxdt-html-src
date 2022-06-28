const module = {
    namespaced: true,
    state:{
        courtRoomId:'',//当前法庭id
        rowinfo:'',//主页面当前行信息，区分新增和添加
        total:0,//总条数
        pageIndex:1,//当前页码
        pageSize:10,//每页大小
        manufacturerlist:[],//tab1,info3alert3页签承建厂商selectlist
        smsInfoNamelist:[],//tab6页签流媒体服务器selectlist
        storagePathNamelist:[],//tab6页签流媒体存储路径selectlist
    },
    mutations:{
        setcourtRoomId(state,data){
            state.courtRoomId=data;
        },
        setrowinfo(state,data){
            state.rowinfo=data;
        },
        settotal(state,data){
            state.total=data;
        },
        setpageIndex(state,data){
            state.pageIndex=data;
        },
        setmanuFacturerlist(state,data){
            state.manufacturerlist=data;
        },
        setsmsInfoNamelist(state,data){
            state.smsInfoNamelist=data;
        },
        setstoragePathNamelist(state,data){
            state.storagePathNamelist=data;
        },
    },
    actions:{
        //获取法庭配置列表
        getlawlist({state,commit},that){
            let {pageIndex,pageSize}=state;
            that.$showLoading('rgba');
            that.$http.post('/courtRoomConfig/getCourtRoomPageInfo', {
                keyWord:that.keyWord,
                pageIndex,//当前页码
                pageSize //每页大小
            }).then(data =>{
                that.$hideLoading('rgba');
                if(data.code===200){
                    commit('settotal',data.count)
                    that.tableData=data.data;
                }else{
                    that.$msgw(data.msg);
                }
                that=null;
            }).catch(err => {
                that.$hideLoading('rgba');
                console.log(err,'/courtRoomConfig/getCourtRoomPageInfo')
                that.$msge('服务器异常，请稍后重试');
                that=null;
            })
        },
        //获取城建厂商select
        getManufacturerInfo({state,commit},that){
            that.$showToast('加载中...')
            return that.$http.post('/getManufacturerInfo',{}).then(data =>{
                that.$hideToast()
                if(data.code===200){
                    commit('setmanuFacturerlist',data.data);
                }else{
                    that.$msgw(data.message);
                }
                that=null;
            }).catch(err => {
                that.$hideToast()
                console.log(err,'/getManufacturerInfo')
                that.$msge('服务器异常，请稍后重试');
                that=null;
            })
        },
        //流媒体服务器select
        getAllSMSInfoConfigs({state,commit},that){
            return that.$http.post('/smsInfoConfig/getAllSMSInfoConfigs',{
                pageIndex:1,
                pageSize:1000
            }).then(data =>{
                if(data.code===200){
                    commit('setsmsInfoNamelist',data.data);
                }else{
                    that.$msgw(data.message);
                }
                that=null;
                return data
            }).catch(err => {
                console.log(err,'/smsInfoConfig/getAllSMSInfoConfigs')
                that.$msge('服务器异常，请稍后重试');
                that=null;
                throw err
            })
        },
        //流媒体存储路径select
        getStoragePaths({state,commit},that){
            return that.$http.post('/smsInfoConfig/getStoragePathsBySMSInfoId',{
                        smsInfoId:that.formLabelAlign.smsInfoId
                    }).then(data =>{
                        if(data.code===200){
                            commit('setstoragePathNamelist',data.data);
                        }else{
                            that.$msgw(data.message);
                        }
                        that=null;
                        return data
                    }).catch(err => {
                        console.log(err,'/smsInfoConfig/getStoragePathsBySMSInfoId')
                        that.$msge('服务器异常，请稍后重试');
                        that=null;
                        throw err
                    })
        },
    }
}
export default module;