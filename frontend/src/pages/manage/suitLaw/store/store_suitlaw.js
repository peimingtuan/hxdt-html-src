const module = {
    namespaced: true,
    state:{
        CaseCauseID:'',//案由id
        CaseTypeID:'',//案件类别
        active:'2-1',
        name:'法律',
        type:1,//类别
        //左侧菜单栏数据配置
        datalist:[
            {
                title: '实体法律依据',
                list: [
                    {
                        id: '2-1',
                        name: '法律'
                    },
                    {
                        id: '2-2',
                        name: '行政法规'
                    },
                    {
                        id: '2-3',
                        name: '司法解释'
                    }, {
                        id: '2-4',
                        name: '国务院部门规章'
                    },
                    {
                        id: '2-5',
                        name: '地方性法规'
                    }
                ]
            },
            {
                title:'程序法律依据',
                list: [
                    {
                        id: '1-1',
                        name: '法律'
                    }, {
                        id: '1-2',
                        name: '行政法规'
                    },
                    {
                        id: '1-3',
                        name: '司法解释'
                    }
                ]
            }
        ],
        //法律内容假数据
        textlist:[],
    },
    mutations:{
        changestate (state,data) {
            state.active=data;
        },
        changename (state,data) {
            state.name=data;
        },
        changetype (state,data) {
            state.type=data;
        },
        changetext (state,data) {
            state.textlist=data;
        },
    },
    actions:{
        //根据案由和法规类型返回法规列表接口
        gethttp({state,commit},that){
            let {type,name,textlist} = state
            //接口请求
            that.$http.post('/getRelevantCase', {
                caseCauseId:that.$route.query.caseCauseId || '1492',//案由id
                caseTypeId:that.$route.query.caseTypeId || 'CT1508061134410046',//案件类别id
                type,//实体程序法(0实体1程序）
                hwtype:name,//法规类别
                pagesize:10,//每页条数
                pageindex:that.pageindex //当前页数
            }).then(data => {
                that.load=false;
                that.loadingmore=false;
                    if (data.Code == 1) {
                        if(data.Result.length===0){
                            commit('changetext',[])//法规名称列表
                        }else{
                            if(data.Result[0].lawprov.length!=0){//根据接口目前返回字段判断
                                if(textlist.length!=0){
                                    commit('changetext',textlist.concat(data.Result))//法规名称列表
                                }else{
                                    commit('changetext',data.Result)//法规名称列表
                                }
                            }else{
                                let data=[]
                                commit('changetext',data)//法规名称列表
                            }
                        }
                } else {
                    that.$msgw(data.Message);
                }
            }).catch(err => {
                that.load=false;
                that.loadingmore=false;
                console.log(err,'/getRelevantCase')
                //that.$msge('服务器异常，请稍后重试');
            })
        },
    }
}
export default module;