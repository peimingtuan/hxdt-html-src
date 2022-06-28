import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);
const store = new vuex.Store({
  state:{
    playXmls:''
  },
  mutations:{
    setplayXmls(state,data){
      state.playXmls = data;
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
