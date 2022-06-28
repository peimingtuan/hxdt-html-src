import Vue from 'vue'
import Router from 'vue-router'
import loading from '../pages/loading' //中转页面
import initialize from '../pages/initialize' //主页面
import initialize2 from '../pages/initialize2'
Vue.use(Router)

let home_routes = [
  {
    path: '/',
    component: loading
  },
  {
    path: '/initialize',
    component: initialize
  },
  {
    path: '/initialize2',
    component: initialize2
  },
]

const router = new Router({
  routes: home_routes
});

export default router;