import Http from '@/core/commonModel'

const contract = '/api-contract'
// const contract = '';

export default {
  getOrderCode(params) {
    return Http.post(`${contract}/contract-web/getOrderCode/`, {params})
  },
  getContractCode(params) {
    return Http.post(`${contract}/contract-web/getContractCode/`, params)
  },
  getContractViolate(params) {
    return Http.get(`${contract}/contract-web/contEnforcing/getContractViolateByContractNo`, params)
  },
  contractViolateSave(params) {
    return Http.post(`${contract}/contract-web/contEnforcing/contractViolateSave`, params)
  },
  getViolateByProcInstId(params) {
    return Http.get(`${contract}/contract-web/contEnforcing/getViolateByProcInstId`, params)
  },
  getUnqualifiedByOrderId(params) {
    return Http.get(`${contract}/contract-web/contEnforcing/getUnqualifiedByOrderId`, params)
  },
  unqualifiedSave(params) {
    return Http.post(`${contract}/contract-web/contEnforcing/unqualifiedSave`, params)
  },
  getUnqualifiedByProcInstId(params) {
    return Http.get(`${contract}/contract-web/contEnforcing/getUnqualifiedByProcInstId`, params)
  }
}
