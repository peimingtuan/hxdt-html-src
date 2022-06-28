<template>
    <div class="addplatformAlert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="平台类型">
                                <el-select v-model="formLabelAlign.platformType" placeholder="请选择">
                                    <el-option
                                            v-for="item in platformTypelist"
                                            :key="item.platformTypeCode"
                                            :label="item.platformTypeName"
                                            :value="item.platformTypeCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="red-label" label="IP地址">
                                <el-input v-model.trim="formLabelAlign.platformIp"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="端口号">
                                <el-input v-model.trim="formLabelAlign.platformPort"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="使用规则">-->
                                <!--<el-select v-model="formLabelAlign.ruleName" placeholder="请选择">-->
                                    <!--<el-option-->
                                            <!--v-for="item in ruleNamelist"-->
                                            <!--@click.native="handleSelectruleName(item.id)"-->
                                            <!--:key="item.id"-->
                                            <!--:label="item.name"-->
                                            <!--:value="item.name">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="说明">
                                <el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />保存
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
    import Tool from '../js/tools'
    export default {
        name: "addplatformAlert",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'平台添加',
                text2:'详细数据显示',
                platformTypelist:[{platformTypeCode:0,platformTypeName:'RCSP平台'},{platformTypeCode:1,platformTypeName:'后台能力集管理平台'}],//平台类型
                ruleNamelist:[{id:1,name:'仅使用平台数据'},{id:2,name:'仅使用本地数据'},{id:3,name:'平台数据+本地数据'}],//使用规则类型
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    platformId:'',//平台id
                    platformIp:'',//平台ip
                    platformPort:'',//平台端口
                    platformType:'',//平台类型
                    description:'',//说明
                    //ruleCode:'',//规则代码
                    //ruleName:'',//规则名称
                    courtId:'',//法庭id
                    courtCode:'',//法院代码
                    courtName:'' ,//法院名称
                },
            }
        },
        created() {
            this.getPlatformTypeInfo();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取平台类型select
            getPlatformTypeInfo(){
                let _this=this;
                _this.$http.post('/getPlatformTypeInfo',{}).then(data =>{
                    if(data.code===200){
                        _this.platformTypelist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data;
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            //使用规则选择
            handleSelectruleName(id){
                //this.formLabelAlign.ruleCode=id;
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure');
            },
            cancel() {
                this.$emit('cancel');
            },
            //修改逻辑处理
            show(row){
                if(row){
                    for(let i in row){//修改逻辑处理
                        if(this.formLabelAlign.hasOwnProperty(i))this.formLabelAlign[i]=row[i];
                    }
                }else{
                    this.formLabelAlign={//表单信息
                        platformId:'',//平台id
                        platformIp:'',//平台ip
                        platformPort:'',//平台端口
                        platformType:'',//平台类型
                        description:'',//说明
                        //ruleCode:'',//规则代码
                        //ruleName:'',//规则名称
                        courtId:'',//法庭id
                        courtCode:'',//法院代码
                        courtName:'' ,//法院名称
                    }
                }
            },
            //保存平台配置信息（新增、修改）
            saveinfo1(){
                let {formLabelAlign}=this;
                if(!formLabelAlign.platformType){
                    this.$msgw('请选择平台类型');
                    return false;
                }else if(!formLabelAlign.platformIp){
                    this.$msgw('请输入IP地址');
                    return false;
                }else if(!formLabelAlign.platformPort){
                    this.$msgw('请输入端口号');
                    return false;
                }
                if(!Tool.isValidIP(formLabelAlign.platformIp)){
                    this.$msgw('请输入有效IP地址');
                    return false;
                }
                if(!Tool.isPort(formLabelAlign.platformPort)){
                    this.$msgw('请输入有效端口');
                    return false;
                }
                formLabelAlign.platformPort=Number(formLabelAlign.platformPort)//端口号转换int类型
                let _this=this;
                _this.$showToast('正在保存...')
                return _this.$http.post('/platformConfig/saveOrUpdatePlatformConfig',formLabelAlign).then(data =>{
                            _this.$hideToast()
                            if(data.code===200){
                                _this.$msgs('保存成功');
                            }else{
                                _this.$msgw(data.message);
                            }
                            return data;
                        }).catch(err => {
                            _this.$hideToast()
                            _this.$msge('服务器异常，请稍后重试');
                            throw err
                        })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addplatformAlert{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:.5rem;
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