<template>
    <div class="info7">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="saveInfo">
            <info-alert ref="infoAlert" />
        </spring-box>
        <div class="info7-box">
            <el-tabs v-model="activeName" type="card" :before-leave="beforeleave">
                <el-tab-pane label="ETGS分配方式" name="one">
                    <el-form :label-position="labelPosition">
                        <!--<el-form-item label="互联网法庭部署模式">-->
                            <!--<el-select v-model="formLabelAlign.smsInfoName" placeholder="请选择">-->
                                <!--<el-option-->
                                        <!--v-for="item in list"-->
                                        <!--v-if="item.smsInfoName"-->
                                        <!--@click.native="handleSelectsmsInfoName(item.smsInfoId)"-->
                                        <!--:key="item.smsInfoId"-->
                                        <!--:label="item.smsInfoName"-->
                                        <!--:value="item.smsInfoName">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="">-->
                            <!--<el-checkbox v-model="checked">网关备份视频录制</el-checkbox>-->
                        <!--</el-form-item>-->
                        <el-form-item label="ETGS分配方式">
                            <el-select v-model="assignWay" placeholder="请选择">
                                <el-option
                                        v-for="item in list"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="assignWay==1" label="ETGS选择">
                            <el-select v-model="courtEtgsBindId" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in etgsList"
                                        :key="item.etgsId"
                                        :label="item.etgsName"
                                        :value="item.etgsId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="assignWay==2" label="分组选择">
                            <el-select v-model="courtEtgsBindId" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in groupList"
                                        :key="item.etgsGroupId"
                                        :label="item.etgsGroupName"
                                        :value="item.etgsGroupId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="法庭编解码配置" name="two">
                    <div class="add">
                        <img @click="add()" src="../images/yingyongpeizhi/add.png"/>
                    </div>
                    <div class="table-style">
                        <el-table ref="multipleTable" :data="tableData"
                                  tooltip-effect="dark"
                                  style="width: 100%"
                                  >
                            <el-table-column prop="trialDeviceIp" label="庭审主机IP" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="channelNumber" label="通道号" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="flowAddress" label="流地址" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="编解码类型">
                                <template slot-scope="scope">
                                    <span>{{scope.row.signalSourceType==1?'编码':'解码'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <div class="isedit">
                                        <span @click="edit(scope.$index,scope.row)">修改</span>
                                        <span @click="delinfo(scope.$index,scope.row)">删除</span>
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
                                :current-page=pageIndex
                                :page-size=10
                                layout="total, prev, pager, next, jumper"
                                :total=total>
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Tool from "../js/tools"
    export default {
        name: "info7",
        components:{
          springBox:()=>import("../component/springBox/springBox.vue"),
            infoAlert:()=>import("./infoAlert7.vue")
        },
        data() {
            return {
                mainText:'互联网主机配置',
                alertShow:false,
                activeName:'',
                list:[{id:1,name:'静态分配'},{id:2,name:'动态分配'}],
                etgsList:[],
                groupList:[],
                labelPosition: 'left',
                assignWay:1,
                courtEtgsBindId:'',
                tableData:[],
                pageSize:10,
                pageIndex:1,
                total:0,
                initial:true
            }
        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        watch:{
            activeName(v){
              if(v==='two'){
                    this.getCourtInternetTrialDevices()
                }
            },
            assignWay(v){
                if(this.initial)this.courtEtgsBindId='';
                this.initial=true;
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            show(){
                this.initial=false;
                this.activeName='one';
                this.getETGSConfigs();
                this.getETGSGroups();
                this.getCourtETGSAssignConfig()
            },
            async beforeleave(to,from){
                switch (from) {
                    case 'one':
                       let res=await this.saveCourtETGSAssignConfig();
                       if(res)return true;
                       else return false;
                       break;
                }
            },
            //查询
            async getCourtETGSAssignConfig(){
                let {courtRoomId}=this;
                let res=await this.$http.post('/courtETGSConfig/getCourtETGSAssignConfig',{courtRoomId},true,'加载中...')
                if(res){
                    if(this.assignWay===res.data.assignWay)this.initial=true;
                    this.assignWay=res.data.assignWay;
                    this.courtEtgsBindId=res.data.courtEtgsBindId;
                }
            },
            //静态网关设备列表
            async getETGSConfigs(){
                let res=await this.$http.post('/etgsConfig/getETGSConfigs',{pageSize:1000,pageIndex:1,filterNoAssign:true},true)
                if(res)this.etgsList=res.data;
            },
            //动态音视频网关组
            async getETGSGroups(){
                let res=await this.$http.post('/etgsGroupConfig/getETGSGroups',{pageSize:1000,pageIndex:1},true)
                if(res)this.groupList=res.data;
            },
            //保存ETGS分配
            async saveCourtETGSAssignConfig(){
                let {courtRoomId,assignWay,courtEtgsBindId}=this;
                let res=await this.$http.post('/courtETGSConfig/saveCourtETGSAssignConfig',{courtRoomId,courtETGSAssign:{assignWay,courtEtgsBindId}},true)
                if(res)this.$msgs('保存成功');
            },
            //互联网主机配置
            add(){
                this.$refs.infoAlert.show()
                this.alertShow=true;
            },
            edit(index,row){
                this.$refs.infoAlert.show(row)
                this.alertShow=true;
            },
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                  let res=await  _this.$http.post('/courtInternetTrialDeviceConfig/deleteCourtInternetTrialDevice', {
                        courtInternetTrialDevice:{internetTrialDeviceId:row.internetTrialDeviceId}
                    },true)
                    if(res){
                        _this.$msgs('删除成功!');
                        //计算总页数
                        if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                            _this.pageIndex==Number(_this.pageIndex)-1;
                        }
                        _this.getCourtInternetTrialDevices();
                    }
                }).catch(() => {

                });
            },
            //获取
            async getCourtInternetTrialDevices(){
                let {courtRoomId,pageSize,pageIndex}=this;
                let res=await this.$http.post('/courtInternetTrialDeviceConfig/getCourtInternetTrialDevices',{pageSize,pageIndex,courtInternetTrialDevice:{courtRoomId}},true,'加载中...')
                if(res){
                    this.total=res.count;
                    this.tableData=res.data;
                }
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getCourtInternetTrialDevices();
            },
            //保存
            async saveInfo(){
                let {courtRoomId}=this;
                if(!this.$refs.infoAlert.courtInternetTrialDevice.trialDeviceIp){
                    this.$msgw("请输入庭审主机IP")
                    return
                }else {
                    if(!Tool.isValidIP(this.$refs.infoAlert.courtInternetTrialDevice.trialDeviceIp)){
                        this.$msgw("请输入正确的庭审主机IP")
                        return
                    }
                }
                if(!this.$refs.infoAlert.courtInternetTrialDevice.channelNumber){
                    this.$msgw("请输入通道号")
                    return
                }else{
                    if(!Tool.ispositiveInteger(this.$refs.infoAlert.courtInternetTrialDevice.channelNumber)){
                        this.$msgw("通道号必须为数字")
                        return
                    }
                }
                if(!this.$refs.infoAlert.courtInternetTrialDevice.signalSourceType){
                    this.$msgw("请选择编码类型")
                    return
                }else if(this.$refs.infoAlert.courtInternetTrialDevice.signalSourceType!==2){
                    if(!this.$refs.infoAlert.courtInternetTrialDevice.flowAddress){
                        this.$msgw("请输入流地址")
                        return
                    }
                }
                this.$refs.infoAlert.courtInternetTrialDevice.courtRoomId=courtRoomId;
                let res=await this.$http.post('/courtInternetTrialDeviceConfig/saveCourtInternetTrialDevice',{courtInternetTrialDevice:this.$refs.infoAlert.courtInternetTrialDevice},true,'加载中...')
                if(res){
                   this.$msgs("保存成功！");
                   this.alertShow=false;
                   this.getCourtInternetTrialDevices()

                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .info7{
        .info7-box {
            .add {
                cursor: pointer;
                margin: .1rem 0;

                img {
                    width: .8rem;
                }
            }
            @import url('../css/element.less');
            .table-style{
                margin:.1rem 0;
                max-height:2rem;
                overflow: auto;
            }
        }
    }
</style>
<style lang="less">
    @import url("../css/common.less");
    .info7{
        .springBox{
            .main-box{
                width:8rem!important;
            }
        }
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
        .info7-box {
            @import url('../css/element.less');
            .el-form{
                .fb();
                flex-wrap: wrap;
                padding-top:.1rem;
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
    }
</style>