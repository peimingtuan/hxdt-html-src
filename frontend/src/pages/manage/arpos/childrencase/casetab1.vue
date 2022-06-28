<template>
    <div class="casetab1" ref="casetab1">
        <!--存放内容-->
        <!--筛选条件-->
        <div class="filter">
            <el-button round @click.stop="filterclick(tab)" :class="checkfilter==tab.id?'checked':''" v-for="(tab,index) in filter" :key="index">
                <span v-if="checkfilter==tab.id">
                    {{tab.name}}
                </span>
                <span v-else>{{tab.name}}</span>
            </el-button>
            <!--暂时隐藏-->
            <!--<span class="sort-s" :class="sort==true?'':'sortcolor'" @click="sort2()">-->
                <!--裁判日期-->
                <!--<img v-if="sort" src="../images/caselaw/sort.png"/>-->
                <!--<img v-else src="../images/caselaw/check-sort.png"/>-->
            <!--</span>-->
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
                        <div class="d-1" @click="gocasetext(item)">{{item.casename}}</div>
                        <div class="d-2">
                            <span>{{item.wordno}}</span>
                            <span>{{item.refereecourt}}</span>
                            <span>{{item.state}}</span>
                            <span>{{item.date}}</span>
                        </div>
                    </div>
                </div>
                <div class="ri">
                    <el-button @click="relatedlaws(item.caseid)">关联法规</el-button>
                </div>
            </div>
            <div class="empty" v-if="textlist.length===0">暂无数据</div>
        </div>
        <!--分页-->
        <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=pageindex
                :page-sizes="[7]"
                :page-size=size
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
        </el-pagination>
    </div>
</template>

<script>
    import $ from "jquery"
    import loading from "../component/loading" //loading
    import {mapState,mapMutations,mapActions} from 'vuex'
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
            ...mapActions('casetab',[
                "getinfo",
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
            //排序
            //sort2(){
               //this.sort=!this.sort;
                //this.pageindex=1;
                //this.gethttp();
           //},
            //查看详情
            gocasetext(item){
                this.$router.push({
                    path:'/casetext',
                    query:{
                        caseid:item.caseid, //id
                        casetype:item.state //类别
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
                //this.gethttp()
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
                _this.getinfo(_this);
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
            /*暂无数据*/
            .empty{
                line-height:.8rem;
                text-align: center;
                color: #2F8DED;
                .f22()
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