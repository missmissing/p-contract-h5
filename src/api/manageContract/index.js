import Http from '@/core/commonModel'

export default {
    // 获取比价单列表数据
  getQrList(params) {
    return Http.get(`/api/createContract/getQrList`, params)
  },
    // 获取比价单详情
  getPrDetail(params) {
    return Http.get(`/api/createContract/getPrDetail`, params)
  },
    // 获取合同基本信息
  getContractBaseInfo(params) {
    return Http.get(`/api/createContract/getContractBaseInfo`, params)
  },
    // 获取供应商列表根据关键字
  getRemoteSuppliersByKeyWord(params) {
    return Http.get(`/api/createContract/getRemoteSuppliersByKeyWord`, params)
  },
    // 获取合同我方主体列表根据关键字
  getRemoteSubjectsByKeyWord(params) {
    return Http.get(`/api/createContract/getRemoteSubjectsByKeyWord`, params)
  },
    // 获取第三方信息列表根据关键字
  getRemoteThirdPartiesByKeyWord(params) {
    return Http.get(`/api/createContract/getRemoteThirdPartiesByKeyWord`, params)
  },
    // 获取其他信息
  getRelatedInfo(params) {
    return Http.get(`/api/createContract/getRelatedInfo`, params)
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
  }
    /** ****变更合同接口end******/
}
