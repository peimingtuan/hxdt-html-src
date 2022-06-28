const Msg = {
    install(Vue){
        Vue.prototype.$msge=function (msg) {
            this.$message({message: msg,showClose: true,type: 'error'})
        }
        Vue.prototype.$msgw=function (msg) {
            this.$message({message: msg,showClose: true,type: 'warning'})
        }
    }
}
export default Msg