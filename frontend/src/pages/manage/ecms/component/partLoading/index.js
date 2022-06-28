import Index from './index.vue'
const partLoading = {}
partLoading.install = function(Vue){
    
    let indexClass = Vue.extend(Index)
    let instance = new indexClass();
    let component = instance.$mount().$el

    Vue.prototype.$showToast = function(text){
        component.setAttribute('id','showToast')
        if(text)component.firstChild.lastChild.innerHTML=text
        document.body.appendChild(component)
    }
    Vue.prototype.$hideToast = function(){
        let box = document.getElementById('showToast')
        box && document.body.removeChild(box)
    }
}

export default partLoading