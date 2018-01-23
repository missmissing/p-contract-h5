import Http from '../../core/commonModel';

const contract = '/api-contract';
// const contract = ''

export default {
  // 根据关键字获取创建人列表
  getRemoteCreatePersonsByKeyWord(params) {
    return Http.get(`${contract}/contract-web/contract/user/list`, params);
  },
  // 获取比价单列表数据
  getQrList(params) {
    return Http.post(`${contract}/contract-web/contract/folio/list`, params);
  },
  getQrDetail(params) {
    return Http.get(`${contract}/contract-web/contract/folio`, params);
  },
  // 获取合同基本信息
  getContractBaseInfo(params) {
    return Http.get(`${contract}/contract-web/contract/pre`, params);
  },
  // 获取供应商列表根据关键字
  getRemoteSuppliersByKeyWord(params) {
    return Http.post(`${contract}/contract-web/contract/party/second`, params);
  },
  // 获取合同我方主体列表根据关键字
  getRemoteSubjectsByKeyWord(params) {
    return Http.post(`${contract}/contract-web/contract/party/first`, params);
  },
  // 获取第三方信息列表根据关键字
  getRemoteThirdPartiesByKeyWord(params) {
    return Http.get('/api/createContract/getRemoteThirdPartiesByKeyWord', params);
  },
  // 获取模版名称（合同文本类型，合同类型）
  getTemplateByBizTypeId(params) {
    return Http.get(`${contract}/contract-web/template/getTemplateByBizTypeId`, params);
  },
  // 根据选中定的模版id，获取附件信息
  getSealAttachments(params) {
    return Http.get(`${contract}/contract-web/contract/template/attach`, params);
  },
  // 根据关键字搜索合同标的数据
  getRemoteMaterialsByKeyWord(params) {
    return Http.post(`${contract}/contract-web/contract/sample`, params);
  },
  // 保存合同
  saveContract(params) {
    return Http.post(`${contract}/contract-web/contract/save`, params);
  },
  // 提交(创建合同）
  submit(params) {
    return Http.post(`${contract}/contract-web/contract/commit`, params);
  },
  // 提交(变更合同)
  updatedSubmit(params) {
    return Http.post(`${contract}/contract-web/contract/alter`, params);
  },
  // 根据合同编号查询合同详情
  getContractDetail(params) {
    const {contractNo} = params;
    delete params.contractNo;
    return Http.get(`${contract}/contract-web/contract/no/${contractNo}`, params);
  },
  // 根据合同id查询合同详情
  getContractDetailByContractId(params) {
    const {contractId, operate} = params;
    if (operate) {
      return Http.get(`${contract}/contract-web/contract/id/${contractId}`, params);
    }
    return Http.get(`${contract}/contract-web/contract/id/${contractId}`);
  },
  /** ***相关数据-订单页****/
  getOrderTableData(params) {
    return Http.post(`${contract}/contract-web/purchaseOrder/getInitiatePo`, params);
  },
  /** ***标签页****/
  /** ****变更合同接口start******/
  // 根据合同编号获取变更合同的数据
  getUpdateInfo(params) {
    if (typeof params === 'object') {
      return Http.get(`${contract}/contract-web/contract/no/${params.code}`, params);
    }
    return Http.get(`${contract}/contract-web/contract/no/${params}`);
  },
  /** ****变更合同接口end******/
  /** ***从协议接口****/
  // 从协议列表
  getAgreementList(params) {
    return Http.post(`${contract}/contract-web/protocol/list/search`, params);
  },
  // 创建从协议
  createAgreenment(params) {
    return Http.post(`${contract}/contract-web/protocol/add`, params);
  },
  // 根据从协议ID查询从协议详情
  getAgreenmentDetail(params) {
    return Http.get(`${contract}/contract-web/protocol/detail/id/${params}`);
  },
  // 根据从协议编号查询从协议详情
  getAgreenmentDetailByAgreenmentNo(params) {
    return Http.get(`${contract}/contract-web/protocol/detail/protocolNO/${params}`);
  },
  // 审批时上传附件接口
  uploadSealAttachments(params) {
    return Http.post(`${contract}/contract-web/contract/seal/attach`, params);
  },
  /** ***从协议接口****/

  /** ***合同中止提交****/
  contractSuspendSubmit(params) {
    return Http.post(`${contract}/contract-web/contract/suspend`, params);
  },
  /** ***合同中止提交****/
  /** ***合同列表****/
  getConList(params) {
    return Http.post(`${contract}/contract-web/contract/query`, params);
  },
  /** ***合同列表****/

  //流程中修改财务信息
  updateFinanceByContractId(params) {
    return Http.post(`${contract}/contract-web/contract/updateFinanceByContractId`, params);
  },
  //流程中发起人修改合同附件及盖章信息
  updateAttach(params) {
    return Http.post(`${contract}/contract-web/contract/updateAttach`, params);
  }
};
