<template>
    <div class='CaseManagement'>
    <!--<addoperate ref='addoperate' :isaddoperate="isaddoperate"></addoperate>-->
    <!--删除警告弹框-->
      <!-- <deletealert :isdelete="isdelete" @closeAlert="isdelete=false" @sure='suredelete' @cancel='isdelete=false'></deletealert> -->
      <!-- 特殊权限管理弹框 -->
      <!--<Scheduling :isScheduling="isScheduling" @Schedulingshow="isScheduling=false"  @sure='isScheduling=false' @cancel='isScheduling=false'></Scheduling>-->
      <!--<importfile  :isimportfile="isimportfile" @wareshow="closeware" @sure='isimportfile=false' @cancel='isimportfile=false'/>-->
      <!--<fileExport  :isfileExport="isfileExport" @wareshow="closeware" @sure='isfileExport=false' @cancel='isfileExport=false'/>-->
        <!--&lt;!&ndash;案由选择弹框&ndash;&gt;-->
        <!--<eltreeAlert ref="eltreeAlert" @sureChoice="sure" />-->
      <el-row class='onerow'>
           <el-col :span=24>
                <div class="head-top">
                        <img src="../images/CaseManagement/anjianpaiqi.png"/>
                        案件排期管理 <span>AN JIAN PAI QI GUAN LI</span>
                </div>
                <div class='head-foot'>
                        <div type='text' @click='leadout'><img src="../images/CaseManagement/daochutingshen.png" alt=""></div>
                        <div type='text' @click='isimportfile=true'><img src="../images/CaseManagement/daorutingshen.png" alt=""></div>
                </div>
          </el-col>
      </el-row>
    </div>
</template>
<script>
    import {CaseManagement} from "../js/datajson"
    //import Scheduling from "../CaseInformation/Scheduling" //特殊权限管理弹框
    //import importfile from "../CaseManagement/importfile" //导入文件
    //import fileExport from "../CaseManagement/fileExport" //导出文件
    //import deletealert from "../component/deletealert" //删除弹框
    //const addoperate=()=>import("../CaseManagement/addoperate") //删除弹框
    //import {mapState,mapActions} from 'vuex'
    //const eltreeAlert=()=>import("")
    export default{
        name:'CaseManagement',
        components: {
            //importfile,
            //fileExport,
            //Scheduling,
            //deletealert,
            //addoperate:resolve=>{require(['../CaseManagement/addoperate'],resolve)},
            //eltreeAlert:resolve=>{require(['../component/eltreeAlert'],resolve)}
        },
        data(){
            return{
                isaddoperate:false,
                isScheduling:false,//特殊权限管理弹框
                isimportfile:false,
                isfileExport:false,
                yearlist:CaseManagement.year,//年份select,
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
                        "id":3
                    },
                    {
                        "name":"继续庭审",
                        "id":4
                    },
                    {
                        "name":"庭审结束",
                        "id":5
                    },
                    {
                        "name":"其它",
                        "id":255
                    },
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
             multipleSelection:[]
            }
        },
        computed:{
            // ...mapState('CaseMangement',[
            //     'courtUnitPronounlist',
            //     'caseTypePronounlist',
            //     'departmentIdlist',
            //     'ftlist',
            //     'userList'
            // ]),
        },
        filters:{
            trialStatusselect(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='等待开庭';
                        break;
                    case 2 || 4:
                        s='正在开庭';
                        break;
                    case 3:
                        s='休庭';
                        break;
                    case 5:
                        s='庭审结束';
                        break;
                    case 255:
                        s='其它';
                        break;
                }
                return s
            }
        },
        created(){
            //this.$showLoading('rgba');
            console.log(200,this.$route.params)
        },
        mounted() {
            // if(this.courtUnitPronounlist.length>0){
            //     this.getcaselist().then(()=>{
            //         this.$hideLoading('rgba');
            //     })
            // }else{
            //     Promise.all([this.getAllcourtPronoun(this),this.getCaseTypePronoun(this),this.getBusinessByCourt(this),this.getUserByCourt(this),this.getCourtRooms(this),this.getcaselist()]).then(()=>{
            //         this.$hideLoading('rgba');
            //     });
            // }
        },
        methods:{
            // ...mapActions('CaseMangement',[
            //     'getAllcourtPronoun',
            //     'getCaseTypePronoun',
            //     'getBusinessByCourt',
            //     'getCourtRooms',
            //     'getUserByCourt'
            // ]),
            leadout(){
              this.$router.push({
                  name:'CaseInformation',
                  params:{
                      id:300,
                      names:400
                  }
              })
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
                this.$msgw('暂无接口');
                return false;
                this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/caseManage/deleteCaseInfo', {
                        "caseInfoIds":[
                            {"caseInfoId":row.caseInfoId},//案号id
                        ]
                    }).then( res =>{
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
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
                if(this.startCreateCaseDate!='')this.startCreateCaseDate=FoundationTools.getFormatDate2(this.startCreateCaseDate)
                if(this.endCreateCaseDate!='')this.endCreateCaseDate=FoundationTools.getFormatDate2(this.endCreateCaseDate)
                //根据查询条件获取案件(案件无是否刻录)
                return  this.$http.post('/caseManage/searchTrialPlan', {
                    year:this.year == '全部'?'':this.year, //年份
                    courtUnitPronoun:this.courtUnitPronoun == '全部'?'':this.courtUnitPronoun, //法院代字
                    caseTypePronoun:this.caseTypePronoun == '全部'?'':this.caseTypePronoun, //案件类型代字
                    caseNum:this.caseNum, //案件编号
                    startTrialDate:this.startCreateCaseDate, //起始立案日期（搜索用）
                    endTrialDate:this.endCreateCaseDate, //结束立案日期（搜索用）
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
                }).then( res =>{
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
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
                    span{
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
                    width: 1.8rem;
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
                    width: 1.8rem;
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
        div{
            cursor: pointer;
            float:right;
            margin-left:0.1rem;
            height:0.4rem;
            line-height:0.5;
            img{
            height: 100%;
            }
        }
    }
     @import url('../css/element.less');
}
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
