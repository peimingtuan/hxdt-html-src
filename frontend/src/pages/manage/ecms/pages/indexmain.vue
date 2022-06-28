<template>
    <!-- 主容纳页 -->
    <div class="indexmain">
        <!-- 头部 -->
        <div class="index-title">
            <div class="loge">
                <img src="../images/courtsupervision/mainlogo.png"/>
            </div>
            <div class="user-info">
                <!--<div class="user-img">-->
                    <!--<img src="../images/courtsupervision/user.png" />-->
                <!--</div>-->
                <div class="user">
                    <div>
                        当前用户：{{userLoginName}}
                    </div>
                    <div>
                        <span>|</span>
                        <el-dropdown @command="selectlaw">
                              <span class="el-dropdown-link">
                                <img src="../images/chocielaw.png" />
                                {{choicecourt}}
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in lawlist" @click.native="handleSelect(item.courtName)" :key="item.courtCode"  :command=item.courtCode>{{item.courtName}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                        <!--<img src="../images/courtsupervision/gyu.png" />-->
                        <!--选择法院-->
                    </div>
                    <div @click="changePassword">
                        <span>|</span>
                        <img src="../images/courtsupervision/pasword2.png" />
                        修改密码
                    </div>
                    <div @click="about">
                        <span>|</span>
                        <img src="../images/courtsupervision/gyu.png" />
                        关于
                    </div>
                    <div @click="outtologin">
                        <span>|</span>
                        <img src="../images/courtsupervision/out.png" />
                        退出
                    </div>
                </div>
            </div>
        </div>
        <div class="index-main">
            <!-- 左侧路由 -->
            <div class="left-router">
                <el-menu
                        :default-active=activeid
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="selectmenu"
                        :unique-opened="true"
                        background-color="#002062"
                        text-color="#fff"
                        :router="true"
                        active-text-color="#06E4FD">
                    <div v-for="list in menuList">
                        <div v-if="list.child">
                            <el-submenu :index="list.id" :key="list.id">
                                <template slot="title">
                                    <img :src="list.imgUrl" />
                                    <span>{{list.name}}</span>
                                </template>
                                <el-menu-item v-for="item in list.child" :key="item.id" :index="item.id" :route="item.url">
                                    <img v-if="activeid==item.id" :src="item.imgUrl2" />
                                    <img v-else :src="item.imgUrl" />
                                    {{item.name}}
                                </el-menu-item>
                            </el-submenu>
                        </div>
                        <div v-else>
                            <el-menu-item :index="list.id" :key="list.id" :route="list.url">
                                <img :src="list.imgUrl" />
                                <span slot="title">{{list.name}}</span>
                            </el-menu-item>
                        </div>
                    </div>
                </el-menu>
            </div>
            <!-- 路由跳转 -->
            <div class="index-routerView">
                <!--<router-view :key="activeDate"></router-view>-->
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" :key="activeDate"></router-view>
            </div>
        </div>
        <about ref="about"/>
        <change-password
            ref="changePassword"
            />
    </div>
</template>

