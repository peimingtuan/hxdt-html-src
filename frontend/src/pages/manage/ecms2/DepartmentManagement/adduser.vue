<template>
        <div class="adduser">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-show="isadduser">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                        <AlertleftTile :text="text" :text2="text2"/>
                        <div class="contentid">
                                <el-form :label-position="labelPosition" :model="form">
                                        <el-row>
                                                <el-col :span=12 style='padding-right: 2rem;'>
                                                            <el-form-item label="姓名">
                                                                <el-input v-model="form.name" clearable></el-input>
                                                              </el-form-item>
                                                               <el-form-item label="登录名">
                                                                <el-input v-model="form.userName" clearable></el-input>
                                                              </el-form-item>
                                                              <el-form-item label="密码">
                                                                    <el-input v-model="form.passWord" clearable></el-input>
                                                                </el-form-item>
                                                                 <el-form-item label="确认密码">
                                                                        <el-input v-model="form.name" clearable></el-input>
                                                                 </el-form-item>
                                                                 <el-form-item label="手机">
                                                                        <el-input v-model="form.phone" clearable></el-input>
                                                                 </el-form-item>
                                                                 <el-form-item label="邮箱">
                                                                        <el-input v-model="form.exmail" clearable></el-input>
                                                                 </el-form-item>
                                                                 <el-form-item label="IM账号">
                                                                        <el-input v-model="form.IM" clearable></el-input>
                                                                 </el-form-item>
                                                                 <el-form-item label="身份证号">
                                                                        <el-input v-model="form.idCard" clearable></el-input>
                                                                 </el-form-item>
                                                </el-col>
                                                <el-col :span=12>
                                                        <el-form-item label="性别">
                                                                <el-select v-model="form.sex" placeholder="选择性别">
                                                                    <el-option v-for="item in sexlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                    </el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                            <el-form-item label="职务">
                                                                  <el-select v-model="form.position" placeholder="选择职务">
                                                                        <el-option v-for="item in positionlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                        </el-option>
                                                                  </el-select>
                                                          </el-form-item>
                                                          <el-form-item label="用户类型">
                                                                <el-select v-model="form.region" placeholder="选择用户类型">
                                                                    <el-option v-for="item in courtUnitPronounlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                    </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="部门">
                                                                <el-select v-model="form.department" placeholder="选择部门">
                                                                    <el-option v-for="item in departmentlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                    </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="单位">
                                                                <el-select v-model="form.workplace" placeholder="选择单位">
                                                                    <el-option v-for="item in workplacelist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                    </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                        <el-form-item label="角色">
                                                                <el-select v-model="form.role" placeholder="选择角色">
                                                                    <el-option v-for="item in rolelist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                                    </el-option>
                                                                </el-select>
                                                        </el-form-item>
                                                       
                                                        <el-form-item label="密码有效期">
                                                            <el-radio-group v-model="form.passwordValidity">
                                                              <el-radio label="永久用户"></el-radio>
                                                              <el-radio label="临时用户"></el-radio>
                                                            </el-radio-group>
                                                    </el-form-item>
                                                    <el-form-item label="用户有效期">
                                                            <el-radio-group v-model="form.userValidity">
                                                              <el-radio label="永久用户"></el-radio>
                                                              <el-radio label="临时用户"></el-radio>
                                                            </el-radio-group>
                                                    </el-form-item>
                                                </el-col>
                                        </el-row>
                                        <el-row>
                                                <el-form-item label="活动形式" style='width:8.1rem'>
                                                        <el-input type="textarea" v-model="form.desc"></el-input>
                                                      </el-form-item>
                                                    <el-form-item label="身份信息">
                                                            <!-- <el-input style='width:4rem'></el-input> -->
                                                            <el-button>身份证采集</el-button>
                                                            <el-button>人脸采集</el-button>
                                                            <el-button>指纹采集</el-button>
                                                            <el-button>权限设置</el-button>
                                                        </el-form-item>
                                        </el-row>
                                </el-form>
                        </div>
                        <div class="bt">
                            <div class="qure" @click="qure">
                                <img src="../images/courtsupervision/sure.png" />确定
                            </div>
    
                            <div class="cancel" @click="cancel">
                                <img src="../images/courtsupervision/cancel.png" />取消
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
</template>
    
    <script>
        import $ from "jquery"
        import AlertleftTile from "../component/AlertleftTile"

        export default {
            name: "adduser",
            props:{
                isadduser:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    courtUnitPronounlist:[{courtCode: 1, courtPronoun: "全部"}, {courtCode: 2,courtPronoun: '豫1601'}, {courtCode: 3, courtPronoun: '豫1602'}, {courtCode: 4, courtPronoun: '豫1603'}],//假数据法院代字
                    sexlist: [{courtCode: 1, courtPronoun: "男"}, {courtCode: 2,courtPronoun: '女'}],//性别列表
                    positionlist: [{courtCode: 1, courtPronoun: "主任"}, {courtCode: 2,courtPronoun: '务农'}],//职位列表
                    departmentlist: [{courtCode: 1, courtPronoun: "民一庭"}, {courtCode: 2,courtPronoun: '民二庭'}],//部门列表
                    rolelist: [{courtCode: 1, courtPronoun: "辩护人1"}, {courtCode: 2,courtPronoun: '辩护人二'}],//部门列表
                    workplacelist: [{courtCode: 1, courtPronoun: "单位一"}, {courtCode: 2,courtPronoun: '单位二'}],//部门列表

                    // sex:"",
                    // position:"",//职位
                    // department:"",//部门
                    // role:"",//角色
                    // workplace:"",//单位

                    labelPosition: 'left',//form表单左侧靠齐
                    text:'添加用户',
                    text2:'填写基本信息',
                    form: {
                        name:"",
                        userName:"",
                        passWord:"",
                        phone:"",
                        email:"",
                        IM:"",
                        IdCard:"",

                        sex:"",//性别
                        position:"",//职位
                        department:"",//部门
                        role:"",//角色
                        workplace:"",//单位
                        passwordValidity:"",//密码有效期
                        userValidity:"",//用户有效期
                    }
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
                show(row){
                    if(row)this.form=row;//修改逻辑处理
                    else{
                        this.form={
                          name:''
                        }
                    }
                },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('Relatedcaseshow');
                },
                qure() {
                    this.$emit('sure');
                },
                cancel() {
                    this.$emit('cancel');
                },
            }
        }
    </script>
    
    <style lang="less">
    @import url('../css/common.less');
    .adduser{
            /*label*/
        .el-form-item__label{
            .f18();
            width:1.5rem!important;
        }
        .el-form-item__content{
            margin-left:1.5rem!important;
        }
        .el-input__inner{
            .f18();
        }
        .el-radio__label{
            .f18();
        }
        .el-textarea__inner{
            .f18();
        }
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:.5rem;
            margin-left:-7rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            /*左上方login*/
            img.imgloge{
                position:absolute;
                top: .2rem;
                left: .2rem;
                width:.4rem;
            }
            /*关闭弹框*/
            img.alert-close{
                width:.18rem;
                position:absolute;
                top: .25rem;
                right: .35rem;
                cursor: pointer;
                z-index:102;
            }
            .contentid{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                padding:0.2rem .2rem;
                .el-tabs__item {
                    /*padding: 0 .2rem;*/
                    /*height: .4rem;*/
                    /*line-height: .4rem;*/
                    font-size: .18rem!important;
                }
            }
            .up{
                width:100%;
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
            /*底部*/
            .bt{
                width:100%;
                margin:.2rem 0;
                &>div{
                    cursor:pointer;
                    .f20();
                    line-height:.3rem;
                }
                img{
                    width:.2rem;
                    margin-right:.05rem;
                }
                .fc();
                .qure{
                    color: #45A1D1;
                    margin-right:.5rem;
                }
            }
        }
    }
    </style>