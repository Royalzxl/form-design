import Vue from 'vue'
import ViewUI from 'view-design'
import App from './App.vue'

// 静态资源
import Assets from '@/assets'
import 'view-design/dist/styles/iview.css'

// 表单设计器
import FormDesign from '@/components/formDesign/index'

Vue.use(ViewUI)
Vue.use(FormDesign)

Vue.config.productionTip = false
Vue.prototype.$assets = window.Assets = Assets

new Vue({
  render: h => h(App)
}).$mount('#app')
