import Http from '../core/commonModel';

const contract = '';
// const contract = '/api-contract';

export default {
  login(params) {
    return Http.get(`${contract}/contract-web/process/loginForMobile`, params);
  }
};
