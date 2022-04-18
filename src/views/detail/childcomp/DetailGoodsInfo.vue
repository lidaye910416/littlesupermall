<template>
    <div class="imgs-container">
        <div class="imgs-list" v-for="(item, index) in goodsImgs" :key="index" >
            <img :src="item">
        </div>
    </div>
</template>

<script>
export default {
    props:{
        goodsImgs:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}
</script>

<style scoped>
    .imgs-container{
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .imgs-list{
        flex-basis: 100%;
    }

    .imgs-list img{
        width: 100%;
        border-radius: 5px;
    }
</style>