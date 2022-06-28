<template>
        <div class="Serversupervision">
              <el-row class='onerow'>
                  <el-col :span=24>
                       <div class="head-top">
                               <img src="../images/CaseManagement/1.png"/>
                               后台服务器监管<span>HOU TAI FU WU QI JIAN GUAN</span>
                       </div>
                 </el-col>
              </el-row>
                  <el-row class='tworow'>
                    <el-col :span=24 class='courtselect'>
                        <el-select v-model="deviceId" placeholder="选择服务器类型"  @change='changeSelect()'>
                            <el-option v-for="item in serverlist" :key="item.deviceId" :label="item.deviceName" :value="item.deviceId"
                           >
                            </el-option>
                        </el-select>
                      <el-button type="primary" @click='refreshbutton()'>状态刷新</el-button>
                    </el-col>
                  </el-row>
                  <el-row class='threerow'>
                    <el-col :span=22 class='servebox' style="width:100%;padding-left:0.45rem">
                        <el-row :span=23 class='servediv'>
                          <div>主机名:{{serverName}}</div>
                          <div>状态:{{status}}</div>
                          <div>IP地址:{{ip}}</div>
                          <div>操作系统:{{systemType}}</div>
                          <div>
                            内存使用情况: 总容量{{memoryUsage.totalMemory}} 使用中{{memoryUsage.usedMemory}} 使用率{{memoryUsage.usedMemoryRate}}</div>
                          <div>CPU使用情况: 使用率:{{cpuUsedPercentage}}</div>
                        </el-row>
                        <el-row :span=1></el-row>
                    </el-col>
                  </el-row>
              <!-- <el-col :span=1>1</el-col> -->
              <el-row>
                  <el-col :span=24 class=''>
                      <div  class="title">磁盘使用情况</div>
                      <div v-if="serverType==2">
                          <el-table class='casetable'
                          :data="tableData"
                          style="width: 100%;">
                          <el-table-column prop="diskName"label="硬盘"min-width=5%> </el-table-column>
                          <el-table-column prop="totalSpace"label="总空间"min-width=5%> </el-table-column>
                          <el-table-column prop="usedSpace"label="已用空间"min-width=5%> </el-table-column>
                          <el-table-column prop="percentageUsed"label="已用百分比"min-width=5%> </el-table-column>
                          <el-table-column prop="availableSpace"label="剩余空间"min-width=5%></el-table-column>
                        </el-table>
                      </div>
                      <div v-else-if="serverType==3">
                          <el-table class='casetable'
                                    :data="tableData"
                                    style="width: 100%;">
                              <el-table-column prop="physicalPathName"label="物理路径"min-width=5%> </el-table-column>
                              <el-table-column prop="mountPathName"label="挂载点"min-width=5%> </el-table-column>
                              <el-table-column prop="totalSpace"label="总空间"min-width=5%> </el-table-column>
                              <el-table-column prop="usedSpace"label="已用空间"min-width=5%> </el-table-column>
                              <el-table-column prop="percentageUsed"label="已用百分比"min-width=5%> </el-table-column>
                              <el-table-column prop="availableSpace"label="剩余空间"min-width=5%></el-table-column>
                          </el-table>
                      </div>
                </el-col>
              </el-row>
              <!-- <el-col :span=1>1</el-col> -->
      
        </div>
