import "babel-polyfill"
import Vue from 'vue'
import './css/public.less' //公共样式
import './css/scrollBar.css'
import http from "./js/http" //http请求
import store from './store';
import router from './js/router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
//import {Indicator}  from 'mint-ui'
import Msg from './component/msg/index.js'
import Loading from './component/loading/index.js'
//Vue.config.devtools = true;
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(Msg);
Vue.use(Loading);
//Vue.use(Indicator)
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})








