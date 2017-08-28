import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import errorHanding from './core/errorHanding'
import './assets/css/common.scss'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  template: '<App/>',
  mixins: [errorHanding],
  router,
  store,
  components: {App}
})
