<template>
    <div class="othertabpane5">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
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
                <el-table-column prop="deviceName" label="服务器名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="deviceIp" label="IP地址" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="operationSystem" label="操作系统" show-overflow-tooltip>
                </el-table-column>
                <!--<el-table-column prop="createdDate" label="用户名" show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column prop="description" label="说明" show-overflow-tooltip>
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
        <addotherAlert5 :formLabelAlign="formLabelAlign" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import addotherAlert5 from "./addotherAlert5" //添加弹框
    export default {
        name: "othertabpane5",
        components: {
            addotherAlert5
        },
        data() {
            return {
                ismain:false,
                tableData:[],
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                formLabelAlign: {
                    deviceId:'',//监控设备id
                    deviceName:'',//监控设备名称
                    deviceIp:'',//设备ip
                    operationSystem:'',//操作系统
                    diskAlarmThreshold:'',//磁盘报警阀值
                    memoryAlarmThreshold:'', //内存报警阀值
                    cpuAlarmThreshold:'', //cpu报警阀值
                    description:''//描述
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
            //获取设备监控管理列表
            getMonitorlist(){
                let {pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba');
                return _this.$http.post('/otherConfig/searchMonitorConfig', {
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
            //添加弹框
            add(){
                this.formLabelAlign={
                    deviceId:'',//监控设备id
                    deviceName:'',//监控设备名称
                    deviceIp:'',//设备ip
                    operationSystem:'',//操作系统
                    diskAlarmThreshold:'',//磁盘报警阀值
                    memoryAlarmThreshold:'', //内存报警阀值
                    cpuAlarmThreshold:'', //cpu报警阀值
                    description:''//描述
                }
                this.ismain=true;
            },
            //确定关闭添加弹框
            addlawsure(formLabelAlign){
                let _this=this;
                let url='/otherConfig/updateMonitorDeviceConfig';//更新
                if(formLabelAlign.deviceId=='')url='/otherConfig/addMonitorDeviceConfig';//新增
                _this.$showToast('正在保存...')
                _this.$http.post(url,formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功');
                        _this.getMonitorlist();
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
                    _this.$http.post('/otherConfig/delMonitorDeviceConfig', {
                        deviceId:row.deviceId//要删除的监控设备id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getMonitorlist();
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
                let _this=this;
                _this.pageIndex=page;
                this.getMonitorlist()
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane5{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.1rem;
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
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>