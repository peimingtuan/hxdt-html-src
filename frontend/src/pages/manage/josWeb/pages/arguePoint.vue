<template>
    <div class="arguePoint">
        <!--toast-->
        <div class="toast" v-if="toast">
            <i :class="icon?'el-icon-warning':'el-icon-success'"></i>
            {{msg}}
        </div>
        <!--查看pdf弹框-->
        <checkpdf ref="checkpdf" />
        <div class="empty" v-if="result.length===0">
            暂无信息
        </div>
        <div v-else>
            <!--第一种情况非精细化-->
            <div v-if="!result[0].supportAnalsis">
                <!--非精细化案由+参与合议的法官-->
                <div class="main" v-if="userId!=lawId">
                    <ol>
                        <li class="main-text1" v-for="(item,index) in result[0].argumentfocusList" :key="index">
                            <div>{{item.argumentfocusName}}
                                <img class="argument-img" v-if="item.argumentfocusType==1" src="../images/courtOutline/fagaun.png"/>
                            </div>
                            <div v-for="(its,index2) in item.electronicFileList" :key="index2">
                                <div class="underline" v-if="its.relevantEvidenceName!='-'">
                                    <span  @click="openpdf(its.electronicFilePdfUrl)" >{{its.relevantEvidenceName}}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
                <!--非精细化案由+承办法官-->
                <div class="main" v-else>
                    <ol>
                        <li class="main-text2" v-for="(item,index) in result[0].argumentfocusList" :key="index">
                            <div class="add-input">
                                <el-input v-model.trim="item.argumentfocusName" @blur="blur(result[0],index)"></el-input>
                                <img class="del" @click="delInput(index,result[0],item.argumentfocusId)" src="../images/arguePoint/del.png"/>
                            </div>
                            <div v-for="(its,index2) in item.electronicFileList" :key="index2">
                                <div class="underline" v-if="its.relevantEvidenceName!='-'">
                                    <span  @click="openpdf(its.electronicFilePdfUrl)" >{{its.relevantEvidenceName}}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                    <div class="add-icon" @click="addInput(result[0].argumentfocusList)">
                        <img src="../images/arguePoint/add.png"/>
                        新增
                    </div>
                </div>
            </div>
            <!--第二种情况精细化-->
            <div v-else>
                <!--精细化案由+参与合议的法官-->
                <div class="main" v-if="userId!=lawId">
                    <div class="main-top">
                        <div class="main-top-head">
                            <div class="le">{{result[0].argumentfocusStageName}}</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
                        </div>
                        <transition name="slide-fade">
                            <div class="main-top-cont main-top-cont2" v-if="turn">
                                <ol>
                                    <li class="main-text3" v-for="(item,index) in result[0].argumentfocusList" :key="index">
                                        <div>{{item.argumentfocusName}}
                                            <img class="argument-img" v-if="item.argumentfocusType==1" src="../images/courtOutline/fagaun.png"/>
                                        </div>
                                        <div v-for="(its,index2) in item.electronicFileList" :key="index2">
                                            <div class="underline" v-if="its.relevantEvidenceName!='-'">
                                                <span  @click="openpdf(its.electronicFilePdfUrl)" >{{its.relevantEvidenceName}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </transition>
                    </div>
                    <div class="main-content" v-if="index>0" v-for="(item,index) in result" :key="index">
                        <div class="main-content-head">
                            <div class="le">{{item.argumentfocusStageName}}</div>
                        </div>
                        <div class="main-top-cont main-top-cont2">
                            <ol>
                                <li class="main-text3" v-for="(its,index2) in item.argumentfocusList" :key="index2">
                                    <div>{{its.argumentfocusName}}
                                        <img class="argument-img" v-if="its.argumentfocusType==1" src="../images/courtOutline/fagaun.png"/>
                                    </div>
                                    <div v-for="(it,index3) in its.electronicFileList" :key="index3">
                                        <div class="underline" v-if="it.relevantEvidenceName!='-'">
                                            <span  @click="openpdf(it.electronicFilePdfUrl)" >{{it.relevantEvidenceName}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <!--精细化案由+承办法官-->
                <div class="main" v-else>
                    <div class="main-top">
                        <div class="main-top-head">
                            <div class="le">{{result[0].argumentfocusStageName}}</div>
                            <div class="ri" @click="turnshow">
                                <span v-if="turn">收起</span>
                                <span v-else>展开</span>
                                <img :class="turn?'transform':''" src="../images/courtOutline/xl.png"/>
                            </div>
                        </div>
                        <transition name="slide-fade">
                            <div class="main-top-cont" :class="result.length===2?'':'main-top-cont2'" v-if="turn">
                                <ol>
                                    <li class="main-text3" v-for="(item,index) in result[0].argumentfocusList" :key="index">
                                        <el-button class="add-btn" :class="item.buttonStatus==1?'addcolor':''" v-if="result.length===2" @click="addBtn(item)">添加</el-button>
                                        <div>{{item.argumentfocusName}}
                                            <img class="argument-img" v-if="item.argumentfocusType==1" src="../images/courtOutline/fagaun.png"/>
                                        </div>
                                        <div v-for="(its,index2) in item.electronicFileList" :key="index2">
                                            <div class="underline" v-if="its.relevantEvidenceName!='-'">
                                                <span  @click="openpdf(its.electronicFilePdfUrl)" >{{its.relevantEvidenceName}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </transition>
                    </div>
                    <div class="main-content"  v-if="index>0" v-for="(item,index) in result" :key="index">
                        <div class="main-content-head">
                            <div class="le">{{item.argumentfocusStageName}}</div>
                        </div>
                        <div class="main-content-cont"  v-if="result.length===3 && index==1" >
                            <ol>
                                <li class="main-text3" v-for="(its,index2) in item.argumentfocusList" :key="index2">
                                    <div>{{its.argumentfocusName}}
                                        <img class="argument-img" v-if="its.argumentfocusType==1" src="../images/courtOutline/fagaun.png"/>
                                    </div>
                                    <div v-for="(it,index3) in its.electronicFileList" :key="index3">
                                        <div class="underline" v-if="it.relevantEvidenceName!='-'">
                                            <span  @click="openpdf(it.electronicFilePdfUrl)" >{{it.relevantEvidenceName}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div class="main-content-cont" v-else>
                            <ol>
                                <li class="main-text4" v-for="(its,index2) in item.argumentfocusList" :key="index2">
                                    <div class="add-input">
                                        <el-input v-model.trim="its.argumentfocusName" @blur="blur(item,index2)"></el-input>
                                        <img class="del" @click="delInput2(index2,item,its.argumentfocusId)" src="../images/arguePoint/del.png"/>
                                        <img v-if="its.newAdd" class="newbuilt" src="../images/arguePoint/new.png"/>
                                    </div>
                                    <div v-for="(it,index3) in its.electronicFileList" :key="index3">
                                        <div class="underline" v-if="it.relevantEvidenceName!='-'">
                                            <span  @click="openpdf(it.electronicFilePdfUrl)" >{{it.relevantEvidenceName}}</span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                            <div class="add-icon" @click="addInput(item.argumentfocusList)">
                                <img src="../images/arguePoint/add.png"/>
                                新增
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="save" v-if="userId==lawId">
                <el-checkbox v-model="result[0].shareParty">同时共享给当事人</el-checkbox>
                <el-button type="primary" v-if="!result[0].supportAnalsis&&result[0].argumentfocusList.length>0" @click="sendinfo(result[0].shareParty)">发送给书记员</el-button>
                <el-button type="primary" v-else-if="result.length>1&&result[0].supportAnalsis&&result[1].argumentfocusList.length>0" @click="sendinfo(result[0].shareParty)">发送给书记员</el-button>
                <el-button type="primary" v-else class="disable">发送给书记员</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Toast from '../component/toast'
    import checkpdf from  '../component/checkpdf'
    export default {
        name: "arguePoint",
        components: {
            checkpdf
        },
        data() {
            return {
                userId:"",//用户Id
                caseNumber:"",//案号
                courtTime:'',//庭次,
                courtCode:'',//法院代码
                lawId:'',//法官id
                turn: false,
                toast: false,
                icon: true,
                msg: '该争议焦点已存在',
                result: []
            }
        },
        async created() {
            this.$showLoading();
            this.userId=this.$route.query.userId;
            this.caseNumber=this.$route.query.caseNumber;
            this.courtTime=this.$route.query.courtTime;
            this.courtCode=this.$route.query.courtCode;
            this.lawId=this.$route.query.undertakerId;//承办法官id
            await this.updateinfo();
            await this.getInfo();
            this.$hideLoading();
        },
        watch:{
            icon(v){
                if(v)this.msg='该争议焦点已存在'
                else this.msg='已发送至书记员！'
            }
        },
        mounted(){

        },
        methods: {
            //获取争议焦点信息
            getInfo(){
                let {userId,caseNumber,courtTime,courtCode}=this;
                let _this=this;
                return  _this.$http.post('/client/jos/web/getArgumentfocusInfo',{
                            userId,//用户id
                            caseNumber,//案号
                            courtTime,//庭次
                            courtCode,//法院代码
                        }).then(data =>{
                            if(data.code===200){
                                _this.result=data.data;
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //实时上传分析争议焦点信息
            updateinfo(){
                let {userId,caseNumber,courtTime,courtCode}=this;
                let _this=this;
               return  _this.$http.post('/client/jos/web/analysisArgumentfocus',{
                            userId,//用户id
                            caseNumber,//案号
                            courtTime,//庭次
                            courtCode,//法院代码
                        }).then(data =>{
                            if(data.code!==200){
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //展开内容
            turnshow(){
                this.turn=!this.turn;
            },
            //打开pdf文档
            openpdf(pdfFileUrl){
                this.$refs.checkpdf.url=pdfFileUrl;
                this.$refs.checkpdf.alertshow=true;
            },
            //添加
            addBtn(item){
                let _this=this;
                if(item.buttonStatus==1){//可点击
                    let param=JSON.parse(JSON.stringify(_this.result[1]));
                    param.type=1;//添加类型 1为添加按钮2为新增按钮
                    param.argumentfocusList=[item];
                    param.argumentfocusList[0].resourceId=item.argumentfocusId
                    param.flag=1//1新增，2修改
                    _this.$http.post('/client/jos/web/saveOrUpdateArgumentfocusInfo',param).then(data =>{
                        if(data.code===200){
                            //_this.result[1].argumentfocusList.push(item);
                            _this.getInfo()
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }else{
                    _this.toast=true;
                    setTimeout(()=>{
                        _this.toast=false;
                    },2000)
                }
            },
            //增加输入框
            addInput(argumentfocusList){
                argumentfocusList.push({
                    "argumentfocusId": "",//争议焦点id
                    "argumentfocusStageId":'', //争议焦点阶段主键id
                    "argumentfocusName": "",//争议焦点名称
                    "argumentfocusType": "",//争议焦点类型
                    "electronicFileList": [
                    ]
                })
            },
             //非精细化删除信息，减少输入框
            delInput(index,item,argumentfocusId){
                console.log(item)
                let type=1;
                if(item.buttonStatus)type=2;
                let _this=this;
                    _this.$confirm('确认删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(item.entityId&&argumentfocusId){
                            _this.$http.post('/client/jos/web/deleteArgumentfocusInfo',{
                                entityId:item.entityId,//主键id
                                argumentfocusId,//争议焦点id
                                type,
                            }).then(data =>{
                                if(data.code===200){
                                    //item.argumentfocusList.splice(index,1)//物理删除
                                    _this.$msgs('删除成功!');
                                    _this.getInfo()
                                }else{
                                    _this.$msgw(data.message);
                                }
                            }).catch(err => {
                                _this.$msge('服务器异常，请稍后重试');
                            })
                        }else{
                            _this.result[0].argumentfocusList.splice(index,1)//物理删除
                            _this.$msgs('删除成功!');
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            },
            //精细化删除信息，减少输入框
            delInput2(index,item,argumentfocusId){
                console.log(item)
                let type=1;
                if(item.buttonStatus)type=2;
                let _this=this;
                _this.$confirm('确认删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(item.entityId&&argumentfocusId){
                        _this.$http.post('/client/jos/web/deleteArgumentfocusInfo',{
                            entityId:item.entityId,//主键id
                            argumentfocusId,//争议焦点id
                            type,
                        }).then(data =>{
                            if(data.code===200){
                                //item.argumentfocusList.splice(index,1)//物理删除
                                _this.$msgs('删除成功!');
                                _this.getInfo()
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$msge('服务器异常，请稍后重试');
                        })
                    }else{
                        _this.result[1].argumentfocusList.splice(index,1)//物理删除
                        _this.$msgs('删除成功!');
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            //失去焦点保存
            blur(item,index){
                if(!item.argumentfocusList[index].argumentfocusName){
                    this.$msgw('请输入内容！');
                    return false
                }
              let _this=this;
              let param=JSON.parse(JSON.stringify(item));
                param.argumentfocusList=[param.argumentfocusList[index]]
                if(param.argumentfocusList[0].hasOwnProperty('buttonStatus'))param.type=1
                else param.type=2 //添加类型 1为添加按钮2为新增按钮
                param.flag=2//添加 1新增，2修改
                param.userId=_this.userId
                _this.$showLoading();
                _this.$http.post('/client/jos/web/saveOrUpdateArgumentfocusInfo',param).then(data =>{
                    if(data.code===200){
                        _this.getInfo().then(()=>{
                            _this.$hideLoading();
                            _this.$msgs('保存成功!');
                        }).catch(err=>{
                            _this.$hideLoading();
                        })
                    }else{
                        _this.$hideLoading();
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideLoading();
                    _this.$msge('服务器异常，请稍后重试');
                })

            },
            //发送给书记员
            sendinfo(shareParty){
                if(!shareParty)shareParty=false;
                let {userId,caseNumber,courtTime,courtCode}=this;
                let _this=this;
                _this.$http.post('/client/jos/web/sendClerk',{
                    userId,//用户Id
                    caseNumber,//案号
                    courtTime,//庭次,
                    shareParty,//是否共享给当事人
                    courtCode, //法院代码
                    entityId:_this.result[_this.result.length-1].entityId//处于阶段
                }).then(data =>{
                    if(data.code===200){
                        _this.$msgs('发送成功!');
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .arguePoint{
        width:100%;
        padding:30px 20px;
        .toast{
            position:fixed;
            left:30%;
            top:40%;
            z-index:100;
            width:40%;
            padding:10px;
            border-radius:5px;
            color:#fff;
            text-align: center;
            background:rgba(0,0,0,.6);
            .el-icon-warning{
                color:#e6a23c;
                margin-right:5px;
                &:before{
                    .f20();
                }
            }
            .el-icon-success{
                color:#67c23a;
                margin-right:5px;
                &:before{
                    .f20();
                }
            }
        }
        .empty{
            margin:100px auto;
            .cb();
            .f22();
            text-align: center;
        }
        .main{
            div{
                .f20();
                line-height:26px;
            }
            /*承办法官图标*/
            .argument-img{
                margin-left:5px;
                width:45px;
            }
            .underline{
                margin:10px 0;
                span{
                    .cb();
                    text-decoration:underline;
                    cursor:pointer;
                    .f20();
                }
            }
            .transform{
                transform:rotate(180deg);
                -webkit-transform:rotate(180deg);
            }
            /*第一种情况*/
            &-text1{
                margin-bottom:10px;
            }
            /*第二种情况*/
            &-text2,&-text4{
                .add-input{
                    margin-bottom:10px;
                    .el-input{
                        width:80%;
                    }
                    img.del{
                        width:22px;
                        margin-left:5px;
                        cursor:pointer;
                    }
                    img.newbuilt{
                        /*position:absolute;*/
                        width:50px;
                        position:relative;
                        top:-22px;
                        right:80px;
                    }
                }
            }
            /*第三种情况*/
            &-top,&-content{
                margin-bottom:20px;
                &-head{
                    padding:10px 20px;
                    border-bottom:1px solid #DCDFE6;
                    .fb();
                    .le{
                        border-left:4px solid #1989FA;
                        padding-left:10px;
                        line-height:26px;
                    }
                    .ri{
                        .cb();
                        cursor:pointer;
                    }
                }
                &-cont{
                    padding:10px 20px;

                }
                /*box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);*/
                box-shadow: -1px 1px 1px 0 rgba(38,78,119,.2),1px -1px 1px 0 rgba(38,78,119,.2);
            }
            &-top-cont{
                padding-left:110px;
            }
            &-top-cont2{
                padding-left:40px;
            }
            &-content-cont{
                padding-left:40px;
            }
            &-text3{
                position:relative;
                /*padding-left:70px;*/
                .add-btn{
                    position:absolute;
                    left:-90px;
                    padding:0;
                    width:60px;
                    line-height:24px;
                    border: 1px solid #C0C4CC;
                    span{
                        color: #C0C4CC;
                        .f18();
                    }
                }
                .addcolor{
                    border: 1px solid #2E8DED;
                    span{
                        color:#2E8DED;
                    }
                }
            }
            .add-icon{
                cursor:pointer;
                width:100px;
                margin:5px 0;
                .cb();
                img{
                    width:22px;
                }
            }
        }
        .save{
            margin:10px 0;
            text-align: right;
            .el-checkbox__inner{
                .wh(18px,18px);
                &:after{
                    height: 9px;
                    left: 6px;
                }
            }
            .el-checkbox__label{
                .f18()
            }
            .el-button {
                width:165px;
                line-height:42px;
                padding: 0;
                span{
                    .f20();
                    color: #fff;
                }
            }
            .disable{
                background: #C0C4CC;
                border:1px solid #C0C4CC;
            }
        }
    }
</style>