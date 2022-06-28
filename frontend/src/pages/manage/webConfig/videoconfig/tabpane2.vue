<template>
    <div class='tabpane2'>
        <div class="head">
                 <div class="div1">
                        <div class="choice">
                            <span>案号:</span>
                            <el-select v-model="year" placeholder="2018" >
                                <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                            <el-select v-model="courtPronoun" filterable placeholder="选择法院代字">
                                <el-option v-for="item in courtUnitPronounlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                </el-option>
                            </el-select>
                            <el-select v-model="caseTypePronoun" filterable placeholder="选择案件类型代字">
                                <el-option v-for="item in caseTypePronounlist"  :key="item.caseTypeId" :label="item.caseTypePronoun" :value="item.caseTypePronoun" v-if="item.caseTypePronoun">
                                </el-option>
                            </el-select>
                            <el-input v-model="caseNum" placeholder="输入案号" clearable></el-input>号
                        </div>
                        <div class="date-d">
                            <span>开庭时间:</span>
                                <el-date-picker v-model="startCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions0"  placeholder="请选择">
                                </el-date-picker>
                                至
                                <el-date-picker v-model="endCreateCaseDate" type="date" :clearable=true :picker-options="pickerOptions1"  placeholder="请选择">
                                </el-date-picker>
                        </div>
                        <div class="choice1">
                            <span>开庭地点:</span>
                            <el-select v-model="courtRoomName" filterable placeholder="开庭地点">
                                <el-option
                                        v-for="item in departmentIdlist" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                                </el-option>
                            </el-select>
                        </div>
                  </div>
                  <div class="div2">
                            <div class="choice2">
                             <span>审判长:</span>
                             <el-select v-model="presidingJudgeId" filterable placeholder="审判长">
                                <el-option
                                        v-for="item in trialMemberList" :key="item.userId" :label="item.userName" :value="item.userId">
                                </el-option>
                            </el-select>
                            </div>
                            <div class="choice1 choice11">
                                <span>书记员:</span>
                                <el-select v-model="clerkId" filterable placeholder="书记员">
                                        <el-option
                                                v-for="item in trialMemberList" :key="item.userId" :label="item.userName" :value="item.userId">
                                        </el-option>
                                </el-select>
                            </div>
                            <div class="choice1 choice12">
                                <span>承办部门:</span>
                                <el-select v-model="departmentId" filterable placeholder="承办部门">
                                        <el-option
                                                v-for="item in departmentIdlist" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId">
                                        </el-option>
                                    </el-select>
                            </div>
                       </div>
                <div class="div3">
                    <div class="choice2">
                            <span>承办人:</span>
                        <el-select v-model="undertakerId" filterable  placeholder="承办人">
                            <el-option
                                    v-for="item in trialMemberList" :key="item.userId" :label="item.userName" :value="item.userId">
                            </el-option>
                        </el-select>
                    </div>
                     <div class="buttoncss">
                        <div @click="searchData">查询</div>
                        <div @click="reset">重置</div>
                    </div>
                </div>

        </div>
        <!--内容-->
        <div class="table-style">
            <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark"
                      style="width: 100%" border
                      @selection-change="handleSelectionChange">
                <el-table-column type="index" label="序号" :index="indexMethod" width='50px' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseNumber" label="案号" show-overflow-tooltip width='200px'>
                </el-table-column>
                <el-table-column prop="courtTime" label="庭次" show-overflow-tooltip width='50px'>
                </el-table-column>
                <el-table-column prop="causeStr" label="立案案由" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="undertakerName" label="承办人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="partyDes" label="当事人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="presidingJudge" label="审判长" show-overflow-tooltip>
                </el-table-column>
                 <el-table-column prop="clerkName" label="书记员" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="courtRoomName" label="开庭地点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="factTime" label="开庭时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="playMethod(scope.row)">播放</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
                <el-pagination class="page" background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=1
                :page-size=10
                layout="prev, pager, next, total, jumper"
                :total="total">
                </el-pagination>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui'
    import {musicvideoment} from '../js/datajson'
    import FoundationTools from "../../../../js/functionAjax";
