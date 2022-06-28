import Vue from 'vue'
import Router from 'vue-router'

import newSubmitEvidence from '../pages/show'
Vue.use(Router)

let home_routes = [
  {
    path: '/newSubmitEvidence',
    component: newSubmitEvidence
  }
]

const router = new Router({
  routes: home_routes
});

export default router;