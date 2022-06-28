<template>
    <div class="basictabpane2">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model="keyWord" placeholder="输入搜索内容"></el-input>
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
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="courtRoomTypeName" label="法庭类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
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
        <addotherAlert2 :formLabelAlign="formLabelAlign" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addotherAlert2 from "./addotherAlert2" //添加弹框
    export default {
        name: "basictabpane2",
        components: {
            addotherAlert2
        },
        data() {
            return {
                keyWord:'',//输入关键词
                ismain:false,
                tableData:[],//信号源配置列表
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                formLabelAlign: {
                    courtRoomTypeId:'',//法庭类型id
                    courtRoomTypeName:'',//视角名称
                    description:'',//描述
                },
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取法庭类型配置列表
            getlawTypelist(){
                let {keyWord,pageIndex,pageSize}=this;
                let _this=this;
                 return _this.$http.post('/otherConfig/searchCourtRoomTypeConfig', {
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
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //搜索信息
            search(v){
                let _this=this;
                _this.pageIndex=1;
                _this.$showLoading('rgba');
                _this.getlawTypelist().then(()=>{
                    _this.$hideLoading('rgba');
                });
            },
            //添加弹框
            add(){
                this.formLabelAlign={
                    courtRoomTypeId:'',//法庭类型id
                    courtRoomTypeName:'',//视角名称
                    description:'',//描述
                }
                this.ismain=true;
            },
            //确定关闭添加弹框
            addlawsure(formLabelAlign){
                let _this=this;
                let url='/otherConfig/updateCourtRoomTypeConfig';//更新
                if(formLabelAlign.courtRoomTypeId=='')url='/otherConfig/addCourtRoomTypeConfig';//新增
                _this.$showToast('正在保存...')
                _this.$http.post(url,formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功');
                        _this.getlawTypelist();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //修改当前行信息
            edit(index,row){
                for(let i in row){//修改逻辑处理
                    if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                }
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
                    _this.$http.post('/otherConfig/delCourtRoomTypeConfig', {
                        courtRoomTypeId:row.courtRoomTypeId//要删除的法庭类型id
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getlawTypelist();
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
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getlawTypelist();
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .basictabpane2{
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
        @import url('../../css/element.less');
    }
</style>
<style scoped>
    @import url('../../css/uppage.less');
</style>