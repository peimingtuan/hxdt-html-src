import Vue from 'vue'
import axios from 'axios'
import merge from 'webpack-merge'
import SecurityUtils from './securityUtils'
//import dossierUtils from './utils'
//import urlConfig from '@/pages/index/config/url.config'
//import dossierConfig from '@/config/dossier.config'
import { router } from '@/pages/index/router'
//创建axios实例
const httpClient = axios.create({
    //timeout: 120000,
    withCredentials: false,
    //headers: {'Content-Type': 'application/json'}
})


let signFlag = '0x00'
//明文url

const plaintextUrls = [
    urlConfig.GET_RSA_PUBLIC_KEY_URL, urlConfig.GET_VERIFY_CODE_URL, urlConfig.FILE_UPLOAD_URL,
    urlConfig.OCR_URL, urlConfig.SEND_TENGCENT_AUTH_PARAMS_URL, urlConfig.GET_MINIPROGRAM_QRCODE_URL,
    urlConfig.GET_DOSSIER_DIRECTORY_URL, urlConfig.GET_COLLECT_URL, urlConfig.GET_UESR_COUNT, urlConfig.GET_READ_COUNT
]
//rsa加密url
const rsaUrls = [urlConfig.LOGIN_URL, urlConfig.LAWYER_REGIST_URL]
//请求统一拦截
httpClient.interceptors.request.use(config => {
    //明文加密标志
    const plaintextFlag = plaintextUrls.some(value => {
        return config.url.indexOf(value) > -1 ? true : false
    })
    //rsa加密标志
    const rsaFlag = rsaUrls.some(value => {
        return config.url.indexOf(value) > -1 ? true : false
    })
    signFlag = plaintextFlag ? '0x00' : rsaFlag ? '0x01' : '0x02'

    // 将登录后返回的token添加到request header
    const token = window.localStorage.getItem('auth-token')
    const sign = window.localStorage.getItem('sign')
    if (token !== 'undefined' && token !== null && !dossierConfig.IS_USE_RAP) {
        const sign = dossierUtils.getSign(signFlag)
        config.headers['Auth-Token'] = token
        config.headers['Sign'] = sign
        if (signFlag === '0x02') {
            const encryptContent = SecurityUtils.AESEncrypt(window.localStorage.getItem('aesKey'), JSON.stringify(config.data))
            const data = {
                encryptContent,
            }
            config.data = data
        }
        return config
    }
    return config
}, error => {
    return Promise.reject(error)
})
//响应统一拦截
httpClient.interceptors.response.use(response => {
    const url = response.config.url
    //明文加密标志
    const plaintextFlag = plaintextUrls.some(value => {
        return url.indexOf(value) > -1 ? true : false
    })
    //rsa加密标志
    const rsaFlag = rsaUrls.some(value => {
        return url.indexOf(value) > -1 ? true : false
    })

    //统一为AES加密的数据解密
    if (!plaintextFlag && !rsaFlag && !dossierConfig.IS_USE_RAP) {
        if (response.data.body) {
            response.data.body = SecurityUtils.AESDecrypt(window.localStorage.getItem('aesKey'), response.data.body)
        }
    }
    response.data.code = Number(response.data.code)
    if (response.data.code === 202005 || response.data.code === 202015) {
        //window.localStorage.clear()
        router.push(`/${Vue.$language}/login`)
    }
    return response

}, error => {
    console.log('response interceptor encounter error:' + error)
    return Promise.reject(error)
})
export default httpClient