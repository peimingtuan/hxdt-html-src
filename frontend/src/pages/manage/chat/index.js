import "babel-polyfill"
import Vue from 'vue'
import http from "./js/http" //http请求
import store from './store';
import router from './js/router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Msg from './component/msg/index.js'
import Loading from './component/loading/index.js'
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(Msg);
Vue.use(Loading);
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})








