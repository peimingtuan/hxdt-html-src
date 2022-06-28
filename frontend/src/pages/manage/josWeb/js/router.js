import Vue from 'vue'
import Router from 'vue-router'
import courtOutline from '../pages/courtOutline' //庭审提纲
import arguePoint from '../pages/arguePoint' //争议焦点

Vue.use(Router)

let home_routes = [
  {
    path: '/courtOutline',
    component: courtOutline,
    meta:{
      title:'庭审提纲'
    }
  },
  {
    path: '/arguePoint',
    component: arguePoint,
    meta:{
      title:'争议焦点'
    }
  }
]

const router = new Router({
  routes: home_routes
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router;