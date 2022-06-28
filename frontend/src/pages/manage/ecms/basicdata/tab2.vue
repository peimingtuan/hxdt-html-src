<template>
    <div class="tab2">
        <div class="flex-left">
            <el-tree
                    :props="defaultProps"
                    ref="tree"
                    :data="caseList"
                    :load="loadNode"
                    lazy
                    :current-node-key="current"
                    node-key="caseTypeCode"
                    highlight-current="true"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
            ></el-tree>
        </div>
        <div class="flex-right">
            <div class="top-btn">
                <div class="add" @click="add()">
                    <img src="../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="table-style">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        @cell-click="cellClick"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                    <el-table-column type="index" width="100px" label="序号">
                        <!--<template slot-scope="scope">{{scope.row.$index}}</template>-->
                    </el-table-column>
                    <el-table-column prop="caseTypeName" label="案件类型名称" width="200px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="caseTypeCode" label="案件类型代码" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="caseTypePronoun" label="案件类型代字" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="案件类型来源" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div>{{scope.row.caseTypeSource==1?'法标':'自定义'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="isedit">
                                <span @click="edit(scope.$index, scope.row)">修改</span>
                                <span @click="delinfo(scope.$index, scope.row)">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--添加弹框-->
        <addbasic-alert
                :alertshow="ismain"
                ref="addbasicAlert"
                @selectshow="ismain=false"
                @qure="addlawsure"
                @cancel="ismain=false"
        />
    </div>
</template>

<script>
    import addbasicAlert from "./tab2/addbasicAlert2" //添加弹框
    export default {
        name: "tab2",
        components:{
            addbasicAlert,
        },
        data() {
            return {
                ismain:false,
                tableData:[],
                defaultProps: {
                    children: 'childrens',
                    label: 'caseTypeName',
                    isLeaf:'leaf'
                },
                current:'',
                infoCaseCode:null,
                caseList:[],
                currentData:null
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //树
            loadNode(node, resolve) {
                let that=this;
                if (node.level === 0) {
                    // that.$http.post('/caseTypeConfig/getCaseTypeListByCaseTypeCode',{
                    //     caseType:{
                    //         caseTypeCode:-1
                    //     }
                    // }).then((data)=>{
                    //     if(data.code===200){
                    //         that.tableData=data.data;
                    //         //if(data.data.length>0)that.current=data.data[0].caseTypeCode
                    //         let array=data.data;
                    //         resolve(array)
                    //     }else{
                    //         that.$msgw(data.message);
                    //     }
                    // }).catch(err=>{
                    //     //that.$msge('服务器异常，请稍后重试');
                    // })
                }else{
                    that.$http.post('/caseTypeConfig/getCaseTypeListByCaseTypeCode', {
                        caseType:{
                            caseTypeCode:node.data.caseTypeCode,//案由代码
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            resolve(data.data)
                        } else {
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }
            },
            handleNodeClick(node){
                this.infoCaseCode=node;
                this.getCaseTypeListByCaseTypeCode(node.caseTypeCode)

            },
            //添加弹框
            add(){
                if(this.infoCaseCode){
                    console.log(this.infoCaseCode)
                    this.ismain=true;
                    this.$refs.addbasicAlert.show(this.infoCaseCode,1)
                }else{
                    this.$msgw("请先选择案由!")
                }
            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                if(!formLabelAlign.caseTypeName){
                    this.$msgw("请输入案件类型名称!")
                    return
                }
                if(!formLabelAlign.caseTypeCode){
                    this.$msgw("请输入案件类型代码!")
                    return
                }
                let r=/^\+?[0-9][0-9]*$/;
                if(!r.test(formLabelAlign.caseTypeCode)){
                    this.$msgw("案件类型代码必须为非负整数!")
                    formLabelAlign.caseTypeCode='';
                    return
                }
                if(!formLabelAlign.caseTypePronoun){
                    this.$msgw("请输入案件类型代字!")
                    return
                }
                const that=this;
                that.$showToast('正在保存...')
                that.$http.post('/caseTypeConfig/saveOrUpdateCaseTypeConfig', {
                    caseType:formLabelAlign
                }).then(data => {
                    that.$hideToast()
                    if (data.code === 200) {
                        that.ismain=false;
                        that.$msgs('保存成功!');
                        if(formLabelAlign.caseTypeId){//修改
                            //that.currentData=formLabelAlign;
                            if(formLabelAlign.caseTypeParentCode!='-1'){
                                that.$refs.tree.remove(that.currentData)//要删除节点的data
                            }
                        }
                        that.$refs.tree.append(formLabelAlign,formLabelAlign.caseTypeParentCode)
                        that.getCaseTypeListByCaseTypeCode(formLabelAlign.caseTypeParentCode)
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideToast()
                })
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                this.currentData=row;
                this.$refs.addbasicAlert.show(row,2)
            },
            getCaseTypeListByCaseTypeCode(caseTypeCode){
                const that=this;
                that.$showLoading('rgba')
                that.$http.post('/caseTypeConfig/getCaseTypeListByCaseTypeCode', {
                    caseType:{
                        caseTypeCode,//案由代码
                    }
                }).then(data => {
                    that.$hideLoading('rgba')
                    if (data.code === 200) {
                        that.tableData=data.data;
                        if(caseTypeCode=='-1'){
                            that.caseList=data.data
                        }
                    } else {
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    that.$hideLoading('rgba')
                })
            },
            //删除当前行内容
            delinfo(index,row){
                const that=this;
                that.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.post('/caseTypeConfig/deleteCaseTypeConfig', {
                        caseType:{
                            caseTypeId:row.caseTypeId,//案件类型id
                        }
                    }).then(data => {
                        if (data.code === 200) {
                            that.tableData.splice(index,1)//物理删除
                            that.$refs.tree.remove(row)//要删除节点的data
                            that.$msgs('删除成功!');
                        } else {
                            that.$msgw(data.message);
                        }
                    }).catch(err => {
                        that.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    .tab2{
        height:8rem;
        overflow: auto;
        .mr();
        .fl();
        .flex-left {
            width: 3.6rem;
            overflow: auto;
            margin-right: 0.1rem;
            background: #eceff0;
        }
        .flex-right {
            width: 12.5rem;
            .top-btn{
                .fl();
                cursor:pointer;
                margin-bottom:.1rem;
                &>div{
                    margin-right:.1rem;
                    img{
                        width:.8rem;
                    }
                }
            }
            @import url('../css/uppage.less');
        }
    }
</style>
<style lang="less">
    @import url('../css/common.less');
    .tab2{
        .el-tree {
            width: 3.6rem;
            overflow: auto;
            background: #eceff0;
            .el-tree-node__content {
                height: 0.5rem;
            }
            .el-tree-node__label {
                width: 3.2rem;
                overflow: auto;
                .f18();
            }
        }
    }
</style>