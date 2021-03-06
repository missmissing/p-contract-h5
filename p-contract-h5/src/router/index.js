import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/index'
import * as types from '../store/consts'
import {routerNames} from '../core/consts'
import getEnv from '../util/getEnv'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/404',
      component (resolve) {
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
      component (resolve) {
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
      component (resolve) {
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
        component (resolve) {
          require(['../pages/home/index.vue'], resolve)
        }
      }]
    },
    {
      path: '/',
      component (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_support,
      children: [
        {
          path: '/contemplate/see',
          component (resolve) {
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
          component (resolve) {
            require(['../pages/support/create.vue'], resolve)
          },
          meta: {
            auth: true,
            public: true
          },
          name: routerNames.con_tpl_create
        },
        {
          path: '/contemplate/update',
          component (resolve) {
            require(['../pages/support/update.vue'], resolve)
          },
          meta: {
            auth: true,
            public: true
          },
          name: routerNames.con_tpl_update
        },
        {
          path: '/contemplate/abolish',
          component (resolve) {
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
      component (resolve) {
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
          component (resolve) {
            require(['../pages/create/create.vue'], resolve)
          },
          name: routerNames.con_createIndex
        },
        {
          path: '/contract/create', // 合同创建
          meta: {
            auth: true,
            hidden: true
          },
          component (resolve) {
            require(['../pages/con/index.vue'], resolve)
          },
          query: {pageStatus: 1},
          name: routerNames.con_contract_create
        },
        {
          path: '/conperf/conupdate',
          component (resolve) {
            require(['../pages/con/index.vue'], resolve)
          },
          query: {pageStatus: 2},
          name: routerNames.con_update,
          meta: {
            auth: true
          }
        },
        {
          path: '/ConCreate/conCheck', // 查看合同
          component (resolve) {
            require(['../pages/con/index.vue'], resolve)
          },
          query: {pageStatus: 3},
          name: routerNames.con_Check,
          meta: {
            auth: true,
            hidden: true
          }
        },
        {
          path: '/ConCreate/processCon', // 合同流程
          component (resolve) {
            require(['../pages/con/index.vue'], resolve)
          },
          query: {pageStatus: 4},
          name: routerNames.con_proc_see,
          meta: {
            auth: true,
            hidden: true
          }
        },
        {
          path: '/conperf/conrepeal',
          component (resolve) {
            require(['../pages/conRepeal/index.vue'], resolve)
          },
          name: routerNames.con_stop,
          query: {pageStatus: 1},
          meta: {
            auth: true
          }
        },
        {
          path: '/conperf/conrepeal/see',
          component (resolve) {
            require(['../pages/conRepeal/index.vue'], resolve)
          },
          name: routerNames.con_stop_see,
          query: {pageStatus: 3},
          meta: {
            auth: true,
            hidden: true
          }
        },
        {
          path: '/conperf/conrepeal/process',
          component (resolve) {
            require(['../pages/conRepeal/index.vue'], resolve)
          },
          name: routerNames.con_stop_process,
          query: {pageStatus: 4},
          meta: {
            auth: true,
            hidden: true
          }
        },
        {
          path: '/ConCreate/createSlaveProtocol',
          meta: {
            auth: true
          },
          component (resolve) {
            require(['../pages/slaveProtocol/index.vue'], resolve)
          },
          query: {pageStatus: 1},
          name: routerNames.con_createSlaveProtocol
        },
        {
          path: '/ConCreate/querySlaveProtocol',
          meta: {
            auth: true,
            hidden: true
          },
          component (resolve) {
            require(['../pages/slaveProtocol/index.vue'], resolve)
          },
          query: {pageStatus: 3},
          name: routerNames.con_querySlaveProtocol
        },
        {
          path: '/ConCreate/slaveProtocol/process',
          meta: {
            auth: true,
            hidden: true
          },
          component (resolve) {
            require(['../pages/slaveProtocol/index.vue'], resolve)
          },
          query: {pageStatus: 4},
          name: routerNames.con_slaveProtocol_process
        }
      ]
    },
    {
      path: '/',
      component (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_sign,
      children: [{
        path: '/consign/createpo',
        meta: {
          auth: true
        },
        component (resolve) {
          require(['../pages/sign/createPO.vue'], resolve)
        },
        name: routerNames.con_purchase_order
      }, {
        path: '/consign/see',
        meta: {
          auth: true,
          hidden: true
        },
        component (resolve) {
          require(['../pages/sign/see.vue'], resolve)
        },
        name: routerNames.con_purchase_see
      }, {
        path: '/consign/log',
        meta: {
          auth: true,
          hidden: true
        },
        component (resolve) {
          require(['../pages/sign/sendLog.vue'], resolve)
        },
        name: routerNames.con_order_log_list
      }, {
        path: '/conperf/inspectionreject',
        component (resolve) {
          require(['../pages/performance/inspectionReject.vue'], resolve)
        },
        name: routerNames.con_check_reject,
        meta: {
          auth: true
        }
      }, {
        path: '/conperf/inspectionreject/see',
        component (resolve) {
          require(['../pages/performance/inspectionRejectSee.vue'], resolve)
        },
        name: routerNames.con_check_reject_see,
        meta: {
          auth: true,
          hidden: true
        }
      }, {
        path: '/conperf/compensate',
        component (resolve) {
          require(['../pages/performance/compensate.vue'], resolve)
        },
        name: routerNames.con_compensate,
        meta: {
          auth: true
        }
      }, {
        path: '/conperf/compensate/see',
        component (resolve) {
          require(['../pages/performance/compensateSee.vue'], resolve)
        },
        name: routerNames.con_compensate_see,
        meta: {
          auth: true,
          hidden: true
        }
      }, {
        path: '/conperf/goods/receipt',
        name: routerNames.con_goods_receipt,
        meta: {
          auth: true
        },
        component (resolve) {
          require(['../pages/performance/goodsReceipt'], resolve)
        },
        beforeEnter: () => {
          nprogress.done()
          const target = {
            dev: 'http://192.168.122.218:1001/purchase/receivepo.html',
            prd: 'http://fp.oa.chinaredstar.com/purchase/receivepo.html'
          }
          if (getEnv() === 'prd') {
            window.open(target.prd)
          } else {
            window.open(target.dev)
          }
        }
      }, {
        path: '/conperf/services/receipt',
        name: routerNames.con_services_receipt,
        meta: {
          auth: true
        },
        component (resolve) {
          require(['../pages/performance/servicesReceipt'], resolve)
        },
        beforeEnter: () => {
          nprogress.done()
          const target = {
            prd: 'http://172.16.9.151:8081/Purchase/FWLCGSHQR/Start.aspx',
            dev: 'http://192.168.122.214:8081/Purchase/FWLCGSHQR/Start.aspx'
          }
          if (getEnv() === 'prd') {
            window.open(target.prd)
          } else {
            window.open(target.dev)
          }
        }
      }],
      meta: {
        iconCls: 'stats-bars'
      }
    },
    {
      path: '/',
      component (resolve) {
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
        component (resolve) {
          require(['../pages/process/handingProcess.vue'], resolve)
        },
        name: routerNames.con_handing_process
      }, {
        path: '/conProcess/createProcess',
        meta: {
          auth: true
        },
        component (resolve) {
          require(['../pages/process/createProcess.vue'], resolve)
        },
        name: routerNames.con_create_process
      }, {
        path: '/conProcess/handleProcess',
        meta: {
          auth: true
        },
        component (resolve) {
          require(['../pages/process/handleProcess.vue'], resolve)
        },
        name: routerNames.con_handle_process
      }, {
        path: '/conProcess/see',
        meta: {
          auth: true,
          hidden: true
        },
        component (resolve) {
          require(['../pages/process/toPage.vue'], resolve)
        },
        name: routerNames.con_process_see
      }, {
        path: '/conProcess/approve',
        meta: {
          auth: true,
          hidden: true
        },
        component (resolve) {
          require(['../pages/process/toPage.vue'], resolve)
        },
        name: routerNames.con_process_approve
      }]
    },
    {
      path: '/',
      component (resolve) {
        require(['../pages/home/home.vue'], resolve)
      },
      name: routerNames.con_search,
      children: [
        {
          path: '/conperf/conlist',
          component (resolve) {
            require(['../pages/list/conLIst.vue'], resolve)
          },
          name: routerNames.con_query,
          meta: {
            auth: true
          }
        },
        {
          path: '/contract/agreementList',
          component (resolve) {
            require(['../pages/list/agreementList.vue'], resolve)
          },
          name: routerNames.con_agreementList,
          meta: {
            auth: true
          }
        },
        {
          path: '/contemplate/list',
          component (resolve) {
            require(['../pages/list/tplList.vue'], resolve)
          },
          meta: {
            auth: true
          },
          name: routerNames.con_tpl_list
        },
        {
          path: '/contemplate/orderList',
          component (resolve) {
            require(['../pages/list/signList.vue'], resolve)
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
  next()
  store.commit(types.ROUTE, {
    data: {to, from}
  })
})

router.afterEach(() => {
  nprogress.done()
  window.scrollTo(0, 0)
})

export default router
