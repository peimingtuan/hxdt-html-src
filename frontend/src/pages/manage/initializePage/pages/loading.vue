<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "loading",
        data() {
            return {

            }
        },
        created(){
            this.$showLoading();
            this.turnToInitPage();
        },
        mounted() {

        },
        destroyed(){
            this.$hideLoading();
        },
        methods:{
            turnToInitPage(){
                const that=this;
                that.$http.post('/initConfig/turnToInitPage', {

                }).then(data =>{
                    if(data.code===200){
                        if(data.data.initPage){//初始化页面
                            that.$router.push({
                                path:'/initialize'
                            })
                        }else{
                            window.location.href="../ecms/index.html#/login"//登陆页面
                        }
                    }else{
                        that.$msgw(data.message);
                    }
                }).catch(err => {
                    console.log(err,'/initConfig/turnToInitPag')
                    that.$msge('服务器异常，请稍后重试');
                })
            },
        }
    }
</script>

<style scoped>

</style>