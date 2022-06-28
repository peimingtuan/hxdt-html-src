import Vue from 'vue';
import Index from './showToast.vue'

const LoadingConstructor = Vue.extend(Index);
let loading={}
let showToast={
    open:function(text){
        loading = new LoadingConstructor({
            el: document.createElement('div'),
            data: {
                text: text || '加载中...'
            }
        });
        document.body.appendChild(loading.$el);
    },
    close:function(){
        let box=document.getElementById("showToastBox")
        //document.body.removeChild(loading.$el);
        box&&document.body.removeChild(box);
    }
}
export default showToast;