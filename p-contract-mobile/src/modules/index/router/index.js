import routerNames from './consts';

export default (Router) => {
  const routes = new Router({
    routes: [
      {
        path: '/tpl/create',
        component: () => import('../pages/contractTpl/index.vue'),
        name: routerNames.con_tpl_create
      },
      {
        path: '/tpl/update',
        component: () => import('../pages/contractTpl/index.vue'),
        name: routerNames.con_tpl_update
      },
      {
        path: '/tpl/delete',
        component: () => import('../pages/contractTpl/index.vue'),
        name: routerNames.con_tpl_delete
      },
      {
        path: '/sign/create',
        component: () => import('../pages/sign/index.vue'),
        name: routerNames.con_sign_create
      },
      {
        path: '/reject/create',
        component: () => import('../pages/inspectionReject/index.vue'),
        name: routerNames.con_check_reject_create
      },
      {
        path: '/sate/create',
        component: () => import('../pages/compensate/index.vue'),
        name: routerNames.con_compensate_create
      },
      {
        path: '/contract/create',
        component: () => import('../pages/contract/index.vue'),
        name: routerNames.con_create
      },
      {
        path: '/contract/update',
        component: () => import('../pages/contract/index.vue'),
        name: routerNames.con_update
      },
      {
        path: '/contract/delete',
        component: () => import('../pages/conRepeal/index.vue'),
        name: routerNames.con_delete
      },
      {
        path: '/protocol/create',
        component: () => import('../pages/agreement/index.vue'),
        name: routerNames.con_protocol_create
      }
    ]
  });

  return routes;
};
