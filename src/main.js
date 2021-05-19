import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/reset.scss'
import echarts from 'echarts'
import VueEcharts from 'vue-echarts'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import hls from 'videojs-contrib-hls'
import { Carousel, CarouselItem, Message } from 'element-ui'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.component('v-chart', VueEcharts)

Vue.prototype.$message = Message;
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(VueVideoPlayer)
Vue.use(hls)

Vue.prototype.publicUrl = 'http://172.168.10.21:8080/yzjtj/'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
