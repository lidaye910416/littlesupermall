<template>
    <div class="goods-list-item" >
        <img :src="goodsItem.show.img" alt="" @load="imgLoaded">
        <div class="goods-item-detail">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.orgPrice}}</span>
            <span class="collect">{{goodsItem.cfaw}}</span>
        </div>
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
    },
    methods: {
        imgLoaded(){
            this.$bus.emit('itemImgLoaded');
        }
    },
}
</script>

<style scoped>
    .goods-list-item{
        flex-basis: 48%;
        padding-bottom: 40px;
        position: relative;
    }
    .goods-list-item img{
        width: 100%;
        border-radius: 5px;
        /* padding: 6px 6px; */
    }
    .goods-item-detail{
        font-size:12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right:0;
        overflow: hidden;
        text-align: center;
    }

    .goods-item-detail p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* 以上三个属性结合在一起用 */
        margin-top: 3px;
    }
</style>