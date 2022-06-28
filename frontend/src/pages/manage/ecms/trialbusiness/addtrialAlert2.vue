<template>
    <div class="addtrialAlert2">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="案件类型">
                                <el-select v-model="formLabelAlign.name" placeholder="请选择活动区域">
                                    <el-option label="刑初" value="shanghai"></el-option>
                                    <el-option label="民初" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审理程序">
                                <el-select v-model="formLabelAlign.name" placeholder="请选择活动区域">
                                    <el-option label="普通程序" value="shanghai"></el-option>
                                    <el-option label="简易程序" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审理流程">
                                <el-checkbox v-model="checked" @change="changecheck">宣布法庭规则和法庭纪律</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">法官入庭和书记员报告庭前准备情况</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">法官宣布开庭</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">合议庭介绍，权利义务告知，询问是否回避</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">法庭调查</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">法庭辩论</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">最后陈述</el-checkbox><br/>
                                <el-checkbox v-model="checked" @change="changecheck">宣布休庭</el-checkbox>
                            </el-form-item>
                            <el-form-item label="描述" prop="desc">
                                <el-input type="textarea" v-model="formLabelAlign.desc" placeholder="......"></el-input>
                            </el-form-item>
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
        name: "addtrialAlert2",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加流程',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    desc:''
                },
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
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addtrialAlert2{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-4rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                /*label*/
                .el-form-item__label{
                    .f18();
                    width:1.2rem!important;
                }
                .el-form-item__content{
                    margin-left:1.2rem!important;
                }
                /*input框*/
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
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>