<template>
        <div class="adduserMent">
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
                                        <el-form-item class="red-label" label="姓名">
                                            <el-input v-model.trim="formLabelAlign.userName"></el-input>
                                        </el-form-item>
                                        <el-form-item class="red-label" label="性别">
                                            <el-select v-model="formLabelAlign.sex" placeholder="选择性别">
                                                <el-option v-for="item in sexlist" :key="item.courtCode"
                                                           :label="item.courtPronoun"
                                                           :value="item.courtPronoun">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="red-label" label="部门">
                                            <el-select v-model="formLabelAlign.departmentId" placeholder="选择部门">
                                                <el-option v-for="item in departmentlist"
                                                           @click.native="handleSelectdepartment(item.departmentName)"
                                                           :key="item.departmentId"
                                                           :label="item.departmentName"
                                                           :value="item.departmentId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="red-label" label="登录名">
                                            <el-input v-model.trim="formLabelAlign.userLoginName"></el-input>
                                        </el-form-item>
                                        <el-form-item label="新密码" :class="formLabelAlign.personId?'':'red-label'">
                                            <el-input v-model.trim="formLabelAlign.newPassword"></el-input>
                                        </el-form-item>
                                        <el-form-item label="确认密码" :class="formLabelAlign.personId?'':'red-label'">
                                            <el-input v-model.trim="formLabelAlign.confirmPassword"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span=12>
                                        <el-form-item class="red-label" label="用户类型">
                                            <el-select v-model="formLabelAlign.userType" placeholder="选择用户类型">
                                                <el-option v-for="item in zhlist"  :key="item.id" :label="item.name" :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <!--<el-form-item label="*单位">-->
                                        <!--<el-select v-model="formLabelAlign.workplace" placeholder="选择单位">-->
                                        <!--<el-option v-for="item in workplacelist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">-->
                                        <!--</el-option>-->
                                        <!--</el-select>-->
                                        <!--</el-form-item>-->
                                        <el-form-item label="角色">
                                            <el-select v-model="formLabelAlign.roleId" placeholder="选择角色">
                                                <el-option v-for="item in rolelist"
                                                           @click.native="handleSelectroleName(item.roleName)"
                                                           :key="item.roleId"
                                                           :label="item.roleName"
                                                           :value="item.roleId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="职务">
                                            <el-select v-model="formLabelAlign.position" placeholder="选择职务">
                                                <el-option v-for="item in positionlist"
                                                           :key="item.courtCode" :label="item.courtPronoun"
                                                           :value="item.courtPronoun">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="IM账号">
                                            <el-input v-model.trim="formLabelAlign.IM"></el-input>
                                        </el-form-item>
                                        <el-form-item label="手机">
                                            <el-input v-model.trim="formLabelAlign.phoneNumber"></el-input>
                                        </el-form-item>
                                        <el-form-item label="邮箱">
                                            <el-input v-model.trim="formLabelAlign.mail"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <!--<el-form-item label="密码有效期">-->
                                        <!--<el-radio v-model="radio1" label="1">永久用户</el-radio>-->
                                        <!--<el-radio v-model="radio1" label="2">临时用户</el-radio>-->
                                        <!--<el-input class="input-choice" v-show="radio1==2" v-model.trim="formLabelAlign.passwordTimeLimit"></el-input>天-->
                                    <!--</el-form-item>-->
                                    <!--<el-form-item label="用户有效期">-->
                                        <!--<el-radio v-model="radio2" label="1">永久用户</el-radio>-->
                                        <!--<el-radio v-model="radio2" label="2">临时用户</el-radio>-->
                                        <!--<el-input class="input-choice" v-show="radio2==2" v-model.trim="formLabelAlign.accountTimeLimit"></el-input>天-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="头像">
                                        <el-upload
                                                ref="upload"
                                                class="upload-demo"
                                                :show-file-list="false"
                                                :http-request="post"
                                                :on-remove="handleRemove"
                                                :file-list=fileList>
                                            <el-button size="small" type="primary">上传</el-button>
                                        </el-upload>
                                        <div class="picture" v-show="formLabelAlign.picture!==''">
                                            <img :src=formLabelAlign.picture />
                                        </div>
                                    </el-form-item>
                                </el-row>
                                <!--<el-row>-->
                                    <!--<el-col :span=12>-->
                                        <!--<el-form-item label="身份证号">-->
                                            <!--<el-input v-model.trim="formLabelAlign.identityNumber"></el-input>-->
                                        <!--</el-form-item>-->
                                    <!--</el-col>-->
                                    <!--<el-col :span=6>-->
                                        <!--<el-button>身份证信息采集</el-button>-->
                                    <!--</el-col>-->
                                <!--</el-row>-->
                                <!--<el-row>-->
                                    <!--<el-form-item label="身份信息">-->
                                        <!--<el-button>签名采集</el-button>-->
                                        <!--<el-button>人脸采集</el-button>-->
                                        <!--<el-button>指纹采集</el-button>-->
                                        <!--<el-button>权限设置</el-button>-->
                                    <!--</el-form-item>-->
                                <!--</el-row>-->
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
            name: "adduserMent",
            props:{
                isadduser:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    zhlist:[{id:1,name:'法院用户'},{id:2,name:'非法院用户'}],//账户类型
                    sexlist: [{courtCode: 1, courtPronoun: "男"}, {courtCode: 2,courtPronoun: '女'}],//性别列表
                    positionlist: [],//职位列表
                    departmentlist: [],//部门列表
                    rolelist: [{roleId: 1, roleName: "辩护人1"}, {roleId: 2,roleName: '辩护人二'}],//角色列表
                    labelPosition: 'left',//form表单左侧靠齐
                    text:'添加用户',
                    text2:'填写基本信息',
                    url:'',
                    formLabelAlign: {
                        personId:'',//用户id
                        userName:'',//用户名称
                        sex:'',//性别
                        departmentId:'',//部门id
                        departmentName:'',//部门名称
                        userLoginName:'',//用户登陆名
                        newPassword:'',//新密码
                        confirmPassword:'',//确认密码
                        passwordTimeLimit:'',//密码有效时间/天
                        accountTimeLimit:'',//账号有效时间/天
                        userType:'',//用户类型
                        courtName:'',//法院名称
                        duty:'',//职务
                        phoneNumber:'',//电话号码
                        mail:'',//邮箱
                        picture:'',//图片
                        identityNumber:'',//身份证号
                        roleId:'',//角色id
                        roleName:''//角色名称
                    },
                    radio1:'',
                    radio2:'',
                    fileList:[],
                }
            },
            created() {
    
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                //头像上传
                post(file){
                    console.log(file)
                    let toL=file.file.type.toLowerCase()
                    if (toL !== "image/jpeg" && toL !== "image/jpg" && toL !== "image/png" && toL !== "image/bmp") {
                        this.$msgw("上传图片格式不支持!");
                        return false;
                    }
                    const that=this;
                    let reader = new FileReader();
                    reader.readAsDataURL(file.file);
                    reader.onload = function (e) {
                        that.formLabelAlign.picture = this.result;
                        that.formLabelAlign.pictureFormat=file.file.type.slice(6);
                    }
                },
                handleSelectdepartment(departmentName){
                    this.formLabelAlign.departmentName=departmentName;
                },
                handleSelectroleName(roleName){
                    this.formLabelAlign.roleName=roleName;
                },
                show(row){
                    this.departmentlist=this.$parent.departmentlist;
                    if(row){
                        this.text='修改用户';
                        for(let i in row){//修改逻辑处理
                            if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                        }
                        this.formLabelAlign.personId=row.userId;
                    }else{
                        this.text='添加用户';
                        this.formLabelAlign={
                            personId:'',//用户id
                            userName:'',//用户名称
                            sex:'',//性别
                            departmentId:'',//部门id
                            departmentName:'',//部门名称
                            userLoginName:'',//用户登陆名
                            newPassword:'',//新密码
                            confirmPassword:'',//确认密码
                            passwordTimeLimit:'',//密码有效时间/天
                            accountTimeLimit:'',//账号有效时间/天
                            userType:1,//用户类型
                            courtName:'',//法院名称
                            duty:'',//职务
                            phoneNumber:'',//电话号码
                            mail:'',//邮箱
                            picture:'',//图片
                            identityNumber:'',//身份证号
                            roleId:'',//角色id
                            roleName:''//角色名称
                        }
                    }
                },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('Relatedcaseshow');
                },
                qure() {
                    this.$emit('sure',this.formLabelAlign);
                },
                cancel() {
                    this.$emit('cancel');
                },
            }
        }
    </script>
    
    <style lang="less">
    @import url('../css/common.less');
    .adduserMent{
        .el-form-item{
            margin-bottom:.1rem;
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                .f18();
                margin-left:1.5rem!important;
            }
            .el-input{
                width:4rem;
                .el-input__inner{
                    height:.4rem;
                    line-height:.4rem;
                    padding:0 .15rem;
                    .f18();
                }
            }
            .el-radio__label{
                .f18();
            }
            .el-textarea__inner{
                .f18();
            }
        }
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:.5rem;
            margin-left:-7rem;
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
                max-height:7rem;
                overflow: auto;
                padding:0.2rem .2rem;
                .el-tabs__item {
                    font-size: .18rem!important;
                }
                .input-choice{
                    margin-left:.2rem;
                    width:1rem;
                }
                .el-button{
                    padding:.1rem .15rem;
                }
                .picture{
                    margin-top:.05rem;
                    width:1rem;
                    height:1rem;
                    img{
                        width:1rem;
                        height:1rem;
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