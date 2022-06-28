<template>
    <div class="tab6">
        <div class="top-btn">
            <div class="add" @click="add()">
                <img src="../images/yingyongpeizhi/add.png"/>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" width="100px" label="序号" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="viewName" label="视角名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="viewCode" label="视角代码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="来源" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.source=='1'?'法标':'本地添加'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
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
                    :current-page=pageSize
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addbasic-alert
                ref="addbasicAlert"
                :alertshow="ismain"
                @selectshow="ismain=false"
                @qure="addlawsure"
                @cancel="ismain=false"
        />
    </div>
</template>

<script>
    import addbasicAlert from "./tab6/addbasicAlert6" //添加弹框
    export default {
        name: "tab6",
        components:{
            addbasicAlert,
        },
        data() {
            return {
                ismain:false,
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:0,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            getViewConfigs(){
                let {pageIndex,pageSize}=this;
                const that=this;
                that.$showLoading('rgba')
                that.$http.post('/viewConfig/getViewConfigs', {
                    pageIndex,
                    pageSize
                }).then(data => {
                    that.$hideLoading('rgba')
                    if (data.code === 200) {
                        that.total=data.count;
                        that.tableData=data.data;
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideLoading('rgba')
                })
            },
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //添加弹框
            add(){
                this.ismain=true;
                this.$refs.addbasicAlert.show()
            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                if(!formLabelAlign.viewName){
                    this.$msgw("请输入视角名称!")
                    return
                }
                if(!formLabelAlign.viewCode){
                    this.$msgw("请输入视角代码!")
                    return
                }
                let r=/^\+?[0-9][0-9]*$/;
                if(!r.test(formLabelAlign.viewCode)){
                    this.$msgw("视角代码必须为非负整数!")
                    formLabelAlign.viewCode='';
                    return
                }
                const that=this;
                that.$showToast('正在保存...')
                that.$http.post('/viewConfig/saveOrUpdateViewConfig', {
                    view:formLabelAlign
                }).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.ismain=false;
                        that.$msgs('保存成功!');
                        that.getViewConfigs()
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideToast()
                })
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                this.$refs.addbasicAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                const _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/viewConfig/deleteViewConfig',{
                        view:{
                            viewId:row.viewId
                        }
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getViewConfigs()
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getViewConfigs();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .tab6 {
        .mr();
        .top-btn {
            .fl();
            cursor: pointer;
            margin-bottom: .1rem;

            & > div {
                margin-right: .1rem;

                img {
                    width: .8rem;
                }
            }
        }
        @import url('../css/uppage.less');
    }
</style>