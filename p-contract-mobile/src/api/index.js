import Http from '../core/commonModel';
import {domain} from './consts';

export default {
  login(params) {
    return Http.get(`${domain}/contract-web/process/loginForMobile`, params);
  }
};
