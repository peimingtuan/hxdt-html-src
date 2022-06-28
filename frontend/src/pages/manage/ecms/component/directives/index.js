const fontSize={
    install(Vue){
        Vue.directive(
            'fontSize',{
                bind:function(el,binging,vnode){
                    el.style.fontSize=parseInt(binging.value)/100+'rem'
                }
            })
    }
}
export  {fontSize}