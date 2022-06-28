<template>
    <div class="info6">
        <div class="info6-top">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="视频录制配置" name="one">
                    <div class="top-radio">
                        <el-radio v-model="formLabelAlign.platformSms" :label=false @change="radiochange">本地流媒体服务器</el-radio>
                        <el-radio v-model="formLabelAlign.platformSms" :label=true @change="radiochange">流媒体服务器平台</el-radio>
                    </div>
                    <el-form :label-position="labelPosition" :model="formLabelAlign">
                        <el-form-item label="流媒体服务器">
                            <el-select v-model="formLabelAlign.smsInfoName" placeholder="请选择">
                                <el-option
                                        v-for="item in smsInfoNamelist"
                                        v-if="item.smsInfoName"
                                        @click.native="handleSelectsmsInfoName(item.smsInfoId)"
                                        :key="item.smsInfoId"
                                        :label="item.smsInfoName"
                                        :value="item.smsInfoName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="存储份数">
                            <el-input v-model="formLabelAlign.storageNum"></el-input>
                        </el-form-item>
                        <el-form-item label="存储路径">
                            <el-select v-model="formLabelAlign.storagePathName" placeholder="请选择">
                                <el-option
                                        v-for="item in storagePathNamelist"
                                        v-if="item.storagePathName"
                                        @click.native="handleSelectstoragePathName(item.storagePathId)"
                                        :key="item.storagePathId"
                                        :label="item.storagePathName"
                                        :value="item.storagePathName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="备份流媒体录制" name="two">
                    <div class="add">
                        <img @click="add()" src="../images/yingyongpeizhi/add.png"/>
                    </div>
                    <!--二次添加弹框-->
                    <infoAlert6 ref="infoAlert6"/>
                    <div class="table-style">
                        <el-table ref="multipleTable" :data="tableData"
                                  tooltip-effect="dark"
                                  style="width: 100%"
                                  @selection-change="handleSelectionChange">
                            <el-table-column prop="smsInfoName" label="流媒体服务器" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="storagePathName" label="存储路径" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="操作" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="isedit">
                                        <span @click="edit(scope.$index,scope.row)">修改</span>
                                        <span @click="delinfo(scope.$index,scope.row)">删除</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="info6-bot">
            <el-tabs v-model="activeName2" type="card">
                <el-tab-pane label="视频备份录制配置" name="one2">
                    <el-form :label-position="labelPosition" :model="footformLabelAlign">
                        <el-form-item label="开启ECOS备份录制">
                            <el-select v-model="footformLabelAlign.videobackupRecord" placeholder="请选择">
                                <el-option
                                        v-for="item in islist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="开启庭审主机备份录制">-->
                            <!--<el-input v-model="formLabelAlign.name"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="ECOS备份录制画面">
                            <el-checkbox v-for="(item,index) in footformLabelAlign.videoViewInfoList" v-model="item.checkStatus" :key="index" >{{item.viewName}}</el-checkbox>
                            <!--<el-checkbox v-model="checked" @change="changecheck">主画面-主码流</el-checkbox>-->
                            <!--<el-checkbox v-model="checked" @change="changecheck">远程</el-checkbox>-->
                            <!--<el-radio v-model="radio" label="1" @change="radiochange">主画面-主码流</el-radio>-->
                            <!--<el-radio v-model="radio" label="2" @change="radiochange">远程</el-radio>-->
                        </el-form-item>
                        <!--<el-form-item label="庭审主机备份录制画面">-->
                            <!--<el-checkbox v-model="checked" @change="changecheck">主画面-主码流</el-checkbox>-->
                            <!--<el-checkbox v-model="checked" @change="changecheck">远程</el-checkbox>-->
                        <!--</el-form-item>-->
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="音频备份录制配置" name="two2">
                    <el-form :label-position="labelPosition" :model="footformLabelAlign">
                        <el-form-item label="开启ECOS备份录制">
                            <el-select v-model="footformLabelAlign.audiobackupRecord" placeholder="请选择">
                                <el-option
                                        v-for="item in islist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="ECOS备份录制音频">
                            <el-checkbox v-for="(item,index) in footformLabelAlign.audioRoleInfoList" v-model="item.checkStatus" :key="index">{{item.audioRoleName}}</el-checkbox>
                            <!--<el-checkbox v-model="checked" @change="changecheck">主画面-主码流</el-checkbox>-->
                            <!--<el-checkbox v-model="checked" @change="changecheck">远程</el-checkbox>-->
                        </el-form-item>
                        <!--<el-form-item label="开启庭审主机备份录制">-->
                            <!--<el-select v-model="formLabelAlign.name" placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in smsInfoNamelist"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="庭审主机备份录制音频">-->
                            <!--<el-input v-model="formLabelAlign.name"></el-input>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="开启DAP备份录制">-->
                            <!--<el-select v-model="formLabelAlign.name" placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in smsInfoNamelist"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="DAP备份录制音频">-->
                            <!--<el-input v-model="formLabelAlign.name"></el-input>-->
                        <!--</el-form-item>-->
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import infoAlert6 from "./infoAlert6" //二次添加弹框
    import {courtyardallocation} from "../js/datajson"
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "info6",
        components: {
            infoAlert6
        },
        data() {
            return {
                islist:[{id:true,name:'是'},{id:false,name:'否'}],
                activeName:'one',
                activeName2:'one2',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    courtRoomId:'',//法庭设备id
                    platformSms:'',//是否本地流媒体服务器
                    storagePathId:'',//存储路径id
                    storagePathName:'',//存储路径名称
                    storageNum:'',//存储份数
                    smsInfoId:'',//流媒体id
                    smsInfoName:'', //流媒体名称
                    courtRoomSmsId:'',//法庭流媒体id
                },
                tableData:[],
                radio: '1',//选择刻录画面
                footformLabelAlign: {
                    courtRoomId: "",
                    audiobackupRecord:'',
                    videobackupRecord:'',
                    videoViewInfoList: [
                        {
                            viewId: "8EF81C8E_010F_B099_6A95_4763AFD40DE9",
                            signalSourceId: '',
                            viewName: '主画面-主流码',
                            checkStatus:''
                        },
                        {
                            viewId: "9B4E48D8_F527_EF00_CCCC_1A111EBDFD85",
                            signalSourceId:'',
                            viewName: '远程',
                            checkStatus:''
                        }
                    ],
                    audioRoleInfoList:[
                        {
                            audioRoleId: "8EF81C8E_010F_B099_6A95_4763AFD40DE9",
                            audioSignalSourceId:'',
                            audioRoleName:'主画面-主流码',
                            checkStatus:''
                        },
                        {
                            audioRoleId: "9B4E48D8_F527_EF00_CCCC_1A111EBDFD85",
                            audioSignalSourceId:'',
                            audioRoleName: '远程',
                            checkStatus:''
                        }
                    ]
                },
            }
        },
        watch:{

        },
        created() {
            this.getAllSMSInfoConfigs(this);//流媒体服务器select
        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
                "smsInfoNamelist",
                "storagePathNamelist"
            ])
        },
        methods: {
            ...mapMutations('courtyardallocation',[
                "setsmsInfoNamelist",
                "setstoragePathNamelist"
            ]),
            ...mapActions('courtyardallocation',[
                "getAllSMSInfoConfigs",
                "getStoragePaths"
            ]),
            //流媒体服务器select选择
            handleSelectsmsInfoName(smsInfoId){
                if(this.formLabelAlign.smsInfoId!==smsInfoId){
                    this.formLabelAlign.smsInfoId=smsInfoId;
                    //更换时，清除服务器存储路径select选项
                    this.setstoragePathNamelist([])
                    this.formLabelAlign.storagePathId='';
                    this.formLabelAlign.storagePathName='';
                    this.getStoragePaths(this)
                }
            },
            //流媒体服务器存储路径select选择
            handleSelectstoragePathName(storagePathId){
                this.formLabelAlign.storagePathId=storagePathId;
            },
            //获取视频录制配置
            getinfoup(){
                let _this=this;
                Promise.all([_this.httpinfoupvideo(),_this.getCourtRoomSmsInfo(),_this.getmusicVideo()]).then(()=>{

                })
            },
            //视频录制配置查询
            httpinfoupvideo(){
                let _this=this;
                return _this.$http.post('/courtRoomConfig/getCourtRoomMainSmsInfo', {
                            id:_this.courtRoomId,//法庭id
                        }).then(data => {
                            if (data.code === 200) {
                                for(let i in data.data){
                                    if(_this.formLabelAlign.hasOwnProperty(i))_this.formLabelAlign[i]=data.data[i];
                                }
                            } else {
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            console.log(err,'/courtRoomConfig/getCourtRoomMainSmsInfo')
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //备份流媒体录制查询
            getCourtRoomSmsInfo(){
                let _this=this;
                return _this.$http.post('/courtRoomConfig/getCourtRoomSmsInfo', {
                    id:_this.courtRoomId,//法庭id
                    pageIndex:1,
                    pageSize:1000,//每页大小暂时写死
                }).then(data => {
                    if (data.code === 200) {
                        _this.tableData=data.data;
                    } else {
                        _this.$msgw(data.msg);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getCourtRoomSmsInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //二次弹框
            add(){
                //调用子组件方法
                this.$refs.infoAlert6.show()
            },
            //修改当前行信息
            edit(index,row){
                //调用子组件方法
                this.$refs.infoAlert6.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteCourtRoomSmsInfo',{
                        courtRoomSmsId:row.courtRoomSmsId//法庭流媒体id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            _this.getCourtRoomSmsInfo();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtRoomConfig/deleteCourtRoomSmsInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //下半部分查询
            getmusicVideo(){
                let _this=this;
                return _this.$http.post('/courtRoomConfig/getCourtRoomEcosBackupSet', {
                    id:_this.courtRoomId,//法庭id
                }).then(data => {
                    if (data.code === 200) {
                        _this.footformLabelAlign=data.data;
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //保存录制管理信息
            saveinfo6(){
                let {courtRoomId,formLabelAlign}=this;
                let _this=this;
                if(courtRoomId)formLabelAlign.courtRoomId=courtRoomId;
                if(!formLabelAlign.smsInfoId||!formLabelAlign.storagePathId)return //为空的话直接跳出
                //上半部分保存
                return _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomMainSms',formLabelAlign).then(data =>{
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //下半部分保存
            saveOrUpdateCourtRoomEcosBackup(){
                let {courtRoomId,footformLabelAlign}=this;
                let _this=this;
                if(courtRoomId)footformLabelAlign.courtRoomId=courtRoomId;
                return _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomEcosBackup',footformLabelAlign).then(data =>{
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .info6{
        .el-tabs__header{
            margin-bottom:0;
        }
        .el-tabs__item{
            text-align: center ;
            height:.4rem;
            line-height:.4rem;
        .f20();
            color: #606266;
        }
        .el-tabs--card>.el-tabs__header .is-active{
            border-left:1px solid #2f8ded;
        }
        /*激活标签*/
        .is-active{
            color:#409eff;
            background:#e4e7ed;
            border: 1px solid #2F8DED;
            border-bottom-color: #2F8DED!important;
            border-left-color: #2F8DED!important;
        }
        /*上半部分*/
        .info6-top{
            border-bottom:1px dashed #BCBCBC;
            .add{
                cursor:pointer;
                margin:.1rem 0;
                img{
                    width:.8rem;
                }
            }
            .top-radio{
                margin:.2rem 0 .1rem 0;
                .el-radio{
                    /*选框*/
                    .el-radio__inner{
                        width:.2rem;
                        height:.2rem;
                        &:after{
                            width:.06rem;
                            height:.06rem;
                        }
                    }
                    /*文本*/
                    .el-radio__label{
                        .f18();
                    }
                }
            }
            @import url('../css/element.less');
            .table-style{
                margin:.1rem 0;
                max-height:2rem;
                overflow: auto;
            }
        }
        /*下半部分*/
        .info6-bot{
            margin-top:.2rem;
        }
        .info6-top,.info6-bot{
            .el-form{
                .fb();
                flex-wrap: wrap;
                padding-top:.1rem;
            }
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.8rem!important;
            }
            .el-form-item__content{
                margin-left:1.8rem!important;
            }
            /*input框*/
            .el-input{
                width:4rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
        }
    }
</style>