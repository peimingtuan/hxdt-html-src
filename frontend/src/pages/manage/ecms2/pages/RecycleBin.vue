<template>
    <div class='RecycleBin'>
        <checkCaseinfo ref='checkCaseinfo' :ischeckCaseinfo="ischeckCaseinfo" @selectshow='ischeckCaseinfo=false' @sure='ischeckCaseinfo=false' @cancel='iscaseinfo=false'></checkCaseinfo>
        <el-row class='onerow'>
            <el-col :span=8>
                <div class="head-top">
                    <img src="../images/CaseManagement/depot.png"/>
                    回收站<span>HUI SHOU ZHAN</span>
                </div>
            </el-col>
            <el-col :span=16>
                <div class="head-foot">
                    <el-button class="recover-btn" type="primary" @click='recover'>
                        <img class="recover" src="../images/OverdueScheduling/recover.png" />
                        恢复
                    </el-button>
                    <el-input style='width:2.9rem'   placeholder="案号/承办部门/承办人/当事人" v-model.trim='keyWord' clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click='searchcase'>搜索</el-button>
                </div>
            </el-col>
        </el-row>
        <div>
            <el-table ref="multipleTable" :data="tableData"  @select-all="selecAlltcheck" tooltip-effect="dark"
                      style="width: 100%" class='casetable'
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" :index="indexMethod" width="80px"></el-table-column>
                <el-table-column prop='caseNumber'label="案号" show-overflow-tooltip width='230px'></el-table-column>
                <el-table-column prop="causeStr" label="立案案由" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createCaseDate" label="立案日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="departmentName"label="承办部门" show-overflow-tooltip></el-table-column>
                <el-table-column prop="undertakerName"label="承办人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="partyDes"label="当事人"show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="isedit">
                            <!--<span type="text" @click="seecaseinfo(scope.row)">查看</span>-->
                            <span @click="handleDelete(scope.row,scope.$index)">删除</span>
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
                    :total=total>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import checkCaseinfo from '../CaseInformation/checkCaseinfo.vue'//查看案件详情弹框
    export default{
           //注册子组件
           components: {
            checkCaseinfo,
        },
        data(){
            return{
                keyWord:"",//输入关键字
                ischeckCaseinfo:false,
                tableData:[],
                pageIndex:1,
                pageSize:10,
                total:0,
                multipleSelection:[]
            }
        },
        created(){
            this.getRecycleCaseInfos()
        },
        mounted(){

        },
        methods: {
            handleSelectionChange(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.caseInfoId
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
            //选中当前页码
            handleCurrentChange(val){
                this.pageIndex=val;
                this.getRecycleCaseInfos();
            },
            //搜索按钮
            searchcase(){
                this.pageIndex=1;
                this.pageSize=10;
                this.getRecycleCaseInfos();
            },
            getRecycleCaseInfos(){
                this.$showLoading('rgba')
                let {keyWord,pageIndex,pageSize}=this;
                let _this=this;
                _this.$http.post('/caseManage/getRecycleCaseInfos', {
                    keyWord,
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideLoading('rgba')
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba')
                })
            },
            //恢复案件
            recover(){
                let _this=this;
               if(_this.multipleSelection.length===0){
                   _this.$msgw('请先勾选案件')
                   return
               }
                _this.$showToast('加载中...')
                _this.$http.post('/caseManage/recoverCaseInfos',{
                    ids:_this.multipleSelection.toString()
                }).then(data =>{
                        _this.$hideToast()
                        if (data.code===200){
                            _this.$msgs('恢复成功')
                            _this.pageIndex=1;
                            _this.getRecycleCaseInfos();
                        }else{
                            _this.$msgw(data.message)
                        }
                    }).catch(err => {
                        _this.$hideToast()
                       // _this.$msge('服务器异常，请稍后重试');
                    })
            },
            handleDelete(row,index){
                let _this=this;
                        _this.$confirm('确认删除', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _this.$http.post('/caseManage/deleteRecycleCaseInfos', {
                                ids:row.caseInfoId
                            }).then(data =>{
                                if(data.code===200){
                                    //_this.tableData.splice(index,1)//物理删除
                                    _this.$msgs('删除成功!');
                                    //计算总页数
                                    if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                        _this.pageIndex=Number(_this.pageIndex)-1;
                                    }
                                    _this.getRecycleCaseInfos();
                                }else{
                                    _this.$msgw(data.message);
                                }
                            }).catch(err => {
                                _this.$msge('服务器异常，请稍后重试');
                            })
                        }).catch(() => {

                        });
            },
            seecaseinfo(row){
                    console.log(row)
                    this.ischeckCaseinfo=true;
                    this.$refs.checkCaseinfo.getcheck1(this.getAllInfoByCaseInfoId);//传check1
                    this.$refs.checkCaseinfo.getcheck2(this.getAllInfoByCaseInfoId);//传check2
                    this.$refs.checkCaseinfo.getcheck3(this.getAllInfoByCaseInfoId);//传check3

                    //console.log(this.getAllInfoByCaseInfoId)
                    let _this=this;
                    _this.isload=true;
                    const params={
                        "caseInfoId": row.caseInfoId,//用户id
                    };
                    _this.$http.post('/getAllInfoByCaseInfoId', params).then(data => {
                        _this.isload=false;
                        if (data.Code == 1){
                               this.getAllInfoByCaseInfoId=res.data//所有结果
                            //    this.ischeckCaseinfo=true;
                            //    this.$refs.checkCaseinfo.getAllInfoByCaseInfoId(row.caseNumber,,this.getAllInfoByCaseInfoId);
                            }
                            else
                            { _this.$msgw(data.Message);}
                        }).catch(err => {
                            _this.$msge('服务器异常，请稍后重试');
                      })
            },
            handleClick(row) {
                // console.log(row);
            },
               //table表格索引值
               indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
        },  
    }
