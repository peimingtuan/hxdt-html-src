<template>
    <div class="info2">
        <div class="add">
            <img @click="add()" src="../images/yingyongpeizhi/add.png"/>
        </div>
        <div class="table-style">
            <el-table ref="multipleTable" :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="clientTypeName" label="客户端类型">
                </el-table-column>
                <el-table-column prop="clientName" label="客户端名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="netWorkIp" label="网卡IP">
                </el-table-column>
                <el-table-column prop="macAddress" label="网卡MAC地址" width="180px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否校验笔录">
                    <template slot-scope="scope">
                        <span v-if="scope.row.checkRecordNote==0">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index,scope.row)">修改</span>
                            <span @click="delinfo(scope.$index,scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--二次添加弹框-->
        <infoAlert2 ref="infoAlert2"/>
    </div>
</template>

<script>
    import infoAlert2 from "./infoAlert2" //二次添加弹框
    import {mapState} from 'vuex'
    export default {
        name: "info2",
        components: {
            infoAlert2
        },
        data() {
            return {
                tableData:[],//客户端信息列表,
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                multipleSelection:[],//表格存值
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        methods: {
            httpinfo(){
                let {courtRoomId,pageIndex,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getCourtRoomClientInfo',{
                    id:courtRoomId,//法庭id
                    pageIndex,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //二次弹框
            add(){
                //调用子组件方法
                this.$refs.infoAlert2.show()
            },
            //修改当前行信息
            edit(index,row){
                //调用子组件方法
                this.$refs.infoAlert2.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteCourtRoomClientInfo', {
                        clientIds:row.clientId//要删除的客户端id
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex==Number(_this.pageIndex)-1;
                            }
                            _this.httpinfo();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtRoomConfig/deleteCourtRoomClientInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                if(page){
                    this.pageIndex=page;
                    this.httpinfo();
                }
            },
        }
    }
</script>

<style lang="less">
    .info2{
        .add{
            cursor:pointer;
            margin-bottom:.1rem;
            img{
                width:.8rem;
            }
        }
        .table-style{
            max-height:5rem;
            overflow: auto;
        }
        @import url('../css/element.less');
    }
</style>