<template>
    <div class="caselaw">
        <!--加载loading-->
        <!--<loading :class="isrgba?'rgba':''" :load="isload" :text="loadingtext" ref="loading"/>-->
        <!--左侧菜单栏-->
        <div class="caselaw-left">
            <div class="title">
                相关案列
            </div>
            <div class="menu">
                <!--树形菜单-->
                <el-tree
                        :props="defaultProps"
                        :load="loadNode"
                        lazy
                        show-checkbox
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
                        <casetab1 @relatedlaws="relatedlaws" :key="index" ref="casetab1"/>
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
    import loading from "../component/loading" //loading
    import casealert from "../component/casealert"
    import casetab1 from "../childrencase/casetab1"
    import {mapState,mapMutations,mapActions} from 'vuex'
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
                        name:'最高院指导案例'
                    },
                    {
                        id:'second',
                        name:'山东高院参考案例'
                    },
                    {
                        id:'three',
                        name:'法院裁判文书'
                    }
                ],
                //loading
                isrgba:false,
                isload:false,//loading
                loadingtext:'正在查询，请稍后...',
                show:false,//关联法规弹框
                //案由树配置
                defaultProps: {
                    children: 'parentid2',
                    label: 'causename',
                    isLeaf: 'causeTypeId'
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

        },
        mounted() {
            //初始化
            if(this.$route.query.causeName && this.$route.query.causeid){
                //根据案由名称，获取案由id,如果有案由id了，则直接省去这个步骤
                this.checklist.push(this.$route.query.causeid)
                this.$store.commit('setcaseidlist',this.checklist.join(','))
                this.$store.commit('sethttpurl','/cms/nosecure/getCaseListWebPage.action')
                switch (this.activeName) {
                    case 'first':
                        this.$refs.casetab1[0].gethttp();
                        break;
                    case 'second':
                        this.$refs.casetab1[1].gethttp();
                        break;
                    case 'three':
                        this.$refs.casetab1[2].gethttp();
                        break;
                }
            }else{
                this.$msgw("没有获取到案由id和案由名称")
            }
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
            ...mapActions('caselaw',[
                "getcasetree",
            ]),
            //初始化
            async creatTree(){
                this.isload=true;
                await this.getcasetree(this)//返回案由树
                //this.leftselect() //初始化查询
                this.isrgba=true;
                this.checklist=[];//清空选中项
                this.$store.commit('setcaseidlist',this.checklist.join(','))
            },
            //左侧树形菜单
            handleCheckChange(data,node,index){
                //console.log(data);//该节点所对应的对象
                // console.log(data.causeid)
                // console.log(node);//该节点是否被选中
                // console.log(index);//节点的子树中是否有被选中的节点
                if(node){
                    this.checklist.push(data.causeid)
                    //数组先去重
                    this.checklist=[...new Set(this.checklist)]
                }else{
                    let index = this.checklist.indexOf(data.causeid);
                    this.checklist.splice(index, 1);
                }
                //console.log(this.checklist)
                this.$store.commit('setcaseidlist',this.checklist.join(','))
            },
            //当前节点
            handleNodeClick(data) {
                console.log(data);
                //this.leftselect();
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{causeid:this.$route.query.causeid,causename: '认为侵犯土地承包经营自主权',causeTypeId:false,parentid2:[] }]);
                }
                // if (node.level > 1) return resolve([]);
                let that=this;
                that.$http.post('/cms/nosecure/getCasecauseTreeWebPage.action', {
                    causeid:node.data.causeid || '1492',//案由id,
                }).then(data => {
                    if (data.Code == 1) {
                        if(data.Result.length!==0){
                            data.Result.map((item)=>{
                                if(item.causeTypeId==3)item.causeTypeId=true
                            })
                        }
                        that.changetree(data.Result)
                        resolve(that.causelist)//法规名称列表
                    } else {
                        that.$msgw(data.Message);
                    }
                }).catch(err => {
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //左侧底部查询
            leftselect(){
                let _this=this;
                if(_this.checklist.length==0){
                    _this.$msgw('请选择要查询的项');
                    return;
                }
                _this.isload=true;
                //调用子组件方法
                _this.changestate('first')//当前活跃tab
                _this.$store.commit('sethttpurl','/cms/nosecure/getCaseListWebPage.action')
                _this.$refs.casetab1[0].gethttp('最高院指导案列',1,true)//左侧查询
            },
            //tab页签切换事件
            handleClick(data){
                let _this=this;
                _this.Instrumentcase=data.label,//最高法指导案例/本省高院典型案例/法院裁判文书
                _this.changestate(data.name)//当前活跃tab
                //调用子组件方法
                _this.$refs.casetab1[data.index].gethttp(data.label,1,true)//
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
                    _this.$msgw('请选择查询条件');
                }else{
                    if(_this.datestartval!=''&&_this.dateendval==''){
                        _this.$msgw('请选择日期结束时间');
                        return
                    }else if(_this.datestartval==''&&_this.dateendval!=''){
                        _this.$msgw('请选择日期开始时间');
                        return
                    }else if(_this.lawname.replace(/(^\s*)|(\s*$)/g, '')==''){
                        _this.$msgw('请输入法院名称');
                        return
                    }
                    _this.$store.commit('setkeyword',_this.searchname.replace(/(^\s*)|(\s*$)/g, ''))
                    _this.$store.commit('setStartdate',_this.datestartval)
                    _this.$store.commit('setEnddate',_this.dateendval)
                    _this.$store.commit('setCourtName',_this.lawname.replace(/(^\s*)|(\s*$)/g, ''))
                    _this.$store.commit('sethttpurl','/cms/nosecure/getKeywordWebPage.action')
                    _this.$store.commit('setcaseidlist',_this.checklist.join(','))
                    console.log(_this.$store.state.caseidlist)
                    switch (_this.activeName) {
                        case 'first':
                            _this.$refs.casetab1[0].gethttp();
                            break;
                        case 'second':
                            _this.$refs.casetab1[1].gethttp();
                            break;
                        case 'three':
                            _this.$refs.casetab1[2].gethttp();
                            break;
                    }
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
                height:10rem;
                overflow: auto;
                cursor:pointer;
                .el-tree-node__content{
                     height:.58rem;
                    .el-tree-node__label{
                        width:4.7rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
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
                    .el-input{
                        width:1.87rem;
                        margin-right: .2rem;
                    }
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