<template>
    <div class="othertabpane7">
        <div class="main-config">
            <el-checkbox v-model="noteRecordList[0].validityFlag" ></el-checkbox>
            .txt文件保存时间间隔:&nbsp;&nbsp;<el-input  type="text" v-model.trim="noteRecordList[0].noteRecordStorageSecond" ></el-input>(S)<br/><br/>
            <el-checkbox v-model="noteRecordList[1].validityFlag" ></el-checkbox>
            .doc文件保存时间间隔:<el-input type="text" v-model.trim="noteRecordList[1].noteRecordStorageSecond"></el-input>(S)
        </div>
        <div class="select-btn">
            <el-button type="primary" @click="sure(noteRecordList[0].noteRecordStorageSecond,noteRecordList[1].noteRecordStorageSecond)">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "othertabpane7",
        data() {
            return {
                "noteRecordList":[{
                    "noteRecordStyle":'txt',//为txt
                    "noteRecordStorageSecond":"",
                    "validityFlag":false,//是否勾选
                },{
                    "noteRecordStyle":'doc',//为doc
                    "noteRecordStorageSecond":"",
                    "validityFlag":false,//是否勾选
                }]
            }
        },
        created() {

        },
        mounted() {
            this.getNoteRecordConfig()
        },
        destroyed() {

        },
        methods: {
            //查询笔录配置页面
            getNoteRecordConfig(){
                let {noteRecordList}=this;
                let _this=this;
                _this.$http.post('/noteRecordConfig/getNoteRecordConfig',{

                }).then(data =>{
                    if(data.code===200){
                        data.data.map(item=>{
                            if(item.noteRecordStyle=='txt'){
                                noteRecordList[0].validityFlag=item.validityFlag;
                                noteRecordList[0].noteRecordStorageSecond=item.noteRecordStorageSecond;
                            }else if((item.noteRecordStyle=='doc')){
                                noteRecordList[1].validityFlag=item.validityFlag;
                                noteRecordList[1].noteRecordStorageSecond=item.noteRecordStorageSecond;
                            }
                        })
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/noteRecordConfig/getNoteRecordConfig')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //保存
            sure(time1,time2){
                let {noteRecordList}=this;
                let _this=this;
                if(!time1){
                    _this.$msgw('请输入txt文件保存时间间隔')
                    return false;
                }else if(isNaN(time1) || time1.toString().indexOf('.')>-1){
                    _this.$msgw('txt文件保存时间间隔必须为整数')
                    return false;
                }else if(time1<=0){
                    _this.$msgw('txt文件保存时间间隔必须为大于0的值')
                    return false;
                }
                if(!time2){
                    _this.$msgw('请输入doc文件保存时间间隔')
                    return false;
                }else if(isNaN(time2) || time2.toString().indexOf('.')>-1){
                    _this.$msgw('doc文件保存时间间隔必须为整数')
                    return false;
                }else if(time2<=0){
                    _this.$msgw('doc文件保存时间间隔必须为大于0的值')
                    return false;
                }
                _this.$showToast('正在保存...')
                return _this.$http.post('/noteRecordConfig/saveNoteRecordConfig',{
                            noteRecordList
                        }).then(data =>{
                            _this.$hideToast()
                            if(data.code===200){
                                _this.$msgs('保存成功');
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$hideToast()
                            console.log(err,'/noteRecordConfig/saveNoteRecordConfig')
                            _this.$msge('服务器异常，请稍后重试');
                        })
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane7{
        .main-config{
            margin:1rem auto;
            width:12rem;
            text-align: center;
            .el-checkbox{
                margin-right:0px;
            }
            .el-input {
                width:2.8rem;
                margin:0 .1rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
        }
        /*底部保存*/
        .select-btn{
            margin-top:.5rem;
            text-align: center;
            .el-button{
                width:1.48rem;
                height:.48rem;
                padding: 0;
                span{
                    .f20();
                    color:#fff;
                }
            }
        }
    }
</style>