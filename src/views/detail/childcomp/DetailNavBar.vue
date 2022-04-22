<template>
<nav-bar class="nav-bar">
            <template v-slot:middle-content>
                <div class="middle-content">
                    <div class="middle-content-titles" 
                    v-for="(item, index) in titles" 
                    :key="index"
                    :class="{active: index===selectedIndex}"
                    @click='selectedIndex=index'>
                        {{item}}
                    </div>
                </div>
            </template>
            <template v-slot:left-content>
                <div class="left-content"  @click="goBack">
                    <div class="left-content-back">
                        <i class="iconfont icon-back">
                            +
                        </i>
                    </div>
                </div>
            </template>        
        </nav-bar>

</template>

<script>

import navbar from 'components/common/navbar/NavBar.vue';
import {useRoute, useRouter}  from 'vue-router';
import {ref}  from 'vue';

export default {
    props:{
        titles:{
            type:Array,
            default:[]
        }
    },
    components: {
        'nav-bar': navbar
    },
    setup(props, context){
        let selectedIndex = ref(0);
        const router = useRouter();

        function goBack(){
            router.go(-1);
        };
        
        //从组件中emit所选取的index参数
        function itemClick(index){
            selectedIndex = index;
            context.emit('itemClick', index);

        };

        return {
            goBack,
            selectedIndex
        }
    }
}
</script>

<style scoped>
.nav-bar{
    width: 100%;
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    background-color: #fff;
}

.middle-content{
    display: flex;
    justify-content: space-between;
}

.middle-content-titles {
    flex: 1;
}

.active{
    color: #ff6700;
}

</style>