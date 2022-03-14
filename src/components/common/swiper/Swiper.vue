<template>
    <!-- 插槽的整体架构 -->
    <div id="hy-swipper">
        <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
        </div>
        <slot name="indicator">
        </slot>
        <div class="indicator">
            <slot name="indicator" v-if="showIndicator && slideCount>1">
                <div class="indi-item" v-for="(item, index) in slideCount" :key='index' :class="{
                    active: index===currentIndex-1
                }" ></div>
            </slot>
        </div>
    </div>

</template>

<script>
// 该组件中封装了整体的轮播图
export default {
    name:"Swiper",
    props:{
        interval:{
            type:Number,
            default:3000
        },
        animDuration:{
            type:Number,
            default: 300
        },
        moveRatio:{
            type:Number,
            default:0.25
        },
        showIndicator:{
            type:Boolean,
            default: true

        }
    },
    data(){
        return{
            slideCount:0,//元素个数
            totalWidth:0,//swiper的宽度
            swiperStyle:{},//swiper的样式
            currentIndex:1,
            scrolling: false //是否在移动

        }
    },
    mounted() {
            //1.操作DOM，在前后添加slide
            setTimeout(()=>{
                this.handleDom();//1.操作DOM，在前后添加Slide
                this.startTimer();//2. 开启定时器
            }, 3000)
        },
    methods:{
        startTimer(){
            this.playTimer = window.setInterval(()=>{
                this.playTimer = window.setInterval(()=>{
                    this.currentIndex++;
                    this.scrollContent(-this.currentIndex * this.totalWidth);
                }, this.interval)
            })
        },
        stopTimer(){
            window.clearInterval()
        },
        scrollContent(){
            // 1. 设置正在滚动
            this.scrolling = true;
            // 2.开始滚动动画
            this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
            this.setTransform(currentPosition);

        },
        touchStart: function(e){
            // 1.如果正在滚动，则不可以拖动， 如果当前的组件（this）正在被拖动，则该方法不被触发
            if(this.scrolling) return; //return 在此处返回undefine ，并终止函数
            //2.停止定时器
            this.stopTimer(); 
            //3.***保存开始滚动的位置***
            this.startX = e.touches[0].pageX;
            //The touches property returns an array of Touch objects, one for each finger that is currently touching the surface
            //似乎是第一个触碰屏幕的指头
        },
        touchMove: function(e){
            //该事件在手指按下并开始拖动时起效
            //1. 计算出用户拖动的距离
            this.currentX = e.touches[0].pageX;
            console.log(this);
            this.distance = this.currentX - this.startX;
            let currentPosition = -this.currentIndex * this.totalWidth;
            let moveDistance = this.distance + currentPosition;
            // 2.设置当前的位置

            this.setTransform(moveDistance);
        },
        touchEnd: function(e){
            // 1.获取移动的距离
            let currentMove = Math.abs(this.distance);
            // 2. 判断最终的距离
            if (this.distance === 0){
                return;
            } else if (this.distance >0 && currentMove > this.totalWidth * this.moveRatio){

            }

        }    
        }


}
</script>

<style scoped>
.swiper{
    width: 200px;
    height: 200px;
    background-color: #f9d7c2;
}
</style>