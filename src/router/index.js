import Vue from 'vue';
import iview from 'iview';
import Router from 'vue-router';
import {routerNames} from '../api/const';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      // component: Login,
      component: function (resolve) {
        require(['../components/login.vue'], resolve);
      },
      pageTitle: '登录',
      name: routerNames.login,
      hidden: true,
      meta: {
        auth: false
      }
    },
    {
      path: '/404',
      // component: NotFound,
      component: function (resolve) {
        require(['../components/404.vue'], resolve);
      },
      pageTitle: '404',
      name: routerNames.error404,
      hidden: true,
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home.vue'], resolve);
      },
      pageTitle: '首页',
      name: routerNames.home,
      hidden: true,
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home.vue'], resolve);
      },
      name: routerNames.con_create,
      iconCls: 'stats-bars',
      auth: true,
      children: [{
        path: '/ConCreate/Create',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/create/create.vue'], resolve);
        },
        name: routerNames.con_create
      },
        {
          path: '/ConCreate/CreateFrameCon',
          meta: {
            auth: true
          },
          component: function (resolve) {
            require(['../pages/create/createFrameCon.vue'], resolve);
          },
          name: routerNames.con_createframecon,
          hidden: true
        }
      ]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home.vue'], resolve);
      },
      name: routerNames.con_sign,
      iconCls: 'stats-bars',
      children: [{
        path: '/consign/createpo',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/sign/createPO.vue'], resolve);
        },
        name: routerNames.po_create,
      }]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home.vue'], resolve);
      },
      name: routerNames.con_pref,
      iconCls: 'stats-bars',
      children: [{
        path: '/conperf/inspection',
        component: function (resolve) {
          require(['../pages/performance/inspection.vue'], resolve);
        },
        name: routerNames.con_inspection,
        meta: {
          auth: true
        },
        hidden: true
      },
        {
          path: '/conperf/inspectionreject',
          component: function (resolve) {
            require(['../pages/performance/inspectionReject.vue'], resolve);
          },
          name: routerNames.con_inspection_reject,
          meta: {
            auth: true
          },
        },
        {
          path: '/conperf/conupdate',
          component: function (resolve) {
            require(['../pages/performance/conUpdate.vue'], resolve);
          },
          name: routerNames.con_update,
          meta: {
            auth: true
          },
        },
        {
          path: '/conperf/conrepeal',
          component: function (resolve) {
            require(['../pages/performance/conRepeal.vue'], resolve);
          },
          name: routerNames.con_repeal,
          meta: {
            auth: true
          },
        },
        {
          path: '/conperf/compensate',
          component: function (resolve) {
            require(['../pages/performance/compensate.vue'], resolve);
          },
          name: routerNames.con_compensate,
          meta: {
            auth: true
          },
        }
      ]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../components/home.vue'], resolve);
      },
      name: routerNames.con_template,
      iconCls: 'stats-bars',
      children: [{
        path: '/contemplate/create',
        component: function (resolve) {
          require(['../pages/template/create.vue'], resolve);
        },
        meta: {
          auth: true
        },
        name: routerNames.template_create
      },
        {
          path: '/contemplate/update',
          component: function (resolve) {
            require(['../pages/template/update.vue'], resolve);
          },
          meta: {
            auth: true
          },
          name: routerNames.template_update
        },
        {
          path: '/contemplate/delete',
          component: function (resolve) {
            require(['../pages/template/delete.vue'], resolve);
          },
          meta: {
            auth: true
          },
          name: routerNames.template_delete
        },
        {
          path: '/contemplate/query',
          component: function (resolve) {
            require(['../pages/template/query.vue'], resolve);
          },
          meta: {
            auth: true
          },
          name: routerNames.template_query
        },
        {
          path: '/contemplate/conquery',
          component: function (resolve) {
            require(['../pages/template/conQuery.vue'], resolve);
          },
          meta: {
            auth: true
          },
          name: routerNames.con_query
        }
      ]
    },
    {
      path: '*',
      hidden: true,
      meta: {
        auth: true
      },
      redirect: {
        path: '/404'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let title = to.name;
  title = title ? title + ' - 采购合同管理' : '采购合同管理';
  window.document.title = title;
  iview.LoadingBar.start();

  //Auth验证
  // if (to.meta.auth) {
  //   if (to.path === '/login') {
  //     localStorage.removeItem('user');
  //   }
  //   let user = JSON.parse(localStorage.getItem('user'));
  //   if (!user && to.path !== '/login') {
  //     next({
  //       path: '/login?fromUrl=' + to.path
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  next();
});

router.afterEach(() => {
  iview.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
