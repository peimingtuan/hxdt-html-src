const module = {
    namespaced: true,
    state:{
        //筛选条件
        filter:[
            {
                id:1,
                name:"本院"
            },
            {
                id:2,
                name:"全省"
            },
            {
                id:3,
                name:"其他省市法院"
            }
        ],
        //法律内容
        textlist:[

        ],
        checkfilter:1,//是否被选中
        typetab:'最高院指导案列',//第一层筛选
        typefilter:'本院',//第二层筛选
        //分页
        total:0,//总条数
        size:10,//每页条数
        pageindex:1,//当前页码
    },
    mutations:{
        changefilter (state,data) {
            state.checkfilter=data;
        },
        changetextlist (state,data) {
            state.textlist=data;
        },
        changecheckfilter (state,data) {
            state.checkfilter=data;
        },
        changetypetab (state,data) {
            state.typetab=data;
        },
        changetypefilter (state,data) {
            state.typefilter=data;
        },
        changesize (state,data) {
            state.size=data;
        },
        changepageindex(state,data) {
            state.pageindex=data;
        },
        changetotal(state,data) {
            state.total=data;
        },
    },
    actions:{
        getinfo({state,commit,rootState},that){
            let { httpurl,caseidlist,keyword,startdate,enddate,courtName} = rootState //根
            let {typetab,typefilter,pageindex} = state
            let param={
                causeId:caseidlist || that.$route.query.causeId || 2199,//案由id
                keyword,//搜索关键词
                startdate,//日期开始时间
                enddate,//日期结束时间
                courtName,//法院名称
                instrumentarea:typefilter,//本院/全省/其他省市法院|| typefilter
                instrumentcase:typetab,//最高法指导案例/本省高院典型案例/法院裁判文书|| typetab
                sorts:1,//排序1为倒序0为正序
                pagesize:10,//每页多少条
                pageindex:pageindex //当前页数
            }
            if(httpurl=='/getCaseListWebPage'){
                param.courtName=that.$route.query.courtName//法院名称
                delete param.keyword;
                delete param.startdate;
                delete param.enddate;
            }
            that.$http.post(httpurl, param).then(data => {
                that.isload=false;
                if (data.code == 1) {
                    commit('changetotal',Number(data.result.count))//总条数
                    if(data.result.caselist.length!=0){
                        commit('changetextlist',data.result.caselist)//法规名称列表
                    }else{
                        commit('changetextlist',data.result.caselist)//法规名称列表
                        //that.$msgw("没有数据");
                    }
                } else {
                    that.$msgw(data.message);
                }
            }).catch(err => {
                that.isload=false;
                that.$msge('服务器异常，请稍后重试');
            })
        }
    }
}
export default module;