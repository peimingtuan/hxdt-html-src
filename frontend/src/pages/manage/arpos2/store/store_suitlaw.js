const item={
    provname:"第一百九十条",
    provtext:"侵害公民身体造成侵害的，侵害公民身体造成侵害的侵害公民身体造成侵害的侵害公民身体造成侵害的。",
    provcon:"20",
    caseurl:"关联案例地址",
    fulltexturl:"法规全文地址",
}
const module = {
    namespaced: true,
    state:{
        active:'1-1',
        name:'法律',
        type:0,//类别
        //左侧菜单栏数据配置
        datalist:[
            {
                title: '实体法律依据',
                list: [
                    {
                        id: '1-1',
                        name: '法律'
                    },
                    {
                        id: '1-2',
                        name: '行政法规'
                    },
                    {
                        id: '1-3',
                        name: '司法解释'
                    }, {
                        id: '1-4',
                        name: '国务院部门规章'
                    },
                    {
                        id: '1-5',
                        name: '山东省地方性法规'
                    }
                ]
            },
            {
                title:'程序法律依据',
                list: [
                    {
                        id: '2-1',
                        name: '法律'
                    }, {
                        id: '2-2',
                        name: '行政法规'
                    },
                    {
                        id: '2-3',
                        name: '司法解释'
                    }, {
                        id: '2-4',
                        name: '国务院部门规章'
                    }
                ]
            }
        ],
        //法律内容假数据
        textlist:[
            {
                catinid:1,
                catname:'合同法',
                lawprov:Array(2).fill(item)
            },
            {
                catinid:2,
                catname:'合同法2',
                lawprov:Array(5).fill(item)
            },
        ],
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
        getapi({ commit, state},that){
            let { active } = state
            if(that.$http.overtime2(that)){
                that.$http.post('/vehicle-examine/car-order-list2',{
                    active
                }).then(data => {

                }).catch(err => {
                        that.$message({
                            message: '前往路由'+21+'。',
                            showClose: true,
                            type: 'warning'
                        });
                })
            }
            // let successback= (data) => {
            //
            // }
            // let errback= (err) => {
            //     console.log(err)
            //     that.$message({
            //         message: '前往路由'+2+'。',
            //         showClose: true,
            //         type: 'warning'
            //     });
            // }
            // that.$http.overtime('/vehicle-examine/car-order-list2',{
            //     active
            // },successback,errback)
        }
    }
}
export default module;