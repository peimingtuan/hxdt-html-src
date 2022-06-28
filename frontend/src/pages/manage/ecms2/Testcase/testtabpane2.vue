<template>
    <div class="testtabpane2">
        <!--头部-->
        <div class="head-top">
            <!-- <div class="le">
                庭审音视频管理 <span>TING SHEN YIN SHI PIN GUAN LI</span>
            </div>
            <div class="ce">
                <el-radio v-model="radio" label="1" @change="radiochange">按案件查看</el-radio>
                <el-radio v-model="radio" label="2" @change="radiochange">按排期查看</el-radio>
            </div> -->
            <div class="ri">
                <el-button class="blu" @click="openimprint">刻录</el-button>
                <el-button class="blu">下载</el-button>
                <el-button class="blu">导出列表</el-button>
            </div>
        </div>
        <!--搜索-->
        <div class="head-search">
            <div class="div1">
                <div class="choice">
                    <el-select v-model="statusvalue" placeholder="2019">
                        <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="statusvalue" placeholder="北京法院">
                        <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="statusvalue" placeholder="全部">
                        <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                    <el-input v-model="input" placeholder=""></el-input>号
                </div>
                <div class="date-d">
                    <el-date-picker v-model="datestartval" type="date" :clearable=true :picker-options="pickerOptions0">
                    </el-date-picker>
                    至
                    <el-date-picker v-model="dateendval" type="date" :clearable=true :picker-options="pickerOptions1">
                    </el-date-picker>
                </div>
            </div>
            <div class="div2">
                <el-input v-model="input" class="d-s-r" placeholder="当事人"></el-input>
                <div class="case-yo">
                    <el-input v-model="input" placeholder="立案人案由"></el-input>
                    <span>...</span>
                </div>
                <el-select v-model="statusvalue" placeholder="承办部门">
                    <el-option
                            v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <el-select v-model="statusvalue" placeholder="承办法官">
                    <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <el-select v-model="statusvalue" placeholder="审判长/员">
                    <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <el-select v-model="statusvalue" placeholder="是否刻录">
                    <el-option v-for="item in options" @change="cityChange" :key="item.id" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
        </div>
        <!--内容-->
        <div class="main">
            <el-table ref="multipleTable" :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck" tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px">
                    <!--<template slot-scope="scope">{{scope.row.$index}}</template>-->
                </el-table-column>
                <el-table-column prop="caseNumber" label="案号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="caseAyStr" label="案由"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createdDate" label="立案日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否刻录" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.isBurn==0">未刻录</span>
                        <span v-else-if="scope.row.isBurn==1">已刻录</span>
                    </template>
                </el-table-column>
                <el-table-column prop="departmentName" label="承办部门" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="undertakeJudge" label="承办法官" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="presidingJudge" label="审判长/员" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="当事人" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-for="item in scope.row.partyInfo">
                            <span>{{item.caseStatus}}</span>
                            <span>{{item.partyName}}</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="times" label="开庭次数" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="handleGoods(scope.row)">播放</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--底部-->
        <div class="up">
            <!--分页-->
            <el-pagination class="page" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=0>
            </el-pagination>
        </div>
        <!--视频刻录弹框-->
        <imprintAlert :alertshow="isimprint" @selectshow="isimprint=false" @qure="imprintsure" @cancel="isimprint=false"/>
    </div>
</template>

<script>
    // import imprintAlert from "../musicvideoment/imprintAlert" //视频刻录弹框
    import {musicvideoment} from "../testdata/video"
    export default {
        name: "testtabpane2",
        components: {
            // imprintAlert
        },
        data() {
            return {
                options:[],
                isimprint:false,
                radio: '1',//查看类型
                tableData:[],//,
                multipleSelection: []
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
            //readio单选框
            radiochange(val){
                console.log(val)
            },
            //table
            //单选框
            selectcheck(row){
                //console.log(row)
                console.log("单选")
            },
            //全选
            selecAlltcheck(rows){
                console.log("多选")
            },
            //当前单元格
            cellClick(row, column, cell, event){
                console.log(row, column, cell, event)
            },
            //播放单元格
            handleGoods(id){
              console.log(33)
                console.log(id)
            },
            toggleSelection(rows) {
                console.log(1000)
                // if (rows) {
                //     rows.forEach(row => {
                //         this.$refs.multipleTable.toggleRowSelection(row);
                //     });
                // } else {
                //     this.$refs.multipleTable.clearSelection();
                // }
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
                console.log(val)
                this.multipleSelection = val;
            },
            //打开视频刻录弹框
            openimprint(){
                this.isimprint=true;
            },
            //确定关闭视频刻录弹框
            imprintsure(){
                this.isimprint=false;
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .testtabpane2{
        .mr();
        /*头部*/
        .head-top{
            padding: .1rem 0;
            .fb();
            .le{
                .f20();
                img {
                    width: .3rem;
                }

                span {
                    margin-left: .05rem;
                    .f14();
                    color: #1296DB;
                }
            }
            .ce{
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
            }
            .ri{
                .el-button{
                    width: .99rem;
                    line-height: .37rem;
                    padding: 0;
                    span{
                        .f16();
                    }
                }
                .blu{
                    background:#edf5ff;
                    border:1px solid #BEDEFF;
                    span{
                        color:#409EFF ;
                    }
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
                    width:1.45rem!important;
                }
                /*立案案由*/
                .case-yo{
                    position:relative;
                    overflow: hidden;
                    .el-input{
                        width:3.15rem!important;
                        .el-input__inner{
                            padding: 0 .35rem 0 .15rem!important;
                        }
                    }
                    span{
                        position:absolute;
                        right:.1rem;
                        top:-.1rem;
                        .f18();
                        width:.4rem;
                        line-height:.5rem;
                        text-align: center;
                        display:inline-block;
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
        /*内容区域*/
        .main{
            margin-top:.2rem;
            cursor:pointer;
            th,td{
                text-align:center;
            }
            th{
                background:#cbe5f3;
                div{
                    .f20()
                }
            }
            td{
                div{
                    .f18();
                    span{
                        .f18()
                    }
                }
                div.isedit span{
                    color:#409EFF;
                }
            }
            /*暂无数据*/
            .el-table__empty-text{
                .f18();
            }
        }
        .up{
            /*分页*/
            .page{
                margin:.2rem 0;
                span{
                    .f18();
                }
                input{
                    .f18();
                }
                text-align: center;
                li.number{
                    .f18()
                }
            }
        }
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>