import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

import suitlaw from './store_suitlaw'
import caselaw from './store_caselaw'
import casetab from './store_casetab'
const store = new vuex.Store({
  state:{
    mobile:''
  },
  mutations:{
    setMobile(state,data){
      state.mobile = data
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
