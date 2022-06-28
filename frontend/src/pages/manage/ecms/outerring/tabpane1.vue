<template>
    <div class="tabpanel">
        <div class="top">
            <div class="le">
                <el-radio v-model="radio" label="1" >直播控制客户端</el-radio>
                <el-radio v-model="radio" label="2">直播显示客户端</el-radio>
            </div>
            <div class="ri">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
        </div>
        <div v-if="radio==1">
            <!--直播控制客户端-->
            <tabpaneOne1 ref="tabpaneOne1"/>
        </div>
        <div v-else>
            <!--直播显示客户端-->
            <tabpaneOne2 ref="tabpaneOne2"/>
        </div>
        <!--添加直播控制客户端弹框-->
        <addoutAlertone1 v-if="radio==1" ref="addoutAlertone1" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
        <!--添加直播显示客户端弹框-->
        <addoutAlertone2 v-if="radio==2" ref="addoutAlertone2" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import tabpaneOne1 from "./tabpaneOne1" //直播控制客户端
    import tabpaneOne2 from "./tabpaneOne2" //直播显示客户端
    import addoutAlertone1 from "./addoutAlertone1" //添加直播控制客户端弹框
    import addoutAlertone2 from "./addoutAlertone2" //添加直播显示客户端弹框
    export default {
        name: "tabpanel",
        components: {
            tabpaneOne1,
            tabpaneOne2,
            addoutAlertone1,
            addoutAlertone2
        },
        data() {
            return {
                ismain:false,
                radio: '1',//直播类型
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //添加弹框
            add(){
                this.ismain=true;
            },
            //关闭添加弹框
            addlawsure(){
                this.ismain=false;
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .tabpanel{
        /*头部内容*/
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .el-radio{
                    /*选框*/
                    .el-radio__inner{
                        width:.2rem;
                        height:.2rem;
                        &:after{
                            width:.06rem;
                            height:.06rem;
                        }
                    }
                    /*文本*/
                    .el-radio__label{
                        .f18();
                    }
                }
            }
            .ri{
                cursor:pointer;
                &>div.add{
                    img{
                        width:.8rem;
                    }
                }
            }
        }
    }
</style>