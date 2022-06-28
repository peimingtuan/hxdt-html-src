
<template>
	<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">   // 当鼠标移入的时候清除，移出的时候
		<div class="slide-img">
			<a href="slides[nowIndex].href">
			<transition name="slide-trans">                     // 使用动画
		          <img v-if="isShow" :src="slides[nowIndex].src">
		        </transition>
		        <transition name="slide-trans-old">
		          <img v-if="!isShow" :src="slides[nowIndex].src">
		        </transition>
			</a>
		</div>
		<h2>{{ slides[nowIndex].title }}</h2>
		<ul class="slide-pages">
			<li @click="goto(prevIndex)"></li>
			<li v-for="(item, index) in slides" @click="goto(index)">
				<a :class="{ on: index === nowIndex}">
					{{ index + 1 }}
				</a>
			</li>
			<li @click="goto(nextIndex)">></li>
		</ul>
	</div>
</template>
 
<script>
	export default {
		props: {
			slides: {                     // 获取父组件的属性
				type: Array,
				default: []
			},
			inv: {
				type: Number,
				default: 1000
			}
		},
		data () {
			return {
				nowIndex: 0,
				isShow: true
			}
		},
		computed: {
			prevIndex () {             // 使用计算属性，
				if (this.nowIndex === 0) {
					return this.slides.length - 1
				} else {
					return this.nowIndex - 1
				}
			},
			nextIndex () {
				if (this.nowIndex === this.slides.length - 1) {
					return 0
				} else {
					return this.nowIndex + 1
				}
			}
		},
		methods: {
			goto (index) {
				this.isShow = false,
				setTimeout(() => {             // 过10毫秒后，
					this.isShow = true,
					this.nowIndex = index
				}, 10)
				
			},
			runInv () {                 // 设置定时器
				this.timer = setInterval(() => {
					this.goto(this.nextIndex)
				}, this.inv)
			},
			clearInv () {
				clearInterval(this.timer)
			}
		},
		mounted () {          // 加载完后执行
			this.runInv()
		}
	}
</script>
 
<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
