<template>
  <div class="slide">
    <slot name='img'></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;
  }

  .slide >>> img {
    width: 100%;
    /* 这里必须使用深度作用选择器才用功效 */

  }
</style>
