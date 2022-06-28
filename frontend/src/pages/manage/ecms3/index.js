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
import Loading from './component/loading/index.js'
import * as styles  from "./component/directives"
import Loading2 from './component/loading2'
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.use(Msg);
Vue.use(Loading);
Vue.use(styles.fontSize)
Vue.use(styles.fontColor)
Vue.use(styles.moveXY)
Vue.use(Loading2)
new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})








