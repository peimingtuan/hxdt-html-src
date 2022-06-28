<template>
    <div class="courtyardChoice">
        <!--二次弹框-->
        <transition name="slide-fade">
            <div class="second-alert" v-if="secondshow">
                <div class="second-main">
                    <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
                    <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content-info">
                        <div class="content-info-div1">
                            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.platformTypeName"  :name="tab.platformTypeCode">
                                    <div v-if="index===0">
                                        <el-tree
                                                :props="defaultProps"
                                                :data="treeData"
                                                ref="tree"
                                                node-key="id"
                                                default-expand-all
                                                highlight-current="true"
                                                @node-click="nodeClick"
                                                >
                                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                                <span>{{node.label}}</span>
                                                <span v-if="data.type == 1" class="checkBox">
                                                    <el-radio v-model="trialRoomId"
                                                              :label="data.trialRoomId">
                                                    </el-radio>
                                                </span>
                                            </span>
                                        </el-tree>
                                    </div>
                                    <div v-else-if="index===1">
                                        <el-tree
                                                :props="defaultProps"
                                                :data="data"
                                                ref="tree"
                                                show-checkbox
                                                node-key="id"
                                                check-strictly="true"
                                                @check-change="handleCheckChange"
                                        >
                                        </el-tree>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <alertBtn @cancel="secondshow=false" @qure="sureAlert2"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import AlertleftTile from "./AlertleftTile"//二次弹框title
    import alertBtn from "./alertBtn"//二次弹框底部按钮
    export default {
        name: "courtyardChoice",
        components: {
            AlertleftTile,
            alertBtn
        },
        data() {
            return {
                text:'庭审室选择',
                text2:'详细数据显示',
                secondshow:false,//二次弹框
                tablist:[{platformTypeName:''}],
                activeName:'',
                treeData:[],
                defaultProps: {
                    children: 'childrens',
                    label: (data,node) => {
                        if(data.trialRoomId){
                            return data.trialRoomName
                        }else{
                            return data.trialUnitName
                        }
                    }
                },
                dataIndex:0,
                trialRoomId:'',
                trialRoomName:'',
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            // 获取树数据
            getTreeData(){
                this.$http.post('/remoteTrial/getRemoteTrialTreeNodes',{

                }).then(data =>{
                    if(data.code===200){
                        this.tablist[0].platformTypeName = data.data.platformTypeName;
                        this.tablist[0].platformTypeCode = data.data.platformTypeCode;
                        this.activeName=data.data.platformTypeCode;
                        this.treeData = [data.data.courtroomStructure];
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            nodeClick(data){
                if(data.trialRoomId){
                    this.trialRoomName = data.trialRoomName;
                    this.trialRoomId=data.trialRoomId;
                }
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.secondshow=true;
                if(row){

                }else{

                }
            },
            sureAlert2() {
                if(!this.trialRoomId){
                    this.$msgw("请先选择庭审室")
                    return
                }
                let isB=false;
                this.$parent.remoteTrialInfo.trialRooms.map(item=>{
                    if(this.trialRoomId===item.trialRoomId){
                        isB=true;
                    }
                })
                if(isB){
                    this.$msgw("该庭审室已被选择")
                    return
                }
                this.$emit('sure',{trialRoomId:this.trialRoomId,trialRoomName:this.trialRoomName},this.dataIndex);
                this.secondshow=false;
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .courtyardChoice{
        /*二次弹框*/
        .second-main{
            position:absolute;
            left:50%;
            margin-left:-6rem;
            top:1.2rem;
            width:12rem;
            background: #fff;
            border-radius: 2px;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            @import url('../css/alertimg.less');
            .content-info {
                background: #ECEFF0;
                &-div1 {
                    padding:.2rem;
                    .el-tabs__item{
                        /*width:2.68rem;*/
                        text-align: center ;
                        height:.4rem;
                        line-height:.4rem;
                        .f18();
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
                    .el-tree{
                        min-height:4rem;
                        max-height:5rem;
                        overflow: auto;
                        background: #eceff0;
                        .el-tree-node__content {
                            height: .58rem;
                        }
                        /*span*/
                        .el-tree-node__label {
                            .f20();
                            color: #303133;
                        }
                        .checkBox{
                            width: 14px;
                            height: 14px;
                            display: block;
                            float: left;
                            margin-top: -1px;
                            margin-right:5px;
                            .el-radio__label{
                                display: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<style  scoped>
    .second-alert{
        z-index:300;
    }
</style>