<template>
  <router-view/>
  <div id="nav">
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
