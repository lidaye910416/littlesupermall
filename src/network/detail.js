//TODO 需要将detail 文件中的网络请求代码抽离
export function getDetailInfo(iidVuale){
    return request({
        url: '/detail',
        params:{
            iid:iidVuale
        }
    })
}

export class constructInfos{
    constructor(res){
        this.data = res.result
    }

    //获取商品基本信息
    getGoodsInfo(){
        //尝试使用es6解构赋值
        return {
            imgList:this.data.itemInfo.topImages,
            title:this.data.itemInfo.title,
            desc:this.data.itemInfo.desc,
            newPrice: this.data.itemInfo.price,
            oldPrice: this.data.itemInfo.oldPrice,
            discount: this.data.itemInfo.discountDesc,
            columns: this.data.columns,
            services: this.data.shopInfo.services,
            realPrice: this.data.itemInfo.lowNowPrice,
        }
    }

    //获取店面基本信息
    getShopInfo(){
        return{
            logo:this.data.shopInfo.shopLogo,
            name:this.data.shopInfo.name,
            fans:this.data.shopInfo.cFans,
            sell:this.data.shopInfo.cSells,
            score:this.data.shopInfo.score,
            goodsCount:this.data.shopInfo.cGoods
        }
    }
    
    //获取商品参数信息
    getParamsInfo(){
        return{
            imgs: this.data.itemParams.info.imgs?
            this.data.itemParams.info.imgs[0]:'',
            infos: this.data.itemParams.info.set,
            sizes:this.itemParams.rule.tables,
        }
    }

}