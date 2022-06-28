<template>
    <!--弹框-->
    <transition name="slide-fade">
        <div class="alert-window2 addAlert1" v-show="alertshow">
            <div class="main">
                <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content">
                    <el-form :label-position="labelPosition" :model="formLabelAlign">
                        <el-form-item label="打印服务器名称" class="red-label">
                            <el-input v-model.trim="formLabelAlign.printServerName"></el-input>
                        </el-form-item>
                        <el-form-item label="IP地址" class="red-label">
                            <el-input v-model.trim="formLabelAlign.printServerIp"></el-input>
                        </el-form-item>
                        <el-form-item label="端口号" class="red-label">
                            <el-input v-model.trim="formLabelAlign.printServerPort"></el-input>
                        </el-form-item>
                        <el-form-item label="是否默认打印服务器">
                            <el-select v-model="formLabelAlign.defaulty" placeholder="请选择">
                                <el-option
                                        v-for="item in selectList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述">
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
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    export default {
        name: "addAlert1",
        props:{
            alertshow:Boolean,
            selectshow:Function
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加打印服务器',
                text2:'请填写详细信息',
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign: {
                    manufacturerId:"",//厂商id
                    description:"",//描述
                    printServerId:"",//打印服务器id
                    printServerIp:"",//打印服务器ip
                    printServerPort:"",//端口
                    printServerName:"",//打印服务器名称
                    defaulty:true,// 是否默认（1是0否）
                },
            }
        },
        computed:{
            selectList(){
                return this.$store.state.selectlist;
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            show(row){
                if(row){
                    this.text='修改打印服务器'
                    this.formLabelAlign=JSON.parse(JSON.stringify(row))
                }else{
                    this.text='添加打印服务器'
                    this.formLabelAlign={
                        manufacturerId:"",//厂商id
                        description:"",//描述
                        printServerId:"",//打印服务器id
                        printServerIp:"",//打印服务器ip
                        printServerPort:"",//端口
                        printServerName:"",//打印服务器名称
                        defaulty:true,// 是否默认（1是0否）
                    }
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
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
    .addAlert1{
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
                    width:1.8rem!important;
                }
                .el-form-item__content{
                    margin-left:1.8rem!important;
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