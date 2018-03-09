import Http from '../../core/commonModel'
import {domain} from '../consts'

export default {
  getOrderCode (params) {
    return Http.post(`${domain}/contract-web/getOrderCode/`, { params })
  },
  getContractCode (params) {
    return Http.post(`${domain}/contract-web/getContractCode/`, params)
  },
  getContractViolateBaseByContractNo (params) {
    return Http.get(`${domain}/contract-web/contEnforcing/getContractViolateBaseByContractNo`, params)
  },
  contractViolateSave (params) {
    return Http.post(`${domain}/contract-web/contEnforcing/contractViolateSave`, params)
  },
  getViolateByProcInstId (params) {
    return Http.get(`${domain}/contract-web/contEnforcing/getViolateByProcInstId`, params)
  },
  getUnqualifiedByOrderId (params) {
    return Http.get(`${domain}/contract-web/contEnforcing/getUnqualifiedByOrderId`, params)
  },
  getUnqualifiedByOrderNo (params) {
    return Http.get(`${domain}/contract-web/contEnforcing/getUnqualifiedByOrderNo`, params)
  },
  unqualifiedSave (params) {
    return Http.post(`${domain}/contract-web/contEnforcing/unqualifiedSave`, params)
  },
  getUnqualifiedByProcInstId (params) {
    return Http.get(`${domain}/contract-web/contEnforcing/getUnqualifiedByProcInstId`, params)
  }
}
