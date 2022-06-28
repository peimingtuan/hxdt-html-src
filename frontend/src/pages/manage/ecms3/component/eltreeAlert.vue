<template>
    <div class="eltreeAlert">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="showAlert">
                <div class="menu">
                    <img class="alert-close" @click="showAlert=false" src="../images/alert-close.png" />
                    <div class="title">
                        选择案由
                    </div>
                    <!--树形菜单-->
                    <el-tree
                            :props="defaultProps"
                            :load="loadNode"
                            ref="tree"
                            lazy
                            node-key="causeCode"
                            @node-click="handleNodeClick">
                    </el-tree>
                    <!--<div class="menu-btn">-->
                        <!--<el-button @click="sureChoice">确定</el-button>-->
                    <!--</div>-->
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "eltreeAlert",
        data() {
            return {
                showAlert:false,
                //案由树配置
                defaultProps: {
                    children: 'parent',
                    label: 'causeName',
                    isLeaf: 'leaf' //
                },
                etid:''
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //展示弹框
            show(){
                this.showAlert=true;
            },
            //选中当前节点
            handleNodeClick(data) {
                this.$parent.causeId=data.causeCode;
                this.$parent.causeStr=data.causeName;
                this.showAlert=false;
            },
            loadNode(node, resolve) {
                let that=this;
                if (node.level === 0) {
                    let result=that.$http.syncRequest('/baseInfo/getCauseStr',{causeCode:0});

                    if(result && result.code===200){
                        let array=result.data;
                            array.map(item=>{
                                if(item.leaf===true)item.parent=[]
                                return item
                            })
                        return resolve(array)
                    }else{
                        that.$msge('服务器异常，请稍后重试');
                        return
                    }
                }
                //if (node.level > 1) return resolve([]);
                that.$http.post('/baseInfo/getCauseStr', {
                    causeCode:node.data.causeCode,//案由id,
                }).then(data => {
                    if (data.code === 200) {
                        if(data.data.length!==0){
                            for(let i=0;i<data.data.length;i++){
                                if(data.data[i].leaf)data.data[i].parent=[]
                            }
                        }
                         resolve(data.data)
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$msge('服务器异常，请稍后重试');
                })
            },
            //确定
            // sureChoice(){
            //     this.showAlert=false;
            //     this.$emit('sureChoice');
            // },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .eltreeAlert{
        .menu {
            width:8rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1.5rem;
            min-height:5rem;
            margin-left:-3rem;
            border-radius:2px;
            cursor: pointer;
            /*关闭弹框*/
            img.alert-close{
                width:.18rem;
                position:absolute;
                top: .25rem;
                right: .35rem;
                cursor: pointer;
                z-index:102;
            }
            .title{
                position:absolute;
                left:50%;
                top:0;
                width:2rem;
                margin-left:-1rem;
                line-height:.6rem;
                text-align: center;
            }
            .el-tree{
                margin:.6rem 0;
                max-height:6rem;
                overflow: auto;
                background: #eceff0;
                .el-tree-node__content {
                    height: .58rem;
                    .el-tree-node__label {
                        width: 4.7rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .f22();
                    }
                    /*icon*/
                    .el-icon-caret-right:before {
                        font-size: .2rem;
                    }

                    .el-checkbox__inner:before {
                        top: .07rem;
                        height: .02rem;
                    }
                }
                /*span*/
                .el-tree-node__label {
                    .f20();
                    color: #303133;
                }
                /*checkbox*/
                .el-checkbox__inner {
                    width: .18rem;
                    height: .18rem;
                }
                /*选中*/
                .el-checkbox__inner:after {
                    top: .02rem;
                    left: .06rem;
                    width: .04rem;
                    height: .08rem;
                }
            }
            &-btn{
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