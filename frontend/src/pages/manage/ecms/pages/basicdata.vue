<template>
    <div class="basicdata">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="法院选择" name="first">
                    <tabpane1 ref="tabpane1" />
                </el-tab-pane>
                <el-tab-pane label="与案综合配置" name="second">
                    <tabpane2 ref="tabpane2" />
                </el-tab-pane>
                <el-tab-pane label="法庭配置" name="third">
                    <tabpane3 ref="tabpane3" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import leftTile from "../component/leftTile" //主页左侧头部
    import tabpane1 from "../basicdata/tabpane1" //tabpane1
    import tabpane2 from "../basicdata/tabpane2" //tabpane2
    import tabpane3 from "../basicdata/tabpane3" //tabpane3
    export default {
        name: "basicdata",
        components: {
            leftTile,
            tabpane1,
            tabpane2,
            tabpane3,
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/remote3.png'),
                text:'基础数据配置',
                text2:'JI CHU SHU JU PEI ZHI',
                activeName:'first',
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            handleClick(v){
                if(v.name=='second'){
                    this.$refs.tabpane2.activeName='first';
                }else if(v.name=='third'){
                    this.$refs.tabpane3.activeName='first';
                }
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .basicdata{
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