import Http from '@/core/commonModel'

// const contract = '/api-contract'
const contract = ''

export default {
  getPr(params) {
    return Http.post(`${contract}/contract-web/getPr/`, params)
  },
  getContract(params) {
    return Http.post(`${contract}/contract-web/getContract/`, params)
  }
}
