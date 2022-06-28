<template>
    <div class="suitlaw">
        <!--左侧菜单栏-->
        <div class="suitlaw-left">
            <!--头部-->
            <div class="title">
                本案适用法条
            </div>
            <!--菜单-->
            <div class="menu">
                <div class="menu-index" v-for="(item,index) in datalist">
                    <div class="top bold">
                        <img src="../images/law/jiantou.png" />
                        {{item.title}}
                    </div>
                    <div class="content" :class="active==num.id?'hover':''" v-for="num in item.list" @click="gomoudle($event,num,index)">
                        {{num.name}}
                    </div>
                </div>
            </div>
        </div>
        <!--中间分隔符-->
        <div class="f-g"></div>
        <!-- 右侧栏 -->
        <div class="suitlaw-right">
            <!--加载loading-->
            <loading :load="load" :text="loadingtext" />
            <!--搜索-->
            <div class="fixed-title">
                <div>
                    <el-input class="searchkey" v-model="input" placeholder="请输入检索词"></el-input>
                    <el-button class="position-btn" type="primary" @click="lookup(input)">定位</el-button>
                    <el-button type="primary" @click="select()">查询</el-button>
                    <el-button type="success" @click="checklaw">法律法规库</el-button>
                </div>
            </div>
            <!--内容-->
            <div class="fixed-center">
                <div class="n-center" v-if="textlist.length>0" v-for="item in textlist">
                    <div class="title">
                        <span class="search-div">{{item.catname}}</span><br/>
                        <img src="../images/law/feng.png" />
                    </div>
                    <div class="text" v-for="lawprov in item.lawprov">
                        <span class="bold search-div">{{lawprov.provname}}</span>
                        <span class="search-div">{{lawprov.provtext}}</span>
                        <div class="record-time">
                            <span class="num">引用次数：{{lawprov.provcon}}次</span>
                            <span class="check" @click="checkquan(item.catinid)">
                                查看全文
                            </span>
                        </div>
                    </div>
                    <!--更多条文-->
                    <div class="more-text" @click="moretext($event,item)" v-loading="localload && more==item.catinid"
                         element-loading-spinner="el-icon-loading" >
                        更多条文
                        <img src="../images/law/more-icon1.png" />
                    </div>
                </div>
                <!--加载更多-->
                <div v-if="textlist.length>0" class="load-more" element-loading-spinner="el-icon-loading" v-loading="loadingmore">
                    <span @click="loadmore($event,item)">
                        {{loadMore}}
                        <img :class="transorm?'transform':''" src="../images/law/more-icon1.png" />
                    </span>
                </div>
                <div class="load-more" v-else>
                    <span>暂无数据</span>
                </div>
            </div>
        </div>
        <!--查看全文弹框-->
        <lawalert @selectshow="selectshow" :alertshow="show" ref="lawalert"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import http from "../js/http" //http请求
    import getApiUrl from "../js/getApiUrl"
    import lawalert from "../component/lawalert" //全文弹框
    import loading from "../component/loading" //loading
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "suitlaw",
        components: {
            lawalert,
            loading
        },
        data() {
            return {
                //弹框
                show:false,
                //加载loading
                load:false,
                loadingtext:'加载中，请稍后...',
                //局部刷新
                localload:false,
                //搜索模板
                input:'',
                //更多条文变量
                more:'',
                //全文加载更多
                loadMore:'更多',
                loadingmore:false,
                transorm:false
            }
        },
        beforeCreate() {

        },
        created() {
            //初始化
            if(this.textlist.length===0)this.gethttp(1)
            //this.getapi(this)
        },
        mounted() {
            this.$showLoading()
            this.$hideLoading()
            //展示法条内容滑动时出现滚动条，搜索底部添加阴影
            $(".fixed-center").scroll(function() {
                if($(this).scrollTop()>0){
                    $(".suitlaw-right .fixed-title").css("box-shadow","0 2px 10px 0 rgba(38,78,119,0.20)")
                }else{
                    $(".suitlaw-right .fixed-title").css("box-shadow","none")
                }
            });
        },
        destroyed() {

        },
        computed:{
            ...mapState('suitlaw',[
                "active",
                'name',
                'type',
                "datalist",
                "textlist"
            ])
        },
        methods: {
            ...mapMutations('suitlaw',[
                "changestate",
                "changename",
                "changetype",
                "changetext"
            ]),
            ...mapActions('suitlaw',[
                "getapi",
            ]),
            //去往对应路由
            gomoudle(e,item,index){
                let _this=this;
                _this.changestate(item.id)
                _this.changename(item.name)
                _this.changetype(index)
                _this.load=true;
                setTimeout(function(){
                    _this.load=false;
                },2000)
                _this.$message({
                    message: '前往路由'+item.id+'。',
                    showClose: true,
                    type: 'warning'
                });
                _this.textlist=[];//置空数据
                _this.gethttp(1)
            },
            //根据案由和法规类型返回法规列表接口
            gethttp(page){
                let _this=this;
                //接口请求
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    HeadWordName:_this.$route.query.name,//案由名称
                    type:_this.type ,//实体程序法(0实体1程序）
                    hwtype:_this.name,//法规类别
                    pagesize:5,//每页条数
                    pageindex:page //当前页数
                }).then(data => {
                    if (data.Code == 1) {
                        if(data.Result.catlist.length!=0){
                            if(_this.textlist.length!=0){
                                _this.textlist.concat(data.Result.catlist)
                            }else{
                                _this.textlist=data.Result.catlist;//法规名称列表
                            }
                        }else{
                            _this.$message({
                                message: '没有数据',
                                showClose: true,
                                type: 'error'
                            });
                        }
                    } else {
                        _this.$message({
                            message: data.Message,
                            showClose: true,
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    _this.$message({
                        message: '服务器异常，请稍后重试',
                        showClose: true,
                        type: 'error'
                    });
                })
            },
            //查询
            select(){
                let _this=this;
                if(_this.input.replace(/(^\s*)|(\s*$)/g, '')!=''){
                    _this.$router.push({
                        path:'/searchlaw',
                        query:{
                            name:_this.input //搜索内容
                        }
                    })
                }else{
                    _this.$message({
                        message: '输入要查询的内容。',
                        showClose: true,
                        type: 'warning'
                    });
                }
            },
            //页面定位
            lookup(str) {
                let _this=this;
                //定位相关内容
                if (!str || str.replace(/(^\s*)|(\s*$)/g, '')== ""){
                    _this.$message({
                        message: '输入要定位的内容。',
                        showClose: true,
                        type: 'warning'
                    });
                    return false;
                }
                let text = $(".fixed-center .search-div");//查询区域,也可以使用Document直接获得
                let foundFlag = text.text().indexOf(str) > -1;
                if (foundFlag) {
                    let choice=true;
                    for (let i = 0; i < text.length; i++) {
                        if($(text[i]).find("span").hasClass("heightcolor")){//清除上一次的定位结果
                            let text2=$(text[i]).find(".heightcolor:first-of-type").text()
                            let reger2 = new RegExp('<span class="heightcolor">' + text2 + '</span>',"g");
                            $(text[i]).html($(text[i]).html().replace(reger2,text2))
                        }
                        if($(text[i]).text().indexOf(str) > -1){
                            if(choice){
                                choice=false;
                                $(".fixed-center").animate({
                                    scrollTop: $(text[i]).offset().top-$(".fixed-center").offset().top+$(".fixed-center").scrollTop()
                                }, 1000);  //添加动画效果
                            }
                        }
                        let span = '<span class="heightcolor">' + str + '</span>';
                        let reger = new RegExp(str,"g");
                        $(text[i]).html($(text[i]).html().replace(reger,span))
                    }
                } else {
                    _this.$message({
                        message: '对不起！没有你要找的内容。',
                        showClose: true,
                        type: 'warning'
                    });
                }
            },
            //法律法规库
            checklaw(){
                this.$message({
                    message: '该功能待开发。',
                    showClose: true,
                    duration:0,
                    type: 'warning'
                });
            },
            //更多条文
            moretext(e,item){
                let _this=this;
                $(e.target).find("img").css("transform", "rotate(180deg)");
                $(e.target).find("img").css("-webkit-transform", "rotate(180deg)");
                _this.localload=true;
                _this.more=item.catinid;
                setTimeout(()=>{
                    _this.localload=false;
                    $(e.target).remove();
                    //添加数据
                    let param={
                        provname:"第三百九十条",
                        provtext:"侵害公民身体造成侵害的，侵害公民身体造成侵害的侵害公民身体造成侵害的侵害公民身体造成侵害的。",
                        provcon:"20",
                        caseurl:"关联案例地址",
                        fulltexturl:"法规全文地址",
                    }
                    item.lawprov.push(param)
                    },2000);
                _this.getlawname(item,2)
            },
            //获取法规条文
            getlawname(item,page){
                let _this=this;
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    HeadWordName:_this.$route.query.name,//案由名称
                    catinid:item.catinid,//法规id
                    type:_this.type ,//实体程序法(0实体1程序）
                    hwtype:_this.name,//法规类别
                    pagesize:5,//每页条数
                    pageindex:page //当前页数
                }).then(data => {
                    if (data.Code == 1) {
                        item.lawprov.concat()//获取新数组
                    } else {
                        _this.$message({
                            message: data.Message,
                            showClose: true,
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    _this.$message({
                        message: '服务器异常，请稍后重试',
                        showClose: true,
                        type: 'error'
                    });
                })
            },
            //加载更多
            loadmore(e){
                let _this=this;
                if(!_this.transorm){
                    _this.gethttp(2)//获取余下列表
                    _this.loadingmore=true;
                    setTimeout(()=>{
                        _this.loadingmore=false;
                        _this.transorm=true;
                        _this.loadMore='收起';
                    },2000);
                }else{
                    _this.textlist=_this.textlist.slice(4)//收起列表
                    _this.transorm=false;
                    _this.loadMore='更多';
                }
            },
            //查看全文
            checkquan(catinid){
                let _this=this;
                _this.show=true;
                //调用子组件的方法
                _this.$refs.lawalert.gethttp(catinid,1,true,true)//catinid法规id,1当前页码,true是第一次加载,true控制背景变量
            },
            //关闭全文弹框
            selectshow(){
                this.show=false;
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .suitlaw{
        .fl();
        width:100%;
        min-height:11.52rem;
        /*左侧栏*/
        .suitlaw-left{
            height:100%;
            .title{
                width:3.68rem;
                line-height:.8rem;
                text-align: center ;
                .f22();
                border-bottom:1px solid #DCDFE6;
            }
            .menu{
                width:3.68rem;
                cursor:pointer;
                .menu-index:not(:last-of-type){
                    padding-bottom:.2rem;
                    border-bottom: 1px solid #dcdfe6;
                }
                .top{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left:.6rem;
                    line-height:.7rem;
                    position:relative;
                    left:-.3rem;
                    .f22();
                    img{
                        width:.14rem;
                        margin-right:.1rem;
                    }
                }
                /*正常*/
                .content{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding-left:.6rem;
                    .f22();
                    line-height:.62rem;
                    &:hover{
                        background:#F2F6FC;
                        border-right:3px solid #2F8DED;
                    }
                }
                /*被点击*/
                .hover{
                    background:#F2F6FC;
                    border-right:3px solid #2F8DED;
                }
            }
        }
        /*分隔符*/
        .f-g{
            min-width:.1rem;
            min-height:11.52rem;
            background:#f5f6fa;
        }
        /*右侧栏*/
        .suitlaw-right{
            min-width:13.87rem;
            position:relative;
            .fixed-title{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                background: #fff;
                height:.92rem;
                padding:0 .42rem;
                /*box-shadow: 0 2px 10px 0 rgba(38,78,119,0.20);*/
                border-radius: 2px;
                text-align:right;
                white-space: nowrap;
                &>div{
                    //.fr();
                    padding-top:.24rem;
                    /*搜索*/
                    .searchkey{
                        width:4.08rem;
                        height:.54rem;
                        margin-right:.2rem;
                    }
                    .el-input__inner{
                        height:.54rem;
                        line-height:.54rem;
                        .f20();
                    }
                    .el-button{
                        width:.98rem;
                        height:.54rem;
                        padding:.12rem .2rem;
                        span{
                            .f20();
                        }
                    }
                    .el-button--success{
                        width:1.54rem;
                    }
                }
            }
            .fixed-center{
                position:relative;
                margin-top:.92rem;
                padding:0 .43rem;
                height:10.4rem;
                overflow: auto;
                .n-center{
                    margin-top:.05rem;
                    margin-bottom:.2rem;
                    padding:.2rem .3rem 0;
                    box-shadow: 0 2px 10px 0 rgba(38,78,119,0.20);
                    /*字体颜色高亮显示*/
                    .heightcolor{
                        color:red;
                    }
                    .title{
                        text-align: center ;
                        span{
                            .f22();
                            font-weight:bold;
                        }
                    }
                    &>div.text{
                        padding:.3rem 0;
                        line-height:.38rem;
                        border-bottom:1px solid #DCDFE6;
                        span{
                            font-size:.2rem;
                        }
                        .bold{
                            margin-right:.2rem;
                        }
                        .record-time{
                            text-align: right;
                            .num{
                                font-size: .18rem;
                                color: #606266;
                                margin-right:.3rem;
                            }
                            .check{
                                cursor:pointer;
                                font-size: .18rem;
                                color: #2F8DED;
                            }
                        }
                    }
                    /*更多条文*/
                    .more-text{
                        cursor:pointer;
                        line-height:.65rem;
                        text-align: center;
                        color: #2F8DED;
                        font-size:.2rem;
                        border:none;
                        img{
                            width:.12rem;
                        }
                    }
                }
                /*加载更多*/
                .load-more{
                    margin-top:.1rem;
                    cursor:pointer;
                    line-height:.8rem;
                    text-align: center;
                    color: #2F8DED;
                    span{
                        .f22()
                    }
                    img{
                        width:.14rem;
                        transform:rotate(0deg);
                        -webkit-transform:rotate(0deg);
                    }
                    .transform{
                        transform:rotate(180deg);
                        -webkit-transform:rotate(180deg);
                    }
                }
            }
        }
    }
</style>