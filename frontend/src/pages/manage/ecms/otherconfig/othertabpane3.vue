<template>
    <div class="othertabpane3">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                <div v-if="index===0">
                    <tab1 ref="tab1" :loginList="loginList"/>
                </div>
                <div v-else-if="index===1">
                    <tab2 ref="tab2" :loginList="loginList"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import tab1 from "./othertabpane3/josmodel"
    import tab2 from "./othertabpane3/cosmodel"
    export default {
        name: "othertabpane3",
        components: {
            tab1,
            tab2,
        },
        data() {
            return {
                tablist:[
                    {
                        id:'first',
                        name:'法官端'
                    },
                    {
                        id:'second',
                        name:'书记员端'
                    }
                ],
                loginList:[],
                activeName:'',
            }
        },
        created() {
            this.getLoginTypeList()
        },
        mounted() {

        },
        destroyed() {

        },
        watch:{
            activeName(v){
                switch (v) {
                    case 'first':
                        this.$refs.tab1[0].getLoginSettingConfig()
                        break;
                    case 'second':
                        this.$refs.tab2[0].getLoginSettingConfig()
                        break;
                }
            }
        },
        methods: {
            getLoginTypeList(){
                const _this=this;
                _this.$http.post('/loginType/getLoginTypeList', {

                }).then(data =>{
                    if(data.code===200){
                        _this.loginList=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {

                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane3{
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
    .othertabpane3{
        min-height:8rem;
    }
</style>