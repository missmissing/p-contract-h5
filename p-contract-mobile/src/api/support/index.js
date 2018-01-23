import Http from '../../core/commonModel';
import {domain} from '../consts';

export default {
  getTmplTypes(params) {
    return Http.get(`${domain}/contract-web/module/findModuleTemplates`, params);
  },
  getModuleData(params) {
    return Http.get(`${domain}/contract-web/module/findDemoModule`, params);
  },
  getBusiType(params) {
    return Http.get(`${domain}/contract-web/contractBizType/getAllTypes`, params);
  },
  getList(params) {
    return Http.post(`${domain}/contract-web/template/getTemplate`, params);
  },
  getTplData(params) {
    return Http.get(`${domain}/contract-web/template/getTemplateById`, params);
  },
  getAllTemplateByCode(params) {
    return Http.get(`${domain}/contract-web/template/getAllTemplateByCode`, params);
  },
  addTpl(params) {
    return Http.post(`${domain}/contract-web/template/addTemplate`, params);
  },
  getCurrentTemplateByCode(params) {
    return Http.get(`${domain}/contract-web/template/getCurrentTemplateByCode`, params);
  },
  updateTemplate(params) {
    return Http.post(`${domain}/contract-web/template/updateTemplate`, params);
  },
  selectTemplateCode(params) {
    return Http.get(`${domain}/contract-web/template/selectTemplateCode`, params);
  },
  setTemplateAbolish(params) {
    return Http.get(`${domain}/contract-web/template/setTemplateAbolish`, params);
  }
};
