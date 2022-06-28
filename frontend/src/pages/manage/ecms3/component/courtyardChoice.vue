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
                                <el-tab-pane v-for="(tab,index) in tablist" :key="index" :label="tab.name"  :name="tab.id">
                                    <div v-if="index===0">
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
                tablist:[
                    {
                        id:'first',
                        name:'预约平台'
                    },
                    {
                        id:'second',
                        name:'本地配置'
                    },
                ],
                activeName:'first',
                data: [{
                    id: 1,
                    name: '一级 2',
                    child: [{
                        id: 3,
                        name: '二级 2-1',
                        child: [{
                            id: 4,
                            name: '三级 3-1-1'
                        }, {
                            id: 5,
                            name: '三级 3-1-2',
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'child',
                    label: 'name',
                    disabled:'child'
                },
                checklist:[]
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            handleCheckChange(data,node){
                console.log(data,node)
                if(node){
                    this.checklist.push(data.id)
                    if(this.checklist.length===2){
                        this.checklist=[];
                        this.checklist.push(data.id)
                        this.$refs.tree[0].setCheckedKeys([]);
                        this.$refs.tree[0].setCheckedKeys([data.id]);
                    }
                    // this.courtNames.push(data.courtName)
                    // //数组先去重
                    // this.checklist=[...new Set(this.checklist)]
                    // this.courtNames=[...new Set(this.courtNames)]
                }else{
                    // let index = this.checklist.indexOf(data.id);
                    // this.checklist.splice(index, 1);
                    this.checklist=[];
                    // this.courtNames.splice(index, 1);
                }
                console.log(this.checklist)
            },
            //打开弹框,修改逻辑处理
            show(row){
                this.secondshow=true;
                if(row){

                }else{

                }
            },

            //设置字幕确定保存编辑信息,新增或修改信号源配置信息
            sureAlert2(){
                let {formLabelAlign}=this;
                let _this=this;
                let array=[_this.setlawname,_this.setcase,_this.setdraw];//字幕内容设置
                    array=array.map(item=>{
                            if(item===true)item=1
                            else item=0
                            return item
                        })
                formLabelAlign.captionsSource=array.join('');
                _this.$http.post('/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo',formLabelAlign).then(data =>{
                    if(data.code===200){
                        _this.secondshow=false;
                        _this.$msgs('保存成功');
                        _this.$parent.$parent.$parent.httpinfo2();//更新列表
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtRoomConfig/saveOrUpdateCourtRoomSignalsInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
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
                min-height:4rem;
                max-height:6rem;
                overflow: auto;
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
                        /*background: #eceff0;*/
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
        }
    }
</style>
<style  scoped>
    .second-alert{
        z-index:300;
    }
</style>