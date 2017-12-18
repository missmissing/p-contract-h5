import routerNames from './consts';

export default (Router) => {
  const routes = new Router({
    routes: [
      {
        path: '/tpl',
        component(resolve) {
          require(['../pages/contractTpl.vue'], resolve);
        },
        name: routerNames.con_tpl_see
      },
      {
        path: '/sign',
        component(resolve) {
          require(['../pages/sign.vue'], resolve);
        },
        name: routerNames.con_purchase_see
      },
      {
        path: '/reject',
        component(resolve) {
          require(['../pages/inspectionReject.vue'], resolve);
        },
        name: routerNames.con_check_reject_see
      },
      {
        path: '/sate',
        component(resolve) {
          require(['../pages/compensate.vue'], resolve);
        },
        name: routerNames.con_compensate_see
      },
      {
        path: '/contract',
        component(resolve) {
          require(['../pages/contract.vue'], resolve);
        },
        name: routerNames.con_Check
      },
      {
        path: '/see',
        component(resolve) {
          require(['../components/toPage.vue'], resolve);
        },
        name: routerNames.con_process_see
      },
      {
        path: '/approve',
        component(resolve) {
          require(['../components/toPage.vue'], resolve);
        },
        name: routerNames.con_process_approve
      }
    ]
  });

  return routes;
};
