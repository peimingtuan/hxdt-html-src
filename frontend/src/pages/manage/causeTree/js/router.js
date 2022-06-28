import Vue from 'vue'
import Router from 'vue-router'
import causetree from '../pages/causetree' //中转页面
Vue.use(Router)

let home_routes = [
  {
    path: '/causetree',
    component: causetree
  },
]

const router = new Router({
  routes: home_routes
});

export default router;