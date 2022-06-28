<template>
    <transition name="slide-fade">
    <div class="addnewCase alert-window2">
        <!--弹框-->
        <div class="main">
                    <img class="imgloge" src="../images/CaseManagement/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <slot name="slot-name"></slot>
                    <slot>{{text}}</slot>
                    <div class="content1">
                      
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="基本信息" name="new1">
                                <!--<new1 ref='new1'/>-->
                            </el-tab-pane>
                            <el-tab-pane label="当事人/代理人信息" name="new2">
                                <!--<new2 ref='new2'/>-->
                            </el-tab-pane>
                            <el-tab-pane label="排期信息" name="new3">
                                <!--<new3  ref='new3'/>-->
                            </el-tab-pane>
                        </el-tabs>
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
    //import new1 from "./new1" //基本信息
    //import new2 from "./new2" //当事人信息
    //import new3 from "./new3" //排期信息
    export default {
        name: "addlawAlert",
        props:{
            isaddnewCase:Boolean,
        },
        components: {
            AlertleftTile,
            //new1,
            //new2,
            //new3,
        },
        data() {
            return {
                row:null,
                caseNumber:"",
                text:'新建案件',
                text2:'请填写基本信息',
                activeName:'new1',
            }
        },
        beforeCreate() {

        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
           //打开弹框
            show(parentData,row){
                this.activeName = 'new1';
                //this.isaddnewCase=true;
                this.row=null;
                if(row){
                    this.row = row;
                    this.getnew1(parentData,row);
                    this.getnew2(row);
                    this.getnew3(parentData,row);
                }else{
                    this.getnew1(parentData);
                    this.getnew2();
                    this.getnew3(parentData);
                }
            },
            getnew1(parentData,row){
                if(row){
                    this.$refs.new1.getAllInfoByCaseInfoId(parentData,row);//案件下所有信息请求
                    this.$refs.new1.getCaseTypeInfos(row.caseTypeCode);
                }else{
                    this.$refs.new1.getAllInfoByCaseInfoId(parentData);//案件下所有信息请求
                }
            },
            getnew2(row){
                if(row){
                    this.$refs.new2.getAllInfoByCaseInfoId(row);//案件下所有信息请求
                }else{
                    //this.$refs.new2.getAllInfoByCaseInfoId();//案件下所有信息请求
                }
            },
            getnew3(parentData,row){
                if(row){
                    this.$refs.new3.getAllInfoByCaseInfoId(parentData,row);//案件下所有信息请求
                }else{
                    this.$refs.new3.getAllInfoByCaseInfoId(parentData);//案件下所有信息请求
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                //this.isaddnewCase=false;
                this.$emit("update:showAlert",false)
            },
            //保存所有信息
            qure() {
                this.$emit("update:showAlert",false)
                let new1info = this.$refs.new1.save();
                let new2info = this.$refs.new2.save();
                let new3info = this.$refs.new3.save();
                let params={
                    new1info,
                    new2info,
                    new3info,
                }
                this.$http.post('/caseManage/saveCaseInfo',params).then( res =>{
                    if(res.code == 200){
                        this.$msge('保存成功');
                    }else{
                        this.$msgw(res.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            cancel() {
                this.$emit("update:showAlert",false)
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addnewCase{
        /*弹框*/
        .main{
            width:14rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            margin-left:-7rem;
            border-radius:2px;
            /*左上方login*/
            img.imgloge{
                position:absolute;
                top: .2rem;
                left: .3rem;
                width:.4rem;
            }
            /*关闭弹框*/
            img.alert-close{
                width:.18rem;
                position:absolute;
                top: .25rem;
                right: .35rem;
                cursor: pointer;
                z-index:102;
            }
            .content1{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                max-height:6rem;
                overflow: auto;
                margin-top:.05rem;
                padding:0 .2rem;
                .el-tabs__item {
                    /*padding: 0 .2rem;*/
                    /*height: .4rem;*/
                    /*line-height: .4rem;*/
                    font-size: .18rem!important;
                }
            }
            /*底部*/
            .bt{
                width:100%;
                margin:.2rem 0;
                &>div{
                    cursor:pointer;
                    .f20();
                    line-height:.3rem;
                }
                img{
                    width:.2rem;
                    margin-right:.05rem;
                }
                .fc();
                .qure{
                    color: #45A1D1;
                    margin-right:.5rem;
                }
            }
        }
    }
</style>