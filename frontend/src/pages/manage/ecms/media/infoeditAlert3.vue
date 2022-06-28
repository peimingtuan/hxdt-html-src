<template>
    <div class="infoeditAlert3">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-show="alertshow">
                <div class="main-second">
                    <img class="imgloge" src="../images/yingyongpeizhi/kehuduan.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content1">
                        <div class="content1-div1">
                            <el-form :label-position="labelPosition" :model="formLabelAlign">
                                <el-form-item class="red-label" label="存储源IP地址">
                                    <el-input v-model.trim="formLabelAlign.sourceStoreIp"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="共享路径">
                                    <el-input v-model.trim="formLabelAlign.sharedPath"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="共享名">
                                    <el-input v-model.trim="formLabelAlign.userName"></el-input>
                                </el-form-item>
                                <el-form-item class="red-label" label="密码">
                                    <el-input type="password"  v-model.trim="formLabelAlign.passWord"></el-input>
                                </el-form-item>
                                <el-form-item label="本地挂载点">
                                    <el-select v-model="formLabelAlign.storagePathId">
                                        <el-option
                                                v-for="item in options"
                                                @click.native="handleSelectplaychannelName(item.storagePathName)"
                                                :key="item.storagePathId"
                                                :label="item.storagePathName"
                                                :value="item.storagePathId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />挂载
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
    import AlertleftTile from "../component/AlertleftTile"
    import {mapState} from 'vuex'
    import Tool from '../js/tools'
    export default {
        name: "infoeditAlert3",
        components: {
            AlertleftTile,
        },
        props:['alertshow'],
        data() {
            return {
                text:'挂载存储路径',
                text2:'详细数据显示',
                labelPosition:'right',
                options:[{storagePathId: 1, storagePathName: "trials1"}, {storagePathId: 2, storagePathName:'trials2'}],//本地挂载地点数据
                formLabelAlign: {//表单信息
                    smsInfoId:'',//流媒体id
                    sourceStoreIp:'',//源存储ip
                    mountPathId:'',//挂载路径Id
                    sharedPath:'',//共享路径
                    userName:'',//共享名
                    passWord:'',//密码
                    storagePathId:'',//存储路径id
                    storagePathName:'',//存储路径名称
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
            ...mapState('media',[
                "smsInfoId",
            ])
        },
        methods: {
            //获取本地挂载点select
            getStoragePaths(){
                let _this=this;
                _this.$http.post('/smsInfoConfig/getStoragePathsBySMSInfoId',{
                    smsInfoId:_this.smsInfoId
                }).then(data =>{
                    if(data.code===200){
                        _this.options=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectplaychannelName(storagePathName){
                this.formLabelAlign.storagePathName=storagePathName;
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                if(!this.formLabelAlign.sourceStoreIp){
                    this.$msgw('请输入存储源IP地址');
                    return false;
                }
                if(!this.formLabelAlign.sharedPath){
                    this.$msgw('请输入共享路径');
                    return false;
                }
                if(!this.formLabelAlign.userName){
                    this.$msgw('请输入共享名');
                    return false;
                }
                if(!this.formLabelAlign.passWord){
                    this.$msgw('请输入密码');
                    return false;
                }
                if(this.formLabelAlign.sourceStoreIp && !Tool.isValidIP(this.formLabelAlign.sourceStoreIp)){
                    this.$msgw('请输入有效IP');
                    return false;
                }
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
            //保存挂载信息
            saveinfo(){
                let {formLabelAlign}=this;
                let _this=this;
                formLabelAlign.smsInfoId=_this.smsInfoId
                //新增挂载路径
                //storagePathId存储路径id，新增可以为空
                return _this.$http.post('/smsInfoConfig/addMountPath',formLabelAlign).then(data =>{
                    if(data.code===200){
                        //_this.formLabelAlign.mountPathId=data.data.mountPathId//返回挂载路径id
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .infoeditAlert3{
        /*弹框*/
        .main-second{
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
            .content1{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                &-div1{
                    .f20();
                    .el-form{
                        background: #E3E7E8;
                        .b(1px,#C6C6C6);
                        padding:.1rem;
                        .fc();
                        flex-wrap:wrap;
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
                            width:3rem;
                            .el-input__inner {
                                height: .4rem;
                                line-height: .4rem;
                                padding: 0 .15rem;
                                .f18();
                            }
                        }
                        /*button*/
                        /*.el-button {
                            position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;
                            background:#409eff;
                            span {
                                .f18();
                                color: #fff;
                            }
                        }*/
                    }
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>