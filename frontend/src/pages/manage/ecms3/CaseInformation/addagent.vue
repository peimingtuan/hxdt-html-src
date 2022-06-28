<template>
    <div class="addagent">
        <!--此弹框不用直接写在页面上-->
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-show="isaddagent">
                <div class="main">
                    <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png"/>
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="contentid">

                        <div class="base-top">
                            <div>
                                <el-form :label-position="labelPosition">
                                    <el-form-item label="辩护人姓名">
                                        <el-input v-model="item.personalInfoName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="工作单位">
                                        <el-input v-model="item.unitName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="职务">
                                        <el-input v-model="item.job"></el-input>
                                    </el-form-item>
                                    <el-form-item label="证件号码">
                                        <el-input v-model="item.identityNumber"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div>
                                <el-form :label-position="labelPosition">
                                    <el-form-item label="联系电话">
                                        <el-input v-model="item.phone"></el-input>
                                    </el-form-item>
                                    <el-form-item label="代理人性别">
                                        <el-select v-model="item.sexName" placeholder="">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="代理种类">
                                        <el-select v-model="item.agentKind" placeholder="">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div>
                                <el-form :label-position="labelPosition">
                                    <el-form-item label="代理权限">
                                        <el-select v-model="item.agentJurisdiction" placeholder="">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="辩护种类">
                                        <el-select v-model="item.defendKind" placeholder="">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="证件类型">
                                        <el-select v-model="item.identityTypeName" placeholder="">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png"/>确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../images/courtsupervision/cancel.png"/>取消
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
        name: "addagent",
        props: {
            isaddagent: Boolean,
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                labelPosition: 'left',
                text: '添加代理人',
                text2: '填写基本信息',
                item: {}
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
                this.$emit('closenewcase');
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
    /*只差一个z-index*/
    .addagent {
        /*弹框*/

        .main {
            width: 14rem;
            padding: 0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            /*min-height:6.85rem;*/
            background: #fff;
            position: absolute;
            left: 50%;
            top: 1.5rem;
            margin-left: -7rem;
            /*margin-top:-3.425rem;*/
            border-radius: 2px;
            /*左上方login*/

            img.imgloge {
                position: absolute;
                top: .2rem;
                left: .2rem;
                width: .4rem;
            }

            /*关闭弹框*/

            img.alert-close {
                width: .18rem;
                position: absolute;
                top: .25rem;
                right: .35rem;
                cursor: pointer;
                z-index: 102;
            }

            .contentid {
                width: 100%;
                background: #ECEFF0;
                min-height: 4rem;
                margin-top: .05rem;
                padding: 0 .2rem;

                .el-form-item__label {
                    .f18();
                }

                .el-tabs__item {
                    /*padding: 0 .2rem;*/
                    /*height: .4rem;*/
                    /*line-height: .4rem;*/
                    font-size: .18rem !important;
                }
            }

            .up {
                width: 100%;
                /*分页*/

                .page {
                    margin: .2rem 0;

                    span {
                        .f18();
                    }

                    input {
                        .f18();
                    }

                    text-align: center;

                    li.number {
                        .f18()
                    }
                }
            }

            /*底部*/

            .bt {
                width: 100%;
                margin: .2rem 0;

                & > div {
                    cursor: pointer;
                    .f20();
                    line-height: .3rem;
                }

                img {
                    width: .2rem;
                    margin-right: .05rem;
                }

                .fc();

                .qure {
                    color: #45A1D1;
                    margin-right: .5rem;
                }
            }
        }
    }
</style>