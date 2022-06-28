<template>
        <div class="fileExport">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-if="isfileExport">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/弹出导出.png" />
                            <img class="alert-close" @click="showAlert" src="../images/alert-close.png"/>
                        <div class="head">
                            文件导出<br/>
                            <span>请求选择playlist文件</span>
                        </div>
                        <div class="content">
                            <el-row>
                                    <span>你想打开或者保存文件吗</span>  <br>
                                    <span>名称:xxxxx3</span>  <br>
                                    <span>类型:工作表 5.13kb</span>                         
                            </el-row>
                        </div>
                          <!--底部按钮-->
                       <div class="bt">
                            <div class="qure" @click='sure'>
                                <img src="../images/sure.png" />打开
                            </div>
                            <div class="qure" @click='save'>
                                    <img src="../images/sure.png" />保存
                            </div>
                            <div class="土" @click='cancel'>
                                <img src="../images/cancel.png" />取消
                            </div>
                        </div>
                    </div>
                     
                </div>
            </transition>
        </div>
    </template>
    <script>
        export default {
            name: "fileExport",
            props:{
                isfileExport:Boolean,
                wareshow:Function,
                // sure:Function,
                // cancel:Function,
            },
            components: {
            },
            data() {
                return {
                    // files:"",
                    // fileName: '',
                    // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                }
            },
            beforeCreate() {
    
            },
            created() {
    
            },
            mounted() {
    
            },
            destroyed() {
    
            },
            methods: {
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('wareshow');
                },
                sure(){
                    //console.log(22)
                    this.$emit('sure');
                },
                save(){
                    this.$emit('save');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    
    <style lang="less" scoped>
        .fileExport{
            .alert-window2{
                .main {
                    width: 6.21rem;
                    height: 3.27rem;
                    padding: 0 .8rem;
                    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.20);
                    /*min-height:6.85rem;*/
                    background: #fff;
                    position: absolute;
                    left: 42%;
                    top: 3rem;
                    margin-left: -2.11rem;
                    /*margin-top:-3.425rem;*/
                    border-radius: 2px;
                    /*左上方login*/
    
                    img.imgloge {
                        position: absolute;
                        top: .2rem;
                        left: .2rem;
                        width: .4rem;
                    }
    
                    /*关闭弹框*/
    
                    img.alert-close {
                        width: .18rem;
                        position: absolute;
                        top: .25rem;
                        right: .35rem;
                        cursor: pointer;
                        z-index: 1002;
                    }
                    /*头部*/
                    .head{
                        width:100%;
                        padding:.15rem 0;
                        height:.6rem;
                        font-size: 0.2rem;
                        span{
                            font-size:0.14rem;
                            color: rgba(0,0,0,0.54);
                        }
                    }
                    /*主体*/
                    .content{
                        /* .f18(); */
                        padding:0.4rem 0  0.3rem 0;
                        color: rgba(0,0,0,0.54);
                        line-height:.24rem;
                    }
                    .bt{
                   display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    margin:0.2rem 0;
                    &>div{
                        cursor:pointer;
                        font-size: 0.2rem;
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                 
                    /* .fc(); */
                    .qure{
                        color: #45A1D1;
                        margin-right:.5rem;
                    }
                }
                }
    }
  }
    </style>