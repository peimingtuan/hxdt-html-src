<template>
    <div class="infoAlertsthree3">
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
                                <el-form-item class="red-label" label="输出设备名称">
                                    <el-input type="text" v-model.trim="formLabelAlign.channelName"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="解码器IP">
                                    <el-input type="text" v-model.trim="formLabelAlign.signalSourceIp"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="解码器通道号">
                                    <el-input type="text" v-model.trim="formLabelAlign.channelNum"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="解码拉流方式">
                                    <el-select v-model="formLabelAlign.pullFlowType">
                                        <el-option
                                                v-for="item in flowTypelist"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="证人室画面位置">
                                    <el-select v-model="formLabelAlign.witnessPeopleViewPosition">
                                        <el-option
                                        v-for="item in witnessPeopleViewPositionList"
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
    import Tool from "../js/tools"
    import FoundationTools from '../../../../js/functionAjax'
    import {mapState} from 'vuex'
    export default {
        name: "infoAlertsthree3",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'解码器通道配置',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                flowTypelist:[{id:2,name:'UDP'},{id:1,name:'TCP'}],//流类型
                witnessPeopleViewPositionList:[
                    {id:'1',name:'第一画面'},
                    {id:'2',name:'第二画面'},
                    {id:'3',name:'第三画面'},
                    {id:'4',name:'第四画面'},
                    {id:'5',name:'第五画面'},
                    {id:'6',name:'第六画面'},
                    {id:'7',name:'第七画面'},
                    {id:'8',name:'第八画面'},
                    {id:'9',name:'第九画面'},
                    {id:'10',name:'第十画面'},
                    {id:'11',name:'第十一画面'},
                    {id:'12',name:'第十二画面'},
                    ],//画面位置select
                formLabelAlign: {//表单信息
                    signalSourceType:2,//编解类型
                    signalSourceIp:'',
                    channelName:'',
                    channelNum:'',
                    pullFlowType:'',
                    witnessPeopleViewPosition:''
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
                        signalSourceType:2,
                        signalSourceIp:'',
                        channelName:'',
                        channelNum:'',
                        pullFlowType:'',
                        witnessPeopleViewPosition:''
                    }
                }
            },

            //确定保存编辑信息,新增或修改该流媒体存储路径
            sureedit(){
                let {formLabelAlign}=this;
                let _this=this;
                if(!formLabelAlign.channelName){
                    _this.$msgw('输出设备名称不能为空');
                    return false
                }
                if(!formLabelAlign.signalSourceIp){
                    _this.$msgw('请输入解码器IP');
                    return false
                }
                if(!formLabelAlign.channelNum){
                    _this.$msgw('请输入解码器通道号');
                    return false
                }
                if(!formLabelAlign.pullFlowType){
                    _this.$msgw('请选择解码拉流方式');
                    return false
                }
                if(formLabelAlign.signalSourceIp&&!Tool.isValidIP(formLabelAlign.signalSourceIp)){
                    _this.$msgw('请输入有效IP');
                    return false
                }
                formLabelAlign.courtRoomId=_this.courtRoomId;//法庭id
                formLabelAlign.courtRoomName=FoundationTools.getCookie('peicourtRoomName') || '';//法庭名称
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo3();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoAlertsthree3{
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