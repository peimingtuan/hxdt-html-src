<template>
    <div class="mediainfo3">
        <div class="content2">
            <div class="add-btn">
                <el-button @click="opensecondAlert">挂载路径(mount)</el-button>
                <el-button @click="delinfo">卸载路径(unmount)</el-button>
            </div>
            <div class="table-style">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                    <el-table-column type="selection" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="storagePathName" label="挂载点" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sourceStoreIp" label="源存储IP地址" width="150px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sharedPath" label="源存储共享路径" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sharedPath" label="共享名" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--添加挂载路径二次弹框-->
        <infoeditAlert3 ref="infoeditAlert3" :alertshow="secondshow" @selectshow="secondshow=false" @qure="sureAlert2" @cancel="secondshow=false"/>
    </div>
</template>

<script>
    import infoeditAlert3 from "./infoeditAlert3" //添加挂载路径二次弹框
    import {mapState} from 'vuex'
    export default {
        name: "mediainfo3",
        components: {
            infoeditAlert3
        },
        data() {
            return {
                secondshow:false,//二次弹框
                tableData:[],//服务器存储管理列表,
                multipleSelection: [],//表格存值
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('media',[
                "smsInfoId",
            ])
        },
        methods: {
            //通过流媒体id获取挂载路径列表
            getmount(){
                let _this=this;
                if(_this.smsInfoId) {
                    _this.$http.post('/smsInfoConfig/getMountPathsBysmsInfoId', {
                        smsInfoId: _this.smsInfoId//流媒体id
                    }).then(data => {
                        if (data.code === 200) {
                            _this.tableData = data.data;
                        } else {
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/smsInfoConfig/getMountPathsBysmsInfoId')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }else
                    _this.tableData=[]
            },
            //二次弹框
            opensecondAlert(){
                this.secondshow=true;
                this.$refs.infoeditAlert3.formLabelAlign={
                    smsInfoId:'',//流媒体id
                    sourceStoreIp:'',//源存储ip
                    mountPathId:'',//挂载路径Id
                    sharedPath:'',//共享路径
                    userName:'',//共享名
                    passWord:'',//密码
                    storagePathId:'',//存储路径id
                    storagePathName:'',//存储路径名称
                }
                this.$refs.infoeditAlert3.getStoragePaths();//获取本地挂载点select
            },
            //确定关闭二次弹框
            sureAlert2(){
                this.secondshow=false;
                this.asyncwait()
            },
            //异步请求
            async asyncwait(){
                await this.$refs.infoeditAlert3.saveinfo() //调用子组件方法
                this.getmount()
            },
            //卸载挂载路径信息
            delinfo(index,row){
                let _this=this;
                if(_this.multipleSelection.length>0){
                    _this.$confirm('警告：卸载路径将导致其上的数据不可访问，确认卸载?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       let array=_this.multipleSelection.map(item=>{
                            return item.mountPathId
                        })
                        _this.$http.post('/smsInfoConfig/deleteMountPath', {
                            mountPathIds:array.toString()//挂载路径id
                        }).then(data =>{
                            if(data.code===200){
                                _this.$msgs('删除成功!');
                                _this.getmount();
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            console.log(err,'/smsInfoConfig/deleteMountPath')
                            _this.$msge('服务器异常，请稍后重试');
                        })
                    }).catch(() => {

                    });
                }else{
                    _this.$msgw('请勾选要卸载的路径');
                }
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style lang="less">
    .mediainfo3{
        .content2{
            margin:.05rem 0;
            .add-btn{
                margin-bottom:.1rem;
                /*button*/
                .el-button {
                    position: relative;
                    top: -.02rem;
                    width:2rem;
                    line-height: .36rem;
                    padding: 0;
                    background: #409eff;

                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
            @import url('../css/element.less');
        }
    }
</style>