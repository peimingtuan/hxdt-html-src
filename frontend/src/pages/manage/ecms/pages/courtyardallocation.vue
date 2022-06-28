<template>
    <div class="courtyardallocation">
        <!--头部-->
        <div class="head">
            <leftTile :imgurl="imgurl" :text="text" :text2="text2"/>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="法庭配置" name="first">
                    <div class="top">
                        <div class="le">
                            <!--<div class="add" @click="add()">-->
                                <!--<img src="../images/yingyongpeizhi/add.png"/>-->
                            <!--</div>-->
                            <!--<div class="upload" @click="upload()">-->
                                <!--<img src="../images/yingyongpeizhi/shangchuan.png"/>-->
                            <!--</div>-->
                            <!--<div class="download" @click="download()">-->
                                <!--<img src="../images/yingyongpeizhi/xiazai.png"/>-->
                            <!--</div>-->
                            <!--<div class="acquiesce" @click="acquiesce()">-->
                                <!--<img src="../images/yingyongpeizhi/moren.png"/>-->
                            <!--</div>-->
                            <el-button type="primary" icon="el-icon-plus" @click="add()">添加</el-button>
                            <el-button type="primary" @click="acquiesce()">默认控制文件</el-button>
                        </div>
                        <div class="ri">
                            <el-input v-model="keyWord" placeholder="按条件搜索"></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="search(keyWord)">搜索</el-button>
                        </div>
                    </div>
                    <div class="table-style">
                        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection"></el-table-column>
                            <el-table-column type="index" label="序号"  width="100px" :index="indexMethod">
                            </el-table-column>
                            <el-table-column prop="courtName" label="法院" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="courtRoomName" label="法庭名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="courtRoomTypeName" label="法庭类型" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="signalTypeName" label="信号类型" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="buildDate" label="建设日期" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="description" label="描述" show-overflow-tooltip>
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
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--添加弹框-->
        <addlawAlert ref="addlawAlert"/>
        <!--添加上传控制文件弹框-->
        <adduploadAlert ref="adduploadAlert" />
        <!--默认控制文件-->
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="sureAdd">
            <default-info-config ref="defaultInfoConfig"/>
        </spring-box>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "courtyardallocation",
        components: {
            leftTile:resolve=>{require(["../component/leftTile"],resolve)},//主页左侧头部
            addlawAlert:resolve=>{require(["../courtyardallocation/addlawAlert"],resolve)},//添加弹框
            adduploadAlert:resolve=>{require(["../courtyardallocation/adduploadAlert"],resolve)},//添加上传控制文件弹框
            springBox:()=>import("../component/springBox/springBox"),
            defaultInfoConfig:()=>import("../courtyardallocation/defaultInfoConfig")
        },
        data() {
            return {
                imgurl:require('../images/courtsupervision/lawguanli3.png'),
                text:'庭室配置',
                text2:'TING SHI PEI ZHI',
                activeName:'first',
                keyWord:"",//搜索
                tableData:[],//庭室配置管理列表,
                multipleSelection: [],//表格存值
                mainText:'默认控制文件',
                alertShow:false
            }
        },
        created() {
            //获取法庭配置列表
            this.setpageIndex(1);
            this.getlawlist(this);
        },
        mounted() {

        },
        destroyed() {

        },
        computed:{
            ...mapState('courtyardallocation',[
                "total",
                "pageIndex",
            ])
        },
        methods: {
            ...mapMutations('courtyardallocation',[
                "setrowinfo",
                "setpageIndex"
            ]),
            ...mapActions('courtyardallocation',[
                "getlawlist",
            ]),
            //上传控制文件
            upload(){
                if(this.multipleSelection.length===0)this.$msgw('请先勾选法庭')
                else{
                    this.$refs.adduploadAlert.alertshow=true;
                    this.$refs.adduploadAlert.fileList=[];
                    this.$refs.adduploadAlert.data.courtRoomIds=this.multipleSelection.toString();
                }
            },
            //下载控制文件
            download(){
                if(this.multipleSelection.length===0)this.$msgw('请先勾选法庭')
                else{
                    this.downloadControlFile(this.multipleSelection.toString())
                }
            },
            //添加默认控制文件
            async acquiesce(){
                //this.downloadControlFile()
                if(this.multipleSelection.length===0){
                    this.$msgw('请先勾选法庭')
                }else if(this.multipleSelection.length===1){
                    this.alertShow=true;
                    this.$refs.defaultInfoConfig.courtRoomId='';
                    this.$refs.defaultInfoConfig.getAllCourtRoom();
                    let res=await this.$http.post('/courtRoomConfig/getControlInfosList',{courtRoomId:this.multipleSelection.toString()},true,'加载中...')
                    if(res)this.$refs.defaultInfoConfig.tableData=res.data;
                    else this.$refs.defaultInfoConfig.tableData=[]
                    //this.downloadControlFile(this.multipleSelection.toString())
                }else{
                    this.$msgw('只能勾选一个法庭')
                }
            },
            //保存法庭默认控制文件
            async sureAdd(){
                let {multipleSelection}=this;
                let buttonNameArray=[],buttonComandArray=[],bShowArray=[];
                if(this.$refs.defaultInfoConfig.tableData.length===0){
                    this.$msgw('请添加默认控制文件')
                    return false
                }
                this.$refs.defaultInfoConfig.tableData.map(item=>{
                    buttonNameArray.push(item.buttonName)
                    buttonComandArray.push(item.buttonComand)
                    bShowArray.push(item.bShow)
                })
                if(buttonNameArray.includes('') || buttonNameArray.includes(null) || buttonNameArray.includes(undefined)){
                    this.$msgw('请将表格中按钮名称填写完整')
                    return false
                }
                if(buttonComandArray.includes('') || buttonComandArray.includes(null) || buttonComandArray.includes(undefined)){
                    this.$msgw('请将表格中命令填写完整')
                    return false
                }
                if(bShowArray.includes('') || bShowArray.includes(null) || bShowArray.includes(undefined)){
                    this.$msgw('请将表格中是否展示填写完整')
                    return false
                }
                let res=await this.$http.post('/courtRoomConfig/saveControlInfosList',{courtRoomId:multipleSelection.toString(),buttonList:this.$refs.defaultInfoConfig.tableData},true,'正在保存...')
                if(res){
                    this.$msgs('保存成功！')
                    this.alertShow=false;
                }
            },
            //下载
            downloadControlFile(courtRoomIds){
                let _this=this;
                _this.$http.post('/courtControl/downloadControlFile', {
                    courtRoomIds:courtRoomIds?courtRoomIds:''//法庭id
                }).then(data =>{
                    if(data.code===200){
                        data.data.map(item=>{
                            _this.exportRaw(item.fileName,item.fileContent)
                        })
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/courtControl/downloadControlFile')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //搜索
            search(keyWord){
                let _this=this;
                _this.setpageIndex(1)
                _this.getlawlist(_this)
            },
            //添加法庭弹框
            add(){
                this.setrowinfo('');
                //调用子组件方法
                 this.$refs.addlawAlert.show()
            },
            //table
            //table表格索引值
            indexMethod(index) {
                return (this.pageIndex-1) * 10+index+1;//当前条数
            },
            //修改当前行信息
            edit(index,row){
                this.setrowinfo(row);
                //调用子组件方法
                this.$refs.addlawAlert.show(row)
            },
            //删除当前行内容
            delinfo(index,row){
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$http.post('/courtRoomConfig/deleteCourtRoomInfo', {
                        courtRoomIds:row.courtRoomId//法庭id
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgs('删除成功!');
                            //计算总页数
                            if(index==0 && Math.ceil(Number(_this.total)/10)==Number(_this.pageIndex) && _this.pageIndex!=1 && Number(_this.total)%10==1){
                                _this.setpageIndex(Number(_this.pageIndex)-1);
                            }
                            _this.getlawlist(_this);
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        console.log(err,'/courtRoomConfig/deleteCourtRoomInfo')
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }).catch(() => {

                });
            },
            //checkbox,当选择项发生变化时会触发该事件
            handleSelectionChange(val) {
                //法庭id courtRoomId
                if(val.length>0){
                    this.multipleSelection=val.map(item=>{
                        return item.courtRoomId
                    })
                }else{
                    this.multipleSelection=[];
                }
            },
            //分页信息
            //当前页数
            handleCurrentChange(page){
                this.setpageIndex(page)
                this.getlawlist(this);
            },
            //下载信息
            exportRaw(name, data) {
                let urlObject = window.URL || window.webkitURL || window;
                let export_blob = new Blob([data]);
                // for IE
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(export_blob, name);
                }else{
                    let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                    save_link.href = urlObject.createObjectURL(export_blob);
                    save_link.download = name;
                    this.fakeClick(save_link);
                }

            },
            fakeClick(obj) {
                let ev = document.createEvent("MouseEvents");
                ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                obj.dispatchEvent(ev);
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .courtyardallocation{
        .mr();
        padding: 0 .2rem;
        .head{
            position:relative;
            padding: .1rem 0;
            .fb();
            .el-tabs__item{
                padding: 0 .2rem;
                height:.4rem;
                line-height:.4rem;
                .f18();
            }
            .el-tabs__active-bar{
                width:100%;
            }
            /*内容填充区域*/
            .el-tabs__content{
                width:100%;
                position:absolute;
                left:0;
                /*搜索查询内容*/
                .top{
                    .fb();
                    .le{
                        .fl();
                        cursor:pointer;
                        &>div{
                            margin-right:.1rem;
                            img{
                                width:1.64rem;
                            }
                        }
                        &>div.add{
                            img{
                                width:.92rem;
                            }
                        }
                        .el-button {
                            line-height: .36rem;
                            padding:0 .2rem;
                            background:#edf5ff;
                            border:1px solid #bedeff;
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
                .table-style{
                    margin-top:.2rem;
                }
                @import url('../css/element.less');
            }
        }

    }
</style>
<style scoped>
    @import url('../css/uppage.less');
</style>