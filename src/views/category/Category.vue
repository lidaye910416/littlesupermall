<template>
  <div id="category">
      <h2>分类</h2>
        <!-- 滚动容器中只能有一个父标签 -->
        <scroll class="wrapper">
          <template v-slot:default>
            <ul>
              <li>我是标签1</li>
              <li>我是标签2</li>
              <li>我是标签3</li>
              <li>我是标签4</li>
              <li>我是标签5</li>
              <li>我是标签6</li>
              <li>我是标签7</li>
              <li>我是标签8</li>
              <li>我是标签9</li>
              <li>我是标签10</li>
              <li>我是标签11</li>
              <li>我是标签12</li>
              <li>我是标签13</li>
              <li>我是标签14</li>
              <li>我是标签15</li>
              <li>我是标签16</li>
              <li>我是标签17</li>
              <li>我是标签18</li>
              <li>我是标签19</li>
              <li>我是标签20</li>
              <li>我是标签21</li>
              <li>我是标签22</li>
              <li>我是标签23</li>
              <li>我是标签24</li>
              <li>我是标签25</li>
              <li>我是标签26</li>
              <li>我是标签27</li>
              <li>我是标签28</li>
              <li>我是标签29</li>
              <li>我是标签30</li>
              <li>我是标签31</li>
              <li>我是标签32</li>
              <li>我是标签33</li>
              <li>我是标签34</li>
              <li>我是标签35</li>
              <li>我是标签36</li>
              <li>我是标签37</li>
              <li>我是标签38</li>
              <li>我是标签39</li>
              <li>我是标签40</li>
              <li>我是标签41</li>
              <li>我是标签42</li>
              <li>我是标签43</li>
              <li>我是标签44</li>
              <li>我是标签45</li>
              <li>我是标签46</li>
              <li>我是标签47</li>
              <li>我是标签48</li>
              <li>我是标签49</li>
              <li>我是标签50</li>
              <li>我是标签51</li>
              <li>我是标签52</li>
              <li>我是标签53</li>
              <li>我是标签54</li>
              <li>我是标签55</li>
              <li>我是标签56</li>
              <li>我是标签57</li>
              <li>我是标签58</li>
              <li>我是标签59</li>
              <li>我是标签60</li>
              <li>我是标签61</li>
              <li>我是标签62</li>
              <li>我是标签63</li>
              <li>我是标签64</li>
              <li>我是标签65</li>
              <li>我是标签66</li>
              <li>我是标签67</li>
              <li>我是标签68</li>
              <li>我是标签69</li>
              <li>我是标签70</li>
              <li>我是标签71</li>
              <li>我是标签72</li>
              <li>我是标签73</li>
              <li>我是标签74</li>
              <li>我是标签75</li>
              <li>我是标签76</li>
              <li>我是标签77</li>
              <li>我是标签78</li>
              <li>我是标签79</li>
              <li>我是标签80</li>
              <li>我是标签81</li>
              <li>我是标签82</li>
              <li>我是标签83</li>
              <li>我是标签84</li>
              <li>我是标签85</li>
              <li>我是标签86</li>
              <li>我是标签87</li>
              <li>我是标签88</li>
              <li>我是标签89</li>
              <li>我是标签90</li>
              <li>我是标签91</li>
              <li>我是标签92</li>
              <li>我是标签93</li>
              <li>我是标签94</li>
              <li>我是标签95</li>
              <li>我是标签96</li>
              <li>我是标签97</li>
              <li>我是标签98</li>
              <li>我是标签99</li>
              <li>我是标签100</li>
            </ul>
          </template>
        </scroll>
  </div>
</template>

<script>
// import bScroll from '@better-scroll/core';
import scroll from 'components/common/scroll/Scroll.vue';
export default {
  name:'Category',
  components:{
    scroll
  },
  data(){
    return{
      // myscroll:null,
    }
  },
  mounted(){
    // console.log(this.$refs.testb);
    // this.myscroll = new bScroll(this.$refs.testb,{
    //   probeType:3
    // });
    // this.myscroll.on('scroll', (po)=>{
    //   console.log(po);
    // })
  }

}
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
  }
</style>