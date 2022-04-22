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
        let imgLength = ref(0);

        function imgLoaded(){
            if(++imgLoadedCount.value === imgLength.value){
                
                console.log('图片加载完成');
                context.emit('imgsLoaded');
                
            }

        };

        watch(
            ()=> props.goodsImgs.length ,(newVal, oldValue) => {
                    imgLength.value = newVal;
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