import Http from '@/core/commonModel';

//const contract = '/api-contract';
const contract = '';

export default {
  getTmplTypes(params) {
    return Http.get(`${contract}/api/support/tmpl/type`, params);
  },
  getModuleData(params) {
    return Http.get(`${contract}/contract-web/module/findModule`, params);
  },
  getBusiType(params) {
    return Http.get(`${contract}/api/support/tmpl/busiType`, params);
  },
  getList(params) {
    return Http.get(`${contract}/api/support/list`, params);
  },
  getTmplData(params) {
    return Http.post(`${contract}/api/support/tmpl/data`, params);
  }
};
