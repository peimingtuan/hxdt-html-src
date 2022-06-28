<template>
    <div class='tabpane1' >
        <!-- 头部展示条件 -->
         <div class="header-right">
            <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                 <el-menu-item index="1" id="firstTeb">平铺视图</el-menu-item>
                 <el-menu-item index="2">列表视图</el-menu-item>
            </el-menu> -->
            <div class="tebBtn">
                <div :class="activeIndex==1?'active':''" @click="handleSelect('1')">平铺视图</div>
                <div :class="activeIndex==2?'active':''" @click="handleSelect('2')">列表视图</div>
            </div>
        </div>
       <!--内容-->
        <div class="table-style">
            <!-- 平铺展示效果 -->
            <div class='imgbox' v-for="item in tableData" :key="item" @click='playMethod(item)'  v-if='activeIndex==1'>
                <div class="img_box"><img src="../images/test-viedo.png" alt=""></div>
                <div class="message_box">
                    <div>案&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：{{item.caseNumber}}</div>
                    <div>开庭时间：{{item.factTime}}</div>
                </div>
            </div>
            <!-- 列表展示效果 -->
            <el-table ref="multipleTable" :data="tableData"  tooltip-effect="dark" v-if='activeIndex==2'
                      style="width: 100%" border>
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
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="prev, pager, next, total, jumper"
                :total="total">
                </el-pagination>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'element-ui'
