<template>
        <div class="UserManagement">
            <userpermission ref='userpermission':isuserpermission="isuserpermission" @Relatedcaseshow='isuserpermission=false' @sure='isuserpermission=false' @cancel='isuserpermission=false' ></userpermission>
            <adduserMent  ref='adduserMent':isadduser="isadduser" @Relatedcaseshow='isadduser=false' @sure='sureedit' @cancel='isadduser=false'></adduserMent>
            <div class="head">
                <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            </div>
            <div class='tworowu'>
                    <div class="add">
                        <img src="../images/add.png" alt="" @click="adduser">
                        <img src="../images/CaseManagement/导入.png" alt=""  @click="handleEdit()">
                        <img src="../images/CaseManagement/导出.png" alt=""  @click="handleEdit()">
                    </div>
                    <div class="two">
                        <el-input v-model.trim='userName' placeholder="姓名" style='width:1.8rem' clearable></el-input>
                        <el-select v-model="sex" placeholder="性别">
                            <el-option v-for="item in sexlist"  :key="item.code" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <el-select v-model="departmentId" placeholder="部门">
                            <el-option v-for="item in departmentlist" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId"></el-option>
                        </el-select>
                        <el-select v-model="duty" placeholder="职务">
                            <el-option v-for="item in dutylist" :key="item.id" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <el-select v-model="userType" placeholder="账户类型">
                            <el-option v-for="item in zhlist"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-search" @click='searchU'>搜索</el-button>
                    </div>
            </div>
            <el-row class='threerowu'>
                    <div class='casetable'>
                            <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column label="序号" type="index" width='100px'></el-table-column>
                            <el-table-column prop="userName"label="姓名"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="userLoginName"label="登录名"show-overflow-tooltip></el-table-column>
                            <el-table-column prop="departmentName"label="部门" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="duty"label="职务" show-overflow-tooltip></el-table-column>
                            <!--<el-table-column prop="courtName"label="单位"></el-table-column>-->
                            <el-table-column prop="userType"label="用户类型">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.userType==1">法院用户</span>
                                    <span v-else-if="scope.row.userType==2">非法院用户</span>
                                </template>
                            </el-table-column>
                                <el-table-column  prop="qx"label="操作" width="250px" >
                                    <template slot-scope="scope">
                                        <div class='isedit'>
                                            <span @click="seerole(scope.$index,scope.row)">查看权限</span>
                                            <span @click="setuser(scope.$index,scope.row)">修改</span>
                                            <span @click="deleteU(scope.$index,scope.row)">删除</span>
                                        </div>
                                    </template>
                                </el-table-column>
                          </el-table>
                      </div>
            </el-row>
            <div class="up">
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
    import {userdata} from "../js/datajson"
    import userpermission from "../DepartmentManagement/userpermission" //添加权限弹框
    import adduserMent from "../UserManagement/adduserMent" //添加权限弹框
    import leftTile from "../component/leftTile" //主页左侧头部
        export default {
            name: "UserManagement",
            //注册子组件
            components: {
                leftTile,
                adduserMent,
                userpermission
            },
            data() {
                return {
                    imgurl:require('../images/CaseManagement/案件信息管理图标.png'),
                    text:'用户管理',
                    text2:'YONG HU GUAN LI',
                    sexlist:userdata.sexlist,//性别类型
                    departmentlist:[],//部门类型
                    dutylist:[],//职务类型类型
                    zhlist:[{id:1,name:'法院用户'},{id:2,name:'非法院用户'}],//账户类型
                    //tableData:userdata.userlist,//表格数据
                    tableData:[],
                    userName:'',
                    sex:"",
                    departmentId:"",
                    userType:"",
                    duty:"",
                    isuserpermission:false,
                    isadduser:false,
                    multipleSelection:[],
                    total:0,
                    pageIndex:1,
                    pageSize:10
                }
            },
            created() {
                    this.getDepartments();
                   this.getUserPageInfo();
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                getDepartments(){
                    const _this=this;
                    return  _this.$http.post('/baseInfo/getDepartments', {}).then(data =>{
                        if(data.code===200){
                            _this.departmentlist=data.data;
                            _this.departmentlist.unshift({departmentName:'',departmentName:'全部'})
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/baseInfo/getDepartments')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                getUserPageInfo(){
                    this.$showLoading('rgba');
                    let {userName,pageIndex,pageSize}=this;
                    const _this=this;
                  return  _this.$http.post('/userManage/getUserPageInfo', {
                        userName,
                        sex:_this.sex=='全部'?'':_this.sex,
                        departmentId:_this.departmentId,
                        userType:_this.userType,
                        duty:_this.duty,
                        pageIndex,//当前页码
                        pageSize //每页大小
                    }).then(data =>{
                        _this.$hideLoading('rgba');
                        if(data.code===200){
                            _this.total=data.count;
                            _this.tableData=data.data;
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$hideLoading('rgba');
                        console.log(err,'/userManage/getUserPageInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                },
                //查看权限
                seerole(){
                    this.isuserpermission=true;
                },
                //添加角色
                adduser(){
                    this.isadduser=true;
                    this.$refs.adduserMent.show()
                },
                //修改角色
                setuser(index,row){
                    this.isadduser=true;
                    this.$refs.adduserMent.show(row)
                },
                searchU(){
                    this.pageIndex=1;
                    this.getUserPageInfo();
                },
                deleteU(index,row){
                    const _this=this;
                    _this.$confirm('确认删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.$http.post('/userManage/delUserInfo',{
                            id:row.userId//id
                        }).then(data =>{
                            if(data.code===200){
                                _this.$msgs('删除成功!');
                                //计算总页数
                                if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                    _this.pageIndex=Number(_this.pageIndex)-1;
                                }
                                _this.getUserPageInfo()
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$msge('服务器异常，请稍后重试');
                        })
                    }).catch(() => {

                    });
                },
                handleEdit(row){
                    console.log('导入')
                },
                handleSelectionChange(val) {
                    this.multipleSelection = val;
                },
                handleCurrentChange(page){
                    this.pageIndex=page;
                    this.getUserPageInfo();
                },
                //保存
                sureedit(formLabelAlign){
                    const _this=this;
                    if(!formLabelAlign.userName){
                        _this.$msgw('请输入用户名称');
                        return false;
                    }
                    if(!formLabelAlign.sex){
                        _this.$msgw('请选择性别');
                        return false;
                    }
                    if(!formLabelAlign.departmentId){
                        _this.$msgw('请选择部门');
                        return false;
                    }
                    if(!formLabelAlign.userLoginName){
                        _this.$msgw('请输入登陆名');
                        return false;
                    }
                    if(!formLabelAlign.userType){
                        _this.$msgw('请选择用户类型');
                        return false;
                    }
                    // if(_this.$refs.adduserMent.radio1==2 && !formLabelAlign.passwordTimeLimit){
                    //     _this.$msgw('请输入密码有效期天数');
                    //     return false;
                    // }
                    // if(_this.$refs.adduserMent.radio2==2 && !formLabelAlign.accountTimeLimit){
                    //     _this.$msgw('请输入用户有效期天数');
                    //     return false;
                    // }
                    // if(!formLabelAlign.identityNumber){
                    //     _this.$msgw('请输入身份证号');
                    //     return false;
                    // }
                    // if(_this.$refs.adduserMent.radio1==1)formLabelAlign.passwordTimeLimit=''
                    // if(_this.$refs.adduserMent.radio2==1)formLabelAlign.accountTimeLimit=''
                    _this.$showToast('正在保存...')
                    _this.$http.post('/userManage/saveUserInfo',formLabelAlign).then(data =>{
                        _this.$hideToast()
                        if(data.code===200){
                            _this.$msgs('保存成功');
                            _this.isadduser=false;
                            _this.getUserPageInfo();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$hideToast()
                        console.log(err,'/userManage/saveUserInfo')
                        //_this.$msge('服务器异常，请稍后重试');
                    })
                }
            }
        }
    </script>
    
<style lang="less">
    @import url('../css/element.less');
.UserManagement{
            .head{
                padding: .2rem 0 .1rem;
            }
            .mr();
            padding:0 0.2rem;
            font-size:0.18rem;
            .add{
                cursor:pointer;
                margin:.1rem 0;
                img{
                    /*width:.8rem;*/
                    height:.4rem;
                }
            }
     /*表格内容区域*/
    .casetable{
            margin-top:0;
            th,td{
                padding: .16rem 0;
                text-align:center;
            }
            th{
                color: #151515;
                background:#cbe5f3;
                div{
                    font-size: 0.2rem;
                }
            }
            /*表格高度*/
            .el-table{
                /*overflow:hidden;*/
                /*height:7.39rem;*/
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
        .tworowu{
            span{
              font-size: 0.2rem;
            }
            .el-select
            {
                width:2rem;
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
            
            }
            /*这是输入框的高*/
            .el-input__inner{
                height:0.4rem;
            }
            .el-date-editor .el-range-input{
                font-size: 0.18rem;
            }

        }
        .tworowu{
            .two{
                margin-top:.1rem;
            }
            .fb();
            .el-input__inner{
                width:100%;
            }
               /*button*/
               .el-button {
                            position: relative;
                            top: -.02rem;
                            line-height: .36rem;
                            padding:0 .2rem;
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
    }
    </style>
<style scoped>
    @import url('../css/uppage.less');
</style>