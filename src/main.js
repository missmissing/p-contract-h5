import Vue from 'vue';
import App from './App.vue';
import store from './vuex/store';
import Vuex from 'vuex';
import router from './router';
import Mock from './mock';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import VueClipboard from 'vue-clipboard2';

import 'font-awesome/css/font-awesome.css';
import components from './components';
import VueResource from 'vue-resource';

Mock.bootstrap();

Vue.use(VueClipboard);
Vue.use(Vuex);
Vue.use(iview);
Vue.use(components);
Vue.use(VueResource);

router.beforeEach((to, from, next) => {
  let title = to.name;
  title = title ? title + ' - 采购合同管理' : '采购合同管理';
  window.document.title = title;
  iview.LoadingBar.start();

  //Auth验证
  if (to.meta.auth) {
    if (to.path === '/login') {
      localStorage.removeItem('user');
    }
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user && to.path !== '/login') {
      next({
        path: '/login?fromUrl=' + to.path
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  iview.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#application',
  template: '<App/>',
  router,
  store,
  components: {App}
});
