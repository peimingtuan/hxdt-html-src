import FoundationTools from '../../../../js/functionAjax'
const module = {
    namespaced: true,
    state:{
        activeid:'1-1',//左侧菜单当前活跃项1-1
        lawlist:[],//法院列表
        choicecourt:'选择法院',//当前法院
        activeDate:new Date().getTime //当前时间戳
    },
    mutations:{
        changeactiveid (state,data) {
            state.activeid=data;
        },
        setLawlist(state,data){
            state.lawlist=data;
        },
        setChoicecourt(state,data){
            state.choicecourt=data;
        },
        changeactiveDate (state,data) {
            state.activeDate=data;
        },
    },
    actions:{
        //查询法院
        getCourtInfo({state,commit},that){
            let {lawlist}=state;
                return that.$http.post('/getCourtInfo',{}).then(data =>{
                        if(data.code===200){
                            if(data.data.length===0){
                                that.$msgw('暂无可选择的法院');
                            }else{
                                commit('setLawlist',data.data)
                                FoundationTools.setCookie('peilawlist',JSON.stringify(data.data),15)//存储所有法院
                                //FoundationTools.setCookie('hx-lawcourtcode',data.data[0].courtCode,15)//存储法院代字
                                sessionStorage.setItem('hx-lawcourtcode',data.data[0].courtCode)
                                commit('setChoicecourt',data.data[0].courtName)
                                FoundationTools.setCookie('peicourtName',data.data[0].courtName,15)//存储法院名称
                            }
                        }else{
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'getCourtInfo')
                        that.$msge('服务器异常，请稍后重试');
                    })
        },
    }
}
export default module;