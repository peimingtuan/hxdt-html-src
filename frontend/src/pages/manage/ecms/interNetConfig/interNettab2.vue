<template>
    <div class="interNettab2">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                <note-config ref="noteConfig" v-if="index===0"/>
                <note-module ref="noteModule" v-else-if="index===1"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "interNettab2",
        components: {
            noteConfig:()=>import("./interNettab2/noteConfig"),
            noteModule:()=>import("./interNettab2/noteModule")
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'短信策略设置'
                    },
                    {
                        id:'second',
                        name:'短信模板管理'
                    }
                ],
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                switch (v) {
                    case 'first':
                        this.$refs.noteConfig[0].getSMSTemplates();
                        this.$refs.noteConfig[0].getInternetSmsStrategies()
                        break;
                    case 'second':
                        this.$refs.noteModule[0].getSMSTemplates()
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
    .interNettab2{
        .fl();
        .el-tabs__header{
            margin-bottom:0;
        }
        .el-tabs__item{
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
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style lang="less" scoped>
    .interNettab2{
        min-height:8rem;
    }
</style>