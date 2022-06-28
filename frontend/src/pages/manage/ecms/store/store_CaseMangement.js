const module = {
    namespaced: true,
    state:{
        courtUnitPronounlist:[],
        caseTypePronounlist:[],
        departmentIdlist:[],
        ftlist:[],
        userList:[],
    },
    getters:{
        pop_ftlist(state){
            let arr=[];
            if(state.ftlist.length>0){
                state.ftlist.map(item=>{
                    arr.push(item)
                })
                arr.shift()
            }
            return arr
        },
    },
    mutations:{
        setcourtUnitPronounlist(state,data){
            state.courtUnitPronounlist=data;
        },
        setcaseTypePronounlist(state,data){
            state.caseTypePronounlist=data;
        },
        setdepartmentIdlist(state,data){
            state.departmentIdlist=data;
        },
        setftlist(state,data){
            state.ftlist=data;
        },
        setuserList(state,data){
            state.userList=data;
        },
    },
    actions:{
        // 获取所有法院代字
        getAllcourtPronoun({commit},that){
            return that.$http.post('/baseInfo/getAllcourtPronoun', {}).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        res.data.unshift({
                            "courtPronoun":"全部",
                            "courtCode":"全部"
                        })
                        commit('setcourtUnitPronounlist',res.data)
                    },0)
                } else {
                    that.$msgw(res.message);
                }
                that=null;//销毁
            }).catch(err => {
                console.log(err,'/baseInfo/getAllcourtPronoun')
                that.$msge('服务器异常，请稍后重试');
                that=null;//销毁
            })
        },
        // 获取所有案件类型代字
        getCaseTypePronoun({commit},that){
            return that.$http.post('/baseInfo/getCaseTypePronoun',{}).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        res.data.unshift({
                            "caseTypePronoun":"全部",
                            "caseTypeId":"全部"
                        })
                        commit('setcaseTypePronounlist',res.data)
                    },0)
                } else {
                    that.$msgw(res.message);
                }
                that=null;//销毁
            }).catch(err => {
                console.log(err,'/baseInfo/getCaseTypePronoun')
                that.$msge('服务器异常，请稍后重试');
                that=null;//销毁
            })
        },
        // 获取法院部门
        getBusinessByCourt({commit},that){
            return that.$http.post('/baseInfo/getDepartmentByCourt', {}).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        res.data.unshift({
                            "departmentName":"全部",
                            "departmentId":"全部"
                        })
                        commit('setdepartmentIdlist',res.data)
                    },0)
                } else {
                    that.$msgw(res.message);
                }
                that=null;//销毁
            }).catch(err => {
                console.log(err,'/baseInfo/getDepartmentByCourt')
                that.$msge('服务器异常，请稍后重试');
                that=null;//销毁
            })
        },
        //法庭
        getCourtRooms({commit},that){
            return  that.$http.post('/baseInfo/getCourtRooms',{}).then(data =>{
                if(data.code==200){
                    data.data.unshift({
                        "courtRoomName":"全部",
                        "courtRoomId":"全部"
                    })
                    commit('setftlist',data.data)
                }else{
                    that.$msgw(data.message);
                }
                that=null;//销毁
            }).catch(err => {
                console.log(err,'/baseInfo/getCourtRooms')
                that.$msge('服务器异常，请稍后重试');
                that=null;//销毁
            })
        },
        //获取当前法院用户
        getUserByCourt({commit},that){
            return  that.$http.post('/baseInfo/getUserByCourt',{}).then(data =>{
                if(data.code==200){
                    data.data.unshift({
                        "userName":"全部",
                        "userId":"全部"
                    })
                    commit('setuserList',data.data)
                }else{
                    that.$msgw(data.message);
                }
                that=null;//销毁
            }).catch(err => {
                console.log(err,'/baseInfo/getUserByCourt')
                that.$msge('服务器异常，请稍后重试');
                that=null;//销毁
            })
        },
    }
}
export default module;