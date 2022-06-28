<template>
    <div class="josmodel">
        <div class="main-config">
            登录模式:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="info.loginMode">
                <el-option
                        v-for="item in loginModeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select><br/><br/>
            系统展示模式:
            <el-select v-model="info.systemDisplayMode">
                <el-option
                        v-for="item in systemDisplayModeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select><br/><br/>
            <div v-show="info.loginMode===1">
                登录方式:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="info.loginType">
                    <el-option
                            v-for="item in loginList"
                            :key="item.loginTypeCode"
                            :label="item.loginTypeName"
                            :value="item.loginTypeCode">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="select-btn">
            <el-button type="primary" @click="sure(info)">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "josmodel",
        props:['loginList'],
        data() {
            return {
                loginModeList:[{id:1,name:'普通登录'},{id:2,name:'自动登录'}],
                systemDisplayModeList:[{id:1,name:'庭审主界面'},{id:2,name:'书记员画面'}],
                info:{
                    settingId:'',//配置id
                    clientType:1,//客户端类型
                    loginMode:1,//登录模式
                    systemDisplayMode:'',//系统展示模式
                    loginType:'',//登录方式
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
            //获取
            getLoginSettingConfig(){
                this.$showLoading('rgba')
                const _this=this;
                return _this.$http.post('/loginSettingConfig/getLoginSettingConfig', {
                    clientType:2 //jos
                }).then(data =>{
                    _this.$hideLoading('rgba')
                    if(data.code===200){
                        if(data.data){
                            for(let i in _this.info){
                                _this.info[i]=data.data[i];
                            }
                        }
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //确定关闭添加弹框
            sure(info){
                const _this=this;
                _this.$showToast('正在保存...')
                _this.$http.post('/loginSettingConfig/saveOrUpdateLoginSettingConfig',info).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../../css/common.less');
    .josmodel{
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