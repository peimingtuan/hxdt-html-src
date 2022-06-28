<template>
    <div class="tdsModule1">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../../images/yingyongpeizhi/add.png" />
                </div>
                <div class="showtemplate" @click="showtemplate()">
                    <img src="../../images/yingyongpeizhi/xianshipeizhi.png" />
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
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod"></el-table-column>
                <el-table-column prop="tdsName" label="显示屏名称" width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tdsIp" label="显示屏IP" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tdsPort" label="显示屏端口" show-overflow-tooltip></el-table-column>
                <el-table-column prop="templetName" label="显示模板" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tdsVersion" label="软件版本" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tdsState">在线</span>
                        <span v-else>离线</span>
                    </template>
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
                    :current-page="1"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
            ></el-pagination>
        </div>
        <!--添加弹框-->
        <addoutAlert3
                ref="addoutAlert3"
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
    import addoutAlert3 from "./addoutAlert3"; //添加弹框
    import templateAlert from "./templateAlert"; //显示模板弹框
    export default {
        name: "tdsModule1",
        components: {
            addoutAlert3,
            templateAlert
        },
        data() {
            return {
                ismain: false,
                isMain2:false,
                tableData: [],
                total: 0,
                keyWord: "",
                pageIndex: 1, //当前页码
                pageSize: 10,
                multipleSelection: []
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            //获取公告系统TDS配置列表
            getTDSClients() {
                let { keyWord, pageIndex, pageSize } = this;
                let _this = this;
                _this.$showLoading("rgba");
                return _this.$http
                    .post("/tdsconfig/getTDSClients", {
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
                        console.log(err, "/tdsconfig/getTDSClients");
                    });
            },
            //搜索信息
            search(v) {
                let _this = this;
                _this.pageIndex = 1;
                _this.getTDSClients()
            },
            //添加弹框
            add() {
                this.ismain = true;
                this.$refs.addoutAlert3.getTDSClient();
            },
            //关闭添加弹框
            addlawsure() {
                let that = this;
                if (
                    !that.$refs.addoutAlert3.formLabelAlign.tdsClientTemplet.tdsTempletType
                ) {
                    that.$msgw("请选择显示模板");
                    return false;
                }
                if (!that.$refs.addoutAlert3.formLabelAlign.tdsClient.title) {
                    that.$msgw("请输入界面标题");
                    return false;
                }
                let index=0;
                that.$refs.addoutAlert3.formLabelAlign.tdsCourtRoomRelations.map(item=>{
                    if(item.tdsUsed)index ++;
                })
                if(index===0){
                    that.$msgw("请选择法庭")
                    return
                }
                if(that.$refs.addoutAlert3.formLabelAlign.tdsClientTemplet.tdsTempletType!=='TDS-A'){
                    let n=0;
                    that.$refs.addoutAlert3.formLabelAlign.tdsCourtRoomRelations.map(item=>{
                        if(item.tdsUsed)n ++;
                    })
                    if(n>1){
                        that.$msgw("对应法庭只能勾选一个")
                        return
                    }
                }
                that.$refs.addoutAlert3.saveTDSClient().then(data => {
                    if (data.code === 200) {
                        that.ismain = false;
                        that.getTDSClients();
                    }
                });
            },
            //修改当前行信息
            edit(index, row) {
                this.ismain = true;
                this.$refs.addoutAlert3.getTDSClient(row.tdsId);
            },
            //删除当前行内容
            delinfo(index, row) {
                let _this = this;
                this.$confirm("确认删除", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        _this.$http
                            .post("/tdsconfig/deleteTDSClient", {
                                tdsId: row.tdsId //要删除的tds id
                            })
                            .then(data => {
                                if (data.code === 200) {
                                    _this.$msgs("删除成功!");
                                    //计算总页数
                                    if (index == 0 && Math.ceil(Number(_this.total) / 10) == Number(_this.pageIndex) && _this.pageIndex != 1 && Number(_this.total) % 10 == 1) {
                                        _this.pageIndex = Number(_this.pageIndex) - 1;
                                    }
                                    _this.getTDSClients();
                                } else {
                                    _this.$msgw(data.message);
                                }
                            })
                            .catch(err => {
                                console.log(err, "/tdsconfig/deleteTDSClient");
                                _this.$msge("服务器异常，请稍后重试");
                            });
                    })
                    .catch(() => {});
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
            //分页信息
            //当前页数
            handleCurrentChange(page) {
                this.pageIndex = page;
                this.getTDSClients();
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    .tdsModule1 {
        .mr();
        .top {
            margin-bottom: .1rem;
            .fb();
            .le {
                .fl();
                cursor: pointer;
                & > div {
                    margin-right: 0.1rem;
                    img {
                        width: 1.2rem;
                    }
                }
                & > div.add {
                    img {
                        width: 0.8rem;
                    }
                }
            }
            .ri {
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: 0.1rem;

                    .el-input__inner {
                        height: 0.4rem;
                        line-height: 0.4rem;
                        padding: 0 0.15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    position: relative;
                    top: -0.02rem;
                    width: 0.9rem;
                    line-height: 0.36rem;
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
        @import url("../../css/element.less");
    }
</style>
<style lang="less" scoped>
    @import url("../../css/uppage.less");
</style>