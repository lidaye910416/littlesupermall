<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:middle-content>
      购物街
      </template>
    </nav-bar>
    <h2>首页</h2>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue';
import {getHomeMultidata} from "network/home"
export default {
  components:
  {
    'nav-bar': navbar  
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
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>