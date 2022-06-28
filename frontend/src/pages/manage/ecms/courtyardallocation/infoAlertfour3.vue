<template>
    <div class="infoAlertfour3">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-show="secondshow">
                <div class="second-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info2">
                        <div class="content-info2-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item class="red-label" label="流名称">
                                    <el-input type="text" v-model.trim="formLabelAlign.streamName"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="流地址">
                                    <el-input type="text" v-model.trim="formLabelAlign.streamAddress"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="通道号">
                                    <el-input type="text" v-model.trim="formLabelAlign.channelNum"></el-input>
                                </el-form-item>
                                <!--<el-form-item label="画面位置">-->
                                    <!--<el-select v-model="formLabelAlign.frameLocation">-->
                                        <!--<el-option-->
                                                <!--v-for="item in frameLocationlist"-->
                                                <!--:key="item.id"-->
                                                <!--:label="item.frameLocation"-->
                                                <!--:value="item.id">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                                <el-form-item label="是否本地录制">
                                    <el-select v-model="formLabelAlign.isRecord">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="视频接口类型">
                                    <el-select v-model="formLabelAlign.videoType">
                                        <el-option
                                                v-for="item in videoTypelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="远程送流方式">
                                    <el-select v-model="formLabelAlign.remoteSendStreamType">
                                        <el-option
                                                v-for="item in flowTypelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <alertBtn @cancel="secondshow=false" @qure="sureedit"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"//二次弹框title
    import alertBtn from "../component/alertBtn"//二次弹框底部按钮
    import {mapState} from 'vuex'
    export default {
        name: "infoAlertfirst3",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'远程送流配置',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                videoTypelist:[{id:1,name:'CVBS'},{id:2,name:'VGA'},{id:3,name:'YPBPR'},{id:4,name:'HDMI/DVI'}],//视频接口类型select
                frameLocationlist:[{id:1,frameLocation:'第一画面'}],//画面位置select
                flowTypelist:[{id:2,name:'UDP'},{id:1,name:'TCP'}],//流类型
                formLabelAlign: {//表单信息
                    courtRoomId:'',//法庭id
                    streamName:'',//流名称
                    streamAddress:'',//流地址
                    channelNum:'',//通道号
                    frameLocation:'',//画面位置
                    isRecord:'',//是否本地录制
                    remoteSendStreamType:'',//远程送流方式
                    videoType:'',//视频接口类型
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
            options(){
                return this.$store.state.selectlist
            },
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        methods: {
            //打开弹框,修改逻辑处理
            show(row){
                this.secondshow=true;
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(this.formLabelAlign.hasOwnProperty('courtRoomStatus'))delete this.formLabelAlign.courtRoomStatus;
                }else{
                    this.formLabelAlign={//表单信息
                        courtRoomId:'',//法庭id
                        streamName:'',//流名称
                        streamAddress:'',//流地址
                        channelNum:'',//通道号
                        frameLocation:'',//画面位置
                        isRecord:'',//是否本地录制
                        remoteSendStreamType:'',//远程送流方式
                        videoType:'VGA',//视频接口类型
                    }
                }
            },

            //确定保存法庭设备配置信息
            sureedit(){
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.streamName){
                    _this.$msgw('请输入流名称');
                    return
                }
                if(!formLabelAlign.streamAddress){
                    _this.$msgw('请输入流地址');
                    return
                }
                if(!formLabelAlign.channelNum){
                    _this.$msgw('请输入通道号');
                    return
                }
                formLabelAlign.courtRoomId=_this.courtRoomId
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateRemoteSendFlowSet',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo4();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlertfour3{
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
            .content-info2 {
                background: #ECEFF0;
                &-div1 {
                    padding:.2rem;
                    .el-form {
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
                        /*文本域*/
                        .el-textarea{
                            width:5rem;
                        }

                        /*button*/

                        .el-button {
                            position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;
                            background: #409eff;

                            span {
                                .f18();
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>