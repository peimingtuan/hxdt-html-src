import Vue from 'vue'
import Router from 'vue-router'
import suitlaw from '../pages/suitlaw' //适用法条
import caselaw from '../pages/caselaw' //相关案例
import casetext from '../pages/casetext'//相关案例全文

Vue.use(Router)

let home_routes = [
  {
    path: '/suitlaw',
    component: suitlaw
  },
  {
    path: '/caselaw',
    component: caselaw,
  },
  {
    path: '/casetext',
    component: casetext
  },
]

const router = new Router({
  routes: home_routes
});

export default router;