const module = {
    namespaced: true,
    state:{
        smsInfoId:'',//当前流媒体id
        serialNumber:'',//序列号
    },
    mutations:{
        changesmsInfoId(state,data){
            state.smsInfoId=data;
        },
        setserialNumber(state,data){
            state.serialNumber=data;
        },
    },
    actions:{

    }
}
export default module;