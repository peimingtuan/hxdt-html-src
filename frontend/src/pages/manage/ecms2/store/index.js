import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

const store = new vuex.Store({
  modules:{

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
