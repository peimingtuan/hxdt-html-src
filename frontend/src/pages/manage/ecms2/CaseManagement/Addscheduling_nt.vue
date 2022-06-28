<template>
    <!-- 排期管理下的修改排期 -->
    <div class="Addscheduling_Nt">
        <!--远程庭审室选择-->
        <courtyardChoice ref="courtyardChoice" @sure="getRoom"></courtyardChoice>
        <!--弹框-->
        <transition name="slide-fade">
            <div class='second-alert' v-show='isAddscheduling_nt'>
                <div class="main">
                    <img class="imgloge" src="../images/CaseManagement/avataradd.png" />
                    <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content" id="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="庭次">
                                <el-input type="number" v-model.trim="formLabelAlign.courtTime" placeholder="庭次"> </el-input>
                            </el-form-item>
                            <el-form-item label="开庭日期" required>
                                <el-date-picker v-model="formLabelAlign.planStartDate" type="date" :clearable=true>
                                </el-date-picker>
                                <el-time-select
                                        v-model="formLabelAlign.planStartTime"
                                        :editable="false"
                                        :picker-options="{
                                                        start:'06:00',
                                                        step:'0:05',
                                                        end:'23:59',
                                                        maxTime:formLabelAlign.planEndTime
                                                    }"
                                >
                                </el-time-select>至
                                <el-time-select
                                        v-model="formLabelAlign.planEndTime"
                                        :editable="false"
                                        :picker-options="{
                                                        start:'06:00',
                                                        step:'0:05',
                                                        end:'23:59',
                                                        minTime: formLabelAlign.planStartTime
                                                    }"
                                >
                                </el-time-select>
                            </el-form-item>
                            <el-form-item label="法庭" required>
                                <el-select v-model="formLabelAlign.courtRoomName" placeholder="请选择">
                                    <el-option v-for="item in pop_ftlist"
                                               :key="item.courtRoomId"
                                               @click.native="changecourtRoomId(item.courtRoomId)"
                                               :label="item.courtRoomName"
                                               :value="item.courtRoomName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审理形式">
                                <el-select  v-model='formLabelAlign.trialFormCode'>
                                    <el-option v-for="item in TrialWaylist"  :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审理模式">
                                <el-select v-model="formLabelAlign.trialMode" placeholder="请选择">
                                    <el-option v-for="item in TrialModeInfosList"  :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="red-label" label="是否公开审理">
                                <el-radio-group v-model="formLabelAlign.publicTrial">
                                    <el-radio :label=true>是</el-radio>
                                    <el-radio :label=false>否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <!-- 审判长，审判员 -->
                            <el-form-item class="red-label" label="是否独任审理" @change="radiochange">
                                <el-radio-group v-model="formLabelAlign.soleTrial">
                                    <el-radio :label=true>是</el-radio>
                                    <el-radio :label=false>否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                        <div class="label-k" >
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item v-show="!formLabelAlign.soleTrial" label='审判长'>
                                    <el-select v-model="value1" filterable>
                                        <el-option v-for="item in userList"
                                                   @click.native="handleSelectvalue1(item.userName)"
                                                   :key="item.userId"
                                                   :label="item.userName"
                                                   :value="item.userId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item v-show="formLabelAlign.soleTrial" label='审判员'>
                                    <el-select v-model="value5" filterable>
                                        <el-option v-for="item in userList"
                                                   @click.native="handleSelectvalue5(item.userName)"
                                                   :key="item.userId"
                                                   :label="item.userName"
                                                   :value="item.userId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="审判员(可多选)" v-show="!formLabelAlign.soleTrial">
                                    <el-select v-model="value2" filterable multiple>
                                        <el-option v-for="item in userList"
                                                   :key="item.userId"
                                                   :label="item.userName"
                                                   :value="item.userId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="人民审判员(可多选)" v-show="!formLabelAlign.soleTrial">
                                    <el-select
                                            v-model="value3"
                                            filterable
                                            multiple
                                            allow-create
                                            default-first-option>
                                        <el-option v-for="item in peopleList"
                                                   :key="item.peopleAssessorId"
                                                   :label="item.peopleAssessorName"
                                                   :value="item.peopleAssessorId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="书记员">
                                    <el-select v-model="value4" filterable>
                                        <el-option v-for="item in userList"
                                                   @click.native="handleSelectvalue4(item.userName)"
                                                   :key="item.userId"
                                                   :label="item.userName"
                                                   :value="item.userId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                        <!--远程模块-->
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="开庭方式" required>
                                <el-select v-model="formLabelAlign.courtWay" placeholder="请选择">
                                    <el-option v-for="item in CourtWaylist"  :key="item.code" :label="item.name" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form :label-position="labelPosition" :mode="remoteTrialInfo" v-show="formLabelAlign.courtWay==2">
                            <el-form-item label="远程庭审模版">
                                <el-select v-model="remoteTrialInfo.templateId" placeholder="请选择">
                                    <el-option v-for="item in trialRoomsList"
                                               @click.native="handleSelecttemplateName(item.templateName)"
                                               :key="item.templateId"
                                               :label="item.templateName"
                                               :value="item.templateId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div class="zkt-left">
                                <div class="div-img">远程庭审室选择
                                    <img @click="addRoom" src="../images/CaseManagement/yuancheng/add.png" />
                                </div>
                                <div v-for="(item,index) in remoteTrialInfo.trialRooms" :key="index">
                                    远{{index+1}}：
                                    <div class="case-yo">
                                        <el-input v-model="item.trialRoomName" disabled></el-input>
                                        <span class="span-btn" @click="openCourtyard(item,index)">...</span>
                                    </div>
                                    <img v-show="index>0" @click="removeRoom(index)" src="../images/CaseManagement/yuancheng/del.png" />
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <div class="bt">
                        <div class="qure" @click='sure'>
                            <img src="../images/sure.png" />确定
                        </div>

                        <div class="cancel" @click='cancel'>
                            <img src="../images/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import $ from "jquery"
    import courtyardChoice from "../../ecms/component/courtyardChoice"
    import FoundationTools from '../../../../js/functionAjax'
    import AlertleftTile from "../component/AlertleftTile"
    import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "Addscheduling_Nt",
        props:{
            isAddscheduling_nt:Boolean,
        },
        components: {
            AlertleftTile,
            courtyardChoice
        },
        data() {
            return {
                TrialModeInfosList:[],//审理模式select
                CourtWaylist:[],//开庭方式select
                TrialWaylist:[],//审理形式select
                text:"修改排期",
                text2:"请填写详细信息",
                labelPosition: 'left',//form表单左侧靠齐
                trialPlanInfos:[],//人员信息列表
                formLabelAlign:{
                    trialPlanId:'',//排期id
                    caseInfoId:'',//案件id
                    caseNumber:'',//案号
                    trialMode:null,	//审理模式
                    trialFormCode:null,//审理形式
                    planStartDate:"",	//开庭日期
                    planStartTime:"",	//开庭时间
                    planEndTime:"",	//结束时间
                    courtRoomId	:"",//开庭地点id
                    courtRoomName:"",//	开庭地点（法庭名称）
                    publicTrial:"",	//是否公开审理
                    soleTrial:"", //是否独任审理
                    courtTime:"",//庭次
                    courtWay:"",//开庭方式
                    trialMemberList:[],//审判组织成员
                    courtName:FoundationTools.getCookie('peicourtName')|| '',//法院名称
                },
                remoteTrialInfo:{
                    templateId:"",
                    templateName:"",
                    trialRooms:[
                        {
                            trialRoomId: "",
                            trialRoomName: ""
                        }
                    ]
                },
                trialRoomsList:[],//庭审模版
                peopleList:[],//人民陪审员
                value1:'',//审判长
                name1:'',
                value2:[],
                value3:[],
                value4:'',
                name4:'',
                value5:'',//审判员
                name5:'',
                trialStatus:null,//庭审状态
            }
        },
        watch:{
            value3(v1,v2){
                let isF=false;
                v1.forEach(item=>{
                    let its=item.trim();
                    if(!its){
                        isF=true;
                    }
                })
                if(isF)this.value3=v2;
            },
            'formLabelAlign.courtRoomId':{
                handler(val,old){
                    //this.getRemoteTrialTemplates(val);
                },
            }
        },
        computed:{
            ...mapGetters('CaseMangement',[
                'pop_ftlist'//法庭select
            ]),
            userList(){//法院用户
                let result=[];
                if(this.$store.state.CaseMangement.userList.length>0){
                    this.$store.state.CaseMangement.userList.map(item=>{
                        result.push(item)
                    })
                    result.shift()
                }
                return result;
            }
        },
        created() {

        },
        updated(){

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            ...mapActions('CaseMangement',[
                'getCourtRooms',
                'getUserByCourt'
            ]),
            changecourtRoomId(courtRoomId){
                this.formLabelAlign.courtRoomId=courtRoomId;
                this.getRemoteTrialTemplates();
            },
            radiochange(v){

            },
            //审理模式
            getTrialModeInfos(){
                const _this=this;
                _this.$showToast('加载中...')
                return  _this.$http.post('/baseInfo/getTrialModeInfos',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.TrialModeInfosList=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/baseInfo/getTrialModeInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })

            },
            //审理形式
            getTrialFormInfos(){
                const _this=this;
                _this.$showToast('加载中...')
                return  _this.$http.post('/baseInfo/getTrialFormInfos',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.TrialWaylist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/baseInfo/getTrialFormInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //开庭方式
            getCourtWayInfos(){
                const _this=this;
                _this.$showToast('加载中...')
                return  _this.$http.post('/baseInfo/getCourtWayInfos',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.CourtWaylist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/baseInfo/getCourtWayInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //人民陪审员
            getPeopleAssessorConfigList(){
                const _this=this;
                _this.$showToast('加载中...')
                return  _this.$http.post('/peopleAssessorConfig/getPeopleAssessorConfigList',{
                    pageIndex:null,
                    pageSize:null
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.peopleList=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/peopleAssessorConfig/getPeopleAssessorConfigList')
                })
            },
            //选择
            handleSelectvalue1(userName){
                this.name1=userName
            },
            //选择
            handleSelectvalue4(userName){
                this.name4=userName
            },
            //选择
            handleSelectvalue5(userName) {
                this.name5 = userName
            },
            //远程庭审模版
            getRemoteTrialTemplates(courtRoomId){
                const _this=this;
                let param={
                    courtRoomId:_this.formLabelAlign.courtRoomId,
                    trialRooms:_this.remoteTrialInfo.trialRooms
                }
                if(!courtRoomId){
                    //param.trialRooms=_this.remoteTrialInfo.trialRooms;
                }
                _this.$showToast('加载中...')
                return  _this.$http.post('/getRemoteTrialTemplates',param).then(data =>{
                    _this.$hideToast()
                    if(data.code==200){
                        _this.trialRoomsList=data.data;
                        _this.trialRoomsList.unshift({templateId:'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',templateName:'系统默认模版'})
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/getRemoteTrialTemplatest')
                })
            },
            //选择
            handleSelecttemplateName(templateName){
                this.remoteTrialInfo.templateName=templateName;
            },
            //回显
            see(row){
                if(row){
                    this.trialStatus=row.trialStatus;
                    if(this.TrialModeInfosList.length===0)this.getTrialModeInfos();
                    if(this.CourtWaylist.length===0)this.getCourtWayInfos();
                    if(this.TrialWaylist.length===0)this.getTrialFormInfos();
                    //if(this.peopleList.length===0)this.getPeopleAssessorConfigList();
                    this.getPeopleAssessorConfigList();
                    if(this.userList.length===0){
                        this.$showToast('加载中...')
                        this.getUserByCourt(this).then(()=>{
                            this.$nextTick(()=>{
                                this.$hideToast()
                            })
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                    if(this.pop_ftlist.length===0){
                        this.$showToast('加载中...')
                        this.getCourtRooms(this).then(()=>{
                            this.$hideToast()
                        }).catch(err=>{
                            this.$hideToast()
                        })
                    }
                    for(let i in row){
                        if(this.formLabelAlign.hasOwnProperty(i)){
                            this.formLabelAlign[i]=row[i]
                        }
                    }
                    this.value1='';
                    this.value2 = [];
                    this.value3 = [];
                    this.value4='';
                    this.value5='';
                    this.value1=row.presidingJudgeId//审判长
                    if(row.judgePeopleIds)this.value2=row.judgePeopleIds.split(';')//审判员
                    if(row.jurorsPeopleId)this.value3=row.jurorsPeopleId.split(';')//人民审判员
                    this.value4=row.clerkId
                    if(row.soleTrial){
                        if (this.value2.length > 0) {
                            this.value5 = this.value2[0];
                            this.value2 = [];
                        }
                    }
                    //远程
                    if(row.remoteTrialInfo){
                        this.remoteTrialInfo=JSON.parse(JSON.stringify(row.remoteTrialInfo))
                    }else{
                        this.remoteTrialInfo={
                            templateId:"",
                            templateName:"",
                            trialRooms:[
                                {
                                    trialRoomId: "",
                                    trialRoomName: ""
                                }
                            ]
                        }
                    }
                }
                this.getRemoteTrialTemplates()
            },
            //获取选择的远程庭审室
            getRoom(obj,index){
                this.remoteTrialInfo.trialRooms[index].trialRoomId = obj.trialRoomId;
                this.remoteTrialInfo.trialRooms[index].trialRoomName = obj.trialRoomName;
                this.getRemoteTrialTemplates();
            },
            //注册弹框显示与否事件
            closenewcase() {
                this.$emit('Schedulingshow');
            },
            sure(){
                if(this.trialStatus!==1){
                    this.$msgw("只有等待开庭的排期才能修改！")
                    return false
                }
                if(!this.formLabelAlign.courtWay){
                    this.$msgw("请选择开庭方式！")
                    return false
                }
                if(this.formLabelAlign.courtWay==2&&!this.remoteTrialInfo.templateId){
                    this.$msgw("请选择远程庭审模版！")
                    return false
                }
                this.formLabelAlign.remoteTrialInfo=this.remoteTrialInfo;
                this.formLabelAlign.trialMemberList=[];
                if (this.formLabelAlign.soleTrial) {
                    this.value1='';
                    this.value2=[];
                    this.value3=[];
                }else{
                    this.value5='';
                }
                if(this.value1){
                    for(let i=0;i<this.userList.length;i++){
                        if(this.value1==this.userList[i].userId){
                            this.name1=this.userList[i].userName;
                            break;
                        }
                    }
                    this.formLabelAlign.trialMemberList.push({
                        trialMemberName:this.name1,
                        trialMemberTypeCode:1,
                        userId:this.value1
                    })
                }
                if(this.value2.length>0){
                    this.value2.map(item=>{
                        let id=item
                        for(let i=0;i<this.userList.length;i++){
                            if(id==this.userList[i].userId){
                                this.formLabelAlign.trialMemberList.push({
                                    trialMemberName:this.userList[i].userName,
                                    trialMemberTypeCode:2,
                                    userId:id
                                })
                                break;
                            }
                        }
                    })
                }
                if(this.value3.length>0) {
                    this.value3.map(item => {
                        let id = item;
                        let isTrue=true;
                        for(let i=0;i<this.peopleList.length;i++){
                            if(id==this.peopleList[i].peopleAssessorId){
                                this.formLabelAlign.trialMemberList.push({
                                    trialMemberName:this.peopleList[i].peopleAssessorName,
                                    trialMemberTypeCode:4,
                                    userId:id
                                })
                                isTrue=false;
                                break;
                            }
                        }
                        if(isTrue){
                            this.formLabelAlign.trialMemberList.push({
                                trialMemberName:id,
                                trialMemberTypeCode: 4,
                                userId:''
                            })
                        }
                    })
                }
                if(this.value4){
                    for(let i=0;i<this.userList.length;i++){
                        if(this.value4==this.userList[i].userId){
                            this.name4=this.userList[i].userName;
                            break;
                        }
                    }
                    this.formLabelAlign.trialMemberList.push({
                        trialMemberName:this.name4,
                        trialMemberTypeCode:6,
                        userId:this.value4
                    })
                }
                if (this.value5) {
                    for (let i = 0; i < this.userList.length; i++) {
                        if (this.value5 == this.userList[i].userId) {
                            this.name5 = this.userList[i].userName;
                            break;
                        }
                    }
                    this.formLabelAlign.trialMemberList.push({
                        trialMemberName: this.name5,
                        trialMemberTypeCode: 2,
                        userId: this.value5
                    })
                }
                if (this.formLabelAlign.planStartDate && typeof this.formLabelAlign.planStartDate!='string')
                    this.formLabelAlign.planStartDate = FoundationTools.getFormatDate2(
                        this.formLabelAlign.planStartDate
                    );
                this.trialPlanInfos=[];
                this.trialPlanInfos.push(this.formLabelAlign)
                this.$emit('sure',this.trialPlanInfos);
            },
            cancel(){
                this.$emit('cancel');
            },
            //添加远程庭审室
            addRoom(){
                if(!this.formLabelAlign.courtRoomId){
                    this.$msgw('请先选择法庭！');
                    return;
                }
                let length = this.remoteTrialInfo.trialRooms.length;
                if(this.remoteTrialInfo.trialRooms[length-1].trialRoomId == ''){
                    this.$msgw('请选择庭审室！');
                    return;
                }
                let data = {
                    trialRoomId:'',
                    trialRoomName:'',
                }
                this.remoteTrialInfo.trialRooms.push(data)
                this.$nextTick(()=>{
                    let div=document.getElementById('content');
                    div.scrollTop=div.scrollHeight;
                })
            },
            //减少远程庭审室
            removeRoom(index){
                this.remoteTrialInfo.trialRooms.splice(index,1);
                this.getRemoteTrialTemplates()
            },
            //打开庭审室选择
            openCourtyard(item,index){
                this.$refs.courtyardChoice.secondshow=true;
                if(this.remoteTrialInfo.templateId){
                    this.$refs.courtyardChoice.trialRoomId = this.remoteTrialInfo.trialRooms[index].trialRoomId;
                    this.$refs.courtyardChoice.trialRoomName = this.remoteTrialInfo.trialRooms[index].trialRoomName;
                }else{
                    this.$refs.courtyardChoice.trialRoomId = '';
                    this.$refs.courtyardChoice.trialRoomName = '';
                }
                this.$refs.courtyardChoice.getTreeData();
                this.$refs.courtyardChoice.dataIndex = index;
            },
        }
    }
</script>
<style lang="less">
    @import url('../css/common.less');
    .Addscheduling_Nt{
        .main{
            width:14rem;
            padding:0 0.8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
            background:#fff;
            position:absolute;
            top:1rem;
            left:calc(50% - 7rem);
            border-radius:2px;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            /*左上方login*/
            img.imgloge{
                position:absolute;
                top: .2rem;
                left: .3rem;
                width:.4rem;
            }
            /*关闭弹框*/
            img.alert-close{
                width:.18rem;
                position:absolute;
                top: .25rem;
                right: .35rem;
                cursor: pointer;
                z-index:102;
            }
            .content{
                padding-top:0.2rem;
                width: 100%;
                margin: 0 auto;
                min-height:5rem;
                max-height:6rem;
                overflow: auto;
                background:#eceff0;
                .label-k{
                    width:95%;
                    margin:.1rem auto;
                    padding-top:.1rem;
                    border:1px solid #C6C6C6;
                    border-radius:3px;
                    /*label*/
                    .el-form-item__label {
                        .f18();
                        width: 1.5rem !important;
                    }

                    .el-form-item__content {
                        margin-left:1.5rem !important;
                    }
                    .el-input {
                        width:3.5rem;
                    }
                }
                .zkt-left{
                    &>div{
                        .fl-v();
                        .f16();
                        margin-bottom:.05rem;
                    }
                    padding:.1rem;
                    &>div.div-img{
                        margin-bottom:.2rem;
                    }
                    img{
                        cursor:pointer;
                        margin-left:.1rem;
                    }
                    .case-yo{
                        position:relative;
                        overflow: hidden;
                        .el-input{
                            width:3.2rem;
                            .el-input__inner{
                                padding: 0 .35rem 0 .05rem!important;
                            }
                        }
                        span{
                            position:absolute;
                            right:.1rem;
                            top:-.05rem;
                            cursor:pointer;
                            width:.4rem;
                            line-height:.4rem;
                            text-align: center;
                            display:inline-block;
                        }
                    }
                }
                .el-form {
                    .fl();
                    flex-wrap: wrap;
                    padding:0 .15rem;
                    overflow: auto;
                    .el-form-item {
                        margin-bottom: .1rem;
                    }
                    /*label*/
                    .el-form-item__label {
                        .f18();
                        width: 1.5rem !important;
                    }

                    .el-form-item__content {
                        margin-left: 1.5rem !important;
                    }
                    /*input框*/
                    .el-input {
                        width: 3.2rem;
                        margin-right:.1rem;
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }
                    .el-date-editor{
                        width:1.9rem;
                        .el-input__inner{
                            padding-left:.5rem;
                            /*padding-right:.5rem;*/
                        }
                    }
                    .el-date-editor--time-select{
                        width:1.5rem;
                    }
                }
            }
            .bt{
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                align-items: center;
                width:100%;
                margin:0.2rem 0;
                &>div{
                    cursor:pointer;
                    font-size: 0.2rem;
                    line-height:.3rem;
                }
                img{
                    width:.2rem;
                    margin-right:.05rem;
                }
                .qure{
                    color: #45A1D1;
                    margin-right:.5rem;
                }
            }
        }
    }
</style>