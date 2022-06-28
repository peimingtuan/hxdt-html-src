import Vue from 'vue'
import Router from 'vue-router'
//const CaseManagement=()=> import('../pages/CaseManagement')//案件管理
import CaseInformation from '../pages/CaseInformation' //案件信息管理




Vue.use(Router)

let home_routes = [
  {
    path: '/CaseManagement',
    name:'CaseManagement',
    component: resolve=>require(['../pages/CaseManagement'],resolve)
  },
  {
    path: '/CaseInformation/:id/:names',
    name:'CaseInformation',
    component: CaseInformation
  },
  {
    path:'/test',
    name:'test',
    component:resolve=>require(['../pages/test'],resolve)
  }
]

const router = new Router({
  routes: home_routes
});
router.beforeEach((to,from,next)=>{
  console.log(100,to,from,next)
  if(to.name==='CaseInformation'){
    //next({path:'/login'})
    next()
  }else{
    next()
  }

})
router.afterEach((to,from)=>{
  console.log(500,to,from)
})
export default router;
