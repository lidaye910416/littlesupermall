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
import pullUp from '@better-scroll/pull-up';

bScroll.use(pullUp);

export default {
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        this.scroll = new bScroll(this.$refs.scrollWrapper,{
            probeType:3,
            pullUpLoad:true,
        });

        this.scroll.on('scroll',(ps)=>{
            this.$emit('contentScroll', ps);
        });

        this.scroll.on('pullingUp', ()=>{
            this.$emit('pullingUp');
        })
    },
    methods:{
        
        scrollTo(x, y, time=300){
            // 注意这里需要严谨点的话，需要判断这里的scroll 对象是不是空的。
            this.scroll.scrollTo(x, y, time);            
        },
        refresh(){
            this.scroll.refresh();
        },
        finishPullUp(){
            this.scroll.finishPullUp();
            // 主动调用finishPullingUp 告诉BetterScroll 准备好下一次pullingUp
        },
        refresh(){
            this.scroll.refresh();
        }
    }

}
</script>

<style scoped>

</style>