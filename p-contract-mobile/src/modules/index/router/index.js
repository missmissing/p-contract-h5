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
      }
    ]
  });

  return routes;
};
