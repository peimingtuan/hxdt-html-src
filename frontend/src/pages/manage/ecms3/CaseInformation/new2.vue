<template>
        <div class="new2">
            <!--二次弹框-->
            <idcardCollection :isidcardCollection="isidcardCollection" @closenewcase='isidcardCollection=false' @sure='isidcardCollection=false' @cancel='isidcardCollection=false' ></idcardCollection>
            <partyinfo ref='partyinfo':ispartyinfo="ispartyinfo" @closenewcase='ispartyinfo=false'></partyinfo>
            <div class="addd">
                    <el-col　:span=2>当事人信息</el-col>
                    <el-col　:span=22>
                        <div @click='addparty'>
                            <img src="../images/CaseManagement/neiwentianjia.png">
                                <span>添加当事人</span>
                        </div>
                        <div @click='addid'>
                            <img src="../images/CaseManagement/neiwensaomiao.png">
                                <span>扫描身份证</span>
                        </div>
                    </el-col>
            </div>
            <div class="table-style">
                <el-table ref="multipleTable" :data="tableData" @cell-click="cellClick" @select="selectcheck" @select-all="selecAlltcheck"
                          tooltip-effect="dark"  class='casetable' 
                          style="width: 100%"
                          @selection-change="handleSelectionChange">
                          <el-table-column prop="caseStandingName" label="诉讼地位" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="involvedPersonName" label="姓名"  show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="identityNumber" label="证件号码" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="householdRegisterPlace" label="住所地" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column  label="类型" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.partyTypeCode==1">自然人</span>
                                        <span v-else-if="scope.row.partyTypeCode==2">法人</span>
                                        <span v-else-if="scope.row.partyTypeCode==3">非法人组</span>
                                    </template>
                            </el-table-column>
                            <el-table-column  label="代理人" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                            <span v-for='item in scope.row.agentInfoList'>
                                                    {{item.personalInfoName}}
                                            </span>
                                    </template>
                            </el-table-column>
                            <el-table-column label="操作" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="isedit">
                                        <span @click="checkparty(scope.row)">修改</span>
                                        <span @click="deleteN2(scope.row)">删除</span>
                                    </div>
                                </template>
                            </el-table-column>
                </el-table>
            </div>
            <div class="up">
                <!--分页-->
                <el-pagination
                        class="page"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page=1
                        :page-size=10
                        layout="total, prev, pager, next, jumper"
                        :total="tableData.length">
                </el-pagination>
            </div>
        </div>
    </template>
    
    <script>
        import partyinfo from './partyinfo'//新建当事人详情
        import idcardCollection from './idcardCollection'//新建当事人详情
        export default {
            name: "new2",
            components: {
                partyinfo,
                idcardCollection
            },
            data() {
                return {
                    tableData:"",
                    involvedPersonDtoList:'',
                    ispartyinfo:false,
                    labelPosition: 'left',//form表单左侧靠齐
                    radio: '1',//选择刻录画面
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
                save(){
                    //调用子组件的保存
                   let new2info= this.$refs.partyinfo.sure();
                   return new2info;
                },
                getAllInfoByCaseInfoId(row){
                    this.tableData=row.involvedPersonDtoList;
                    if(row)this.involvedPersonDtoList=row;//修改逻辑处理
                    else{
                        this.involvedPersonDtoList={//表单信息
                            caseNumber:"",//案号
                            caseName:"",//案件名称
                            courtCode:"",//法院代码
                            courtName:"",//法院名称
                            year:"",//年
                            caseTypeName:"",//案件类型名称
                            causeName:"",//案由名称
                            createCaseDate:"",//承办时间
                            departmentName:"",//承办部门名称
                            undertakerName:"",//承办法官姓名
                            applyProgram:"",//适用程序（1普通2简易3特殊）
                        }
                    }
                },
                //打开
                //添加当事人
                addparty(){
                    this.$refs.partyinfo.getAgentinfo();//传子组件
                },
                //采集身份证
                addid(){
                    this.isidcardCollection=true;
                },
                //修改信息 
                checkparty(row){
                    this.$refs.partyinfo.getAgentinfo(row);//传子组件
                },
                deleteN2(row){
                        const _this=this;
                    _this.$confirm('确认删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$http.post('/deleteInvolvedPerson', {
                                caseInfoId:row.involvedPersonId//涉案人id
                            }).then(data =>{
                                if(data.code===0){
                                    //_this.getlawlist();
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }else{
                                    _this.$msgw(data.msg);
                                }
                            }).catch(err => {
                                _this.$msge('服务器异常，请稍后重试');
                            })
                    }).catch(() => {

                    });
                }
            }
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .new2{
            /*二次弹框*/
            .second-main{
                position:absolute;
                left:50%;
                margin-left:-5rem;
                top:2rem;
                width:10rem;
                background: #fff;
                z-index:222;
                border-radius: 2px;
                box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
                .secondHead {
                    background: #cbe5f3;
                }
    
                .el-form {
                    padding: .2rem;
                    height: 5rem;
                    overflow: auto;
    
                    .el-form-item {
                        margin-bottom: .1rem;
                    }
    
                    /*label*/
    
                    .el-form-item__label {
                        .f18();
                        width: 1.8rem !important;
                    }
    
                    .el-form-item__content {
                        margin-left: 1.8rem !important;
                    }
    
                    /*input框*/
    
                    .el-input {
                        width: 4rem;
    
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }
                }
            }
            /*操作颜色*/
            div.isedit{
                    cursor:pointer;
                    color: #409eff;
            }
            /*操作颜色*/
            div.isedit span{
                     cursor:pointer;
                    color: #409eff;
            }
            .addd{
                cursor:pointer;
                margin-bottom:.1rem;
                padding:0 0 0.3rem 0;
                /* img{
                    width:.8rem;
                } */
                div{
                    display: inline-block;
                }
            }
        }
    </style>