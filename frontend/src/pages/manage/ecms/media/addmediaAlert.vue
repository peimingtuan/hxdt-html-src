<template>
    <div class="addmediaAlert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/kehuduan.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-main">
                        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeleave">
                            <el-tab-pane label="基本信息" name="info1">
                                <mediainfo1 ref="mediainfo1"/>
                            </el-tab-pane>
                            <el-tab-pane label="流媒体存储路径管理" name="info2">
                                <mediainfo2 ref="mediainfo2"/>
                            </el-tab-pane>
                            <el-tab-pane label="服务器存储管理" name="info3">
                                <mediainfo3 ref="mediainfo3"/>
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
    </div>
</template>

<script>
    import AlertleftTile from "../component/AlertleftTile"
    import mediainfo1 from "./mediainfo1" //基本信息
    import mediainfo2 from "./mediainfo2" //流媒体存储路径管理
    import mediainfo3 from "./mediainfo3" //服务器存储管理
    import {mapState,mapMutations} from 'vuex'
    import Tool from '../js/tools'
    export default {
        name: "addmediaAlert",
        props:{
            alertshow:Boolean,
        },
        components: {
            AlertleftTile,
            mediainfo1,
            mediainfo2,
            mediainfo3
        },
        data() {
            return {
                text:'添加流媒体服务器',
                text2:'详细数据显示',
                activeName:'info1',//当前活跃tab
            }
        },
        computed:{
            ...mapState('media',[
                "smsInfoId",//当前流媒体id
            ])
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            ...mapMutations('media',[
                "changesmsInfoId",
                "setserialNumber",
            ]),
            show(row){
                this.activeName='info1'
                if(row)this.$refs.mediainfo1.show(row);//修改逻辑处理
                else this.$refs.mediainfo1.show();
            },
            //tab页签切换
            handleClick(){
                console.log(this.activeName)
            },
            //tab页签切换钩子函数
            beforeleave(to,from){
                switch (from) {
                    case 'info1':
                         // if(this.smsInfoId=='')this.$refs.mediainfo1.saveinfo1();
                         // else this.$refs.mediainfo1.saveinfo1(this.smsInfoId);//编辑逻辑
                        if(!this.$refs.mediainfo1.formLabelAlign.smsInfoName){
                            this.$msgw('请输入服务器名称');
                            return false;
                        }
                        // if(!this.$refs.mediainfo1.formLabelAlign.intranet1Name){
                        //     this.$msgw('请输入内网网卡');
                        //     return false;
                        // }
                        if(!this.$refs.mediainfo1.formLabelAlign.intranet1Ip||!Tool.isValidIP(this.$refs.mediainfo1.formLabelAlign.intranet1Ip)){
                            this.$msgw('请输入有效的内网IP地址');
                            return false;
                        }
                        if(this.$refs.mediainfo1.formLabelAlign.extranet1Ip&&!Tool.isValidIP(this.$refs.mediainfo1.formLabelAlign.extranet1Ip)){
                            this.$msgw('请输入有效的外网IP地址');
                            return false;
                        }
                        let result=this.$refs.mediainfo1.saveinfo1(this.smsInfoId)
                        if(result && result.code===200){
                            this.changesmsInfoId(result.data.smsInfoId)//流媒体id
                            this.setserialNumber(result.data.serialNumber)//序列号
                            this.$msgs('保存成功');
                            //return true;
                        }else if(result && result.code!==200){
                            this.$msgw(result.message);
                            return false;
                        }else{
                            return false;
                        }
                        break;
                    }
                switch (to) {
                    case 'info2':
                        this.$refs.mediainfo2.getmediaroad();
                        break;
                    case 'info3':
                        let result=this.$refs.mediainfo2.getmediaroad2()
                        if(result && result.code===200){
                            if(result.data.length>0)this.$refs.mediainfo3.getmount();
                            else{
                                this.$msgw('请先添加流媒体存储路径');
                                return false;
                            }
                        }else{
                            this.$msgw('请先添加流媒体存储路径');
                            return false;
                        }
                        break;
                }
            },
            //传值,保存mediainfo1信息
            pass(){
                if(!this.$refs.mediainfo1.formLabelAlign.smsInfoName){
                    this.$msgw('请输入服务器名称');
                    return false;
                }
                // if(!this.$refs.mediainfo1.formLabelAlign.intranet1Name){
                //     this.$msgw('请输入内网网卡');
                //     return false;
                // }
                if(!this.$refs.mediainfo1.formLabelAlign.intranet1Ip||!Tool.isValidIP(this.$refs.mediainfo1.formLabelAlign.intranet1Ip)){
                    this.$msgw('请输入有效的内网IP地址');
                    return false;
                }
                if(this.$refs.mediainfo1.formLabelAlign.extranet1Ip&&!Tool.isValidIP(this.$refs.mediainfo1.formLabelAlign.extranet1Ip)){
                    this.$msgw('请输入有效的外网IP地址');
                    return false;
                }
                return  this.$refs.mediainfo1.saveinfo1(this.smsInfoId)
                // if(this.smsInfoId==''){
                //     return  this.$refs.mediainfo1.saveinfo1()
                // }else{//编辑逻辑
                //     return  this.$refs.mediainfo1.saveinfo1(this.smsInfoId)
                // }
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
    .addmediaAlert{
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
            .content-main{
                width:100%;
                background: #ECEFF0;
                min-height:4rem;
                max-height:7rem;
                overflow: auto;
                margin-top:.1rem;
                padding:0 .2rem;
                .el-tabs__item{
                    .f18();
                    height:.5rem;
                    line-height:.5rem;
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>