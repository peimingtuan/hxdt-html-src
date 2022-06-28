<template>
    <div class="assist">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="打印服务器配置" name="first">
                    <tabpane1 ref="tabpane1"/>
                </el-tab-pane>
                <el-tab-pane label="刻录服务器配置" name="second">
                    <tabpane2 ref="tabpane2"/>
                </el-tab-pane>
                <el-tab-pane label="客户端同步服务器配置" name="three">
                    <tabpane3 ref="tabpane3"/>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import $ from "jquery"
    import leftTile from "../component/leftTile" //主页左侧头部
    import tabpane1 from "../assist/tabpane1" //tabpane1
    import tabpane2 from "../assist/tabpane2" //tabpane2
    import tabpane3 from "../assist/tabpane3" //tabpane3
    export default {
        name: "assist",
        components: {
            leftTile,
            tabpane1,
            tabpane2,
            tabpane3
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/fatingwaiwei3.png'),
                text:'法庭辅助服务器配置',
                text2:'FA TING FU ZHU FU WU QI PEI ZHI',
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                switch (v) {
                    case 'first':
                        this.$refs.tabpane1.getPrintServerConfigs();
                        break;
                    case 'second':
                        this.$refs.tabpane2.getBurnServerInfo()
                        break;
                }
            }
        },
        created() {
            this.activeName='first';
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
    .assist{
        /*height:100%;*/
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
