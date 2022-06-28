<template>
    <div class="searchlaw">
        <div class="head">
            <div class="head-l">
                <img @click="closeAlert" src="../images/alert-close.png" />
                相关法律
            </div>
            <div class="head-r">
                <el-input class="searchkey" v-model="input" placeholder="请输入检索词"></el-input>
                <el-button class="position-btn" type="primary" @click="lookup(input)">定位</el-button>
                <el-button type="primary" @click="select(input)">查询</el-button>
            </div>
        </div>
        <!--tab标签-->
        <div class="tabpage">
            <loading :load="isload" :text="loadingtext" />
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                    <law :key="index" ref="law"/>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--弹框-->
        <lawalert @selectshow="selectshow" :alertshow="show"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import loading from "../component/loading" //loading
    import lawalert from "../component/lawalert"
    import law from "../childrenlaw/law"
    export default {
        name: "searchlaw",
        components: {
            loading,
            lawalert,
            law,
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'法律'
                    },
                    {
                        id:'second',
                        name:'行政法规'
                    },
                    {
                        id:'third',
                        name:'司法解释'
                    }
                ],
                //loading
                isload:false,
                loadingtext:'正在查询，请稍后...',
                input:this.$route.query.name || '',//接收传过来的搜索内容
                show:false,//控制弹框显示与隐藏
                activeName:'first',//当前tab标签的指向
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {
            if(this.$route.query.name)this.select(this.$route.query.name)
        },
        destroyed() {

        },
        methods: {
            //关闭页面，返回上一页
            closeAlert(){
                window.history.back();
            },
            //页面定位
            lookup(str) {
                let _this = this;
                _this.$msgw('没有你要找的内容。');
            },
            //查询
            select(kw){
                let _this=this;
                _this.activeName='first';//查询后数据初始化
                if(_this.input.replace(/(^\s*)|(\s*$)/g, '')!=''){
                    _this.isload=true;
                    //接口请求成功后调用子组件方法
                    _this.$refs.law.map((item,index) =>{
                        if(index==0)item.getname(kw,_this.tablist[index].name,200)
                        else item.getname(kw,this.tablist[index].name)
                    });
                    _this.$http.post('/vehicle-examine/car-order-list', {
                        name:kw,
                        type:_this.tablist[0].name
                    }).then(data => {
                        _this.isload=false;
                        if (data.Code == 1) {

                        } else {
                            _this.$msgw(data.Message);
                        }
                    }).catch(err => {
                        _this.isload=false;
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }else{
                    _this.$msgw('输入要查询的内容。');
                }
            },
            //tab标签切换
            handleClick(data) {
                let _this=this;
                //调用子组件方法
                _this.$refs.law[data.index].gethttp(data.label,1)
            },
            //弹框
            selectshow(){
                this.show=false;
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .searchlaw{
        /*头部*/
        .head{
            height:.92rem;
            padding:0 .51rem;
            margin-bottom:.27rem;
            white-space: nowrap;
            .fb();
            .head-l{
                paading:.31rem 0;
                .f22();
                img{
                    width:.2rem;
                    margin-right:.2rem;
                    cursor:pointer;
                }
            }
            .head-r{
                padding:.21rem 0 .14rem;
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
        .tabpage{
            position:relative;
            /*标签*/
            .el-tabs__item{
                width:1.88rem;
                text-align: center ;
                height:.56rem;
                line-height:.56rem;
                .f22();
            }
            .el-tabs--card>.el-tabs__header .is-active{
                border-left:1px solid #2f8ded;
            }
            /*激活标签*/
            .is-active{
                background: rgba(47,141,237,0.10);
                border: 1px solid #2F8DED;
                border-bottom-color: #2F8DED!important;
                border-left-color: #2F8DED!important;
            }
        }
    }
</style>