<template>
    <div class="remotetabpane4">
        <div class="top">
            <div class="le">
                <el-radio v-model="radio" label="1" >模板分组</el-radio>
                <el-radio v-model="radio" label="2">模板管理</el-radio>
            </div>
            <div class="ri">
                <el-select v-if="radio==2" v-model="templateGroupId" placeholder="分组" @change="templateGroupChange">
                    <el-option v-for="item in grouplist"
                               :key="item.templateGroupId"
                               :label="item.templateGroupName"
                               :value="item.templateGroupId">
                    </el-option>
                </el-select>
                <div v-if="radio==1" class="add" @click="add1()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
                <div v-else-if="radio==2" class="add" @click="add2()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
        </div>
        <div v-show="radio==1">
            <!--模板分组-->
            <retabpaneFour1 ref="retabpaneFour1"/>
        </div>
        <div v-show="radio==2">
            <!--模板管理-->
            <retabpaneFour2 ref="retabpaneFour2"/>
        </div>
    </div>
</template>

<script>
    import retabpaneFour1 from "./retabpaneFour1" //模板分组
    import retabpaneFour2 from "./retabpaneFour2" //模板管理
    export default {
        name: "remotetabpane4",
        components: {
            retabpaneFour1,
            retabpaneFour2,
        },
        data() {
            return {
                radio: '1',
                grouplist:[{templateGroupId:'',templateGroupName:'所有'}],
                templateGroupId:''
            }
        },
        watch:{
          'radio':function(){
            if(this.radio == '1'){
                this.retabpaneFour1Data();
            }else{
                this.$nextTick(()=>{
                    this.templateGroupId = '';
                    this.grouplist = [{templateGroupId:'',templateGroupName:'所有'}];
                    this.getGroupData();
                    this.retabpaneFour2Data();
                })
            }
          }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            templateGroupChange(val){
                this.retabpaneFour2Data();
            },
            // 获取分组
            getGroupData(){
                this.$http.post('/remoteTrial/getRemoteTemplateGroupInfosByPage',{
                    pageIndex: -1,
                    pageSize: -1
                }).then(data =>{
                    if(data.code===200){
                        this.grouplist = this.grouplist.concat(data.data);
                        console.log(this.grouplist)
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            retabpaneFour1Data(){
              this.$refs.retabpaneFour1.getTableData();
            },
            retabpaneFour2Data(){
                this.$refs.retabpaneFour2.templateGroupId = this.templateGroupId;
                this.$refs.retabpaneFour2.getTableData();
            },
            add1(){
                this.$refs.retabpaneFour1.ismain=true;
                this.$refs.retabpaneFour1.$refs.addremoteAlertfour1.text='添加模板分组';
                this.$refs.retabpaneFour1.$refs.addremoteAlertfour1.formLabelAlign.name='';
                this.$refs.retabpaneFour1.$refs.addremoteAlertfour1.formLabelAlign.desc='';
                this.$refs.retabpaneFour1.$refs.addremoteAlertfour1.formLabelAlign.templateGroupId='';
            },
            add2(){
                this.$refs.retabpaneFour2.$refs.addremoteAlertfour2.formLabelAlign = {
                    // isDefaultTemplate:false,
                    templateId:'',
                    templateGroupId: '',
                    templateName: '',
                    courtRoomId: '',
                    centralCommand:'',
                    remoteTrialTemplateTrialRooms: [
                        {
                            remoteTrialTemplateTrialRoomId:'',
                            trialRoomId:'',
                            trialRoomName:'',
                            templateId:'',
                            centralCommand:'',
                        },
                    ],
                    remoteTrialTemplateEnDes:[
                        {
                            encodePosition:'',
                            decodeId:'',
                            solution:'',
                            remoteTrialTemplateEnDeId:'',
                            decodeName:'',
                            encodeNum:'',
                            decodePosition:'',
                            encodeId:'',
                            templateId:'',
                            decodeNum:'',
                            encodeName:''
                        }

                    ],
                    templateDesc:'',
                };
                this.$refs.retabpaneFour2.ismain=true;
                this.$refs.retabpaneFour2.$refs.addremoteAlertfour2.getTemplateGroup();
                this.$refs.retabpaneFour2.$refs.addremoteAlertfour2.getCourtRoom();
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .remotetabpane4{
        /*头部内容*/
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .el-radio{
                    /*选框*/
                    .el-radio__inner{
                        width:.2rem;
                        height:.2rem;
                        &:after{
                            width:.06rem;
                            height:.06rem;
                        }
                    }
                    /*文本*/
                    .el-radio__label{
                        .f18();
                    }
                }
            }
            .ri{
                cursor:pointer;
                .fr();
                .el-select .el-input--suffix .el-input__inner{
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .3rem 0 .15rem;
                    .f18();
                }
                .el-select .el-input__icon{
                    width: .25rem;
                    height: 100%;
                    text-align: center;
                    line-height: .4rem;
                }
                &>div.add{
                    img{
                        margin-left:.2rem;
                        width:.8rem;
                        height:.4rem;
                    }
                }
            }
        }
    }
</style>