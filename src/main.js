import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'


const app = createApp(App);
app.use(store).use(router).mount('#app');

// vue3 挂载事件总线
app.config.globalProperties.$bus = new mitt()

