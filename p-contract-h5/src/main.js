import Vue from 'vue'
// import Ty from 'ty-client-core';
import LocalStore from 'store'
import Component from './components'
import Api from './api/index'
import App from './App.vue'
import router from './router'
import store from './store'
import errorHanding from './core/errorHanding'
import queryString from './util/queryString'
import './assets/css/common.scss'

Vue.use(Component)
// Vue.use(Ty);

new Vue({ //eslint-disable-line
  el: '#app',
  mixins: [errorHanding],
  router,
  store,
  data () {
    return {
      canRender: false
    }
  },
  methods: {
    can () {
      const query = queryString()
      const {ticket} = query || {}
      if (ticket) {
        Api.login({ticket}).then((res) => {
          const data = res.data.dataMap
          const {userInfo, powers, powerSwitch} = data
          LocalStore.set('user', userInfo)
          LocalStore.set('powers', powers)
          LocalStore.set('powerSwitch', powerSwitch)
          this.canRender = true
        }).catch((res) => {
          const {data = {}} = res.response
          const {code, message} = data
          if (code !== 200) {
            this.$alert(message, '标题', {
              type: 'error',
              confirmButtonText: '确定',
              callback: () => {
                Api.logoutForInvalidUser().then((ress) => {
                  const {dataMap} = ress.data
                  const currentUrl = encodeURIComponent(`${window.location.origin}/#/con/index`)
                  window.location.href = `${dataMap}${currentUrl}`
                })
              }
            })
          }
        })
      } else {
        this.canRender = true
      }
    }
  },
  created () {
    this.can()
  },
  render (h) {
    if (this.canRender) {
      return h(App)
    }
    return '<div></div>'
  }
})
