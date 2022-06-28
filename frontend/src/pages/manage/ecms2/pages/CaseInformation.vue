<template>
    <div class='CaseInformation'>
        <!-- 添加案件 -->
        <addnewCase ref='addnewCase'></addnewCase>
        <!-- id查看案件详情 -->
        <checkCaseinfo ref='checkCaseinfo' :ischeckCaseinfo="ischeckCaseinfo" @selectshow='ischeckCaseinfo=false'
                       @sure='ischeckCaseinfo=false' @cancel='ischeckCaseinfo=false'></checkCaseinfo>
        <!-- 特殊权限管理弹框 -->
        <Scheduling ref='Scheduling' :isScheduling="isScheduling" @Schedulingshow="isScheduling=false"
                    @sure='isScheduling=false' @cancel='isScheduling=false'></Scheduling>
        <!-- 排期管理弹框 -->
        <SchedulingM ref='SchedulingM'></SchedulingM>
        <!--案由选择弹框-->
        <eltreeAlert ref="eltreeAlert" />
        <el-row class='onerow'>
            <el-col :span=24>
                <div class="head-top">
                    <img src="../images/CaseManagement/anjianxinxiguanlitubiao.png"/>
                    案件信息管理 <span>AN JIAN XIN XI GUAN LI</span>
                </div>
                <div class='head-foot'>
                    <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
                    <el-button type="primary" icon="el-icon-refresh" @click="Synchronized">同步卷宗</el-button>
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
                        <el-option v-for="item in courtUnitPronounlist" :key="item.courtCode" :label="item.courtPronoun"
                                   :value="item.courtPronoun">
                        </el-option>
                    </el-select>
                    <el-select v-model="caseTypePronoun" @focus="caseTypePronounClick()" clearable filterable placeholder="选择案件类型代字">
                        <el-option v-for="item in caseTypePronounlist" :key="item.caseTypeId"
                                   :label="item.caseTypePronoun" :value="item.caseTypePronoun"
                                   v-if="item.caseTypePronoun">
                        </el-option>
                    </el-select>
                    <el-input v-model="caseNum" placeholder="输入案号" clearable></el-input>
                    号
                </div>
                <div class="date-d">
                    <el-date-picker v-model="startCreateCaseDate" type="date" :clearable=true
                                    :picker-options="pickerOptions0" placeholder="开始日期">
                    </el-date-picker>
                    至
                    <el-date-picker v-model="endCreateCaseDate" type="date" :clearable=true
                                    :picker-options="pickerOptions1" placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="div2">
                <el-input v-model="partyDes" class="d-s-r" placeholder="当事人" clearable></el-input>
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
                    <span class="span1" @click="choicecauseStr">...</span>
                </div>
                <el-select v-model="departmentId" @focus="departmentClick()" clearable filterable placeholder="承办部门">
                    <el-option
                            v-for="item in departmentIdlist" :key="item.departmentId" :label="item.departmentName"
                            :value="item.departmentId">
                    </el-option>
                </el-select>
                <el-select v-model="undertakerId" @focus="userListClick()" clearable filterable placeholder="承办法官">
                    <el-option v-for="item in userList" :key="item.userId" :label="item.userName"
                               :value="item.userId">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="searchCases">搜索</el-button>
            </div>
        </div>
        <div class='casetable'>
            <el-table ref="multipleTable" :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" :index="indexMethod" width="80px"></el-table-column>
                <el-table-column label="案号" width="280px">
                    <template slot-scope="scope">
                        <div class="textover" type='text' @click='seecaseinfo(scope.row)'
                              style='text-decoration: underline;color:#000;'>{{scope.row.caseNumber}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="causeStr" label="立案案由" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createCaseDate" label="立案日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip></el-table-column>
                <el-table-column prop="undertakerName" label="承办法官" show-overflow-tooltip></el-table-column>
                <!--<el-table-column prop="lastJudgeName" label="审判长/员" show-overflow-tooltip></el-table-column>-->
                <el-table-column prop="partyDes" label="当事人" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="250px" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <div class='isedit'>
                            <span @click="SchedulingMon(scope.row)">排期管理</span>
                            <!--<span @click="Specialpowers(scope.row)">特殊权限管理</span>-->
                            <span @click="edit(scope.row)">修改</span>
                            <span @click="handleDelete(scope.$index,scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
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
    </div>
</template>
<script>
    import {CaseInformation} from "../js/datajson"
    import {mapState,mapMutations,mapActions} from 'vuex'
    import FoundationTools from "../../../../js/functionAjax"
    export default{
        //注册子组件
        components: {
            Scheduling:resolve=>{require(["../CaseInformation/Scheduling"],resolve)},//特殊权限管理弹框
            SchedulingM:resolve=>{require(["../CaseInformation/SchedulingM"],resolve)},//特殊权限管理弹框
            addnewCase:resolve=>{require(["../CaseInformation/addnewCase"],resolve)},//添加案件管理弹框
            checkCaseinfo:resolve=>{require(["../CaseInformation/checkCaseinfo"],resolve)},//查看案件详情弹框
            eltreeAlert:resolve=>{require(["../component/eltreeAlert"],resolve)}//案由选择弹框
        },
        data(){
            return{
                yearlist:CaseInformation.yearlist,//年份select,
                options:[],//案由列表
                year:'',//年份
                courtUnitPronoun:'',//法院代字
                caseTypePronoun:'',//案件类型代字
                caseNum:'',//案件编号
                startCreateCaseDate:'',//起始立案日期（搜索用）
                endCreateCaseDate:'',//结束立案日期（搜索用）
                partyDes:'',//当事人名称
                causeId:'',//立案案由Id
                causeStr:'',//立案案由名称（单选）
                departmentId:'',//承办部门id
                undertakerId:'',//承办法官id
                lastJudgeName:'',//审判长/员id
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
                // 表格数据
                tableData: [],
                ischeckCaseinfo:false,//查看案件详情
                isaddnewCase:false,//添加按钮
                isScheduling:false,//特殊权限管理弹框
                oldcourtCode:Number(sessionStorage.getItem('hx-lawcourtcode')),
                multipleSelection: [],//表格存值
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
                'userList'
            ]),
        },
        watch:{
            getn(v){
                if(v.name==='/indexmain/CaseInformation'){
                    if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
                        const _this=this;
                        _this.$showLoading('rgba');
                        _this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
                        this.setcourtUnitPronounlist([]);
                        this.setcaseTypePronounlist([]);
                        this.setdepartmentIdlist([]);
                        this.setuserList([]);
                        this.getpagecaseInfos().then(()=>{
                            this.$hideLoading('rgba');
                        }).catch(err=>{
                            this.$hideLoading('rgba');
                        })
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
            this.partyDes='';
            this.causeStr='';
            this.causeId='';
            this.departmentId='';
            this.undertakerId='';
            this.pageIndex=1;
            this.multipleSelection=[];
            if(Number(sessionStorage.getItem('hx-lawcourtcode'))!==this.oldcourtCode){
                this.oldcourtCode=Number(sessionStorage.getItem('hx-lawcourtcode'));
                this.setcourtUnitPronounlist([]);
                this.setcaseTypePronounlist([]);
                this.setdepartmentIdlist([]);
                this.setuserList([]);
                this.getpagecaseInfos().then(()=>{
                    this.$hideLoading('rgba');
                }).catch(err=>{
                    this.$hideLoading('rgba');
                })
            }else{
                this.getpagecaseInfos().then(()=>{
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
            //点击案号查看详情信息
            seecaseinfo(row){
                const params={
                    "caseNumber":row.caseNumber
                };
                this.$showToast('加载中...')
                this.$http.post('/baseInfo/getAllCaseInfoByCaseNumber', params).then(res => {
                    this.$hideToast()
                    if(res.code == 200){
                        this.ischeckCaseinfo = true;
                        this.$refs.checkCaseinfo.activeName='check1';
                        this.$refs.checkCaseinfo.getcheck1(res.data);//传check1
                        this.$refs.checkCaseinfo.getcheck3(row.caseInfoId);//传check3
                    }else{
                        this.$msgw(res.message);
                    }
                }).catch(err => {
                    this.$hideToast()
                    console.log(err,'/baseInfo/getAllCaseInfoByCaseNumber')
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            //选中当前页码
            handleCurrentChange(val){
                this.pageIndex=val;
                this.getpagecaseInfos();
            },
            //实现多选
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
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
            //分页请求案件信息
            getpagecaseInfos(){
                const params={
                    "pageIndex":this.pageIndex,
                    "pageSize":this.pageSize,
                    'year':this.year == '全部'?'':this.year,
                    'courtPronoun':this.courtPronoun == '全部'?'':this.courtPronoun,
                    'caseTypePronoun': this.caseTypePronoun == '全部'?'':this.caseTypePronoun,
                    'caseNum':this.caseNum,
                    'startCreateCaseDate':this.startCreateCaseDate,
                    'endCreateCaseDate':this.endCreateCaseDate,
                    'partyDes':this.partyDes,
                    'causeId': this.causeId,
                    'causeStr':this.causeStr,
                    'departmentId':this.departmentId == '全部'?'':this.departmentId,
                    'undertakerId':this.undertakerId == '全部'?'':this.undertakerId,
                    'lastJudgeName':this.lastJudgeName == '全部'?'':this.lastJudgeName,
                };
                let _this=this;
                if (params.startCreateCaseDate)
                    params.startCreateCaseDate = FoundationTools.getFormatDate2(
                        params.startCreateCaseDate
                    );
                if (params.endCreateCaseDate)
                    params.endCreateCaseDate = FoundationTools.getFormatDate2(
                        params.endCreateCaseDate
                    );
                return  _this.$http.post('/caseManage/searchCaseInfo', params).then( res => {
                    if (res.code == 200) {
                        //返回总条数
                        _this.total = Number(res.count)
                        _this.tableData = res.data;
                    } else {
                        _this.$msgw(res.message);
                    }
                }).catch( err => {
                    console.log(err,'/caseManage/searchCaseInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索按钮查询案件信息
            async searchCases(){
                this.pageIndex = 1;
                this.$showLoading('rgba')
                await this.getpagecaseInfos();
                this.$hideLoading('rgba')
            },
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //特殊权限管理
            Specialpowers(){
                this.$msgw('该功能暂未开发')
                return;
                this.isScheduling=true;
            },
            //根据id获得排期管理信息
            SchedulingMon(row){
                //调用子组件弹框方法
                this.$refs.SchedulingM.show(row)
            },
            //同步案件
            Syncfolder(){
                if(this.multipleSelection.length===0)this.$msgw('请先勾选案件')
                else{
                    this.$showToast('加载中...')
                    this.$http.post('/sync/syncCaseInfo',{
                        caseInfoIdList:this.multipleSelection
                    }).then(res => {
                        this.$hideToast()
                        if(res.code === 200){
                            this.$msgw('同步案件成功');
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        this.$hideToast()
                        console.log(err,'/sync/syncCaseInfo')
                    })
                }
            },
            //同步卷宗
            Synchronized(){
                if(this.multipleSelection.length===0)this.$msgw('请先勾选案件')
                else{
                    this.$showToast('加载中...')
                    this.$http.post('/sync/syncDossierInfo',{
                        caseInfoIdList:this.multipleSelection
                    }).then(res => {
                        this.$hideToast()
                        if(res.code === 200){
                            this.$msgw('同步卷宗成功');
                        }else{
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        this.$hideToast()
                        console.log(err,'/sync/syncDossierInfo')
                    })
                }
            },
            //案件列表删除此行信息
            handleDelete(index,row){
                const that=this;
                that.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.post('/caseManage/deleteCaseInfo', {
                        "caseInfoIds":[
                            {"caseInfoId":row.caseInfoId},//案号id
                        ]
                    }).then( res =>{
                        if(res.code == 200){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //计算总页数
                            if(index==0 && Math.ceil(Number(that.total)/10)==Number(that.pageIndex) && that.pageIndex!=1 && Number(that.total)%10==1){
                                that.pageIndex=Number(that.pageIndex)-1;
                            }
                            that.getpagecaseInfos();
                        }else{
                            that.$msgw(res.message);
                        }
                    }).catch( err => {
                        console.log(err,'/caseManage/deleteCaseInfo')
                        that.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {});
            },
            //新建案件按钮此时不传参
            add(){
                //打开弹框
                this.$refs.addnewCase.show()
            },
            //修改案件按钮
            edit(row){
                //弹框 发送id请求后台接口数据
                const params={
                    "caseNumber":row.caseNumber
                };
                this.$showToast('加载中...')
                this.$http.post('/baseInfo/getAllCaseInfoByCaseNumber', params).then(res => {
                    this.$hideToast()
                    if(res.code === 200){
                        this.$refs.addnewCase.show(res.data) //打开弹框
                    }else{
                        this.$msgw(res.message);
                    }
                }).catch(err => {
                    this.$hideToast()
                    console.log(err,'/baseInfo/getAllCaseInfoByCaseNumber')
                    this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>
<style lang='less'>
    @import url('../css/common.less');
    .CaseInformation{
        .mr();
        padding:0 0.2rem 0 0.2rem;
        .el-form-item__content{
            font-size: 0.18rem;
        }
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
        .add{
            cursor:pointer;
            margin:.1rem 0;
            img{
                width:.8rem;
            }
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
                line-height: .4rem;
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
            }
        }
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
                .fl-v();
                /*当事人*/
                .d-s-r{
                    width:2.5rem!important;
                }
                /*立案案由*/
                .case-yo {
                    position: relative;
                    overflow: hidden;
                    .el-select{
                        width: 3.15rem;
                    }
                    .el-input {
                        width: 3.15rem !important;
                        .el-input__inner {
                            padding: 0 0.35rem 0 0.15rem !important;
                        }
                    }
                    .el-input__suffix{
                        right:.4rem;
                    }
                    .span1 {
                        position: absolute;
                        right: 0.1rem;
                        top: -0.1rem;
                        cursor: pointer;
                        .f18();
                        width: 0.4rem;
                        line-height: 0.5rem;
                        text-align: center;
                        display: inline-block;
                    }
                }
                /*text*/
                .el-input {
                    width: 2.38rem;
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
                    width: 2.38rem;
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
        /*表格内容区域*/
        /*底部*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>