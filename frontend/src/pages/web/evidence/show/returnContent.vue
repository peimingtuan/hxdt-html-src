<template>
    <div class="returnContent">
        <div class="returnContent-title">
            请输入退回理由：<span>(点击下方标签可快速回复)</span>
        </div>
        <div class="returnContent-list">
            <div class="module" v-for="(item,index) in returnLabelList" :key="index" @click="copyCon(item.labelName)">
                {{item.labelName}}<img @click.stop="removeItem(item.id,index)" src="../images/iconclose.png"/>
            </div>
            <div v-show="changeNum" class="module" @click="changeNum=!changeNum">
                <i class="el-icon-plus"></i>新标签
            </div>
            <div v-show="!changeNum" class="module">
                <el-input ref="inputFocus" v-model="keyWord" autofocus="true" @blur="addItem(keyWord)"></el-input>
            </div>
        </div>
        <div class="returnContent-remark">
            <textarea v-model.trim="backReason" ref="void_writeinfo"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "returnContent",
        props:{
            returnLabelList:Array
        },
        data() {
            return {
                backReason:'',
                changeNum:true,
                keyWord:null
            }
        },
        created() {
        },
        mounted() {
        },
        watch:{
            changeNum(v){
                if(!v){
                    this.keyWord=null
                    this.$nextTick(()=>{
                        this.$refs.inputFocus.$el.querySelector('input').focus()
                    })
                }
            }
        },
        methods: {
            copyCon(name){
                this.backReason+=name
                this.$refs.void_writeinfo.focus()
            },
            removeItem(id,index){
                this.$emit('removeItem',id,index)
            },
            addItem(keyWord){
                this.changeNum=true
                if(keyWord)this.$emit('addItem',keyWord)
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
    .returnContent {
        max-height:500px;
        overflow: auto;
        padding:5px 25px;
        &-title{
            padding:10px 0;
            span{
                color: #909399;
            }
        }
        &-list{
            padding:5px 0 15px;
            .fl();
            flex-wrap: wrap;
            >div.module{
                margin:0 0 10px 10px;
                padding:4px 10px;
                background: #F0F2F5;
                border-radius: 4px;
                cursor:pointer;
                img{
                    margin-left:10px;
                    width:12px;
                    position:relative;
                    top:-1px;
                }
            }
        }
        &-remark{
            margin: 5px 0;
            border-radius: 3px;
            border: 1px solid #ddd;
            height:100px;
            textarea {
                padding: 5px;
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                overflow: auto;
                resize: none;
            }
        }
    }
</style>
<style lang="less">
    .returnContent{
        .el-icon-plus{
            margin-right:10px;
        }
        .el-input__inner{
            border:none;
            background: #F0F2F5;
            height:auto;
            line-height:1;
        }
    }
</style>