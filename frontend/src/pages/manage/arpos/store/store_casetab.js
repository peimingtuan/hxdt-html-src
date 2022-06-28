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
                name:"最高院"
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
        size:7,//每页条数
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
        changetotal (state,data) {
            state.total=data;
        },
        changesize (state,data) {
            state.size=data;
        },
        changepageindex(state,data) {
            state.pageindex=data;
        },
    },
    actions:{
        getinfo({state,commit,rootState},that){
            let { httpurl,caseidlist,keyword,Startdate,Enddate,CourtName} = rootState //根
            let {typetab,typefilter,pageindex} = state
            that.$http.post(httpurl, {
                causeId:caseidlist || that.$route.query.causeid,//案由id
                keyword,//搜索关键词
                Startdate,//日期开始时间
                Enddate,//日期结束时间
                CourtName,//法院名称
                Instrumentarea:typefilter,//本院/全省/其他省市法院|| typefilter
                Instrumentcase:typetab,//最高法指导案例/本省高院典型案例/法院裁判文书|| typetab
                sorts:1,//排序1为倒序0为正序
                pagesize:7,//每页多少条
                pageindex:pageindex //当前页数
            }).then(data => {
                that.isload=false;
                if (data.Code == 1) {
                    commit('changetotal',Number(data.Result.count))//总条数
                    if(data.Result.caselist.length!=0){
                        commit('changetextlist',data.Result.caselist)//法规名称列表
                    }else{
                        commit('changetextlist',data.Result.caselist)//法规名称列表
                        that.$msgw("没有数据");
                    }
                } else {
                    that.$msgw(data.Message);
                }
            }).catch(err => {console.log(3000)
                that.isload=false;
                that.$msge('服务器异常，请稍后重试');
            })
        }
    }
}
export default module;