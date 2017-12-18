import Http from '../../core/commonModel';
import {domain} from '../consts';

export default {
  getPr(params) {
    return Http.get(`${domain}/contract-web/purchaseOrder/applyInfo`, params);
  },
  getMatch(params) {
    return Http.post(`${domain}/contract-web/purchaseOrder/getMatchData`, params);
  },
  submit(params) {
    return Http.post(`${domain}/contract-web/purchaseOrder/submit`, params);
  },
  query(params) {
    return Http.post(`${domain}/contract-web/purchaseOrder/query`, params);
  },
  detailByPoId(params) {
    const {id} = params;
    return Http.get(`${domain}/contract-web/purchaseOrder/detailByPoId/${id}`);
  },
  getLogs(params) {
    return Http.post(`${domain}/contract-web/purchaseOrder/log/query`, params);
  },
  sendOrder(params) {
    const {id} = params;
    return Http.get(`${domain}/contract-web/purchaseOrder/log/repair/${id}`, params);
  }
};