export default {
    //注册子组件
    components: {

    },
    data() {
        return {
            activeIndex: '1',
            activeName: 'first',
            tableData:[],
            year:'',//年份
            courtUnitPronoun:'',//法院代字
            caseTypePronoun:'',//案件类型代字
            caseNum:'',//案件编号
            startCreateCaseDate:'',//起始立案日期（搜索用）
            endCreateCaseDate:'',//结束立案日期（搜索用）
            departmentId:'',//承办部门id
            undertakerId:'',//承办法官id
            lastJudgeName:'',//审判长/员id
            pageIndex:1,//当前页码
            pageSize:8,//每页大小
            total:9,
            //开始日期
            pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endCreateCaseDate != "") {
                        return time.getTime() > Date.now() || time.getTime() > this.endCreateCaseDate;
                    } else {
                        return time.getTime() > Date.now();
                    }
                }
            },
            //结束日期
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.startCreateCaseDate || time.getTime() > Date.now();
                }
            },
        }
    },
    computed: {

    },
    mounted() {
        this.getTableData();
    },
    methods: {
        // 获取表格数据
        getTableData(){
            let params={
                'year' : this.year == '全部' ? '' : this.year,
                'courtUnitPronoun' : this.courtUnitPronoun == '全部' ? '' : this.courtUnitPronoun,
                'caseTypePronoun' : this.caseTypePronoun == '全部' ? '' : this.caseTypePronoun,
                'caseNum' : this.caseNum,
                'startCreateCaseDate' : this.startCreateCaseDate,
                'endCreateCaseDate' : this.endCreateCaseDate,
                'courtRoomName' : this.courtRoomName,
                'departmentId' : this.departmentId,
                'undertakerId' : this.undertakerId,
                'presidingJudgeId' : this.presidingJudgeId,
                'clerkId' : this.clerkId,
                'trialStatus': 2,
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
                    if(this.tableData.length===0)this.$msgw('暂无数据');
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
        /*点击播放*/
        playMethod(row){
            const href='../videoPlayer/player.html?btn=3&trialPlanId='+row.trialPlanId;
            window.open(href,'_blank','top=0,left=0,toolbar=no,width='+ screen.availWidth +', height='+ screen.availHeight +', menubar=no,resizable=yes, scrollbars=no,location=yes, status=no,alwaysRaised=yes,z-look=yes')
        },
        handleSelect(key){
           this.activeIndex=key;
        },
        handleGoods(){
            alert('请输入url')
        },
        handleCurrentChange(){

        }
    }
}
</script>





<style lang = 'less'>
@import url('../css/common.less');
.tabpane1{
    width: 100%;
    height: 100%;
    .tebBtn{
        float: right;
        width: 10vw;
        height: 3.8vh;
        div{
            float: left;
            font-size: 0.75vw;
            width: 5vw;
            height: 3.8vh;
            line-height: 3.8vh;
            font-size: .75vw;
            color: #909399;
            text-align: center;
            border: 1px solid #b9bec1;
            cursor: pointer;
        }
        .active{
            border: 1px solid #2e8ded;
            color: #57a3f1;
        }
        div:nth-child(1){
            border-right: none;
        }
        div:nth-child(2){
            border-left-color: #2e8ded;
        }

    }
    .el-select-dropdown__empty{
        font-size:14px;
    }
    .header-right{
        width: 100%;
        height: 3.8vh;
    }
    /*.header-right{
        float: right;
        margin-bottom: 2vh;border: 1px solid #2e8ded;
    color: #57a3f1;
        div{
            width: 91px;
            height: 38px;
            color:#333;
            border: solid 1px #b9bec1;;
            text-align: center;
            line-height: 38px;
            font-size: 14px;
            display: inline-block;
            cursor: pointer;
            margin:0;
        }
    }*/

    /*头部公用样式*/
    .head{
        span{
            font-size: 12px;
            color:#333;
    }

    .choice1{
                .el-input {
                width: 232px;
                /* margin-right: 20px; */
                .el-input__inner {
                    height: 26px;
                    line-height: 26px;
                    padding: 0 10px;
                    .f12();
                    }
                }
                .el-input__icon {
                    height: 100%;
                    width: 25px;
                    text-align: center;
                    line-height: 26px;
                }

    }
    .choice2{
                .el-input {
                width: 282px;
                /* margin-right: 20px; */
                .el-input__inner {
                    height: 26px;
                    line-height: 26px;
                    padding: 0 10px;
                    .f12();
                    }
                }
                .el-input__icon {
                    height: 100%;
                    width: 25px;
                    text-align: center;
                    line-height: 26px;
                }

    }
    }
    .div2{
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        flex-flow:row wrap;
    }
    .div3{
        .fl();
        margin-bottom:16px;
         /*按钮的样式*/
        .buttoncss{
            margin-left:215px;
            div{

                display: inline-block;
                width: 63px;
                height: 26px;
                border-radius: 4px;
                .f12();
                text-align: center;
                line-height: 26px;
                cursor: pointer;
            }
            div:first-child{
                background-color: #2e8ded;
            }
            div:last-child{
                background-color: #ffffff;
                border: solid 1px #bfbfbf;
            }
        }
    }
    .div1{
               margin-bottom: 16px;
               div{display: inline-block;}
                /* .fb(); */
                /*法院选择*/
                .choice{
                    margin-right:200px;
                    .f12();
                    /*select*/
                    .el-select {
                        width: 63px;
                        margin-right: 10px;
                        .el-input--suffix .el-input__inner {
                            height: 26px;
                            line-height:26px;
                            padding: 0 10px;
                            .f12();
                        }
                        .el-input__icon {
                            height: 100%;
                            width: 25px;
                            text-align: center;
                            line-height: 26px;
                        }
                    }
                    /*text*/
                    .el-input {
                        width: 63px;
                        /* margin-right: 20px; */
                        .el-input__inner {
                            height: 26px;
                            line-height: 26px;
                            padding: 0 10px;
                            .f12();
                        }
                    }
                }
                /*日期*/
                .date-d{
                    margin-right:207px;
                    .f12();
                    .el-input{
                        width:103px;
                        .el-input__inner{
                            width:103px;
                            height:26px;
                            line-height:26px;
                            .f12();
                            padding:0 20px 0 30px;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: 25px;
                        line-height: 26px;
                        color: #e7e9ee;
                    }
                    .el-icon-date:before{
                        font-size:12px;
                    }
                }
                .ktdd{
                    /* float: right; */
                }
    }

   .table-style{
       width:100%;
       display: block;
       /*display: flex;*/
       /*flex-flow:row wrap;*/
       /*flex:0 0 auto;*/
       /*justify-content: space-between;*/
    }
    .imgbox{
        float: left;
        width:23vw;
        height:28vh;
        position: relative;
        margin-top: 2vh;
        margin-left: 2vw;
        .img_box{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
        }
        .message_box{
            position: absolute;
            bottom: 0;
            z-index: 2;
            width: 100%;
            height: 5.6vh;
            background-color: rgba(0,0,0,0.5);
            div{
                width: 100%;
                height: 2.8vh;
                font-size: 0.75vw;
                color: #fff;
                line-height: 2.8vh;
                padding-left: 0.5vw;
            }
        }
        img{
            
            width:100%;
            height:100%;
        }
    }
    .imgbox:nth-child(4n + 1){
        margin-left: 0;
    }
    .el-table{
        margin-top: 2vh;
    }
}
</style>
