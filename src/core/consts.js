/**
 * 系统常量
 */
export default {
  APP_ID: '',
  SERVICE_ROOT: {
    NORMAL: '/api'
  },
  EVENT_KEY: {
    ERROR: 'ERROR',
    EVENT_PROCESS: {
      CHANGE_TITLE: 'EVENT_PROCESS_CHANGE_TITLE'
    },
    NET_COMMUNICATION: {
      ERROR: 'NET_COMMUNICATION_ERROR',
      BUSINESS_ERROR: {
        NOT_200: 'NET_COMMUNICATION_BUSINESS_ERROR_NOT_200',
        ERROR_401: 'NET_COMMUNICATION_BUSINESS_ERROR_NOT_401'
      },
      NORMAL_ERROR: {
        ERROR_500: 'NET_COMMUNICATION_NORMAL_ERROR_ERROR_500'
      }
    }
  }
}

/**
 * 获取所有的路由名称
 */
export const routerNames = {
  redirect: '重定向',
  error404: '404',

  home: '',
  con_index: '首页',

  con_support: '合同模板管理',
  con_tpl_see: '合同模板查看',
  con_tpl_create: '合同模板创建',
  con_tpl_update: '合同模板变更',
  con_tpl_abolish: '合同模板废除',

  con_create: '合同签批管理',
  con_createIndex: '合同创建',
  con_createSlaveProtocol: '从协议创建',
  con_agreementList: '从协议查询',
  con_update: '合同变更',
  con_createFrameContract: '框架合同创建',
  con_createIntentionContract: '意向合同创建',
  con_createSingleContract: '单一合同创建',
  con_createSimpleContract: '固定格式合同创建',
  con_Check: '查看合同',

  con_sign: '合同订单管理',
  con_purchase_order: '采购订单创建',
  con_purchase_see: '采购订单查看',

  con_performance: '合同异常处理',
  con_performanceIndex: '履约合同',
  con_compensate: '违约/赔付处理',
  con_check_reject: '合同验收不合格处理',
  con_stop: '合同中止',

  con_process: '合同流程',
  con_handing_process: '我待办的流程',
  con_create_process: '我发起的流程',
  con_handle_process: '已处理的流程',
  con_process_see: '查看流程',
  con_process_approve: '审批流程',

  con_search: '报表查询',
  con_list: '合同查询',
  con_tpl_list: '合同模板查询',
  con_order_list: '采购订单查询'
}

export const tplTypeMap = {
  TEMPLATE: '合同模板',
  TEXT: '合同文本'
}

export const tplMap = ['CRS_Contract_CreateTemplate', 'CRS_Contract_UpdateTemplate', 'CRS_Contract_DeleteTemplate']

export const contractMap = ['CRS_Contract_Create', 'CRS_Contract_Update', 'CRS_Contract_Delete]']

export const processListMap = ['BACKLOG', 'STARTED', 'FINISHED']

export const prTypeMap = {
  1: '一般物资',
  2: '服务',
  3: '固定资产'
}
