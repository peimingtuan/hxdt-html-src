<template>
    <div class="info4">
        <el-form :label-position="labelPosition" :model="formLabelAlign">
            <el-form-item label="支持实时刻录">
                <el-select v-model="formLabelAlign.rtRecordSupport" placeholder="请选择">
                    <el-option
                            v-for="item in rtRecordSupportlist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择刻录方式">
                <el-select v-model="formLabelAlign.burnType" placeholder="请选择">
                    <el-option
                            v-for="item in burnTypelist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="刻录服务器IP">
                <el-select v-model="formLabelAlign.burnServerIp" placeholder="请选择">
                    <el-option
                            v-for="item in burnServerIplist"
                            :key="item.burnServerId"
                            :label="item.burnServerIp"
                            :value="item.burnServerIp">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="刻录庭审笔录">
                <el-select v-model="formLabelAlign.noteRecord" placeholder="请选择">
                    <el-option
                            v-for="item in noteRecordlist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择刻录画面">
                <!--<el-checkbox v-model="checked" @change="changecheck">主画面-主码流</el-checkbox>-->
                <!--<el-checkbox v-model="checked" @change="changecheck">法官画面</el-checkbox>-->
                <el-checkbox v-for="(item,index) in formLabelAlign.viewInfoList" :key="index" v-model="item.checkStatus" @change="changecheck">{{item.viewName}}</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "info4",
        data() {
            return {
                rtRecordSupportlist:[{id:true,name:'是'},{id:false,name:'否'}],//支持实时刻录
                noteRecordlist:[{id:true,name:'是'},{id:false,name:'否'}],//刻录庭审笔录
                burnTypelist:[{id:1,name:'单盘直刻'},{id:2,name:'双盘直刻'},{id:3,name:'双盘续刻'}],//刻录方式
                //burnServerIplist:[{burnServerId:0,burnServerIp:'刻录服务器ip1'},{burnServerId:1,burnServerIp:'刻录服务器ip2'}],//刻录服务器ip
                burnServerIplist:[],
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    courtRoomId:'',//法院id
                    rtRecordSupport:false, //是否刻录  不刻录  刻录
                    burnType:'',//刻录方式
                    burnServerIp:'',//刻录服务器ip
                    noteRecord:'',//是否支持刻录  0 不支持 1支持
                    viewInfoList:[{
                        "viewId": "",
                        "signalSourceId": "",
                        "viewName": "",
                        "checkStatus": true
                    },
                        {
                            "viewId": "",
                            "signalSourceId": "",
                            "viewName": "",
                            "checkStatus": true
                        }],
                },
            }
        },
        created() {

        },
        mounted() {
            this.getBurnServerInfo()
        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        methods: {
            //获取刻录服务器ip select
            getBurnServerInfo(){
                let _this=this;
                return _this.$http.post('/getBurnServers',{}).then(data =>{
                    if(data.code===200){
                        _this.burnServerIplist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/getBurnServers')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //获取设备刻录信息
            getinfo4(){
                let _this=this;
                _this.$http.post('/courtRoomConfig/getCourtRoomLiveBurn', {
                    id:_this.courtRoomId,//法庭id
                }).then(data => {
                    if (data.code === 200) {
                        _this.formLabelAlign = data.data;
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/getCourtRoomLiveBurn')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //保存设备刻录信息
            saveinfo4(){
                let {formLabelAlign}=this;
                let _this=this;
                return _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomLiveBurn',formLabelAlign).then(data =>{
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/saveOrUpdateCourtRoomLiveBurn')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .info4{
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
</style>