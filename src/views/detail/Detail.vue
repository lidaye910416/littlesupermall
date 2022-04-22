<template>

    <div id="detail">
        <detail-nav-bar :titles="detailInf.titles" 
        @item-click="clickThenScroll"/>

        <scroll class="content" ref="detailScrollContent" >
            <div>
                <detail-swiper
                :banners="getbannerImgs"  />
            </div>
            <detail-base-info :goods="detailInf.goods"/>
            <detail-shop-info :shop="detailInf.shop"/>
            <detail-goods-info :goodsImgs="detailInf.goodsImgs"
            @imgs-loaded="imgLoaded"/>
        </scroll>
    </div>
  
</template>

<script>
import scroll from 'components/common/scroll/Scroll.vue';
import detailswiper from './childcomp/DetailSwiper.vue';
import DetailBaseInfo from './childcomp/DetailBaseInfo.vue';
import DetailShopInfo from './childcomp/DetailShopInfo.vue';
import DetailGoodsInfo from './childcomp/DetailGoodsInfo.vue';
import DetailNabBar from './childcomp/DetailNavBar.vue';

import {useRoute, useRouter}  from 'vue-router';
import {reactive, onBeforeMount, computed, onMounted,ref} from 'vue';

import {getDetailInfo} from 'network/home';
export default {
    name: 'detail',

    components: {
        scroll,
        'detail-swiper': detailswiper,
        'detail-base-info': DetailBaseInfo,
        'detail-shop-info': DetailShopInfo,
        'detail-goods-info': DetailGoodsInfo,
        'detail-nav-bar': DetailNabBar,
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
            log: 'test',
            name: '',
            fans: '',
            sell: 0,
            score:[],
            goodsCount:''
        };
        const detailInf = reactive({
            // tid:route.params.id, //取出动态路由的id属性，并向服务器发送请求
            tid:route.query.id, //尝试用query方式传值
            goods,
            shop,
            titles:['商品','参数','评价','详情'],
            currIndex:0,
            goodsImgs:[],
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
            detailInf.shop.logo = res.result.shopInfo.shopLogo;
            detailInf.shop.name = res.result.shopInfo.name;
            detailInf.shop.fans = res.result.shopInfo.cFans;
            detailInf.shop.sell = res.result.shopInfo.cSells;
            detailInf.shop.score = res.result.shopInfo.score;
            detailInf.shop.goodsCount = res.result.shopInfo.cGoods;
        };
        onBeforeMount(()=>{
            getDetailInfo(detailInf.tid).then(res=>{
                //取出相应数据
                constructGoodsInfo(res);
                constructShopInfo(res);
                detailInf.goodsImgs = res.result.detailInfo.detailImage[0].list;
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

        const detailScrollContent = ref(); //用来获取组件的dom元素,必须和组件上挂载的元素同名。

        function imgLoaded(){
            detailScrollContent.value.refresh();
        };

        function clickThenScroll(index){
            detailInf.currIndex = index;
            detailScrollContent.value.scrollTo('.content>div:nth-child('+(index+1)+')',500);
        };
        

        return {
            detailInf,
            goBack,
            getbannerImgs,
            detailScrollContent,
            imgLoaded
        }
    }
}
</script>

<style scoped>
#detail{
    
    position:relative;
    padding-top: 44px; 
    width: 100vw;
    height: 100vh;
}

.content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
}

/* .left-content{
    width: 100%;
    height: 100%;
} */
</style>