<template>
    <div class="addtrialAlert6">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="案件类型">
                                <el-select v-model="values" filterable :disabled="disabled" multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in caseTypelist"
                                            :key="item.caseTypeCode"
                                            @click.native="handleSelectcaseType(item.caseTypeName)"
                                            :label="item.caseTypeName"
                                            :value="item.caseTypeCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="类别">
                                <el-select v-model="formLabelAlign.type" placeholder="请选择">
                                    <el-option
                                            v-for="item in typelist"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文本">
                                <el-input type="textarea" maxlength="1000"  v-model.trim="formLabelAlign.content" placeholder="......"></el-input>
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
        <!--提示框-->
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>{{msg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelVisible()">取 消</el-button>
                <el-button type="primary" @click="sureVisible()">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    import FoundationTools from '../../../../js/functionAjax'
    export default {
        name: "addtrialAlert6",
        props:{
            alertshow:Boolean,
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加法庭纪律、权利义务',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                typelist:[{id:1,name:'权利义务'},{id:2,name:'法庭纪律'}],
                //caseTypelist:[{caseTypeCode:1,caseTypeName:'类型1'},{caseTypeCode:2,caseTypeName:'类型2'}],
                caseTypelist:[],
                formLabelAlign: {
                    "id": "",
                    "caseTypeName": "",
                    "caseTypeCode": "",
                    "type":'',
                    "courtCode":'',
                    "content":"",
                    courtName:FoundationTools.getCookie('peicourtName')//当前法院名称
                },
                formLabelAlign2:'',//二次保存
                values:[],
                disabled:false,
                centerDialogVisible: false,
                msg:''
            }
        },
        watch:{
            // formLabelAlign:{
            //     handler() {
            //         if(this.formLabelAlign.content.length==1000){
            //             this.$msgw("最多只能输入10个字")
            //         }
            //     },
            //     immediate: true,//初始化执行
            //     deep: true//深层次监听
            // }
        },
        created() {
            this.getAllCaseType();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取案件类型select
            getAllCaseType(){
                let that=this;
                that.$http.post('/baseInfo/getAllCaseType', {

                }).then(data =>{
                    if(data.code===200){
                        that.caseTypelist=data.data;
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/baseInfo/getAllCaseType')
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //选择
            handleSelectcaseType(caseTypeName){
                console.log(caseTypeName)
                console.log(this.values)
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.values=[];
                if(row){
                    for(let i in row){//修改逻辑处理
                        this.formLabelAlign[i]=row[i];
                    }
                    if(row.hasOwnProperty('caseTypeCode')){
                        if(row.caseTypeCode=='9999')row.caseTypeCode='通用'
                        this.values.push(row.caseTypeCode);
                    }
                    this.disabled=true;
                }else{
                    this.disabled=false;
                    this.formLabelAlign={
                        "id": "",
                        "caseTypeName": "",
                        "caseTypeCode": "",
                        "type":'',
                        "courtCode":'',
                        "content":"",
                        courtName:FoundationTools.getCookie('peicourtName')//当前法院名称
                    }
                }
            },
            //保存
            saveVoiceAnnouncements(){
                let that=this,
                    {formLabelAlign,caseTypelist,values}=that,
                    url='/voiceAnnouncements/saveVoiceAnnouncements';
                if(values[0]=='通用'){
                    formLabelAlign.caseTypeCode=9999;
                    formLabelAlign.caseTypeName='通用';
                }else{
                    let arr=[];
                    values.map(item=>{
                        caseTypelist.map(its=>{
                            if(its.caseTypeCode==item){
                                arr.push(its.caseTypeName)
                            }
                        })
                    })
                    formLabelAlign.caseTypeCode=values.toString();
                    formLabelAlign.caseTypeName=arr.toString();
                }
                formLabelAlign.recover='';
                return that.$http.post(url,formLabelAlign).then(data =>{
                    if(data.code===200){
                        that.$msgs('保存成功！');
                    }else if(data.code===303){//异常处理
                        that.centerDialogVisible=true;
                        that.msg=data.message;
                        that.formLabelAlign2=formLabelAlign;
                    }else{
                        that.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    console.log(err,url)
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //取消
            cancelVisible(){
                let that=this;
                that.formLabelAlign2.recover=false;
                that.$http.post('/voiceAnnouncements/saveVoiceAnnouncements',that.formLabelAlign2).then(data =>{
                    if(data.code===200){
                        that.centerDialogVisible=false;
                        that.$msgs('保存成功！');
                        that.$parent.getVoiceAnnouncements();
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/voiceAnnouncements/saveVoiceAnnouncements')
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //确定
            sureVisible(){
                let that=this;
                that.formLabelAlign2.recover=true;
                that.$http.post('/voiceAnnouncements/saveVoiceAnnouncements',that.formLabelAlign2).then(data =>{
                    if(data.code===200){
                        that.centerDialogVisible=false;
                        that.$msgs('保存成功！');
                        that.$parent.getVoiceAnnouncements();
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/voiceAnnouncements/saveVoiceAnnouncements')
                    that.$msge('服务器异常，请稍后重试');
                })
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
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addtrialAlert6{
        /*弹框*/
        .main{
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-4rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                max-height: 6rem;
                overflow: auto;
                margin-top:.1rem;
                padding:.5rem .2rem;
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
                textarea{
                    height:2rem;
                }

            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>