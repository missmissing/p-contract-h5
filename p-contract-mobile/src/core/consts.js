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
};


export const tplTypeMap = {
  TEMPLATE: '合同模板',
  TEXT: '合同文本'
};

export const tplMap = ['CRS_Contract_CreateTemplate', 'CRS_Contract_UpdateTemplate', 'CRS_Contract_DeleteTemplate'];

export const contractMap = ['CRS_Contract_Create', 'CRS_Contract_Update'];

export const contractDel = ['CRS_Contract_Delete'];

export const prMap = ['CRS_Contract_CreatePO'];

export const compensateMap = ['CRS_Contract_CompensateManage'];

export const inspectRejectMap = ['CRS_Contract_POCheckUnqualified'];

export const protocolMap = ['CRS_Contract_CreateProtocol'];

export const processListMap = ['BACKLOG', 'STARTED', 'FINISHED'];

export const contractTextTypeMap = {
  1: '模板合同',
  2: '非模板合同'
};

export const prTypeMap = {
  1: '一般物资',
  2: '服务',
  3: '固定资产'
};

export const contractPatternMap = {
  1: '单一合同',
  2: '简易合同',
  3: '框架合同',
  4: '意向合同'
};

export const procTitles = ['采购合同模板创建流程', '采购合同模板变更流程', '采购合同模板废除流程', '采购合同创建流程', '采购合同变更流程', '采购合同终止流程', '采购合同从协议创建流程', '采购订单创建流程', '合同违约处理流程', '合同验收不合格处理流程'];

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
};

export const handleResult = {
  CONTINUE_TO_PERFORM: '继续履行',
  UPDATED_CONTRACT: '变更合同',
  PERFORM_WITH_CHECK_RESULT: '按验收实际结果履行合同',
  BREACH: '转合同违约处理'
};

export const defaultParty = {
  US: '我方',
  PARTNER: '对方',
  BOTH: '双方'
};

export const compensateType = {
  PARTNER_GIVE_US: '供应商向我方赔付',
  US_GIVE_PARTNER: '我方向供应商赔付'
};

export const paymentType = {
  1: '定金',
  2: '预付款',
  3: '进度款',
  4: '尾款',
  5: '保证金'
};

export const paymentTimePeriods = [
  {
    id: 'Z015',
    name: '到票日后15天付款'
  },
  {
    id: 'Z020',
    name: '到票日后20天付款'
  },
  {
    id: 'Z025',
    name: '到票日后25天付款'
  },
  {
    id: 'Z030',
    name: '到票日后30天付款'
  },
  {
    id: 'Z035',
    name: '到票日后35天付款'
  },
  {
    id: 'Z040',
    name: '到票日后40天付款'
  },
  {
    id: 'Z045',
    name: '到票日后45天付款'
  },
  {
    id: 'Z000',
    name: '立即付款'
  }
];
