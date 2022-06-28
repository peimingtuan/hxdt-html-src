<template>
    <div class="otherconfig">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName">
                <el-tab-pane label="客户端配置" name="two">
                    <othertabpane2 ref="othertabpane2"/>
                </el-tab-pane>
                <!--<el-tab-pane label="登录模式" name="three">-->
                    <!--<othertabpane3 ref="othertabpane3"/>-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="播放器配置" name="four">
                    <othertabpane4 ref="othertabpane4"/>
                </el-tab-pane>
                <el-tab-pane label="设备监控管理" name="five">
                    <othertabpane5 ref="othertabpane5"/>
                </el-tab-pane>
                <el-tab-pane label="报警配置" name="six">
                    <othertabpane6 ref="othertabpane6"/>
                </el-tab-pane>
                <!--<el-tab-pane label="笔录保存设置" name="seven">-->
                    <!--<othertabpane7 ref="othertabpane7"/>-->
                <!--</el-tab-pane>-->
                <el-tab-pane label="下载地址" name="eight">
                    <othertabpane8 ref="othertabpane8"/>
                </el-tab-pane>
                <el-tab-pane label="客户端启动检测" name="nine">
                    <othertabpane9 ref="othertabpane9"/>
                </el-tab-pane>
                <el-tab-pane label="同步业务数据" name="ten">
                    <othertabpane10 ref="othertabpane10"/>
                </el-tab-pane>
                <el-tab-pane label="庭审巡查配置" name="eleven">
                    <othertabpane11 ref="othertabpane11"/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import leftTile from "../component/leftTile" //主页左侧头部
    import othertabpane2 from "../otherconfig/othertabpane2" //othertabpane2
    //import othertabpane3 from "../otherconfig/othertabpane3" //othertabpane3
    import othertabpane4 from "../otherconfig/othertabpane4" //othertabpane4
    import othertabpane5 from "../otherconfig/othertabpane5" //othertabpane5
    import othertabpane6 from "../otherconfig/othertabpane6" //othertabpane6
    //import othertabpane7 from "../otherconfig/othertabpane7" //othertabpane7
    import othertabpane8 from "../otherconfig/othertabpane8" //othertabpane8
    import othertabpane9 from "../otherconfig/othertabpane9" //othertabpane9
    import othertabpane10 from "../otherconfig/othertabpane10" //othertabpane10
    export default {
        name: "otherconfig",
        components: {
            leftTile,
            othertabpane2,
            //othertabpane3,
            othertabpane4,
            othertabpane5,
            othertabpane6,
            //othertabpane7,
            othertabpane8,
            othertabpane9,
            othertabpane10,
            othertabpane11:()=>import("../otherconfig/othertabpane11")
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/qitapeizhi3.png'),
                text:'其它配置',
                text2:'QI TA PEI ZHI',
                activeName:'two',
            }
        },
        watch:{
            activeName(v){
                switch(v){
                    case 'two':
                        this.$refs.othertabpane2.activeName='first'
                        break;
                    // case 'three':
                    //     this.$refs.othertabpane3.activeName='first'
                    //     break;
                    case 'four':
                        this.$refs.othertabpane4.getPlayConfiginfo()
                        break;
                    case 'five':
                        this.$refs.othertabpane5.getMonitorlist()
                        break;
                    case 'six':
                        this.$refs.othertabpane6.activeName='first'
                        break;
                    case 'eleven':
                        this.$refs.othertabpane11.activeName='first'
                        break;
                }
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {}
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .otherconfig{
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