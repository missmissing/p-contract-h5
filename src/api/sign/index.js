import Http from '../../modules/pc/core/commonModel';

const contract = '/api-contract';
// const contract = ''

export default {
  getPr(params) {
    return Http.get(`${contract}/contract-web/purchaseOrder/applyInfo`, params);
  },
  getMatch(params) {
    return Http.post(`${contract}/contract-web/purchaseOrder/getMatchData`, params);
  },
  submit(params) {
    return Http.post(`${contract}/contract-web/purchaseOrder/submit`, params);
  },
  query(params) {
    return Http.post(`${contract}/contract-web/purchaseOrder/query`, params);
  },
  detailByPoId(params) {
    const { id } = params;
    return Http.get(`${contract}/contract-web/purchaseOrder/detailByPoId/${id}`);
  },
  getLogs(params) {
    return Http.post(`${contract}/contract-web/purchaseOrder/log/query`, params);
  },
  sendOrder(params) {
    const { id } = params;
    return Http.get(`${contract}/contract-web/purchaseOrder/log/repair/${id}`, params);
  }
};
