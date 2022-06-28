<template>
    <div class="interNettab1">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="网关管理" name="first">
                <supervise ref="supervise" />
            </el-tab-pane>
            <el-tab-pane label="网关分组" name="second">
                <grouping ref="grouping" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import supervise from "./interNettab1/supervise"
    export default {
        name: "interNettab1",
        components: {
            supervise,
            grouping:()=>import("./interNettab1/grouping"),
        },
        data() {
            return {
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                this.$nextTick(()=>{
                    switch(v){
                        case 'first':
                            this.$refs.supervise.getETGSConfigs()
                            this.$refs.supervise.getDeploymentPlans()
                            break;
                        case 'second':
                            this.$refs.grouping.getETGSGroups()
                            break;
                    }
                })
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
    .interNettab1{
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
    .interNettab1{
        min-height:8rem;
    }
</style>