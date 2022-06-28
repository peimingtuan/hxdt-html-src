<template>
    <div class="othertabpane6">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                <police-Num ref="policeNum" v-if="index===0"/>
                <note-module ref="noteModule" v-else-if="index===1"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "othertabpane6",
        components: {
            policeNum:()=>import("./othertabpane6/policeNum"),
            noteModule:()=>import("./othertabpane6/noteModule")
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'报警账号配置'
                    },
                    {
                        id:'second',
                        name:'通知模板配置'
                    }
                ],
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                switch (v) {
                    case 'first':
                        this.$refs.policeNum[0].getDevOpsPersonInfos()
                        break;
                    case 'second':
                        this.$refs.noteModule[0].getSMSTemplates();
                        this.$refs.noteModule[0].getAlarmSmsTemplate();
                        break;
                }
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
        methods: {

        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane6{
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
    }
</style>
<style scoped>
    .othertabpane6{
        min-height:8rem;
    }
</style>