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
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        this.scroll = new bScroll(this.$refs.scrollWrapper,{
            probeType:3,
        });
        this.scroll.on('scroll',(ps)=>{
            this.$emit('contentScroll', ps);
        })

    
    },
    methods:{
        scrollTo(x, y, time=300){
            this.scroll.scrollTo(x, y, time);            
        }
    }

}
</script>

<style scoped>

</style>