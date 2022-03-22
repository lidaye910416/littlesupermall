<template>
  <div class="recommend">
      <ul class="recommend-list">
          <li v-for="recommendItem in recommendInfo" :key="recommendItem.sort" >
              <a :href="recommendItem.link">
                  <img :src="recommendItem.image" alt="">
              </a>
              <div>
                  {{recommendItem.title}}
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'Recommend',
    props:{
        recommendInfo:{
            type:Array,
            
        }
    }
}
</script>

<style scope>
.recommend {
    width: 100%;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee
}
.recommend-list{
    display: flex;
    
}
.recommend-list li{
    flex: 1;
}

.recommend-list li::marker{
    content: ' ' ;
    /* 删除用户代理样式表 */

}

.recommend-list li a img{
    width: 90px;
}


</style>