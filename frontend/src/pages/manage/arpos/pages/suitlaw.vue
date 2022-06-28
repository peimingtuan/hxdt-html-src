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
                    <!--暂时隐藏-->
                    <!--<el-button type="primary" @click="select()">查询</el-button>-->
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
                        <span class="bold search-div" v-html="lawprov.provname"></span>
                        <div class="search-div text-n" v-html="lawprov.provtext"></div>
                        <div class="record-time">
                            <span class="num">引用次数：{{lawprov.provcon}}次</span>
                            <!--暂时隐藏-->
                            <!--<span class="check" @click="checkquan(item.catinid)">-->
                                <!--查看全文-->
                            <!--</span>-->
                        </div>
                    </div>
                    <!--更多条文-->
                    <div class="more-text" @click.stop="moretext($event,item)" v-if="item.showmore" v-loading="localload && more==item.catinid"
                         element-loading-spinner="el-icon-loading" >
                        <span>
                            更多条文
                        </span>
                        <img src="../images/law/more-icon1.png" />
                    </div>
                </div>
                <div class="load-more" v-if="textlist.length===0">
                    <span>暂无数据</span>
                </div>
                <!--加载更多-->
                <div v-if="textlist.length>0 && textlist[textlist.length-1].existsFlag" class="load-more" element-loading-spinner="el-icon-loading" v-loading="loadingmore">
                    <span @click="loadmore($event)">
                        {{loadMore}}
                        <img :class="transorm?'transform':''" src="../images/law/more-icon1.png" />
                    </span>
                </div>
            </div>
        </div>
        <!--查看全文弹框-->
        <lawalert @selectshow="selectshow" :alertshow="show" ref="lawalert"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import lawalert from "../component/lawalert" //全文弹框
    import loading from "../component/loading" //loading
    import { mapState,mapMutations,mapActions} from 'vuex'
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
                transorm:false,
                pageindex:1 //当前页码
            }
        },
        beforeCreate() {

        },
        created() {
            //初始化
            if(this.$route.query.CaseCauseID && this.$route.query.CaseTypeID){
                //根据案由ID和案件类别ID返回相关的法规数
                this.getlawnum()
            }else{
                this.$msgw("没有获取到案由id和案件类别id")
            }
        },
        mounted() {
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
            this.changetext([]);//置空数据
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
                "gethttp",
            ]),
            //先要获取法规数
            getlawnum(){
                let _this=this;
                _this.load=true;
                _this.$http.post('/cms/nosecure/searchWebPage.action', {
                    CaseCauseID:_this.$route.query.CaseCauseID || '1492',//案由id
                    CaseTypeID:_this.$route.query.CaseTypeID || 'CT1508061134410046'//案件类别id
                }).then(data =>{
                    if(data.Code==1){
                        //法规列表
                        _this.gethttp(_this)
                    }else{
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.load=false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //去往对应路由
            gomoudle(e,item,index){
                let _this=this;
                _this.changestate(item.id)
                _this.changename(item.name)
                _this.changetype(index)
                _this.load=true;
                _this.changetext([]);//置空数据
                _this.pageindex=1;
                _this.gethttp(_this)
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
            //更多条文
            moretext(e,item){
                let _this=this;
                if(!$(e.currentTarget).find("img").hasClass("transform")){
                    _this.localload=true;
                    _this.more=item.catinid;
                    let page=Math.floor(item.lawprov.length/10)+1
                    _this.getlawname($(e.currentTarget),item,page)
                }else{
                    $(e.currentTarget).find("img").removeClass("transform");
                    $(e.currentTarget).find("span").text("更多条文");
                    //物理删除数据
                    console.log('物理删除数据')
                    item.lawprov=item.lawprov.slice(0,10)
                }
            },
            //获取法规条文
            getlawname(e,item,page){
                let _this=this;
                _this.$http.post('/cms/nosecure/searchProvWebPage.action', {
                    CaseCauseID:_this.$route.query.CaseCauseID || '1492',//案由id
                    CaseTypeID:_this.$route.query.CaseTypeID || 'CT1508061134410046',//案件类别id
                    catinid:item.catinid,//法规id
                    type:_this.type ,//实体程序法(0实体1程序）
                    hwtype:_this.name,//法规类别
                    pagesize:10,//每页条数
                    pageindex:page //当前页数
                }).then(data => {
                    _this.localload=false;
                    if (data.Code == 1) {
                        console.log(data.Result)
                        item.lawprov=item.lawprov.concat(data.Result[0].lawprov)//添加新数组
                        item.existsFlag=data.Result[0].existsFlag;
                        if(!data.Result[0].existsFlag){
                            e.find("img").addClass("transform");
                            e.find("span").text("收缩条文");
                        }
                    } else {
                        _this.$msge(data.Message);
                    }
                }).catch(err => {
                    _this.localload=false;
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //加载更多
            loadmore(e){
                let _this=this;
                _this.pageindex++;
                _this.gethttp(_this)//获取余下列表
                _this.loadingmore=true;
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
        height:11.52rem;
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
                    padding-left:.6rem;
                    .f22();
                    line-height:.62rem;
                    &:hover{
                        background:#F2F6FC;
                        border-right:3px solid #2F8DED;
                    }
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
            width:.1rem;
            height:11.52rem;
            background:#f5f6fa;
        }
        /*右侧栏*/
        .suitlaw-right{
            width:13.87rem;
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
                        top: .015rem;
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
                        .text-n{
                            text-indent: 2em;
                            .f20();
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
                        border:none;
                        span{
                            .f20()
                        }
                        img{
                            width:.12rem;
                        }
                        .transform{
                            transform:rotate(180deg);
                            -webkit-transform:rotate(180deg);
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