</script>
<style lang='less'>
     @import url('../css/common.less');

     .RecycleBin {
         .mr();
         padding: 0 0.2rem;
         .up {
             /*分页*/

             .page {
                 margin: .2rem 0;

                 span {
                     font-size: 0.18rem;
                 }

                 input {
                     font-size: 0.18rem;
                 }

                 text-align: center;

                 li.number {
                     font-size: 0.18rem;

                 }
             }
         }

         .casetable {
             margin-top: 0.2rem;
             cursor: pointer;

             th, td {
                 text-align: center;
             }

             th {
                 background: #cbe5f3;

                 div {
                     .f20();
                     font-weight:400;
                 }
             }

             td {
                 div {
                     .f18();

                     span {
                         .f18()
                     }
                 }

                 div.isedit span {
                     color: #409EFF;
                     margin-right: .1rem;
                 }
             }

             /*暂无数据*/

             .el-table__empty-text {
                 .f18();
             }
         }
         .onerow {
             .el-col-16 {
                 text-align: right;
             }

             .el-select {
                 width: 2.94rem;
                 margin-right: 0.2rem;
             }
             .head-top {
                 padding: .2rem 0 0 0;
                 font-size: .2rem;

                 img {
                     width: 0.3rem;
                 }

                 span {
                     margin-left: .05rem;
                     font-size: 0.14rem;
                     color: #1296DB;
                 }
             }

             .head-foot {
                 margin-top: 0.12rem;
                 .recover-btn{
                     line-height: .36rem;
                     padding:0 .2rem;
                     background:#edf5ff;
                     border:1px solid #bedeff;
                     span {
                         .f18();
                         color:#409eff;
                     }
                     .recover{
                         width:.2rem;
                         position:relative;
                         top:-.015rem;
                         /*cursor:pointer;*/
                     }
                 }
             }
             /*这是输入框的高*/

             .el-input__inner {
                 height: 0.4rem;
             }

             .el-input {
                 margin-right: 0.1rem;
                 font-size: 0.18rem;

                 .el-input__icon {
                     width: 0.34rem;
                     line-height: .4rem;
                     color: #e7e9ee;
                     font-size: 0.18rem;
                 }
             }

             .el-button [class*=el-icon-] + span {
                 font-size: 0.18rem;
             }

             /*button*/

             .el-button {
                 /*position: relative;*/
                 /*top: -.02rem;*/
                 border:1px solid #bedeff;
                 padding:0 .2rem;
                 line-height: .36rem;
                 .el-icon-search {
                     font-size: 0.18rem;
                     color: #fff;
                 }

                 span {
                     font-size: 0.18rem;
                     color: #fff;
                 }
             }

         }
     }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>
