import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

import suitlaw from './store_suitlaw'
import caselaw from './store_caselaw'
import casetab from './store_casetab'
const store = new vuex.Store({
  state:{
    caseidlist:'',//存放相关案列案由id
    httpurl:'/cms/nosecure/getCaseListWebPage.action',//查询相关案列列表
    keyword:'',//搜索关键词
    Startdate:'',//日期开始时间
    Enddate:'',//日期结束时间
    CourtName:'',//法院名称
  },
  mutations:{
    setcaseidlist(state,data) {
      state.caseidlist=data;
    },
    sethttpurl(state,data){
      state.httpurl = data
    },
    setkeyword(state,data) {
      state.keyword=data;
    },
    setStartdate(state,data) {
      state.Startdate=data;
    },
    setEnddate(state,data) {
      state.caseidlist=data;
    },
    setCourtName(state,data) {
      state.CourtName=data;
    }
  },
  modules:{
    suitlaw: suitlaw,
    caselaw:caselaw,
    casetab:casetab
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
