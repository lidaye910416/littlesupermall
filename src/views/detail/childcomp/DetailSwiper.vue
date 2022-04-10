<template>
    <div id="detail-swiper">
        <swiper>
            <template v-slot:default>
                <swiper-item v-for="(item, index) in banners" :key="index">
                    <template v-slot:img>
                        <!-- <a :href="item.link"> -->
                            <img class="swiper-img" :src="item" alt="" @load="swiperLoaded">
                        <!-- </a> -->
                    </template>
                </swiper-item>
            </template>
        </swiper>
    </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper.vue'
import swiperitem from 'components/common/swiper/SwiperItem.vue'

export default {
    components:{
        swiper,
        'swiper-item': swiperitem
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    setup(){
        
    }
    
}
</script>

<style>
    .swiper-img{
        height: 300px;
        object-fit: cover;
    }
</style>