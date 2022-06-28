import axios from 'axios';
import SecurityUtils from './securityUtils'
//import FoundationTools from '../../../../js/functionAjax'
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
//请求统一拦截
axios.interceptors.request.use(postInfo=>{
    removePending(postInfo);
    postInfo.cancelToken = new cancelToken(cancel=>{
        pending.push({pid:postInfo.url+postInfo.method,cancel:cancel})
    })
    postInfo.data.userId=sessionStorage.getItem('userId');//添加用户id
    console.log(postInfo.data)
    // const encryptContent = SecurityUtils.AESEncrypt('!QA2Z@w1sxO*(-8L', JSON.stringify(postInfo.data))
    // const data = {
    //     encryptContent,
    // }
    // postInfo.data=data
    //调试
    const data = {
        method:'',
        requestSource:'',
        data:postInfo.data
    }
    // const encryptContent = SecurityUtils.AESEncrypt('!QA2Z@w1sxO*(-8L', JSON.stringify(data))
    // const data1 = {
    //     encryptContent,
    // }
    postInfo.data=data
    return postInfo
},err=>{
    return Promise.reject(err)
})
//响应统一拦截
axios.interceptors.response.use(res=>{
    removePending(res.config)
    if (res.data.body) {
        res.data.body = SecurityUtils.AESDecrypt('!QA2Z@w1sxO*(-8L', res.data.body)
        console.log(res.data.body)
    }
    return res
},err=>{
    return Promise.reject(err)
})

export default axios