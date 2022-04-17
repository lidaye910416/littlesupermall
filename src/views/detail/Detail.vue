<template>
    <div id="detail">
        <nav-bar class="nav-bar">
            <template v-slot:middle-content>
                <div class="middle-content">
                    <div class="middle-content-titles" 
                    v-for="(item, index) in detailInf.titles" 
                    :key="index"
                    :class="{active: index===detailInf.currIndex}"
                    @click='detailInf.currIndex=index'>
                        {{item}}
                    </div>
                </div>
            </template>
            <template v-slot:left-content>
                <div class="left-content"  @click="goBack">
                    <div class="left-content-back">
                        <i class="iconfont icon-back">
                            +
                        </i>
                    </div>
                </div>
            </template>        
        </nav-bar>
        <div >
            <detail-swiper
            :banners="getbannerImgs"  />
        </div>
        <detail-base-info :goods="detailInf.goods"/>

    </div>
  
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue';
import detailswiper from './childcomp/DetailSwiper.vue';
import DetailBaseInfo from './childcomp/DetailBaseInfo.vue'

import {useRoute, useRouter}  from 'vue-router';
import {reactive, onBeforeMount, computed, onMounted} from 'vue';

import {getDetailInfo} from 'network/home';
export default {
    name: 'detail',
    components: {
        'nav-bar': navbar,
        'detail-swiper': detailswiper,
        'detail-base-info': DetailBaseInfo
        
    },
    setup(){
        //学习使用setup
        const route = useRoute();
        const router = useRouter();
        // let tid =ref(route.params.id);
        const goods = {
            title: '',
            desc: '',
            newPrice:'',
            oldPrice:'',
            discout:'',
            columns:[],
            services:[{name:'',icon:''}],
            //这里必须要预先装填数据，否则会报错
            realPrice:'',
            imgList:[]
        };
        const shop = {
            log: '',
            name: '',
            fans: '',
            sell: '',
            score:[],
            goodsCount:''
        };
        const detailInf = reactive({
            tid:route.params.id, //取出动态路由的id属性，并向服务器发送请求
            goods,
            shop,
            titles:['商品','参数','评价','详情'],
            currIndex:0
        });
        let constructGoodsInfo = function(res){
            detailInf.goods.imgList = res.result.itemInfo.topImages;
            detailInf.goods.title = res.result.itemInfo.title;
            detailInf.goods.desc = res.result.itemInfo.desc;
            detailInf.goods.newPrice = res.result.itemInfo.price;
            detailInf.goods.oldPrice = res.result.itemInfo.oldPrice;
            detailInf.goods.discout = res.result.itemInfo.discountDesc;
            detailInf.goods.columns = res.result.columns;
            detailInf.goods.services = res.result.shopInfo.services;
            detailInf.goods.realPrice = res.result.itemInfo.lowNowPrice;
        };
        let constructShopInfo = function(res){
            detailInf.shop.log = res.result.shopInfo.shopLogo;
            detailInf.shop.name = res.result.shopInfo.name;
            detailInf.shop.fans = res.result.shopInfo.cFans;
            detailInf.shop.sell = res.result.shopInfo.cSells;
            detailInf.shop.score = res.result.shopInfo.score;
            detailInf.shop.goodsCount = res.result.shopInfo.cGoods;
        };
        onBeforeMount(()=>{
            getDetailInfo(detailInf.tid).then(res=>{
                constructGoodsInfo(res);
                constructShopInfo(res);
            })
        });

        let getbannerImgs = computed(()=>{
            //以下代码会报错，最简单的处理是用try 包裹一下

            return detailInf.goods.imgList;
        });        

        //获取详情页的网络请求
        // function getDetailImg(){
        //     getDetailInfo(detailInf.tid).then(res=>{
        //         detailInf.detailResult = res;

        //     })
        // };

        function goBack(){
            router.go(-1);
        };
        return {
            detailInf,
            goBack,
            getbannerImgs
        }
    }
}
</script>

<style scoped>

.middle-content{
    display: flex;
    justify-content: space-between;
}

.middle-content-titles {
    flex: 1;
}

.active{
    color: #ff6700;
}

.left-content{
    width: 100%;
    height: 100%;
}
</style>