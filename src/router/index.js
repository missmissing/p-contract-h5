import Vue from 'vue';
import iview from 'iview';
import Router from 'vue-router';
import {routerNames} from '../core/consts';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/login',
            component: function (resolve) {
                require(['../components/login.vue'], resolve);
            },
            name: routerNames.login,
            meta: {
                auth: false,
                hidden: true,
            }
        },
        {
            path: '/404',
            component: function (resolve) {
                require(['../components/404.vue'], resolve);
            },
            name: routerNames.error404,
            meta: {
                auth: false,
                hidden: true,
            }
        },
        {
            path: '/',
            component: function (resolve) {
                require(['../pages/home/home.vue'], resolve);
            },
            name: routerNames.home,
            meta: {
                auth: true,
                hidden: true,
            }
        },
        {
            path: '/',
            component: function (resolve) {
                require(['../pages/home/home.vue'], resolve);
            },
            name: routerNames.con_create,
            children: [
                {
                    path: '/ConCreate/Create',
                    meta: {
                        auth: true
                    },
                    component: function (resolve) {
                        require(['../pages/create/create.vue'], resolve);
                    },
                    name: routerNames.con_createIndex
                },
                {
                    path: '/ConCreate/CreateFrameContract',//创建框架合同
                    meta: {
                        auth: true,
                    },
                    //hidden: true,
                    component: function (resolve) {
                        require(['../pages/create/createContract.vue'], resolve);
                    },
                    name: routerNames.con_createFrameContract
                },
                {
                    path: '/ConCreate/CreateIntentionContract',//创建意向合同
                    meta: {
                        auth: true,
                    },
                    //hidden: true,
                    component: function (resolve) {
                        require(['../pages/create/createFrameCon.vue'], resolve);
                    },
                    name: routerNames.con_createIntentionContract
                },
                {
                    path: '/ConCreate/CreateSingleContract',//创建单一合同
                    meta: {
                        auth: true,
                    },
                    //hidden: true,
                    component: function (resolve) {
                        require(['../pages/create/createFrameCon.vue'], resolve);
                    },
                    name: routerNames.con_createSingleContract
                },
                {
                    path: '/ConCreate/CreateSimpleContract',//创建简易合同
                    meta: {
                        auth: true,
                    },
                    //hidden: true,
                    component: function (resolve) {
                        require(['../pages/create/createFrameCon.vue'], resolve);
                    },
                    name: routerNames.con_createSimpleContract
                }
            ],
            meta: {
                iconCls: 'stats-bars',
            }
        },
        {
            path: '/',
            component: function (resolve) {
                require(['../pages/home/home.vue'], resolve);
            },
            name: routerNames.con_sign,
            children: [{
                path: '/consign/createpo',
                meta: {
                    auth: true
                },
                component: function (resolve) {
                    require(['../pages/sign/createPO.vue'], resolve);
                },
                name: routerNames.con_purchase_order,
            }],
            meta: {
                iconCls: 'stats-bars'
            }
        },
        {
            path: '/',
            component: function (resolve) {
                require(['../pages/home/home.vue'], resolve);
            },
            name: routerNames.con_performance,
            children: [
                {
                    path: '/conperf/inspection',
                    component: function (resolve) {
                        require(['../pages/performance/inspection.vue'], resolve);
                    },
                    name: routerNames.con_performanceIndex,
                    meta: {
                        auth: true
                    },
                },
                {
                    path: '/conperf/inspectionreject',
                    component: function (resolve) {
                        require(['../pages/performance/inspectionReject.vue'], resolve);
                    },
                    name: routerNames.con_check_reject,
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
                    name: routerNames.con_stop,
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
            ],
            meta: {
                iconCls: 'stats-bars'
            }
        },
        {
            path: '/',
            component: function (resolve) {
                require(['../pages/home/home.vue'], resolve);
            },
            name: routerNames.con_support,
            children: [
                {
                    path: '/contemplate/create',
                    component: function (resolve) {
                        require(['../pages/support/create1.vue'], resolve);
                    },
                    meta: {
                        auth: true
                    },
                    name: routerNames.con_textTemp_create
                },
                {
                    path: '/contemplate/update',
                    component: function (resolve) {
                        require(['../pages/support/update.vue'], resolve);
                    },
                    meta: {
                        auth: true
                    },
                    name: routerNames.con_textTemp_update
                },
                {
                    path: '/contemplate/delete',
                    component: function (resolve) {
                        require(['../pages/support/delete.vue'], resolve);
                    },
                    meta: {
                        auth: true
                    },
                    name: routerNames.con_textTemp_del
                },
                {
                    path: '/contemplate/query',
                    component: function (resolve) {
                        require(['../pages/support/query.vue'], resolve);
                    },
                    meta: {
                        auth: true
                    },
                    name: routerNames.con_textTemp_search
                },
                {
                    path: '/contemplate/conquery',
                    component: function (resolve) {
                        require(['../pages/support/conQuery.vue'], resolve);
                    },
                    meta: {
                        auth: true
                    },
                    name: routerNames.con_search
                }
            ],
            meta: {
                iconCls: 'stats-bars'
            }
        },
        {
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
});


router.beforeEach((to, from, next) => {
    window.document.title = to.name;
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
