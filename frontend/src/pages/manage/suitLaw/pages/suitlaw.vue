<template>
    <div class="suitlaw">
        <div class="suitlaw-right">
            <!--加载loading-->
            <loading :load="load" :text="loadingtext" />
            <!--搜索-->
            <div class="fixed-title">
                <div class="top_teb">
                    <div class="teb_title" v-for="(item,index) in datalist" :class="tebIndex == index?'tebActive':''" @click="tebClick(index)">{{item.title}}</div>
                    <div class="bar"></div>
                    <div class="teb_list" v-if="tebIndex == 0">
                        <div class="teb_child" v-for="(item,index) in datalist[0].list" :class="littleTebIndex == index?'littleActive':''" @click="gomoudle($event,item,index)">{{item.name}}</div>
                    </div>
                    <div class="teb_list" v-else>
                        <div class="teb_child" v-for="(item,index) in datalist[1].list" :class="littleTebIndex == index?'littleActive':''" @click="gomoudle($event,item,index)">{{item.name}}</div>
                    </div>
                </div>
                <div class="top_up">
                    <el-button class="position-btn" type="primary" @click="lookup(input)">定位</el-button>
                    <el-input class="searchkey" v-model.trim="input" placeholder="请输入检索词"></el-input>
                </div>
            </div>
            <!--内容-->
            <div class="fixed-center">
                <div class="n-center" v-if="textlist.length>0" v-for="(item,index) in textlist" :key="index">
                    <div class="title">
                        <span class="search-div">{{item.catname}}</span><br/>
                        <img src="../images/law/feng.png" />
                    </div>
                    <div class="text" v-for="(lawprov,index2) in item.lawprov" :key="index2">
                        <span class="bold search-div" v-html="lawprov.provname"></span>
                        <div class="search-div text-n" v-html="lawprov.provtext"></div>
                        <div class="record-time">
                            <span class="num">引用次数：{{lawprov.provcon}}次</span>
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
    </div>
</template>

