<template>
    <div class="tabpane3">
        <div class="basicdata-top">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                    <div v-if="index===0">
                        <tab1 ref="tab1" />
                    </div>
                    <div v-else-if="index===1">
                        <tab2 ref="tab2" />
                    </div>
                    <div v-else-if="index===2">
                        <tab3 ref="tab3" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import tab1 from "./tabpane3/basictabpane1" //信号源配置
    import tab2 from "./tabpane3/basictabpane2" //法庭类型配置
    import tab3 from "./tabpane3/basictabpane3" //信号类型配置
    export default {
        name: "tabpane3",
        components: {
            tab1,
            tab2,
            tab3,
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'信号源配置'
                    },
                    {
                        id:'second',
                        name:'法庭类型配置'
                    },
                    {
                        id:'three',
                        name:'信号类型配置'
                    },
                ],
                activeName:'',
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        watch:{
            activeName(v){
                if(v=='first'){
                    this.$refs.tab1[0].getViewlist()
                }else if(v=='second'){
                    this.$refs.tab2[0].getlawTypelist()
                }else if(v=='three'){
                    this.$refs.tab3[0].getsignalTypelist();
                }
            }
        },
        methods: {
            handleClick(v){

            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpane3{
        .basicdata-top{
            .fr();
            .el-tabs__header{
                margin-bottom:0;
            }
            .el-tabs__item{
                /*width:2.68rem;*/
                text-align: center ;
                height:.4rem;
                line-height:.4rem;
                .f20();
                color: #606266;
            }
            .el-tabs--card>.el-tabs__header .is-active{
                border-left:1px solid #2f8ded;
            }
            /*激活标签*/
            .is-active{
                color:#fff;
                /*background: rgba(47,141,237,1);*/
                background:#2F8DED;
                border: 1px solid #2F8DED;
                border-bottom-color: #2F8DED!important;
                border-left-color: #2F8DED!important;
            }
            /*存放内容*/
            .el-tabs__content{
                top:.5rem!important;
            }
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    .tabpane3{
        min-height:8rem;
    }
</style>