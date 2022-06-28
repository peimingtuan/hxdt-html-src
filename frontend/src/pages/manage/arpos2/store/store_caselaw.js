const module = {
    namespaced: true,
    state:{
        //左侧树形假数据
        causelist: [{
            causeid:1,
            causename: '一级 1',
            parentid: [{
                causeid:2,
                causename: '二级 1-1',
                parentid: [{
                    causeid:3,
                    causename: '三级 1-1-1'
                },{
                    causeid:4,
                    causename: '三级 1-1-2'
                }]
            },
                {
                    causeid:5,
                    causename: '二级1-2',
                }]
        }],
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