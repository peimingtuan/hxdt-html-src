<template>
    <div class='testtabpane1'>
            <caseinfo :iscaseinfo="iscaseinfo" @selectshow='iscaseinfo=false' @sure='iscaseinfo=false' @cancel='iscaseinfo=false'></caseinfo>
            <!--删除警告弹框-->
            <deletealert :isdelete="isdelete" @closeAlert="isdelete=false" @sure='suredelete' @cancel='isdelete=false'></deletealert>
            <waringalert :iswaring="iswaring" @wareshow="iswaring=false"/>
            <!-- 添加案件按键弹框 -->
            <newTestcase :newcasebox="show" @selectshow='show=false' @sure='show=false' @cancel='show=false'/>
            <!-- 特殊权限管理弹框 -->
            <Scheduling :isScheduling="isScheduling" @Schedulingshow="isScheduling=false"  @sure='isScheduling=false' @cancel='isScheduling=false'></Scheduling>
            <!-- 排期管理弱框 -->
            <SchedulingM :isSchedulingM="isSchedulingM" @SchedulingMshow="isSchedulingM=false"  @sure='isSchedulingM=false' @cancel='isSchedulingM=false'></SchedulingM>
      <el-row class='onerow'>
           <el-col :span=24>
                <!-- <div class="isedit">
                        <el-button type="text" @click="newbutton">添加案件</el-button>
                        <el-button type="text" @click="addrole">关闭测试</el-button>
                </div> -->
                <!-- <div class="head-top">
                        <img src="../images/CaseManagement/1.png"/>
                        案件信息管理 <span>AN JIAN XIN XI GUAN LI</span>
                </div> -->
                <!-- <div class='head-foot'>
                        <el-button type='text' @click='newbutton'><img src="../images/CaseManagement/anniutianjia.png" alt=""></el-button>
                        <el-button type='text' @click='Synchronized'><img src="../images/CaseManagement/anniutongbu.png" alt=""></el-button>
                </div> -->
          </el-col>
      </el-row>
      <el-row class='tworow'>
            <el-col :span=15 class='caseselect'>
                    <el-select v-model="year" placeholder="2019">
                        <el-option
                        v-for="item in options"
                        @change="cityChange"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
                    </el-select>
                    <el-select v-model="courtPronoun" placeholder="全部">
                        <el-option
                        v-for="item in options"
                        @change="cityChange"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
                    </el-select>
                    <el-select v-model="caseTypePronoun" placeholder="全部">
                        <el-option
                        v-for="item in options"
                        @change="cityChange"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
                    </el-select>
                    <el-input style='width:1.5rem'   placeholder="请输入内容" v-model="caseNum" clearable  @keyup.enter.native="searchCases" @clear="searchCases"></el-input><span>号</span>
            </el-col>
            <!-- <el-col :span=4></el-col> -->
            </el-col>
            <el-col :span=9>
                    <el-date-picker
                    v-model="value9"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
            </el-col>
      </el-row>
      <el-row class='threerow'>
          <el-col :span=24>
             <el-input v-model="partyName" style='width:1.8rem' placeholder="当事人"></el-input>
               <el-input v-model="partyAyId" placeholder="立案案由" style='width:3.24rem;padding:0 0.1rem 0 0.19rem'>
               <!-- <el-button @click="handleEdit()"  type='text'style='color:black'>...</el-button> -->
               </el-input>

               <el-select v-model="undertakeDepartmentId" placeholder="承办部门">
                <el-option
                v-for="item in options"
                @change="cityChange"
                :key="item.id"
                :label="item.name"
                :value="item.name">
        </el-option>
               </el-select>
               <el-select v-model="undertakeJudgeId" placeholder="承办法官">
                <el-option
                v-for="item in options"
                @change="cityChange"
                :key="item.id"
                :label="item.name"
                :value="item.name">
        </el-option>
               </el-select>
               <el-select v-model="value" placeholder="审判长/员">
                <el-option
                            v-for="item in options"
                            @change="cityChange"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                    </el-option></el-select>
               <el-select v-model="value" placeholder="审理方式">
                <el-option
                v-for="item in options"
                @change="cityChange"
                :key="item.id"
                :label="item.name"
                :value="item.name">
        </el-option>
               </el-select>
               <el-button type="primary" icon="el-icon-search" @click='searchCases'>搜索</el-button>
          </el-col>
          <!-- <el-col :span=1>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col> -->
      </el-row>
      <el-row>
          <div style='border:1px solid #E5E5E5' class='casetable'>
            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
                <el-table-column label="序号"  type="index" width='100px'> </el-table-column>
                <el-table-column prop="caseNumber"label="案号"></el-table-column>
                <el-table-column prop="createCaseAy"label="立案案由"></el-table-column>
                <el-table-column prop="createDate"label="立案日期"></el-table-column>
                <el-table-column prop="departmentName"label="承办部门"></el-table-column>
                <el-table-column prop="undertakeJudge"label="承办法官"></el-table-column>
                <!-- <el-table-column prop="presidingJudge"label="审判长/员"min-width=5%></el-table-column> -->
                <el-table-column prop="dsr"label="当事人">
                        <template slot-scope="scope">
                                <span v-for='item in scope.row.partyInfo'>{{item.caseStatus}}:{{item.partyName}}</span>
                        </template>:
                </el-table-column>
                <el-table-column  prop="cz"label="操作">
                        <template slot-scope="scope">
                            <div class='isedit'>
                                    <el-button type="text" @click="">闭庭</el-button>
                                    <el-button type="text" @click="">开庭</el-button>
                                    <el-button type="text" @click="">休庭</el-button>
                                    <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    <el-button type="text" @click="">关闭测试</el-button>
                            </div>
                        </template>
                </el-table-column>
              </el-table>
          </div>
      </el-row>
      <div class="up">
            <el-pagination
                class="page"
                @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="10"
              layout="total,prev, pager, next, jumper"
              :total=totalpage
              ref="pagination">
              </el-pagination>
        </div>
    </div>
