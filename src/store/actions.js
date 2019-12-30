export default {
    //context为上下文对象
    addCart(context, payload) {
        return new Promise((resolve, reject)=>{
            //1.查找数据中是否存在该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            console.log(oldProduct);

            //2.判断oldProduct
            if (oldProduct) {
                //如果存在payload,则count++
                context.commit('addCounter', oldProduct)
                resolve('添加商品数量加1')
            } else {
                //如果不存在payload,则添加到cartList中
                payload.count=1
                context.commit('addToCart', payload)
                resolve('添加商品成功')
            }
        })
    }
}