import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import LocalStore from 'store'
import vueStore from './store'
import App from './App.vue'
import component from './components'
import errorHanding from '../../core/errorHanding'
import getRouter from './router'
import queryString from '../../util/queryString'
import Api from '../../api'
import Jump from './util/jump'
import '../../assets/css/common.scss'

Vue.use(Router)
Vue.use(Vuex)
component(Vue)

const router = getRouter(Router)
const store = vueStore(Vuex)

new Vue({ //eslint-disable-line
  el: '#app',
  mixins: [errorHanding],
  router,
  store,
  components: {App},
  data () {
    return {
      canRender: false
    }
  },
  beforeCreate () {
    const query = queryString()
    const {employeecode} = query
    Api.login({userId: employeecode}).then((res) => {
      const data = res.data.dataMap
      const {userInfo} = data
      LocalStore.set('user', userInfo)
    })
  },
  watch: {
    $route () {
      new Jump(store, router).init().then(() => {
        this.canRender = true
      })
    }
  },
  render (h) {
    if (this.canRender) {
      return h(App)
    }
    return '<div></div>'
  }
})
