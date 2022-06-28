<template>
    <div class="tabpane2">
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
                    <div v-else-if="index===3">
                        <tab4 ref="tab4" />
                    </div>
                    <div v-else-if="index===4">
                        <tab5 ref="tab5" />
                    </div>
                    <div v-else-if="index===5">
                        <tab6 ref="tab6" />
                    </div>
                    <div v-else-if="index===6">
                        <tab7 ref="tab7" />
                    </div>
                    <div v-else-if="index===7">
                        <tab8 ref="tab8" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import tab1 from "./tab1" //案由
    import tab2 from "./tab2" //案件类型
    import tab3 from "./tab3" //案件地位管理
    import tab4 from "./tab4" //人民陪审员管理
    import tab5 from "./tab5" //开庭方式
    import tab6 from "./tab6" //视角配置
    import tab7 from "./tab7" //音频角色配置
    import tab8 from "./tab8" //适用程序
    export default {
        name: "tabpane2",
        components: {
            tab1,
            tab2,
            tab3,
            tab4,
            tab5,
            tab6,
            tab7,
            tab8,
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'案由'
                    },
                    {
                        id:'second',
                        name:'案件类型'
                    },
                    {
                        id:'three',
                        name:'案件地位管理'
                    },
                    {
                        id:'four',
                        name:'人民陪审员管理'
                    },
                    {
                        id:'five',
                        name:'开庭方式'
                    },
                    {
                        id:'six',
                        name:'视角配置'
                    },
                    {
                        id:'seven',
                        name:'音频角色配置'
                    },
                    {
                        id:'eight',
                        name:'适用程序'
                    }
                ],
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                switch (v) {
                    case 'first':
                        this.$refs.tab1[0].getCauseListByCauseCode(-1)
                        break;
                    case 'second':
                        this.$refs.tab2[0].getCaseTypeListByCaseTypeCode(-1)
                        break;
                    case 'three':
                        this.$refs.tab3[0].getCaseStandingConfigs();
                        break;
                    case 'four':
                        this.$refs.tab4[0].getPeopleAssessorConfigList();
                        break;
                    case 'five':
                        this.$refs.tab5[0].getCourtWayConfigList();
                        break;
                    case 'six':
                        this.$refs.tab6[0].getViewConfigs();
                        break;
                    case 'seven':
                        this.$refs.tab7[0].getAudioRoleConfigs();
                        break;
                    case 'eight':
                        this.$refs.tab8[0].getApplyProgramConfigs();
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
    .tabpane2{
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
    .tabpane2 {
        min-height:8rem;
    }
</style>