export default {
    //注册子组件
    components: {

    },
    data() {
        return {
            yearlist: musicvideoment.yearlist,// 年份select,
            courtUnitPronounlist: [], // 法院代字select,
            caseTypePronounlist: [], // 案件类型代字select,
            departmentIdlist: [], // 承办部门select,
            trialMemberList: [], // 审判成员
            tableData: [], // 表格数据

            year: '全部', // 年份
            courtPronoun: '全部', // 法院代字
            caseTypePronoun: '全部', // 案件类型代字
            caseNum: '', // 案件编号
            startCreateCaseDate: '', // 起始立案日期（搜索用）
            endCreateCaseDate: '', // 结束立案日期（搜索用）
            courtRoomName: '', // 开庭地点
            departmentId: '', // 承办部门id
            undertakerId: '', // 承办人id
            presidingJudgeId: '', // 审判长/员id
            clerkId: '', // 书记员
            pageIndex: 1, // 当前页码
            pageSize: 10, // 每页大小
            total: 0,
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
        }
    },
    computed: {

    },
    mounted() {
        
    },
    methods: {
        // 获取所有法院代字
        getAllcourtPronoun(){
            const params = {};
            this.$http.post('/baseInfo/getAllcourtPronoun', params).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        this.courtUnitPronounlist = res.data;
                        this.courtUnitPronounlist.unshift({
                            "courtPronoun":"全部",
                            "courtCode":""
                        })
                    })
                } else {
                    this.$msgw(res.message);
                }
            }).catch(err => {

            })
        },
        // 获取所有案件类型代字
        getCaseTypePronoun(){
            const params = {};
            this.$http.post('/baseInfo/getCaseTypePronoun', params).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        this.caseTypePronounlist = res.data;
                        this.caseTypePronounlist.unshift({
                            "caseTypePronoun":"全部",
                            "caseTypeId":""
                        })
                    })
                } else {
                    this.$msgw(res.message);
                }
            }).catch(err => {

            })
        },
        // 获取法院部门
        getBusinessByCourt(){
            const params = {};
            this.$http.post('/baseInfo/getDepartmentByCourt', params).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        this.departmentIdlist = res.data;
                        this.departmentIdlist.unshift({
                            "departmentName":"全部",
                            "departmentId":""
                        })
                    })
                } else {
                    this.$msgw(res.message);
                }
            }).catch(err => {

            })
        },
        // 获取当前法院用户
        geUserByCourt(){
            const params = {};
            this.$http.post('/baseInfo/getUserByCourt', params).then( res => {
                if (res.code == 200) {
                    setTimeout(() => {
                        this.trialMemberList = res.data;
                        this.trialMemberList.unshift({
                            "userName":"全部",
                            "userId":""
                        })
                    })
                } else {
                    this.$msgw(res.message);
                }
            }).catch(err => {

            })
        },
        // 获取表格数据
        getTableData(){
            let params={
                'year' : this.year == '全部' ? '' : this.year,
                'courtPronoun' : this.courtPronoun == '全部' ? '' : this.courtPronoun,
                'caseTypePronoun' : this.caseTypePronoun == '全部' ? '' : this.caseTypePronoun,
                'caseNum' : this.caseNum,
                'startCreateCaseDate' : this.startCreateCaseDate?FoundationTools.getFormatDate2(this.startCreateCaseDate):'',
                'endCreateCaseDate' : this.endCreateCaseDate?FoundationTools.getFormatDate2(this.endCreateCaseDate):'',
                'courtRoomName' : this.courtRoomName,
                'departmentId' : this.departmentId,
                'undertakerId' : this.undertakerId,
                'presidingJudgeId' : this.presidingJudgeId,
                'clerkId' : this.clerkId,
                'trialStatusArray':[3,4],
                'pageIndex' : this.pageIndex,
                'pageSize' : this.pageSize,
            };
            let loadingInstance = Loading.service({text:'加载中...'});
            this.$http.post('/caseManage/searchTrialPlan', params).then( res => {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                if (res.code == 200) {
                    for(let i = 0; i < res.data.length; i ++){
                        res.data[i].factTime = res.data[i].factStartDate + ' ' + res.data[i].factStartTime;
                    }
                    this.tableData = res.data;
                    //返回总条数
                    if( Number(res.count)==''){
                        this.total=0;
                    }else{
                        this.total = Number(res.count)
                    }
                } else {
                    this.$msgw(res.message);
                }
            }).catch( err => {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
            })
        },
        // 分页
        handleCurrentChange(page){
            this.pageIndex = page;
            this.getTableData();
        },
        // 查询
        searchData(){
            this.pageIndex = 1;
            this.getTableData();
        },
        // 重置
        reset(){
            this.year = '全部';
            this.courtPronoun = '全部';
            this.caseTypePronoun = '全部';
            this.caseNum = '';
            this.startCreateCaseDate = '';
            this.endCreateCaseDate = '';
            this.courtRoomName = '';
            this.departmentId = '';
            this.undertakerId = '';
            this.lastJudgeName = '';
            this.clerkId = '';
            this.pageIndex = 1;
            this.getTableData();
        },
        /*点击播放*/
        playMethod(row){
            const href='../videoPlayer/player.html?btn=2&videoFileStage=2&caseInfoId='+row.caseInfoId+'&choicecourtTime='+row.courtTime;
            window.open(href,'_blank','top=0,left=0,toolbar=no,width='+ screen.availWidth +', height='+ screen.availHeight +', menubar=no,resizable=yes, scrollbars=no,location=yes, status=no,alwaysRaised=yes,z-look=yes')
        }
    }
}
</script>

