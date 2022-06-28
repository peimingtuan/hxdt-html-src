<template>
    <div class="caseTree">
        <div class="all-check">
            <el-checkbox v-model="checked" :disabled="editBoolen?true:false">全选</el-checkbox>
        </div>
        <el-tree
                :data=resdata
                show-checkbox
                node-key="id"
                ref="tree"
                :filter-node-method="filterNode"
                :highlight-current="true"
                :default-expand-all="true"
                :expand-on-click-node="false"
                :check-strictly="false"
                :props="defaultProps"
                @node-click="handleNodeClick"
                >
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: "caseTree",
        props:{
            resdata:{
                type:Array
            } ,
            treeArr:{
                type:Array
            } ,
            editBoolen:{
                type:Boolean
            } ,
        },
        data() {
            return {
                checked:false,
                defaultProps: {
                    children: 'dossierChildrens',
                    label: 'catalogName',
                }
            }
        },
        created() {
        },
        mounted() {

        },
        watch:{
            checked(v){
                if(v)this.$refs.tree.setCheckedKeys(this.treeArr)
                else this.$refs.tree.setCheckedKeys([])
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.catalogName.indexOf(value) !== -1;
            },
            //选中当前节点
            handleNodeClick(data) {
                this.$emit('handleNodeClick',data)
            },
            clickDeal (currentObj, treeStatus) {
                // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
                let selected = treeStatus.checkedKeys.indexOf(currentObj.catalogId); // -1未选中
                // 选中
                if (selected !== -1) {
                    // 子节点只要被选中父节点就被选中
                    this.selectedParent(currentObj);
                    // 统一处理子节点为相同的勾选状态
                    this.uniteChildSame(currentObj, true)
                } else {
                    // 未选中 处理子节点全部未选中
                    if (currentObj.dossierChildrens !== undefined){
                        if (currentObj.dossierChildrens.length !== 0) {
                            this.uniteChildSame(currentObj, false)
                        }
                        //放开时为当子节点全为未选中时父节点也变为未选中状态   注释后就是父节点不和子节点强制绑定
                        //this.uniteParentSame(currentObj.id,treeStatus)//当子节点全为未选中时父节点也变为未选中状态
                    } else {
                        this.uniteParentSame(currentObj.catalogId,treeStatus)
                    }
                }
            },
            uniteParentSame(id,treeStatus){//当子节点全为未选中时父节点也变为未选中状态
                let node = this.$refs.tree.getNode(id);//获取当前节点的节点树
                if (node.parent !== null && node.parent !== undefined) {
                    let parentNode =   node.parent.data;//获取当前节点的父节点树
                    if (parentNode != undefined){//判断父节点是否存在
                        for (let i = 0; i < parentNode.dossierChildrens.length; i++) {
                            let checkedKeys = this.$refs.tree.getCheckedKeys();
                            let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
                            let selectNodes = checkedKeys.concat(hafCheckedKeys);//获取已选择树节点
                            let selected = selectNodes.indexOf(parentNode.dossierChildrens[i].catalogId); // -1当前节点的同级节点是否全部未选中
                            if (selected !== -1){
                                return;
                            }
                        }
                    }else {
                        return;
                    }
                    this.$refs.tree.setChecked(parentNode.catalogId, false);//修改节点为未选择
                    if(node.level>2){//判断是否是最上级节点
                        this.uniteParentSame(parentNode.catalogId,treeStatus)
                    }
                }else {
                    return;
                }
            },
            // 统一处理子节点为相同的勾选状态
            uniteChildSame (treeList, isSelected) {
                this.$refs.tree.setChecked(treeList.catalogId, isSelected);
                if (treeList.dossierChildrens !== undefined){
                    for (let i = 0; i < treeList.dossierChildrens.length; i++) {
                        this.uniteChildSame(treeList.dossierChildrens[i], isSelected)
                    }
                }
            },
            // 统一处理父节点为选中
            selectedParent (currentObj) {
                let currentNode = this.$refs.tree.getNode(currentObj);
                if (currentNode.parent.key !== undefined) {
                    this.$refs.tree.setChecked(currentNode.parent, true);
                    this.selectedParent(currentNode.parent)
                }
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .caseTree{
        .all-check{
            padding-left:24px;
            margin-bottom:10px;
        }
    }
</style>
<style lang="less">
    .caseTree {
        .el-tree{
            width:100%;
            overflow: auto;
            .el-tree-node>.el-tree-node__children{
                overflow: visible;
            }
            .el-tree-node__content{
                margin-bottom:5px;
            }
            .el-tree__empty-block{
                span{
                    color: #2F8DED;
                }
            }
        }
    }
</style>