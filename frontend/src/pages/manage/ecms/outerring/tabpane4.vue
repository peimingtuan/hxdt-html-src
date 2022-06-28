<template>
    <div class="tabpane4">
        <div class="top">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                    <div v-if="index===0">
                        <audit-module ref="auditModule" />
                    </div>
                    <div v-else-if="index===1">
                        <audit-module2 ref="auditModule2" />
                    </div>
                    <div v-else-if="index===2">
                        <audit-module3 ref="auditModule3" />
                    </div>
                    <div v-else-if="index===3">
                        <audit-module4 ref="auditModule4" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabpane4",
        components:{
            auditModule:()=>import("./tabpane4/auditModule1"),
            auditModule2:()=>import("./tabpane4/auditModule2"),
            auditModule3:()=>import("./tabpane4/auditModule3"),
            auditModule4:()=>import("./tabpane4/auditModule4")
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'旁听辅助客户端'
                    },
                    {
                        id:'second',
                        name:'旁听辅助文件设置'
                    },
                    {
                        id:'three',
                        name:'旁听辅助基础设置'
                    },
                    {
                        id:'fourth',
                        name:'旁听辅助工具测试'
                    }
                ],
                activeName:'',
            }
        },
        watch:{
            activeName(v){
                switch(v){
                    case 'first':
                        this.$refs.auditModule[0].getChasInfo();
                        break;
                    case 'second':
                        this.$refs.auditModule2[0].show();
                        break;
                    case 'three':
                        this.$refs.auditModule3[0].getChasConfig();
                        break;
                    case 'fourth':
                        this.$refs.auditModule4[0].getChasInfos();
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
    .tabpane4{
        .top{
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
    }
</style>
<style lang="less" scoped>
    .tabpane4{
        min-height:8rem;
    }
</style>