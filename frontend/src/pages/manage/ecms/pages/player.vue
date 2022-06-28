<template>
  <div class='player_box'>
      <div class="top">
        <object id="PBMOCX" name="PBMOCX" classid="clsid:FDE96237-3604-4707-ADD2-CA9B9EA47D8A" style="width:100%;height:100%;"></object>
      </div>
      <div class="bottom" v-show="isshow==1">
        <el-button type="primary" @click="openchat">庭审指导</el-button>
      </div>
  </div>
</template>

<script>
    import Tool from '../js/tools'
export default {
  name:'player',
  data() {
    return {
        isshow:1,
      playOcx:null,
    }
  },
  computed:{
      playUrls(){
          return this.$store.state.playXmls
      }
  },
  mounted() {
    this.isshow = this.$route.query.btn;
      if(Tool.isIE()){
          this.initPlayer();
      }else{
          alert("该播放器仅支持IE浏览器");
      }
    //console.log(this.playUrls)
  },
  // 组件销毁后调用
  destroyed: function () {
    if(this.playOcx){
      this.playOcx.ChnsysPBM_Stop();
    }
  },
  methods: {
    initPlayer(){
      try{
        this.playOcx = document.getElementById('PBMOCX');
        this.playOcx.ChnsysPBM_Start(this.playUrls);
      }catch(e){
        alert("播放器可能出现问题，请下载合适的播放器！");
      }
    },
    openchat(){
      //if(!this.$refs.chat.isShow)this.$refs.chat.isShow=true;
        const {href} = this.$router.resolve({
            path: '/chat',
            query: {
                name:123,
            }
        });
        window.open(href,'_blank', 'height=800, width=800, top=20, right=100, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no,alwaysRaised=yes,z-look=yes')
    }
  }
}
</script>

<style lang = 'less' scoped>
  .player_box{
    width:100vw;
    height:100vh;
    overflow: hidden;
    background:#fff;
    .top{
      height:90vh;
    }
    .bottom{
      margin:20px;
    }
  }
</style>
