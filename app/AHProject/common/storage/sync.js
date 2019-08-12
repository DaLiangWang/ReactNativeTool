

const sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
    loginState(params) {
        let { syncParams ,syncInBackground} = params;
        console.log(params);
        return new Promise(function (resolve, reject) {
            if (syncInBackground === undefined){
                reject({code:901,message:'没有数据'});
            } else if (!syncInBackground) {
                reject({code:902,message:'过期数据'});
            } else {
                reject({code:900,message:'其他错误'});
            }
        });
    }
}

export default sync;