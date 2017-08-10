import Http from '@/core/commonModel';

export default {
  getTmplTypes(params) {
    return Http.get(`/api/support/tmpl/type`, params);
  },
  getModuleData(params) {
    return Http.get(`/api/support/module/data`, params);
  },
  getBusiType(params) {
    return Http.get(`/api/support/tmpl/busiType`, params);
  },
  getList(params) {
    return Http.get(`/api/support/list`, params);
  },
  getTmplData(params) {
    return Http.post(`/api/support/tmpl/data`, params);
  }
};
