<template>
    <div class="platform">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <!--<div class="add" @click="add()">-->
                <!--<img src="../images/yingyongpeizhi/add.png"/>-->
            <!--</div>-->
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="platformTypeName" label="平台类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="platformIp" label="IP地址" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="platformPort" label="端口号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="description" label="说明" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column prop="ruleName" label="使用规则" show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <!--<span @click="delinfo(scope.$index, scope.row)">删除</span>-->
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
        <addplatformAlert ref="addplatformAlert" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import leftTile from "../component/leftTile" //主页左侧头部
    import addplatformAlert from "../platform/addplatformAlert" //添加弹框
    export default {
        name: "platform",
        components: {
            leftTile,
            addplatformAlert
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/pingtaipeizhi3.png'),
                text:'平台配置',
                text2:'PING TAI PEI ZHI',
                ismain:false,
                tableData:[],//平台配置列表
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10//每页大小
            }
        },
        beforeCreate() {

        },
        created() {
            //获取平台配置信息列表
            this.getplatforminfo()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取平台配置信息列表
            getplatforminfo(){
                let {pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba');
                _this.$http.post('/platformConfig/getAllPlatformConfigs',{
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideLoading('rgba');
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba');
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //添加法庭弹框
            add(){
                this.ismain=true;
                //调用子组件方法
                this.$refs.addplatformAlert.show();
            },
            //关闭添加法庭弹框
            addlawsure(){
                //调用子组件方法
                let _this=this;
                _this.$refs.addplatformAlert.saveinfo1().then(data=>{
                    if(data.code===200){
                        _this.ismain=false;
                        _this.getplatforminfo()
                    }
                })
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                //调用子组件方法
                this.$refs.addplatformAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/platformConfig/deletePlatformById', {
                        platformId:row.platformId//平台id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getplatforminfo()
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getplatforminfo();
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .platform{
        .mr();
        padding: 0 .2rem;
        .head{
            padding: .1rem 0;
            .fb();
            .add{
                cursor:pointer;
            }
        }
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>