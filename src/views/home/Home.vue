<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:middle-content>
      购物街
      </template>
    </nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']" 
      class="tabcontrol1"
      @getcurrentItemIndex="getcurrentType" 
      ref="tabControl1"
      v-show="!isTabcontrolShowing" />
    <!-- <h2>首页</h2> -->
    <scroll class="content" ref="homeScrollContent" 
    @content-scroll="homeScroll"
    @pulling-up="homePullingUp"
    >
      <home-swiper :banners="banners" @swiper-loaded="swiperLoaded" />
      <recommend-view :recommendInfo="recommend"/>
      <feature-view/>
      <tab-control 
      :titles="['流行','新款','精选']" 
      class="tabcontrol"
      @getcurrentItemIndex="getcurrentType" 
      ref="tabControl"
      v-show="isTabcontrolShowing" />
      <!-- 对自定义事件还需要仔细思考 -->
      <!-- <goods-list :goods="getGoodsItem"/> -->
      <home-goods-list :goods="getGoodsItem"/>
    </scroll>
    <back-top @click="btClick(0,0)" v-show="isbacktopShow"/>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue';
import tabcontrol from 'components/content/tabcontrol/TabControl.vue'
import goodlist from 'components/content/goods/GoodsList.vue';
import scroll from 'components/common/scroll/Scroll.vue';
import backtop from 'components/common/backtop/BackTop.vue'
 

import homeswiper from './childcomp/HomeSwiper.vue'; 
import recommendview from './childcomp/RecommendView.vue';
import featureview from './childcomp/FeatureView.vue';
import homegoodslist from './childcomp/HomeGoodsList.vue'

import {getHomeMultidata, getHomeGoods} from "network/home";
// 上面的代码代表要在项目中不断进行解耦
export default {
  components:
  {
    'nav-bar': navbar,
    'home-swiper': homeswiper,
    'recommend-view': recommendview,
    'feature-view': featureview,
    'tab-control': tabcontrol,
    'goods-list':goodlist,
    'home-goods-list':homegoodslist,
    scroll,
    'back-top':backtop,
  },
  data(){
    return{
      banners:null,
      recommend:null,
      currentType:'pop',
      scrollPosition:null,
      tabcontrolOffsetTop:0,
      deactivatedPosition:null,
      
      allgoods:{
        'pop':{page:0, list:[]},
        'new':{page:0, list:[]},
        'sell':{page:0, list:[]}
      }
    }
  },
  computed:{
    getGoodsItem(){
      // console.log('计算属性中的this.allgoods',this.allgoods);
      // console.log('计算属性中的相应变量',this.currentType);
      return this.allgoods[this.currentType].list
    },
    isbacktopShow(){
      return this.scrollPosition>1000;
    },
    isTabcontrolShowing(){
      if (this.scrollPosition > this.tabcontrolOffsetTop){
        return false;
      }
      return true;
    }
  },
  methods:{
    
    swiperLoaded(){
      //调用此函数时swiper已经加载完,$el是调用原生的offsetTop函数
      this.tabcontrolOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    debounce(func, delay){
        // 这里添加一个防抖函数。
            let timer = null;
            return function(...args){
                if(timer) {
                  clearInterval(timer);
                  }
                timer = setTimeout(()=>{
                    func.apply(this, ...args)
                }, delay) 
            }
        },

    homePullingUp(){
      this.getHomeGoodsCreated(this.currentType);
    },

    homeScroll(pos){
      this.scrollPosition = -pos.y;
    },

    btClick(x, y){
      this.$refs.homeScrollContent.scrollTo(x,y);
      
    },
    
    getcurrentType(ctype){
      this.currentType = ctype;
      console.log('home组件中的currentType',this.currentType);
    },
    getHomeMultidataCreated(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list; //箭头函数的this是向层作用域上查找的。
        this.recommend = res.data.recommend.list; //箭头函数的this是向层作用域上查找的。  
        //外层this 就是一个vue实例
      })
    },
    getHomeGoodsCreated(type){
      const page = this.allgoods[type].page + 1;
      // 每次调用这个函数请求，页面需要加1
      getHomeGoods(type, page).then(res => {
        // console.log('Promise中返回的数据',res.data.list);
        // console.log('接收Promise中的数据前', this.allgoods);
        this.allgoods[type].list.push(...res.data.list);
        // console.log('接收Promise中的数据后', this.allgoods);
        this.allgoods[type].page++ ;
        //这里这个代码可能有问题y
        this.$refs.homeScrollContent.finishPullUp();
      })
    },
   
  },
  created(){
    //生命周期函数，组件一创建立马发送网络请求
    this.getHomeMultidataCreated();
    this.getHomeGoodsCreated('pop');
    this.getHomeGoodsCreated('new');
    this.getHomeGoodsCreated('sell');

  },
  mounted(){
    const debouncedFun = this.debounce(this.$refs.homeScrollContent.refresh, 500);
    this.$bus.on('imgLoaded', ()=>{
      debouncedFun();
      // 这种引用方式形成了闭包。使timer 始终存在不至于销毁
      
    })
  // this.$bus.on('imgLoaded',()=>{this.$refs.homeScrollContent.refresh()});
  },
  deactivated(){
    //组件销毁时记录位置
    this.deactivatedPosition = this.scrollPosition;
  },
  activated(){
    //组件重新激活时，滚动到之前的位置
    this.$refs.homeScrollContent.scrollTo(0, -this.deactivatedPosition, 0);
    this.$refs.homeScrollContent.refresh();
  }
  
}
</script>

<style scoped>
#home{
  width: 100vw;
  padding-top: 44px;
  height: 100vh;
  position: relative;

}
.tabcontrol1{
  position: relative;
  z-index: 1;
}
.home-nav{
  width: 100vw;
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9
}


.content{
  /* 这个确定视口的方式很有意思，让这个内容脱标！ */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
  overflow: hidden;
}
</style>