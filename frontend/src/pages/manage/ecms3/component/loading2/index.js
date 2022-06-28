//import Index from './index.vue'
//const Loading = {}
// Loading.install = function(Vue){
//
//     Vue.component('Index',Index)
//
//     // Vue.prototype.$showLoading = function(id){
//     //     // component.setAttribute('id',id)
//     //     // document.body.appendChild(component)
//     // }
//     // Vue.prototype.$hideLoading = function(id){
//     //     // let box = document.getElementById(id)
//     //     // box && document.body.removeChild(box)
//     // }
// }

export default (Vue)=>{
    Vue.component('Index',resolve=>require(['./index.vue'],resolve))
}