<template>
  <div class="home-goods-list">
        <goods-list>
            <template v-slot:default>
                <goods-list-item v-for="(item, index) in goods" 
                :key="index" 
                :goodsItem="item" 
                v-on:click="goodsItemClick(item)"/>
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
    },
    methods: {
        goodsItemClick(item){
            //点击后动态路由跳转
            this.$router.push({
                name:'Detail',
                query:{
                    id:item.iid
                } //尝试使用query方式传值。
                // params:{
                //     id:item.iid
                // }
            })
        }
    },
    
}
</script>

<style scoped>
.home-goods-list{
    width: 100%;
}
</style>
