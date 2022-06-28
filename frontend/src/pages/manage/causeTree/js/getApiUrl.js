//console.log(process.env.NODE_ENV) //环境判断
let getEnv = process.env.NODE_ENV;
export default function (url) {
    let protocol = ''
    let host = getEnv === 'development' ? '/api' : '/'
    const route = /^\//.test(url) ? url : '/' + url
    return protocol + host + route
}