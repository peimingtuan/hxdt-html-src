<template>
    <div class="basicModule">
        <div class="main-config">
            客户端提示窗口显示时长:
            <el-input v-model.trim="violationShowTime"></el-input>秒<br/><br/>
            上报审务督察配置是否开启:
            <el-select v-model="enabled" placeholder="请选择">
                <el-option
                        v-for="item in selectList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
        </div>
        <div class="select-btn">
            <el-button type="primary" @click="saveBtn()">确定</el-button>
        </div>
    </div>
</template>

<script>
    import Tool from "../../js/tools"
    export default {
        name: "basicModule",
        data() {
            return {
                violationShowTime:'',
                enabled:false,
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
            getAuditInspectorConfig(){
                const _this=this;
                _this.$showLoading('rgba')
                _this.$http
                    .post("/auditInspectorConfig/getAuditInspectorConfig", {})
                    .then(data => {
                        _this.$hideLoading('rgba')
                        if (data.code === 200) {
                            if(data.data){
                                _this.violationShowTime=data.data.violationShowTime
                                _this.enabled=data.data.enabled
                            }
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading('rgba')
                    });
            },
            saveBtn(){
                const _this=this;
                if(!Tool.ispositiveInteger(_this.violationShowTime)){
                    _this.$msgw("显示时长必须为整数")
                    return
                }
                _this.$showToast("正在保存...")
                _this.$http
                    .post("/auditInspectorConfig/saveAuditInspectorConfig", {violationShowTime:_this.violationShowTime,enabled:_this.enabled})
                    .then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            _this.$msgs("保存成功");
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideToast()
                        _this.$msge("服务器异常，请稍后重试");
                    });
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
    .basicModule{
        .main-config{
            margin:1rem auto;
            width:12rem;
            text-align: center;
            .el-input {
                width:2.8rem;
                margin:0 .1rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
        }
        /*底部保存*/
        .select-btn{
            margin-top:.5rem;
            text-align: center;
            .el-button{
                width:1.48rem;
                height:.48rem;
                padding: 0;
                span{
                    .f20();
                    color:#fff;
                }
            }
        }
    }
</style>