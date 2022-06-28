<template>
    <div class="media">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <div class="add" @click="add()">
                <img src="../images/yingyongpeizhi/add.png"/>
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="100px" :index="indexMethod">
                </el-table-column>
                <el-table-column prop="smsInfoName" label="流媒体服务器名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="intranet1Ip" label="IP地址"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createdDate" label="服务器状态" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="version" label="版本号" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="serialNumber" label="序列号" width="150px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
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
        <addmediaAlert ref="addmediaAlert" :alertshow="ismain" @selectshow="ismain=false" @qure="addlawsure" @cancel="ismain=false"/>
    </div>
</template>

<script>
    import leftTile from "../component/leftTile" //主页左侧头部
    import addmediaAlert from "../media/addmediaAlert" //添加弹框
    //import {media} from "../media/datajson"
    import {mapMutations} from 'vuex'
    export default {
        name: "media",
        components: {
            leftTile,
            addmediaAlert,
        },
        data() {
            return {
                imgurl:require('../images/yingyongpeizhi/liumeitipeizhi3.png'),
                text:'流媒体服务器配置',
                text2:'LIU MEI TI FU WU QI PEI ZHI',
                ismain:false,//添加弹框
                tableData:[],//流媒体配置列表,
                multipleSelection: [],//表格存值
                total:0,//总条数
                pageIndex:1,//当前页码
                pageSize:10//每页大小
            }
        },
        created() {
            //获取流媒体配置信息列表
            this.getmediainfo();
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            ...mapMutations('media',[
                "changesmsInfoId",
                "setserialNumber",
            ]),
            //获取流媒体配置信息列表
            getmediainfo(){
                let {pageIndex,pageSize}=this;
                let _this=this;
                _this.$showLoading('rgba');
                _this.$http.post('/smsInfoConfig/getAllSMSInfoConfigs', {
                    pageIndex,//当前页码
                    pageSize //每页大小
                }).then(data =>{
                    _this.$hideLoading('rgba');
                    if(data.code===200){
                        _this.total=data.count;
                        _this.tableData=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading('rgba');
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //添加流媒体配置弹框
            add(){
                this.ismain=true;
                this.changesmsInfoId('');
                this.setserialNumber('');
                //调用子组件方法
                this.$refs.addmediaAlert.show();
            },
            //关闭流媒体配置弹框
            addlawsure(){
                let _this=this;
                let result= _this.$refs.addmediaAlert.pass()
                if(result && result.code===200){
                    _this.$msgs('保存成功');
                    _this.ismain=false;
                    _this.getmediainfo();
                }else if(result && result.code!==200){
                    _this.$msgw(result.message);
                }else{
                    return false;
                }
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //修改当前行信息
            edit(index,row){
                this.ismain=true;
                this.changesmsInfoId(row.smsInfoId);
                //调用子组件方法
                this.$refs.addmediaAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/smsInfoConfig/deleteSMSInfoById',{
                        smsInfoId:row.smsInfoId//流媒体id
                    }).then(data =>{
                        if(data.code===200){
                            //_this.tableData.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.pageIndex=Number(_this.pageIndex)-1;
                            }
                            _this.getmediainfo()
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.pageIndex=page;
                this.getmediainfo();
            },
        }
    }
</script>

<style lang="less">
    .media{
        .mr();
        padding: 0 .2rem;
        .head{
            padding: .1rem 0;
            .fb();
            .add{
                cursor:pointer;
                img{
                    width:.8rem;
                }
            }
        }
        @import url('../css/element.less');
    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>