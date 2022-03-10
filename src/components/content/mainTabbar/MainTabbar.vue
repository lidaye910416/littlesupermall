<template>
  <tab-bar>
      <tab-bar-item @click="JumpToPage('home')" page="home">
        <template v-slot:item-text >首页</template>
        <template v-slot:item-icon >
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:item-icon-activated>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
      </tab-bar-item>
      <tab-bar-item @click="JumpToPage('cart')" page="cart">
        <template v-slot:item-text>购物车</template>
        <template v-slot:item-icon >
          <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:item-icon-activated>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
      </tab-bar-item>
      <tab-bar-item @click="JumpToPage('category')" page="category">
        <template v-slot:item-text>分类</template>
        <template v-slot:item-icon >
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:item-icon-activated>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
      </tab-bar-item>
      <tab-bar-item @click="JumpToPage('profile')" page="profile">
        <template v-slot:item-text>个人主页</template>
        <template v-slot:item-icon >
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:item-icon-activated>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue' 
import TabBarItem from 'components/common/tabbar/TabBarItem.vue' 

export default {
    components:{
    'tab-bar':TabBar,
    'tab-bar-item':TabBarItem
  },
  methods:{
    JumpToPage(page){
      //传入需要跳转的页面
      console.log(page);
      this.$router.push('/'+page)

    }
  }
      
}
</script>

<style>

</style>