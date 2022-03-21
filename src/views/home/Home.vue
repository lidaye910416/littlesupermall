<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:middle-content>
      购物街
      </template>
    </nav-bar>
    <!-- <h2>首页</h2> -->
    <home-swiper :banners="banners" >
    </home-swiper>
    <recommend-view :recommendInfo="recommend">
    </recommend-view>
    <feature-view/>
    
  </div>
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue';
import {getHomeMultidata} from "network/home";
import homeswiper from './childcomp/HomeSwiper.vue'; 
import recommendview from './childcomp/RecommendView.vue';
import featureview from './childcomp/FeatureView.vue';
// 上面的代码代表要在项目中不断进行解耦
export default {
  components:
  {
    'nav-bar': navbar,
    'home-swiper': homeswiper,
    'recommend-view': recommendview,
    'feature-view': featureview,
  },
  data(){
    return{
      banners:null,
      recommend:null
    }
  },
  created(){
    //生命周期函数，组件一创建立马发送网络请求
    getHomeMultidata().then(res=>{
      this.banners = res.data.banner.list; //箭头函数的this是向层作用域上查找的。
      this.recommend = res.data.recommend.list; //箭头函数的this是向层作用域上查找的。
      //外层this 就是一个vue 实例
    })  

  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
  height: 100vh;
  position: relative;

}

.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9
}
</style>