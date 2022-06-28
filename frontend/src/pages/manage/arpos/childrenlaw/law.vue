<template>
    <div class="law">
        <!--加载loading-->
        <loading class="rgba" :load="isload" :text="loadingtext" />
        <!--存放内容-->
        <div class="table-cell">
            <div class="title">
                <div class="le">法律法规</div>
                <div class="ri">发布时间</div>
            </div>
            <div class="content" v-for="item in tableData3">
                <div class="le" @click="checkdetail()">{{item.address}}</div>
                <div class="ri">{{item.date}}</div>
            </div>
        </div>
        <!--分页-->
        <el-pagination
                class="page"
                :page-size="10"
                :pager-count="5"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total=total>
        </el-pagination>
        <!--查看详情弹框-->
        <lawalert @selectshow="selectshow" :alertshow="show" ref="lawalert"/>
    </div>
</template>

<script>
    import loading from "../component/loading" //loading
    import lawalert from "../component/lawalert"
    export default {
        name: "law",
        components: {
            loading,
            lawalert,
        },
        data() {
            return {
                name:'',//查询的名称
                tabtype:'',//查询的类型
                //loading
                isload:false,
                loadingtext:"努力加载中，请稍后...",
                show:false,//弹框
                tableData3: [{
                    date: '2016-05-03',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                //分页
                page:1,//当前页
                total:100,//总条数
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
            //获取接收的参数
            getname(val,type,total){
                this.name=val;
                this.tabtype=type;
                if(total)this.total=total;
            },
            //查看详情
            checkdetail(){
                let _this=this;
                //调用子组件的方法
                _this.show=true;
                _this.$refs.lawalert.gethttp(12,1,true,false)//catinid法规id,1当前页码,true是第一次加载,false控制背景变量
            },
            //关闭查看详情弹框
            selectshow(){
                this.show=false;
            },
            //分页
            //当前页数
            handleCurrentChange(page){
                //this.page=page;
                this.gethttp(this.tabtype,page);
            },
            //获取数据接口请求
            gethttp(type,page){
                let _this=this;
                _this.isload=true;
                _this.$http.post('/vehicle-examine/car-order-list', {
                    name:_this.name,
                    type:type,
                    pageindex:page
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
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .law{
        position:relative;
        .table-cell{
            width:14rem;
            height:7.95rem;
            overflow: auto;
            margin:.2rem auto;
            border-top:1px solid #EBEEF5;
            &>div.title,&>div.content{
                .fl();
            }
            .title{
                text-align: center ;
                line-height:.71rem;
                background:#F5F7FA;
                &>div{
                    border-right:1px solid #EBEEF5;
                    .f20();
                    color: #303133;
                }
                .le{
                    width:8.91rem;
                    border-left:1px solid #EBEEF5;
                }
                .ri{
                    width:5.091rem;
                }
            }
            .content{
                line-height:.7rem;
                &:hover{
                    background:#F5F7FA;
                    cursor: pointer;
                }
                &>div{
                    border-right:1px solid #EBEEF5;
                    border-bottom:1px solid #EBEEF5;
                    .f20();
                    color: #606266;
                }
                .le{
                    width:8.91rem;
                    border-left:1px solid #EBEEF5;
                    padding:0 .68rem;
                    color:#1567BA;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .ri{
                    width:5.091rem;
                    text-align: center ;
                }
            }
        }
        /*分页*/
        .page{
            text-align: center;
            li{
                .f18();
            }
        }
    }
</style>