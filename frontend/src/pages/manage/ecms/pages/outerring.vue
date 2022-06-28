<template>
    <div class="outerring">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName">
                <el-tab-pane label="直播系统配置(TLS)" name="first">
                    <tabpane1 ref="tabpane1" />
                </el-tab-pane>
                <el-tab-pane label="法警系统配置(CAS)" name="second">
                    <tabpane2 ref="tabpane2" />
                </el-tab-pane>
                <el-tab-pane label="公告系统配置(TDS)" name="three">
                    <tabpane3 ref="tabpane3" />
                </el-tab-pane>
                <el-tab-pane label="旁听辅助客户端配置" name="four">
                    <tabpane4 ref="tabpane4" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import leftTile from "../component/leftTile" //主页左侧头部
    import tabpane1 from "../outerring/tabpane1" //tabpane1
    import tabpane2 from "../outerring/tabpane2" //tabpane2
    import tabpane3 from "../outerring/tabpane3" //tabpane3
    import tabpane4 from "../outerring/tabpane4" //tabpane4
    export default {
        name: "outerring",
        components: {
            leftTile,
            tabpane1,
            tabpane2,
            tabpane3,
            tabpane4
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/fatingwaiwei3.png'),
                text:'法庭外围系统配置',
                text2:'FA TING WAI WEI XI TONG PEI ZHI',
                activeName:'first',
            }
        },
        watch:{
            activeName(v){
                switch(v){
                    case 'second':
                        this.$refs.tabpane2.getCASClients();
                        break;
                    case 'three':
                        this.$refs.tabpane3.activeName='first';
                        break;
                    case 'four':
                        this.$refs.tabpane4.activeName='first';
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
        methods: {

        }
    }
</script>
<style lang="less">
    @import url('../css/common.less');
    .outerring{
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