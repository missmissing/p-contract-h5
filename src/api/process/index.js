import Http from '../../core/commonModel';

const contract = '/api-contract';
// const contract = '/api'

export default {
  getProcess(params) {
    return Http.get(`${contract}/contract-web/process/getProcesses`, params);
  },
  getApproveNode(params) {
    return Http.get(`${contract}/contract-web/process/getApproveNode`, params);
  },
  getStartedProcNodes(params) {
    return Http.get(`${contract}/contract-web/process/getStartedProcNodes`, params);
  },
  submitProcess(params) {
    return Http.post(`${contract}/contract-web/process/nodeAudit`, params);
  }
};
