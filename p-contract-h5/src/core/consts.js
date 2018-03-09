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
    },
    NET_REQUEST_TIMEOUT: 'NET_REQUEST_TIMEOUT'
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
  con_tpl_create: '合同模板/文本创建',
  con_tpl_update: '合同模板变更',
  con_tpl_abolish: '合同模板废除',

  con_create: '合同签批管理',
  con_createIndex: '合同创建',
  con_createSlaveProtocol: '从协议创建',
  con_querySlaveProtocol: '从协议查看',
  con_slaveProtocol_process: '从协议流程查看',
  con_agreementList: '从协议查询',
  con_update: '合同变更',
  con_contract_create: '合同创建信息',
  con_Check: '合同查看',
  con_proc_see: '合同流程查看',
  con_stop: '合同中止',
  con_stop_see: '合同中止查看',
  con_stop_process: '合同中止流程查看',

  con_sign: '合同履约管理',
  con_purchase_order: '采购订单创建',
  con_purchase_see: '采购订单查看',
  con_performanceIndex: '履约合同',
  con_compensate: '违约/赔付处理',
  con_compensate_see: '违约/赔付处理查看',
  con_check_reject: '合同验收不合格处理',
  con_check_reject_see: '合同验收不合格处理查看',
  con_goods_receipt: '物资类验收',
  con_services_receipt: '服务类验收',

  con_process: '合同流程',
  con_handing_process: '我待办的流程',
  con_create_process: '我发起的流程',
  con_handle_process: '已处理的流程',
  con_process_see: '查看流程',
  con_process_approve: '审批流程',

  con_query: '合同查询',
  con_search: '报表查询',
  con_list: '合同模板/文本查询',
  con_tpl_list: '合同模板查询',
  con_order_list: '采购订单查询',
  con_order_log_list: '采购订单日志'
}

export const tplTypeMap = {
  TEMPLATE: '合同模板',
  TEXT: '合同文本'
}

export const tplMap = ['CRS_Contract_CreateTemplate', 'CRS_Contract_UpdateTemplate', 'CRS_Contract_DeleteTemplate']

export const contractMap = ['CRS_Contract_Create', 'CRS_Contract_Update']

export const contractDel = ['CRS_Contract_Delete']

export const prMap = ['CRS_Contract_CreatePO']

export const compensateMap = ['CRS_Contract_CompensateManage']

export const inspectRejectMap = ['CRS_Contract_POCheckUnqualified']

export const protocolMap = ['CRS_Contract_CreateProtocol']

export const processListMap = ['BACKLOG', 'STARTED', 'FINISHED']

export const contractTextTypeMap = {
  1: '模板合同',
  2: '非模板合同'
}

export const prTypeMap = {
  1: '一般物资',
  2: '服务',
  3: '固定资产'
}

export const contractPatternMap = {
  1: '单一合同',
  2: '固定格式合同',
  3: '框架协议',
  4: '框架意向合同'
}

export const procTitles = ['采购合同模板创建流程', '采购合同模板变更流程', '采购合同模板废除流程', '采购合同创建流程', '采购合同变更流程', '采购合同终止流程', '采购合同从协议创建流程', '采购订单创建流程', '合同违约处理流程', '合同验收不合格处理流程']

export const templateStatus = {
  DRAFT: '草稿',
  AUDITING: '审核中',
  PASS: '审核通过',
  REJECT: '审核不通过',
  ABOLISHING: '作废审核中',
  ABOLISH: '作废',
  UNAVAILABLE: '不可用',
  WAIT_ABOLISH: '废除审核通过',
  ABNORMAL: '异常',
  ALTER_AUDIT: '变更审核通过'
}

export const payTypes = {
  1: '预付款',
  2: '进度款',
  3: '尾款',
  4: '定金',
  5: '保证金'
}

export const paymentTimePeriods = [
  {
    id: 'Z015', name: '到票日后15天付款'
  },
  {
    id: 'Z020', name: '到票日后20天付款'
  },
  {
    id: 'Z025', name: '到票日后25天付款'
  },
  {
    id: 'Z030', name: '到票日后30天付款'
  },
  {
    id: 'Z035', name: '到票日后35天付款'
  },
  {
    id: 'Z040', name: '到票日后40天付款'
  },
  {
    id: 'Z045', name: '到票日后45天付款'
  },
  {
    id: 'Z000', name: '立即付款'
  }
]
