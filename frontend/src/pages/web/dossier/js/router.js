import Vue from 'vue'
import Router from 'vue-router'

import show from '../pages/show'
Vue.use(Router)

let home_routes = [
  {
    path: '/show',
    component: show
  }
]

const router = new Router({
  routes: home_routes
});

export default router;