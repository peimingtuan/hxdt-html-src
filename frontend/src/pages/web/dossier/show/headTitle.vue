<template>
    <div class="head">
        <div class="title-one">
            <div class="num">{{caseNumber || '(2019)苏01民初0182'}}</div>
            <div class="icon">
                <img @click="closePage" src="../images/iconclose.png"/>
            </div>
        </div>
        <div class="title-two">
            <div class="num">
                请勾选授权诉讼参与人可查阅的卷宗
                <span class="select-authorize" v-if="disabled" :class="{selected:selected}">
                            <img v-if="selected" src="../images/radio_button.png" />
                            <img v-else src="../images/radio_disabled.png" />
                            新增卷宗默认授权
                        </span>
                <span class="select-authorize" v-else @click="changeState" :class="{selected:selected}">
                            <img v-if="selected" src="../images/radio_button.png" />
                            <img v-else src="../images/radio_disabled.png" />
                            新增卷宗默认授权
                        </span>
            </div>
            <div class="icon">
                <el-button v-if="disabled" @click="editInfo" class="edit-icon el-icon-edit-outline">
                    修改授权
                </el-button>
                <el-button v-else @click="saveInfo" class="save-icon el-icon-folder" type="primary">
                    保存授权
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headTitle",
        props:['caseNumber','selected'],
        data() {
            return {
                disabled:true
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            changeState(){
                this.$emit("update:selected",!this.selected)
                //this.$emit("changeState",!this.selected)
            },
            editInfo(){
                this.disabled=false
                this.$emit('editInfo')
            },
            closePage(){
                this.$emit('closePage')
            },
            saveInfo(){
                this.$emit('saveInfo')
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    @import url("../css/common.less");
    .head{
        &>div{
            padding:0 20px;
            .fb();
            div{
                .f16()
            }
        }
        .title-one{
            background: #1B66AA;
            height:5vh;
            div{
                color:#fff;
            }
            .icon{
                cursor:pointer;
            }
        }
        .title-two{
            padding:5px 20px;
            height:60px;
            background: #F5F7FA;
            .select-authorize{
                margin-left:50px;
                cursor:pointer;
                color: #606266;
                img{
                    position:relative;
                    top:-1px;
                }
            }
            .selected{
                color: #2F8DED;
            }
        }
    }
</style>
<style lang="less">

</style>