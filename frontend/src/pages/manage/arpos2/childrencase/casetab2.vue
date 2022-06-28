<template>
    <div class="casetab2">
        <!--存放内容-->
        <!--筛选条件-->
        <div class="filter">
            <el-button round>圆角按钮2</el-button>
            <el-button round>圆角按钮2</el-button>
            <el-button round>圆角按钮2</el-button>
            <span class="sort-s" :class="sort==true?'':'sortcolor'" @click="sort2()">
                裁判日期2
                <img v-if="sort" src="../images/caselaw/sort.png"/>
                <img v-else src="../images/caselaw/check-sort.png"/>
            </span>
        </div>
        <!--存放内容-->
        <div class="table-cell">
            <div class="content" v-for="(item,index) in textlist">
                <div class="le">
                    <div class="index">
                        <div>{{index+1}}</div>
                    </div>
                    <div class="ce">
                        <div class="d-1" @click="gocasetext()">{{item.title}}</div>
                        <div class="d-2">{{item.text}}</div>
                    </div>
                </div>
                <div class="ri">
                    <el-button @click="relatedlaws">关联法规</el-button>
                </div>
            </div>
        </div>
        <!--分页-->
        <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="2"
                :page-sizes="[10, 5]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "casetab2",
        data() {
            return {
                //法律内容
                textlist:[
                    {
                        title:'第一百九十条',
                        text:'(2018)级27民法',
                        text1:'河北高级人民法院',
                        text2:'判决  2018'
                    },
                    {
                        title:'第一百九十条',
                        text:'(2018)级27民法',
                        text1:'河北高级人民法院',
                        text2:'判决  2018'
                    }
                ]
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
        methods: {
            //排序
            sort2(){
                console.log(3)
                this.sort=!this.sort;
            },
            //关联法规
            relatedlaws(){
                this.$emit('relatedlaws');
            },
            //查看详情
            gocasetext(){
                this.$router.push({
                    path:'/casetext',
                    query:{
                        id:12 //id
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .casetab2{
        /*筛选*/
        .filter{
            margin: 0 .5rem;
            padding: .2rem 0;
            position:relative;
            border-bottom: 1px solid #E4E7ED;
            .sortcolor{
                color:#2f8ded;
            }
            .el-button{
                width:1.26rem;
                height:.42rem;
                /*line-height:.42rem;*/
                span{
                    .f18();
                }
            }
            .el-button.is-round{
                border-radius:.2rem;
                padding:0;
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
                        .d-1{
                            cursor:pointer;
                            .f20();
                            line-height:.38rem;
                            color: #303133;
                        }
                        .d-2{
                            .f18();
                            margin-top:.1rem;
                            line-height:.24rem;
                            color: #606266;
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