import Http from '../../core/commonModel';
import {domain} from '../consts';

export default {
  // 根据关键字获取创建人列表
  getRemoteCreatePersonsByKeyWord(params) {
    return Http.get(`${domain}/contract-web/contract/user/list`, params);
  },
  // 获取比价单列表数据
  getQrList(params) {
    return Http.post(`${domain}/contract-web/contract/folio/list`, params);
  },
  // 获取合同基本信息
  getdomainBaseInfo(params) {
    return Http.get(`${domain}/contract-web/contract/pre`, params);
  },
  // 根据关键字搜索合同标的数据
  getRemoteMaterialsByKeyWord(params) {
    return Http.post(`${domain}/contract-web/contract/sample`, params);
  },
  // 根据合同编号查询合同详情
  getContractDetail(params) {
    const {contractNo} = params;
    delete params.contractNo;
    return Http.get(`${domain}/contract-web/contract/no/${contractNo}`, params);
  },
  // 根据合同id查询合同详情
  getContractDetailByContractId(params) {
    const {contractId} = params;
    delete params.contractId;
    return Http.get(`${domain}/contract-web/contract/id/${contractId}`, params);
  },
  /** ***相关数据-订单页****/
  getOrderTableData(params) {
    return Http.post(`${domain}/contract-web/purchaseOrder/getInitiatePo`, params);
  },
  /** ***标签页****/

  // 根据合同编号获取变更合同的数据
  getUpdateInfo(params) {
    if (typeof params === 'object') {
      return Http.get(`${domain}/contract-web/contract/no/${params.code}`, params);
    }
    return Http.get(`${domain}/contract-web/contract/no/${params}`);
  },
  /** ***从协议接口****/
  // 根据从协议ID查询从协议详情
  getAgreenmentDetail(params) {
    return Http.get(`${domain}/contract-web/protocol/detail/id/${params}`);
  },
  getConList(params) {
    return Http.post(`${domain}/contract-web/contract/query`, params);
  },
  getQrDetail(params) {
    return Http.get(`${domain}/contract-web/contract/folio`, params);
  }
};
