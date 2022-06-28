<template>
    <transition name="slide-fade">
        <div class='alert-window2 about' v-show="isShow">
            <div class="about-main">
                <img class="imgloge" src="../images/about/about.png" />
                <img class="alert-close" @click="isShow=false" src="../images/alert-close.png" />
                <alertleft-tile
                        :text="text"
                        :text2="text2"
                />
                <div class="content">
                    <div>版本号:{{version}}</div>
                    <div>{{copyright}}</div>
                    <div>官网:{{officialWebsite}}</div>
                </div>
                <!--底部按钮-->
                <div class="alertBtn">
                    <div class="qure" @click="sure">
                        <img src="../images/courtsupervision/sure.png" />确定
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
    
    <script>
        import $ from "jquery"
        import alertleftTile from './AlertleftTile'
        import alertBtn from './alertBtn'
        export default {
            name: "about",
            components:{
                alertleftTile,
                alertBtn
            },
            data() {
                return {
                    text:'关于',
                    text2:'最新版本',
                    isShow:false,
                    version:"",
                    copyright:"",
                    officialWebsite:""
                }
            },
            created() {
    
            },
            mounted() {
                
            },
            destroyed() {
    
            },
            methods: {
                getAboutInfo(){
                    const that=this;
                    that.$showToast('加载中...')
                    that.$http.post('/aboutInfo/getAboutInfo', {

                    }).then(data => {
                        that.$hideToast()
                        if (data.code === 200) {
                            that.version=data.data.version;
                            that.copyright=data.data.copyright;
                            that.officialWebsite=data.data.officialWebsite;
                        } else {
                            that.$msgw(data.message)
                        }
                    }).catch(err => {
                        that.$hideToast()
                    })
                },
                sure(){
                    this.isShow=false
                }
            }
        }
    </script>
    <style lang="less" scoped>
        @import "../css/common";
        .about{
            &-main{
                width:8rem;
                padding:0 .8rem;
                box-shadow: -5px 5px 5px 0 rgba(38,78,119,.2),5px -3px 3px 0 rgba(38,78,119,.2);
                background:#fff;
                position:absolute;
                left:50%;
                top:1.5rem;
                margin-left:-4rem;
                border-radius:2px;
                @import url('../css/alertimg.less');
                .content{
                    margin:.5rem 0;
                    div{
                        color:#757575;
                        line-height:2;
                    }
                }
                .alertBtn{
                    border-top:1px solid #e0e0e0;
                    width:100%;
                    padding:.2rem 0;
                    &>div{
                        cursor:pointer;
                        .f20();
                        line-height:.3rem;
                    }
                    img{
                        width:.2rem;
                        margin-right:.05rem;
                    }
                    .fr();
                    .qure{
                        color: #45A1D1;
                    }
                }
            }
        }
    </style>