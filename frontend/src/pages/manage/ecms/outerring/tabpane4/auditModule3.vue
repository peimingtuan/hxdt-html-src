<template>
    <div class="auditModule3">
        <spring-box :alertShow.sync="alertShow" :mainText="mainText" @sure="choiceSureAdd">
            <main-alert ref="mainAlert"/>
        </spring-box>
        <div class="moduleItem">
            <!--<p class="moduleTitle">旁听辅助</p>-->
            <div class="moduleContent">
                <el-form
                        ref="form"
                        :label-position="labelPosition"
                        label-width="252px"
                        :model="formLabelAlign"
                >
                    <el-form-item label="排期状态集合" prop="openSelect">
                        <el-checkbox-group v-model="chasTrialStatusArr">
                            <el-checkbox label="等待开庭" name="1" style=""></el-checkbox>
                            <el-checkbox label="正在开庭" name="2" style=""></el-checkbox>
                            <el-checkbox label="庭审结束" name="3" style=""></el-checkbox>
                            <el-checkbox label="休庭" name="4" style=""></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="排期状态排序">
                        <el-input v-model.trim="chasTrialStatusOrdersStr" readonly></el-input>
                        <el-button class="choice-btn" type="primary" @click="openChoiceAlert()">选择</el-button>
                    </el-form-item>
                    <el-form-item label="排期时间排序">
                        <el-select v-model="formLabelAlign.chasTrialOrders" placeholder="请选择">
                            <el-option
                                    v-for="innerItem in chasTrialOrdersList"
                                    :key="innerItem.id"
                                    :label="innerItem.name"
                                    :value="innerItem.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="声控有效角色">
                        <el-select v-model="controlChasVal" multiple placeholder="请选择">
                            <el-option
                                    v-for="innerItem in roleInfolist"
                                    :key="innerItem.audioRoleId"
                                    :label="innerItem.audioRoleName"
                                    :value="innerItem.audioRoleId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="saveInfo">
                <el-button type="primary" @click="saveBtn">保存设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "auditModule3",
        components:{
            springBox:()=>import("../../component/springBox/springBox"),
            mainAlert:()=>import("./mainAlert")
        },
        data() {
            return {
                mainText:'排期状态排序',
                alertShow:false,
                roleInfolist:[],//角色名称
                chasTrialOrdersList:[{id:'1',name:'升序'},{id:'2',name:'降序'}],
                labelPosition: "left",
                formLabelAlign: {
                    chasTrialStatus: "",//排期状态集合1－等待开庭2－正在开庭3－庭审结束4－休庭
                    chasTrialOrders: "",//时间升序降序1升序；2降序
                    controlChas:'',//控制角色
                    chasTrialStatusOrders: ""//根据状态排序范围1－等待开庭2－正在开庭3－庭审结束4－休庭
                },
                controlChasVal:[],
                chasTrialStatusArr:[],
                chasTrialStatusOrdersStr:''
            }
        },
        created() {
        },
        mounted() {
            this.getAudioRoleInfo()
        },
        methods: {
            //角色名称select
            getAudioRoleInfo(){
                let _this=this;
                return _this.$http.post('/getAudioRoleInfo',{}).then(data =>{
                    if(data.code===200){
                        _this.roleInfolist=data.data;
                    }else{
                        _this.$msgw(data.message);
                    }
                    return data
                }).catch(err => {
                    console.log(err,'/getAudioRoleInfo')
                    _this.$msge('服务器异常，请稍后重试');
                    throw err
                })
            },
            getChasConfig(){
                let _this = this;
                _this.$showLoading("rgba");
                _this.$http.post("/chasInfoConfig/getChasConfig", {})
                    .then(data => {
                        _this.$hideLoading("rgba");
                        if (data.code === 200) {
                            for(let i in data.data){
                                _this.formLabelAlign[i] = data.data[i];
                            }
                            let arr=[{id:1,name:'等待开庭'},{id:2,name:'正在开庭'},{id:3,name:'庭审结束'},{id:4,name:'休庭'}],arr1=[],arr2=[];
                            if(data.data.chasTrialStatus)arr1=data.data.chasTrialStatus.split(",")
                            arr.map(item=>{
                                if(arr1.includes(String(item.id)))this.chasTrialStatusArr.push(item.name)
                            })
                            if(data.data.chasTrialStatusOrders)arr2=data.data.chasTrialStatusOrders.split(",")
                            this.$refs.mainAlert.trialStatusArr=arr2.map((item,index)=>{
                                let n=null
                                switch(Number(item)){
                                    case 1:
                                        n='等待开庭';
                                        this.$refs.mainAlert.wait=index+1;
                                        break;
                                    case 2:
                                        n='正在开庭';
                                        this.$refs.mainAlert.open=index+1;
                                        break;
                                    case 3:
                                        n='庭审结束';
                                        this.$refs.mainAlert.finish=index+1;
                                        break;
                                    case 4:
                                        n='休庭';
                                        this.$refs.mainAlert.sleep=index+1;
                                        break;
                                }
                                return n
                            })
                            this.chasTrialStatusOrdersStr=this.$refs.mainAlert.trialStatusArr.join(",")
                            if(data.data.controlChas)this.controlChasVal=data.data.controlChas.split(",")
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideLoading("rgba");
                        console.log(err,"/chasInfoConfig/getChasConfig")
                    });
            },
            openChoiceAlert(){
                this.alertShow=true;
                if(this.chasTrialStatusOrdersStr){
                    this.$refs.mainAlert.trialStatusArr=this.chasTrialStatusOrdersStr.split(',')
                    this.$refs.mainAlert.wait=0;
                    this.$refs.mainAlert.open=0;
                    this.$refs.mainAlert.finish=0;
                    this.$refs.mainAlert.sleep=0;
                    this.$refs.mainAlert.trialStatusArr.map((item,index)=>{
                        switch(item){
                            case '等待开庭':
                                this.$refs.mainAlert.wait=index+1;
                                break;
                            case '正在开庭':
                                this.$refs.mainAlert.open=index+1;
                                break;
                            case '庭审结束':
                                this.$refs.mainAlert.finish=index+1;
                                break;
                            case '休庭':
                                this.$refs.mainAlert.sleep=index+1;
                                break;

                        }
                    })
                }
            },
            choiceSureAdd(){
                if(this.$refs.mainAlert.trialStatusArr.length===0){
                    this.$msgw("请勾选排期状态")
                    return
                }
                let arr2=[];
                arr2=this.$refs.mainAlert.trialStatusArr.map(item=>{
                    let n=null
                    switch(item){
                        case '等待开庭':
                            n=1;
                            break;
                        case '正在开庭':
                            n=2;
                            break;
                        case '庭审结束':
                            n=3;
                            break;
                        case '休庭':
                            n=4;
                            break;

                    }
                    return n
                })
                this.formLabelAlign.chasTrialStatusOrders=arr2.join(',')
                this.chasTrialStatusOrdersStr=this.$refs.mainAlert.trialStatusArr.join(",")
                this.alertShow=false;
            },
            saveBtn(){
                let _this=this;
                let { formLabelAlign } = this;
                _this.$showToast("正在保存...")
                let arr=[{id:1,name:'等待开庭'},{id:2,name:'正在开庭'},{id:3,name:'庭审结束'},{id:4,name:'休庭'}],arr1=[];
                arr.map(item=>{
                    if(this.chasTrialStatusArr.includes(item.name))arr1.push(item.id)
                })
                formLabelAlign.chasTrialStatus=arr1.join(',')
                formLabelAlign.controlChas=this.controlChasVal.join(",")
                _this.$http
                    .post("/chasInfoConfig/saveChasConfig",formLabelAlign)
                    .then(data => {
                        _this.$hideToast()
                        if (data.code === 200) {
                            _this.$msgs("保存成功")
                        } else {
                            _this.$msgw(data.message);
                        }
                    })
                    .catch(err => {
                        _this.$hideToast()
                        console.log(err,"/chasInfoConfig/saveChasConfig")
                    });
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less" scoped>
    .auditModule3 {
        .moduleItem {
            border-radius: 5px;
            background-color: rgb(241, 245, 249);
            .moduleTitle {
                padding: 10px;
            }
            .moduleContent {
                overflow: auto;
                /*height: calc(50vh - 100px);*/
                padding: 0 20px;
            }
            .saveInfo{
                box-shadow: 1px -2px 2px #e8e8e8;
                text-align: center;
                padding:5px 0;
            }
        }
    }
</style>
<style lang="less">
    .auditModule3{
        .main-box{
            width:10rem!important;
        }
        .el-input{
            width:5rem;
        }
        .el-button{
            padding:0 10px;
            height:40px;
        }
        .choice-btn{
            height:35px;
        }
    }
</style>