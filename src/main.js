import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import Toast from "./components/common/toast";
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟
FastClick.attach(document.body)

//封装好的提示插件
Vue.use(Toast)

//图片懒加载
Vue.use(VueLazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
