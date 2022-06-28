import axios from './interceptors'
import getApiUrl from './getApiUrl'
import $ from "jquery"
import {Message} from 'element-ui'
import {Indicator} from 'mint-ui'
//import SecurityUtils from './securityUtils'
require('es6-promise').polyfill();
const showStatus = status => ({
    400: '请求错误 (400)',
    401: '未授权，请重新登录 (401)',
    403: '拒绝访问 (403)',
    404: '请求出错 (404)',
    408: '请求超时 (408)',
    500: '服务器错误 (500)',
    501: '服务未实现 (501)',
    502: '网络错误 (502)',
    503: '服务不可用 (503)',
    504: '网络超时 (504)',
    505: 'HTTP版本不受支持 (505)'
})[status] || `连接出错${ status }`;
class MyAjax{
    //get请求
    get(url,data){
        return axios.get(getApiUrl(url),{
            parames:data
        },{
            headers:{
                'Content-type': 'application/x-www-form-urlencoded'
            },
            timeout:30000,
            //transformRequest: [data => encodeFormData(data)],
            transformResponse: [
                // 格式化返回的数据使之成为对象
                res => typeof res === 'string' ? JSON.parse(res) : res
            ],
        }).then(function(res) {
            return res.data
        }).catch(function(){
            // http错误处理
            throw err
        })
    }
    //post请求
    post(url,data,isLoadmsg) {
        if(isLoadmsg) Indicator.open({text:isLoadmsg, spinnerType: 'fading-circle'})
        return axios.post(getApiUrl(url),data, {
            headers:{
                //'Content-Type':'application/json;charset=UTF-8',
            },
            //transformRequest: [data => encodeFormData(data)],
            transformResponse: [
                // 格式化返回的数据使之成为对象
                //res => typeof res === 'string' ? JSON.parse(res) : res
            ],
            timeout: 30000
        }).then(res => {
            if(isLoadmsg)Indicator.close()
            const response=res.data;
            if(response.code===200){
                return res.data
            }else{
                Message({
                    showClose: true,
                    message:response.message,
                    type: 'warning'
                })
            }
        }).catch(err => {
            // http错误处理
            if(isLoadmsg)Indicator.close()
            const { response } = err;
            Message({
                showClose: true,
                message:response&&response.status?showStatus(response.status):'服务器异常',
                type: 'error'
            })
            //throw response.config.url
        })
    }
    //post同步请求
    syncRequest(url,param) {
        let result = null;
        const data = {
            method:'',
            requestSource:'',
            data:param
        }
        console.log(data)
        //const encryptContent = SecurityUtils.AESEncrypt('!QA2Z@w1sxO*(-8L', JSON.stringify(data))
        $.ajax({
            timeout: 3000,
            type: "post",
            url:getApiUrl(url),
            //headers:{"appId":12,"appKey":34,"Content-Type":"application/json;charset=UTF-8"},
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            async: false,
            success: function (data) {
                //SecurityUtils.AESDecrypt('!QA2Z@w1sxO*(-8L',data)
                result = data;
            },
            error: function (data) {
                //SecurityUtils.AESDecrypt('!QA2Z@w1sxO*(-8L',data)
                result = data;
            }
        });
        return result;
    }
    //form表单
    postPage(url, data) {
        let temp = document.createElement("form");
        temp.action = url;
        temp.method = "post";
        temp.style.display = "none";
        let _data = data
        for (let x in _data) {
            let opt = document.createElement("textarea");
            opt.name = x;
            opt.value = _data[x];
            temp.appendChild(opt);
        }
        document.body.appendChild(temp);
        temp.submit();
        return temp;
    }
    //jsonp
    jsonp(url, params, callback) {
        url = url + '?';
        for (let i in params) {
            url = url + i + '=' + params[i] + '&';
        }
        let timeStamp = (Math.random() * 100000).toFixed(0);
        window['ck' + timeStamp] = callback || function () {
        };
        let completeUrl = url + '&callback=ck' + timeStamp;
        let script = document.createElement('script');
        script.src = completeUrl;
        script.id = 'jsonp';
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = function (e) {
            document.getElementsByTagName('head')[0].removeChild(script)
        };
        script.onerror = function (e) {
            console.log(e)
        };
    }
    //遍历data
    appendNormalArguments(data) {
        data = Object.assign({}, data)
        //删除无效data
        let errStr = ['',undefined,NaN,null]
        Object.keys(data).map(key=>{
            if(errStr.indexOf(data[key])!=-1){
                delete data[key]
            }
        })
        return data
    }
}
//用于post请求前对发送数据进行更改
function encodeFormData(data) {
    let ret = ''
    for (let key in data) {
        if(typeof data[key] === 'object'){
            let json =  data[key]
            for(let i in json){
                ret += encodeURIComponent(key+'['+i+']') + '=' + encodeURIComponent(json[i]) + '&'
            }
        }else{
            ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
    }
    return ret.substr(0,ret.length-1)
}

export default new MyAjax()