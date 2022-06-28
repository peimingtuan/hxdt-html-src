<template>
    <div class="info8">
        <div class="top">
            开庭方式:
            <el-select v-model="courtWay" placeholder="请选择">
                <el-option
                        v-for="item in courtWayList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
        </div>
        <div class="info8-main">
            <div class="add">
                <img @click="add" src="../images/yingyongpeizhi/add.png"/>
                <font style="color:red">*</font>
                <el-input v-model.trim="centralCommandRecover" placeholder="恢复原画面"></el-input>
                <el-button type="primary"  @click="saveCentralCommandInfo(courtWay)">保存</el-button>
            </div>
            <div class="table-style">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                    <el-table-column type="index" label="序号" width="80px" :index="indexMethod">
                    </el-table-column>
                    <el-table-column  label="客户端">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.clientId" placeholder="请选择">
                                <el-option
                                        v-for="item in clientList"
                                        @click.native="handleSelect(item,scope.row)"
                                        :key="item.clientId"
                                        :label="item.clientName"
                                        :value="item.clientId">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column  label="流类型">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.streamType" placeholder="请选择">
                                <el-option v-for="item in streamTypeList"
                                           :key="item.streamTypeCode"
                                           :label="item.streamTypeName"
                                           :value="item.streamTypeCode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column  label="软中控命令">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.softCentralControl" placeholder="请输入"></el-input>
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
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "info8",
        components: {

        },
        data() {
            return {
                courtWayList:[],
                clientList:[],
                streamTypeList:[],
                courtWay:'',
                centralCommandRecover:'',
                tableData:[],
            }
        },
        computed:{
            ...mapState('courtyardallocation',[
                "courtRoomId",
            ])
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        watch:{
            async courtWay(newV,oldV){
                this.$showToast('加载中...')
                await this.getCentralCommandInfo()
                this.$hideToast()
            }
        },
        methods: {
            add(){
                this.tableData.push({
                    "clientId": "",
                    "clientName": "",
                    "clientType":'',
                    "description": null,
                    "macAddress": "",
                    "operateType":1,
                    "softCentralControl":"",
                    "sortOrder": null,
                    "streamType":'',
                    "validityFlag": null
                })
            },
            handleSelect(item,row){
                row.clientType=item.clientType;
                row.macAddress=item.macAddress;
                row.clientName=item.clientName
            },
           async show(){
               this.$showToast('加载中...')
               await this.getCourtWayInfos()
                await Promise.all([this.getCourtRoomClientInfo(),
                    this.getStreamTypeInfo()]).then(()=>{
                })
               this.$nextTick(()=>{
                   this.$hideToast()
               })
            },
            //开庭方式
            async getCourtWayInfos(){
                let res=await this.$http.post('/baseInfo/getCourtWayInfos',{},true)
                if(res){
                    this.courtWayList=res.data;
                    if(this.courtWayList.length>0)this.courtWay=this.courtWayList[0].code
                }
            },
            //客户端
            async getCourtRoomClientInfo(){
                let param={
                    id:this.courtRoomId,//法庭id
                    pageIndex:1,
                    pageSize:100
                }
                let res=await this.$http.post('/courtRoomConfig/getCourtRoomClientInfo',param,true)
                if(res)this.clientList=res.data
            },
            //流类型
            async getStreamTypeInfo(){
                let {courtWay}=this;
                let res=await this.$http.post('/baseInfo/getStreamTypeInfos',{courtWay},true)
                if(res)this.streamTypeList=res.data
            },
            //列表
            async getCentralCommandInfo(){
                let {courtWay,courtRoomId}=this;
                let res=await this.$http.post('/courtRoomConfig/getCentralCommandInfo',{courtWay,courtRoomId},true)
                if(res){
                    this.tableData=res.data.centralCommandInfos;
                    this.centralCommandRecover=res.data.centralCommandRecover
                }
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
            //保存
            async saveCentralCommandInfo(val){
                let {centralCommandRecover,courtRoomId,tableData}=this;
                let clientarr=[],streamTypearr=[],softCentralControlarr=[];
                tableData.map(item=>{
                    clientarr.push(item.clientId)
                    streamTypearr.push(item.streamTypeCode)
                    softCentralControlarr.push(item.softCentralControl)
                })
                if(!centralCommandRecover){
                    this.$msgw('请输入恢复原画面地址')
                    return false
                }
                if(clientarr.includes('')){
                    this.$msgw('请将客户端类型填写完整')
                    return false
                }
                if(streamTypearr.includes('')){
                    this.$msgw('请将流类型填写完整')
                    return false
                }
                if(softCentralControlarr.includes('')){
                    this.$msgw('请将软中控命令填写完整')
                    return false
                }
               let res=await this.$http.post('/courtRoomConfig/saveCentralCommandInfo',{courtWay:val,centralCommandRecover,courtRoomId,centralCommandInfos:tableData},true,'正在保存...')
                    if(res)this.$msgs('保存成功！')
                return res
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .info8{
        .el-select {
            width: 3rem;
            .el-input--suffix .el-input__inner {
                height: .4rem;
                line-height: .4rem;
                padding: 0 .3rem 0 .15rem;
                .f18();
            }

            .el-input__icon {
                height: 100%;
                width: .25rem;
                text-align: center;
                line-height: .4rem;
            }
        }
        &-main{
            .el-input {
                width:3rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
            .el-button {
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
            .table-style{
                .el-input,.el-select {
                    max-width:2.5rem;
                }
            }
            @import url('../css/element.less');
        }
    }
</style>
<style lang="less" scoped>
    .info8{
        &-main{
            .add{
                img{
                    margin:.2rem 0;
                    width:.92rem;
                    cursor:pointer;
                }
            }
        }
    }
</style>