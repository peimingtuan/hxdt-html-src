<template>
    <div class="addotherAlert5">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="服务器名称">
                                <el-input v-model="formLabelAlign.deviceName"></el-input>
                            </el-form-item>
                            <el-form-item class="red-label" label="IP地址">
                                <el-input v-model="formLabelAlign.deviceIp"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="用户名">-->
                                <!--<el-input v-model="formLabelAlign.name"></el-input>-->
                            <!--</el-form-item>-->
                            <!--<el-form-item label="密码">-->
                                <!--<el-input type="password" v-model="formLabelAlign.name"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item class="red-label" label="操作系统版本">
                                <el-input v-model="formLabelAlign.operationSystem"></el-input>
                                <el-button>获取</el-button>
                            </el-form-item>
                            <el-form-item class="red-label" label="硬盘报警阀值">
                                <el-input v-model="formLabelAlign.diskAlarmThreshold"></el-input>
                                (硬盘使用百分比)
                            </el-form-item>
                            <el-form-item class="red-label" label="内存报警阀值">
                                <el-input v-model="formLabelAlign.memoryAlarmThreshold"></el-input>
                                (内存使用百分比)
                            </el-form-item>
                            <el-form-item class="red-label" label="CPU报警阀值">
                                <el-input v-model="formLabelAlign.cpuAlarmThreshold"></el-input>
                                (CPU使用百分比)
                            </el-form-item>
                            <el-form-item label="说明" prop="desc">
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
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    import Tool from "../js/tools"
    export default {
        name: "addotherAlert5",
        props:['alertshow','formLabelAlign'],
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加被监控服务器',
                text2:'详细数据显示',
                labelPosition: 'left',//form表单左侧靠齐
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                if(this.formLabelAlign.deviceName.replace(/(^\s*)|(\s*$)/g, '')==='') {
                    this.$msgw('请输入服务器名称');
                }else if(this.formLabelAlign.deviceIp.replace(/(^\s*)|(\s*$)/g, '')===''){
                    this.$msgw('请输入IP地址');
                }else if(!Tool.isValidIP(this.formLabelAlign.deviceIp)){
                    this.$msgw('请输入有效IP');
                }else if(this.formLabelAlign.operationSystem.replace(/(^\s*)|(\s*$)/g, '')===''){
                    this.$msgw('请输入操作系统版本');
                }else if(typeof this.formLabelAlign.diskAlarmThreshold==='string' && this.formLabelAlign.diskAlarmThreshold.replace(/(^\s*)|(\s*$)/g, '')===''){
                    this.$msgw('请输入硬盘报警阀值');
                }else if(typeof this.formLabelAlign.memoryAlarmThreshold==='string' && this.formLabelAlign.memoryAlarmThreshold.replace(/(^\s*)|(\s*$)/g, '')===''){
                    this.$msgw('请输入内存报警阀值');
                }else if(typeof this.formLabelAlign.cpuAlarmThreshold==='string' && this.formLabelAlign.cpuAlarmThreshold.replace(/(^\s*)|(\s*$)/g, '')===''){
                    this.$msgw('请输入CPU报警阀值');
                }else this.$emit('qure', this.formLabelAlign);
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addotherAlert5{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-5rem;
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:.2rem;
                .el-form-item{
                    margin-bottom:.1rem;
                }
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
                /*button*/
                .el-button {
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
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>