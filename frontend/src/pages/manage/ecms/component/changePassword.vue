<template>
    <transition name="slide-fade">
        <div class='alert-window2 changePassword' v-if="isShow">
            <div class="changePassword-main">
                <img class="imgloge" src="../images/about/password.png" />
                <img class="alert-close" @click="isShow=false" src="../images/alert-close.png" />
                <alertleft-tile
                        :text="text"
                        :text2="text2"
                />
                <div class="content">
                    <el-form :model="ruleForm2"
                             :rules="rules2"
                             label-position="left"
                             ref="ruleForm"
                             class="demo-ruleForm">
                        <el-form-item label="旧  密  码" prop="password">
                            <el-input type="password" v-model.trim="ruleForm2.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新  密  码" prop="newPassword">
                            <el-input type="password" v-model.trim="ruleForm2.newPassword" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model.trim="ruleForm2.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <!--底部按钮-->
                <alert-btn
                        ref="alertBtn"
                        @qure="sure(ruleForm2)"
                        @cancel="isShow=false"
                />
            </div>
        </div>
    </transition>
</template>

<script>
    import alertleftTile from './AlertleftTile'
    import alertBtn from './alertBtn'
    export default {
        name: "changePassword",
        components:{
            alertleftTile,
            alertBtn
        },
        data() {
            let checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入旧密码'));
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                text:'修改密码',
                text2:'修改最新密码',
                isShow:false,
                ruleForm2: {
                    userLoginName:'',
                    password:'',
                    newPassword:'',
                    checkPass: '',
                },
                rules2: {
                    password: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed(){

        },
        methods: {
            show(){
                this.ruleForm2={
                        userLoginName:'',
                        password:'',
                        newPassword:'',
                        checkPass: '',
                    }
            },
            modifyPassword(param){
                const that=this;
                that.$showToast('加载中...')
                that.$http.post('/modifyPassword',param).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.isShow=false;
                        that.$router.push({
                            path:'/login',
                            query:{
                                newDate:new Date().getTime()
                            }
                        })
                    } else {
                        that.$msgw(data.message)
                    }
                }).catch(err => {
                    that.$hideToast()
                })
            },
            sure(data) {
                this.$refs.ruleForm.validate((valid,data) => {
                    // if (valid) {
                    // } else {
                    //     return false;
                    // }
                });
                if(data.password&&data.newPassword&&data.checkPass){
                    if(Object.is(data.newPassword,data.checkPass)){
                        this.modifyPassword(data)
                    }
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .changePassword{
        &-main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-4rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                margin:.5rem 0;
            }
        }
    }
</style>
<style lang="less">
    @import "../css/common";
    .changePassword-main{
        .el-form-item__label{
            .f18();
            width:1.5rem!important;
        }
        .el-form-item__content{
            margin-left:1.5rem!important;
        }
        .el-form-item__error{
            .f18();
        }
        .el-input{
            width:4rem;
            .el-input__inner {
                height: .4rem;
                line-height: .4rem;
                padding: 0 .15rem;
                .f18();
            }
        }
    }
</style>