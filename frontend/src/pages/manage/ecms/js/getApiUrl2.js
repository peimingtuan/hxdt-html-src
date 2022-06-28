let getEnv = process.env.NODE_ENV;
export default function (url) {
    let protocol = ''
    let host = getEnv === 'development' ? '/api/ecms/ecmsweb' : '/ecms/ecmsweb'
    const route = /^\//.test(url) ? url : '/' + url
    return protocol + host + route
}