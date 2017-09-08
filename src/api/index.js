import Http from '@/core/commonModel'

const contract = 'api'
// const contract = '/api-contract'

export default {
  login(params) {
    return Http.post(`${contract}/contract-web/process/login`, params)
  }
}
