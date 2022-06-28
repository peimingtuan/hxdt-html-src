<template>
        <div class="agentinfo">
                <!--弹框-->
        <transition name="slide-fade">
            <div class='alert-window' v-if='isagentinfo'>
                    <div class="main">
                        <el-row class='onerow2'>
                                        <img class="imgloge" src="../images/CaseManagement/avataradd.png" />
                                        <img class="alert-close" @click="closenewcase" src="../images/alert-close.png" />
                                        <div class="head">代理人信息
                                        </div>
                        </el-row>
                        <div class="content">
                            <el-row>
                                <el-col :span=12>
                                        <el-row class='tt'>
                                                <el-col :span=4>
                                                <div class='title'>代理人类型</div>
                                                </el-col>
                                                <el-col :span=20>
                                                     <el-row class='firstboxone'>
                                                             <el-select v-model="value" placeholder="2019"></el-select>
                                                     </el-row>
                                                </el-col>
                                            </el-row>
                                            <el-row class='tt'>
                                                 <el-col :span=4>
                                                 <div class='title'>代理种类</div>
                                                 </el-col>
                                                 <el-col :span=20>
                                                      <el-row>
                                                              <el-select v-model="value" placeholder="先予执行"></el-select>
                                                      </el-row>
                                                 </el-col>
                                             </el-row>
                                             <el-row class='tt'>
                                                     <el-col :span=4>
                                                     <div  class='title'>证件类型</div>
                                                     </el-col>
                                                     <el-col :span=20>
                                                          <el-row>
                                                                <el-select v-model="value" placeholder="先予执行"></el-select>
                                                          </el-row>
                                                     </el-col>
                                                 </el-row>
                                                 <el-row class='tt'>
                                                        <el-col :span=4>
                                                        <div  class='title'>手机号码</div>
                                                        </el-col>
                                                        <el-col :span=20>
                                                             <el-row>
                                                                   <el-input></el-input>
                                                             </el-row>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row class='tt'>
                                                            <el-col :span=4>
                                                            <div  class='title'>姓名</div>
                                                            </el-col>
                                                            <el-col :span=20>
                                                                 <el-row>
                                                                       <el-input></el-input>
                                                                 </el-row>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class='tt'>
                                                                <el-col :span=4>
                                                                <div  class='title'>证件号码</div>
                                                                </el-col>
                                                                <el-col :span=20>
                                                                     <el-row>
                                                                            <el-input></el-input>
                                                                        </el-row>
                                                                </el-col>
                                                            </el-row>
                                                            <el-row class='tt'>
                                                                    <el-col :span=4>
                                                                    <div  class='title'>与当事人关系</div>
                                                                    </el-col>
                                                                    <el-col :span=20>
                                                                         <el-row>
                                                                                <el-input></el-input>
                                                                            </el-row>
                                                                    </el-col>
                                                                </el-row>
                                                                <el-row class='tt'>
                                                                        <el-col :span=4>
                                                                        <div  class='title'>所属单位</div>
                                                                        </el-col>
                                                                        <el-col :span=20>
                                                                             <el-row>
                                                                                    <el-input></el-input>
                                                                             </el-row>
                                                                        </el-col>
                                                                </el-row>
                                </el-col>
                                <el-col :span=12>
                                     
                                </el-col>
                            </el-row>
                        </div>
                            <!--底部按钮-->
                            <div class="bt">
                                    <div class="qure" @click='sure'>
                                        <img src="../images/sure.png" />确定
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
            name: "agentinfo",
            props:{
                isagentinfo:Boolean,
                Schedulingshow:Function,
            },
            data() {
                return {
                    radio:"",
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
                closenewcase() {
                    this.$emit('Schedulingshow');
                },
                sure(){
                    //console.log(22)
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    
    <style lang="less" scoped>
        .agentinfo{
            /*操作颜色*/
            div.isedit{
                    color: #409eff;
            }
            /*操作颜色*/
            div.isedit span{
                    color: #409eff;
            }
            .alert-window{
                position:absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.1);
                z-index: 444!important;
                .main{
                    width:12rem;
                    padding:0 0.8rem;
                    box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                    /*min-height:6.85rem;*/
                    background:#fff;
                    position:absolute;
                    left:60%;
                    top:.5rem;
                    /*margin-top:-3.425rem;*/
                    border-radius:2px;
                    .content{
                    height: 7.15rem;
                    width: 100%;
                    margin: 0 auto;
                    background: #eceff0;
                        .tt{
                            padding-bottom:0.1rem;
                        }
                        .tt:nth-child(1){
                            padding-top:0.2rem;
                        }
                    }
                    .bt{
                       display: flex;
                        display: -webkit-flex; /* Safari */
                        justify-content: center;
                        align-items: center;
                        width:100%;
                        margin:0.3rem 0;
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
                               /*左上方login*/
                    img.imgloge{
                                    position:absolute;
                                    top: .2rem;
                                    left: 0rem;
                                    width:.4rem;
                                }
                    /*头部*/
                    .head{
                                    width:100%;
                                    padding:0.25rem 0  0 .4rem;
                                    height:.6rem;
                                    font-size: 0.2rem;
                                    span{
                                        font-size: 0.14rem;
                                        color: rgba(0,0,0,0.54);
                                    }
                    }
                    img.alert-close {
                                    width: .18rem;
                                    position: absolute;
                                    top: .25rem;
                                    right: -0.4rem;
                                    cursor: pointer;
                    }
                }
                
            }
        }
    </style>