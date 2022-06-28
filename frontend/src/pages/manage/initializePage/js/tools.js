class Tool {
    debounce(fn) {
        let args = arguments[1]
        fn.tId && clearTimeout(fn.tId)
        fn.tId = setTimeout(() => {
            fn(args)
        }, 700)
    }
    timestampToDate(timestamp) {
        let dd = new Date(timestamp)
        let y = dd.getFullYear()
        let m = this.addStr(dd.getMonth() + 1)
        let d = this.addStr(dd.getDate())
        return y + '-' + m + '-' + d
    }
    addStr(n) {
        return n < 10 ? '0' + n : n
    }
    checkPhone(phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false
        } else {
            return true
        }
    }
    validatePhTelNumber(str) {
        const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
        return reg.test(str)
    }
    checkPhones(phonesStr) {
        let arr = phonesStr.split('、')
        for (let i = 0; i < arr.length; i++) {
            if (!this.checkPhone(arr[i])) {
                return false
            }
        }
        return true
    }
    checkCarNums(carNum) {
        let arr = carNum.split('、')
        for (let i = 0; i < arr.length; i++) {
            if (!this.checkCarNum(arr[i])) {
                return false
            }
        }
        return true
    }
    initImg(arr) {
        let res = []
        if (arr.length == 0) {
            return res
        }
        arr.map((item, index) => {
            let arrItem = {}
            arrItem.id = 'item' + index
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
    isPort(port) {
        let reg = /^\d+(-\d+)?(,\d+(-\d+)?)*$/
        if (reg.test(port) && port < 65536) return true
        else return false
    }
    //ie浏览器验证
    isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true;
        } else {
            return false;
        }

    }
    deepClone(obj) {
        let objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断obj子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === "object") {
                        objClone[key] = deepClone(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        return objClone;
    }
    //身份证
    cardId(card) {
        //let reg=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        //简单验证
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(card)) return true;
        else return false;
    }

    // getBlob 获取二进制流
    getBlob(url) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                }
            }
            xhr.send()
        })
    }
    // saveAs 下载保存文件
    saveAs(fileName) {
        if (window.navigator.msSaveOrOpenBlob) {
            this.getBlob(fileName).then(blob => {
                navigator.msSaveBlob(blob, decodeURIComponent(fileName.split('?')[1].split('&')[0].split('=')[1]))
            })
        } else {
            const iframe = document.createElement("iframe");
            iframe.style.display = "none"; // 防止影响页面
            iframe.style.height = 0; // 防止影响页面
            iframe.src = fileName;
            document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
            // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
            setTimeout(() => {
                iframe.remove();
            }, 5 * 60 * 1000);
        }
    }

}
export default new Tool()