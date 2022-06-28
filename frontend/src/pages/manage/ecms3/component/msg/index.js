const Msg = {
    install(Vue){
        Vue.prototype.$msge=function (msg) {
            this.$message({message: msg,showClose: true,type: 'error'})
        }
        Vue.prototype.$msgw=function (msg) {
            this.$message({message: msg,showClose: true,type: 'warning'})
        }
        Vue.prototype.$msgs=function (msg) {
            this.$message({message: msg,showClose: true,type: 'success'})
        }
        Vue.prototype.$msg=function (msg) {
            this.$message({message: msg,showClose: true})
        }
    }
}
export default Msg