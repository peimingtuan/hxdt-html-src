import "babel-polyfill"
import Vue from 'vue'
import './js/rem'
import './css/public.less' //公共样式
import http from "./js/http" //http请求
import store from './store';
import router from './js/router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Msg from './component/msg/index.js'
require('../../../component/vconsole')
Vue.config.devtools = true;
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(Msg);
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})