<style lang = 'less'>
@import url('../css/common.less');
.tabpane2{
    width:100%;
    .content{
        width: 80%;
        margin: 0 18px;
    }
    .el-select-dropdown__empty{
        font-size:14px;
    }

    /*头部公用样式*/
    .head{
            span{
                font-size: 0.75vw;
                color:#333;
            }

             .choice1{
                        .el-input {
                        width: 11vw;
                        /* margin-right: 20px; */
                        .el-input__inner {
                            height: 3.5vh;
                            line-height: 3.5vh;
                            padding: 0 10px;
                            .f12();
                            }
                        }
                       .el-input__icon {
                            height: 100%;
                            width: 25px;
                            text-align: center;
                            line-height: 3vh;
                        }

            }
            .choice2{
                width: 29vw;
                 margin-right: 13vw;
                .el-input {
                    width: 24vw;
                    .el-input__inner {
                        height: 3.5vh;
                        line-height: 3.5vh;
                        padding: 0 10px;
                        font-size: 0.75vw;
                    }
                }
               .el-input__icon {
                    height: 100%;
                    width: 1vw;
                    text-align: center;
                    line-height: 3.5vh;
                }

            }
    }
    /*第一行*/
    .div1{
               margin-bottom: 1.5vh;
               div{display: inline-block;}
                /* .fb(); */
                /*法院选择*/
                .choice{
                    width: 29vw;
                    margin-right: 13vw;
                    font-size: 0.75vw;
                    /*.f12();*/
                    /*select*/
                    .el-select {
                        width: 5vw;
                        margin-right: 1vw;
                        .el-input--suffix .el-input__inner {
                            height: 3.5vh;
                            line-height:3.5vh;
                            padding: 0 10px;
                            font-size: 0.75vw;
                        }
                        .el-input__icon {
                            height: 100%;
                            width: 1vw;
                            text-align: center;
                            line-height: 3.5vh;
                        }
                    }
                    /*text*/
                    .el-input {
                        width: 5vw;
                        margin-right: 0.5vw;
                        .el-input__inner {
                            height: 3.5vh;
                            line-height: 3.5vh;
                            padding: 0 10px;
                            font-size: 0.75vw;
                        }
                    }
                }
                /*日期*/
                .date-d{
                    width: 20vw;
                    margin-right:14vw;
                    .f12();
                    .el-input{
                        width:7vw;
                        .el-input__inner{
                            width:7vw;
                            height:3.5vh;
                            line-height:3.5vh;
                            font-size: 0.75vw;
                            padding:0 20px 0 30px;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: 1vw;
                        line-height: 3.5vh;
                        color: #e7e9ee;
                    }
                    .el-icon-date:before{
                        font-size:12px;
                    }
                }

    }
    /*第二行*/
    .div2{

        margin-bottom: 2vh;
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*flex-flow:row wrap;*/
        .choice2{
            display: inline-block;
            width: 29vw;
            margin-right: 13vw;
        }
        .choice11{
            display: inline-block;
            width: 20vw;
            margin-right: 14vw;
        }
        .choice11 .el-input{
            width: 16vw;
        }
        .choice12{
            display: inline-block;
            width: 16vw;
            /*margin-left: 22.6vw;*/
        }
    }
    /*第三行*/
    .div3{
        .fl();
        margin-bottom:2vh;
         /*按钮的样式*/
        .buttoncss{
            div{

                display: inline-block;
                width: 3vw;
                height: 2.7vh;
                border-radius: 4px;
                font-size: 0.75vw;
                text-align: center;
                line-height: 2.7vh;
                cursor: pointer;
            }
            div{
                background-color: #ffffff;
                border: solid 1px #bfbfbf;
            }
            div:hover{
                background-color: #2e8ded;
                border: solid 1px #2e8ded;
                color: #fff;
            }
        }
    }


   .table-style{
       width:100%;
       display: flex;
       flex-flow:row wrap;
       flex:0 0 auto;
       justify-content: space-between;
    }
}
</style>
