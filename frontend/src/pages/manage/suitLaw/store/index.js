import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

import suitlaw from './store_suitlaw'
import casetab from './store_casetab'
import caselaw from './store_caselaw'
const store = new vuex.Store({
  state:{
    caseidlist:'',//存放相关案列案由id
    httpurl:'/getCaseListWebPage',//查询相关案列列表
    keyword:'',//搜索关键词
    startdate:'',//日期开始时间
    enddate:'',//日期结束时间
    courtName:'',//法院名称
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
      state.startdate=data;
    },
    setEnddate(state,data) {
      state.enddate=data;
    },
    setCourtName(state,data) {
      state.courtName=data;
    }
  },
  modules:{
    suitlaw: suitlaw,
    casetab:casetab,
    caselaw:caselaw
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
