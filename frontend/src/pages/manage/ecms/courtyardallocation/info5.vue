<template>
    <div class="info5">
        <el-collapse v-model="activeName" accordion @change="openchange">
            <el-collapse-item title="音频设备配制" name="1">
                <!--二次添加弹框-->
                <infoAlertfirst5 ref="infoAlertfirst5"/>
                <div class="table-style">
                    <div class="add">
                        <img @click="add1()" src="../images/yingyongpeizhi/add.png"/>
                    </div>
                    <el-table ref="multipleTable" :data="tableData1"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="deviceNumber" label="设备编号">
                        </el-table-column>
                        <el-table-column prop="audioDeviceName" label="设备名称" width="150px" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="deviceIp" label="IP地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="设备型号" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="scope.row.deviceType==1">DAP1000H</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="serialNumber" label="序列号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="version" label="版本号" show-overflow-tooltip>
                        <!--</el-table-column>-->
                        <!--<el-table-column label="主从角色" show-overflow-tooltip>-->
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.masterSlaveRole==1">主1</span>-->
                                <!--<span v-else-if="scope.row.masterSlaveRole==2">从1</span>-->
                                <!--<span v-else-if="scope.row.masterSlaveRole==3">从2</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="parentDeviceName" label="主设备名称" show-overflow-tooltip>-->
                        </el-table-column>
                        <el-table-column prop="trackNum" label="声道数" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="edit1(scope.$index,scope.row)">修改</span>
                                    <span @click="delinfo1(scope.$index,scope.row)">删除</span>
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
            </el-collapse-item>
            <el-collapse-item title="角色配置" name="2">
                <!--二次添加弹框-->
                <infoAlertsecond5 ref="infoAlertsecond5"/>
                <div class="add">
                    <img @click="add2()" src="../images/yingyongpeizhi/add.png"/>
                    <img @click="delinfo2()" src="../images/yuanchengtingshen/del.png"/>
                </div>
                <div class="table-style">
                    <el-table ref="multipleTable" :data="tableData2" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange2">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="audioRoleName" label="角色名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="audioSignalSourceName" label="音频信号源名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="connectDeviceIp" label="设备IP"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="audioTrack" label="声道号" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column prop="undertakeJudge" label="外部接口号" show-overflow-tooltip>-->
                        <!--</el-table-column>-->
                        <el-table-column prop="flowAddress" label="流地址" width="300px" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column prop="remarks" label="备注" show-overflow-tooltip>-->
                        <!--</el-table-column>-->
                        <el-table-column label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="edit2(scope.$index,scope.row)">修改</span>
                                    <!--<span @click="delinfo2(scope.$index,scope.row)">删除</span>-->
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
                            @current-change="handleCurrentChange2"
                            :current-page=1
                            :page-size=10
                            layout="total, prev, pager, next, jumper"
                            :total=total2>
                    </el-pagination>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import infoAlertfirst5 from "./infoAlertfirst5" //音频设备配制二次添加弹框
    import infoAlertsecond5 from "./infoAlertsecond5" //角色配置二次添加弹框
    import {mapState} from 'vuex'
    export default {
        name: "info5",
        components: {
            infoAlertfirst5,
            infoAlertsecond5,
        },
        data() {
            return {
                activeName: '1',
                tableData1:[],//音乐设备配置列表,
                tableData2:[],//角色配置列表,
                multipleSelection: [],//表格存值
                total:0,
                pageIndex:1,
                total2:0,
                pageIndex2:1,
                pageSize:10
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
            //展开面板
            openchange(v){
                if(v==2){
                    this.httpinfo2()
                }
            },
            //获取音频设备信息
            getinfoBackup5(rowinfo){
                this.httpinfo1();
            },
            httpinfo1(){
                let {courtRoomId,pageIndex,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getAudioDeviceInfo',{
                    id:courtRoomId,//法庭id
                    pageIndex,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData1=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getAudioDeviceInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                if(page){
                    this.pageIndex=page;
                    this.httpinfo1();
                }
            },
            //法庭设备控制二次弹框
            add1(){
                //调用子组件方法
                this.$refs.infoAlertfirst5.show()
            },
            //法庭设备控制修改当前行信息
            edit1(index,row){
                //调用子组件方法
                this.$refs.infoAlertfirst5.show(row)
            },
            //法庭设备控制删除当前行内容
            delinfo1(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteAudioDeviceInfo', {
                        audioDeviceId:row.audioDeviceId//音频设备id
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex==Number(_this.pageIndex)-1;
                            }
                            _this.httpinfo1();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtRoomConfig/deleteAudioDeviceInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(err => {
                    console.log(err)
                });
            },
            //获取角色信息
            getinforole5(rowinfo){
                this.httpinfo2();
            },
            httpinfo2(){
                let {courtRoomId,pageIndex2,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getAudioSignalInfo',{
                    id:courtRoomId,//法庭id
                    pageIndex:pageIndex2,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total2=data.count;
                        _this.tableData2=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getAudioSignalInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //分页信息
            //当前页数
            handleCurrentChange2(page){
                if(page){
                    this.pageIndex2=page;
                    this.httpinfo2();
                }
            },
            //角色配置二次弹框
            add2(){
                //调用子组件方法
                this.$refs.infoAlertsecond5.show()
            },
            //信号源配置修改当前行信息
            edit2(index,row){
                //调用子组件方法
                this.$refs.infoAlertsecond5.show(row)
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange2(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.audioSignalSourceId
                    })
                }else{
                    this.multipleSelection=[];
                }
                console.log(this.multipleSelection)
            },
            //角色配置删除当前行内容
            delinfo2(){
                let _this=this;
                if(_this.multipleSelection.length===0){
                    _this.$msgw('请先勾选要删除的角色名称')
                    return
                }
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteAudioSignalInfo', {
                        audioSignalSourceId:_this.multipleSelection.toString()//音频信号源id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            // if(index==0 && Math.ceil(Number(_this.total2)/10)==Number(_this.pageIndex2) && _this.pageIndex2!=1 && Number(_this.total2)%10==1){
                            //     _this.pageIndex2==Number(_this.pageIndex2)-1;
                            // }
                            _this.multipleSelection=[];
                            _this.pageIndex2=1;
                            _this.httpinfo2();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtRoomConfig/deleteAudioSignalInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
        }
    }
</script>

<style lang="less">
    .info5{
        .add{
            cursor:pointer;
            margin-bottom:.1rem;
            padding-left:.15rem;
            img{
                width:.8rem;
            }
        }
        /*面板行高*/
        .el-collapse-item__content{
            line-height:1.5;
        }
        @import url('../css/element.less');
        .el-collapse-item__header{
            padding-left:.1rem;
            .f18();
            font-weight:bold;
        }
    }
</style>