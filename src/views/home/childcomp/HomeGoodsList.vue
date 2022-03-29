<template>
  <div class="home-goods-list">
        <goods-list>
            <template v-slot:default>
                <goods-list-item v-for="(item, index) in goods" :key="index" 
                :goodsItem="item"/>
            </template>
        </goods-list>
  </div>
</template>

<script>
import goodslist from 'components/content/goods/GoodsList.vue'
import goodslistitem from 'components/content/goods/GoodsListItem.vue'

export default {
    components:{
        'goods-list':goodslist,
        'goods-list-item':goodslistitem

    },
    props:{
        goods:{
            type:Array,
            default(){
                return [];
            }
        }
    }
    
}
</script>

<style scoped>
.home-goods-list{
    width: 100%;
}
</style>
