import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(vuex);

import indexmain from './store_indexmain'
import musicvideoment from './store_musicvideoment'
import courtyardallocation from './store_courtyardallocation'
import CaseMangement from './store_CaseMangement'
import media from './store_media'
import partyinfo from './store_partyinfo'
import remote from './store_remote'
const store = new vuex.Store({
  state:{
    selectlist:[{id:true,name:'是'},{id:false,name:'否'}],//selectlist
    routeInfo:{
      code:'',
      name:''
    },
    playXmls:''
  },
  mutations:{
    setrouteInfo(state,data){
      state.routeInfo= data;
    },
    setplayXmls(state,data){
      state.playXmls = data;
    },
  },
  modules:{
    indexmain: indexmain,
    musicvideoment:musicvideoment,
    media:media,
    courtyardallocation:courtyardallocation,
    CaseMangement:CaseMangement,
    partyinfo:partyinfo,
    remote:remote,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
export default store;
