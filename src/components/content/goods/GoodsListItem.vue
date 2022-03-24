<template>
    <div class="goods-list-item" >
        <img :src="goodsItem.img" alt="">
    </div>
</template>

<script>
export default {
    props:{
        'goodsItem':{
            type:Object,
            default(){
                return {};
            }
        }
    }
}
</script>

<style scoped>
.goods-list-item{
    width: 40vh;
    /* flex-basis: 40%; */
}
.goods-list-item img{
    width:95%;

}
</style>