import Vue from 'vue'
import Router from 'vue-router'
import suitlaw from '../pages/suitlaw' //适用法条
import searchlaw from '../pages/searchlaw'//法条搜索结果
import caselaw from '../pages/caselaw' //相关案列
import casetext from '../pages/casetext' //案列文本
import test from '../pages/test' //案列文本
import testvideo from '../pages/testvideo' //测试视频
Vue.use(Router)

let home_routes = [
  {
    path: '/suitlaw',
    component: suitlaw,
    meta:{
      keepAlive:true
    }
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
  {
    path: '/test',
    component: test
  },
  {
    path: '/testvideo',
    component: testvideo
  },
]

const router = new Router({
  routes: home_routes,
  // scrollBehavior(to,from,position){
  //   // if (position) {
  //   //   return position
  //   // } else {
  //   //   if (from.meta.keepAlive) {
  //   //     from.meta.position = document.body.scrollTop;
  //   //   }
  //   //   return { x: 0, y: to.meta.position ||0}
  //   // }
  //   if(position===null){//进入页面
  //     console.log('enter')
  //   }else{
  //     console.log('back')
  //     //from.meta.destoryed = true
  //     return position
  //   }
  // }
});

export default router;