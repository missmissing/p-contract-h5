import Http from '@/core/commonModel';

const contract = '/api-contract';
//const contract = '';

export default {
  getTmplTypes(params) {
    return Http.get(`/api/support/tmpl/type`, params);
  },
  getModuleData(params) {
    return Http.get(`${contract}/contract-web/module/findModule`, params);
  },
  getBusiType(params) {
    return Http.get(`${contract}/contract-web/contractBizType/getAllTypes`, params);
  },
  getList(params) {
    return Http.post(`${contract}/contract-web/template/getTemplate`, params);
  },
  getTplData(params) {
    return Http.get(`${contract}/contract-web/template/getTemplateById`, params);
  },
  addTpl(params) {
    return Http.post(`${contract}/contract-web/contractTemplate/addTemplate`, params);
  }
};
