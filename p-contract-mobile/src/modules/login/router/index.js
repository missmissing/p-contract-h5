/**
 * Created by Season on 17/11/8.
 * QQ: 741876294
 */
import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/modules/login/login';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login
  }]
});
