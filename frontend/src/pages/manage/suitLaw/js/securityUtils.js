//import RSA from 'node-rsa'
import CryptoJS from 'crypto-js'
/**
 * 工具类Class
 */
class SecurityUtils {

  // constructor() {}
  //
  // static textplainFlag = '0x00'
  //
  // static RSAFlag = '0x01'
  //
  // static AESFlag = '0x02'
  //
  // static privateRSAInstance = null
  //
  // static publicRSAInstance = null
  //
  // static AESInstance = null
  //
  // static currentRSAPublicKey = null
  //
  // static currentRSAPrivateKey = null
  //
  // static currentAESKey = null


  /**
   * [base64Encode base64编码]
   * @param  {[String]} originalString  [原始字符串]
   * @return {[String]}                 [base64编码后的字符串]
   */
  base64Encode(originalString) {
    const paseStr = CryptoJS.enc.Utf8.parse(originalString)
    const base64 = CryptoJS.enc.Base64.stringify(paseStr)
    return base64
  }
  /**
   * [base64Decode base64解码]
   * @param  {[String]} base64String [base64编码后的字符串]
   * @return {[String]}              [原始字符串]
   */
  base64Decode(base64String) {
    const words = CryptoJS.enc.Base64.parse(base64String);
    const originalString = words.toString(CryptoJS.enc.Utf8);
    return originalString
  }
  /**
   * [stringToByte string2bytes]
   * @param  {[String]} str [字符串]
   * @return {[Array]}      [字节数组]
   */
  stringToBytes(str) {
    let bytes = new Array();
    let len, c;
    len = str.length;
    for (let i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;


  }
  /**
   * [byteToString bytes2String]
   * @param  {[Array]} arr    [字节数组]
   * @return {[String]}       [字符串]
   */
  bytesToString(arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    let str = '',
        _arr = arr;
    for (let i = 0; i < _arr.length; i++) {
      let one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        let bytesLength = v[0].length;
        let store = _arr[i].toString(2).slice(7 - bytesLength);
        for (let st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }
  /**
   * [RSAPublicKeyEncrypt RSA公钥加密]
   * @param   {[String]}  publicKey     [公钥]
   * @param   {[String]}  originalBody  [要加密的明文字符串]
   * @return  {[String]}                [RSA公钥加密结果(Base64字符串)]
   */
  // RSAPublicKeyEncrypt(publicKey, originalBody) {
  //   /*if (!SecurityUtils.currentRSAPublicKey ||
  //     SecurityUtils.currentRSAPublicKey !== SecurityUtils.publicKey) {
  //     SecurityUtils.publicRSAInstance = new RSA(publicKey)
  //   }*/
  //   const NodeRSAKey = new RSA(publicKey)
  //   NodeRSAKey.setOptions({ encryptionScheme: 'pkcs1', environment: 'browser' })
  //   const encryptBase64 = NodeRSAKey.encrypt(originalBody, 'base64', 'utf8')
  //
  //   return encryptBase64
  // }
  /**
   * [RSAPublicKeyDecrypt RSA公钥解密]
   * @param   {[String]}  publicKey     [公钥]
   * @param   {[String]}  encryptBody   [要解密的数据]
   * @return  {[JSON]}                  [RSA公钥解密结果(JSON)]
   */
  RSAPublicKeyDecrypt(publicKey, encryptBody) {
    /*if (!SecurityUtils.currentRSAPublicKey ||
      SecurityUtils.currentRSAPublicKey !== SecurityUtils.publicKey) {
      SecurityUtils.publicRSAInstance = new RSA(publicKey)
    }*/
    //const encryptBodyBase64 = this.bytesToString(encryptBody)

    // const NodeRSAKey = new RSA(publicKey)
    // NodeRSAKey.setOptions({ encryptionScheme: 'pkcs1', environment: 'browser' })
    // const originalBody = NodeRSAKey.decryptPublic(encryptBodyBase64, 'utf8')
    // return JSON.parse(originalBody)
  }
  /**
   * [RSAPrivateKeyEncrypt RSA私钥加密]
   * @param   {[String]}  privateKey      [私钥]
   * @param   {[String]}  originalBody    [要加密的明文字符串]
   * @return  {[String]}                  [RSA私钥加密结果(Base64字符串)]
   */
  RSAPrivateKeyEncrypt(privateKey, originalBody) {
    /*if (!SecurityUtils.currentRSAPrivateKey ||
      SecurityUtils.currentRSAPrivateKey !== SecurityUtils.privateKey) {
      SecurityUtils.privateRSAInstance = new RSA(privateKey)
    }*/
    // const NodeRSAKey = new RSA(privateKey)
    // NodeRSAKey.setOptions({ encryptionScheme: 'pkcs1', environment: 'browser' })
    // const encryptBase64 = NodeRSAKey.encryptPrivate(originalBody, 'base64')
    // return encryptBase64
  }
  /**
   * [RSAPublicKeyDecrypt RSA私钥解密]
   * @param   {[String]}  privateKey      [私钥]
   * @param   {[String]}  encryptBody     [要解密的数据]
   * @return  {[JSON]}                    [RSA私钥解密结果(JSON)]
   */
  RSAPrivateKeyDecrypt(privateKey, encryptBody) {
    /*if (!SecurityUtils.currentRSAPrivateKey ||
      SecurityUtils.currentRSAPrivateKey !== SecurityUtils.privateKey) {
      SecurityUtils.privateRSAInstance = new RSA(privateKey)
    }*/
    // const NodeRSAKey = new RSA(privateKey)
    // NodeRSAKey.setOptions({ encryptionScheme: 'pkcs1', environment: 'browser' })
    // const originalBody = NodeRSAKey.decrypt(encryptBody, 'utf8')
    // return JSON.parse(originalBody)
  }
  /**
   * [AESEncrypt AES加密]
   * @param   {[String]}  key           [AES秘钥]
   * @param   {[String]}  originalBody  [要加密的明文字符串]
   * @return  {[String]}                [AES加密结果(Base64字符串)]
   */
  AESEncrypt(key, originalBody) {
    const parseKey = CryptoJS.enc.Utf8.parse(key)
    const parseBody = CryptoJS.enc.Utf8.parse(originalBody)
    const encryptBody = CryptoJS.AES.encrypt(parseBody, parseKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encryptBody.toString()
  }

  /**
   * [AESDecrypt AES解密]
   * @param  {[String]} key           [AES秘钥]
   * @param  {[String]} encryptBody   [要解密的数据]
   * @return {[JSON]}                 [AES解密结果(JSON)]
   */
  AESDecrypt(key, encryptBody) {
    const parseKey = CryptoJS.enc.Utf8.parse(key)
    const decrypt = CryptoJS.AES.decrypt(encryptBody, parseKey, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    const decryptBody = CryptoJS.enc.Utf8.stringify(decrypt).toString()
    return JSON.parse(decryptBody)
  }
  /**
   * [generateRandomAESKey 获取AES 128位的key]
   * @return {[String]} [128位的key]
   */
  generateRandomAESKey() {
    const length = 16
    const base = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomKey = ''
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * base.length)
      randomKey += base.charAt(randomNumber)
    }
    return randomKey
  }
  /**
   * [generateClientRSAKeyPair 客户端生成RSA公钥私钥对]
   * @return {[type]} [description]
   */
  generateClientRSAKeyPair() {
    // const NodeRSAKey = new RSA({ b: 1024 })
    // const clientRSAPublicKey = NodeRSAKey.exportKey('public')
    // const clientRSAPrivateKey = NodeRSAKey.exportKey('pkcs8')
    // return {
    //   clientRSAPublicKey,
    //   clientRSAPrivateKey,
    // }
  }

  /**
   * [paramsMd5 将参数进行MD加密]
   * @param  {[type]} config [参数对象]
   * @return {[type]}        [description]
   */
  paramsMd5(config) {
    //先将参数对象进行排序
    const sortedKey = Object.keys(config).sort()
    let sortedObj = {}
    let connectStr = ""
    for (let i = 0; i < sortedKey.length; i++) {
      sortedObj[sortedKey[i]] = config[sortedKey[i]]
    }
    for (let val in sortedObj) {
      let uriEncode = encodeURIComponent(sortedObj[val])
      let str = val + "=" + uriEncode
      connectStr = connectStr + "&" + str
    }
    console.log("uri编码后的参数" + connectStr.slice(1))
    let paramsMd5 = CryptoJS.MD5(connectStr.slice(1)).toString()
    console.log("生成的sign" + paramsMd5.toLocaleUpperCase())
    return paramsMd5.toLocaleUpperCase()
  }

}


export default new SecurityUtils()
export { SecurityUtils }
