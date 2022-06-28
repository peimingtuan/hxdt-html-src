import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

const store = new vuex.Store({
  state:{
    selectlist:[{id:0,name:'是'},{id:1,name:'否'}],//selectlist
  },
  modules:{

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
