<template>
  <swiper>
    <template v-slot:default>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <template v-slot:img>
          <a :href="item.link">
            <img :src="item.image" alt="" @load="swiperLoaded">
          </a>
        </template>
      </swiper-item>
    </template>
  </swiper>
</template>

<script>
import swiper from 'components/common/swiper/Swiper.vue'
import swiperitem from 'components/common/swiper/SwiperItem.vue'

export default {
    name: 'home-swiper',
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoaded:false,
      }
    },
    methods:{
      swiperLoaded(){
        if(!this.isLoaded){
          // 告知现在图片已经加载完毕
          this.$emit('swiperLoaded');
          this.isLoaded = true;
        }  
      }
    },
    components:{
        swiper,
        'swiper-item': swiperitem,
    }
}
</script>

<style>

</style>