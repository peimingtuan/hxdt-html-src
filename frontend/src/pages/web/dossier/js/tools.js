class Tool {
    debounce(fn){
        let args = arguments[1]
        fn.tId && clearTimeout(fn.tId)
        fn.tId = setTimeout(()=>{
            fn(args)
        },700)
    }
    timestampToDate(timestamp){
        let dd = new Date(timestamp)
        let y = dd.getFullYear()
        let m = this.addStr(dd.getMonth() + 1)
        let d = this.addStr(dd.getDate())
        return y + '-' + m + '-' + d
    }
    addStr(n){
        return n < 10 ? '0'+n : n
    }
    checkPhone(phone){
        if(!(/^1[34578]\d{9}$/.test(phone))){
            return false
        }else{
            return true
        }
    }
    checkPhones(phonesStr){
        let arr = phonesStr.split('、')
        for(let i = 0 ;i < arr.length;i++){
            if(!this.checkPhone(arr[i])){
                return false
            }
        }
        return true
    }
    checkCarNums(carNum){
        let arr = carNum.split('、')
        for(let i = 0 ;i < arr.length;i++){
            if(!this.checkCarNum(arr[i])){
                return false
            }
        }
        return true
    }
    initImg(arr){
        let res = []
        if(arr.length==0){
            return res
        }
        arr.map((item,index)=>{
            let arrItem = {}
            arrItem.id = 'item'+index
            arrItem.url = item
            res.push(arrItem)
        })
        return res
    }
    //IP验证
    isValidIP(ip) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    }
    //端口验证
    isPort(port){
        let reg=/^\d+(-\d+)?(,\d+(-\d+)?)*$/
        if(reg.test(port)&&port<65536)return true
        else return false
    }
    //ie浏览器验证
    isIE(){
        if (!!window.ActiveXObject || "ActiveXObject" in window){
            return true;
        }else{
            return false;
        }

    }

}
export default new Tool()