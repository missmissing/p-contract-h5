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
  }
}
