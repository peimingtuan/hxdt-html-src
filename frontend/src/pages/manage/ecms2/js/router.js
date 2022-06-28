import Vue from 'vue'
import Router from 'vue-router'
import Serversupervision from '../pages/Serversupervision' //测试页面 服务器监管
import StorageMigration from '../pages/StorageMigration' //存储迁移管理
import CaseManagement from '../pages/CaseManagement' //案件管理
// import SchedulingManagement from '../pages/SchedulingManagement' //排期管理
import CaseInformation from '../pages/CaseInformation' //案件信息管理
import OverdueScheduling  from '../pages/OverdueScheduling' //过期信息管理
import RecycleBin  from '../pages/RecycleBin' //回收站管理

import Testcase from '../pages/Testcase' //案件系统测试管理
import DepartmentManagement  from '../pages/DepartmentManagement' //部门管理
import PositionManagement from '../pages/PositionManagement' //职务管理
import Roleprivilege from '../pages/Roleprivilege' //角色-权限管理
import LogManagement   from '../pages/LogManagement' //日志管理
import UserManagement  from '../pages/UserManagement' //用户管理
import login  from '../pages/login' //修改密码页面



Vue.use(Router)

let home_routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/StorageMigration',
    component: StorageMigration
  },
  {
    path: '/Serversupervision',
    component: Serversupervision
  },
  {
    path: '/CaseManagement',
    component: CaseManagement
  },
  {
    path: '/CaseInformation',
    component: CaseInformation
  },
  {
    path: '/OverdueScheduling',
    component: OverdueScheduling
  },
  {
    path: '/RecycleBin',
    component: RecycleBin
  },

  {
    path: '/Testcase',
    component: Testcase
  },
  {
    path: '/DepartmentManagement',
    component: DepartmentManagement
  },
  {
    path: '/PositionManagement',
    component: PositionManagement
  },
  {
    path: '/Roleprivilege',
    component: Roleprivilege
  },
  {
    path: '/UserManagement',
    component: UserManagement
  },
  {
    path: '/LogManagement',
    component: LogManagement
  },
]

const router = new Router({
  routes: home_routes
});

export default router;
