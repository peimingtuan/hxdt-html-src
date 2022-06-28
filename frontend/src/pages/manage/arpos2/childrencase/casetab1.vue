<template>
    <div class="casetab1" ref="casetab1">
        <!--存放内容-->
        <!--筛选条件-->
        <div class="filter">
            <el-button round @click.stop="filterclick(tab)" :class="checkfilter==tab.id?'checked':''" v-for="(tab,index) in filter" :key="index">
                <span v-if="checkfilter==tab.id">{{tab.name}}
                    <el-cascader
                            v-model="liss"
                            placeholder=""
                            :options="options"
                            expand-trigger="hover"
                            show-all-levels="false"
                            size="mini"
                            filterable
                            change-on-select
                            @visible-change="visiblechange"
                            @change="changeclick"
                    ></el-cascader>
                </span>
                <span v-else>{{tab.name}}</span>
            </el-button>
            <span class="sort-s" :class="sort==true?'':'sortcolor'" @click="sort2()">
                裁判日期
                <img v-if="sort" src="../images/caselaw/sort.png"/>
                <img v-else src="../images/caselaw/check-sort.png"/>
            </span>
        </div>
        <!--存放内容-->
        <div class="table-cell">
            <!--加载loading-->
            <loading class="rgba" :load="isload" :text="loadingtext" />
            <div class="content" v-for="(item,index) in textlist">
                <div class="le">
                    <div class="index">
                        <div>{{index+1}}</div>
                    </div>
                    <div class="ce">
                        <div class="d-1" @click="gocasetext(item.id)">{{item.casename}}</div>
                        <div class="d-2">
                            <span>{{item.wordno}}</span>
                            <span>{{item.refereecourt}}</span>
                            <span>{{item.state}}</span>
                            <span>{{item.date}}</span>
                        </div>
                    </div>
                </div>
                <div class="ri">
                    <el-button @click="relatedlaws(item.id)">关联法规</el-button>
                </div>
            </div>
        </div>
        <!--分页-->
        <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=pageindex
                :page-sizes="[10, 5]"
                :page-size=size
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
        </el-pagination>
    </div>
</template>

