<template>
    <div class='CaseInformation'>
        <Index :show="false"/>
        <!-- 添加案件 -->
        <addnewCase ref='addnewCase' :showAlert.sync="isaddnewCase" v-show="isaddnewCase">
        </addnewCase>
        <!-- id查看案件详情 -->
        <!--<checkCaseinfo ref='checkCaseinfo' :ischeckCaseinfo="ischeckCaseinfo" @selectshow='ischeckCaseinfo=false'-->
                       <!--@sure='ischeckCaseinfo=false' @cancel='ischeckCaseinfo=false'></checkCaseinfo>-->
        <!--&lt;!&ndash; 特殊权限管理弹框 &ndash;&gt;-->
        <!--<Scheduling ref='Scheduling' :isScheduling="isScheduling" @Schedulingshow="isScheduling=false"-->
                    <!--@sure='isScheduling=false' @cancel='isScheduling=false'></Scheduling>-->
        <!--&lt;!&ndash; 排期管理弹框 &ndash;&gt;-->
        <!--<SchedulingM ref='SchedulingM' :isSchedulingM="isSchedulingM" @SchedulingMshow="isSchedulingM=false"-->
                     <!--@sure='isSchedulingM=false' @cancel='isSchedulingM=false'></SchedulingM>-->
        <!--&lt;!&ndash;案由选择弹框&ndash;&gt;-->
        <!--<eltreeAlert ref="eltreeAlert" @sureChoice="sure" />-->
        <el-row class='onerow'>
            <div  v-font-size="2" v-font-color="color"  id="div1"></div>
            <span @click="add1(obj)">add1:{{obj.id1}}</span>
            <span @click="add2(obj)">add1:{{obj.id2}}</span>
            <!--<el-col :span=24>-->
                <!--<div class="head-top">-->
                    <!--<img src="../images/CaseManagement/anjianxinxiguanlitubiao.png"/>-->
                    <!--案件信息管理 <span>AN JIAN XIN XI GUAN LI</span>-->
                <!--</div>-->
                <!--<div class='head-foot'>-->
                    <!--<div @click='Synchronized'><img src="../images/CaseManagement/anniutongbu.png" alt=""></div>-->
                    <!--<div @click='add'><img src="../images/CaseManagement/anniutianjia.png" alt=""></div>-->
                <!--</div>-->
            <!--</el-col>-->
        </el-row>
        <!--搜索-->
        <!--<div class='casetable'>-->
            <!--<el-table ref="multipleTable" :data="tableData"  @select-all="selecAlltcheck"-->
                      <!--tooltip-effect="dark"-->
                      <!--style="width: 100%"-->
                      <!--@selection-change="handleSelectionChange">-->
                <!--<el-table-column type="selection"></el-table-column>-->
                <!--<el-table-column type="index" label="序号" :index="indexMethod" width="80px"></el-table-column>-->
                <!--<el-table-column label="案号" show-overflow-tooltip width="230px">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span type='text' @click='seecaseinfo(scope.row)'-->
                                   <!--style='text-decoration: underline;color:#000'>{{scope.row.caseNumber}}-->
                        <!--</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column prop="causeStr" label="立案案由" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="createCaseDate" label="立案日期" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="undertakerName" label="承办法官" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="lastJudgeName" label="审判长/员" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column prop="partyDes" label="当事人" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="操作" width="350px" show-overflow-tooltip >-->
                    <!--<template slot-scope="scope">-->
                        <!--<div class='isedit'>-->
                            <!--<span @click="SchedulingMon(scope.row)">排期管理</span>-->
                            <!--<span @click="Specialpowers(scope.row)">特殊权限管理</span>-->
                            <!--<span @click="handleDelete(scope.$index,scope.row)">删除</span>-->
                            <!--<span @click="edit(scope.row)">修改</span>-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</div>-->
    </div>
