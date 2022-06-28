<template>
  <div class="othertabpane9">
    <h3 class="topic">书记员客户端启动检测项</h3>
    <div class="content">
      <div class="content-item">
        <el-checkbox v-model="enviromentMonitorSetting.TSZJ.checked">庭审主机</el-checkbox>
        <span class="err">错误等级</span>
        <el-select v-model="enviromentMonitorSetting.TSZJ.level">
          <el-option
                  v-for="item in levellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <el-checkbox v-model="enviromentMonitorSetting.LMTFWQ.checked">流媒体服务器</el-checkbox>
        <span>
          存储容量低于 &nbsp;
          <input
            v-model="enviromentMonitorSetting.LMTFWQ.warning"
            type="number"
            max="100"
            min="0"
            required="required"
          />% &nbsp; 告警
        </span>
        <span>
          存储容量低于 &nbsp;
          <input
            v-model="enviromentMonitorSetting.LMTFWQ.available"
            type="number"
            max="100"
            min="0"
            required="required"
          />% &nbsp; 不能开庭
        </span>
        <span class="err">错误等级</span>
        <el-select v-model="enviromentMonitorSetting.LMTFWQ.level">
          <el-option
                  v-for="item in levellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <el-checkbox v-model="enviromentMonitorSetting.DZJZSMFWQ.checked">电子卷宗扫描服务器</el-checkbox>
        <span class="err">错误等级</span>
        <el-select v-model="enviromentMonitorSetting.DZJZSMFWQ.level">
          <el-option
                  v-for="item in levellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <el-checkbox v-model="enviromentMonitorSetting.KLFWQ.checked">刻录服务器</el-checkbox>
        <span class="err">错误等级</span>
        <el-select v-model="enviromentMonitorSetting.KLFWQ.level">
          <el-option
                  v-for="item in levellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="content-item">
        <el-checkbox v-model="enviromentMonitorSetting.YYSBFWQ.checked">语音识别服务器</el-checkbox>
        <span class="err">错误等级</span>
        <el-select v-model="enviromentMonitorSetting.YYSBFWQ.level">
          <el-option
                  v-for="item in levellist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-button class="savecontent" @click="savecontent">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "othertabpane9",
  data() {
    return {
      levellist: [{id:2,name:'警告'},{id:3,name:'错误'}],
      enviromentMonitorSetting: {
        TSZJ: {
          checked: false,
          level:2
        },
        LMTFWQ: {
          checked: false,
          warning: 10,
          available: 3,
          level:2
        },
        DZJZSMFWQ: {
          checked: false,
          level:2
        },
        KLFWQ: {
          checked: false,
          level:2
        },
        YYSBFWQ: {
          checked: false,
          level:2
        }
      }
    };
  },
  created() {},
  mounted() {
    this.getcontent();
  },
  destroyed() {},
  methods: {
    //获取书记员客户端启动检测项
    getcontent() {
      let _this = this;
     return _this.$http.post("/otherConfig/getEnvironmentMonitorSetting", {}).then(data => {
          if (data.code === 200) {
            //console.log(data.data.enviromentMonitorSetting);
            _this.enviromentMonitorSetting = data.data.enviromentMonitorSetting;
          }
        }).catch(err => {
          console.log(err, "/otherConfig/getEnvironmentMonitorSetting");
          _this.$msge("服务器异常，请稍后重试");
        });
    },
    //保存书记员客户端启动检测项
    savecontent() {
      let _this = this;
      console.log(!!_this.enviromentMonitorSetting.LMTFWQ.warning);
      if(!!_this.enviromentMonitorSetting.LMTFWQ.warning&&_this.enviromentMonitorSetting.LMTFWQ.available){
        _this.$showToast('加载中...')
        _this.$http.post("/otherConfig/saveEnvironmentMonitorSetting", {
          enviromentMonitorSetting: _this.enviromentMonitorSetting
        }).then(data => {
          _this.$hideToast()
          if (data.code === 200) {
            _this.$message({
              message: "保存成功",
              type: "success"
            });
          }else{
            _this.$msgw(data.message);
          }
        }).catch(err => {
          _this.$hideToast()
          console.log(err, "/otherConfig/saveEnvironmentMonitorSetting");
          _this.$msge("服务器异常，请稍后重试");
        });
      }else{
          _this.$msgw("流媒体服务器未填写");
      }
      
    }
  }
};
</script>

<style lang="less">
@import url("../css/common.less");
.othertabpane9 {
  .topic {
    padding-left: 0.1rem;
    height: 0.5rem;
    width: 100%;
    line-height: 0.5rem;
    background-color: #e4e7e8;
  }
  .content {
    &-item {
      width: 100%;
      padding: 0.18rem 0 0.18rem 0.17rem;
      span {
        padding: 0 0.1rem;
        input {
          border: 0.01rem solid #d2cfcf;
          text-align: center;
          display: inline-block;
          width: 0.6rem;
          height: 0.25rem;
          color: #333333;
        }
      }
    }
    .el-checkbox{
      span{
        padding:0 .05rem;
      }
      .el-checkbox__inner{
        width:.18rem;
        height:.18rem;
        &:after{
          left:.05rem;
          top:.02rem;
        }
      }
      .el-checkbox__label{
        .f18();
      }
    }
    .err{
      color:red;
    }
    .el-input{
      width:1.2rem;
      .el-input__inner {
        height: .4rem;
        line-height: .4rem;
        padding: 0 .1rem;
        .f18();
      }
      span{
        padding:0;
      }
      .el-input__icon{
        line-height:1;
      }
    }
  }
  .savecontent {
    margin:.5rem 0;
    width:1.5rem;
    background: #409eff;
    span {
      .f18();
      color: #fff;
    }
  }
}
</style>