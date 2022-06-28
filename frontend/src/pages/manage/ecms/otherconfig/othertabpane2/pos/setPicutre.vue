<template>
    <div class="setPicutre">
        <div class="top">
            <div class="le">
                <div class="add" @click="add()">
                    <img src="../../../images/yingyongpeizhi/add.png"/>
                </div>
            </div>
            <div class="box-r">
                <el-checkbox v-model="autoplay">轮番播放</el-checkbox>
                轮番时间<el-input v-model.trim="intervalTime"></el-input>秒
            </div>
        </div>
        <div class="table-style">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    max-height="500"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="index" label="序号" width="100px">
                </el-table-column>
                <el-table-column prop="fileName" label="文件名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                        <div>{{scope.row.fileType | fileType}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="isedit">
                            <span :class="scope.$index===0?'f7f0f0':''" @click="up(scope.$index, scope.row)">上移</span>
                            <span :class="scope.$index+1===tableData.length?'f7f0f0':''" @click="down(scope.$index, scope.row)">下移</span>
                            <span @click="edit(scope.$index, scope.row)">修改</span>
                            <span @click="delinfo(scope.$index, scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="save-btn">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
        <!--添加弹框-->
        <addotherAlert2
                ref="addotherAlert2"
                :alertshow="ismain"
                @selectshow="ismain=false"
                @cancel="ismain=false"
        />
    </div>
</template>

<script>
    import addotherAlert2 from "../../addotherAlert2" //添加弹框
    export default {
        name: "setPicutre",
        components: {
            addotherAlert2
        },
        data() {
            return {
                ismain:false,
                autoplay:true,//是否轮番
                intervalTime:'',//轮番时间
                tableData:[],
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        filters:{
            fileType(v){
                let s='';
                switch(Number(v)){
                    case 1:
                        s='图片';
                        break;
                    case 2:
                        s='文字';
                        break;
                    case 3:
                        s='视频';
                        break;
                }
                return s
            }
        },
        methods: {
            //查询
            select(){
                const _this=this;
                _this.$showToast('加载中...')
                _this.$http.post('/partyLoginConfig/getPartyLoginConfigs',{}).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.autoplay=data.data.autoplay;
                        _this.intervalTime=data.data.intervalTime;
                        _this.tableData=data.data.partyLoginConfigs;
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //添加弹框
            add(){
                this.$refs.addotherAlert2.show()
                this.ismain=true;
            },
            //修改当前行信息
            edit(index,row){
                this.$refs.addotherAlert2.show(row)
                this.ismain=true;
            },
            //上移
            up(index,row){
                if(index!==0){
                    let t=this.tableData[index-1];
                    this.tableData.splice(index-1,2,row,t)
                }
            },
            //下移
            down(index,row){
                if(index!==this.tableData.length-1){
                    let b=this.tableData[index+1];
                    this.tableData.splice(index,2,b,row)
                }
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/partyLoginConfig/deletePartyLoginConfigContent', {
                        id:row.id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            _this.tableData.splice(index,1)
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //确定关闭添加弹框
            save(){
                const _this=this;
                _this.$showToast('正在保存...')
                _this.tableData.forEach((item,index)=>{
                    item.sortOrder=index+1;
                })
                _this.$http.post('/partyLoginConfig/savePartyLoginConfigs',{
                    autoplay:_this.autoplay,
                    intervalTime:_this.intervalTime || '',
                    partyLoginConfigs:_this.tableData
                }).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../../../css/common.less');
    .setPicutre{
        .mr();
        /*头部内容*/
        .top{
            margin-bottom:.1rem;
            .fb();
            .le{
                .fl();
                cursor:pointer;
                &>div.add{
                    img{
                        width:.8rem;
                    }
                }
            }
            .box-r{
                .f18();
                .el-checkbox{
                    margin-right:.5rem;
                    .el-checkbox__input{
                        line-height:normal;
                        .el-checkbox__inner{
                            .wh(.18rem,.18rem);
                            &:after{
                                .wh(.04rem,.08rem);
                                left: .05rem;
                                top:.01rem;
                            }
                        }
                    }
                    .el-checkbox__label{
                        .f18();
                        padding-left:5px;
                        line-height:1;
                    }
                }
                .el-input {
                    width: .8rem;
                    margin-right: .1rem;
                    .el-input__inner {
                        height: .4rem;
                        line-height: .4rem;
                        padding: 0 .15rem;
                        .f18();
                    }
                }
            }
        }
        /*内容展示区域*/
        @import url('../../../css/element.less');
        .save-btn{
            padding:.2rem 0;
            text-align: center;
            .el-button{
                width:1.48rem;
                height:.48rem;
                padding: 0;
                span{
                    font-size:.2rem;
                    color:#fff;
                }
            }
        }
    }
</style>
<style lang="less" scoped>
    .save-btn{
        z-index:100;
        position: fixed;
        width:16.6rem;
        bottom: 0;
        left:2.6rem;
        background:#f9f9f9;
    }
    .f7f0f0{
        color:#dcdcdc!important;
    }
</style>