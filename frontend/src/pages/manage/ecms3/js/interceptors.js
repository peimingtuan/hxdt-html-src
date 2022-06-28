import axios from 'axios';
import SecurityUtils from './securityUtils'
import FoundationTools from '../../../../js/functionAjax'
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
    //postInfo.headers['Auth-Token'] = 12
    //postInfo.headers['Sign'] = 23
    if(FoundationTools.getCookie('cmsuserinfo')){
        let cmsuserinfo=JSON.parse(FoundationTools.getCookie('cmsuserinfo'));
        postInfo.data.userId=cmsuserinfo.userid;//添加用户id
        //postInfo.data.courtCode=FoundationTools.getCookie('peilawcourtcode');//添加当前法院
        postInfo.data.courtCode=sessionStorage.getItem('peilawcourtcode')
        console.log(postInfo.data)
    }
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