<template>
  <div class='player_box2'>
    <object id="player_Id" classid="clsid:D278A5CB-03EF-473E-AF6E-A35E095DEDDF" style="width:100%;height:100%;"></object>
  </div>
</template>

<script>
export default {
  name:'player_box2',
  data() {
    return {
      player:'',
    }
  },
  computed: {

  },
  mounted() {
    const that=this;
    that.player = document.getElementById("player_Id");
    window.onbeforeunload = function () {
      if (that.isIE()) {
        that.player.ChnsysPlayerOcx_StopAll();
        that.player.ChnsysPlayerOcx_Destroy();
      }
    };
    that.showViewInWin(that.$route.query.playUrls,2);//播放
  },
  // 组件销毁后调用
  destroyed: function () {

  },
  methods: {
    /**
     * 判断是否是IE浏览器
     * @returns {boolean}
     */
    isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
      else
        return false;
    },
    /**
     * 显示 播放
     * @param url
     * @param type
     * @returns {boolean}
     */
    showViewInWin(url,type) {
      let t = this;
      try {
        t.player.ChnsysPlayerOcx_Create(2, "点播", true);
        t.player.ChnsysPlayerOcx_SetFloatingCtlBarShow(true);
        for (var i = 0; i < url.length; i++) {
          let name = url[i].perspective;
          let urls = url[i].urls;
          for (var j = 0; j < urls.length; j++) {
            t.player.ChnsysPlayerOcx_SetLocationURL(i + 1, urls[j],0, name);
          }
        }
        t.player.ChnsysPlayerOcx_SetSkin(1);//设置播放器的颜色
        t.player.ChnsysPlayerOcx_SetTransMode(1, 1);//设置传输模式TCP
        t.player.ChnsysPlayerOcx_SetTopControlShow(true);
        t.player.ChnsysPlayerOcx_SetMute(false);
        t.player.ChnsysPlayerOcx_SetPlayerLayout("1");
        t.player.ChnsysPlayerOcx_SetFrameFullPlayerRect(true, 1);
      } catch (e) {
        alert('没有安装播放器，请安装后刷新页面重试！');
        return false;
      }

      t.player.ChnsysPlayerOcx_StartAll();

      return true;
    },
  }
}
</script>

<style lang = 'less' scoped>
  .player_box2{
    width:100vw;
    height:100vh;
  }
</style>
