<template>
  <div class="setinfoAlert3">
    <!--二次弹框-->
    <transition name="slide-fade">
      <div class="second-alert" v-if="secondshow">
        <div class="second-main">
          <img class="imgloge" src="../images/yingyongpeizhi/addlaw.png" />
          <img class="alert-close" @click="secondshow=false" src="../images/alert-close.png" />
          <AlertleftTile :text="text" :text2="text2" />
          <div class="content-info2">
            <div class="content-info2-div1">
              <el-form :label-position="labelPosition" :model="formLabelAlign">
                <el-form-item label="字幕内容设置">
                  <el-checkbox v-model="setlawname">法庭名称</el-checkbox>
                  <el-checkbox v-model="setcase">案号</el-checkbox>
                  <el-checkbox v-model="setdraw">画面名称</el-checkbox>
                  <el-checkbox v-model="settime">系统时间</el-checkbox>
                </el-form-item>
                <el-form-item label="自定义字幕">
                  <el-input
                    type="textarea"
                    v-model="formLabelAlign.subtitleContent"
                    placeholder="......"
                  ></el-input>
                </el-form-item>
                <!--<el-form-item label="客户端类型">-->
                <!--<el-select v-model="formLabelAlign.clientType">-->
                <!--<el-option-->
                <!--v-for="item in clientTypeklist"-->
                <!--:key="item.id"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                字幕样式设置:
                <br />
                <el-form-item label="位置">
                  <el-select v-model="formLabelAlign.contentPosition">
                    <el-option
                      v-for="(item,index) in locationlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-select v-model="formLabelAlign.contentColor">
                    <el-option
                      v-for="(item,index) in colorlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="显示时长">
                  <el-input type="text" v-model="formLabelAlign.contentDuration"></el-input>分
                </el-form-item>系统时间设置:
                <br />
                <el-form-item label="位置">
                  <el-select v-model="formLabelAlign.timePosition">
                    <el-option
                      v-for="(item,index) in locationlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-select v-model="formLabelAlign.timeColor">
                    <el-option
                      v-for="(item,index) in colorlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="显示时长">
                  <el-input type="text" v-model="formLabelAlign.timeDuration"></el-input>分
                </el-form-item>
              </el-form>
            </div>
          </div>
          <alertBtn @cancel="secondshow=false" @qure="sureAlert2" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AlertleftTile from "../component/AlertleftTile"; //二次弹框title
