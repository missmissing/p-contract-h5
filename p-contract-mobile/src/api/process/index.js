import Http from '../../core/commonModel';
import {domain} from '../consts';

export default {
  getProcess(params) {
    return Http.get(`${domain}/contract-web/process/getProcesses`, params);
  },
  getApproveNode(params) {
    return Http.get(`${domain}/contract-web/process/getApproveNode`, params);
  },
  getStartedProcNodes(params) {
    return Http.get(`${domain}/contract-web/process/getStartedProcNodes`, params);
  },
  submitProcess(params) {
    return Http.post(`${domain}/contract-web/process/nodeAudit`, params);
  }
};