</template>
      <script>
        export default{
          data(){
            return{
                serverlist:[],//服务器select类型
                deviceId: "",//下拉选服务型类型选择
                serverType: '',//1是主机，2是windows服务器，3是linux服务器,操作系统类型
                serverName: '',//主机名
                status: '',//状态
                ip:'',//ip
                systemType:'',//操作系统
                memoryUsage: {
                    //总共内存
                    "totalMemory": "",
                    //已使用内存
                    "usedMemory": "",
                    //使用率
                    "usedMemoryRate": ""
                },//内存使用情况
                cpuUsedPercentage: '',//CPU使用情况
                tableData: [],//表格数据,硬盘使用情况
            }
          },
          async created(){
                this.$showLoading('rgba');
                await this.getAllSystemServerInfos()
                if(this.deviceId.length>0){
                    await this.GetDesignatedServer()
                }
                this.$hideLoading('rgba');
            },
          mounted() {
              // this.$showLoading('rgba');
              // Promise.all([this.getAllSystemServerInfos(),this.GetDesignatedServer()]).then(()=>{
              //     this.$hideLoading('rgba');
              // })
          },
          methods: {
            //获取后台服务器select信息
            getAllSystemServerInfos(){
                let _this=this;
               return _this.$http.post('/serverMonitor/getServerDeviceInfos',{}).then(data => {
                    if (data.code === 200) {
                      _this.serverlist=data.data;
                      if(data.data.length>0)_this.deviceId=data.data[0].deviceId;
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/serverMonitor/getServerDeviceInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
              //根据查询条件查询
             async changeSelect(){
                 this.$showLoading('rgba');
                 await this.GetDesignatedServer()
                 this.$hideLoading('rgba');
              },
            //获取指定的服务器信息
            GetDesignatedServer(){
              let _this=this;
                const params={
                    "deviceId": _this.deviceId,
                  };
              return  _this.$http.post('/serverMonitor/getServerMonitorInfos', params).then(data => {
                    if (data.code === 200) {
                        _this.serverType=data.data.monitorsInfos.serverType;
                        _this.serverName=data.data.monitorsInfos.serverName;
                        _this.status=data.data.status;
                        _this.ip=data.data.ip;
                        _this.systemType=data.data.systemType;
                        _this.memoryUsage=data.data.monitorsInfos.memoryUsage;
                        _this.cpuUsedPercentage=data.data.monitorsInfos.cpuUsedPercentage;
                        _this.tableData=data.data.monitorsInfos.diskUseInfos;
                    } else {
                        _this.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/serverMonitor/getServerMonitorInfos')
                    _this.$msge('服务器异常，请稍后重试');
                })
            },
            //刷新按钮
            refreshbutton(){
              let _this=this;
                _this.$showLoading('rgba');
                _this.GetDesignatedServer();
                _this.$hideLoading('rgba');
              // const params={
              //       "deviceId": _this.deviceId,
              //     };
              //   _this.$http.post('/getRealTimeMonitorInfos', params).then(data =>{
              //       _this.$hideLoading('rgba');
              //       if(data.code===200){
              //           _this.serverType=data.data.monitorsInfos.serverType;
              //           _this.serverName=data.data.monitorsInfos.serverName;
              //           _this.status=data.data.status;
              //           _this.ip=data.data.ip;
              //           _this.systemType=data.data.systemType;
              //           _this.memoryUsage=data.data.monitorsInfos.memoryUsage;
              //           _this.cpuUsedPercentage=data.data.monitorsInfos.cpuUsedPercentage;
              //           _this.tableData=data.data.monitorsInfos.diskUseInfos;
              //       }else{
              //           _this.$msgw(data.message);
              //       }
              //   }).catch(err => {
              //       _this.$hideLoading('rgba');
              //       console.log(err,'/getRealTimeMonitorInfos')
              //       _this.$msge('服务器异常，请稍后重试');
              //   })
            }
        }
        }
      </script>
      <style lang='less'>
    .Serversupervision{
          padding:0 0.2rem 0 0.2rem;
         .title{
            padding:0.22rem 0 0rem 0;
            font-family: 0.2rem;
            font-size: 0.2rem;
          }
          .servebox{
            margin-top:0.17rem;
            border:1px solid #E5E5E5;
          }
          .servediv div{
            padding:0.2rem 0 0.2rem 0;
          }
          .head-top{
                float: left;
                padding:.2rem 0;
                font-size: .2rem;
                img{
                    width:0.3rem;
                }
                span{
                    margin-left:.05rem;
                    font-size:0.14rem;
                    color:#1296DB;
                }
          }
          .tworow{
            .el-select{
                margin-right: 0.2rem;
            }
            .el-input{
                        width:2.94rem;
                        .el-input__inner{
                            width:2.94rem;
                            height:0.4rem;
                            line-height:.4rem;
                            font-size: 0.2rem;
                            padding:0 .2rem 0 .4rem;
                        }
                    }
                    .el-input__icon {
                        width: .25rem;
                        line-height: .4rem;
                        color: #e7e9ee;
                    }
                    .el-button{
                      position: relative;
                            top: -.02rem;
                            width: .9rem;
                            line-height: .36rem;
                            padding: 0;

                            .el-icon-search {
                                font-size:0.18rem;
                                color: #fff;
                            }

                            span {
                                font-size:0.18rem;
                                color: #fff;
                            }
                    }
          }
          @import url('../css/element.less');
      }
      </style>
