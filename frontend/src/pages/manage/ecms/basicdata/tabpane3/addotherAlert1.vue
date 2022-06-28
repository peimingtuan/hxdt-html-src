 <template>
    <div class="addotherAlert1">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <el-form :label-position="labelPosition" :model="formLabelAlign">
                            <el-form-item class="red-label" label="信号源名称">
                                <el-input v-model.trim="formLabelAlign.viewName"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formLabelAlign.description" placeholder="......"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "../../component/AlertleftTile"
    export default {
        name: "addotherAlert1",
        props:['alertshow','formLabelAlign'],
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'添加信号源类型',
                text2:'请填写详细信息',
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
                if(this.formLabelAlign.viewName)this.$emit('qure',this.formLabelAlign);
                else this.$msgw('请输入信号源名称');
            },
            cancel() {
                this.$emit('cancel');
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .addotherAlert1{
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
            /*左上方login*/
            @import url('../../css/alertbtn.less');
            .content{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                margin-top:.1rem;
                padding:1rem .2rem;
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
            @import url('../../css/alertbtn.less');
        }
    }
</style>