<template>
<div class="tab-control">
    <div v-for="(item, index) in titles" 
    class="tab-control-item" :key="index" @click="getcurrentIndex(index)"
    :class="{active:index===currentIndex}">
        <span>
            {{item}}
        </span>
    </div>
</div>

</template>

<script>
export default {
    props:
    {
        // 这个组件不一样的地方只有文字，因此不使用插槽而是使用props 
        titles:{
            type:Array,
            default(){
                return [];
            }
        },
    },
    data() {
            return {
                currentIndex:0,
                typeIndex:['pop', 'new', 'sell']
            }
        },
    methods: {
            getcurrentIndex(index){
                this.currentIndex = index;
                this.$emit('getcurrentItemIndex', this.typeIndex[index])
                // 自定义事件，将此时的选项发射出去。
            }
    },
}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    background-color: #fff;

}

.tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;

}

.active{
    color: var(--color-high-text);
}

.active span{
    border-bottom: 3px solid var(--color-tint);
    
}
</style>