</template>
<script>
    import caseinfo from '../CaseInformation/caseinfo'//新建案件弹框
    import newTestcase from '../CaseInformation/newTestcase'//新建案件弹框
    import waringalert from "../component/waringalert" //警告弹框
    import deletealert from "../component/deletealert" //删除弹框
    import Scheduling from "../CaseInformation/Scheduling" //特殊权限管理弹框
    import SchedulingM from "../CaseInformation/SchedulingM" //特殊权限管理弹框
    const tableData=require('../testdata/CaseInformation')
    export default{
    //注册子组件
    components: {
        newTestcase,
        waringalert,
        deletealert,
        Scheduling,
        SchedulingM,
        caseinfo
        },
        data(){
            return{
                totalpage:0,//无数据时默认0条
                pageIndex:"",//页码
                input:"",
                handleSizeChange:"",
                // handleCurrentChange:"",
                options: [],
                value: '',
                // currentPage:"",
                currentPage1:1,//数字类型而不是字符串
                value:"",
                clear:"",
                iscaseinfo:false,
                isdelete:false,
                iswaring:false,//警告弹框
                isScheduling:false,//特殊权限管理弹框
                isSchedulingM:false,//特殊权限管理弹框
                value9:'',//日期选择器
                show:false,
                tableData:[],
                'year':2019,
                'courtPronoun':'辽0782',
                'caseTypePronoun':'澳请调',
                'caseNum':'001',
                'startCreateCaseDate':'2019-02-01',
                'startCreateCaseTime':'09:30:00',
                'endCreateCaseDate':'2019-02-12',
                'endCreateCaseTime':'10:30:00',
                'partyName':'张三',
                'partyAyId':'D8246520_E82D_6853_30DC_919AF89031C2',
                'undertakeDepartmentId':'D8246520_E82D_6853_30DC_919AF89031C2',
                'undertakeJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',
                'presidingJudgeId':'D8246520_E82D_6853_30DC_919AF89031C2',
                // multipleSelection: []
            }
        },
        computed:{
           
        },
        mounted() {
            //console.log(this.tableData)
        },
        methods:{
            seecaseinfo(){
                console.log(11)
                this.iscaseinfo=true;
            },
            //单选框
            selectcheck(row){
                // console.log(row.index)
                console.log(row)
                console.log("单选")
            },
            //全选
            // toggleSelection(val){
            //     if(val){
            //         alert(val);
            //         this.multipleTable=[]; // 这里一定要记得，每次点击的时候要清空，因为所有的数据都在一个数组val里，所以
            //         for(var i in val){
            //             this.multipleTable[i]=(val[i].caseId);
            //         }
            //     }
            //     console.log(val)
            //     console.log("多选")
            // },
            //当前单元格
            cellClick(row, column, cell, event){
                console.log(row, column, cell, event)
            },
            //选中当前页码
            handleCurrentChange(val){
                this.pageIndex=val;
                //console.log(this.pageIndex)
                let that=this;
                that.getpagecaseInfos();
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
            // let _this=this;
            // _this.isload=true;
            // const params={
            //     "courtcode": "100010 || 49257884",//法院代码
            //     "userid": "D8246520_E82D_6853_30DC_919AF89031C2",//用户id
            //     "pageIndex":1,
            //     "pageSize":20
            //   };
            // _this.$http.post('/cms/nosecure/getCaseInfosByPages.action', params).then(data => {
            //     _this.isload=false;
            //     if (data.Code == 1) {
            //         _this.tablesinfo=[];//清空所有表格数据
            //         let lengths = res.datas.length;
            //         //alert(lengths)
            //         if(lengths==0){
            //         _this.$message("暂无数据")
            //         }else{
            //             for(var i=0;i<lengths;i++){
            //                 let datainfo; //当前行的所有信息
            //                 datainfo=res.datas[i];
            //                 //console.log(datainfo)
            //                 let dsr;//当事人
            //                 if(res.datas[i].partys.length==0){//当事人为空
            //                 dsr = "";
            //                 }else{
            //                     for(var j= 0; j < res.datas[i].partys.length;j++){
            //                         //alert(11)
            //                         if(dsr == null || dsr == ''){
            //                         dsr=res.datas[i].partys[j].caseStatus+":"+res.datas[i].partys[j].partyName;
            //                         }else{
            //                         dsr=dsr+","+res.datas[i].partys[j].caseStatus+":"+res.datas[i].partys[j].partyName;
            //                         }
            //                     };
            //                 }
            //                 _this.tablesinfo.push({
            //                     dsr:dsr
            //                 })

            //             }
            //         }
            //         //返回总条数
            //         if( Number(res.count)==''){
            //         _this.totalpage=0;
            //         }else{
            //         _this.totalpage = Number(res.count)
            //         }
            //       //this.serverId=datas.serverId;
            //     } else {
            //         _this.$msgw(data.Message);
            //     }
            // }).catch(err => {
            //     _this.isload=false;
            //     _this.$msge('服务器异常，请稍后重试');
            // })
        },
        //搜索查询案件信息按键
            searchCases(){
                // let _this=this;
                // _this.isload=true;
                // const params={
                //     "courtcode": "100010 || 49257884",//法院代码
                //     "userid": "D8246520_E82D_6853_30DC_919AF89031C2",//用户id
                //     'pageIndex':0,
                //     'pageSize':20,
                //     'year':this.year,
                //     'courtPronoun':this.courtPronoun,
                //     'caseTypePronoun':this.caseTypePronoun,
                //     'caseNum':'001',
                //     'startCreateCaseDate':this.startCreateCaseDate,
                //     'startCreateCaseTime':'09:30:00',
                //     'endCreateCaseDate':this.endCreateCaseDate,
                //     'endCreateCaseTime':'10:30:00',
                //     'partyName':this.partyName,
                //     'partyAyId':this.partyAyId,
                //     'undertakeDepartmentId':this.undertakeDepartmentId,
                //     'undertakeJudgeId':this.undertakeJudgeId,
                //     'presidingJudgeId':this.presidingJudgeId,
                //     'trialMode':0
                // };
                // //console.log(this.presidingJudgeId)
                // _this.$http.post('/cms/nosecure/saveAuthority.action', params).then(data => {
                // _this.isload=false;
                // if (data.Code == 1){
                        
                //     }
                //     else
                //     { _this.$msgw(data.Message);}
                // }).catch(err => {
                //     _this.isload=false;
                //     _this.$msge('服务器异常，请稍后重试');
                // })
                // this.iswaring=true;
            // },

            },
            //特殊权限管理
            Specialpowers(){
                this.isScheduling=true;
                    // params: {
                    // caseId: row.ahdm,
                    // caseNumber: row.ah
                    // }
            },
            //排期管理
            SchedulingM(){
                this.isSchedulingM=true;
            },
            //同步审判请求
            Synchronized(){
            // let _this=this;
            // _this.isload=true;
            // const params={
            //     "courtcode": "100010 || 49257884",//法院代码
            //     "userid": "D8246520_E82D_6853_30DC_919AF89031C2",//用户id
            //   };
            // _this.$http.post('/cms/nosecure/synchronizeTrialProcessData.action', params).then(data => {
            //     _this.isload=false;
            //     if (data.Code == 1){

            //         }
            //         else
            //         { _this.$msgw(data.Message);}
            //     }).catch(err => {
            //         _this.isload=false;
            //         _this.$msge('服务器异常，请稍后重试');
            //     })
                // this.iswaring=true;
            },
            //打开删除弹框
            handleDelete(){
                this.isdelete=true;
            },
            //确认删除
            suredelete(index,row){
                console.log(11)
                this.isdelete=false;
                // this.$refs.multipleTable.toggleRowSelection(row);
            },
            //新建案件
            newbutton(){
                console.log(111)
                this.show=true;
                //弹框
            },
            //确认新建案件
            surenew(){
                console.log(确认)
            //     this.show=false;
            //     let _this=this;
            //     _this.isload=true;
            // const params={
            //     "courtcode": "100010 || 49257884",//法院代码
            //     "userid": "D8246520_E82D_6853_30DC_919AF89031C2",//用户id
            //     "pageIndex":1,
            //     "pageSize":20
            //     };
            //     _this.$http.post('/cms/nosecure/saveCaseInfo.action', params).then(data => {
            //         _this.isload=false;
            //     if (data.Code == 1) {}

            //     else{
            //         _this.$msgw(data.Message);
            //     }
            //     }).catch(err => {
            //         _this.isload=false;
            //         _this.$msge('服务器异常，请稍后重试');
            //     })
            },
            //修改案件
            handleEdit(val){
                console.log(val)
            this.show=true;
            },
    // 删除选中行
        // deleteRow(index, rows) {
        //     rows.splice(index, 1);
        // }
        deleted() {
        for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
            this.tableData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.tableData.splice(i, 1)
            }
            })
        })
        }
        // 删除完数据之后清除勾选框
        this.$refs.tableData.clearSelection()
      }
    }
}
</script>
<style lang='less'>
    @import url('../css/common.less');
