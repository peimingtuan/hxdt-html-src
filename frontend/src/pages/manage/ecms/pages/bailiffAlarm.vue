<template>
    <div class="bailiffAlarm">
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2" />
        </div>
        <div class="top">
            <div class="le">
<!--                <el-button class="blu" @click="openimprint">导出</el-button>-->
                <div class="date-d">
                    <el-date-picker
                            v-model="searchStartDate"
                            type="date"
                            placeholder="报警开始时间"
                            :clearable="true"
                            :picker-options="pickerOptions0"
                    ></el-date-picker>至
                    <el-date-picker
                            v-model="searchEndDate"
                            type="date"
                            placeholder="报警结束时间"
                            :clearable="true"
                            :picker-options="pickerOptions1"
                    ></el-date-picker>
                </div>
            </div>
            <div class="ri">
                <el-input v-model.trim="searchCondition" placeholder="法庭名称/值班法警"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search(searchCondition)">搜索</el-button>
            </div>
        </div>
        <div class="table-style">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号"  width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="courtRoomName" label="法庭名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="报警时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.alarmDate}} {{scope.row.alarmTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="出警时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.outDate}} {{scope.row.outTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="处理时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div>{{scope.row.processTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="policeClientName" label="值班法警" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.policeAlarmRecordUsers.length>0">{{scope.row.policeAlarmRecordUsers.map(item=>{return item.userName}).toString()}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="processTimeDsc" label="警情描述" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import leftTile from "../component/leftTile";
    import FoundationTools from "../../../../js/functionAjax";
    export default {
        name: "bailiffAlarm",
        components:{
            leftTile
        },
        data(){
            return{
                imgurl: require("../images/yingyongpeizhi/pingtaipeizhi3.png"),
                text: "法警报警记录管理",
                text2: "FA JING BAO JING JI LU GUAN LI",
                searchStartDate:'',
                searchEndDate:'',
                //开始日期
                pickerOptions0: {
                    disabledDate: time => {
                        if (this.searchEndDate) {
                            return time.getTime() > this.searchEndDate;
                        }
                    }
                },
                //结束日期
                pickerOptions1: {
                    disabledDate: time => {
                        if (this.searchStartDate) {
                            return time.getTime() < this.searchStartDate;
                        }
                    }
                },
                searchCondition:'',
                tableData:[],
                searchFlag:1,
                total:0,
                pageIndex:1,
                pageSize:10,
            }
        },
        created(){
            this.getPoliceAlarmRecords()
        },
        methods:{
            getPoliceAlarmRecords(){
                let {searchCondition,searchStartDate,searchEndDate,searchFlag,pageIndex,pageSize}=this;
                const _this=this;
                _this.$showLoading("rgba")
                if (searchStartDate)searchStartDate = FoundationTools.getFormatDate2(searchStartDate);
                if (searchEndDate)searchEndDate = FoundationTools.getFormatDate2(searchEndDate);
                _this.$http
                    .post("/policeAlarmRecord/getPoliceAlarmRecords", {
                        searchCondition,
                        searchStartDate,
                        searchEndDate,
                        searchFlag,
                        pageIndex, //当前页码
                        pageSize //每页大小
                    })
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {
                            _this.total = data.count;
                            _this.tableData = data.data;
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading("rgba");
                        console.log(err, "/policeAlarmRecord/getPoliceAlarmRecords");
                    });
            },
            search(){
                this.pageIndex=1;
                this.getPoliceAlarmRecords();
            },
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getPoliceAlarmRecords();
            },
            indexMethod(index){
                return (this.pageIndex - 1) * 10 + index + 1; //当前条数
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .bailiffAlarm{
        .mr();
        padding: 0 .2rem;
        .head {
            padding: .2rem 0;
        }
        .table-style{
            margin-top:.2rem;
        }
        .page{
            margin:.2rem 0;
            text-align:center;
        }
        @import url('../css/uppage.less');
    }
</style>
<style lang="less">
    .bailiffAlarm{
        .top{
            .fb();
            .le{
                .fl();
                .el-button {
                    width: 0.99rem;
                    line-height: 0.37rem;
                    padding: 0;
                    span {
                        .f16();
                    }
                }
                .blu {
                    margin-right:.5rem;
                    background: #edf5ff;
                    border: 1px solid #bedeff;
                    span {
                        color: #409eff;
                    }
                }
                .date-d {
                    .f18();
                    .el-input {
                        width: 3.4rem;
                        .el-input__inner {
                            .wh(3.4rem, 0.4rem);
                            line-height: 0.4rem;
                            .f20();
                            padding: 0 0.2rem 0 0.4rem;
                        }
                    }
                    /*矢量图标*/
                    .el-input__icon {
                        width: 0.25rem;
                        line-height: 0.4rem;
                        color: #e7e9ee;
                    }
                    .el-icon-date:before {
                        font-size: 0.18rem;
                    }
                }
            }
            .ri{
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: .1rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
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
        @import url('../css/element.less');
    }
</style>