<script>
    import $ from "jquery"
    import http from "../js/http" //http请求
    import getApiUrl from "../js/getApiUrl"
    import loading from "../component/loading" //loading
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "casetab1",
        components: {
            loading,
        },
        data() {
            return {
                //loading
                isload:false,//loading
                loadingtext:'努力加载中，请稍后...',
                //弹框
                sort:true,
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一一致一致一致一致一致'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }]
                }],
                liss:'',//select输入值
                selectlist:[]
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('casetab',[
                "filter",
                "textlist",
                "checkfilter",
                "typetab",
                "typefilter",
                "total",
                "size",
                "pageindex",
            ])
        },
        methods: {
            ...mapMutations('casetab',[
                "changefilter",
                "changetextlist",
                "changecheckfilter",
                "changetypetab",
                "changetypefilter",
                "changetotal",
                "changesize",
                "changepageindex",
            ]),
            //筛选条件
            filterclick(tab){
                this.changefilter(tab.id);
                this.changetypefilter(tab.name);
                this.gethttp(this.typetab,1)
            },
            changeclick(node){//当前选中的项
                console.log(node)
                this.selectlist=node;
            },
            visiblechange(node){//下拉框出现与隐藏的触发true,false
                console.log(node)
                if(!node){//触发

                }
            },
            //排序
            sort2(){
               this.sort=!this.sort;
                this.pageindex=1;
                this.gethttp();
            },
            //查看详情
            gocasetext(id){
                this.$router.push({
                    path:'/casetext',
                    query:{
                        id:id //id
                    }
                })
            },
            //关联法规
            relatedlaws(val){
                this.$emit('relatedlaws',val);
            },
            //每页展示条数
            handleSizeChange(size){
                this.size=size;
                this.gethttp()
            },
            //当前页数
            handleCurrentChange(page){
                this.changepageindex(page);
                this.gethttp();
            },
            //接口请求,根据案由名称返回相关案列列表
            gethttp(id,page,bo){//第一层筛选id,当前页码第一页page，bo是否为最外层切换
                let _this=this;
                if(id&&page){
                    _this.changetypetab(id);
                    _this.changepageindex(page);
                }
                if(bo){
                    _this.changecheckfilter(_this.filter[0].id);
                    _this.changetypefilter(_this.filter[0].name);
                }
                _this.isload=true;
                http.post(getApiUrl('/vehicle-examine/car-order-list'), {
                    HeadWordName:_this.$route.query.name,//案由名称
                    type:_this.typetab,//第一层筛选
                    type2:_this.typefilter,//第二层筛选
                    sorts:1,//排序1为倒序0为正序
                    pagesize:5,//每页条数
                    pageindex:_this.pageindex //当前页数
                }).then(data => {
                    _this.isload=false;
                    if (data.Code == 1) {
                        _this.total=data.Result.count;//总条数
                        if(data.Result.caselist.length!=0){
                            _this.textlist=data.Result.caselist;//法规名称列表
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
                    _this.isload=false;
                    _this.$message({
                        message: '服务器异常，请稍后重试',
                        showClose: true,
                        type: 'error'
                    });
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .casetab1{
        /*筛选*/
        .filter{
            margin: 0 .5rem;
            padding: .2rem 0;
            position:relative;
            border-bottom: 1px solid #E4E7ED;
            //排序选中状态
            .sortcolor{
                color:#2f8ded;
            }
            //条件选中状态
            .checked{
                background:#2f8ded;
                color:#fff;
            }
            .el-button{
                /*width:1.26rem;*/
                /*height:.42rem;*/
                /*line-height:.42rem;*/
                position:relative;
                overflow: hidden;
                span{
                    .f18();
                }
                /*select样式*/
                .el-cascader{
                    position:absolute;
                    left:0;
                    top:0;
                    opacity:0;
                    background:pink;
                    .el-cascader__label{
                        padding:0;
                    }
                    .el-input__inner{
                        height:.4rem;
                        line-height:.4rem;
                    }
                }
            }
            .el-button.is-round{
                /*border-radius:.2rem;*/
                padding: .12rem .2rem;
            }
            .sort-s{
                position:absolute;
                right:0;
                bottom:.1rem;
                cursor: pointer;
                .f18();
                img{
                    width:.18rem;
                    margin-left:.1rem;
                }
            }
        }
        /*标签*/
        .table-cell{
            margin:0 .5rem;
            height:8.15rem;
            overflow: auto;
            .content{
                height:1.15rem;
                border-bottom: 1px solid #E4E7ED;
                .fb();
                .le{
                    .fl();
                    .index{
                        margin-right:.2rem;
                        padding-top: .2rem;
                        &>div{
                            width:.32rem;
                            line-height:.32rem;
                            border-radius:50%;
                            text-align: center ;
                            color:#fff;
                            .f20();
                            background:#2F8DED ;
                        }
                    }
                    .ce{
                        &>div{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 8rem;
                        }
                        .d-1{
                            cursor:pointer;
                            .f20();
                            line-height:.38rem;
                            color: #303133;
                        }
                        .d-2{
                            margin-top:.1rem;
                            line-height:.24rem;
                            span{
                                color: #606266;
                                .f18();
                                margin-right:.2rem;
                            }
                        }
                    }
                }
                .ri{
                    .el-button{
                        width:1.15rem;
                        height:.4rem;
                        padding:0;
                        border: 1px solid #2F8DED;
                        span{
                            .f20();
                            color:#2F8DED;
                        }
                    }
                }
            }
        }
        /*分页*/
        .page{
            margin:.2rem 0;
            span{
                .f18();
            }
            input{
                .f18();
            }
            text-align: center;
            li.number{
                .f18()
            }
        }
    }
</style>