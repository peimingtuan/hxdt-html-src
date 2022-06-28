<template>
    <keep-alive>
        <div class="eltreeAlert">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-show="showAlert">
                    <div class="menu">
                        <img class="alert-close" @click="showAlert=false" src="../images/alert-close.png" />
                        <div class="title">
                            选择法院
                        </div>
                        <div class="box-div">
                            <el-checkbox v-model="isStrictly">是否包含下辖法院</el-checkbox>
                        </div>
                        <!--树形菜单-->
                        <el-tree
                                :props="defaultProps"
                                :load="loadNode"
                                :check-strictly="isshow"
                                ref="tree"
                                lazy
                                show-checkbox
                                node-key="courtCode"
                                @check-change="handleCheckChange"
                                @node-click="handleNodeClick">
                        </el-tree>

                        <alertBtn ref="alertBtn" @qure="sureChoice" @cancel="showAlert=false" />
                    </div>
                </div>
            </transition>
        </div>
    </keep-alive>
</template>

<script>
    import alertBtn from "./alertBtn"
    export default {
        name: "eltreeAlert",
        components: {
            alertBtn
        },
        data() {
            return {
                showAlert:false,
                //树配置
                defaultProps: {
                    children:'parent',
                    label:'courtName',
                    isLeaf:'leafNode'
                },
                checklist:[],
                courtNames:[],
                isStrictly:false,
                isshow:true,
                arrSelect:[0],
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        watch:{
            isStrictly(v){
                if(v)return this.isshow=false;
                else return this.isshow=true;
            }
        },
        methods: {
            show(courtCode,courtName){
                this.showAlert=true;
                this.checklist=[];
                this.courtNames=[];
                if(courtCode.length>0){
                    let arrName=courtName.split(',')
                    for(let i=0;i<courtCode.length;i++){
                        this.checklist.push(Number(courtCode[i]))
                        this.courtNames.push(arrName[i])
                    }
                }
                if(this.checklist.length>0&&this.checklist.includes(0)){
                    this.$refs.tree.setCheckedKeys([0]);
                }
            },
            handleCheckChange(data,node,index){
                if(node){
                    this.checklist.push(data.courtCode)
                    this.courtNames.push(data.courtName)
                    //数组先去重
                    this.checklist=[...new Set(this.checklist)]
                    this.courtNames=[...new Set(this.courtNames)]
                }else{
                    let index = this.checklist.indexOf(data.courtCode);
                    this.checklist.splice(index, 1);
                    this.courtNames.splice(index, 1);
                }
            },
            //选中当前节点
            handleNodeClick(data) {

            },
            loadNode(node, resolve) {
                let that=this;
                if (node.level === 0) {
                    that.$http.post('/initConfig/getCourtInfoByCode', {courtCode:'-1'}).then(data => {
                        if (data.code === 200) {
                            let array=data.data;
                             resolve(array)
                        } else {
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }else{
                    let arr=[];
                    if(that.checklist.includes(node.data.courtCode)){
                        arr.push(node.data.courtCode)
                    }
                    that.$http.post('/initConfig/getCourtInfoByCode', {
                        courtCode:node.data.courtCode,
                    }).then(data => {
                        if (data.code === 200) {
                            if(data.data.length!==0){
                                for(let i=0;i<data.data.length;i++){
                                    this.arrSelect.push(data.data[i].courtCode);
                                }
                            }
                            resolve(data.data)
                            that.$nextTick(()=>{
                                let arr1=that.$refs.tree.getCheckedNodes();
                                arr1.map(item=>{
                                    if(!that.checklist.includes(item.courtCode)){
                                        that.checklist.push(item.courtCode)
                                        that.courtNames.push(item.courtName)
                                    }
                                })
                                that.checklist.map(item=>{
                                    if(this.arrSelect.includes(item)){
                                        arr.push(item)
                                    }
                                })
                                if(arr.length>0){
                                    that.$refs.tree.setCheckedKeys(arr);
                                }
                            })
                        } else {
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }
            },
            //确定
            sureChoice(){
                if(this.checklist.length===0){
                    this.$msgw('请选择法院!')
                    return
                }
                this.showAlert=false;
                this.$parent.courtCode=this.checklist
                this.$parent.courtName=this.courtNames.toString()
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .eltreeAlert{
        .menu {
            width:8rem;
            padding:0 .5rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-4rem;
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
            .box-div{
                position:absolute;
                left:.5rem;
                top:.6rem;
                width:2rem;
                height:.4rem;
                .el-checkbox{
                    span{
                        .f18()
                    }
                }
                .el-checkbox__inner {
                    width: .18rem;
                    height: .18rem;
                    &:after {
                        top: .02rem;
                        left: .06rem;
                        width: .04rem;
                        height: .08rem;
                    }
                }
            }
            .el-tree{
                margin-top:1rem;
                min-height:4rem;
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
        }
    }
</style>