import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import LocalStore from 'store';
import vueStore from './store';
import App from './App.vue';
import component from './components';
import errorHanding from '../../core/errorHanding';
import getRouter from './router';
import queryString from '../../util/queryString';
import Api from '../../api';
import {GET_PROCESSDATA, GET_ID} from './store/consts';
import './util/loadScripts';
import '../../assets/css/common.scss';

Vue.use(Router);
Vue.use(Vuex);
component(Vue);

const router = getRouter(Router);
const store = vueStore(Vuex);

new Vue({
  el: '#app',
  mixins: [errorHanding],
  router,
  store,
  components: {App},
  data() {
    return {
      canRender: false
    };
  },
  methods: {
    can() {
      const query = queryString();
      const {userId} = query;
      Api.login({userId}).then((res) => {
        const data = res.data.dataMap;
        const {userInfo} = data;
        LocalStore.set('user', userInfo);
        this.canRender = true;
      });
    }
  },
  created() {
    this.can();

    const {id, processData} = queryString();
    if (processData) {
      this.$store.commit(GET_PROCESSDATA, {
        data: JSON.parse(decodeURIComponent(processData))
      });
      this.$store.commit(GET_ID, {
        data: id
      });
    }
  },
  render(h) {
    if (this.canRender) {
      return h(App);
    }
    return '<div></div>';
  }
});
