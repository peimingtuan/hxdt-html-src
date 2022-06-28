<template>
    <div class="administration">
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
                :page-size="20"
                :pager-count="6"
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>
        <!--查看详情弹框-->
        <lawalert @selectshow="selectshow" :alertshow="show"/>
    </div>
</template>

<script>
    import lawalert from "../component/lawalert"
    export default {
        name: "administration",
        components: {
            lawalert,
        },
        data() {
            return {
                show:false,//弹框
                tableData3: [{
                    date: '2016-05-03',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
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
            //查看详情
            checkdetail(){
                this.show=true;
            },
            //关闭查看详情弹框
            selectshow(){
                this.show=false;
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .administration{
        .table-cell{
            width:14rem;
            height:7.95rem;
            /*overflow-y: scroll;*/
            margin:.2rem auto;
            border-top:1px solid #EBEEF5;
            &>div{
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
                    padding-left:.68rem;
                    color:#1567BA;
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