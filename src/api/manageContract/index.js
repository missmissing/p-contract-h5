import Http from '@/core/commonModel'
const contract = '/api-contract'
//const contract = ''

export default {
  //根据关键字获取创建人列表
  getRemoteCreatePersonsByKeyWord(params){
    return Http.get(`${contract}/contract-web/contract/user/list`, params)
  },
  // 获取比价单列表数据
  getQrList(params) {
    return Http.post(`${contract}/contract-web/contract/folio/list`, params)
  },
  getQrDetail(params){
    return Http.get(`${contract}/contract-web/contract/folio`, params)
  },
    // 获取合同基本信息
  getContractBaseInfo(params) {
    return Http.get(`${contract}/contract-web/contract/pre`, params)
  },
    // 获取供应商列表根据关键字
  getRemoteSuppliersByKeyWord(params) {
    return Http.post(`${contract}/contract-web/contract/party/second`, params)
  },
    // 获取合同我方主体列表根据关键字
  getRemoteSubjectsByKeyWord(params) {
    return Http.post(`${contract}/contract-web/contract/party/first`, params)
  },
    // 获取第三方信息列表根据关键字
  getRemoteThirdPartiesByKeyWord(params) {
    return Http.get(`/api/createContract/getRemoteThirdPartiesByKeyWord`, params)
  },
    // 获取其他信息
  getRelatedInfo(params) {
    return Http.get(`/api/createContract/getRelatedInfo`, params)
  },
  //获取模版名称（合同文本类型，合同类型）
  getTemplateByBizTypeId(params){
    return Http.get(`${contract}/contract-web/template/getTemplateByBizTypeId`, params)
  },
  //根据选中定的模版id，获取附件信息
  getSealAttachments(params){
    return Http.get(`/api/createContract/getSealAttachments`, params)
  },
  //保存合同
  saveContract(params){
    return Http.post(`${contract}/contract-web/contract/save`, params)
  },
    /** ***标签页****/
  getPrTableData(params) {
    return Http.get(`/api/createContract/getPrTableData`, params)
  },
  getPriceTableData(params) {
    return Http.get(`/api/createContract/getPriceTableData`, params)
  },
  getContractTableData(params) {
    return Http.get(`/api/createContract/getContractTableData`, params)
  },
  getOrderTableData(params) {
    return Http.get(`/api/createContract/getOrderTableData`, params)
  },
    /** ***标签页****/
    /** ****变更合同接口start******/
    // 根据合同编号获取变更合同的数据
  getUpdateInfo(params) {
    return Http.get(`/api/updateContract/getUpdateInfo`, params)
  },
    /** ****变更合同接口end******/
  /** ***从协议列表接口****/
    getAgreementList(params){
      return Http.get(`/api/agreeement/getAgreementList`, params)
    }
  /** ***从协议列表接口****/
}
