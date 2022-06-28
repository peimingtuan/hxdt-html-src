import Vue from 'vue'
import Router from 'vue-router'
import homeRotation from '../pages/homeRotation' //轮播图首页

Vue.use(Router)

let home_routes = [{
        path: '/homeRotation',
        component: homeRotation
    }
]


const router = new Router({
    routes: home_routes
});

export default router;