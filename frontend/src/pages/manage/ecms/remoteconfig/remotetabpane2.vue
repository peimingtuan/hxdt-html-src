<template>
    <div class="remotetabpane2">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../images/yuanchengtingshen/add.png"/>
                </div>
                <div class="edit" @click="edit()">
                    <img src="../images/yuanchengtingshen/edit.png"/>
                </div>
                <div class="del" @click="del()">
                    <img src="../images/yuanchengtingshen/del.png"/>
                </div>
            </div>
        </div>
        <div class="cont">
            <el-tree
                    :data="dataArray"
                    ref="tree"
                    :props="defaultProps"
                    node-key="trialUnitId"
                    default-expand-all
                    highlight-current="true"
                    @node-click="handleNodeClick"
                   >
            </el-tree>
        </div>
        <!--添加、修改子节点弹框-->
        <addremoteAlert2 ref="addremoteAlert2" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
        <!--添加、修改子节点弹框-->
        <remotemwaringalert ref="remotemwaringalert" :iswaring="iswaring" :text="text" @wareshow="iswaring=false" @qure="suredel" @cancel="iswaring=false"/>
    </div>
</template>

<script>
    import addremoteAlert2 from "./addremoteAlert2" //添加弹框
    import remotemwaringalert from "./remotemwaringalert" //删除警告弹框
    export default {
        name: "remotetabpane2",
        components: {
            addremoteAlert2,
            remotemwaringalert
        },
        data() {
            return {
                ismain:false,
                iswaring:false,
                text:'该部门下还有子单位，确认删除？',
                dataArray:[],
                //树配置
                defaultProps: {
                    children: 'childrenNodes',
                    label: 'trialUnitName',
                },
                trialUnitId:'',//当前节点id
                trialUnitName:'',//当前节点名称
                parentTrialUnitId:'',//当前父节点id
                childrenNodes:[],
                option:null,// false为修改，
            }
        },
        created() {
            // this.getRemoteTrialUnits()
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //树
            getRemoteTrialUnits(){
                this.$http.post('/remoteTrial/getRemoteTrialUnits', {

                }).then(data =>{
                    if(data.code===200){
                        data.data.parentTrialUnitId = '000';
                        this.dataArray=[data.data];
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'remoteTrial/getRemoteTrialUnits')
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            handleNodeClick(data,node,group){
                console.log(data,node,group)
                this.trialUnitId=data.trialUnitId;
                this.trialUnitName=data.trialUnitName;
                this.parentTrialUnitId=data.parentTrialUnitId;
                this.childrenNodes=data.childrenNodes;
            },
            append(data,parentdata) {
                console.log(data,parentdata)
                const newChild = {parentTrialUnitId:'',trialUnitId:'', trialUnitName: '', childrenNodes: [] };
                if (data.childrenNodes.length==0) {
                    this.$set(data, 'childrenNodes', []);
                }
                data.childrenNodes.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            //添加弹框
            add(){
                this.option = false;
                if(!this.parentTrialUnitId){
                    this.$msgw('请先选择节点!')
                    return
                }
                this.$refs.addremoteAlert2.text = '单位添加';
                this.$refs.addremoteAlert2.text2 = '请添加单位名称';
                this.$refs.addremoteAlert2.formDatas.trialUnitName = '';
                this.ismain=true;
            },
            edit(){
                this.option = true;
                if(!this.trialUnitId&&!this.parentTrialUnitId){
                    this.$msgw('请先选择节点!')
                    return
                }
                this.$refs.addremoteAlert2.formDatas.trialUnitName = this.trialUnitName;
                this.$refs.addremoteAlert2.text = '单位修改';
                this.$refs.addremoteAlert2.text2 = '请修改单位名称';
                this.ismain=true;
            },
            del(){
                if(!this.trialUnitId&&!this.parentTrialUnitId){
                    this.$msgw('请先选择节点!')
                    return
                }
                if(this.parentTrialUnitId == '000'){
                    this.$msgw('该节点不能删除!')
                    return
                }
                this.suredel();
                // if(this.childrenNodes.length>0){
                //     this.iswaring=true;
                // }else{
                //     this.suredel();
                // }
            },
            addlawsure(trialUnitName){
                const _this=this;
                if(!trialUnitName){
                    _this.$msgw('单位名称不能为空!');
                    return
                }
                let url='/remoteTrial/addRemoteTrialUnit';
                let parentTrialUnitId = _this.trialUnitId;
                let trialUnitId = '';

                if(_this.option){
                    parentTrialUnitId = _this.parentTrialUnitId;
                    trialUnitId = _this.trialUnitId;
                    url='/remoteTrial/updateRemoteTrialUnit'//更新
                }
                _this.$http.post(url, {
                    parentTrialUnitId:parentTrialUnitId,
                    trialUnitId:trialUnitId,
                    trialUnitName:trialUnitName
                }).then(data =>{
                    if(data.code===200){
                        _this.ismain=false;
                        _this.$msgs('保存成功!');
                        _this.getRemoteTrialUnits()
                        _this.trialUnitId='';
                        _this.trialUnitName='';
                        _this.parentTrialUnitId='';
                        _this.childrenNodes=[];
                        
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,url)
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //确认删除
            suredel(){
                const _this=this;
                let url='/remoteTrial/deleteRemoteTrialUnit'
                _this.$http.post(url, {
                    trialUnitId:_this.trialUnitId,
                }).then(data =>{
                    if(data.code===200){
                        //_this.iswaring=false;
                        _this.$msgs('删除成功!');
                        _this.getRemoteTrialUnits()
                        _this.trialUnitId='';
                        _this.trialUnitName='';
                        _this.parentTrialUnitId='';
                        _this.childrenNodes=[];
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'remoteTrial/deleteRemoteTrialUnit')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .remotetabpane2{
        .mr();
        .top {
            margin-bottom: .2rem;
            .le {
                .fl();
                cursor: pointer;

                & > div {
                    margin-right: .2rem;

                    img {
                        width: .8rem;
                    }
                }

                & > div.add {
                    img {
                        width: 1rem;
                        height: .36rem;
                    }
                }
            }
        }
        .cont{
            .el-tree {
                background: #eceff0;
                .el-tree-node__content {
                    height:.5rem
                }
                .el-tree-node__label{
                    .f18();
                }
            }
        }
    }
</style>
<style scoped>

</style>