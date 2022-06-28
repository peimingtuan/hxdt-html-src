import Vue from 'vue'
import Router from 'vue-router'
import suitlaw from '../pages/suitlaw' //适用法条
import searchlaw from '../pages/searchlaw'//法条搜索结果
import caselaw from '../pages/caselaw' //相关案列
import casetext from '../pages/casetext' //案列文本

Vue.use(Router)

let home_routes = [
  {
    path: '/suitlaw',
    component: suitlaw
  },
  {
    path: '/searchlaw',
    component: searchlaw
  },
  {
    path: '/caselaw',
    component: caselaw
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