.testtabpane1{
    .mr();
font-size:0.18rem;
/*表格内容区域*/
.casetable{
    /* .elTable td{
        padding:0.6px 0!important;
       height:0.52rem;
    } */
    margin-top:0.2rem;
    th,td{
        text-align:center;
    }
    th{
        color: #151515;
        background:#cbe5f3;
        div{
            font-size: 0.2rem;
        }
    }
    /*下划线*/
    .el-button--text{
        color:#000;
    }
    /*表格高度*/
    .el-table{
        /*overflow: hidden;*/
        /*height:8.62rem;*/
        text-align:center;
    }
    /*暂无数据*/
    .el-table__empty-text{
        font-size: 0.18rem;
    }
    /*操作颜色*/
    td div.isedit span{
            color: #409eff;
        }
            
    }
    .onerow{
        /* margin-bottom:0.1rem; */
    }
    .tworow{
        margin-top:0.1rem;
        span{
          font-size: 0.2rem;
        }
        .el-select
        {
            width:2.48rem;
            padding-bottom: 0.12rem;
            margin-right: 0.18rem;
        }
         .el-input{ 
            font-size: 0.18rem;
            .el-input__icon{
                        width: .25rem;
                        line-height: .4rem;
                        color: #e7e9ee;
                    }
            /* .el-date-editor .el-range-separator{
                line-height: 20px;
            } */
        }
        /*这是输入框的高*/
        .el-input__inner{
            height:0.4rem;
        }
        .el-date-editor .el-range-input{
            font-size: 0.18rem;
        }

    }
    .tworow{
        .el-col-9{
            text-align: right;
            
        }
        .el-input__inner{
            width:100%;
        }
    }
    .threerow{
        .el-input{
            font-size:0.18rem;
        .el-input__icon{
                    width: .25rem;
                    line-height: .4rem;
                    color: #e7e9ee;
                    font-size:0.18rem;
                }
        }
        .el-select{
            width:2.28rem;
            margin-right:0.1rem;
            /* padding-bottom: 0.2rem; */
        }
        .el-select:nth-child(1){
            width:1.54rem;
        }
        .el-select:nth-child(2){
            width:3.15rem;
        }
        .el-col-2 {
                text-align: right
            }
        .el-input__inner{
            height:0.4rem;
        }
          /*button*/
          .el-button {
                        position: relative;
                        left:0.3rem;
                        top: -.02rem;
                        width: .9rem;
                        line-height: .36rem;
                        padding: 0;

                        .el-icon-search {
                            font-size:0.18rem;
                            color: #fff;
                        }

                        span {
                            font-size:0.18rem;
                            color: #fff;
                        }
                    }
    }
.up{
        /*分页*/
        .page{
            margin:.2rem 0;
            span{
                font-size: 0.18rem;
            }
            input{
                font-size: 0.18rem;
            }
            text-align: center;
            li.number{
                font-size: 0.18rem;

            }
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
        .el-button{
            height:0.4rem;
            line-height:0.4;
        }
        img{
            width:1rem;
        }
        
    }
}
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>