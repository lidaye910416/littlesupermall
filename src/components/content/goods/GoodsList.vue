<template>
  <div class="goods-list">
      <goodslistitem v-for="(item, index) in goods" :key="index" 
      :goodsItem="item.show">
          
      </goodslistitem>
  </div>
</template>

<script>
import goodslistitem from "./GoodsListItem.vue"
export default {
    components:{
        goodslistitem
    },
    props:{
        goods:
        {
            type:Array,
            default(){
                return [];
            }
        }
    },
    
    
}
</script>

<style scoped>
    
</style>