<script>
    import FoundationTools from '../../../../js/functionAjax'
    import about from '../component/about'
    import changePassword from '../component/changePassword'
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "indexmain",
        components:{
            about,
            changePassword
        },
        data() {
            const menuList=require('../js/leftmenu')
            return {
                userLoginName:JSON.parse(FoundationTools.getCookie('cmsuserinfo')).userName||'',
                menuList:menuList,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('indexmain',[
                "activeid",
                "lawlist",//所有法院
                "choicecourt",//当前法院
                "activeDate"
            ])
        },
        methods: {
            ...mapMutations('indexmain',[
                "changeactiveid",
                "changeactiveDate",
                "setChoicecourt",
               // "setLawlist"
            ]),
            //选择法院
            selectlaw(data){
                FoundationTools.setCookie('hx-lawcourtcode',data,15)//存储法院代字
                sessionStorage.setItem('hx-lawcourtcode',data)
                //重新渲染当前页面
                const r=this.$route.path;
                if(r==='/indexmain/musicvideoment' || r==='/indexmain/CaseInformation' || r==='/indexmain/CaseManagement'){
                    this.$store.commit('setrouteInfo',{code:data,name:r})
                }
                this.changeactiveDate(new Date().getTime())
            },
            handleSelect(name){
                this.setChoicecourt(name)//法院名称
                FoundationTools.setCookie('peicourtName',name,15)//存储法院名称
            },
            //左侧菜单栏
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            //当前活跃项
            selectmenu(key, keyPath){
                this.changeactiveid(key);
            },
            changePassword(){
                this.$refs.changePassword.isShow=true;
                this.$refs.changePassword.show();
            },
            about(){
                this.$refs.about.isShow=true;
                this.$refs.about.getAboutInfo();
            },
            //退出登录
            outtologin(){
                FoundationTools.delCookie("cmsuserinfo");//清除用户信息cookie
                sessionStorage.removeItem('hx-lawcourtcode');//清除所选法院信息
                this.$router.push({
                    path:'/login',
                    query:{
                        //newDate:new Date().getTime()
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .indexmain{
        .wh(19.2rem,100vh);
        .index-title{
            height:7vh;
            overflow: hidden;
            .fb();
            .loge{
                .wh(2.6rem,100%);
                padding:0 .42rem 0 .1rem;
                position:relative;
                img{
                    width:2.08rem;
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                }
            }
            .user-info{
                .wh(10rem,100%);
                padding-right:.3rem;
                .fr();
                .user-img{
                    .wh(.5rem,100%);
                    position:relative;
                    img{
                        width:.32rem;
                        position: absolute;
                        top:50%;
                        left:50%;
                        transform: translate(-50%,-50%);
                    }
                }
                .user{
                    .fr();
                    padding:2vh 0;
                    &>div{
                        cursor: pointer;
                        line-height:3vh;
                        .f18();
                        color:#fff;
                        img{
                            width:.15rem;
                            margin-right:.05rem;
                        }
                        span{
                            margin:0 .1rem;
                            color:#fff;
                            .f18();
                        }
                    }
                }
            }
        }
        .index-main{
            .wh(19.2rem,93vh);
            overflow: hidden;
            .fb();
            .left-router{
                .wh(2.6rem,93vh);
                overflow: auto;
                /*element-ui左侧菜单*/
                .el-menu{
                    width:2.6rem;
                    border-right:none;
                    overflow: hidden;
                    span{
                        color:#fff;
                    }
                    &>div{
                        margin-bottom:.1rem;
                        /*没有子集的*/
                        &>div>li.el-menu-item{
                            background:#1f3b75!important;
                            .wh(2.6rem,.46rem);
                            padding:0 .1rem!important;
                            line-height:.46rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            img{
                                width:.2rem;
                                margin-right:.05rem;
                            }
                            span{
                                .f20();
                            }
                        }
                        &>div>li.is-active{
                            background:#1296db!important;
                        }
                        /*有子集的*/
                        &>div>li.el-submenu{
                            img{
                                width:.2rem;
                                margin-right:.05rem;
                            }
                            li.el-menu-item img{
                                position:relative;
                                top:-.02rem;
                            }
                             &>div.el-submenu__title{
                                 background:#1f3b75!important;
                                 .wh(2.6rem,.46rem);
                                 padding:0 .1rem!important;
                                 line-height:.46rem!important;
                                 overflow: hidden;
                                 text-overflow: ellipsis;
                                 white-space: nowrap;
                                 /*字体大小*/
                                 span{
                                     .f20();
                                 }
                                 /*旋转图标*/
                                 .el-submenu__icon-arrow{
                                     .f20();
                                     right:.08rem;
                                     margin-top:-.08rem;
                                 }
                             }
                             li:first-of-type{
                                 margin-top:.1rem;
                             }
                             li{
                                .f20();
                                 height:.46rem;
                                 line-height:.46rem!important;
                                 padding:0 .1rem 0 .4rem!important;
                            }
                        }
                    }
                }
            }
            .index-routerView{
                position:relative;
                .wh(16.6rem,93vh);
                background:#f9f9f9 ;
                overflow: auto;
            }
        }
    }
    //选择法院下拉选
    .el-dropdown-menu{
        max-height:5rem;
        overflow:auto;
    }
</style>