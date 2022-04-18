<template>
    <router-view v-slot="{Component}">
      <!-- {{Component}} -->
      <transition>
        <keep-alive exclude="detail">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  <div id="tab">
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import maintabbar from 'components/content/mainTabbar/MainTabbar.vue';
export default {
  components:{
    'main-tabbar': maintabbar,
  }
  
}
</script>

<style>
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#tab {
  padding: 30px;
}

#tab a {
  font-weight: bold;
  color: #2c3e50;
}

#tab a.router-link-exact-active {
  color: #42b983;
}
</style>
