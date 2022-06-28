<template>
	<div class="loading" v-if="load">
		<div class="text-loading">
				<img src="../images/wait.gif" /><br/>
				{{text}}
		</div>
	</div>
</template>

<script>
	export default {
		name: "loading",
		props:{
			load:Boolean,
			text:String
		},
		data(){
			return {

			}
		},
		mounted () {
			
		},
	    methods: {

	    	}
	}
</script>

<style lang="less" scoped>
	@import url('../css/common.less');
	.loading{
		position: absolute;
		left: 0;
		top:0;
		width: 100%;
		height: 100%;
		/*background: #fff;*/
		background:rgba(255,255,255,1);
		z-index: 1000;
		.fc();
		.text-loading{
			.f20();
			color:#2F8DED;
			text-align: center;
			img{
				width:1rem;
				margin-bottom:.2rem;
			}
		}
	}
	.rgba{
		background:rgba(255,255,255,.9);
	}
	.fill{
		position:fixed;
	}
</style>