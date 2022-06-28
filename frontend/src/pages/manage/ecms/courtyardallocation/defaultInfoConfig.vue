<template>
    <div class="defaultInfoConfig">
        <div class="btn-add">
            <el-button type="primary" icon="el-icon-plus" @click="add()">添加</el-button>
            复制
            <el-select v-model="courtRoomId" placeholder="请选择">
                <el-option v-for="item in courtRoomList"
                           :key="item.courtRoomId"
                           :label="item.courtRoomName"
                           :value="item.courtRoomId">
                </el-option>
            </el-select>
            配置
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    height="400"
                    style="width: 100%"
            >
                <el-table-column  label="按钮名称">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.buttonName" placeholder="请输入"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  label="命令">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.buttonComand" placeholder="请输入"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  label="是否展示">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.bShow" placeholder="请选择">
                            <el-option v-for="item in selectList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "defaultInfoConfig",
        data() {
            return {
                selectList:[{id:true,name:'是'},{id:false,name:'否'}],
                tableData:[],
                courtRoomList:[],
                courtRoomId:''
            }
        },
        created() {
        },
        mounted() {
        },
        watch:{
            courtRoomId(v){
                if(v)this.getControlInfosList(v)
            }
        },
        methods: {
            async getControlInfosList(v){
                let res=await this.$http.post('/courtRoomConfig/getControlInfosList',{courtRoomId:v},true,'加载中...')
                if(res)this.tableData=res.data;
            },
            getAllCourtRoom(){
                this.$http.post('/baseInfo/getAllCourtRoomInfo',{},true,'加载中...').then(res=>{
                    this.courtRoomList=res.data;
                })
            },
            add(){
                this.tableData.push({
                    buttonName: "",
                    buttonComand: "",
                    bShow:'',
                })
            },
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.tableData.splice(index,1)
                    _this.$msgs('删除成功!');
                }).catch((err) => {
                    console.log(err)
                });
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    .defaultInfoConfig {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        padding:.1rem .2rem;
        @import url('../css/element.less');
        .btn-add{
            margin-bottom:.1rem;
            .el-button {
                line-height: .36rem;
                padding:0 .2rem;
                background:#edf5ff;
                border:1px solid #bedeff;
                margin-right:30px;
                i{
                    .f18();
                    color:#409eff;
                }
                span {
                    .f18();
                    color:#409eff;
                }
            }
        }
    }
</style>
<style lang="less">

</style>