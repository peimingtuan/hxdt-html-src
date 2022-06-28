<template>
    <div class="othertabpane2">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                <div v-if="index===0">
                    <el-tabs class="el-tabs-edit" v-model="activeFirstName" type="card">
                        <el-tab-pane v-for="(item,indexk) in tab_first_list" :key="indexk" :label="item.name"  :name="item.id">
                            <div v-if="indexk===0">
                                <set-base ref="setBase" />
                            </div>
                            <div v-if="indexk===1">
                                <set-picutre ref="setPicutre" />
                            </div>
                            <div v-if="indexk===2">
                                <dossier-manage ref="dossierManage" />
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div v-if="index===1">
                    <cos-config ref="cosConfig" />
                </div>
                <div v-if="index===2">
                    <jos-config ref="josConfig" />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import setBase from "./othertabpane2/pos/setBase"
    import setPicutre from "./othertabpane2/pos/setPicutre"
    export default {
        name: "othertabpane2",
        components: {
            setBase,
            setPicutre,
            cosConfig:()=>import("./othertabpane2/cos/cosConfig"),
            josConfig:()=>import("./othertabpane2/jos/josConfig"),
            dossierManage:()=>import("./othertabpane2/pos/dossierManage")
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'POS配置'
                    },
                    {
                        id:'second',
                        name:'COS配置'
                    },
                    {
                        id:'three',
                        name:'JOS配置'
                    }
                ],
                tab_first_list:[
                    {
                        id:'first',
                        name:'功能开启设置'
                    },
                    {
                        id:'second',
                        name:'开机图片轮番设置'
                    },
                    {
                        id:'three',
                        name:'卷宗数据管理'
                    }
                ],
                activeName:'first',
                activeFirstName:'first',
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
                switch (v) {
                    case 'first':
                        console.log(300)
                        this.$refs.activeFirstName='first'
                        break;
                    case 'second':
                        this.$refs.cosConfig[0].getBaseConfig()
                        break;
                    case 'three':
                        this.$refs.josConfig[0].getBaseConfig()
                        break;
                }
            },
            activeFirstName(v){
                switch (v) {
                    case 'first':
                        this.$refs.setBase[0].getTreeData()
                        break;
                    case 'second':
                        this.$refs.setPicutre[0].select()
                        break;
                    case 'three':
                        this.$refs.dossierManage[0].getPosConfig()
                        break;
                }
            }
        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane2{
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
        .el-tabs-edit{
            .el-tabs__content{
                position:relative!important;
                top:.1rem!important;
                left:0!important;
            }
        }
    }
</style>
<style lang="less" scoped>
    .othertabpane2{
        min-height:8rem;
    }
</style>