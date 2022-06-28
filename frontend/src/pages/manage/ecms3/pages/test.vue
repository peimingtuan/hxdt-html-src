<template>
    <div class="test">
        <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>

        <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
            <el-dialog
                    width="30%"
                    title="内层 Dialog"
                    :visible.sync="innerVisible"
                    append-to-body>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取消</el-button>
                <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
            </div>
        </el-dialog>
        <div @click="outshow=true">打开</div>
        <transition name="slide-fade">
        <div class="out" v-show="outshow">
            <div class="out-main">
                <div @click="innershow=true" class="">我是外层div 打开内层</div>
                <div @click="outshow=false">关闭外层</div>
                <div>
                    <transition name="slide-fade">
                        <div class="inner" v-show="innershow">
                            <div class="inner-main" v-move-x-y>
                                我是内层div
                                <div @click="innershow=false">关闭内层</div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "test",
        data() {
            return {
                msg:'hello world',
                outerVisible:false,
                innerVisible:false,
                outshow:false,
                innershow:false,
            }
        },
        watch: {},
        computed: {},
        beforeCreate(){
            console.log('------beforeCreate------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        created() {
            console.log('------created------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        beforeMount(){
            console.log('------beforeMount------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        mounted() {
            console.log('------mounted------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
            setTimeout(()=>{
                this.msg="2"
            },3000)
            // setTimeout(()=>{
            //     this.$router.push({
            //         path:'/CaseManagement'
            //     })
            // },8000)
        },
        beforeUpdate(){
            console.log('------beforeUpdate------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        updated(){
            console.log('------updated------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        beforeDestroy(){
            console.log('------beforeDestroy------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        },
        destroyed(){
            console.log('------destroyed------')
            console.log(this.$el)
            console.log(this.$data)
            console.log(this.msg)
        }
    }
</script>

<style lang="less" scoped>
    .out{
         position:fixed;
         left:0;
         top:0;
         width:100%;
         height:100%;
         background:rgba(0,0,0,.1);
         z-index:100;
        display: flex;
        align-items: center;
        justify-content: center;
        &-main{
            width:500px;
            height:400px;
            background:#fff;
        }
     }
    .inner{
        position:fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.1);
        z-index:200;
        display: flex;
        align-items: center;
        justify-content: center;
        &-main{
            width:200px;
            height:100px;
            background:orange;
        }
    }
</style>