const module = {
    namespaced: true,
    state:{
        courtUnitPronounlist:[],//法院代字
        caseTypePronounlist:[],//案件类型代字
        departmentlist:[],//部门select
        personinfolist:[],//人员信息select
        courtRoomaddress:[],//开庭地点，法庭信息
    },
    mutations:{
        setcourtUnitPronoun(state,data){
            state.courtUnitPronounlist=data;
        },
        setcaseTypePronoun(state,data){
            state.caseTypePronounlist=data;
        },
        setdepartment(state,data){
            state.departmentlist=data;
        },
        setpersoninfo(state,data){
            state.personinfolist=data;
        },
        setcourtRoomaddress(state,data){
            state.courtRoomaddress=data;
        },
    },
    actions:{
        //获取法院代字
        getUnit({state,commit},that){
            return that.$http.post('/baseInfo/getAllcourtPronoun',{

                    }).then(data => {
                        if (data.code === 200) {
                            let list=data.data;
                            //list.unshift({courtCode:'',courtPronoun: "全部"})
                            commit('setcourtUnitPronoun',list)
                        } else {
                            that.$msgw(data.message);
                        }
                        that=null;
                    }).catch(err => {
                        console.log(err,'/baseInfo/getAllcourtPronoun')
                        that.$msge('服务器异常，请稍后重试');
                        that=null;
                    })
        },
        //获取案件类型代字
        getcaseType({state,commit},that){
            return that.$http.post('/baseInfo/getAllCaseTypePronoun',{

                    }).then(data => {
                        if (data.code === 200) {
                            let list=data.data;
                            list.unshift({caseTypeId:'',caseTypePronoun: "全部"})
                            commit('setcaseTypePronoun',list)
                        } else {
                            that.$msgw(data.message);
                        }
                        that=null;
                    }).catch(err => {
                        console.log(err,'/baseInfo/getAllCaseTypePronoun')
                        that.$msge('服务器异常，请稍后重试');
                        that=null;
                    })
        },
        //获取法院各部门信息
        getDepartmentByCourt({state,commit},that){
            return that.$http.post('/baseInfo/getDepartmentByCourt',{

            }).then(data => {
                if (data.code === 200) {
                    let list=data.data;
                    list.unshift({departmentId:'1',departmentName: "全部"})
                    commit('setdepartment',list)
                } else {
                    that.$msgw(data.message);
                }
                that=null;
            }).catch(err => {
                console.log(err,'/baseInfo/getDepartmentByCourt')
                that.$msge('服务器异常，请稍后重试');
                that=null;
            })
        },
        //获取法院各人员信息
        getUserByCourt({state,commit},that){
            return that.$http.post('/baseInfo/getUserByCourt',{

            }).then(data => {
                if (data.code === 200) {
                    let list=data.data;
                    list.unshift({userId:'01',userName: "全部"})
                    commit('setpersoninfo',list)
                } else {
                    that.$msgw(data.message);
                }
                that=null;
            }).catch(err => {
                console.log(err,'/baseInfo/getUserByCourt')
                that.$msge('服务器异常，请稍后重试');
                that=null;
            })
        },
        //获取开庭地点，法庭信息
        getCourtRooms({state,commit},that) {
            that.$http
                .post("/baseInfo/getCourtRooms", {})
                .then(data => {
                    if (data.code === 200) {
                        let list = data.data;
                        list.unshift({courtRoomId: "01", courtRoomName: "全部" });
                        commit("setcourtRoomaddress",list);
                    } else {
                        that.$msgw(data.message);
                    }
                    that=null;
                })
                .catch(err => {
                    console.log(err, "/baseInfo/getCourtRooms");
                    that.$msge("服务器异常，请稍后重试");
                    that=null;
                });
        },
    }
}
export default module;