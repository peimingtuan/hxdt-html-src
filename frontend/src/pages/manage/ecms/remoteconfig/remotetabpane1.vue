<template>
    <div class="remotetabpanel">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <!-- <div class="ri">
                <el-input v-model.trim="keyWord" placeholder="按条件搜索"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            </div> -->
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    @cell-click="cellClick"
                    @select="selectcheck"
                    @select-all="selecAlltcheck"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="trialRoomTypeName" label="庭审室类型名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="trialRoomTypeDesc" label="描述" show-overflow-tooltip>
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
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addremoteAlert1 ref="addremoteAlert1" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addremoteAlert1 from "./addremoteAlert1" //添加弹框
    export default {
        name: "remotetabpanel",
        components: {
            addremoteAlert1,
        },
        data() {
            return {
                ismain:false,
                input:"",//搜索
                tableData:[],//列表,
                keyWord:'',//输入关键词
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
            }
        },
        created() {
            this.getTrialRoomTypeInfos()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //庭审室类型列表
            getTrialRoomTypeInfos(){
                let {keyWord,pageIndex,pageSize}=this;
                let _this=this;
                return _this.$http.post('/remoteTrial/getTrialRoomTypeInfos',{
                    keyWord,//搜索关键词
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/remoteTrial/getTrialRoomTypeInfos')
                    //_this.$msge('服务器异常，请稍后重试');
                })
            },
            // 分页
            handleCurrentChange(val){
                this.pageIndex = val;
                this.getTrialRoomTypeInfos();
            },
            //搜索信息
            search(v){
                let _this=this;
                _this.pageIndex=1;
                _this.$showLoading('rgba');
                _this.getTrialRoomTypeInfos().then(()=>{
                    _this.$hideLoading('rgba');
                });
            },
            //添加弹框
            add(){
                this.$refs.addremoteAlert1.text = '添加庭审室类型';
                this.$refs.addremoteAlert1.formLabelAlign={
                        trialRoomTypeId:'',
                        trialRoomTypeName: '',
                        trialRoomTypeDesc: '',
                }
                this.ismain=true;

            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                let _this=this;
                let url='/remoteTrial/updateTrialRoomTypeInfo';//更新
                if(formLabelAlign.trialRoomTypeId=='')url='/remoteTrial/addTrialRoomTypeInfo';//新增
                _this.$showToast('正在保存...')
                _this.$http.post(url,formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功');
                        _this.getTrialRoomTypeInfos()
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,url)
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //修改当前行信息
            edit(index,row){
                for(let i in row){//修改逻辑处理
                    if(this.$refs.addremoteAlert1.formLabelAlign.hasOwnProperty(i))this.$refs.addremoteAlert1.formLabelAlign[i]=row[i];
                }
                this.$refs.addremoteAlert1.text = '修改庭审室类型';
                this.ismain=true;
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/remoteTrial/deleteTrialRoomTypeInfo', {
                        trialRoomTypeId:row.trialRoomTypeId//要删除的庭审室类型id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getTrialRoomTypeInfos();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch((err) => {
                    console.log(err)
                });
            },
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .remotetabpanel{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
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