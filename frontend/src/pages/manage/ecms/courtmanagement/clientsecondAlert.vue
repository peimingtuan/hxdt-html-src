<template>
    <div class="clientsecondAlert">
        <transition name="slide-fade">
            <div class="second-alert" v-if="showAlert">
                <div class="content">
                    <div class="content-div1">
                        <div class="content-div1-top">
                            <div>版本</div>
                            <div>时间</div>
                        </div>
                        <div class="content-div1-cnt">
                            <div v-for="item in historylist">
                                <div>{{item.version}}</div>
                                <div>{{item.date}} {{item.time}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="content-div2">
                        <el-button @click="showAlert=false">确定</el-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "clientsecondAlert",
        data() {
            return {
                showAlert:false,
                historylist:[],
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            getinfo(clientId,courtRoomId){
                let _this=this;
                _this.showAlert=true;
                _this.$showToast('加载中...')
                _this.$http.post('/courtRoomManage/getClientUpgradeHistory', {
                    courtRoomId,//法庭id
                    clientId,//客户端id
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.historylist=data.data.datas;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/courtRoomManage/getClientUpgradeHistory')
                    _this.$msge('服务器异常，请稍后重试');
                })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .clientsecondAlert{
        .content{
            position:absolute;
            left:50%;
            margin-left:-3rem;
            top:2rem;
            width:6rem;
            background: #fff;
            border-radius: 2px;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            &-div1{
                padding:.2rem;
                flex-wrap: wrap;
                &-top{
                    .f-s-b();
                    &>div{
                        width:2.5rem;
                        line-height:.5rem;
                        text-align: center ;
                    }
                }
                &-cnt{
                    background: #eceff0;
                    height:4rem;
                    overflow: auto;
                    &>div{
                        .f-s-b();
                        &>div{
                            width:2.5rem;
                            line-height:.5rem;
                            text-align: center ;
                        }
                    }
                }
            }
            &-div2{
                margin:.2rem;
                text-align: center;
                /*button*/
                .el-button {
                    width: 1.2rem;
                    line-height: .4rem;
                    padding: 0;
                    background:#409eff;
                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
        }
    }
</style>