import alertBtn from "../component/alertBtn"; //二次弹框底部按钮
export default {
  name: "setinfoAlert3",
  components: {
    AlertleftTile,
    alertBtn
  },
  data() {
    return {
      text: "客户端添加",
      text2: "详细数据显示",
      secondshow: false, //二次弹框
      locationlist: [
        { id: "NONE", name: "不显示" },
        { id: "UPPER_LEFT", name: "左上" },
        { id: "LOWER_LEFT", name: "左下" },
        { id: "UPPER_RIGHT", name: "右上" },
        { id: "LOWER_RIGHT", name: "右下" }
      ], //字幕,系统显示位置select
      colorlist: [
        { id: "WHITE", name: "白色" },
        { id: "BLACK", name: "黑色" },
        { id: "RED", name: "红色" },
        { id: "BLUE", name: "蓝色" },
        { id: "YELLOW", name: "黄色" },
        { id: "GREEN", name: "绿色" }
      ], //字幕,系统显示位置select
      setlawname: false,
      setcase: false,
      setdraw: false,
      settime: false,
      formLabelAlign: {
        //表单信息
        createTime: "", //创建日期
        timestamp: "", //时间戳
        sortOrder: "", //排序号
        deleteFlag: "", //删除标记
        validityFlag: "", //是否有效
        pullFlowType: "", //解码拉流方式
        viewId: "", //视角id
        signalSourceId: "", //信号源id
        outputDeviceName: "", //输出设备名称
        extranetChannelName: "", //外网直播频道名
        intranetChanneUrl: "", //内网直播频道url
        intranetChannelName: "", //内网直播频道名
        signalSourceType: "", //编解类型(1编码2解码)
        recordInSign: "", //签名阶段是否录制（1是0否）
        record: "", //庭审阶段是否录制
        ecosRecord: "", //ECOS是否录制(1是，0否)
        liveBurn: "", //是否实时刻录(1是，0否)
        courtRoomName: "", //法庭名称
        flowAddress: "", //流地址
        viewName: "", //视角名称
        flowType: "", //流类型
        channelNum: "", //通道号
        courtRoomId: "", //法庭id
        viewLocation: "", //画面位置
        startIntranetChannel: "", //是否开启内网直播通道
        startExtranetChannel: "", //是否开启外网直播通道
        captionsSource: "", //字幕内容
        subtitleContent: "", //自定义字幕内容
        contentPosition: "", //字幕显示位置 0不显示  1 左上  2左下  3 右上  4 右下
        contentDuration: "", //字幕样式显示时长
        contentColor: "", //字幕颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
        timePosition: "", //字幕叠加系统时间显示位置
        timeColor: "", //字幕叠加系统时间字体颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
        timeDuration: "", //系统时间设置显示时长
        bitratePosition: "1", //字幕叠加码率显示位置
        bitrateColor: "0", //	字幕叠加码率字体颜色
        bitrateDuration: "", //字幕码率显示时长
        pushSubtitle: "", //是否设置字幕 1是 0否
        pushTime: "", //是否设置时间 1是0否
        courtDeviceModel: "", //法庭设备类型
        courtDeviceModelName: "" //法庭设备类型名称
      }
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    //打开弹框,修改逻辑处理
    show(row, trialRoomId) {
      this.secondshow = true;
      console.log(row);
      if (row) {
        //修改逻辑处理
        this.formLabelAlign = row;
      } else {
        this.formLabelAlign = {
          //表单信息
          sortOrder: "", //排序号
          deleteFlag: "", //删除标记
          validityFlag: "", //是否有效
          pullFlowType: "", //解码拉流方式
          viewId: "", //视角id
          signalSourceId: "", //信号源id
          outputDeviceName: "", //输出设备名称
          extranetChannelName: "", //外网直播频道名
          intranetChanneUrl: "", //内网直播频道url
          intranetChannelName: "", //内网直播频道名
          signalSourceType: "", //编解类型(1编码2解码)
          recordInSign: "", //签名阶段是否录制（1是0否）
          record: "", //庭审阶段是否录制
          ecosRecord: "", //ECOS是否录制(1是，0否)
          liveBurn: "", //是否实时刻录(1是，0否)
          courtRoomName: "", //法庭名称
          flowAddress: "", //流地址
          viewName: "", //视角名称
          flowType: "", //流类型
          channelNum: "", //通道号
          courtRoomId: trialRoomId, //法庭id
          viewLocation: "", //画面位置
          startIntranetChannel: "", //是否开启内网直播通道
          startExtranetChannel: "", //是否开启外网直播通道
          captionsSource: "", //字幕内容
          subtitleContent: "", //自定义字幕内容
          contentPosition: "", //字幕显示位置 0不显示  1 左上  2左下  3 右上  4 右下
          contentDuration: "", //字幕样式显示时长
          contentColor: "", //字幕颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
          timePosition: "", //字幕叠加系统时间显示位置
          timeColor: "", //字幕叠加系统时间字体颜色 0 白色 1 黑色 2 红色 3 蓝色 4 黄色 5 绿色
          timeDuration: "", //系统时间设置显示时长
          bitratePosition: "1", //字幕叠加码率显示位置
          bitrateColor: "0", //	字幕叠加码率字体颜色
          bitrateDuration: "", //字幕码率显示时长
          pushSubtitle: "", //是否设置字幕 1是 0否
          pushTime: "", //是否设置时间 1是0否
          courtDeviceModel: "", //法庭设备类型
          courtDeviceModelName: "" //法庭设备类型名称
        };
      }
    },

    //设置字幕确定保存编辑信息,新增或修改信号源配置信息
    sureAlert2() {
      let { formLabelAlign } = this;
      let _this = this;
      let array = [
        _this.setlawname,
        _this.setcase,
        _this.setdraw,
        _this.settime
      ]; //字幕内容设置
      array = array.map(item => {
        if (item === true) item = 1;
        else item = 0;
        return item;
      });
      formLabelAlign.captionsSource = array.join("");
      _this.$http
        .post("/courtRoomConfig/saveOrUpdateSubtitleSet", formLabelAlign)
        .then(data => {
          if (data.code === 200) {
            _this.secondshow = false;
            _this.$msgs("保存成功");
            _this.$parent.$parent.$parent.httpinfo2(); //更新列表
          } else {
            _this.$msgw(data.message);
          }
        })
        .catch(err => {
          console.log(err, "/courtRoomConfig/saveOrUpdateSubtitleSet");
          _this.$msge("服务器异常，请稍后重试");
        });
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.setinfoAlert3 {
  /*二次弹框*/
  .second-main {
    position: absolute;
    left: 50%;
    margin-left: -6rem;
    top: 1.2rem;
    width: 12rem;
    background: #fff;
    border-radius: 2px;
    padding: 0 0.8rem;
    box-shadow: -5px 5px 5px 0 rgba(38, 78, 119, 0.2),
      5px -3px 3px 0 rgba(38, 78, 119, 0.2);
    .secondHead {
      background: #cbe5f3;
    }
    .content-info2 {
      background: #eceff0;
      &-div1 {
        padding: 0.2rem;
        .el-form {
          padding: 0.2rem;
          background: #e3e7e8;
          .b(1px, #c6c6c6);
          .el-form-item {
            margin-bottom: 0.1rem;
          }

          /*label*/

          .el-form-item__label {
            .f18();
            width: 1.8rem !important;
          }

          .el-form-item__content {
            margin-left: 1.8rem !important;
            .f18();
          }

          /*input框*/

          .el-input {
            width: 3rem;
            .el-input__inner {
              height: 0.4rem;
              line-height: 0.4rem;
              padding: 0 0.15rem;
              .f18();
            }
          }
          /*文本域*/
          .el-textarea {
            width: 5rem;
          }
          /*网卡ip input框*/
          .input-ip {
            width: 1.9rem;
          }
        }
      }
    }
  }
}
</style>