import Vue from 'vue';
import Router from 'vue-router';
import LocalStore from 'store';
import App from './App.vue';
import component from '../../components';
import errorHanding from '../../core/errorHanding';
import getRouter from './router';
import queryString from '../../util/queryString';
import Api from '../../api';
import '../../assets/css/common.scss';

Vue.use(Router);
component(Vue);

const router = getRouter(Router);

new Vue({
  el: '#app',
  mixins: [errorHanding],
  router,
  components: {App},
  data() {
    return {
      canRender: false
    };
  },
  methods: {
    can() {
      const query = queryString();
      const {code} = query || {};
      Api.login({userId: code}).then((res) => {
        const data = res.data.dataMap;
        const {userInfo} = data;
        LocalStore.set('user', userInfo);
        this.canRender = true;
      });
    }
  },
  created() {
    //this.can();
    this.canRender = true;
  },
  render(h) {
    if (this.canRender) {
      return h(App);
    }
    return '<div></div>';
  }
});
