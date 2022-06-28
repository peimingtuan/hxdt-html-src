<template>
    <div class="othertabpane4">
        <div class="othertabpane4-top">
            播放器摆放位置
        </div>
        <div class="othertabpane4-head">
            <div class="othertabpane4-head-div1">
                <div class="item" v-for="(item,index) in radioList" :key="index" @click="select(index)">
                    <img class="icon" v-if="item.selected" :src=item.bgur2 />
                    <img class="icon" v-else :src=item.bgur />
                </div>
            </div>
            <div class="othertabpane4-head-div2">
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="数字1显示">
                        <el-select v-model="formLabelAlign.region1">
                            <el-option
                                    v-for="item in regionlist"
                                    :key="item.name"
                                    :label="item.value"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数字2显示">
                        <el-select v-model="formLabelAlign.region2">
                            <el-option
                                    v-for="item in regionlist"
                                    :key="item.name"
                                    :label="item.value"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数字3显示">
                        <el-select v-model="formLabelAlign.region3">
                            <el-option
                                    v-for="item in regionlist"
                                    :key="item.name"
                                    :label="item.value"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="othertabpane4-content">
            <div class="othertabpane4-content-div">
                <div class="othertabpane4-content-div-top bold">
                    区域显示配置
                </div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="画面名称">
                        <el-select v-model="formLabelAlign.screenNameDisplay">
                            <el-option
                                    v-for="item in screenNameDisplaylist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信息提示">
                        <el-select v-model="formLabelAlign.messageDisplay">
                            <el-option
                                    v-for="item in messageDisplaylist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="othertabpane4-content-div">
                <div class="othertabpane4-content-div-top bold">
                    案件显示、播放列表显示配置
                </div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="字体颜色">
                        <el-select v-model="formLabelAlign.messageWordColor" placeholder="请选择">
                            <el-option
                                    v-for="item in doubleClicklist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                        <el-select v-model="formLabelAlign.messageBackgroundColor" placeholder="请选择">
                            <el-option
                                    v-for="item in doubleClicklist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="othertabpane4-content-div">
                <div class="othertabpane4-content-div-top bold">
                    播放器操作配置
                </div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="双击">
                        <el-select v-model="formLabelAlign.doubleClick" placeholder="请选择">
                            <el-option
                                    v-for="item in doubleClicklist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="左键拖拽">
                        <el-select v-model="formLabelAlign.leftDrag" placeholder="请选择">
                            <el-option
                                    v-for="item in leftDraglist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开关灯">
                        <el-select v-model="formLabelAlign.openLight" placeholder="请选择">
                            <el-option
                                    v-for="item in openLightlist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="othertabpane4-content-div">
                <div class="othertabpane4-content-div-top bold">
                    片头显示配置
                </div>
                <el-form :label-position="labelPosition" :model="formLabelAlign">
                    <el-form-item label="是否显示">
                        <el-select v-model="formLabelAlign.isShow" placeholder="请选择">
                            <el-option
                                    v-for="item in isShowlist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示时长">
                        <el-input v-model="formLabelAlign.showtimelength"></el-input>秒
                    </el-form-item>
                    <el-form-item label="字体颜色">
                        <el-select v-model="formLabelAlign.fontcolor" placeholder="请选择">
                            <el-option
                                    v-for="item in doubleClicklist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="字体字号">
                        <el-select v-model="formLabelAlign.movieWordSize" placeholder="请选择">
                            <el-option
                                    v-for="item in doubleClicklist"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="othertabpane4-content-div">
                <div class="othertabpane4-content-div-top bold">
                    片头内容配置
                </div>
                <div class="checkbox-div">
                    <el-checkbox v-for="item in moviecontentlist" :key="item.id" v-model="item.id">{{item.name}}</el-checkbox>
                </div>
            </div>
        </div>
        <!--底部保存-->
        <div class="othertabpane4-btn">
            <el-button type="primary" @click="savePlayConfiginfo">保存</el-button>
        </div>
    </div>
</template>

