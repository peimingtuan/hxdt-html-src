<template>
        <div class="addSM_case">
                <!--弹框-->
                <transition name="slide-fade">
                    <div class="third-alert" v-if='isaddSM_case'>
                            <div class="main">
                                    <img class="imgloge" src="../images/CaseManagement/avataradd.png"/>
                                    <img class="alert-close" @click="showAlert" src="../images/alert-close.png" />
                                    <AlertleftTile :text="text" :text2="text2"/>
                                <div  class='tworow5' style='padding-top:0.25rem'>
                                        <div class="choicebox">
                                            <div>
                                                    <el-select v-model="year" placeholder="选择年份">
                                                            <el-option v-for="item in yearlist" :key="item.id" :label="item.name" :value="item.name">
                                                            </el-option>
                                                        </el-select>
                                                        <el-select v-model="courtUnitPronoun" placeholder="选择法院代字">
                                                            <el-option v-for="item in courtUnitPronounlist"  :key="item.courtCode" :label="item.courtPronoun" :value="item.courtPronoun">
                                                            </el-option>
                                                        </el-select>
                                                        <el-select v-model="caseTypePronoun" placeholder="选择案件类型代字">
                                                            <el-option v-for="item in caseTypePronounlist"  :key="item.caseTypeId" :label="item.caseTypePronoun" :value="item.caseTypePronoun">
                                                            </el-option>
                                                        </el-select>
                                                        <el-input v-model="caseNum" placeholder="" style='width:1.5rem;'></el-input>号
                                                        <el-select v-model="statusvalue" placeholder="承办人">
                                                                <el-option v-for="item in options"  :key="item.id" :label="item.name" :value="item.name">
                                                                </el-option>
                                                        </el-select>
                                                        <el-select v-model="statusvalue" placeholder="承办法官">
                                                                <el-option v-for="item in options"  :key="item.id" :label="item.name" :value="item.name">
                                                                </el-option>
                                                        </el-select>
                                                        <el-select v-model="statusvalue" placeholder="审判长/员">
                                                                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
                                                                </el-option>
                                                        </el-select>
                                                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                        <div style='padding:0 0.2rem'>
                                                <el-table ref="multipleTable":data="tableData" tooltip-effect="dark" style="width: 100%"
                                                @selection-change="handleSelectionChange" class='casetable'>
                                                <el-table-column type="selection" width="55"></el-table-column>
                                                <el-table-column prop="ah"label="案号"show-overflow-tooltip>
                                                    </el-table-column>
                                                    <el-table-column prop="tc"label="庭次" show-overflow-tooltip></el-table-column>
                                                    <el-table-column prop="cbfg"label="承办法官" show-overflow-tooltip></el-table-column>
                                                    <el-table-column prop="spz"label="审判长/员" show-overflow-tooltip></el-table-column>                           
                                                    <el-table-column prop="sjy"label="书记员" show-overflow-tooltip></el-table-column>
                                                    <el-table-column prop="dsr"label="当事人"show-overflow-tooltip></el-table-column>
                                                </el-table>
                                        </div>
                                        <div class="up">
                                                <!--分页-->
                                                <el-pagination
                                                        class="page"
                                                        background
                                                        @size-change="handleSizeChange"
                                                        @current-change="handleCurrentChange"
                                                        :current-page=1
                                                        :page-size=9
                                                        layout="total, prev, pager, next, jumper"
                                                        :total=100>
                                                </el-pagination>
                                        </div>
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
        import AlertleftTile from "../component/AlertleftTile"
        export default {
            name: "addSM_case",
            props:{
                isaddSM_case:Boolean,
            },
            components: {
                AlertleftTile,
            },
            data() {
                return {
                    labelPosition: 'left',//form表单左侧靠齐
                    formLabelAlign: {
                        name: '',
                    },
                    text:'案件选择',
                    text2:'选择基本信息',
                    tableData:[{
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安;被告：潘金莲',
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲',
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲'
                    },
                    {
                        'ah':'（2019）粤01民初1234号',
                        'tc':'1',
                        'cbfg':'张三',
                        'spz':'审判长',
                        'sjy':'李四',
                        'dsr':'原告：李三安；被告：潘金莲'
                    }
                ]
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
                    this.$emit('closenewcase');
                },
                sure(){
                    this.$emit('sure');
                },
                cancel(){
                    this.$emit('cancel');
                }
            }
        }
    </script>
    
    <style lang="less">
 @import url('../css/common.less');
    .addSM_case{
        .third-alert{
            position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.1); 
                z-index: 300;
                .main{
                width:16rem;
                padding:0 0.8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,0.20);
                min-height:6.85rem;
                background:#fff;
                position:absolute;
                left:10%;
                top:.5rem;
                border-radius:2px;
                .choicebox{
                    /* .fb(); */
                    .f18();
                             /*select*/
                        .el-select {
                        width: 1.5rem;
                        margin-right: .1rem;
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
                    /*text*/
                    .el-input {
                        width: 1.5rem;
                        margin-right: .1rem;
                        .el-input__inner {
                            height: .4rem;
                            line-height: .4rem;
                            padding: 0 .15rem;
                            .f18();
                        }
                    }
                    .el-button {
                    position: relative;
                    top: -.02rem;
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
            }
        }
                .add{
                cursor:pointer;
                margin-bottom:.1rem;
                }
                /*操作颜色*/
                div.isedit span{
                        color: #409eff;
                }
                /*左上方login*/
                img.imgloge{
                position:absolute;
                top: .2rem;
                left: .2rem;
                width:.4rem;
                }
                /*关闭弹框*/
                img.alert-close{
                    width:.18rem;
                    position:absolute;
                    top: .25rem;
                    right: .35rem;
                    cursor: pointer;
                    z-index:102;
            }
           
        
         
    }
    </style>