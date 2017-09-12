import Http from '@/core/commonModel'

// const contract = 'api'
const contract = '/api-contract'

export default {
  login(params) {
    return Http.get(`${contract}/contract-web/process/verify`, params)
  },
  logout(params) {
    return Http.get(`${contract}/contract-web/process/logout`, params)
  },
  selectPerson(params) {
    return Http.post(`${contract}/contract/user/list`, params)
  }
}
