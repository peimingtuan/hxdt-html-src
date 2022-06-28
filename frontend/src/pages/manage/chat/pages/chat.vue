<template>
    <transition name="slide-fade">
        <div class="chat">
            <div class="title">
                <div>即时通讯</div>
                <div @click="closeopen"><img src="../images/alert-close.png" /></div>
            </div>
            <div class="main" id="main">
                <div  :class="item.type==1?'other':'oneself'" v-for="(item,index) in list" :key="index">
                    <div class="icon">
                        <img v-if="item.type==1" src="../images/chat/judge.png" />
                        <img v-else-if="item.type==2" src="../images/chat/judgeleader.png" />
                    </div>
                    <div class="content">
                        <div class="name">{{item.userName}}</div>
                        <div class="text">
                            <i v-if="item.type==1" class="el-icon-caret-left"></i>
                            <i v-else class="el-icon-caret-right"></i>
                            {{item.message}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <textarea autofocus v-model.trim="text" @keyup.enter="enter(text)"></textarea>
                <el-button type="primary" @click="enter(text)">发送(Enter)</el-button>
            </div>
        </div>
    </transition>
</template>

<script>
    import $ from 'jquery'
    import FoundationTools from '../../../../js/functionAjax'
    export default {
        name: "chat",
        data() {
            return {
                socket:null,
                text:'',
                list:[],
                mac:JSON.parse(sessionStorage.getItem('cmsuserinfo')).userid+new Date().getTime() || ''
            }
        },
        created() {
        },
        mounted() {
            const _this=this;
            if (window.WebSocket) {
                //创建连接
                 let host=window.location.host;
                // if(port)port=":/"+port;
                 this.socket = new WebSocket("ws://"+host+":19820/ecms/websocket");
                //this.socket = new WebSocket("ws://10.50.24.74:19820/"+_this.mac)
                //接受消息回调方法
                this.socket.onmessage = function(res) {
                        let data=JSON.parse(res.data)
                        if(typeof data==='object'){
                            if(data.method==='sendChatMessage'){
                                let info=data.data;
                                info.type=1;
                                _this.list.push(info)
                            }
                        }
                }
                //连接建立的回调函数
                this.socket.onopen = function() {
                    const param = {
                        method:'registerEcmsServer',
                        requestSource:'ecmsweb',
                        data:{
                                ip:'',
                                mac:_this.mac,
                            }
                        }
                    _this.socket.send(JSON.stringify(param));
                    _this.$http.post('/courtRoomManage/joinChatRoom',{
                        mac:_this.mac,
                        trialPlanId:_this.$route.query.trialPlanId
                    }).then(data =>{
                        if(data.code===200){
                            _this.$msgw('连接开启')
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                }
                this.socket.onerror = function () {
                    _this.$msgw("服务器出错")
                };
                //连接断掉的回调函数
                this.socket.onclose = function() {
                    _this.$msgw('连接关闭')
                }
            } else {
                _this.$msgw("该浏览器不支持WebSocket!");
            }
        },
        destroyed() {
            //连接断掉的回调函数
            this.socket&&this.socket.onclose()
        },
        updated(){
            this.$nextTick(()=>{
                let div=document.getElementById('main');
                div.scrollTop=div.scrollHeight;
            })
        },
        methods: {
            //发送数据
            enter(message){
                const _this=this;
                if(!message){
                    this.$msgw('发送内容不能为空')
                    return
                }
                if (!window.WebSocket) {
                    return;
                }
                //当websocket状态打开
                if(this.socket.readyState == WebSocket.OPEN) {
                    let param={
                        trialPlanId:_this.$route.query.trialPlanId,
                        mac:_this.mac,
                        userName:JSON.parse(sessionStorage.getItem('cmsuserinfo')).userName,
                        message
                    }
                    //this.socket.send(JSON.stringify(param));
                    _this.$http.post('/baseInfo/chatCommunicate',param).then(data =>{
                        if(data.code===200){
                            _this.list.push({
                                type:2,
                                userName:JSON.parse(sessionStorage.getItem('cmsuserinfo')).userName,
                                message
                            })
                            _this.text='';
                        }else{
                            _this.$msgw(data.message);
                        }
                    }).catch(err => {
                        _this.$msge('服务器异常，请稍后重试');
                    })
                } else {
                    this.$msgw("连接没有开启");
                }
            },
            closeopen(){
                window.close()
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../css/common.less');
    *{
        font-size:18px;
    }
    .chat{
        position:fixed;
        top:calc(50% - 378px);
        left:calc(50% - 333px);
        z-index:100;
        width:666px;
        height:756px;
        background: #F5F6F7;
        border-radius:3px;
        box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
        .title{
            padding:0 20px;
            height:56px;
            background: #F2F6FC;
            border-bottom: 1px solid #C0C4CC;
            div{
                font-size:24px;
            }
            .fb();
            img{
                width:18px;
                cursor:pointer;
            }
        }
        .main{
            height:500px;
            border-bottom: 1px solid #C0C4CC;
            overflow: auto;
            padding:10px 20px;
            &>div{
                margin-bottom:20px;
                img{
                    width:40px;
                }
                .name{
                    font-size:14px;
                    color: #909399;
                    margin-bottom:5px;
                }
                .text{
                    padding:10px;
                    background:#fff;
                    border-radius:5px;
                    text-align: justify;
                    position:relative;
                    word-break:break-all;
                }
            }
            .other{
                .fl();
                .icon{
                    margin-right:15px;
                }
            }
            .oneself{
                text-align: right;
                display: flex;
                display: -webkit-flex; /* Safari */
                flex-direction:row-reverse;
                .icon{
                    margin-left:15px;
                }
                .content{
                    .text{
                        background:#2E8DED;;
                        color:#fff;
                    }
                }
            }
        }
        .bottom{
            position:relative;
            padding:10px 20px;
            height:200px;
            textarea{
                border:none;
                outline: none;
                width:100%;
                height:100px;
                overflow: auto;
                padding:5px;
                border-radius:3px;
                resize: none;
                background: #F5F6F7;
            }
        }
    }
</style>
<style lang="less">
    * {
        font-size:18px;
        font-family:"PingFangSC-Regular";
        margin: 0;
        padding: 0;
        color:#333333;
        box-sizing: border-box;
    }
    .chat{
        .el-button{
            padding:10px 20px;
            position:absolute;
            bottom:20px;
            right:20px;
            span{
                font-size:18px;
                color: #fff;
            }
        }
        .el-icon-caret-left:before {
            color: #fff;
            position: absolute;
            top: 5px;
            left: -10px;
        }
        .el-icon-caret-right{
            color: #2E8DED;
            position: absolute;
            top: 5px;
            right: -10px;
        }
    }
</style>