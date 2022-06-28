<template>
    <div class="groupaddAlert">
        <el-form :label-position="labelPosition"
                 :model="etgsGroup"
                 ref="elForm"
        >
            <el-form-item label="分组名称" required>
                <el-input v-model.trim="etgsGroup.etgsGroupName"></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="desc">
                <el-input type="textarea" v-model="etgsGroup.description" placeholder="......"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "groupaddAlert",
        data() {
            return {
                selectList:[{id:1,name:'图片'},{id:2,name:'文字'},{id:3,name:'视频'}],
                labelPosition: 'left',
                etgsGroup: {
                    etgsGroupId:'',
                    etgsGroupName: '',
                    description:'',
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            show(row){
                if(row){
                    for(let i in row){
                        this.etgsGroup[i]=row[i];
                    }
                }else{
                    this.etgsGroup={
                        etgsGroupId:'',
                        etgsGroupName: '',
                        description:'',
                    }
                }
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .groupaddAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:3rem;
        padding:.2rem;
        .el-form{
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.5rem!important;
            }
            .el-form-item__content{
                margin-left:1.5rem!important;
            }
            /*input框*/
            .el-input,.el-select{
                width:4rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
            .el-textarea{
                width:6rem;
            }
        }
    }
</style>
<style lang="less">

</style>