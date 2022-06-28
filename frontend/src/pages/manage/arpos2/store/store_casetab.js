const module = {
    namespaced: true,
    state:{
        //筛选条件
        filter:[
            {
                id:1,
                name:"本人(0)"
            },
            {
                id:2,
                name:"最高院(100)"
            },
            {
                id:3,
                name:"其他省市法院(1000)"
            }
        ],
        //法律内容
        textlist:[
            {
                caseid:1,//案件id
                casename:'第一百九十条',//案件名称
                refereecourt:'河北高级人民法院',//审理法院
                date:'2019-01-30',//审理日期
                state:"裁定",//案件类型
                wordno:"（2019）皖10刑终8号" //案号
            },
            {
                caseid:2,//案件id
                casename:'第二百九十条',//案件名称
                refereecourt:'河北高级人民法院',//审理法院
                date:'2019-01-30',//审理日期
                state:"裁定",//案件类型
                wordno:"（2019）皖10刑终8号" //案号
            }
        ],
        checkfilter:1,//是否被选中
        typetab:'',//第一层筛选
        typefilter:'',//第二层筛选
        //分页
        total:100,//总条数
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

    }
}
export default module;