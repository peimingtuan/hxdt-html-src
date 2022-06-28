const module = {
    namespaced: true,
    state:{
        //左侧树形假数据
        causelist: [{
            //causeTypeId:'2',//（2为标准案由，3为案由下级主题）
            // causeid:1,
            // causename: '一级 1',
            // parentid2: [{
            //     causeid:2,
            //     causename: '二级 1-1',
            //     parentid2: [{
            //         causeid:3,
            //         causename: '三级 1-1-1'
            //     },{
            //         causeid:4,
            //         causename: '三级 1-1-2'
            //     }]
            // },
            //     {
            //         causeid:5,
            //         causename: '二级1-2',
            //     }]
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
        //返回案由树,暂时弃用
        getcasetree({state,commit},that){
            that.$http.post('/cms/nosecure/getCasecauseTreeWebPage.action', {
                causeid:that.$route.query.causeid || '1492',//案由id,
            }).then(data => {
                if (data.code == 1) {
                    console.log(data.result)
                    if(data.result.length!==0){
                        data.result.map((item)=>{

                        })
                    }
                    //commit('changetree',list)//法规名称列表
                } else {
                    that.$msgw(data.message);
                }
            }).catch(err => {
                that.$msge('服务器异常，请稍后重试');
            })
        },
    }
}
export default module;