import Vue from 'vue'
import Router from 'vue-router'

import chat from '../pages/chat'
Vue.use(Router)

let home_routes = [
  {
    path: '/chat',
    component: chat
  },
]

const router = new Router({
  routes: home_routes
});

export default router;