</template>
    <script>
        import {CaseInformation} from "../js/datajson"
        //import checkCaseinfo from '../CaseInformation/checkCaseinfo.vue'//查看案件详情弹框
        //import Scheduling from "../CaseInformation/Scheduling" //特殊权限管理弹框
        //import SchedulingM from "../CaseInformation/SchedulingM" //特殊权限管理弹框
        //import addnewCase from "../CaseInformation/addnewCase" //添加案件管理弹框
        //import eltreeAlert from "../component/eltreeAlert"; //案由选择弹框
        import {mapState,mapActions} from 'vuex'
        export default{
        //注册子组件
        components: {
            //Scheduling,
            //SchedulingM,
            addnewCase:resolve=>{require(['../CaseInformation/addnewCase'],resolve)},
            //checkCaseinfo,
            //eltreeAlert
            },
            data(){
                return{
                    color:'orange',
                    obj:{},
                    yearlist:CaseInformation.yearlist,//年份select,
                    undertakerIdlist: [],//CaseInformation.undertakerIdlist,
                    trialMemberList:[],//CaseInformation.trialMemberList,//审判成员
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
                    isSchedulingM:false,//特殊权限管理弹框
                }
            },
            computed:{
                ...mapState('CaseMangement',[
                    'courtUnitPronounlist',
                    'caseTypePronounlist',
                    'departmentIdlist',
                    'userList'
                ]),
            },
            created(){
                //this.$showLoading('rgba');
                console.log(this.$route.params,this.$el)
            },
            mounted() {
                document.getElementById('div1').innerHTML=2;
                this.obj={id1:1}
                //this.obj.id2=1;
                this.$set(this.obj,'id2',1)
                const arr=[1,2,3,1,3,2];
                console.log([...new Set(arr)])
                console.log([...new Set('aaabbbcddd')])
                console.log([...new Set('aaabbbcddd')].join(''))
                console.log([...new Set('aaabbbcddd')].toString())
                console.log(new Set('aaabbb'))
                console.log(new Set('aa  a  bb b'))
                //console.log(this.obj)
            },
            methods:{
                ...mapActions('CaseMangement',[
                    'getAllcourtPronoun',
                    'getCaseTypePronoun',
                    'getBusinessByCourt',
                    'getUserByCourt'
                ]),
                add1(item){
                    item.id1=item.id1+1;
                    console.log(item)
                },
                add2(item){
                    item.id2=item.id2+1;
                    console.log(item)
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
                        "caseInfoId":row.caseInfoId
                    };
                    this.$http.post('/getAllInfoByCaseInfoId', params).then(res => {
                        if(res.code == 200){
                            this.ischeckCaseinfo = true;
                            this.$refs.checkCaseinfo.getcheck1(res.data);//传check1
                            this.$refs.checkCaseinfo.getcheck2(res.data);//传check2
                            this.$refs.checkCaseinfo.getcheck3(res.data);//传check3
                        }else{ 
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        console.log(err,'/getAllInfoByCaseInfoId')
                        this.$msge('服务器异常，请稍后重试');
                    })
                },
                //单选框
                selectcheck(row){
                    console.log("单选")
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
                        this.multipleSelection = val;
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
                    this.isSchedulingM=true;
                     //调用子组件弹框方法
                    this.$refs.SchedulingM.getTrialPlan(row)
                },
                //同步审判请求
                Synchronized(){
                    this.$router.push({
                        name:'CaseManagement',
                        params:{
                            id:100,
                            name:200
                        }
                    })
                    //this.$msgw('该功能暂未开发')
                },
                //请求法院业务部门民一庭
                getCourt(){
                    this.$msgw('该功能暂未开发')
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
                    this.isaddnewCase=true;
                    //打开弹框
                    this.$refs.addnewCase.show({
                        "courtUnitPronounlist":this.courtUnitPronounlist,
                        "caseTypePronounlist":this.caseTypePronounlist,
                        "trialMemberList":this.trialMemberList,
                        "departmentIdlist":this.departmentIdlist
                    })
                },
                //修改案件按钮
                edit(row){
                    //弹框 发送id请求后台接口数据
                    const params={
                        "caseInfoId":row.caseInfoId
                    };
                    this.$http.post('/getAllInfoByCaseInfoId', params).then(res => {
                        if(res.code == 200){
                            this.$refs.addnewCase.show(
                                {
                                    "courtUnitPronounlist":this.courtUnitPronounlist,
                                    "caseTypePronounlist":this.caseTypePronounlist,
                                    "trialMemberList":this.trialMemberList,
                                    "departmentIdlist":this.departmentIdlist
                                },
                                res.data
                            ) //打开弹框
                        }else{ 
                            this.$msgw(res.message);
                        }
                    }).catch(err => {
                        console.log(err,'/getAllInfoByCaseInfoId')
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
            div{
                margin-left:0.2rem;
                float:right;
                height:0.4rem;
                line-height:0.4;
                cursor: pointer;
                img{
                 height: 100%;    
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
                .fb();
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
                    span {
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