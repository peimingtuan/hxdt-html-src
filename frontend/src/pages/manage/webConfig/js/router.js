import Vue from 'vue'
import Router from 'vue-router'
import videoconfig from '../pages/videoconfig'

Vue.use(Router)

let home_routes = [
    {
        path: '/videoconfig',
        component: videoconfig
    }
]


const router = new Router({
    routes: home_routes
});

export default router;
