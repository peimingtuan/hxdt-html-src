<template>
    <div class="info3">
        <el-collapse v-model="activeName" accordion @change="openchange">
            <el-collapse-item title="法庭设备控制" name="1">
                <!--二次添加弹框-->
                <infoAlertfirst3 ref="infoAlertfirst3"/>
                <div class="table-style">
                    <div class="add">
                        <img @click="add1()" src="../images/yingyongpeizhi/add.png"/>
                    </div>
                    <el-table ref="multipleTable" :data="tableData1"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="courtDeviceIp" label="设备IP" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="设备类型" >
                            <template slot-scope="scope">
                                <span v-if="scope.row.courtDeviceType==1">编码器</span>
                                <span v-else-if="scope.row.courtDeviceType==2">解码器</span>
                                <span v-else-if="scope.row.courtDeviceType==3">编解码器</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="courtDeviceModelName" label="设备型号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="courtDeviceSerialNumber" label="序列号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="courtDeviceVersion" label="版本号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="manufacturerName" label="厂商" show-overflow-tooltip>
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
            <el-collapse-item title="信号源配置" name="2">
                <!--二次添加弹框-->
                <infoAlertsecond3 ref="infoAlertsecond3"/>
                <!--字幕设置弹框-->
                <setinfoAlert3 ref="setinfoAlert3"/>
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
                        <el-table-column prop="sendChannelNumber" label="送流通道号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="viewName" label="信号源名称" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column prop="courtDeviceModelName" label="设备型号"  show-overflow-tooltip>-->
                        <!--</el-table-column>-->
                        <el-table-column prop="signalSourceIp" label="编码器IP" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="channelNum" label="编码通道号" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column prop="undertakeJudge" label="输出通道类型" show-overflow-tooltip>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="resolution" label="分辨率" show-overflow-tooltip>-->
                        <el-table-column prop="flowAddress" width="220px" label="流地址" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" min-width="150px" max-width="200px" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="edit2(scope.$index,scope.row)">修改</span>
                                    <!--<span @click="delinfo2(scope.$index,scope.row)">删除</span>-->
                                    <!--<span @click="seeVideo(scope.$index,scope.row)">视频预览</span>-->
                                    <span @click="setFont(scope.$index,scope.row)">字幕设置</span>
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
                            :current-page=pageIndex2
                            :page-size=10
                            layout="total, prev, pager, next, jumper"
                            :total=total2>
                    </el-pagination>
                </div>
            </el-collapse-item>
            <el-collapse-item title="远程送流配置" name="4">
                <!--二次添加弹框-->
                <infoAlertfour3 ref="infoAlertfour3"/>
                <div class="table-style">
                    <div class="add">
                        <img @click="add4()" src="../images/yingyongpeizhi/add.png"/>
                    </div>
                    <el-table ref="multipleTable" :data="tableData4"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange4">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="streamName" label="流名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="channelNum" label="通道号" show-overflow-tooltip>
                        </el-table-column>
                        <!--<el-table-column label="画面位置" show-overflow-tooltip>-->
                            <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.frameLocation==1">第一画面</span>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column prop="streamAddress" width="220px" label="流地址" show-overflow-tooltip>

                        </el-table-column>
                        <el-table-column prop="videoType" label="视频接口类型"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="manufacturerName" label="预览">
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="player(scope.$index,scope.row)">播放</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="edit4(scope.$index,scope.row)">修改</span>
                                    <span @click="delinfo4(scope.$index,scope.row)">删除</span>
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
                            :total=total4>
                    </el-pagination>
                </div>
            </el-collapse-item>
            <el-collapse-item title="解码器通道配置" name="3">
                <!--二次添加弹框-->
                <infoAlertsthree3 ref="infoAlertsthree3"/>
                <div class="add">
                    <img @click="add3()" src="../images/yingyongpeizhi/add.png"/>
                </div>
                <div class="table-style">
                    <el-table ref="multipleTable" :data="tableData3"
                              tooltip-effect="dark"
                              style="width: 100%"
                              @selection-change="handleSelectionChange3">
                        <el-table-column prop="channelName" label="输出设备名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="signalSourceIp" label="解码器IP" width="150px" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="channelNum" label="通道号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="解码拉流方式">
                            <template slot-scope="scope">
                                    <span v-if="scope.row.pullFlowType==2">UDP</span>
                                    <span v-else-if="scope.row.pullFlowType==1">TCP</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="证人室画面位置">
                            <template slot-scope="scope">
                                <span>{{scope.row.witnessPeopleViewPosition | witnessPeopleViewPosition}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="isedit">
                                    <span @click="edit3(scope.$index,scope.row)">修改</span>
                                    <span @click="delinfo3(scope.$index,scope.row)">删除</span>
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
                            :total=total3>
                    </el-pagination>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
    import infoAlertfirst3 from "./infoAlertfirst3" //法庭设备控制二次添加弹框
    import infoAlertsecond3 from "./infoAlertsecond3" //信号源配置二次添加弹框
    import infoAlertsthree3 from "./infoAlertsthree3" //解码器通道配置二次添加弹框
    import infoAlertfour3 from "./infoAlertfour3" //远程送流配置二次添加弹框
    import setinfoAlert3 from "./setinfoAlert3" //信号源配置字幕设置弹框
    import {mapState} from 'vuex'
    export default {
        name: "info3",
        components: {
            infoAlertfirst3,
            infoAlertsecond3,
            infoAlertsthree3,
            infoAlertfour3,
            setinfoAlert3
        },
        data() {
            return {
                activeName: '1',
                tableData1:[],//法庭设备控制列表,
                tableData2:[],//信号源配置列表,
                tableData3:[],//解码器通道配置列表,
                tableData4:[],//远程送流配置列表,
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                total2:0,
                pageIndex2:1,
                multipleSelection:[],//表格存值
                total3:0,
                pageIndex3:1,
                total4:0,
                pageIndex4:1,
            }
        },
        filters:{
            witnessPeopleViewPosition(v){
                let text=null;
                switch(Number(v)){
                    case 1:
                        text="第一画面"
                        break;
                    case 2:
                        text="第二画面"
                        break;
                    case 3:
                        text="第三画面"
                        break;
                    case 4:
                        text="第四画面"
                        break;
                    case 5:
                        text="第五画面"
                        break;
                    case 6:
                        text="第六画面"
                        break;
                    case 7:
                        text="第七画面"
                        break;
                    case 8:
                        text="第八画面"
                        break;
                    case 9:
                        text="第九画面"
                        break;
                    case 10:
                        text="第十画面"
                        break;
                    case 11:
                        text="第十一画面"
                        break;
                   default:
                        text="第十二画面"
                }
                return text
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
                    this.pageIndex2=1;
                    this.httpinfo2()
                }else if(v==3){
                    this.httpinfo3()
                }else if(v==4){
                    this.httpinfo4()
                }
            },
            //获取法庭设备信息
            getinfoDevice3(rowinfo){
                this.httpinfo1();
            },
            httpinfo1(){
                let {courtRoomId,pageIndex,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getCourtRoomDeviceInfo',{
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
                    console.log(err,'/courtRoomConfig/getCourtRoomDeviceInfo')
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
                this.$refs.infoAlertfirst3.show()
            },
            //法庭设备控制修改当前行信息
            edit1(index,row){
                //调用子组件方法
                this.$refs.infoAlertfirst3.show(row)
            },
            //法庭设备控制删除当前行内容
            delinfo1(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteCourtRoomDeviceInfo', {
                        deviceIds:row.courtDeviceId//法庭设备id
                    }).then(data =>{
                        if(data.code===200){
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
                        console.log(err,'/courtRoomConfig/deleteCourtRoomDeviceInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //获取信号源配置信息
            getinfoSignal3(rowinfo){
                this.httpinfo2();
            },
            httpinfo2(){
                let {courtRoomId,pageIndex2,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getCourtRoomSignalInfo',{
                    signalSourceType:1,
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
            //信号源配置二次弹框
            add2(){
                //调用子组件方法
                this.$refs.infoAlertsecond3.show()
            },
            //信号源配置修改当前行信息
            edit2(index,row){
                //调用子组件方法
                this.$refs.infoAlertsecond3.show(row)
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange2(val) {
                //信号源id signalSourceIds
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.signalSourceId
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
            //信号源配置删除当前行内容
            delinfo2(){
                let that=this;
                if(that.multipleSelection.length===0){
                    that.$msgw('请先勾选要删除的信号源')
                    return
                }
                that.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.post('/courtRoomConfig/deleteCourtRoomSignalInfo',{
                        signalSourceIds:that.multipleSelection.toString()
                    }).then(data =>{
                        if(data.code===200){
                            that.$msgs('删除成功!');
                            that.multipleSelection=[];
                            that.pageIndex2=1;
                            that.httpinfo2();
                        }else{
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //字幕设置
            setFont(index,row){
                if(row.viewName){
                    //调用子组件方法
                    this.$refs.setinfoAlert3.show(row)
                }else{
                    this.$msgw('需要先配置信号源')
                }
            },
            //获取解码器通道配置信息
            getinfoDecode3(rowinfo){
                //this.httpinfo3();
            },
            httpinfo3(){
                let {courtRoomId,pageIndex3,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/getCourtRoomSignalInfo',{
                    signalSourceType:2,
                    id:courtRoomId,//法庭id
                    pageIndex:pageIndex3,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total3=data.count;
                        _this.tableData3=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getCourtRoomSignalInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //分页信息
            //当前页数
            handleCurrentChange3(page){
                if(page){
                    this.pageIndex3=page;
                    this.httpinfo3();
                }
            },
            //解码器通道配置二次弹框
            add3(){
                //调用子组件方法
                this.$refs.infoAlertsthree3.show()
            },
            //解码器通道配置修改当前行信息
            edit3(index,row){
                //调用子组件方法
                this.$refs.infoAlertsthree3.show(row)
            },
            //解码器通道配置删除当前行内容
            delinfo3(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteCourtRoomSignalInfo', {
                        signalSourceIds:row.signalSourceId//信号源id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total3)/10)==Number(_this.pageIndex3) && _this.pageIndex3!=1 && Number(_this.total3)%10==1){
                                _this.pageIndex3==Number(_this.pageIndex3)-1;
                            }
                            _this.httpinfo3();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //远程送流配置
            httpinfo4(){
                let {courtRoomId,pageIndex4,pageSize}=this;
                let _this=this;
                _this.$http.post('/courtRoomConfig/searchRemoteSendFlowSet',{
                    courtRoomId,//法庭id
                    pageIndex:pageIndex4,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total4=data.count;
                        _this.tableData4=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/searchRemoteSendFlowSet')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //法庭设备控制二次弹框
            add4(){
                //调用子组件方法
                this.$refs.infoAlertfour3.show()
            },
            //法庭设备控制修改当前行信息
            edit4(index,row){
                //调用子组件方法
                this.$refs.infoAlertfour3.show(row)
            },
            //法庭设备控制删除当前行内容
            delinfo4(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/delRemoteSendFlowSet', {
                        remoteStreamConfigId:row.remoteStreamConfigId//id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total4)/10)==Number(_this.pageIndex4) && _this.pageIndex4!=1 && Number(_this.total4)%10==1){
                                _this.pageIndex4==Number(_this.pageIndex4)-1;
                            }
                            _this.httpinfo4();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //播放
            player(index,row){
                const {href} = this.$router.resolve({
                    path: '/player',
                    query: {
                        playUrls:row.streamAddress,
                    }
                });
                window.open(href, '_blank');
            }
        }
    }
</script>

<style lang="less">
    .info3{
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