<script>
    import {otherconfig} from "./datajson"
    export default {
        name: "othertabpane4",
        data() {
            return {
                radioList:otherconfig.radioList,
                regionlist:[{name:'player',value:'播放器'},{name:'list',value:'信息展示'},{name:'note',value:'笔录'}],//区域1内容,palyer-播放器，list-信息展示，note-笔录
                screenNameDisplaylist:[{id:true,value:'显示'},{id:false,value:'不显示'}],//画面名称是否显示,1-显示，0-不显示
                messageDisplaylist:[{id:1,value:'只显示播放列表'},{id:2,value:'只显示案件'},{id:3,value:'两者都显示'}],//信息显示,1-只显播放列表，2-只显示案件，3-两者都显示
                doubleClicklist:[{id:1,value:'数码拉伸'},{id:2,value:'全屏'}],//双击设置,1-数码拉伸，2-全屏
                leftDraglist:[{id:1,value:'数码拉伸'},{id:2,value:'窗口交换'}],//左键拖拉,1-数码拉伸2-窗口交换
                openLightlist:[{id:'on',value:'开灯'},{id:'off',value:'关灯'}],//开关灯,on-开灯，off-关灯
                isShowlist:[{id:0,value:'不显示'},{id:1,value:'显示'}],//是否显示(0 不显示 1 显示)
                ismain:false,
                labelPosition: 'left',//form表单左侧靠齐
                formLabelAlign:{
                    playConfigId:'',//播放配置id  可以为空，空就是设置
                    playPattern:'',//播放布局模式
                    region1:'player',//区域1内容,palyer-播放器，list-信息展示，note-笔录
                    region2:'',//区域2内容,palyer-播放器，list-信息展示，note-笔录
                    region3:'',//区域3内容,palyer-播放器，list-信息展示，note-笔录
                    messageWordColor:'播放信息字体颜色',//播放信息字体颜色,颜色十六进制值，格式如（255，225，255）
                    messageBackgroundColor:'播放信息背景颜色',//播放信息背景颜色
                    screenNameDisplay:0,//画面名称是否显示,1-显示，0-不显示
                    messageDisplay:1,//信息显示,1-只显播放列表，2-只显示案件，3-两者都显示
                    doubleClick:1, //双击设置,1-数码拉伸，2-全屏
                    leftDrag:1,//左键拖拉,1-数码拉伸2-窗口交换
                    playListLineSpacing:2,//播放器列表行间距
                    openLight:'on',//开关灯,on-关灯，off-开灯
                    isShow:0,//是否显示(0 不显示 1 显示)
                    showtimelength:1,//是否显示时长
                    fontcolor:'字体颜色',//字体颜色,颜色十六进制值，格式如（255，225，255）
                    movieWordSize:10,//字号大小
                    moviecontent:'',//片头内容
                },
                moviecontentlist:[
                    {id:false,name:'法院'},
                    {id:false,name:'书记员'},
                    {id:false,name:'审判长'},
                    {id:false,name:'案号'},
                    {id:false,name:'开庭地点'},
                    {id:false,name:'审判员'},
                    {id:false,name:'案由'},
                    {id:false,name:'开庭时间'},
                    {id:false,name:'人民陪审员'},
                    {id:false,name:'当事人'},
                    {id:false,name:'承办部门'}
                ],
                // courtRoomName:false,//法院
                // secretary:false,//书记员
                // chiefJudge:false,//审判长
                // casename:false,//案号
                // utilname:false,//开庭地点
                // judge:false,//审判员
                // caseconcept:false,//案由
                // startdate:false,//开庭时间
                // judgepeople:false,//人民陪审员
                // dsr:false,//当事人
                // divisions:false,//承办部门
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取播放器配置信息
            getPlayConfiginfo(){
                let _this=this;
                _this.$showLoading('rgba');
                return  _this.$http.post('/otherConfig/searchPlayConfig', {

                        }).then(data =>{
                            _this.$hideLoading('rgba');
                            if(data.code===200){
                                _this.formLabelAlign=data.data;
                                let array=data.data.moviecontent.split('');
                                array.map((item,index)=>{
                                    if(item==1)_this.moviecontentlist[index].id=true
                                    else _this.moviecontentlist[index].id=false
                                })
                            }else{
                                _this.$msgw(data.message);
                            }
                        }).catch(err => {
                            _this.$hideLoading('rgba');
                            _this.$msge('服务器异常，请稍后重试');
                        })
            },
            //背景图片选择项
            select(index){
                let arr = this.radioList.slice();
                arr.map(item=>{
                    item.selected = false
                })
                arr[index].selected = true;
                this.formLabelAlign.playPattern=arr[index].id;//选中项
                this.radioList = arr;
            },
            //保存播放器配置信息
            savePlayConfiginfo(){
                let {formLabelAlign}=this;
                // for(let i in formLabelAlign){
                //     //formLabelAlign2[i]
                // }
                let _this=this;
                let array=[];
                _this.moviecontentlist.map((item,index)=>{
                    if(item.id==true)array[index]=1
                    else array[index]=0
                })
                this.formLabelAlign.moviecontent=array.join('')
                _this.$showToast('正在保存...')
                _this.$http.post('/otherConfig/setPlayConfig',formLabelAlign).then(data =>{
                    _this.$hideToast()
                    if(data.code===200){
                        _this.$msgs('保存成功');
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$hideToast()
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .othertabpane4{
        .othertabpane4-top{
            padding:0 .2rem;
            line-height:.5rem;
            background: #E4E7E8;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
        }
        .othertabpane4-head{
            padding:.2rem;
            background: #ECEFF0;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
            &-div1{
                .fb();
                cursor:pointer;
                .icon{
                    width:1.6rem;
                }
            }
            &-div2{
               .el-form{
                   margin-top:.2rem;
                   .fb();
                   .el-form-item{
                       margin-bottom:.1rem;
                   }
                   /*label*/
                   .el-form-item__label{
                       .f18();
                       width:1.3rem!important;
                   }
                   .el-form-item__content{
                       margin-left:1.3rem!important;
                   }
                   /*input框*/
                   .el-input{
                       width:3rem;
                       .el-input__inner {
                           height: .4rem;
                           line-height: .4rem;
                           padding: 0 .15rem;
                           .f18();
                       }
                   }
               }
            }
        }
        .othertabpane4-content{
            margin-top:.2rem;
            padding:.2rem;
            background: #ECEFF0;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
            .f-s-b();
            flex-wrap:wrap;
            &-div{
                &-top{
                    line-height:.5rem;
                }
                .el-form{
                    .el-form-item{
                        margin-bottom:.1rem;
                    }
                    /*label*/
                    .el-form-item__label{
                        .f18();
                        width:1.3rem!important;
                    }
                    .el-form-item__content{
                        margin-left:1.3rem!important;
                    }
                    /*input框*/
                    .el-input{
                        width:3rem;
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }
                }
                /*checkbox*/
                .checkbox-div{
                    width:8rem;
                    .fl();
                    flex-wrap: wrap;
                    .el-checkbox{
                        margin-left:0;
                        margin-right:.5rem;
                        margin-top:.5rem;
                        .el-checkbox__label{
                            .f18();
                        }
                    }
                }
            }
        }
        /*底部保存*/
        .othertabpane4-btn{
            margin:.5rem 0;
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