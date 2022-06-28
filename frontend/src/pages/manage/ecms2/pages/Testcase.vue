<template>
        <div class="Testcase">
             <!--头部-->
            <div class="head">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="测试案件信息" name="first">
                        <tabpane1 />
                    </el-tab-pane>
                    <el-tab-pane label="测试案件音视频" name="second">
                        <tabpane2 />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
</template>
    
    <script>
        import $ from "jquery"
        import tabpane1 from "../Testcase/testtabpane1" //tabpane1
        import tabpane2 from "../Testcase/testtabpane2" //tabpane2
        export default {
            name: "Testcase",
            components: {
                tabpane1,
                tabpane2,
            },
            data() {
                return {
                    activeName:'first',
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
            methods: {}
        }
    </script>
    
    <style lang="less">
        @import url('../css/common.less');
        .Testcase{
            padding: 0 0.2rem;
            .head{
                position:relative;
                padding: .1rem 0;
                display: flex;
                display: -webkit-flex; /* Safari */
                justify-content: space-between;
                align-items: center;
                .el-tabs__item{
                    padding: 0 .2rem;
                    /* height:.4rem; */
                    /* line-height:.4rem; */
                    font-size: 0.18rem;
                }
                .el-tabs__active-bar{
                    width:100%;
                }
                /*内容填充区域*/
                .el-tabs__content{
                    width:100%;
                    position:absolute;
                    left:0;
                    top:0.5rem;
                }
            }
        }
    </style>