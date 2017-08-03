/**
 * 系统常量
 */


/**
 * 获取所有的路由名称
 *
 */
export const routerNames = {
  login: '登录',
  noPower2: 'noPower2',
  redirect: 'redirect',
  error404: '404',
  home: 'home',
  main: 'main',
  table: 'table',
  form: 'form',
  user: 'user',
  nullPage: 'nullPage',
  comingSoon: 'comingSoon',

  con_create: '合同创建',
  con_createframecon: '创建框架合同',
  con_sign: '合同签订',
  con_pref: '合同履约',
  con_template: '合同支持',
  template_create: '合同文本创建',
  template_update: '合同文本变更',
  template_delete: '合同文本废除',
  template_query: '合同文本查询',
  con_query: '合同查询',
  po_create: '创建采购订单',
  con_compensate: '违约/赔付处理',
  con_inspection: '合同验收',
  con_inspection_reject: '合同验收不合格处理',
  con_repeal: '合同终止',
  con_update: '合同变更',
};

/**审批按钮（新版本） */
export const approvalAction = {
  /**同意 */
  OK: 1000,
  /**拒绝 */
  Reject: 1001,
  /**加签 */
  Sign: 1002,
  /**转签 */
  Transfer: 1003,
  /**驳回 */
  //TurnedDown: 1004,
  /**不同意但继续 */
  DisagreeContinue: 1005
};

/**k2系统相关 在待办中心注册的 系统编码 */
export const k2RegistrationSystemCodes = ['k2', '8081', '8080'];


/**任务状态 const*/
export const taskState = {
  /**待办 */
  todo: 1,
  /**办理中 */
  dong: 2,
  /**已办 */
  done: 3,
};
