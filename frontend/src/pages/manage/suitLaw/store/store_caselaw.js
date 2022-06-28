const module = {
    namespaced: true,
    state:{
        //左侧树形假数据
        causelist: [],
        activeName:'first',//右侧点亮的tab标签
    },
    mutations:{
        changetree (state,data) {
            state.causelist=data;
        },
        changestate (state,data) {
            state.activeName=data;
        },
    },
    actions:{

    }
}
export default module;