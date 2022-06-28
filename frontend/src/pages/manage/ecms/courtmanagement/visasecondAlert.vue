<template>
    <div class="visasecondAlert">
        <transition name="slide-fade">
            <div class="second-alert" v-if="showAlert">
                <div class="content">
                    <secondHead :secondtitle="secondtitle" @showAlert2="showAlert=false"/>
                    <div class="content-div1">
                        <div class="content-div1-cnt">
                            <div>姓名： {{nameinfo.clerkName}}</div>
                            <div>单位： {{nameinfo.unit}}</div>
                            <div>部门： {{nameinfo.department}}</div>
                        </div>
                        <div class="content-div1-cnt">
                            <div>职务： {{nameinfo.duty}}</div>
                            <div>电话： {{nameinfo.phoneNumber}}</div>
                            <!--<div>IM： {{nameinfo.iM}}</div>-->
                        </div>
                        <div class="content-div1-img">
                            <!--<img :src=nameinfo.picture />-->
                            <!--<img src="../images/courtsupervision/1560584793.jpg"/>-->
                        </div>
                    </div>
                    <div class="content-div2">
                        <el-button @click="showAlert=false">确定</el-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import secondHead from "./secondHead"//二次弹框title
    export default {
        name: "visasecondAlert",
        components: {
            secondHead,
        },
        data() {
            return {
                secondtitle:'身份信息',//弹框头部信息
                nameinfo:'',//人物信息
                showAlert:false,
            }
        },
        created() {

        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            //获取人物信息
            getinfo(info){
                let _this=this;
                _this.showAlert=true;
                _this.nameinfo=info;
                if(info.judgeName){//书记员和承办法官工用一套展示逻辑
                    _this.nameinfo.clerkName=info.clerkName;
                }
            }
        }
    }
</script>

<style lang="less">
    @import url('../css/common.less');
    .visasecondAlert{
        .content{
            position:absolute;
            left:50%;
            margin-left:-4rem;
            top:2rem;
            width:8rem;
            background: #fff;
            border-radius: 2px;
            box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, .2),5px -3px 3px 0 rgba(38, 78, 119, .2);
            &-div1{
                padding:.2rem;
                &-cnt{
                    background: #eceff0;
                    .f-s-b();
                    flex-wrap: wrap;
                    padding:.1rem;
                    &>div{

                    }
                }
                &-img{
                    padding:.2rem 0;
                    text-align: center;
                    background: #eceff0;
                    img{
                        width:1.5rem;
                    }
                }
            }
            &-div2{
                margin:.2rem;
                text-align: center;
                /*button*/
                .el-button {
                    width: 1.2rem;
                    line-height: .4rem;
                    padding: 0;
                    background:#409eff;
                    span {
                        .f18();
                        color: #fff;
                    }
                }
            }
        }
    }
</style>