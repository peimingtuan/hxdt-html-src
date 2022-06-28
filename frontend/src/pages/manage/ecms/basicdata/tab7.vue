<template>
    <div class="tab7">
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
                <el-table-column prop="audioRoleName" label="音频角色名称" show-overflow-tooltip>
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
    import addbasicAlert from "./tab7/addbasicAlert7" //添加弹框
    export default {
        name: "tab7",
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
            getAudioRoleConfigs(){
                let {pageIndex,pageSize}=this;
                const that=this;
                that.$showLoading('rgba')
                that.$http.post('/audioRoleConfig/getAudioRoleConfigs', {
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
                if(!formLabelAlign.audioRoleName){
                    this.$msgw("请输入音频角色名称!")
                    return
                }
                const that=this;
                that.$showToast('正在保存...')
                that.$http.post('/audioRoleConfig/saveOrUpdateAudioRoleConfig', {
                    audioRole:formLabelAlign
                }).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.ismain=false;
                        that.$msgs('保存成功!');
                        that.getAudioRoleConfigs()
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
                    _this.$http.post('/printServerConfig/deleteAudioRoleConfig',{
                        audioRole:{
                            audioRoleId:row.audioRoleId
                        }
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getAudioRoleConfigs()
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
                this.getAudioRoleConfigs();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .tab7 {
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