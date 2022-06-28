import axios from './interceptors'
import getApiUrl from './getApiUrl'
require('es6-promise').polyfill();

class MyAjax{
    //超时判断
    overtime(url,data,successback,errback){
        if(true)return this.post2(url,data,successback,errback)
        else console.log(3)
    }
    //超时判断
    overtime2(that){
        if(3>5)return true
        else that.$router.push({path:'/searchlaw'})
    }
    //post请求
     post(url,data) {
         return axios.post(getApiUrl(url),data, {
             headers:{
                 'Content-Type':'application/json;charset=UTF-8',
             },
             //transformRequest: [data => encodeFormData(data)],
             transformResponse: [
                 // 格式化返回的数据使之成为对象
                 res => typeof res === 'string' ? JSON.parse(res) : res
             ],
             timeout: 30000
         }).then(res => {
             return res.data
         }).catch(err => {
             // http错误处理
             throw err
         })
     }
    //post2请求
    post2(url,data,successback,errback) {
        return axios.post(getApiUrl(url),data, successback,errback,{
            headers:{
                'Content-Type':'application/json;charset=UTF-8',
            },
            //transformRequest: [data => encodeFormData(data)],
            transformResponse: [
                // 格式化返回的数据使之成为对象
                res => typeof res === 'string' ? JSON.parse(res) : res
            ],
            timeout: 30000
        }).then(res => {
            //成功处理
             successback(res.data)
        }).catch(err => {
            // http错误处理
             errback(err)
        })
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
       let that = this;
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