import axios from 'axios';
import SecurityUtils from './securityUtils'
let pending = [];
let cancelToken = axios.CancelToken //拦截器
function removePending(item){
    let arr =  pending;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i]['pid'] === item['url'] + item['method'] ){
            arr[i].cancel()
            arr.splice(i,1)
        }
        
    }
}
axios.interceptors.request.use(postInfo=>{
    removePending(postInfo);
    postInfo.cancelToken = new cancelToken(cancel=>{
        pending.push({pid:postInfo.url+postInfo.method,cancel:cancel})
    })
    const data = {
        method:'',
        requestSource:'',
        data:postInfo.data
    }
    //  const encryptContent = SecurityUtils.AESEncrypt('!QA2Z@w1sxO*(-8L', JSON.stringify(data))
    // const data1 = {
    //     encryptContent,
    // }
    postInfo.data=data
    return postInfo
},err=>{
    return Promise.reject(err)
})
axios.interceptors.response.use(res=>{
    removePending(res.config)
    return res
},err=>{
    return Promise.reject(err)
})

export default axios