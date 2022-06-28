<template>
    <div class="tabpane2">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
                <div class="showtemplate" @click="showtemplate()">
                    <img src="../images/yingyongpeizhi/xianshipeizhi.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model.trim="keyWord" placeholder="按条件搜索"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search(keyWord)">搜索</el-button>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" width="100px" label="序号" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="casName" label="显示屏名称" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="casIp" label="显示屏IP" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="casPort" label="显示屏端口" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="templetName" label="显示模板" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="casVersion" label="软件版本" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tdsState">在线</span>
                        <span v-else>离线</span>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="presidingJudge" label="对应法庭" show-overflow-tooltip>-->
                <!--</el-table-column>-->
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addoutAlert2
                ref="addoutAlert2"
                :alertshow="ismain"
                @selectshow="ismain=false"
                @qure="addlawsure"
                @cancel="ismain=false"
        />
        <!--显示模板弹框-->
        <templateAlert
                ref="templateAlert"
                :isMain2="isMain2"
                @selectshow="isMain2=false"
                @qure="isMain2=false"
                @cancel="isMain2=false"
        />
    </div>
</template>

<script>
    import addoutAlert2 from "./tabpane2/addoutAlert2" //添加弹框
    import templateAlert from "./tabpane2/CAStemplateAlert"; //显示模板弹框
    export default {
        name: "tabpane2",
        components: {
            addoutAlert2,
            templateAlert
        },
        data() {
            return {
                ismain:false,
                isMain2:false,
                tableData:[],
                total: 0,
                keyWord:"",
                pageIndex: 1, //当前页码
                pageSize: 10,
                multipleSelection: []
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取公告系统TDS配置列表
            getCASClients() {
                let { keyWord, pageIndex, pageSize } = this;
                let _this = this;
                _this.$showLoading("rgba");
                return _this.$http
                    .post("/casconfig/getCASClients", {
                        keyWord, //搜索关键词
                        pageIndex, //当前页码
                        pageSize //每页大小
                    })
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {
                            _this.total = data.count;
                            _this.tableData = data.data;
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading("rgba");
                        console.log(err, "/casconfig/getCASClients");
                    });
            },
            //搜索信息
            search(v) {
                let _this = this;
                _this.pageIndex = 1;
                _this.getCASClients()
            },
            //添加弹框
            add(){
                this.ismain=true;
                this.$refs.addoutAlert2.getCASClient();
            },
            //关闭添加弹框
            addlawsure(){
                let that = this;
                if (
                    !that.$refs.addoutAlert2.formLabelAlign.casClientTemplet.casTempletType
                ) {
                    that.$msgw("请选择显示模板");
                    return false;
                }
                if (!that.$refs.addoutAlert2.formLabelAlign.casClient.title) {
                    that.$msgw("请输入界面标题");
                    return false;
                }
                that.$refs.addoutAlert2.saveCASClient().then(data => {
                    if (data.code === 200) {
                        that.ismain = false;
                        that.getCASClients();
                    }
                });
            },
            //修改当前行信息
            edit(index,row) {
                this.ismain = true;
                this.$refs.addoutAlert2.getCASClient(row.casId);
            },
            //删除当前行内容
            delinfo(index,row){
                let _this = this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http
                        .post("/casconfig/deleteCASClient", {
                            casId: row.casId
                        })
                        .then(data => {
                            if (data.code === 200) {
                                _this.$msgs("删除成功!");
                                //计算总页数
                                if (
                                    index == 0 &&
                                    Math.ceil(Number(_this.total) / 10) ==
                                    Number(_this.pageIndex) &&
                                    _this.pageIndex != 1 &&
                                    Number(_this.total) % 10 == 1
                                ) {
                                    _this.pageIndex = Number(_this.pageIndex) - 1;
                                }
                                _this.getCASClients();
                            } else {
                                _this.$msgw(data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err, "/casconfig/deleteCASClient");
                        });
                }).catch(() => {

                });
            },
            //显示模板弹框
            showtemplate() {
                this.isMain2 = true;
                this.$refs.templateAlert.getTableData();
                //this.$refs.templateAlert.$refs.upload.clearFiles()
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex - 1) * 10 + index + 1; //当前条数
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //当前页数
            handleCurrentChange(page) {
                this.pageIndex = page;
                this.getCASClients();
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpane2{
        .mr();
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div{
                    margin-right:.1rem;
                    img{
                        width:1.2rem;
                    }
                }
                &>div.add{
                    img{
                        width:.8rem;
                    }
                }
            }
            .ri{
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: .1rem;

                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width: .9rem;
                    line-height: .36rem;
                    padding: 0;

                    .el-icon-search {
                        .f18();
                        color: #fff;
                    }

                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>