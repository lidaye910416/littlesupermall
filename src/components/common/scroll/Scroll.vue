<template>
    <div ref="scrollWrapper">
        <div ref="scrollContent">
            <slot>

            </slot>
        </div>
    </div>
</template>

<script>
import bScroll from '@better-scroll/core';

export default {
    mounted(){
        console.log(this.$refs.scrollWrapper);
        new bScroll(this.$refs.scrollWrapper,{
            probeType:3,
        })
    },
    props:{
        // width:{
        //     type:Number,
        //     default(){
        //         return 100;
        //     }
        // }
    }

}
</script>

<style scoped>

</style>