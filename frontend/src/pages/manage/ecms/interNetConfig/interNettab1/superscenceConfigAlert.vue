<template>
    <div class="superscenceConfigAlert">
        <el-form :label-position="labelPosition"
                 :model="formLabelAlign"
                 ref="elForm"
        >
            <el-form-item label="视频输出类型">
                <el-select v-model="formLabelAlign.outputVideoType">
                    <el-option
                            v-for="item in outputVideoTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="输出屏幕编号">
                <el-select v-model="formLabelAlign.screenIndex">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否语音激励">
                <el-select v-model="formLabelAlign.automaticVoice">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="激励画面位置">
                <el-select v-model="formLabelAlign.vadScreenIndex">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="屏幕共享输出位置">
                <el-select v-model="formLabelAlign.sharingLocation">
                    <el-option
                            v-for="item in selectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分割模式">
                <el-select v-model="formLabelAlign.splitMode">
                    <el-option
                            v-for="(item,index) in splitModeList"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否改变分割模式">
                <el-select v-model="formLabelAlign.dynamicMode">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否显示背景图片">
                <el-select v-model="formLabelAlign.backgroundImage">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上行分辨率">
                <el-select v-model="formLabelAlign.resolutionRatio">
                    <el-option
                            v-for="(item,index) in resolutionRatioList"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字幕位置">
                <el-select v-model="formLabelAlign.subtitlePosition">
                    <el-option
                            v-for="item in subtitlePositionList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字体类型">
                <el-select v-model="formLabelAlign.fontType">
                    <el-option
                            v-for="item in fontTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字号">
                <el-input v-model.trim="formLabelAlign.fontSize"></el-input>
            </el-form-item>
            <el-form-item label="字幕内容">
                <el-select v-model="formLabelAlign.subtitleType">
                    <el-option
                            v-for="item in subtitleTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="透明度">
                <el-input v-model.trim="formLabelAlign.transparency"></el-input>
            </el-form-item>
            <el-form-item label="字幕颜色">
                <el-color-picker v-model="formLabelAlign.color"></el-color-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "superscenceConfigAlert",
        data() {
            return {
                outputVideoTypeList:[{id:1,name:'独立屏幕输出'},{id:2,name:'复合屏幕输出'}],
                selectList:[{id:1,name:'第一屏'},{id:2,name:'第二屏'},{id:3,name:'第三屏'},{id:4,name:'第四屏'}],
                splitModeList:['1A','2E','3C','4A','5B','6A','6B','9A'],
                resolutionRatioList:['640x480','1280x720','640x360'],
                subtitlePositionList:[{id:1,name:'左上'},{id:2,name:'左下'},{id:3,name:'右上'},{id:4,name:'右下'},{id:5,name:'中上'},{id:6,name:'中间'},{id:7,name:'中下'},{id:100,name:'自定义'}],
                fontTypeList:[{id:1,name:'仿宋'},{id:2,name:'微软雅黑'}],
                subtitleTypeList:[{id:1,name:'诉讼地位'},{id:2,name:'当事人名称'},{id:255,name:'诉讼地位+当事人名称'}],
                labelPosition: 'left',
                formLabelAlign: {
                    outputVideoType:1,
                    screenIndex:'',
                    automaticVoice:false,
                    vadScreenIndex:1,
                    sharingLocation:1,
                    splitMode:'1A',
                    dynamicMode:false,
                    backgroundImage:true,
                    resolutionRatio:'',
                    subtitlePosition:1,
                    fontType:1,
                    fontSize:'',
                    subtitleType:1,
                    color:'',
                    transparency:1
                },
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            async getETGSViewOutputConfig(etgsId){
                let res=await this.$http.post('/etgsViewOutputConfig/getETGSViewOutputConfig',{etgsViewOutputConfig:{etgsId}},true,'加载中...')
                if(res){
                    for(let i in res.data){
                        this.formLabelAlign[i]=res.data[i]
                    }
                }
            },
            async saveETGSViewOutputConfig(){
                if(this.formLabelAlign.screenIndex){
                    if(this.formLabelAlign.screenIndex===this.formLabelAlign.vadScreenIndex){
                        this.$msgw('输出屏幕编号与激励画面位置不能一样')
                        return
                    }
                }
                let res=await this.$http.post('/etgsViewOutputConfig/saveETGSViewOutputConfig',{etgsViewOutputConfig:this.formLabelAlign},true,'保存中...')
                if(res){
                    this.$msgs("保存成功")
                    this.$parent.$parent.configShow=false
                }
            },
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="less">
    @import url("../../css/common.less");
    .superscenceConfigAlert {
        margin:0 .8rem;
        background: #ECEFF0;
        min-height:4rem;
        max-height:6rem;
        overflow: auto;
        padding:.2rem;
        .el-form{
            .f-s-b();
            flex-wrap: wrap;
            /*label*/
            .el-form-item__label{
                .f18();
                width:1.8rem!important;
            }
            .el-form-item__content{
                margin-left:1.8rem!important;
            }
            /*input框*/
            .el-input{
                width:3.5rem;
                .el-input__inner {
                    height: .4rem;
                    line-height: .4rem;
                    padding: 0 .15rem;
                    .f18();
                }
            }
            .el-textarea{
                width:6rem;
            }
        }
    }
</style>
<style lang="less">

</style>