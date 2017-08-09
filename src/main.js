import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import Vuex from 'vuex';
import router from './router';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import 'font-awesome/css/font-awesome.min.css';
import components from './components';
import errorHanding from './core/errorHanding';
import './assets/css/common.scss';

Vue.use(VueClipboard);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(components);

new Vue({
  el: '#app',
  template: '<App/>',
  mixins: [errorHanding],
  router,
  store,
  components: {App}
});
