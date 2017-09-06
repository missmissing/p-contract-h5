import Http from '@/core/commonModel'

const contract = '/api-contract'
// const contract = '';

export default {
  getContract(params) {
    return Http.post(`${contract}/contract-web/getContract/`, {params})
  }
}
