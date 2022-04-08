<template>
    <div id="detail">
        <h2>这里是详情页{{tid}}</h2>
    </div>
  
</template>

<script>
import {useRoute} from 'vue-router';
import {ref} from 'vue';
export default {
    setup(){
        const route = useRoute();
        let tid =ref(route.params.id);
        
        return {
            tid
        }
    }
}
</script>

<style>

</style>