<template>
    <div class="trialtabpane5">
        <div class="top">
            <div class="le">
                <!--<div class="add" @click="add()">-->
                    <!--<img src="../images/yingyongpeizhi/add.png"/>-->
                <!--</div>-->
                <div class="download" @click="download()">
                    <img src="../images/yingyongpeizhi/xiazai2.png"/>
                </div>
            </div>
            <div class="ri">
                <el-input v-model.trim="keyWord" placeholder="按条件搜索"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search(keyWord)">搜索</el-button>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <!--<el-table-column prop="witnessTemplateName" label="模板名称" show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <el-table-column prop="caseAyStr" label="审理类型" width="150px" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.trialType==1">独任审理</span>
                        <span v-else-if="scope.row.trialType==2">合议审理</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdDate" label="是否默认">
                    <template slot-scope="scope">
                        <span v-if="scope.row.defaultWitnessTemplate">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="说明" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="isedit">
                            <!--<span @click="edit(scope.row)">修改</span>-->
                            <!--<span @click="delinfo(scope.$index,scope.row)">删除</span>-->
                            <span @click="leadingIn(scope.row)">重新导入</span>
                            <span @click="resume(scope.row)">恢复默认模版</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="up">
            <!--分页-->
            <el-pagination
                    class="page"
                    background
                    @current-change="handleCurrentChange"
                    :current-page=1
                    :page-size=10
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <!--添加弹框-->
        <addtrialAlert5 ref="addtrialAlert5" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import $ from "jquery"
    import addtrialAlert5 from "./addtrialAlert5" //添加弹框
    export default {
        name: "trialtabpane5",
        components: {
            addtrialAlert5
        },
        data() {
            return {
                ismain:false,
                //tableData:trialbusiness.info,//列表,
                keyWord:"",//搜索
                tableData:[],
                multipleSelection: [],//表格存值
                total:0,
                pageIndex:1,
                pageSize:10,
            }
        },
        created() {
             this.getWitnessTemplatePageInfo();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //下载文件
            download(){
                console.log(this.multipleSelection)
                if(this.multipleSelection.length===0)this.$msgw('请先勾选模板')
                else{
                    const _this=this;
                    _this.$http.post('/trialBusiness/downloadWitnessTemplates', {
                        ids:_this.multipleSelection.toString()
                    }).then(data =>{
                        if(data.code===200){
                            data.data.map(item=>{
                               window.open(item.fileUrl)
                            })
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/trialBusiness/downloadWitnessTemplates')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }
            },
            //列表
            getWitnessTemplatePageInfo(){
                let {keyWord,pageIndex,pageSize}=this;
                const _this=this;
              return  _this.$http.post('/trialBusiness/getWitnessTemplatePageInfo', {
                    keyWord,
                    pageIndex,
                    pageSize
                }).then(data =>{
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/trialBusiness/getWitnessTemplatePageInfo')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索
            async search(keyWord){
                const _this=this;
                _this.pageIndex=1;
                _this.$showLoading('rgba')
                await _this.getWitnessTemplatePageInfo()
                _this.$hideLoading('rgba')
            },
            //添加弹框
            add(){
                this.ismain=true;
            },
            //重新导入
            leadingIn(row){
                this.ismain=true;
                this.$refs.addtrialAlert5.show(row)
            },
            //关闭添加弹框
            addlawsure(formLabelAlign){
                // if(!formLabelAlign.witnessTemplateName){
                //     this.$msgw('请输入模板名称');
                //     return
                // }
                // if(!formLabelAlign.trialType){
                //     this.$msgw('请选择审理类型');
                //     return
                // }
                if(!formLabelAlign.fileStream){
                    this.$msgw('请导入文件');
                    return
                }
                const _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/trialBusiness/exportWitnessTemplate',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.$msgs('保存成功');
                        _this.ismain=false;
                        _this.getWitnessTemplatePageInfo()
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    console.log(err,'/trialBusiness/exportWitnessTemplate')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //恢复默认模版
            resume(row){
                const _this=this;
                _this.$http.post('/trialBusiness/resetDefaultWitnessTemplate', {
                    id:row.witnessTemplateId //证人证言模板id
                }).then(data =>{
                    if(data.code===200){
                        _this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        _this.getWitnessTemplatePageInfo();
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/trialBusiness/resetDefaultWitnessTemplate')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //修改当前行信息
            edit(row){
                this.ismain=true;
                this.$refs.addtrialAlert5.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                const _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/trialBusiness/delWitnessTemplateInfo', {
                        id:row.witnessTemplateId //证人证言模板id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getWitnessTemplatePageInfo();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/trialBusiness/delWitnessTemplateInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.witnessTemplateId //证人证言模板id
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .trialtabpane5{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.2rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div{
                    margin-right:.2rem;
                    img{
                        width:.8rem;
                    }
                }
            }
            .ri{
                /*text*/
                .el-input {
                    width: 2.36rem;
                    margin-right: .1rem;

                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width: .9rem;
                    line-height: .36rem;
                    padding: 0;

                    .el-icon-search {
                        .f18();
                        color: #fff;
                    }

                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
        }
        /*内容展示区域*/
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>