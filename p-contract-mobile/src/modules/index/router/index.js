import routerNames from './consts';

export default (Router) => {
  const routes = new Router({
    routes: [
      {
        path: '/tpl',
        component: () => import('../pages/contractTpl/contractTpl.vue'),
        name: routerNames.con_tpl_see
      },
      {
        path: '/sign',
        component: () => import('../pages/sign/sign.vue'),
        name: routerNames.con_purchase_see
      },
      {
        path: '/reject',
        component: () => import('../pages/inspectionReject/inspectionReject.vue'),
        name: routerNames.con_check_reject_see
      },
      {
        path: '/sate',
        component: () => import('../pages/compensate/compensate.vue'),
        name: routerNames.con_compensate_see
      },
      {
        path: '/contract',
        component: () => import('../pages/contract/contract.vue'),
        name: routerNames.con_Check
      },
      {
        path: '/protocol',
        component: () => import('../pages/agreement/agreement.vue'),
        name: routerNames.con_querySlaveProtocol
      },
      {
        path: '/see',
        component: () => import('../components/toPage.vue'),
        name: routerNames.con_process_see
      },
      {
        path: '/approve',
        component: () => import('../components/toPage.vue'),
        name: routerNames.con_process_approve
      }
    ]
  });

  return routes;
};
