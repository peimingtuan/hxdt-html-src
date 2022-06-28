import {moveXY} from'../../../../../../other_modules/drag'
const fontSize={
    install(Vue){
        Vue.directive('fontSize',{
                bind:function(el,binding,vnode){
                    el.style.fontSize=parseInt(binding.value)/100+'rem'
                }
            })
    }
}
const fontColor={
    install(Vue){
        Vue.directive('fontColor',{
                bind:function(el,binding,vnode){
                    el.style.color=binding.value
                }
            })
    }
}

export  {fontSize,fontColor,moveXY}