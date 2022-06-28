<template>
    <div class="addAlert2">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="名称">
                                <el-input v-model.trim="formLabelAlign.burnServerName"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="IP地址">
                                <el-input v-model.trim="formLabelAlign.burnServerIp"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="端口号">
                                <el-input v-model.trim="formLabelAlign.burnServerPort"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商">
                                <el-select v-model="formLabelAlign.manufacturerCode" placeholder="请选择">
                                    <el-option
                                            v-for="item in manufacturerlist"
                                            @click.native="handleSelectmanufacturerName(item.manufacturerName)"
                                            :key="item.manufacturerCode"
                                            :label="item.manufacturerName"
                                            :value="item.manufacturerCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否默认刻录服务器">
                                <el-select v-model="formLabelAlign.defaulty" placeholder="请选择">
                                    <el-option
                                            v-for="item in selectlist"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="说明" prop="description">
                                <el-input type="textarea" v-model.trim="formLabelAlign.description" placeholder="......"></el-input>
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
    import Tool from '../js/tools'
    export default {
        name: "addAlert2",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加刻录服务器',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                manufacturerlist:[],//刻录厂商select
                formLabelAlign: {
                    burnServerPort: '',//端口
                    burnServerId:'',//刻录服务器id
                    burnServerIp:'',//刻录服务器ip
                    burnServerName:'',//刻录服务器名称
                    description:'',//描述
                    manufacturerName:'',//厂商名称
                    manufacturerCode:'',//厂商Code
                    defaulty:null,//是否刻录
                },
            }
        },
        computed:{
            selectlist(){
              return this.$store.state.selectlist
            },
        },
        created() {
            this.getBurnServerManufacturerList();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取刻录厂商
            getBurnServerManufacturerList(){
                const _this=this;
                _this.$http.post('/getBurnServerManufacturerList', {

                }).then(data =>{
                    if(data.code===200){
                        _this.manufacturerlist=data.data;
                        if(_this.manufacturerlist.length>0){
                            _this.formLabelAlign.manufacturerName=_this.manufacturerlist[0].manufacturerName;
                            _this.formLabelAlign.manufacturerCode=_this.manufacturerlist[0].manufacturerCode;
                        }
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/getBurnServerManufacturerList')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //获取刻录厂商select，选择
            handleSelectmanufacturerName(manufacturerName){
                this.formLabelAlign.manufacturerName=manufacturerName;
            },
            show(row){
                if(row){
                    for(let i in row){//修改逻辑处理
                        if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={//表单信息
                        burnServerPort: '',//端口
                        burnServerId:'',//刻录服务器id
                        burnServerIp: '',//刻录服务器ip
                        burnServerName: '',//刻录服务器名称
                        description:'',//描述
                        manufacturerCode:this.manufacturerlist.length>0?this.manufacturerlist[0].manufacturerCode:'',//刻录厂商代码
                        manufacturerName:this.manufacturerlist.length>0?this.manufacturerlist[0].manufacturerName:'',//刻录厂商名称
                        defaulty:null,//是否刻录
                    }
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                if(!this.formLabelAlign.burnServerName){
                    this.$msgw('请输入名称')
                    return
                }
                if(!this.formLabelAlign.burnServerIp){
                    this.$msgw('请输入IP')
                    return
                }
                if(!this.formLabelAlign.burnServerPort){
                    this.$msgw('请输入端口')
                    return
                }
                if(!Tool.isValidIP(this.formLabelAlign.burnServerIp)){
                    this.$msgw('请输入有效IP')
                    return
                }
                if(!Tool.isPort(this.formLabelAlign.burnServerPort)){
                    this.$msgw('请输入有效端口')
                    return
                }
                this.$emit('qure',this.formLabelAlign);
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addAlert2{
        /*弹框*/
        .main{
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