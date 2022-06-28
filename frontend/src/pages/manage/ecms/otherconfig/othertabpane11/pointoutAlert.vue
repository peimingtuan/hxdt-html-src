<template>
    <div class="pointoutAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="违规项">
                <el-input v-model.trim="formLabelAlign.violationName" disabled></el-input>
            </el-form-item>
            <el-form-item label="是否启用" required>
                <el-select v-model="formLabelAlign.enabled" placeholder="请选择">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提示语" required>
                <el-input type="textarea" v-model.trim="formLabelAlign.tip"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "pointoutAlert",
        data() {
            return {
                labelPosition: 'left',
                formLabelAlign: {
                    violationName: '',
                    tip:'',
                    enabled:false,
                },
            }
        },
        computed:{
          selectList(){
              return this.$store.state.selectlist
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
                        this.formLabelAlign[i]=row[i]
                    }
                }
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .pointoutAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:3rem;
        padding:.2rem;
        .el-form {
            /*label*/

            .el-form-item__label {
                .f18();
                width: 1.5rem !important;
            }

            .el-form-item__content {
                margin-left: 1.5rem !important;
            }

            /*input框*/

            .el-input, .el-select {
                width: 4rem;

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