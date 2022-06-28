<template>
    <!--弹框-->
    <transition name="slide-fade">
        <div class="alert-window2 addlawAlert" v-show="alertshow">
            <div class="main">
                <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                <img class="alert-close" @click="alertshow=false" src="../images/alert-close.png" />
                <AlertleftTile :text="text" :text2="text2"/>
                <div class="content1">
                    <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeleave">
                        <el-tab-pane label="基本信息" name="info1">
                            <info1 ref="info1"/>
                        </el-tab-pane>
                        <el-tab-pane label="客户端信息" name="info2">
                            <info2 ref="info2"/>
                        </el-tab-pane>
                        <el-tab-pane label="设备信息" name="info3">
                            <info3 ref="info3"/>
                        </el-tab-pane>
                        <el-tab-pane label="实时刻录" name="info4">
                            <info4 ref="info4"/>
                        </el-tab-pane>
                        <el-tab-pane label="音频设备" name="info5">
                            <info5 ref="info5"/>
                        </el-tab-pane>
                        <el-tab-pane label="录制管理" name="info6">
                            <info6 ref="info6" />
                        </el-tab-pane>
                        <el-tab-pane label="互联网庭审配置" name="info7">
                            <info7 ref="info7"/>
                        </el-tab-pane>
                        <el-tab-pane label="软中控命令配置" name="info8">
                            <info8 ref="info8"/>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="bt">
                    <div class="qure" @click="sure(activeName)">
                        <img src="../images/courtsupervision/sure.png" />确定
                    </div>

                    <div class="cancel" @click="alertshow=false">
                        <img src="../images/courtsupervision/cancel.png" />取消
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import FoundationTools from '../../../../js/functionAjax'
    import AlertleftTile from "../component/AlertleftTile"
    import {mapState,mapMutations,mapActions} from 'vuex'
    import info1 from "./info1" //基本信息
    import info2 from "./info2" //客户端信息
    import info3 from "./info3" //设备信息
    import info4 from "./info4" //实时刻录
    import info5 from "./info5" //音频设备
    import info6 from "./info6" //录制管理
    import info7 from "./info7" //互联网庭审配置
    import info8 from "./info8" //软中控命令配置
    export default {
        name: "addlawAlert",
        components: {
            AlertleftTile,
            info1,
            info2,
            info3,
            info4,
            info5,
            info6,
            info7,
            info8,
        },
        data() {
            return {
                text:'添加法庭',
                text2:'请填写详细信息',
                alertshow:false,//弹框变量
                activeName:'info1',
                among:true
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "rowinfo",
                "courtRoomId",
            ])
        },
        methods: {
            ...mapMutations('courtyardallocation',[
                "setcourtRoomId"
            ]),
            ...mapActions('courtyardallocation',[
                "getlawlist",
            ]),
            //展示弹框
            show(row){
                this.alertshow=true;
                if(this.activeName!=='info1'){
                    this.among=false
                    this.activeName='info1'
                }else{
                    this.among=true
                }
                if(row){//修改逻辑处理
                    this.setcourtRoomId(row.courtRoomId)//法庭id
                    this.$refs.info1.show(row);
                }else{
                    this.setcourtRoomId('')//法庭id
                    this.$refs.info1.show();
                }
            },
            //tab页签切换
            handleClick(){

            },
            //tab页签切换钩子函数
            beforeleave(to,from){
                if(!this.among){
                    this.among=true;
                    return;
                }
                switch (from) {
                    case 'info1':
                        let result=this.$refs.info1.saveinfo1()
                        if(result && result.code===200){
                            this.setcourtRoomId(result.data.courtRoomId)//法庭id
                            FoundationTools.setCookie('peicourtRoomName',result.data.courtRoomName)//法庭名称
                        }else if(result && result.code!==200){
                            this.$msgw(result.message);
                            return false;
                        }else{
                            return false;
                        }
                        break;
                    case 'info4':
                        this.$refs.info4.saveinfo4();
                        break;
                    case 'info6':
                        Promise.all([this.$refs.info6.saveinfo6(),
                            this.$refs.info6.saveOrUpdateCourtRoomEcosBackup()]).then(()=>{
                        });
                        break;
                }
                switch (to) {
                    case 'info2':
                        this.$refs.info2.httpinfo();
                        break;
                    case 'info3':
                        this.$refs.info3.activeName='1';
                        Promise.all([this.$refs.info3.getinfoDevice3(this.rowinfo),
                            this.$refs.info3.getinfoSignal3(this.rowinfo),
                            this.$refs.info3.getinfoDecode3(this.rowinfo)]).then(()=>{

                        });
                        break;
                    case 'info4':
                        this.$refs.info4.getinfo4(this.rowinfo);
                        break;
                    case 'info5':
                        Promise.all([this.$refs.info5.getinfoBackup5(this.rowinfo),
                            this.$refs.info5.getinforole5(this.rowinfo)]).then(()=>{

                        });
                        break;
                    case 'info6':
                        this.$refs.info6.getinfoup(this.rowinfo)
                        break;
                    case 'info7':
                        this.$refs.info7.show()
                        break;
                    case 'info8':
                        this.$refs.info8.show()
                        break;
                }
            },
            //确定
            sure(activeName) {
                switch (activeName) {
                    case 'info1':
                        let result=this.$refs.info1.saveinfo1()
                        if(result && result.code===200){
                            this.alertshow=false;
                            this.getlawlist(this.$parent);
                        }else if(result && result.code!==200){
                            this.$msgw(result.message);
                        }
                        break;
                    case 'info2':
                        this.alertshow=false;
                        this.getlawlist(this.$parent);
                        break;
                    case 'info3':
                        this.alertshow=false;
                        this.getlawlist(this.$parent);
                        break;
                    case 'info4':
                        this.$refs.info4.saveinfo4().then(data=>{
                            console.log(data)
                            if(data.code===200){
                                this.alertshow=false;
                                this.getlawlist(this.$parent);
                            }
                        });
                        break;
                    case 'info5':
                        this.alertshow=false;
                        this.getlawlist(this.$parent);
                        break;
                    case 'info6':
                        Promise.all([this.$refs.info6.saveinfo6(),this.$refs.info6.saveOrUpdateCourtRoomEcosBackup()]).then(data=>{
                            this.alertshow=false;
                            this.getlawlist(this.$parent);
                        });
                        break;
                    case 'info7':
                        this.$refs.info7.saveCourtETGSAssignConfig()
                        this.alertshow=false;
                        this.getlawlist(this.$parent);
                        break;
                    case 'info8':
                        this.$refs.info8.saveCentralCommandInfo(this.$refs.info8.courtWay).then(res=>{
                            if(res&&res.code===200){
                                this.alertshow=false;
                                this.getlawlist(this.$parent);
                            }
                        })
                        break;
                    default:
                        this.alertshow=false;
                }
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addlawAlert{
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
            @import url('../css/alertimg.less');
            .content1{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                max-height: 6rem;
                overflow: auto;
                margin-top:.05rem;
                padding:0 .2rem;
                .el-tabs__item {
                    .f18();
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>