<template>
    <div class="auditModule4">
        <div class="moduleItem">
            <div class="moduleTitle">
                <el-select v-model="mac" placeholder="请选择旁听辅助客户端">
                    <el-option
                            v-for="item in selectList"
                            @click.native="handleSelect(item.chasIp)"
                            :key="item.mac"
                            :label="item.chasName"
                            :value="item.mac"
                    ></el-option>
                </el-select>
            </div>
            <div class="moduleContent">
                <span>庭前准备：</span>
                <el-button type="primary" @click="chasHandOperate(3,1,'法庭纪律')">法庭纪律</el-button>
                <el-button type="primary" @click="chasHandOperate(3,1,'人员信息')">人员信息</el-button>
                <el-button type="primary" @click="chasHandOperate(3,1,'庭审信息')">庭审信息</el-button>
                <el-button type="primary" v-for="(item,index) in videoNumber" :key="index" @click="chasHandOperate(3,1,'视频'+(index+1))">
                    视频{{index+1}}
                </el-button>
            </div>
            <div class="moduleContent">
                <span>开始庭审：</span>
                <el-button type="primary" @click="chasHandOperate(3,2,'校对身份阶段')">校对身份阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'合议庭成员阶段')">合议庭成员阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'权利义务告知阶段')">权利义务告知阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'法庭调查阶段')">法庭调查阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'法庭辩论阶段')">法庭辩论阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'案件评议阶段')">案件评议阶段</el-button>
                <el-button type="primary" @click="chasHandOperate(3,2,'宣判结果阶段')">宣判结果阶段</el-button>
            </div>
            <div class="moduleContent">
                <span>休庭：</span>
                <el-button type="primary" @click="chasHandOperate(2,4,'休庭阶段')">休庭阶段</el-button>
            </div>
            <div class="moduleContent">
                <span>闭庭：</span>
                <el-button type="primary" @click="chasHandOperate(2,3,'闭庭阶段')">闭庭阶段</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "auditModule4",
        components:{

        },
        data() {
            return {
                mac:'',
                chasIp:'',
                selectList:[],
                videoNumber:[],
            }
        },
        watch:{

        },
        created() {
        },
        mounted() {

        },
        methods: {
            handleSelect(v){
                this.chasIp=v
            },
            async chasHandOperate(controlType,trialStatus,videoString ){
                this.$showLoading('rgba')
                let chasInfos=[{mac:this.mac,chasIp:this.chasIp}]
                //controlType 代表语音控制 3（庭前准备、开始庭审）2(休庭、闭庭)
                //trialStatus 1等待（庭前准备一行） 2.正在（开始庭审一行） 3闭庭 4休庭
                //videoString 语音内容
                let res=await this.$http.post('/ecmsChasWeb/chasHandOperate',{controlType,trialStatus,videoString,chasInfos},true)
                this.$hideLoading('rgba')
                if(res)this.$msgs(res.message)
            },
            async getChasInfos(){
                this.$showLoading('rgba')
                let res=await this.$http.post('/ecmsChasWeb/getChasInfos',{},true)
                this.$hideLoading('rgba')
                if(res){
                    if(Number(res.data.videoNumber)>0){
                        for(let i=0;i<res.data.videoNumber;i++){
                            this.videoNumber.push('')
                        }
                    }
                    this.selectList=res.data.chasInfos;
                }
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .auditModule4 {
        .moduleItem {
            border-radius: 5px;
            background-color: rgb(241, 245, 249);
            .moduleTitle {
                padding: 10px;
            }
            .moduleContent {
                margin:10px;
                &>span{
                    display:inline-block;
                    width:100px;
                }
            }
        }
    }
</style>
<style lang="less">
    .auditModule4{
        .el-select{
            width:4rem;
        }
        .el-button{
            padding:0 10px;
            height:35px;
        }
    }
</style>