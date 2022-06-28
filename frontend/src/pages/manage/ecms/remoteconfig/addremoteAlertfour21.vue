<template>
    <div class="addremoteAlertfour21">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <div class="teb_title" v-for="(item,index) in teblist" :class="tebIndex == index?'tebActive':''" @click="tebClick(index)">{{item.platformTypeName}}</div>
                        <div class="bar"></div>
                        <div class="treeBox">
                            <el-tree
                                :data="treeData"
                                ref="tree"
                                :props="defaultProps"
                                node-key="trialRoomId"
                                default-expand-all
                                highlight-current="true"
                                @node-click="nodeClick">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span>{{node.label}}</span>
                                    <span v-if="data.type == 1" class="checkBox"><el-radio v-model="trialRoomId" :label="data.trialRoomId"></el-radio></span>
                                </span>
                            </el-tree>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    export default {
        name: "addremoteAlertfour21",
        props:{
            alertshow:Boolean
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'庭审室选择',
                text2:'请填写详细信息',
                teblist:[
                    {
                        platformTypeName:''
                    },
                ],
                tebIndex:0,
                treeData:[],
                //树配置
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
                        this.teblist[0].platformTypeName = data.data.platformTypeName;
                        this.teblist[0].platformTypeCode = data.data.platformTypeCode;
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
                    return;
                }
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                this.$emit('qure',{trialRoomId:this.trialRoomId,trialRoomName:this.trialRoomName},this.dataIndex);
                this.cancel();
            },
            cancel() {
                this.$emit('cancel');
            },
            tebClick(index){
                this.tebIndex = index;
                
            },
            
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addremoteAlertfour21{
        /*弹框*/
        .main{
            width:10rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-5rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                height:4rem;
                /*max-height:6rem;*/
                overflow: auto;
                margin-top:.1rem;
                padding:.2rem;
                .teb_title{
                    float: left;
                    padding: 0.1rem 0.2rem;
                    font-size: 0.2rem;
                    color: #333;
                    border: 1px solid #dcdfe6;
                    cursor: pointer;
                    border-right-color: #2F8DED;
                }
                .bar{
                    float: left;
                    width: 100%;
                    height: 1px;
                    background-color: #dcdfe6;
                }
                
                .teb_title:nth-child(2){
                    border-left: none;
                    border-right-color: #dcdfe6;
                }
                .tebActive{
                    color: #fff;
                    border: 1px solid #2F8DED;
                    background-color: #3F9EFF;
                }
                .tebActive:nth-child(2){
                    border-left: none;
                    border-right-color: #3F9EFF;
                }
                .treeBox{
                    float: left;
                    height: 3.1rem;
                    overflow: auto;
                    width: 100%;
                        .el-tree {
                        background: #eceff0;
                        .el-tree-node__content {
                            height:.5rem
                        }
                        .el-tree-node__label{
                            .f18();
                        }
                        .checkBox{
                            width: 14px;
                            height: 14px;
                            display: block;
                            float: left;
                            margin-top: -1px;
                            margin-right: 5px;
                            .el-radio__label{
                                display: none;
                            }
                        }
                    }
                }
                
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
</style>