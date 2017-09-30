import Vue from 'vue'
import LocalStore from 'store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Api from '@/api'
import App from './App.vue'
import router from './router'
import store from './store'
import errorHanding from './core/errorHanding'
import queryString from '@/util/queryString'
import './assets/css/common.scss'

Vue.use(ElementUI)

const init = () => {
  new Vue({
    el: '#app',
    mixins: [errorHanding],
    router,
    store,
    render: h => h(App)
  })
}

const query = queryString()
const {ticket} = query || {}
const user = LocalStore.get('user')
if (user || !ticket) {
  init()
} else {
  Api.login({ticket}).then((res) => {
    let  reg=/(^[\w:\/\.#]+)[\?]?/gi
    let  path=reg.exec(window.location.toString())
    window.location.href=path[1]
    LocalStore.set('user', res.data.dataMap)
    init()
  })
}
