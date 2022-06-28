<template>
  <div class="initialize">
	  <eltreeAlert ref="eltreeAlert"/>
	  <div class="ipAddress">
		  <div class="title_left">ECMS服务器IP：</div>
		  <div class="title_right">
			  <el-input v-model.trim="localIp" placeholder="请输入IP"></el-input>
		  </div>
	  </div>
  	<div class="select_box">
  		<div class="title_box">法院：</div>
  		<div class="message_box">
			<div class="case-yo">
				<el-input type="textarea" autosize v-model.trim="courtName" readonly></el-input>
			</div>
			<div>
				<el-button @click="choice">选择</el-button>
			</div>
  		</div>
  	</div>
  	<div class="submit" @click="submit">确定</div>
  </div>
</template>

<script>
	import eltreeAlert from "../component/eltreeAlert"
	import Tool from "../js/tools"
  export default {
    name: "initialize",
	  components: {
		  eltreeAlert
	  },
    data() {
      return {
		  localIp:'',
        // 法院代码
        courtCode:[],
		  courtName:''
      }
    },
	  created() {
		  	this.$showLoading();
			this.getInitCourtInfos();
	  },
    mounted() {

    },
    methods:{
    	//获取
		getInitCourtInfos(){
			const that = this;
			that.$http.post('/initConfig/getInitCourtInfos', {

			}).then(res => {
				that.$hideLoading();
				if (res.code === 200) {
					that.localIp=res.data.localIp;
					that.courtName=res.data.courtNameArray;
					if(res.data.courtCodeArray){
						that.courtCode=res.data.courtCodeArray.split(',');
					}
				} else {
					that.$msgw(res.message);
				}
			}).catch(err => {
				that.$hideLoading();
				//that.$msge('服务器异常，请稍后重试');
			})
		},
		choice(){
			this.$refs.eltreeAlert.show(this.courtCode,this.courtName)
		},
    	// 提交
    	submit(){
			if(!this.localIp){
				this.$msgw('请输入服务IP');
				return;
			}else if(!Tool.isValidIP(this.localIp)){
				this.$msgw('请输入有效服务IP');
				return;
			}
    		if(this.courtCode.length===0){
    			this.$msgw('法院不能为空');
	        	return;
    		}
			const that = this;
			that.$showLoading('rgba');
			that.$http.post('/initConfig/saveInitCourtInfosByCodeString', {
				localIp:that.localIp,
				courtCodeArray:that.courtCode.toString()
			}).then(res => {
				that.$hideLoading('rgba');
				if (res.code === 200) {
					window.location.href="../ecms/index.html#/login"//登陆页面
				} else {
					that.$msgw(res.message);
				}
			}).catch(err => {
				that.$hideLoading('rgba');
				//that.$msge('服务器异常，请稍后重试');
			})
    	},
    }
  }
</script>

<style lang="less">
  @import url('../css/common.less');
  .initialize{
	  width:100vw;
	  height:100vh;
	  .ipAddress{
		  .fl();
		  width:9.5rem;
		  margin:2rem auto 0;
		  .title_left{
			  width:1.5rem;
			  height:30px;
			  font-size: 0.18rem;
			  line-height:30px;
			  text-align: left;
		  }
		  .title_right{
			  width:7.5rem;
			  .el-input__inner{
				  height:30px;
				  line-height:30px;
				  .f18()
			  }
		  }
	  }
  	.select_box{
		.fl();
  		width:8.5rem;
	    margin:.5rem auto 0;
		.f18();
		.title_box{
			width: 1rem;
			height: 0.5rem;
			font-size: 0.18rem;
			line-height: 0.5rem;
			text-align: right;
		}
		.message_box{
			.fl();
			width:7.5rem;
			.case-yo{
				width:6.3rem;
				textarea{
					.f18();
					min-height:.5rem!important;
				}
			}
			.el-button {
				width:1.2rem;
				position: relative;
				top: -.02rem;
				line-height: .5rem;
				padding: 0;
				background:#409eff;
				span {
					.f18();
					color: #fff;
				}
			}
		}
  	}
  	.submit{
  		width: 1.5rem;
  		height: 0.5rem;
  		margin: 1rem auto;
  		margin-bottom: 0; 
  		border-radius: 4px;
    	background-color: #2e8ded;
      border: solid 1px #2e8ded;
      color: #fff;
    	line-height: 0.5rem;
    	text-align: center;
    	cursor: pointer;
  	}
  }
  .el-select-dropdown__item {
    padding: 0 0.2rem;
    height: 0.34rem;
    line-height: 0.34rem;
	}
	.el-popper[x-placement^=bottom] {
    margin-top: 0.1rem;
	}
</style>