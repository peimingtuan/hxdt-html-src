//console.log(process.env.NODE_ENV) 环境判断
let getEnv='production';
export default function (url){
    let protocol = ''
    let host = getEnv==='production' ? '/api' :  'http://opsapi.likechuxing.com'
    const route = /^\//.test(url) ? url : '/' + url
    return protocol+host+route+'?_p='+new Date().getTime()
}