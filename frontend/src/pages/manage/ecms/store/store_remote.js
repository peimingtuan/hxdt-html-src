const module = {
    namespaced: true,
    state:{
        courtRoomTypeNamelist:[],//庭审室类型列表
        manufacturerlist: [], //城建厂商列表
    },
    mutations:{
        setcourtRoomTypeNamelist(state,data){
            state.courtRoomTypeNamelist=data;
        },
        setmanufacturerlist(state,data){
            state.manufacturerlist=data;
        },
    },
    actions:{
        // 庭审室类型列表请求
        getTrialRoomTypeInfos({state,commit},that) {
           return that.$http.post("/remoteTrial/getTrialRoomTypeInfos", {
                pageIndex: 1,
                pageSize: 1000
            }).then(data => {
                if (data.code === 200) {
                    commit('setcourtRoomTypeNamelist',data.data);
                } else {
                    that.$msgw(data.message);
                }
                that=null;
            }).catch(err => {
                that=null;
                console.log(err, "/getTrialRoomTypeInfos");
            });
        },
        // 承建厂商列表请求
        getManufacturerInfo({state,commit},that) {
            return that.$http.post("/getManufacturerInfo", {}).then(data => {
                if (data.code === 200) {
                    commit('setmanufacturerlist',data.data);
                } else {
                    that.$msgw(data.message);
                }
                that=null;
            }).catch(err => {
                that=null;
                console.log(err, "/getManufacturerInfo");
            });
        },
    }
}
export default module;