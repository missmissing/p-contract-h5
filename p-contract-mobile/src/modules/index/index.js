import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import component from '../../components';
import getRouter from './router';
import '../../assets/css/common.scss';

Vue.use(Router);
component(Vue);

const router = getRouter(Router);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
