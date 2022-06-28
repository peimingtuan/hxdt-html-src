<template>
        <div class="info1">
            <div class="base-top">
                <div>
                    <el-form :label-position="labelPosition" :model="formLabelAlign">
                        <el-form-item label="姓名">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="户籍所在地">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="经常居住地">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="现住地">
                                <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="婚姻状况">
                                <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                                <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div>

                    <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item label="性别">
                                    <el-select v-model="form.region" placeholder="男">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="出生日期">
                                      <el-select v-model="form.region" placeholder="男">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                      </el-select>
                              </el-form-item>
                              <el-form-item label="国籍">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="民族">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="证件类型">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="身份">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="政治面貌">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="刑事责任能力">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="行为能力状况">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                            <el-form-item label="婚姻状况">
                                    <el-select v-model="form.region" placeholder="男">
                                      <el-option label="区域一" value="shanghai"></el-option>
                                      <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                            </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="base-bot">
            </div> -->
        </div>
    </template>
    
    <script>
        export default {
            name: "info1",
            data() {
                return {
                    labelPosition: 'left',//form表单左侧靠齐
                    formLabelAlign: {
                        name: '',
                        region: '',
                        type: '',
                        desc:''
                    },
                    form: {
                        region: '',
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
            methods: {}
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .info1{
            .base-top{
                .fb();
            }
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
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
            div.btn{
                .fr();
                width:100%;
                .el-button.is-round {
                    padding:.1rem .2rem;
                }
                .blu{
                    margin:.2rem 0;
                    background:#edf5ff;
                    border:1px solid #BEDEFF;
                    span{
                        color:#409EFF ;
                        .f16();
                    }
                }
            }
        }
    </style>