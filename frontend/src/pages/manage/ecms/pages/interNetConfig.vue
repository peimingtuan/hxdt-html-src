<template>
    <div class="interNetConfig">
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName">
                <el-tab-pane label="音视频网关配置" name="first">
                    <interNettab1 ref="interNettab1" />
                </el-tab-pane>
                <el-tab-pane label="短信通知设置" name="second">
                    <interNettab2 ref="interNettab2" />
                </el-tab-pane>
                <el-tab-pane label="云账号管理" name="three">
                    <interNettab3 ref="interNettab3" />
                </el-tab-pane>
                <el-tab-pane label="ETMS管理" name="four">
                    <interNettab4 ref="interNettab4" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import interNettab1 from "../interNetConfig/interNettab1"
    import interNettab3 from "../interNetConfig/interNettab3"
    import interNettab4 from "../interNetConfig/interNettab4"
    export default {
        name: "interNetConfig",
        components:{
            leftTile:()=>import("../component/leftTile"),
            interNettab1,
            interNettab2:()=>import("../interNetConfig/interNettab2"),
            interNettab3,
            interNettab4,
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/fatingwaiwei3.png'),
                text:'互联网开庭相关配置',
                text2:'HU LIAN WANG KAI TING XIANG GUAN PEI ZHI',
                activeName:'first',
            }
        },
        watch:{
            activeName:{
                handler(v) {
                    this.$nextTick(()=>{
                        switch(v){
                            case 'first':
                                this.$refs.interNettab1.activeName='first'
                                break;
                            case 'second':
                                this.$refs.interNettab2.activeName='first'
                                break;
                            case 'three':
                                this.$refs.interNettab3.getRTCConfigs();
                                break;
                            case 'four':
                                this.$refs.interNettab4.getETMSServer();
                                break;
                        }
                    })
                },
                immediate: true
            },
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

        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .interNetConfig{
        padding: 0 .2rem;
        .head{
            position:relative;
            padding: .1rem 0;
            .fb();
            .el-tabs__item{
                padding: 0 .2rem;
                height:.4rem;
                line-height:.4rem;
                .f18();
            }
            .el-tabs__active-bar{
                width:100%;
            }
            /*内容填充区域*/
            .el-tabs__content{
                width:100%;
                position:absolute;
                left:0;
                /*top:1rem;*/
            }
        }
    }
</style>