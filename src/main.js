import Vue from 'vue';
import LocalStore from 'store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Api from './api';
import App from './App.vue';
import router from './router';
import store from './store';
import errorHanding from './core/errorHanding';
import queryString from './util/queryString';
import './assets/css/common.scss';

Vue.use(ElementUI);

const init = () => {
  new Vue({
    el: '#app',
    mixins: [errorHanding],
    router,
    store,
    render: h => h(App)
  });
};

const query = queryString();
const {ticket} = query || {};

if (ticket) {
  Api.login({ticket}).then((res) => {
    const data = res.data.dataMap;
    const {userInfo, powers, powerSwitch} = data;
    LocalStore.set('user', userInfo);
    LocalStore.set('powers', powers);
    LocalStore.set('powerSwitch', powerSwitch);
    init();
  }).catch((res) => {
    const {data = {}} = res.response;
    const {code, message} = data;
    if (code !== 200) {
      new Vue().$alert(message, '标题', {
        type: 'error',
        confirmButtonText: '确定',
        callback: () => {
          Api.logoutForInvalidUser().then((ress) => {
            const {dataMap} = ress.data;
            const currentUrl = encodeURIComponent(`${window.location.origin}/#/con/index`);
            window.location.href = `${dataMap}${currentUrl}`;
          });
        }
      });
    }
  });
} else {
  init();
}

