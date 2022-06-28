<template>
        <div class="importfile">
            <!--弹框-->
            <transition name="slide-fade">
                <div class="alert-window2" v-if="isimportfile">
                    <div class="main">
                        <img class="imgloge" src="../images/CaseManagement/弹出导入.png" />
                        <img class="alert-close" @click="showAlert" src="../images/alert-close.png"/>
                        <div class="head">
                            文件导入<br/>
                            <span>重要警告</span>
                        </div>
                        <div class="content">
                            <el-row>
                                    <span>选择本地文件</span>                                
                            </el-row>
                            <el-row>
                                <el-col :span=22>
                                        <el-input v-model="input" style='width:4rem' placeholder="当事人"></el-input>
                                </el-col>
                                <el-col :span=2> 
                                        <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="doUpload"
                                        :limit="1"
                                        :file-list="fileList"
                                        :before-upload="beforeUpload">
                                        <el-button slot="trigger" size="small">...</el-button>
                                  </el-upload> 
                                </el-col>
                            </el-row>
                            <!-- <span><el-input></el-input></span> -->
                                <!-- <el-upload
                                    class="upload-demo"
                                    ref="upload"
                                    action="doUpload"
                                    :limit="1"
                                    :file-list="fileList"
                                    :before-upload="beforeUpload">
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
                                    <!-- <el-button href="./static/moban.xlsx" download="模板"><el-button size="small" type="success">下载模板</el-button></a> -->
                                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                                    <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div> -->
                                    <!-- <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div> -->
                              <!-- </el-upload>  -->
                                <!-- <span slot="footer" class="dialog-footer">
                                  <el-button @click="visible = false">取消</el-button>
                                  <el-button type="primary" @click="submitUpload()">确定</el-button>
                                </span> -->
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
            name: "importfile",
            props:{
                isimportfile:Boolean,
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
                submitUpload() {
                    debugger
                    console.log('上传'+this.files.name)
                    if(this.fileName == ""){
                    this.$message.warning('请选择要上传的文件！')
                    return false
                    }
                    let fileFormData = new FormData();
                    fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
                    let requestConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    }
                    this.$http.post(`/basedata/oesmembers/upload?companyId=`+this.company, fileFormData, requestConfig).then((res) => {
                        debugger
                        if (data && data.code === 0) {
                        this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                    })  
                },
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            // handlePreview(file) {
            //     console.log(file);
            // },
            // handleExceed(files, fileList) {
            //     this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            // },
            // beforeRemove(file, fileList) {
            //     return this.$confirm(`确定移除 ${ file.name }？`);
            // },
                //注册弹框显示与否事件
                showAlert() {
                    this.$emit('wareshow');
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
        @import url('../css/common.less');
        .importfile{
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
                        padding:0.8rem 0  0.3rem 0;
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