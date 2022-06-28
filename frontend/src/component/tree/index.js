export default function (data) {
    let cloneData = JSON.parse(JSON.stringify(data))  // 对源数据深度克隆
    let tree = cloneData.filter((father)=>{           //循环所有项
        let branchArr = cloneData.filter((child)=>{
            return father.id == child.parentId        //返回每一项的子级数组
        });
        if(branchArr.length>0){
            father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId==0;    //返回第一层
    });
    return tree     //返回树形数据
}