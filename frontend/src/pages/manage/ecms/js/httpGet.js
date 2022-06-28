import axios from 'axios'
import getApiUrl from './getApiUrl'
require('es6-promise').polyfill();
let http = axios.create();
class MyAjax{
    //get请求
    get(url,data){console.log(900)
        return http.get(getApiUrl(url),{
                    parames:data
                },{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
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
    }
export default new MyAjax()