<template>
    <div class="caselaw">
        <!--加载loading-->
        <loading :class="isrgba?'rgba':''" :load="isload" :text="loadingtext" ref="loading"/>
        <!--左侧菜单栏-->
        <div class="caselaw-left">
            <div class="title">
                相关案列
            </div>
            <div class="menu">
                <!--树形菜单-->
                <el-tree
                        :data="causelist"
                        :props="defaultProps"
                        show-checkbox
                        node-key="causeid"
                        default-expand-all
                        @node-click="handleNodeClick"
                        @check-change="handleCheckChange">

                </el-tree>
            </div>
            <!--左侧查询-->
            <div class="select-btn">
                <el-button type="primary" @click="leftselect">确定查询</el-button>
            </div>
        </div>
        <!--中间分隔符-->
        <div class="f-g"></div>
        <!-- 右侧栏 -->
        <div class="caselaw-right">
            <!--tab标签-->
            <div class="tabpage">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                        <casetab1 @relatedlaws="relatedlaws(tab.id)" :key="index" ref="casetab1"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--底部查询-->
            <div class="search-box">
                <div class="name-d">
                    法院名称:
                    <el-input
                            placeholder=""
                            v-model="lawname"
                            clearable>
                    </el-input>
                </div>
                <div class="date-d">
                    裁判日期:
                    <el-date-picker
                            v-model="datestartval"
                            type="date"
                            :clearable=true
                            :picker-options="pickerOptions0"
                            >
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="dateendval"
                            type="date"
                            :clearable=true
                            :picker-options="pickerOptions1"
                    >
                    </el-date-picker>
                </div>
                <div class="search-d">
                    检索词:
                    <el-input
                            placeholder=""
                            v-model="searchname"
                            clearable>
                    </el-input>
                </div>
                <div class="select-d">
                    <el-button type="primary" @click="selectlaw">确定查询</el-button>
                </div>
            </div>
        </div>
        <!--关联法规内容弹框-->
        <casealert ref="casealert" @selectshow="selectshow" :alertshow="show"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import http from "../js/http" //http请求
    import getApiUrl from "../js/getApiUrl"
    import loading from "../component/loading" //loading
    import casealert from "../component/casealert"
    import casetab1 from "../childrencase/casetab1"
    import { mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "caselaw",
        components: {
            loading,
            casealert,
            casetab1
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'最高院指导案例(20)'
                    },
                    {
                        id:'second',
                        name:'山东高院参考案例(20)'
                    },
                    {
                        id:'three',
                        name:'法院裁判文书(20)'
                    }
                ],
                //loading
                isrgba:false,
                isload:false,//loading
                loadingtext:'正在查询，请稍后...',
                show:false,//关联法规弹框
                //案由树配置
                defaultProps: {
                    children: 'parentid',
                    label: 'causename'
                },
                checklist:[],//存放选中的树形id
                Instrumentarea:"",//本人/本院/全省/其他省市法院
                Instrumentcase:"",//最高法指导案例/本省高院典型案例/法院裁判文书
                //底部查询功能
                lawname:'',//法院名称
                searchname:'',//检索词
                datestartval:'',//开始日期
                dateendval:'',//结束日期
                //开始日期
                pickerOptions0: {
                    disabledDate: (time) => {
                        if (this.dateendval != "") {
                            return time.getTime() > Date.now() || time.getTime() > this.dateendval;
                        } else {
                            return time.getTime() > Date.now();
                        }

                    }
                },
                //结束日期
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < this.datestartval || time.getTime() > Date.now();
                    }
                },
            }
        },
        beforeCreate() {

        },
        created() {
            //数据初始化
            if(this.causelist.length==0)this.creatTree()
            else console.log(33)
        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('caselaw',[
                "activeName",
                "causelist"
            ])
        },
        methods: {
            ...mapMutations('caselaw',[
                "changestate",
                "changetree"
            ]),
            //初始化
            async creatTree(){
                this.isload=true;
                await this.getcasetree()//返回案由树
                this.leftselect() //初始化查询
                this.isrgba=true;
                this.checklist=[];//清空选中项
            },
            //返回案由树
            getcasetree(){
                let _this=this;
                return http.post(getApiUrl('/casecause'), {
                            CaseCauseID:_this.$route.query.name,//案由名称,
                        }).then(data => {
                            if (data.Code == 1) {

                            } else {
                                _this.$message({
                                    message: data.Message,
                                    showClose: true,
                                    type: 'warning'
                                });
                            }
                        }).catch(err => {
                            _this.checklist.push(1)//默认添加第一个树形id
                            _this.$message({
                                message: '服务器异常，请稍后重试',
                                showClose: true,
                                type: 'error'
                            });
                        })
            },
            //左侧树形菜单
            handleCheckChange(data,node,index){
                console.log(data);//该节点所对应的对象
                console.log(data.id)
                console.log(node);//该节点是否被选中
                console.log(index);//节点的子树中是否有被选中的节点
                if(node){
                    this.checklist.push(data.id)
                }else{
                    let index = this.checklist.indexOf(data.id);
                    this.checklist.splice(index, 1);
                }
                console.log(this.checklist)
            },
            //当前节点
            handleNodeClick(data) {
                console.log(data);
                //this.leftselect();
            },
            //左侧底部查询
            leftselect(){
                let _this=this;
                console.log(_this.checklist)
                if(_this.checklist.length==0){
                    _this.$message({
                        message: '请选择要查询的项',
                        showClose: true,
                        type: 'warning'
                    });
                    return;
                }
                _this.isload=true;
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    id:_this.checklist.join(",")
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {

                    } else {
                        _this.$message({
                            message: data.Message,
                            showClose: true,
                            type: 'warning'
                        });
                    }
                }).catch(err => {
                    _this.isload=false;
                    _this.$message({
                        message: '服务器异常，请稍后重试',
                        showClose: true,
                        type: 'error'
                    });
                })
            },
            //tab页签切换事件
            handleClick(data){
                //console.log(data)
                let _this=this;
                _this.Instrumentcase=data.label,//最高法指导案例/本省高院典型案例/法院裁判文书
                _this.changestate(data.name)
                //调用子组件方法
                _this.$refs.casetab1[data.index].gethttp(data.name,1,true)//
            },
            //关联法规弹框
            relatedlaws(val){
                let _this=this;
                _this.show=true;
                console.log(val)
                //调用子组件方法
                _this.$refs.casealert.gethttp(val)
            },
            //关闭关联法规弹框
            selectshow(){
                this.show=false;
            },
            //右侧底部查询
            selectlaw(){
                let _this=this;
                if(_this.lawname.replace(/(^\s*)|(\s*$)/g, '')=='' && _this.searchname.replace(/(^\s*)|(\s*$)/g, '')=='' && _this.datestartval=='' && _this.dateendval==''){
                    _this.$message({
                        message: '请选择查询条件',
                        showClose: true,
                        type: 'warning'
                    });
                }else{
                    _this.isload=true;
                    console.log(_this.datestartval)
                    console.log(_this.datestartval.getTime())//获取时间戳
                    http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                        keyword:_this.searchname,//搜索关键词
                        CaseCauseID:1,//案由id
                        Startdate:_this.datestartval.getTime(),//日期开始时间
                        Enddate:_this.dateendval.getTime(),//日期结束时间
                        Instrumentarea:_this.Instrumentarea,//本人/本院/全省/其他省市法院
                        Instrumentcase:_this.Instrumentcase,//最高法指导案例/本省高院典型案例/法院裁判文书
                        CourtName:_this.lawname,//法院名称
                        sorts:"",//排序1为倒序0为正序
                        pagesize:"",//每页多少条
                        pageindex:""//当前第几页
                    }).then(data => {
                        _this.isload=false;
                        if (data.Code == 1) {

                        } else {
                            _this.$message({
                                message: data.Message,
                                showClose: true,
                                type: 'warning'
                            });
                        }
                    }).catch(err => {
                        _this.isload=false;
                        _this.$message({
                            message: '服务器异常，请稍后重试',
                            showClose: true,
                            type: 'error'
                        });
                    })
                }
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .caselaw{
        .fl();
        width:100%;
        /*height:100%;*/
        height:11.55rem;
        min-height:11.55rem;
        /*左侧栏*/
        .caselaw-left{
            position:relative;
            height:100%;
            .title{
                width:4.7rem;
                line-height:.77rem;
                text-align: center ;
                color: #303133;
                .f22();
                border-bottom:1px solid #DCDFE6;
            }
            .menu{
                width:4.7rem;
                cursor:pointer;
                .el-tree-node__content{
                     height:.58rem;
                    .el-tree-node__label{
                        .f22();
                    }
                    /*icon*/
                    .el-icon-caret-right:before {
                        font-size: .2rem;
                    }
                    .el-checkbox__inner:before{
                        top: .07rem;
                        height: .02rem;
                    }
                }
                /*span*/
                .el-tree-node__label{
                    .f20();
                    color: #303133;
                }
                /*checkbox*/
                .el-checkbox__inner{
                    width:.18rem;
                    height:.18rem;
                }
                /*选中*/
                .el-checkbox__inner:after{
                    top: .02rem;
                    left: .06rem;
                    width: .04rem;
                    height: .08rem;
                }
            }
            /*左侧底部查询*/
            .select-btn{
                width:4.7rem;
                position:absolute;
                left:0;
                bottom:.1rem;
                text-align: center;
                .el-button{
                    width:1.48rem;
                    height:.48rem;
                    padding: 0;
                    span{
                        .f20();
                    }
                }
            }
        }
        /*分隔符*/
        .f-g{
            width:.1rem;
            height:11.55rem;
            background:#f5f6fa;
        }
        /*右侧栏*/
        .caselaw-right{
            width:12.89rem;
            height:11.35rem;
            position:relative;
            .tabpage{
                margin-top:.2rem;
                .el-tabs__header{
                    margin-bottom:0;
                }
                /*布局*/
                .el-tabs__header{
                    .fr();
                    padding-right:.2rem;
                }
                .el-tabs__item{
                    width:2.68rem;
                    text-align: center ;
                    height:.56rem;
                    line-height:.56rem;
                    .f20();
                    color: #606266;
                }
                .el-tabs--card>.el-tabs__header .is-active{
                    border-left:1px solid #2f8ded;
                }
                /*激活标签*/
                .is-active{
                    color:#409eff;
                    background: rgba(47,141,237,0.10);
                    border: 1px solid #2F8DED;
                    border-bottom-color: #2F8DED!important;
                    border-left-color: #2F8DED!important;
                }
            }
            /*查询摸块*/
            .search-box{
                border-top:1px solid #E4E7ED;
                padding:.2rem .25rem;
                white-space: nowrap;
                .fl();
                &>div{
                    color: #303133;
                    .f20();
                }
                /*法院名称*/
                .name-d{
                    .el-input__inner{
                        width:1.87rem;
                        height:.48rem;
                        line-height:.48rem;
                        margin:0 .2rem 0 .1rem;
                        background: #F0F2F5;
                        .f20();
                    }
                }
                /*裁判日期*/
                .date-d{
                    .el-input:first-of-type{
                        margin-left:.1rem;
                    }
                    .el-input{
                        width:2rem;
                        .el-input__inner{
                            width:2rem;
                            height:.48rem;
                            line-height:.48rem;
                            .f20();
                            background: #F0F2F5;
                            padding:0 .2rem 0 .4rem;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: .25rem;
                        line-height: .48rem;
                    }
                    .el-icon-date:before{
                        font-size:.18rem;
                    }
                }
                /*检索*/
                .search-d{
                    margin-left:.2rem;
                    .el-input{
                        width:1.69rem;
                        margin-right: .2rem;
                    }
                    .el-input__inner{
                        width:1.69rem;
                        height:.48rem;
                        line-height:.48rem;
                        margin:0 .2rem 0 .1rem;
                        .f20();
                        background: #F0F2F5;
                    }
                }
                /*查询*/
                .select-d{
                    /*position:absolute;*/
                    /*left:0;*/
                    /*bottom:.1rem;*/
                    .el-button{
                        padding:0;
                        width:1rem;
                        height:.48rem;
                        span{
                            .f20();
                        }
                    }
                }
            }
        }
    }
</style>