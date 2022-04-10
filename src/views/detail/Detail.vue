<template>
    <div id="detail">
        <nav-bar class="nav-bar">
            <template v-slot:middle-content>
                <div class="middle-content">
                    <div class="middle-content-titles" 
                    v-for="(item, index) in detailInf.titles" 
                    :key="index"
                    :class="{active: index===detailInf.currIndex}"
                    @click='detailInf.currIndex=index'>
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
        <div >
            <detail-swiper
            :banners="getbannerImgs"  />
        </div>
    </div>
  
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue';
import detailswiper from './childcomp/DetailSwiper.vue';

import {useRoute, useRouter}  from 'vue-router';
import {reactive, onBeforeMount, computed} from 'vue';

import {getDetailInfo} from 'network/home';
export default {
    components: {
        'nav-bar': navbar,
        'detail-swiper': detailswiper,
        
    },
    setup(){
        //学习使用setup
        const route = useRoute();
        const router = useRouter();
        // let tid =ref(route.params.id);
        const detailInf = reactive({
            tid:route.params.id,
            detailResult:{},
            titles:['商品','参数','评价','详情'],
            currIndex:0
        });
        onBeforeMount(()=>{
            getDetailInfo(detailInf.tid).then(res=>{
                detailInf.detailResult = res;
            })
        });

        let getbannerImgs = computed(()=>{
            //以下代码会报错，最简单的处理是用try 包裹一下
            return detailInf.detailResult.result.itemInfo.topImages;
        });        

        //获取详情页的网络请求
        // function getDetailImg(){
        //     getDetailInfo(detailInf.tid).then(res=>{
        //         detailInf.detailResult = res;

        //     })
        // };

        function goBack(){
            router.go(-1);
        };
        return {
            detailInf,
            goBack,
            getbannerImgs
        }
    }
}
</script>

<style scoped>

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

.left-content{
    width: 100%;
    height: 100%;
}
</style>