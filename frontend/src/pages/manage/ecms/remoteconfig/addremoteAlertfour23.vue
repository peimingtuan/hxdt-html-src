<template>
    <div class="addremoteAlertfour23">
        <!--弹框-->
        <transition name="slide-fade">
            <div class="alert-window2" v-show="alertshow">
                <div class="main">
                    <img class="imgloge" src="../images/yingyongpeizhi/avataradd.png" />
                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                    <AlertleftTile :text="text" :text2="text2"/>
                    <div class="content">
                        <div class="add" @click="add()">
                            <img src="../images/yingyongpeizhi/add.png"/>
                        </div>
                        <div class="table-style">
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
                                <el-table-column type="selection"></el-table-column>
                                <el-table-column prop="trialRoomName" label="流发送选择" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <div class="select-box">
                                            <el-select v-model="scope.row.encodeId" placeholder="请选择" @change="changeEncode" @focus="getDataIndex(scope.$index)">
                                                <el-option v-for="list in encodeList"
                                                           :key="list.encodeId"
                                                           :label="list.encodeName"
                                                           :value="list.encodeId">

                                                </el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="trialRoomTypeName" width="280px" label="对应解码通道">
                                    <template slot-scope="scope">
                                        <div class="select-box">
                                            <el-select class="passageway" v-model="scope.row.decodeId" placeholder="请选择" @change="changeDecode" @focus="getDataIndex(scope.$index)">
                                                <el-option v-for="list in decodeList"
                                                           :disabled="list.disabled"
                                                           :key="list.decodeId"
                                                           :label="list.decodeName"
                                                           :value="list.decodeId">

                                                </el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="trialUnitName" label="对应解码类型" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <div class="select-box">
                                            <el-select v-model="scope.row.solution" placeholder="请选择" @change="changeSolution" @focus="getDataIndex(scope.$index)">
                                                <el-option v-for="list in solutionList" :key="list.solution" :label="list.name" :value="list.solution"></el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <div class="isedit">
                                            <span @click="delinfo(scope.$index)">删除</span>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="bt">
                        <div class="qure" @click="qure">
                            <img src="../images/courtsupervision/sure.png" />确定
                        </div>

                        <div class="cancel" @click="cancel">
                            <img src="../images/courtsupervision/cancel.png" />取消
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import $ from "jquery"
    import AlertleftTile from "../component/AlertleftTile"
    export default {
        name: "addremoteAlertfour22",
        props:{
            alertshow:Boolean
        },
        components: {
            AlertleftTile,
        },
        data() {
            return {
                text:'编解码通道配置',
                text2:'请填写详细信息',
                relativeRooms:null,
                encodeList:[],
                decodeList:[],
                solutionList:[
                    {
                        solution:0,
                        name:"解音视频"
                    },
                    {
                        solution:1,
                        name:"解视频"
                    },
                    {
                        solution:2,
                        name:"解音频"
                    }
                ],
                tableData:[],
                dataIndex:null,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            // 获取流发送选择选择框
            getSelect1(){
                this.$http.post('/remoteTrial/getEncodeChannels',{
                    relativeRooms:this.relativeRooms
                }).then(data =>{
                    if(data.code===200){
                        this.encodeList = data.data;
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            // 获取对应解码通道选择框
            getSelect2(){
                this.$http.post('/remoteTrial/getDecodeChannels',{
                    relativeRooms:this.relativeRooms
                }).then(data =>{
                    if(data.code===200){
                        this.decodeList = data.data;
                        console.log(this.decodeList)
                        if(this.tableData.length>0){
                            this.tableData.map(item=>{
                                for(let i=0;i<this.decodeList.length;i++){
                                    if(this.decodeList[i].decodeId===item.decodeId){
                                        this.decodeList[i].disabled=true;
                                        break;
                                    }
                                }
                            })
                        }
                    }else{
                        this.$msgw(data.message);
                    }
                }).catch(err => {
                    this.$msge('服务器异常，请稍后重试');
                })
            },
            getDataIndex(index){
                this.dataIndex = index;
            },
            changeEncode(data){
                let item = '';
                for(let i = 0; i < this.encodeList.length; i ++){
                    if(this.encodeList[i].encodeId == data){
                        item = this.encodeList[i];
                    }
                }
                // this.tableData[this.dataIndex].encodeId = item.encodeId;
                this.tableData[this.dataIndex].encodeName = item.encodeName;
                this.tableData[this.dataIndex].encodeNum = item.encodeNum;
                this.tableData[this.dataIndex].encodePosition = item.encodePosition;
            },
            changeDecode(data){
                let item = '';
                for(let i = 0; i < this.decodeList.length; i ++){
                    if(this.decodeList[i].decodeId == data){
                        item = this.decodeList[i];
                    }
                }
                // this.tableData[this.dataIndex].decodeId = item.decodeId;
                this.tableData[this.dataIndex].decodeName = item.decodeName;
                this.tableData[this.dataIndex].decodeNum = item.decodeNum;
                this.tableData[this.dataIndex].decodePosition = item.decodePosition;
                let arr=[];
                this.tableData.map((item)=>{
                    for(let i=0;i<this.decodeList.length;i++){
                        if(this.decodeList[i].decodeId===item.decodeId){
                            arr.push(i)
                        }
                    }
                })
                this.decodeList.map((item,index)=>{
                    if(arr.includes(index)){
                        item.disabled=true;
                    }else{
                        item.disabled=false;
                    }
                })
            },
            changeSolution(data){
                // this.tableData[this.dataIndex].solution = data.solution;
            },
            //注册弹框显示与否事件
            showAlert() {
                this.$emit('selectshow');
            },
            qure() {
                let isShow=false;
                if(this.tableData.length===0){
                    isShow=true;
                }else{
                    for(let i=0;i<this.tableData.length;i++){
                        let item=this.tableData[i];
                        let solution=item.solution===''?true:false;
                        if(!item.encodeId || !item.decodeId || solution){
                            isShow=true;
                            break;
                        }
                    }
                }

                if(isShow){
                    this.$msgw("某条信息配置不完整")
                    return false;
                }
                this.$emit('qure',this.tableData);
                this.cancel()
            },
            cancel() {
                this.$emit('cancel');
            },
            // 新增
            add(){
                let data = {
                    encodePosition:'',
                    decodeId:'',
                    solution:'',
                    remoteTrialTemplateEnDeId:'',
                    decodeName:'',
                    encodeNum:'',
                    decodePosition:'',
                    encodeId:'',
                    templateId:'',
                    decodeNum:'',
                    encodeName:''
                }
                this.tableData.push(data)
            },
            // 删除
            delinfo(index){
                this.tableData.splice(index,1);
                let arr=[];
                this.tableData.map((item)=>{
                    for(let i=0;i<this.decodeList.length;i++){
                        if(this.decodeList[i].decodeId===item.decodeId){
                            arr.push(i)
                        }
                    }
                })
                this.decodeList.map((item,index)=>{
                    if(arr.includes(index)){
                        item.disabled=true;
                    }else{
                        item.disabled=false;
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .addremoteAlertfour23{
        /*弹框*/
        .main{
            width:12rem;
            padding:0 .8rem;
            box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
            /*min-height:6.85rem;*/
            background:#fff;
            position:absolute;
            left:50%;
            top:1rem;
            margin-left:-5rem;
            /*margin-top:-3.425rem;*/
            border-radius:2px;
            @import url('../css/alertimg.less');
            .content{
                width:100%;
                background: #ECEFF0;
                height:4rem;
                /*max-height:6rem;*/
                overflow: auto;
                margin-top:.1rem;
                padding:.2rem;
                .add{
                    margin-bottom: 0.2rem;
                    cursor: pointer;
                    float: left;
                }
                .table-style{
                    cursor: normal;
                    .isedit span{
                        cursor: pointer;
                    }
                }
                .el-textarea__inner{
                    height: 3rem;

                }
                .select-box{
                    width: 100%;
                }
                .passageway{
                    width:2.6rem;
                }
                .el-input{
                    width: 100% !important;
                }
            }
            /*底部*/
            @import url('../css/alertbtn.less');
        }
    }
    .el-select-dropdown__item.is-disabled{
        color:#c0c4cc;
        span{
            color:#c0c4cc;
        }
    }
    .el-select-dropdown__item.selected{
        color:#409eff!important;
        span{
            color:#409eff!important;
        }
    }
</style>