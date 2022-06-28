import Vue from 'vue'
import Router from 'vue-router'
const login=()=>import('../pages/login') //登录
const indexmain=()=>import('../pages/indexmain') //主页面
//右侧路由子页面
const courtmanagement=()=>import('../pages/courtmanagement') //法庭管理
const Serversupervision=()=>import('../../ecms2/pages/Serversupervision') //服务器管理
const musicvideoment=()=>import('../pages/musicvideoment') //庭审音视频管理
//应用配置
const courtyardallocation=()=>import('../pages/courtyardallocation') //庭室配置
const remoteconfig=()=>import('../pages/remoteconfig') //远程庭审相关配置
const media=()=>import('../pages/media') //流媒体服务器配置
const platform=()=>import('../pages/platform') //平台配置
const outerring=()=>import('../pages/outerring')//法庭外围系统配置
const assist=()=>import('../pages/assist')//法庭辅助服务器配置
const basicdata=()=>import('../pages/basicdata')//法庭辅助服务器配置
const trialbusiness=()=>import('../pages/trialbusiness')//审理业务配置
const otherconfig=()=>import('../pages/otherconfig')//其他配置
const versionUpgrade=()=>import('../pages/versionUpgrade')//版本升级管理
const systemConfig=()=>import('../pages/systemConfig')//系统配置界面
//案件管理
const CaseInformation=()=>import('../../ecms2/pages/CaseInformation') //案件信息管理
const CaseManagement=()=>import('../../ecms2/pages/CaseManagement') //排期管理
const RecycleBin=()=>import('../../ecms2/pages/RecycleBin') //回收站
const OverdueScheduling=()=>import('../../ecms2/pages/OverdueScheduling') //过期排期管理
//系统管理
const DepartmentManagement=()=>import('../../ecms2/pages/DepartmentManagement') //部门管理
const PositionManagement=()=>import('../../ecms2/pages/PositionManagement') //职务管理
const Roleprivilege=()=>import('../../ecms2/pages/Roleprivilege') //角色-权限管理
const UserManagement=()=>import('../../ecms2/pages/UserManagement') //用户管理
//import LogManagement from '../../ecms2/pages/LogManagement' //日志管理
//import Testcase from '../../ecms2/pages/Testcase' //测试案件管理
//法警报警记录管理
const bailiffAlarm=()=>import('../pages/bailiffAlarm')
const interNetConfig=()=>import('../pages/interNetConfig')

Vue.use(Router)

let home_routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/indexmain',
    component: indexmain,
    children: [
      {
        path: '/indexmain/courtmanagement',
        component: courtmanagement
      },
      {
        path: '/indexmain/Serversupervision',
        component: Serversupervision
      },
      {
        path: '/indexmain/musicvideoment',
        component: musicvideoment,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/indexmain/courtyardallocation',
        component: courtyardallocation
      },
      {
        path: '/indexmain/remoteconfig',
        component: remoteconfig
      },
      {
        path: '/indexmain/media',
        component: media
      },
      {
        path: '/indexmain/platform',
        component: platform
      },
      {
        path: '/indexmain/outerring',
        component: outerring
      },
      {
        path: '/indexmain/assist',
        component: assist
      },
      {
        path: '/indexmain/basicdata',
        component: basicdata
      },
      {
        path: '/indexmain/trialbusiness',
        component: trialbusiness
      },
      {
        path: '/indexmain/otherconfig',
        component: otherconfig
      },
      {
        path: '/indexmain/CaseInformation',
        component: CaseInformation,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/indexmain/CaseManagement',
        component: CaseManagement,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/indexmain/RecycleBin',
        component: RecycleBin
      },
      {
        path: '/indexmain/OverdueScheduling',
        component: OverdueScheduling
      },
      {
        path: '/indexmain/DepartmentManagement',
        component: DepartmentManagement
      },
      {
        path: '/indexmain/PositionManagement',
        component: PositionManagement
      },
      {
        path: '/indexmain/Roleprivilege',
        component: Roleprivilege
      },
      {
        path: '/indexmain/UserManagement',
        component: UserManagement
      },
      {
        path: '/indexmain/bailiffAlarm',
        component: bailiffAlarm
      },
      // {
      //   path: '/indexmain/LogManagement',
      //   component: LogManagement
      // },
      // {
      //   path: '/indexmain/Testcase',
      //   component: Testcase
      // },
      {
        path: '/indexmain/versionUpgrade',
        component: versionUpgrade
      },
      {
        path: '/indexmain/systemConfig',
        component: systemConfig
      },
      {
        path: '/indexmain/interNetConfig',
        component: interNetConfig
      },
    ]
  }
]

const router = new Router({
  routes: home_routes
});

export default router;