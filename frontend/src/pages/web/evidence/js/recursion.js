export default function func(tdata,num,times,selectArr){
    if(Array.isArray(tdata) && tdata.length>0){
        tdata.forEach(function(v,i){
            v.disabled=num;
            times.push(v.catalogId)
            if(v.isAuthorization)selectArr.push(v.catalogId)
            func(v.dossierChildrens,num,times,selectArr);
        });
    }
}