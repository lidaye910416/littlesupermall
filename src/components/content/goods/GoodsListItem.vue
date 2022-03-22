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

</style>