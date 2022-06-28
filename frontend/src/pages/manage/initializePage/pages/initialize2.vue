<template>
  <div class="initialize2">
  	<div class="select_box">
  		<div class="title_box">法院：</div>
  		<div class="message_box">
  			<el-select v-model="courtCode" filterable multiple placeholder="请选择">
			    <el-option
			      v-for="item in options"
				  @click.native="selectChange(item)"
			      :key="item.courtCode"
			      :label="item.courtName"
			      :value="item.courtCode">
			    </el-option>
			  </el-select>
  		</div>
  	</div>
  	<div class="submit" @click="submit">确定</div>
  </div>
</template>

<script>
  export default {
    name: "initialize2",
    data() {
      return {
        // 下拉框集合
        options: [],
        // 法院代码
        courtCode:[],
      }
    },
	  async created(){
    	this.$showLoading()
		  await this.getCourtList();
		  this.$hideLoading()
	  },
    mounted() {

    },
    methods:{
    	// 遍历options,获取选中的list中的字段
    	selectChange(val){
    		console.log(val)
    	},
    	// 获取法院列表
		getCourtList() {
			const that = this;
			let params = {};
			return that.$http.post('/initConfig/getAllCourtInfos', params).then(res => {
				if (res.code == 200) {
					setTimeout(() => {
						that.options = res.data;
					}, 0)
				} else {
					that.$msgw(res.message);
				}
			}).catch(err => {
				that.$msge('服务器异常，请稍后重试');
			})
		},
    	// 提交
    	submit(){
    		if(this.courtCode.length===0){
    			this.$message({
	          message: '法院不能为空',
	          type: 'warning'
	        });
	        return;
    		}
			const that = this,
					courtList = [];
			that.courtCode.map(item=>{
				that.options.map(its=>{
					if(its.courtCode==item){
						courtList.push({
							courtCode:its.courtCode,
							courtName:its.courtName,// 法院名称
							courtPronoun:its.courtPronoun,// 法院代字
							courtParentCode:its.courtParentCode,// 父级法院代码
							courtLevelCode:its.courtLevelCode// 法院级别
						})
					}
				})
			})
			that.$http.post('/initConfig/saveInitCourtInfos', {courtList}).then(res => {
				if (res.code == 200) {
					window.location.href="../ecms/index.html#/login"//登陆页面
				} else {
					that.$msgw(res.message);
				}
			}).catch(err => {
				that.$msge('服务器异常，请稍后重试');
			})
    	},
    }
  }
</script>

<style lang="less">
  @import url('../css/common.less');
  .initialize2{
	  width:100vw;
	  height:100vh;
  	.select_box{
		.fl();
  		width: 5rem;
	    /*height: 0.5rem;*/
	    margin:2rem auto;
	    margin-bottom: 0;
  	}
  	.title_box{
  		/*float: left;*/
  		width: 1rem;
  		height: 0.5rem;
  		font-size: 0.18rem;
  		line-height: 0.5rem;
  		text-align: right;
  	}
  	.message_box{
  		/*float: left;*/
  		width: 4rem;
  		/*height: 0.5rem;*/
  		.el-select{
  			width: 100%;
  			max-height:5rem;
			overflow: auto;
  		}
  		.el-input{
  			height: 100%;
  			font-size: 0.18rem;
  		}
  		.el-input--suffix .el-input__inner {
		    padding-right: 0.2rem;
		    /*height: 0.5rem;*/
		    font-size: 0.18rem;
    		color: #333;
			}
			.el-input__icon{
				line-height: 0.5rem;
			}
			.abbreviation{
				width: 100%;
				height: 100%;
				font-size: 0.18rem;
  			line-height: 0.5rem;
  			padding-left: 0.2rem;
  			border-radius: 4px;
    		border: 1px solid #dcdfe6;
    		outline:none;
			}
			.abbreviation:focus{
				border-color: #409eff;
			}
  	}
  	.submit{
  		width: 1.2rem;
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