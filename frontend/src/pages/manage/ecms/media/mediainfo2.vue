<template>
    <div class="mediainfo2">
        <div class="content2">
            <div class="add" @click="add()">
                <img src="../images/yingyongpeizhi/add.png"/>
            </div>
            <div class="table-style">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                    <el-table-column prop="storagePathName" label="存储路径名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="virtualPath" label="虚拟目录" width="150px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="ftpPath" label="文件路径" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="departmentName" label="是否可用" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="undertakeJudge" label="是否传输" show-overflow-tooltip>
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
        <!--编辑弹框-->
        <infoeditAlert2 ref="infoeditAlert2"/>
    </div>
</template>

<script>
    import infoeditAlert2 from "./infoeditAlert2" //添加，编辑弹框
    import {media} from "./datajson"
    import {mapState, mapMutations} from 'vuex'
    export default {
        name: "mediainfo2",
        components: {
            infoeditAlert2
        },
        data() {
            return {
                tableData:media.StoragePathlist.map(item=>{
                    return item={
                        smsInfoId:'',//流媒体id
                        storagePathId:'',//存储路径id
                        storagePathName:'',//存储路径名称
                        virtualPath:'',//虚拟路径
                        playchannelName:'',//点播频道名
                        physicalPath:'',//物理路径
                        ftpPath:'',//ftp路径
                        ftpUserName:'',//ftp用户名
                        ftpPassword:'',//ftp密码
                        ftpPort:'',//ftp端口号
                        description:'',//描述
                        transmit: true,//是否传输
                        retainOriginalDocument:true,//是否保留原文件
                        targetPath: "",//目的路径
                        startTime: "",//开始时间
                        endTime: ""//结束时间
                    }
                }),//流媒体存储路径列表,
            }
        },
        computed:{
            ...mapState('media',[
                "smsInfoId",
            ])
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取当前流媒体存储路径
            getmediaroad(){
                let _this=this;
                if(_this.smsInfoId){
                    _this.$http.post('/smsInfoConfig/getStoragePathsBySMSInfoId',{
                        smsInfoId:_this.smsInfoId//流媒体id
                    }).then(data =>{
                        if(data.code===200){
                            _this.tableData=data.data;
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/smsInfoConfig/getStoragePathsBySMSInfoId')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }else{
                        _this.tableData=[]
                }
            },
            //新增的需要按顺序
            getmediaroad2(){
                let _this=this;
                if(_this.smsInfoId) {//syncRequest
                    return _this.$http.syncRequest('/smsInfoConfig/getStoragePathsBySMSInfoId', {
                        smsInfoId: _this.smsInfoId//流媒体id
                    })
                }else _this.$msgw('请先添加流媒体存储路径');
            },
            //添加流媒体服务器存储路径管理弹框
            add(){
                //调用子组件方法
                this.$refs.infoeditAlert2.show();
            },
            //修改当前行信息
            edit(index,row){
                //调用子组件方法
                this.$refs.infoeditAlert2.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/smsInfoConfig/deleteStoragePathById', {
                        storagePathId:row.storagePathId//存储路径id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            _this.getmediaroad();
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
        }
    }
</script>

<style lang="less">
    .mediainfo2{
        .content2{
            margin:.05rem 0;
            .add{
                cursor:pointer;
                margin-bottom:.1rem;
                img{
                    width:1rem;
                }
            }
        }
    }
</style>