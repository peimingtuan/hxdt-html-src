<template>
    <div class="login">
        <div class="main">
            <div class="title-img">
                <img src="../images/login/login.png" />
            </div>
            <div class="content">
                <div class="title">
                    <div class="b-z none" @click="helper">
                        <img src="../images/login/help.png" />
                        帮助<span>BANGZHU</span>
                    </div>
                    <div class="x-i" @click="downClient">
                        软件下载
                    </div>
                </div>
                <div class="info">
                    <div class="name">
                        <input class="input" type="text" v-model.trim="nametext" placeholder="用户名"/>
                        <img src="../images/login/name.png" />
                        <!--<div class="err" v-if="namemsg!=''">{{namemsg}}</div>-->
                    </div>
                    <div class="pasword">
                        <input v-if="isplay" class="input" type="text" v-model.trim="passward" placeholder="密码"/>
                        <input v-else="!isplay" class="input" type="password" v-model.trim="passward" placeholder="密码"/>
                        <img class="le" src="../images/login/passward.png" />
                        <div class="ri" @click="isplay=!isplay">
                            <img v-show="isplay" src="../images/login/openey.png" />
                            <img v-show="!isplay" src="../images/login/closeey.png" />
                        </div>
                        <!--<div class="err" v-if="paswardmsg!=''">{{paswardmsg}}</div>-->
                    </div>
                    <el-checkbox v-model="checked" @change="changecheck">两周以内免登录</el-checkbox>
                </div>
                <div class="company">
                    技术支持<br/>
                    北京华夏电通科技股份有限公司<br/>
                    售后电话<br/>
                    4006661899<br/>
                    网址<br/>
                    www.chnsys.com.cn
                </div>
                <div class="bottom">
                    <el-button type="primary" @click="enterinto">登录</el-button>
                </div>
                <!--客户端下载弹框-->
                <div class="client" v-if="isshow">
                    <div class="ke-top">
                        <div class="bi-a">
                            <img src="../images/login/kehuduan.png" />
                            软件下载
                        </div>
                        <div class="alert-close" @click="isshow=false">
                            <img src="../images/alert-close.png" />
                        </div>
                    </div>
                    <div class="ke-con">
                        <div class="textover" v-for="(item,index) in downList" :key="index"
                             @click="downLoad(item.downloadUrl)">
                            <el-tooltip :content=item.softwareName placement="top">
                                <span>{{item.softwareId}}（{{item.softwareName}}）</span>
                            </el-tooltip>
                        </div>
                        <div class="empty" v-if="downList.length===0">
                            暂无数据
                        </div>
                    </div>
                    <div class="ke-foot">
                        <el-button type="primary" @click="isshow=false">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import FoundationTools from '../../../../js/functionAjax'
    import {Toast} from '../../../../component/LikeAlert/index'
    export default {
        name: "login",
        data() {
            return {
                isplay:false,//密码显示与隐藏
                isshow:false,//下载弹框
                nametext:'',//用户名
                passward:'',//密码
                checked:false,
                downList:[],
            }
        },
        created() {
            let lett = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                if (key == 13) {
                    lett.enterinto();
                }
            }
        },
        mounted() {
            if(FoundationTools.getCookie('cmsuserinfo')){
                let cmsuserinfo=JSON.parse(FoundationTools.getCookie('cmsuserinfo'));
                if(cmsuserinfo.ischecked){
                    this.nametext=cmsuserinfo.nametext;
                    this.passward=cmsuserinfo.passward;
                    this.checked=true;
                    this.changeactiveid('1-1');
                    this.enterinto();
                }
            }
        },
        destroyed() {
            document.onkeydown=null;//注销事件
        },
        methods: {
            ...mapMutations('indexmain',[
                "changeactiveid",
            ]),
            //check是否记住密码
            changecheck(info){

            },
            //登录
           enterinto(){
                let _this=this;
                if(!_this.nametext){
                    new Toast("请输入用户名")
                    return
                }else if(!_this.passward){
                    new Toast("请输入用户密码")
                    return
                }else{
                    //登录接口
                    _this.$showToast('加载中...')
                    _this.$http.post('/login',{
                        userLoginName:_this.nametext,//用户名
                        password:_this.passward,//密码
                    }).then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            let cmsuserinfo={
                                userid:data.data.userId,
                                userName:data.data.userName
                            }
                            if(_this.checked){
                                cmsuserinfo.ischecked=true;
                                cmsuserinfo.nametext=_this.nametext;
                                cmsuserinfo.passward=_this.passward;
                                FoundationTools.setCookie('cmsuserinfo',JSON.stringify(cmsuserinfo),15)//存储用户信息
                                sessionStorage.setItem('cmsuserinfo',JSON.stringify(cmsuserinfo))
                            }else{
                                cmsuserinfo.ischecked=false;
                                FoundationTools.setCookie('cmsuserinfo',JSON.stringify(cmsuserinfo),15)//存储用户信息
                                sessionStorage.setItem('cmsuserinfo',JSON.stringify(cmsuserinfo))
                            }
                            _this.changeactiveid('1-1');
                            sessionStorage.removeItem('hx-lawcourtcode')
                            _this.$router.push({
                                path:'/indexmain/courtmanagement',
                                query:{

                                }
                            })
                        } else {
                            new Toast(data.message);
                        }
                    }).catch(err => {
                        _this.$hideToast()
                        new Toast('服务器异常，请稍后重试');
                    })
                }
            },
            //帮助下载
            helper(){
                const _this=this;
                _this.$http.post('/helpDocConfig/getHelpDocDownloadUrl',{}).then(data => {
                    if(data.code===200){
                        window.open(data.url)
                    }else{
                        new Toast(data.message);
                    }
                }).catch(err=>{
                    console.log(err)
                    new Toast('服务器异常，请稍后重试');
                })
            },
            //客户端下载
            downClient(){
                const _this=this;
                _this.$http.post('/softwareVersionManage/getSoftwareVersionList',{
                    pageIndex:-1,
                    pageSize:-1
                }).then(data => {
                    _this.isshow=true;
                    if(data.code===200){
                        _this.downList=data.data;
                    }else{
                        new Toast(data.message);
                    }
                }).catch(err=>{
                    console.log(err)
                    new Toast('服务器异常，请稍后重试');
                })
            },
            downLoad(downloadUrl){
                window.open(downloadUrl)
            },
        },
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .login{
        width:100vw;
        .main{
            position:absolute;
            left:50vw;
            top:50vh;
            margin-left:-2.35rem;
            margin-top:-3.3rem;
            width:4.7rem;
            .title-img{
                text-align: center ;
                img{
                    width:4.02rem;
                }
                margin-bottom:.2rem;
            }
            .content{
                height:5.8rem;
                background:#fff;
                border-radius:5px;
                padding:.2rem;
                position:relative;
                box-shadow: 0 2px 5px 2px rgba(0,32,98,.2);
                .title{
                    /*暂时*/
                    .fr();
                    margin-bottom:.2rem;
                    &>div{
                        .f18();
                    }
                    .b-z{
                        cursor: pointer;
                        img{
                            width:.24rem;
                        }
                        span{
                            margin-left:.05rem;
                            .f14();
                            color:#1296DB;
                        }
                    }
                    .x-i{
                        color:#1296DB;
                        cursor: pointer;
                    }
                }
                /*info*/
                .info{
                    input::-webkit-input-placeholder{
                        .f20();
                        color: #fff;
                    }
                    .input{
                        .wh(4.3rem,.46rem);
                        .br(2px);
                        .f20();
                        outline:none;
                        border:none;
                    }
                    .name{
                        position:relative;
                        margin-bottom:.2rem;
                        .input{
                            color:#fff;
                            background:#002062 ;
                            padding:0 .1rem 0 .35rem;
                        }
                        img{
                            width:.18rem;
                            position:absolute;
                            left:.1rem;
                            top:.14rem;
                        }
                    }
                    .pasword{
                        position:relative;
                        .input{
                            color:#fff;
                            background:#1296DB ;
                            padding:0 .3rem 0 .35rem;
                        }
                        img.le{
                            width:.16rem;
                            position:absolute;
                            left:.1rem;
                            top:.15rem;
                        }
                        div.ri{
                            position:absolute;
                            right:.1rem;
                            top:0;
                            .wh(.2rem,.46rem);
                            cursor: pointer;
                            img{
                                width:.18rem;
                                position: absolute;
                                top:50%;
                                left:50%;
                                transform: translate(-50%,-50%);
                            }
                        }
                    }
                    /*错误信息提示*/
                    /*.err{
                        margin-top:.1rem;
                        .f18();
                        color:red;
                    }*/
                    /*checkbox*/
                    .el-checkbox{
                        margin:.2rem 0;
                        .el-checkbox__input{
                            line-height:normal;
                            .el-checkbox__inner{
                                .wh(.16rem,.16rem);
                                &:after{
                                    .wh(.04rem,.08rem);
                                    left: .05rem;
                                    top: .01rem;
                                }
                            }
                        }
                        .el-checkbox__label{
                            .f18();
                            line-height:1;
                        }
                    }
                }
                /*company*/
                .company{
                    .f18();
                    height:1.75rem;
                    line-height:.29rem;
                    color:#a8a8a8;
                }
                /*bottom*/
                .bottom{
                    position:absolute;
                    left:.2rem;
                    bottom:.5rem;
                    width:4.3rem;
                    .el-button{
                        .wh(100%,.46rem);
                        line-height:.46rem;
                        padding:0;
                        background: #002062;
                        border: none!important;
                        span{
                            .f20();
                            color:#fff;
                        }
                    }
                }
                /*客户端下载弹框*/
                .client{
                    position:absolute;
                    left:0;
                    top:0;
                    .wh(100%,100%);
                    background:#fff;
                    .br(2px);
                    z-index:100;
                    /*头*/
                    .ke-top{
                        .fb();
                        height:.74rem;
                        padding:0 .15rem;
                        box-shadow: 0 2px 2px 0 rgba(38,78,119,0.20);
                        .bi-a{
                            .f18();
                            img{
                                width:.24rem;
                            }
                        }
                        .alert-close{
                            cursor:pointer;
                            img{
                                width:.15rem;
                            }
                        }
                    }
                    /*主体*/
                    .ke-con{
                        padding:.3rem .2rem;
                        max-height:4rem;
                        overflow: auto;
                         .f-s-b();
                        flex-wrap: wrap;
                        div.textover {
                            span{
                                .f18();
                                color: #1296db;
                            }
                            color: #1296db;
                            line-height: .38rem;
                            cursor: pointer;
                            width: 2rem;
                        }
                        div.empty{
                            .f18();
                            color:#1296db;
                            line-height:.38rem;
                            width:3.7rem;
                            text-align: center;
                        }
                    }
                    /*脚*/
                    .ke-foot{
                        position:absolute;
                        left:.2rem;
                        bottom:.5rem;
                        width:4.3rem;
                        .el-button{
                            .wh(100%,.46rem);
                            line-height:.46rem;
                            padding:0;
                            background: #1296DB ;
                            border: none!important;
                            span{
                                .f20();
                                color:#fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>