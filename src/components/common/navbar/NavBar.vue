<template>
  <div class="nav-bar">
      <div class="left">
      <!-- 这里使用div标签是方便未来进行布局-->
          <slot name="left-content"></slot>
      </div>
      <div class="middle">
          <slot name="middle-content"></slot>
      </div>
      <div class="right">
          <slot name="right-content"></slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
    display: flex;
    
    line-height: 44px;
    /* 以上属性写了以后，如果没有内容，则不会发挥功效 */
    box-shadow: 0px 1px 1px rgba(100,100,100,0.1);
    /*  */
}

.left, .right{
    width: 60px;
}

.middle{
    flex: 1;
}
</style>