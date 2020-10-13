import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import toast from '@/components/common/toast'

import fasetclick from 'fastclick'
import vuelazyload from 'vue-lazyload'

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

Vue.use(toast)

fasetclick.attach(document.body)

Vue.use(vuelazyload,{
  loading:require("./assets/img/common/placeholder.png")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
