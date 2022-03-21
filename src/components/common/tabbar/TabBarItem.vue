<template>
    <div class="tab-bar-item">
        <!-- <div :class="{'item-text':isActivated,}"> -->
        <div class="item-text" :style="activatedFontcolor">
            <slot name='item-text'>首页</slot>
        </div>
        <div v-if="!isActivated" class='item-icon'>
            <slot name='item-icon'></slot>
        </div>
        <div v-if="isActivated" class='item-icon-activated'>
            <slot name='item-icon-activated'></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        page:{
            type:String
        },
        custimizedfontcolor:{
            type:String,
            default:'pink'
        }
    }
    ,
    methods:{
        test(){
            console.log('输出页面',this.$route.path);
        }
    },
    computed:{
        isActivated(){
            //当前路由中是否包含当前的页面。
            return this.$route.path.indexOf(this.page)===-1 ? false: true; 
        },
        activatedFontcolor(){
            return !this.isActivated ? {}:{color: this.custimizedfontcolor} 
        }
    }

}
</script>

<style>
.tab-bar-item{
    flex:1;
    height: 49px;
}
.tab-bar-item .item-text{
    /* 这里写入基础样式 */
    
    color:  #42426F;
}
.tab-bar-item .item-icon{
    /* position: absolute; */
    transform: scale(0.5) translate(0,-50%);
}
.tab-bar-item .item-icon-activated{
    /* position: absolute; */
    transform: scale(0.5) translate(0,-50%);
    
}
</style>