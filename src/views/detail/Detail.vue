<template>
    <div id="detail">
        <h2>这里是详情页</h2>
    </div>
  
</template>

<script>
import navbar from 'components/common/navbar/NavBar.vue'
import {useRoute} from 'vue-router';
import {ref, reactive} from 'vue';

import {getDetailInfo} from 'network/home';
export default {
    setup(){
        //以下代码用于测试
        const route = useRoute();
        // let tid =ref(route.params.id);

        const detailInf = reactive({
            banners:[],
            tid:route.params.id,
        });
        
        //获取详情页的网络请求
        (function getDetailImg(){
            console.log(detailInf.tid);
            getDetailInfo(detailInf.tid).then(res=>{
                console.log(res);
            })
        })();


        
        return {
            detailInf,
        }
    }
}
</script>

<style>

</style>