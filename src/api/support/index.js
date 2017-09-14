import Http from '@/core/commonModel'

const contract = '/api-contract'
// const contract = '';

export default {
  getTmplTypes(params) {
    return Http.get(`${contract}/contract-web/module/findModuleTemplates`, params)
  },
  getModuleData(params) {
    return Http.get(`${contract}/contract-web/module/findDemoModule`, params)
  },
  getBusiType(params) {
    return Http.get(`${contract}/contract-web/contractBizType/getAllTypes`, params)
  },
  getList(params) {
    return Http.post(`${contract}/contract-web/template/getTemplate`, params)
  },
  getTplData(params) {
    return Http.get(`${contract}/contract-web/template/getTemplateById`, params)
  },
  addTpl(params) {
    return Http.post(`${contract}/contract-web/template/addTemplate`, params)
  },
  getCurrentTemplateByCode(params) {
    return Http.get(`${contract}/contract-web/template/getCurrentTemplateByCode`, params)
  },
  updateTemplate(params) {
    return Http.post(`${contract}/contract-web/template/updateTemplate`, params)
  },
  selectTemplateCode(params) {
    return Http.get(`${contract}/contract-web/template/selectTemplateCode`, params)
  },
  setTemplateAbolish(params) {
    return Http.get(`${contract}/contract-web/template/setTemplateAbolish`, params)
  }
}
