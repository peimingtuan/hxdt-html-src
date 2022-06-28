import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

import CaseMangement from './store_CaseMangement'
const store = new vuex.Store({
  state:{
    selectlist:[{id:true,name:'是'},{id:false,name:'否'}],//selectlist
  },
  mutations:{

  },
  modules:{
    CaseMangement:CaseMangement,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
