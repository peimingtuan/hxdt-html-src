<template>
    <div class='webfirst'>
        <div class="head">
            <img src="../images/colorWhite.png">
                {{title}}
        </div>
        <div class='heightcss'>
            <el-carousel
                    trigger="click"
                    arrow="always"
                    indicator-position="outside"
                    :interval=interval
                    @change='change'
                    :autoplay=autoplay>
                    <el-carousel-item v-for="(item,index) in lists" :key="index">
                        <div  class='docx'  v-if="item.type==2" ref='bannerHeight'>
                            {{item.content}}
                        </div>
                        <div class='img' v-else-if="item.type==1">
                            <img :src=item.url>
                        </div>
                        <div  class='banner' v-else-if="item.type==3">
                            <video class="video_play video" controls style="width:100%; object-fit:fill"  poster="">
                                <source :src=item.url type="video/ogg">
                                <source :src=item.url type="video/mp4">
                            </video>
                        </div>
                    </el-carousel-item> 
            </el-carousel> 
        </div>
    </div>
</template>

<script>

import $ from "jquery"
export default {
    //注册子组件
    components: {
        
    },
    data() {
        return {
            autoplay:true,//是否自动切换
            interval:0,//自动切换的时间间隔，单位为毫秒
            title:'智慧庭审当事人端',
            mac:"",
            courtCode:"",
             lists:[],
            video1:null,
        }
    },
    watch:{
        // video1(v){
        //    if(v) {
        //         this.player()
        //    }
        // },
        // autoplay(v){
        //     if(!v&&this.video1)this.player()
        // }
    },
    computed: {
        
    },
    created(){
        this.getfirst();
    },
    beforeMount:function(){
        //  this.height = $(window).width()*920/1640 + 'px';
    },
    mounted() {
        // this.imgLoad();
        // window.addEventListener('resize',()=>{
        //      this.bannerHeight=this.$refs.bannerHeight[0].height
        //      this.imgLoad();
        // })
    },
    methods: {
          //请求首页信息
            getfirst(){
                    let _this=this;
                _this.$http.post('/client/api/getPartyLoginConfig', {
                    mac:_this.$route.query.mac,
                    courtCode:_this.$route.query.courtCode
                }).then(data => {
                    if(data.code===200){
                        _this.lists=data.data.playerList;
                        _this.interval=data.data.interval;
                        _this.autoplay=data.data.autoplay;
                        _this.$nextTick(()=>{
                            if(_this.lists.length===1){
                                $(".el-carousel__arrow i").css("cursor","not-allowed")
                                //$(".el-carousel__arrow").hide()
                            }
                        })
                    }else{
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
        //左右切换
        change(n){
            this.video1=document.getElementsByClassName("video_play");
            for(let i=0;i<this.video1.length;i++){
                this.video1[i].pause();
            }
        },
        player(){
                let that=this;
            // that.video1.ontimeupdate=function() {
            //     console.log(that.video1.paused)
            //     if(that.video1.paused){
            //         that.autoplay=true;
            //         that.interval=2000
            //         console.log("播放")
            //     }else{
            //         console.log("暂停")
            //         that.autoplay=false
            //         that.interval=0
            //     }
            // }
        }
    } 
}
</script> 





<style lang = 'less'>
    @import url('../css/common.less');
    .webfirst {
        width:100vw;
        height:100vh;
        .head{
            .img{
                /* width:100%; */
            }
            font-size:24px;
            color:#fff;
            padding: 20px 40px;
        }
        .heightcss{
            /*height: 100%;*/
        }
        .el-carousel__container {
            position: relative;
            width: 80%;
            margin: 0 auto;
            height:75vh;
        }
        .el-carousel__arrow{
            /* width:40px;
            height:40px; */
            /* font-size:20px; */
        }
        .el-icon-arrow-left:before{
            font-size: 5vw;
        }
        .el-icon-arrow-right:before{
            font-size: 5vw;
        }
        .el-carousel__item div{
            height: 100%;
        }
        .el-carousel__arrow{
            width: 5vw;
            height: 5vw;
            background: rgba(0,0,0,0);
        }
        .el-carousel__arrow:hover{
            background: rgba(0,0,0,0);
        }
        .el-carousel__arrow--left{
            left:-5vw;
        }
        .el-carousel__arrow--right{
            right:-5vw;
        }
        .docx{
            background:#fff;
            font-size:18px;
        }
        .img img{
            width:100%;
            height:100%;
        }
        .banner video {
        width: 100%;
        height: 100%;
        display: block;}
    }
</style>