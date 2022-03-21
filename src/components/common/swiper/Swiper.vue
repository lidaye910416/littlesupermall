<template>
    <!-- 插槽的整体架构 -->
    <div id="hy-swiper">
        <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <slot></slot>
        </div>
        <slot name="indicator">
        </slot>
        <div class="indicator">
            <slot name="indicator" v-if="showIndicator && slideCount>1">
                <div class="indi-item" v-for="(item, index) in slideCount" :key='index' :class="
                {
                    active: index===currentIndex-1
                }
                " ></div>
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
            currentIndex:1, //记录当前的index
            scrolling: false //是否在移动

        }
    },
    mounted() {
            // 0.当在页面中渲染出DOM后执行
            // 1.操作DOM，在前后添加slide
            setTimeout(()=>{
                this.handleDom();//1.操作DOM，在前后添加Slide
                this.startTimer();//2. 开启定时器
            }, 1000)
        },
    methods:{
        startTimer(){
            this.playTimer = window.setInterval(()=>{
                this.currentIndex++;
                this.scrollContent(-this.currentIndex * this.totalWidth);
            }, this.interval)
        },

        stopTimer(){
            this.scrolling = false;
            window.clearInterval(this.playTimer);
        },

        scrollContent(currentPosition){
            // 1. 设置正在滚动
            this.scrolling = true;
            // 2.开始滚动动画
            this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
            this.setTransform(currentPosition);
            // 3. 判断滚动到的位置
            this.checkPosition();

        },

        setTransform(position){

            this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
            this.swiperStyle['-webkit-transform'] = `translate3d(${position}px, 0, 0)`;
            this.swiperStyle['-ms-transform'] = `translate3d(${position}px, 0, 0)`;
        },

        checkPosition(){
            window.setTimeout(()=>{
                //1. 校验正确的位置
                if(this.currentIndex >= this.slideCount + 1){
                    this.swiperStyle.transition = '0ms';
                    // 判断，当移到”假的“最后的一个元素时（也即是第一个元素），迅速变到”真的“第一个元素。
                    this.currentIndex = 1;
                    this.setTransform(-this.currentIndex*this.totalWidth);
                }
                else if(this.currentIndex <= 0){
                    this.swiperStyle.transition = '0ms';
                    // 当移到”假的“第一个元素时（也即是最后一个元素），迅速变到”真的“最后一个元素。
                    this.currentIndex = this.slideCount;
                    this.setTransform(-this.currentIndex*this.totalWidth);
                }
                //2. 结束移动后回调
                this.$emit('transitionEnd', this.currentIndex-1);
            }, this.animDuration)
        },


        handleDom(){
            // 该函数用来生成整体页面的DOM元素。

            // 1.获取操作的元素
            let swiperEl = document.querySelector('.swiper');
            let slidesEls = swiperEl.getElementsByClassName('slide');
            // 2.保存个数
            this.slideCount = slidesEls.length;
            // 3. 如果大于1个, 那么在前后分别添加一个slide
            if(this.slideCount > 1){
                let cloneFirst = slidesEls[0].cloneNode(true);
                let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
                swiperEl.insertBefore(cloneLast, slidesEls[0]);//将最后一个元素拷贝至第一位.
                swiperEl.appendChild(cloneFirst);//将第一个元素拷贝至最后.
                this.totalWidth = swiperEl.offsetWidth;
                this.swiperStyle = swiperEl.style;
            }

            // 4.让swiper 元素, 显示第一个(目前是显示前面添加的最后一个元素)
            this.setTransform(-this.totalWidth);

        },

        touchStart(e){
            // 1.如果正在滚动，则不可以拖动， 如果当前的组件（this）正在被拖动，则该方法不被触发
            // if(this.scrolling) return; //return 在此处返回undefine ，并终止函数
            //2.停止定时器
            this.stopTimer(); 
            //3.***保存开始滚动的位置***
            this.startX = e.touches[0].pageX;
            //The touches property returns an array of Touch objects, one for each finger that is currently touching the surface
            //似乎是第一个触碰屏幕的指头
            console.log('touchstart 事件执行');
        },
        touchMove(e){
            //该事件在手指按下并开始拖动时起效
            //1. 计算出用户拖动的距离
            this.currentX = e.touches[0].pageX;
            this.distance = this.currentX - this.startX;
            let currentPosition = -this.currentIndex * this.totalWidth;
            let moveDistance = this.distance + currentPosition;
            // 2.设置当前的位置
            this.setTransform(moveDistance);
        
        },
        
        touchEnd(e){
            // 1.获取移动的距离
            let currentMove = Math.abs(this.distance);
            // 2. 判断最终的距离
            if (this.distance === 0){
                return;
            } else if (this.distance >0 && currentMove > this.totalWidth * this.moveRatio){
                this.currentIndex--
            }else if(this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){
                this.currentIndex++
            }
            // 3. 移动到正确的位置
            this.scrollContent(-this.currentIndex * this.totalWidth);

            // 4. 移动完成后重新开启定时器
            this.startTimer();
        },
        
        // previous(){
        //     this.changeItem(-1)
        // },
        // next(){
        //     this.changeItem(1)
        // },
        // changeItem: function(num){
        //     this.stopTimer();

        //     this.currentIndex += num;
        //     this.scrollContent(-this.currentIndex * this.totalWidth);

        //     this.startTimer();
        // }
        
        }


}
</script>

<style scoped>
    #hy-swiper {
        overflow: hidden;
        position: relative;
    }

    .swiper {
        display: flex;
    }

    .indicator {
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        bottom: 8px;
    }

    .indi-item {
        box-sizing: border-box;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        line-height: 8px;
        text-align: center;
        font-size: 12px;
        margin: 0 5px;
    }

    .indi-item.active {
        background-color: rgba(212,62,46,1.0);
    }
</style>