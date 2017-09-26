import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'
import * as types from '../store/consts'
import {routerNames} from '../core/consts'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/404',
      component: function (resolve) {
        require(['../components/404.vue'], resolve)
      },
      name: routerNames.error404,
      meta: {
        auth: false,
        hidden: true
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.home,
      meta: {
        auth: true,
        hidden: true
      },
      redirect: {name: routerNames.con_index}
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.home,
      meta: {
        auth: true,
        hidden: true
      },
      children: [{
        name: routerNames.con_index,
        path: '/con/index',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/home/index.vue'], resolve)
        }
      }]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_support,
      children: [
        {
          path: '/contemplate/see',
          component: function (resolve) {
            require(['../pages/support/see.vue'], resolve)
          },
          meta: {
            hidden: true,
            auth: true
          },
          name: routerNames.con_tpl_see
        },
        {
          path: '/contemplate/create',
          component: function (resolve) {
            require(['../pages/support/create.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_tpl_create
        },
        {
          path: '/contemplate/update',
          component: function (resolve) {
            require(['../pages/support/update.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_tpl_update
        },
        {
          path: '/contemplate/abolish',
          component: function (resolve) {
            require(['../pages/support/abolish.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_tpl_abolish
        }
      ],
      meta: {
        iconCls: 'stats-bars'
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_create,
      meta: {
        iconCls: 'stats-bars'
      },
      children: [
        {
          path: '/ConCreate/Create',
          meta: {
            auth: true
          },
          component: function (resolve) {
            require(['../pages/create/create.vue'], resolve)
          },
          name: routerNames.con_createIndex
        },
        {
          path: '/ConCreate/createSlaveProtocol',
          meta: {
            auth: true
          },
          component: function (resolve) {
            require(['../pages/create/createSlaveProtocol.vue'], resolve)
          },
          name: routerNames.con_createSlaveProtocol
        },
        {
          path: '/ConCreate/querySlaveProtocol',
          meta: {
            auth: true,
            hidden: true
          },
          component: function (resolve) {
            require(['../pages/create/createSlaveProtocol.vue'], resolve)
          },
          name: routerNames.con_querySlaveProtocol
        },
        {
          path: '/conperf/conupdate',
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_update,
          meta: {
            auth: true
          }
        },
        {
          path: '/conperf/conrepeal',
          component: function (resolve) {
            require(['../pages/performance/conRepeal.vue'], resolve)
          },
          name: routerNames.con_stop,
          meta: {
            auth: true
          }
        },
        {
          path: '/ConCreate/CreateFrameContract', // 创建框架合同
          meta: {
            auth: true,
            hidden: true
          },
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_createFrameContract
        },
        {
          path: '/ConCreate/CreateIntentionContract', // 创建意向合同
          meta: {
            auth: true,
            hidden: true
          },
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_createIntentionContract
        },
        {
          path: '/ConCreate/CreateSingleContract', // 创建单一合同
          meta: {
            auth: true,
            hidden: true
          },
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_createSingleContract
        },
        {
          path: '/ConCreate/CreateSimpleContract', // 创建简易合同
          meta: {
            auth: true,
            hidden: true
          },
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_createSimpleContract
        },
        {
          path: '/ConCreate/conCheck', // 查看合同
          component: function (resolve) {
            require(['../pages/create/createCon.vue'], resolve)
          },
          name: routerNames.con_Check,
          meta: {
            auth: true,
            hidden: true
          }
        }
      ]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_sign,
      children: [{
        path: '/consign/createpo',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/sign/createPO.vue'], resolve)
        },
        name: routerNames.con_purchase_order
      }, {
        path: '/consign/see',
        meta: {
          auth: true,
          hidden: true
        },
        component: function (resolve) {
          require(['../pages/sign/see.vue'], resolve)
        },
        name: routerNames.con_purchase_see
      }],
      meta: {
        iconCls: 'stats-bars'
      }
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_performance,
      meta: {
        iconCls: 'stats-bars'
      },
      children: [
        {
          path: '/conperf/inspectionreject',
          component: function (resolve) {
            require(['../pages/performance/inspectionReject.vue'], resolve)
          },
          name: routerNames.con_check_reject,
          meta: {
            auth: true
          }
        },
        {
          path: '/conperf/compensate',
          component: function (resolve) {
            require(['../pages/performance/compensate.vue'], resolve)
          },
          name: routerNames.con_compensate,
          meta: {
            auth: true
          }
        },
        {
          path: '/conperf/compensate/see',
          component: function (resolve) {
            require(['../pages/performance/compensateSee.vue'], resolve)
          },
          name: routerNames.con_compensate_see,
          meta: {
            auth: true,
            hidden: true
          }
        }
      ]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_process,
      meta: {
        iconCls: 'stats-bars',
        hidden: true
      },
      children: [{
        path: '/conProcess/handingProcess',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/process/handingProcess.vue'], resolve)
        },
        name: routerNames.con_handing_process
      }, {
        path: '/conProcess/createProcess',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/process/createProcess.vue'], resolve)
        },
        name: routerNames.con_create_process
      }, {
        path: '/conProcess/handleProcess',
        meta: {
          auth: true
        },
        component: function (resolve) {
          require(['../pages/process/handleProcess.vue'], resolve)
        },
        name: routerNames.con_handle_process
      }, {
        path: '/conProcess/see',
        meta: {
          auth: true,
          hidden: true
        },
        component: function (resolve) {
          require(['../pages/process/toPage.vue'], resolve)
        },
        name: routerNames.con_process_see
      }, {
        path: '/conProcess/approve',
        meta: {
          auth: true,
          hidden: true
        },
        component: function (resolve) {
          require(['../pages/process/toPage.vue'], resolve)
        },
        name: routerNames.con_process_approve
      }]
    },
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_search,
      children: [
        {
          path: '/conperf/conlist',
          component: function (resolve) {
            require(['../pages/create/conLIst.vue'], resolve)
          },
          name: routerNames.con_list,
          meta: {
            auth: true
          }
        },
        {
          path: '/contract/agreementList',
          component: function (resolve) {
            require(['../pages/create/agreementList.vue'], resolve)
          },
          name: routerNames.con_agreementList,
          meta: {
            auth: true
          }
        },
        {
          path: '/contemplate/list',
          component: function (resolve) {
            require(['../pages/support/list.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_tpl_list
        },
        {
          path: '/contemplate/orderList',
          component: function (resolve) {
            require(['../pages/sign/list.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_order_list
        }
      ],
      meta: {
        iconCls: 'stats-bars'
      }
    },
    {
      name: routerNames.redirect,
      path: '*',
      meta: {
        auth: true,
        hidden: true
      },
      redirect: {
        path: '/404'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  window.document.title = to.name
  // Auth验证
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
  next()
  store.commit(types.ROUTE, {
    data: {to, from}
  })
})

router.afterEach((route) => {
  nprogress.done()
  window.scrollTo(0, 0)
})

export default router
