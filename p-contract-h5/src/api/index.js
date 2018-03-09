
import Http from '../core/commonModel'

// const contract = 'api'
const contract = '/api-contract'

export default {
  login (params) {
    return Http.get(`${contract}/contract-web/process/verify`, params)
  },
  logout (params) {
    return Http.get(`${contract}/contract-web/process/logout`, params)
  },
  logoutForInvalidUser (params) {
    return Http.get(`${contract}/contract-web/process/logoutForInvalidUser`, params)
  }
}