<script>
    import $ from "jquery"
    import loading from "../component/loading" //loading
    import { mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "suitlaw",
        components: {
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
                pageindex:1, //当前页码
                tebIndex:0,
                littleTebIndex:0,
            }
        },
        created() {
            document.title='相关法律'
            //初始化
            if(this.$route.query.caseCauseId && this.$route.query.caseTypeId){
                //根据案由ID和案件类别ID返回相关的法规数
                this.getlawnum()
            }else{
                this.$msgw("没有获取到案由id和案件类别id")
            }
        },
        mounted() {
            (function(w,d) {
                function setSize() {
                    //计算高度
                    $(".fixed-center").innerHeight($(window).height()-170)//计算左侧高度
                }
                w.addEventListener('resize',setSize);
                w.addEventListener('pageShow',setSize)
                w.addEventListener('DOMContentLoaded',setSize)

            })(window,document)
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
                _this.$http.post('/getRelevantLaw', {
                    caseCauseId:_this.$route.query.caseCauseId || '1492',//案由id
                    caseTypeId:_this.$route.query.caseTypeId || 'CT1508061134410046'//案件类别id
                }).then(data =>{
                    if(data.Code==1){
                        //法规列表
                        sessionStorage.setItem('lastOptionTime',new Date().getTime())//存储最后操作时间
                        _this.gethttp(_this)
                    }else{
                        _this.$msgw(data.Message);
                    }
                }).catch(err => {
                    _this.load=false;
                    console.log(err,'/getRelevantLaw')
                    //_this.$msge('服务器异常，请稍后重试');
                })
            },
            // 大标签点击
            tebClick(index){
                this.tebIndex = index;
                this.littleTebIndex = 0;
                this.changestate(this.datalist[index].list[0].id)
                this.changename(this.datalist[index].list[0].name)
                if(index==0)this.changetype(1)
                else this.changetype(0)
                this.load=true;
                this.input='';
                this.changetext([]);//置空数据
                this.pageindex=1;
                this.getlawnum()
            },
            //去往对应路由
            gomoudle(e,item,index){
                this.littleTebIndex = index;
                let _this=this;
                _this.changestate(item.id)
                _this.changename(item.name)
                // _this.changetype(index)
                _this.load=true;
                _this.input='';
                _this.changetext([]);//置空数据
                _this.pageindex=1;
                _this.getlawnum()
            },
            //页面定位
            lookup(str) {
                let _this=this;
                //定位相关内容
                if (!str){
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
                if(new Date().getTime()-sessionStorage.getItem('lastOptionTime')>1000 * 60 * 29){
                    _this.$msgw('页面长时间未进行任何操作，正在刷新，请稍后');
                    setTimeout(()=>{
                        sessionStorage.removeItem('lastOptionTime');
                        location.reload();
                    },2000)
                }else{
                    _this.$http.post('/searchProvWebPage', {
                        caseCauseId:_this.$route.query.caseCauseId || '1492',//案由id
                        caseTypeId:_this.$route.query.caseTypeId || 'CT1508061134410046',//案件类别id
                        catinid:item.catinid,//法规id
                        type:_this.type,//实体程序法(1实体0程序）
                        hwtype:'行政法规',//法规类别
                        pagesize:10,//每页条数
                        pageindex:page //当前页数
                    }).then(data => {
                        _this.localload=false;
                        if (data.Code ==1) {
                            item.lawprov=item.lawprov.concat(data.Result[0].lawprov)//添加新数组
                            item.existsFlag=data.Result[0].existsFlag;
                            if(!data.Result[0].existsFlag){
                                e.find("img").addClass("transform");
                                e.find("span").text("收缩条文");
                            }
                        }else{
                            _this.$msgw(data.Message);
                        }
                    }).catch(err => {
                        _this.localload=false;
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }
            },
            //加载更多
            loadmore(e){
                let _this=this;
                if(new Date().getTime()-sessionStorage.getItem('lastOptionTime')>1000 * 60 * 29){
                    _this.$msgw('页面长时间未进行任何操作，正在刷新，请稍后');
                    setTimeout(()=>{
                        sessionStorage.removeItem('lastOptionTime');
                        location.reload();
                    },2000)
                }else{
                    _this.pageindex++;
                    _this.gethttp(_this)//获取余下列表
                    _this.loadingmore=true;
                }
            },
            
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .suitlaw{
        .wh(100vw,100vh);
        /*右侧栏*/
        .suitlaw-right{
            width:100%;
            position:relative;
            .fixed-title{
                width:100%;
                background: #fff;
                height:170px;
                .top_teb{
                        width:100%;
                        height:110px;
                        .teb_title{
                            float: left;
                            padding:10px 20px;
                            font-size: 20px;
                            color: #333;
                            border: 1px solid #dcdfe6;
                            cursor: pointer;
                            border-right-color: #2F8DED;
                        }
                        .teb_title:first-of-type{
                            margin-left:5px;
                        }
                        .bar{
                            float: left;
                            width: 100%;
                            height: 1px;
                            background-color: #dcdfe6;
                        }
                        
                        .teb_title:nth-child(2){
                            border-left: none;
                            border-right-color: #dcdfe6;
                        }
                        .tebActive{
                            color: #2F8DED;
                            border: 1px solid #2F8DED;
                            background-color: rgba(47,141,237,0.10);
                        }
                        .tebActive:nth-child(2){
                            border-left: none;
                            border-right-color: #2F8DED;
                        }
                        .teb_list{
                            float: left;
                            width: 100%;
                            padding:0 20px;
                            .teb_child{
                                float: left;
                                padding:5px 10px;
                                font-size: 18px;
                                /*color: #606266;*/
                                background-color: #fff;
                                border-radius: 2.8vh;
                                margin-right: 1vw;
                                margin-top: 1vh;
                                cursor: pointer;
                                border: 1px solid #dcdfe6;
                            }
                            .littleActive{
                                color: #fff;
                                border: 1px solid #409eff;
                                background-color: #409eff;
                            }
                        }
                    }
                .top_up{
                    margin-right:10px;
                        /*搜索*/
                        .searchkey{
                            width:300px;
                            margin-right:10px;
                            float: right;
                        }
                        .el-input__inner{
                            font-size: 20px;
                        }
                        .el-button{
                            float: right;
                            padding:0 20px;
                            line-height:35px;
                            span{
                                font-size: 20px;
                            }
                        }
                        .el-button--success{

                        }
                }
            }
            .fixed-center{
                width:100%;
                position:relative;
                padding: 0 20px 10px;
                overflow: auto;
                .n-center{
                    margin-top:5px;
                    margin-bottom:10px;
                    padding:10px 15px 0;
                    box-shadow: 0 2px 10px 0 rgba(38,78,119,0.20);
                    /*字体颜色高亮显示*/
                    .heightcolor{
                        color:red;
                    }
                    .title{
                        text-align: center ;
                        span{
                            font-size: 22px;
                            font-weight:bold;
                        }
                    }
                    &>div.text{
                        padding:25px 0;
                        line-height:35px;
                        border-bottom:1px solid #DCDFE6;
                        span{
                            font-size: 20px;
                        }
                        .bold{
                            margin-right:2px;
                        }
                        .text-n{
                            text-indent: 40px;
                            font-size: 20px;
                        }
                        .record-time{
                            text-align: right;
                            .num{
                                font-size: 18px;
                                color: #606266;
                            }
                            .check{
                                cursor:pointer;
                                font-size:18px;
                                color: #2F8DED;
                            }
                        }
                    }
                    /*更多条文*/
                    .more-text{
                        cursor:pointer;
                        line-height:50px;
                        text-align: center;
                        color: #2F8DED;
                        border:none;
                        span{
                           font-size:20px;
                        }
                        img{
                            width:14px;
                        }
                        .transform{
                            transform:rotate(180deg);
                            -webkit-transform:rotate(180deg);
                        }
                    }
                }
                /*加载更多*/
                .load-more{
                    cursor:pointer;
                    line-height:50px;
                    text-align: center;
                    color: #2F8DED;
                    span{
                        font-size:22px;
                    }
                    img{
                        width:16px;
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