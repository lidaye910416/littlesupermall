<template>
  <div class="goods-list">
      <slot>
        <!-- <goodslistitem v-for="(item, index) in goods" :key="index" 
        :goodsItem="item.show"> 尽量保证组件与组件之间解耦 因此不能这么写
        
        </goodslistitem> -->
      </slot>
  </div>
</template>

<script>
export default {
    
    props:{
        // goods:
        // {
        //     type:Array,
        //     default(){
        //         return [];
        //     }
        // }
    },
    
    
}
</script>

<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; 
    /* 以上主轴的对齐方式 */
    align-items: center;
    /* 以上交叉轴的对齐方式 */
    
}
    
</style>