<template>
    <div class="imgs-container">
        <div class="imgs-list" v-for="(item, index) in goodsImgs" :key="index" >
            <img :src="item" @load="imgLoaded">
        </div>
    </div>
</template>

<script>
import {watch, ref} from 'vue';

export default {
    props:{
        goodsImgs:{
            type:Array,
            default(){
                return null;
            }
        }
    },

    setup(props,context){
        let imgLoadedCount = ref(0); //图片加载完成的数量
        function imgLoaded(){
            imgLoadedCount.value++;
        };
        watch(
            imgLoadedCount,(newVal, oldValue) => {
                if (newVal === props.goodsImgs.length) {
                    // 图片加载完成,发射事件
                    console.log(newVal, props.goodsImgs.length);
                    context.emit('imgLoaded');
                }
            },
            {
                // immediate: true
            } 
        );
        return {
            imgLoaded
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