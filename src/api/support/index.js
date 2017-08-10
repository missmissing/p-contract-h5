import Http from '@/core/commonModel';

export default {
  getTmplTypes(params) {
    return Http.get(`/api/support/tmpl/type`, params);
  },
  getModuleData(params) {
    return Http.get(`/api/support/module/data`, params);
  },
  getList(params) {
    return Http.get(`/api/support/list`, params);
  },
};
