<template>
        <div class="addposts">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="second-alert" v-show="isaddposts">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/casemanage.png"/>
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                        <AlertleftTile :text="text" :text2="text2"/>
                        <div class="contentid">
                                <el-form :label-position="labelPosition" :model="formLabelAlign">
                                        <el-form-item label="部门名称">
                                                <el-input v-model="formLabelAlign.PositionName"> </el-input>
                                        </el-form-item>
                                        <el-form-item label="描述">
                                                <el-input  type='textarea'v-model="formLabelAlign.explain"> </el-input>
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
            name: "addposts",
            props:{
                isaddposts:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    labelPosition: 'left',//form表单左侧靠齐
                    text:'新建职务',
                    text2:'填写基本信息',
                    formLabelAlign: {
                        PositionName:"",
                        explain:"",
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
                    this.formLabelAlign=row;
                    // console.log(row)
                    if(row)this.formLabelAlign=row;//修改逻辑处理
                    else{
                        this.formLabelAlign={//表单信息
                            PositionName:"",
                            explain:"",
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
        .addposts{
                    .el-input__inner{
                        .f18();
                    }
                    /*label*/
                    .el-form-item__content{
                            margin-left:1.5rem!important;
                    }
                    .el-form-item__label{
                    width:1.5rem!important;
                        .f18();
                    }
                    .el-textarea__inner{
                        .f18();
                    }
            /*弹框*/
            .main{
                width:8rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
                /*min-height:6.85rem;*/
                background:#fff;
                position:absolute;
                left:60%;
                top:1.5rem;
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
                    padding:0.5rem .2rem;
                  
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