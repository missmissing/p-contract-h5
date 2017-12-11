import Vue from 'vue';
import '@/assets/css/common.scss';
import App from '../../App.vue';
import router from './router';
import './components';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
