<template>
    <transition name="slide-fade">
        <div class="alert-window2 addnewCase" v-show="isaddnewCase">
            <div class="main">
                <img class="imgloge" src="../images/CaseManagement/avataradd.png" />
                <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content1">
                    <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeleave">
                        <el-tab-pane label="基本信息" name="new1">
                            <new1 ref='new1'/>
                        </el-tab-pane>
                        <el-tab-pane label="排期信息" name="new3">
                            <new3  ref='new3'/>
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
    import AlertleftTile from "../component/AlertleftTile"
    import new1 from "./new1" //基本信息
    import new3 from "./new3" //排期信息
    export default {
        name: "addnewCase",
        components: {
            AlertleftTile,
            new1,
            new3,
        },
        data() {
            return {
                isaddnewCase:false,
                text:'新建案件',
                text2:'请填写基本信息',
                activeName:'new1',
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //tab页签切换
            handleClick(){

            },
            //tab页签切换钩子函数
            beforeleave(to,from) {
                switch (from) {
                    case 'new1':
                        let param= this.$refs.new1.save();
                        if(!param.year){
                            this.$msgw('请选择年份')
                            return false;
                        }
                        if(!param.courtPronoun){
                            this.$msgw('请选择法院代字')
                            return false;
                        }
                        if(!param.caseTypePronoun){
                            this.$msgw('请选择案件类型代字')
                            return false;
                        }
                        if(!param.caseNum){
                            this.$msgw('请输入案号')
                            return false;
                        }
                        if(!param.caseTypeName){
                            this.$msgw('请选择案件类型')
                            return false;
                        }
                        if(param.caseOfCauseList.length===0){
                            this.$msgw('请选择案由')
                            return false;
                        }
                        if(!param.departmentName){
                            this.$msgw('请选择承办部门')
                            return false;
                        }
                        if(!param.undertakerName){
                            this.$msgw('请选择承办法官')
                            return false;
                        }
                        if(param.involvedPersonDtoList.length===0){
                            this.$msgw('请添加当事人')
                            return false;
                        }
                        param.caseNumber='（'+param.year+'）'+param.courtPronoun+param.caseTypePronoun+param.caseNum+'号';
                        let result=this.$http.syncRequest('/caseManage/saveCaseInfo',{
                            allCaseInfoDto:param
                        })
                        if(result.code && result.code===200){
                            this.$refs.new1.formLabelAlign.caseInfoId=result.data.caseInfoId;
                            this.$refs.new3.show(result.data.caseInfoId);
                        }else if(result.code && result.code!==200){
                            this.$msgw(result.message);
                            return false;
                        }else{
                            this.$msge('服务器异常，请稍后重试');
                            return false;
                        }
                        break;
                }
                switch (to) {
                    case 'new3':
                        break;
                }
            },
           //打开弹框
            show(row){
                this.activeName = 'new1';
                this.isaddnewCase=true;
                if(row){
                    this.text='修改案件';
                    this.$refs.new1.getAllInfoByCaseInfoId(row);//案件下所有信息
                    this.$refs.new1.getCaseTypeInfos(row.caseTypePronoun);
                }else{
                    this.text='新建案件';
                    this.$refs.new1.getAllInfoByCaseInfoId();
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.isaddnewCase=false;
            },
            //保存所有信息
            qure() {
                let param= this.$refs.new1.save();
                if(!param.year){
                    this.$msgw('请选择年份')
                    return false;
                }
                if(!param.courtPronoun){
                    this.$msgw('请选择法院代字')
                    return false;
                }
                if(!param.caseTypePronoun){
                    this.$msgw('请选择案件类型代字')
                    return false;
                }
                if(!param.caseNum){
                    this.$msgw('请输入案号')
                    return false;
                }
                if(!param.caseTypeName){
                    this.$msgw('请选择案件类型')
                    return false;
                }
                if(param.caseOfCauseList.length===0){
                    this.$msgw('请选择案由')
                    return false;
                }
                if(!param.departmentName){
                    this.$msgw('请选择承办部门')
                    return false;
                }
                if(!param.undertakerName){
                    this.$msgw('请选择承办法官')
                    return false;
                }
                if(param.involvedPersonDtoList.length===0){
                    this.$msgw('请添加当事人')
                    return false;
                }
                param.caseNumber='（'+param.year+'）'+param.courtPronoun+param.caseTypePronoun+param.caseNum+'号';
                this.$http.post('/caseManage/saveCaseInfo',{
                    allCaseInfoDto:param
                }).then( res =>{
                    if(res.code === 200){
                        this.isaddnewCase = false;
                        this.$msgs('保存成功');
                        this.$parent.getpagecaseInfos();
                    }else{
                        this.$msgw(res.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            cancel() {
                this.isaddnewCase=false;
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
            top:1rem;
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
                width:12.4rem;
                background: #ECEFF0;
                min-height:4rem;
                overflow: auto;
                margin-top:.05rem;
                padding:0 .2rem;
                .el-tabs__item {
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