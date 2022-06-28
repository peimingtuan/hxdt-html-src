<template>
    <div class='CaseManagement'>
    <addoperate ref='addoperate' :isaddoperate="isaddoperate"></addoperate>
    <!--删除警告弹框-->
      <!-- <deletealert :isdelete="isdelete" @closeAlert="isdelete=false" @sure='suredelete' @cancel='isdelete=false'></deletealert> -->
      <!-- 特殊权限管理弹框 -->
      <!--<Scheduling :isScheduling="isScheduling" @Schedulingshow="isScheduling=false"  @sure='isScheduling=false' @cancel='isScheduling=false'></Scheduling>-->
      <!--<importfile  :isimportfile="isimportfile" @wareshow="closeware" @sure='isimportfile=false' @cancel='isimportfile=false'/>-->
      <!--<fileExport  :isfileExport="isfileExport" @wareshow="closeware" @sure='isfileExport=false' @cancel='isfileExport=false'/>-->
        <!--&lt;!&ndash;案由选择弹框&ndash;&gt;-->
        <eltreeAlert ref="eltreeAlert" />
      <el-row class='onerow'>
           <el-col :span=24>
                <div class="head-top">
                        <img src="../images/CaseManagement/anjianpaiqi.png"/>
                        案件排期管理 <span>AN JIAN PAI QI GUAN LI</span>
                </div>
                <div class='head-foot'>
                    <el-button type="primary" icon="el-icon-refresh" @click="Syncfolder">同步排期</el-button>
                    <el-button type="primary" @click='isfileExport=true'>
                        <img class="recover" src="../images/OverdueScheduling/leadIn.png" />
                        导入庭审数据
                    </el-button>
                    <el-button type="primary" @click='isimportfile=true'>
                        <img class="recover" src="../images/OverdueScheduling/recover.png" />
                        导出排期数据
                    </el-button>
                </div>
          </el-col>
      </el-row>
       <!--搜索-->
       <div class="head-search">
            <div class="div1">
                <div class="choice">
                    <el-select v-model="year" placeholder="选择年份">
                        <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="courtUnitPronoun" @focus="courtUnitPronounClick()" clearable filterable placeholder="选择法院代字">
                        <el-option v-for="item in courtUnitPronounlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                        </el-option>
                    </el-select>
                    <el-select v-model="caseTypePronoun" @focus="caseTypePronounClick()" clearable filterable placeholder="选择案件类型代字">
                        <el-option v-for="item in caseTypePronounlist"  :key="item.caseTypeId" :label="item.caseTypePronoun" :value="item.caseTypePronoun" v-if="item.caseTypePronoun">
                        </el-option>
                    </el-select>
                    <el-input v-model.trim="caseNum" placeholder="输入案号"></el-input>号
                </div>
                <div class="date-d">
                    <el-date-picker v-model="startCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions0" placeholder="开始日期">
                    </el-date-picker>
                    至
                    <el-date-picker v-model="endCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions1" placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="div2">
                <!-- <el-input v-model="partyDes" class="d-s-r" placeholder="当事人"></el-input> -->
                <div class="case-yo">
                    <el-select
                            v-model.trim="causeStr"
                            filterable
                            remote
                            clearable
                            reserve-keyword
                            placeholder="案由"
                            :remote-method="remoteMethod"
                            :loading="loading">
                        <el-option
                                v-for="item in options"
                                :key="item.causeCode"
                                @click.native="selectChangecauseCode(item.causeCode)"
                                :label="item.causeName"
                                :value="item.causeName">
                        </el-option>
                    </el-select>
                    <span class='span1' @click="choicecauseStr">...</span>
                </div>
                <el-select v-model="departmentId" @focus="departmentClick()" clearable filterable placeholder="承办部门">
                    <el-option
                            v-for="item in departmentIdlist" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                    </el-option>
                </el-select>
                <el-select v-model="undertakerId" @focus="userListClick()" clearable filterable placeholder="承办法官">
                    <el-option v-for="item in userList"  :key="item.userId" :label="item.userName" :value="item.userId">
                    </el-option>
                </el-select>
                <!--<el-select v-model="lastJudgeName" @focus="userListClick()" clearable filterable placeholder="审判长/员">-->
                    <!--<el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
                <el-select v-model="clerkId" @focus="userListClick()" clearable filterable placeholder="书记员">
                    <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId">
                    </el-option>
                </el-select>
                <el-select v-model="courtRoomId" @focus="courtRoomClick()" clearable filterable placeholder="法庭">
                    <el-option v-for="item in ftlist" :key="item.courtRoomId" :label="item.courtRoomName" :value="item.courtRoomId">
                    </el-option>
                </el-select>
                <el-select v-model="trialStatus" placeholder="庭审状态">
                    <el-option v-for="item in trialStatusList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
        </div>
        <div class='casetable'>
            <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark"
                      @selection-change="handleSelectionChange"
                      style="width:100%">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" :index="indexMethod" width="80px"></el-table-column>
                <el-table-column prop="caseNumber" label="案号" width="280px">
                </el-table-column>
                <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip></el-table-column>
                <el-table-column prop="causeStr" label="立案案由" width="150px" show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="createCaseDate" label="立案日期" show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="departmentName" label="承办部门" width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column prop="undertakerName" label="承办法官" show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="lastJudgeName"label="审判长/员"show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="partyDes" label="当事人" width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column label="开庭日期" width="200px" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.factStartDate}} {{scope.row.factStartTime}}-{{scope.row.factEndTime}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="courtRoomName"label="法庭" width="150px" show-overflow-tooltip></el-table-column>
                <el-table-column label="开庭状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.trialStatus | trialStatusselect}}</div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" show-overflow-tooltip width='150px'>
                    <template slot-scope="scope">
                        <div class='isedit'>
                            <span @click="moreaction(scope.row)">更多操作</span>
                            <span type="text" @click="handleDelete(scope.$index,scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
         <!--底部-->
         <div class="up">
                <!--分页-->
                <el-pagination
                        class="page"
                        background
                        @current-change="handleCurrentChange"
                        :current-page=pageIndex
                        :page-size=10
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
        </div>
    </div>
</template>
<script>
    import {CaseManagement} from "../js/datajson"
    //import deletealert from "../component/deletealert" //删除弹框
    import {mapState,mapMutations,mapActions} from 'vuex'
    import FoundationTools from "../../../../js/functionAjax"
    export default{
        components: {
            //importfile:resolve=>{require(["../CaseManagement/importfile"],resolve)},//导入文件
            //fileExport:resolve=>{require(["../CaseManagement/fileExport"],resolve)},//导出文件
            //Scheduling:resolve=>{require(["../CaseInformation/Scheduling"],resolve)},//特殊权限管理弹框
            //deletealert,
            addoperate:resolve=>{require(["../CaseManagement/addoperate"],resolve)},//添加
            eltreeAlert:resolve=>{require(["../component/eltreeAlert"],resolve)},//案由选择弹框
        },
        data(){
            return{
                isaddoperate:false,
                isScheduling:false,//特殊权限管理弹框
                isimportfile:false,
                isfileExport:false,
                yearlist:CaseManagement.yearlist,//年份select,
                trialStatusList:[
                    {
                        "name":"全部",
                        "id":'全部'
                    },
                    {
                        "name":"等待开庭",
                        "id":1
                    },
                    {
                        "name":"正在开庭",
                        "id":2
                    },
                    {
                        "name":"休庭",
                        "id":4
                    },
                    {
                        "name":"庭审结束",
                        "id":3
                    }
                ],
                trialStatus:'', // 庭审状态id
                tableData: [], //按案件查询列表,
                options:[],//案由列表
                year:'',//年份
                courtUnitPronoun:'',//法院代字
                caseTypePronoun:'',//案件类型代字
                caseNum:'',//案件编号
                startCreateCaseDate:'',//起始立案日期（搜索用）
                endCreateCaseDate:'',//结束立案日期（搜索用）
                causeId:'',//立案案由Id
                causeStr:'',//立案案由名称（单选）
                departmentId:'',//承办部门id
                undertakerId:'',//承办法官id
                lastJudgeName:'',//审判长/员id
                isBurn:'', //是否刻录
                courtRoomId:'', //法庭id
                clerkId:'', //书记员id
                pageIndex:1,//当前页码
                pageSize:10,//每页大小
                total:0,
                //开始日期
                pickerOptions0: {
                    disabledDate: (time) => {
                        if (this.endCreateCaseDate) {
                            return time.getTime() > this.endCreateCaseDate;
                        }

                    }
                },
                //结束日期
                pickerOptions1: {
                    disabledDate: (time) => {
                        if (this.startCreateCaseDate) {
                            return time.getTime() < this.startCreateCaseDate;
                        }
                    }
                },
             multipleSelection:[],
                oldcourtCode:Number(sessionStorage.getItem('hx-lawcourtcode'))
            }
        },
        computed:{
            getn(){
                return this.$store.state.routeInfo
            },
            ...mapState('CaseMangement',[
                'courtUnitPronounlist',
                'caseTypePronounlist',
                'departmentIdlist',
                'ftlist',
                'userList'
            ]),
        },
        filters:{
            trialStatusselect(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='等待开庭';
                        break;
                    case 2:
                        s='正在开庭';
                        break;
                    case 3:
                        s='庭审结束';
                        break;
                    case 4:
                        s='休庭';
                        break;
                }
                return s
            }
        },
        watch:{
            getn(v){
                if(v.name==='/indexmain/CaseManagement'){
                    if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
                        const _this=this;
                        _this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
                        this.$showLoading('rgba');
                        this.setcourtUnitPronounlist([]);
                        this.setcaseTypePronounlist([]);
                        this.setdepartmentIdlist([]);
                        this.setuserList([]);
                         Promise.all([this.getCourtRooms(this),this.getcaselist()]).then(()=>{
                            this.$hideLoading('rgba');
                         }).catch(err=>{
                             this.$hideLoading('rgba');
                         });
                    }
                }
            }
        },
        created(){
            this.$showLoading('rgba');
        },
        mounted() {

        },
        activated(){
            this.$showLoading('rgba');
            this.year='';
            this.courtUnitPronoun='';
            this.caseTypePronoun='';
            this.caseNum='';
            this.startCreateCaseDate='';
            this.endCreateCaseDate='';
            this.causeStr='';
            this.causeId='';
            this.departmentId='';
            this.undertakerId='';
            this.lastJudgeName='';
            this.clerkId='';
            this.courtRoomId='';
            this.trialStatus='';
            this.pageIndex=1;
            if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
                this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
                this.setcourtUnitPronounlist([]);
                this.setcaseTypePronounlist([]);
                this.setdepartmentIdlist([]);
                this.setuserList([]);
                Promise.all([this.getCourtRooms(this),this.getcaselist()]).then(()=>{
                    this.$hideLoading('rgba');
                }).catch(err=>{
                    this.$hideLoading('rgba');
                });
            }else{
                Promise.all([this.getCourtRooms(this),this.getcaselist()]).then(()=>{
                    this.$hideLoading('rgba');
                }).catch(err=>{
                    this.$hideLoading('rgba');
                })
            }
        },
        deactivated(){

        },
        methods:{
            ...mapMutations('CaseMangement',[
                'setcourtUnitPronounlist',
                'setcaseTypePronounlist',
                'setdepartmentIdlist',
                'setuserList'
            ]),
            ...mapActions('CaseMangement',[
                'getAllcourtPronoun',
                'getCaseTypePronoun',
                'getBusinessByCourt',
                'getCourtRooms',
                'getUserByCourt'
            ]),
            courtUnitPronounClick(){
                if(this.courtUnitPronounlist.length===0){
                    this.$showToast('加载中...')
                    this.getAllcourtPronoun(this).then(()=>{
                        this.$nextTick(()=>{
                            this.$hideToast()
                        })
                    }).catch(err=>{
                        this.$hideToast()
                    })
                }
            },
            caseTypePronounClick(){
                if(this.caseTypePronounlist.length===0){
                    this.$showToast('加载中...')
                    this.getCaseTypePronoun(this).then(()=>{
                        this.$nextTick(()=>{
                            this.$hideToast()
                        })
                    }).catch(err=>{
                        this.$hideToast()
                    })
                }
            },
            departmentClick(){
                if(this.departmentIdlist.length===0){
                    this.$showToast('加载中...')
                    this.getBusinessByCourt(this).then(()=>{
                        this.$nextTick(()=>{
                            this.$hideToast()
                        })
                    }).catch(err=>{
                        this.$hideToast()
                    })
                }
            },
            userListClick(){
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
            },
            courtRoomClick(){
                if(this.ftlist.length===0){
                    this.$showToast('加载中...')
                    this.getCourtRooms(this).then(()=>{
                        this.$nextTick(()=>{
                            this.$hideToast()
                        })
                    }).catch(err=>{
                        this.$hideToast()
                    })
                }
            },
            //案由模糊搜索
            remoteMethod(causeName){
                if(!causeName){
                    this.causeStr=''
                    this.causeId=''
                    this.options=[]
                    return
                }
                const that=this;
                that.$http.post("/baseInfo/getCauseStrByName",{causeName})
                    .then(data => {
                        if (data.code === 200) {
                            that.options=data.data;
                        } else {
                            that.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        console.log(err, "/baseInfo/getCauseStrByName");
                    });

            },
            selectChangecauseCode(causeCode){
                this.causeId=causeCode;
            },
            //案由选择
            choicecauseStr() {
                this.$refs.eltreeAlert.show();
            },
            //打开删除弹框
            handleDelete(index,row){
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/baseInfo/deleteTrialPlanInfo', {
                        trialPlanId:row.trialPlanId
                    }).then( res =>{
                        if(res.code === 200){
                            this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(this.total)/10)==Number(this.pageIndex) && this.pageIndex!=1 && Number(this.total)%10==1){
                                this.pageIndex=Number(this.pageIndex)-1;
                            }
                            this.getcaselist();
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch( err => {
                        console.log(err,'/caseManage/deleteCaseInfo')
                        this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {});
            },
            //选中当前页码
            handleCurrentChange(val){
                this.pageIndex=val;
                this.getcaselist();
            },
            //获取案件信息列表
            getcaselist(){
                let param={
                    year:this.year == '全部'?'':this.year, //年份
                    courtUnitPronoun:this.courtUnitPronoun == '全部'?'':this.courtUnitPronoun, //法院代字
                    caseTypePronoun:this.caseTypePronoun == '全部'?'':this.caseTypePronoun, //案件类型代字
                    caseNum:this.caseNum, //案件编号
                    startCreateCaseDate:this.startCreateCaseDate, //起始立案日期（搜索用）
                    endCreateCaseDate:this.endCreateCaseDate, //结束立案日期（搜索用）
                    causeId:this.causeId, //立案案由Id
                    causeStr:this.causeStr, //立案案由名称（单选）
                    departmentId:this.departmentId == '全部'?'':this.departmentId, //承办部门id
                    undertakerId:this.undertakerId == '全部'?'':this.undertakerId, //承办法官id
                    lastJudgeName:this.lastJudgeName == '全部'?'':this.lastJudgeName, //审判长/员id
                    isBurn:this.isBurn, //是否刻录
                    courtRoomId:this.courtRoomId == '全部'?'':this.courtRoomId, //法庭id
                    trialStatus:this.trialStatus == '全部'?'':this.trialStatus, //庭审状态
                    clerkId:this.clerkId, //书记员id
                    pageIndex:this.pageIndex, //当前页码
                    pageSize:this.pageSize, //每页大小
                }
                if(param.startCreateCaseDate)param.startCreateCaseDate=FoundationTools.getFormatDate2(param.startCreateCaseDate)
                if(param.endCreateCaseDate)param.endCreateCaseDate=FoundationTools.getFormatDate2(param.endCreateCaseDate)
                //根据查询条件获取案件(案件无是否刻录)
                return  this.$http.post('/caseManage/searchTrialPlan',param).then( res =>{
                    if(res.code == 200){
                        this.total = res.count;
                        this.tableData = res.data;
                    }else{
                        this.$msgw(res.message);
                    }
                }).catch(err => {
                    console.log(err,'/caseManage/searchTrialPlan')
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索按钮查询案件信息
           async search(){
                this.pageIndex = 1;
                this.$showLoading('rgba')
                await this.getcaselist();
                this.$hideLoading('rgba')
            },
            //更多操作
            moreaction(row){
                this.$refs.addoperate.saveid(row);//调用休庭等各个方法进行传参
            },
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //打开文件导入
            importfile(){
                this.isimportfile=true;
            },
            //关闭文件导入
            closeware(){
                this.isimportfile=false;
                this.isfileExport=false;
            },
            toggleSelection(rows) {
                    if (rows) {
                        rows.forEach(row => {
                            this.$refs.multipleTable.toggleRowSelection(row);
                        });
                        } else {
                        this.$refs.multipleTable.clearSelection();
                        }
            },
            //同步排期
            Syncfolder(){
                if(this.multipleSelection.length===0)this.$msgw('请先勾选案件')
                else{
                    this.$showToast('同步中...')
                    this.$http.post('/sync/syncCaseInfo',{
                        caseInfoIdList:this.multipleSelection
                    }).then(res => {
                        this.$hideToast()
                        if(res.code === 200){
                            this.$msgw('同步排期成功');
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        this.$hideToast()
                        console.log(err,'/sync/syncCaseInfo')
                    })
                }
            },
            handleSelectionChange(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.caseInfoId
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
      }
    }
</script>
<style lang='less'>
 @import url('../css/common.less');
.CaseManagement{
    .mr();
    padding:0 0.2rem;
    .head-search{
            .div1{
                .fb();
                /*法院选择*/
                .choice{
                    .f18();
                    /*select*/
                    .el-select {
                        width: 2rem;
                        margin-right: .1rem;
                        .el-input--suffix .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .3rem 0 .15rem;
                            .f18();
                        }
                        .el-input__icon {
                            height: 100%;
                            width: .25rem;
                            text-align: center;
                            line-height: .4rem;
                        }
                    }
                    /*text*/
                    .el-input {
                        width: 2rem;
                        margin-right: .1rem;
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }
                }
                /*裁判日期*/
                .date-d{
                    .f18();
                    .el-input{
                        width:3.4rem;
                        .el-input__inner{
                            width:3.4rem;
                            height:.4rem;
                            line-height:.4rem;
                            .f20();
                            padding:0 .2rem 0 .4rem;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: .25rem;
                        line-height: .4rem;
                        color: #e7e9ee;
                    }
                    .el-icon-date:before{
                        font-size:.18rem;
                    }
                }
            }
            .div2{
                margin-top:.15rem;
                .fb();
                /* .d-s-r{
                    width:2.5rem!important;
                } */
                /*立案案由*/
                .case-yo{
                    position:relative;
                    overflow: hidden;
                    .el-input{
                        width:2.5rem!important;
                        .el-input__inner{
                            padding: 0 .35rem 0 .15rem!important;
                        }
                    }
                    .el-input__suffix{
                        right:.4rem;
                    }
                    .span1{
                        position:absolute;
                        right:.1rem;
                        top:-.1rem;
                        cursor:pointer;
                        .f18();
                        width:.4rem;
                        line-height:.5rem;
                        text-align: center;
                        display:inline-block;
                    }
                }
                /*text*/
                .el-input {
                    width:2.3rem;
                    margin-right: .1rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*select*/
                .el-select {
                    width:3.15rem;
                    margin-right: .1rem;
                    .el-input--suffix .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .3rem 0 .15rem;
                        .f18();
                    }
                    .el-input__icon {
                        height: 100%;
                        width: .25rem;
                        text-align: center;
                        line-height: .4rem;
                    }
                }
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
     
        span{
           font-size:0.16rem;
       }
    .head-top{
                float: left;
                padding:.2rem 0;
                font-size: .2rem;
                img{
                    width:0.3rem;
                }
                span{
                    margin-left:.05rem;
                    font-size:0.14rem;
                    color:#1296DB;
                }
    }
    .head-foot{
        float: right;
        margin-top:0.12rem;
        .el-button {
            line-height: .38rem;
            padding:0 .2rem;
            background:#edf5ff;
            border:1px solid #bedeff;
            i{
                .f18();
                color:#409eff;
            }
            span {
                .f18();
                color:#409eff;
            }
            img{
                width:.2rem;
                position:relative;
                top:-.015rem;
                /*cursor:pointer;*/
            }
        }
    }
     @import url('../css/element.less');
}
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
