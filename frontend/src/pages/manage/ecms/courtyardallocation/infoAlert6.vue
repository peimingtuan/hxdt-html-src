<template>
    <div class="infoAlert6">
        <!--二次弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-if="secondshow">
                <div class="second-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info2">
                        <div class="content-info2-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item label="流媒体服务器">
                                    <el-select v-model="formLabelAlign.smsInfoName" placeholder="请选择">
                                        <el-option
                                                v-for="item in smsInfoNamelist"
                                                v-if="item.smsInfoName"
                                                @click.native="handleSelectsmsInfoName(item.smsInfoId)"
                                                :key="item.smsInfoId"
                                                :label="item.smsInfoName"
                                                :value="item.smsInfoName">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="存储路径">
                                    <el-select v-model="formLabelAlign.storagePathName" placeholder="请选择">
                                        <el-option
                                                v-for="item in storagePathNamelist"
                                                v-if="item.storagePathName"
                                                @click.native="handleSelectstoragePathName(item.storagePathId)"
                                                :key="item.storagePathId"
                                                :label="item.storagePathName"
                                                :value="item.storagePathName">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <alertBtn @cancel="secondshow=false" @qure="sureAlert2"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"//二次弹框title
    import alertBtn from "../component/alertBtn"//二次弹框底部按钮
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "infoAlert6",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'备份流媒体录制添加',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                formLabelAlign:{//表单信息
                    courtRoomId: "",
                    smsInfoId:"",
                    smsInfoName: "",//流媒体名称
                    storagePathId: "",
                    storagePathName:"",//存储路径名称
                    courtRoomSmsId:''//法庭流媒体id
                },
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
                "smsInfoNamelist",
                "storagePathNamelist"
            ])
        },
        methods: {
            ...mapMutations('courtyardallocation',[
                "setstoragePathNamelist"
            ]),
            ...mapActions('courtyardallocation',[
                "getStoragePaths"
            ]),
            //流媒体服务器select选择
            handleSelectsmsInfoName(smsInfoId){
                //更换时，清除服务器存储路径select选项
                this.setstoragePathNamelist([])
                this.formLabelAlign.storagePathId='';
                this.formLabelAlign.storagePathName='';
                this.formLabelAlign.smsInfoId=smsInfoId;
                this.getStoragePaths(this)
            },
            //流媒体服务器存储路径select选择
            handleSelectstoragePathName(storagePathId){
                this.formLabelAlign.storagePathId=storagePathId;
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.secondshow=true;
                if(row){
                    for(let i in row){
                        if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];//修改逻辑处理
                    }
                }else{
                    this.formLabelAlign={//表单信息
                        courtRoomId: "",
                        smsInfoId:"",
                        smsInfoName: "",//流媒体名称
                        storagePathId: "",
                        storagePathName:"",//存储路径名称
                        courtRoomSmsId:''//法庭流媒体id
                    }
                }
            },

            //确定保存编辑信息,新增或修改该流媒体存储路径
            sureAlert2(){
                let {formLabelAlign}=this;
                let _this=this;
                formLabelAlign.courtRoomId=_this.courtRoomId;//法庭id
                _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomSmsInfo',formLabelAlign).then(data =>{
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.getCourtRoomSmsInfo();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/saveOrUpdateCourtRoomSmsInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlert6{
        /*二次弹框*/
        .second-main{
            position:absolute;
            left:50%;
            margin-left:-5rem;
            top:1.5rem;
            width:10rem;
            background: #fff;
            border-radius: 2px;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            .secondHead {
                background: #cbe5f3;
            }
            .content-info2 {
                background: #ECEFF0;
                &-div1 {
                    padding:.2rem;
                    .el-form {
                        min-height:3rem;
                        padding: .2rem;
                        background: #E3E7E8;
                        .b(1px, #C6C6C6);
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
            }
        }
    }
</style>