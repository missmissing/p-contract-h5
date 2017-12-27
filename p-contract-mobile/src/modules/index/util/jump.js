import {
  tplMap,
  prMap,
  contractMap,
  compensateMap,
  inspectRejectMap,
  protocolMap
} from '../../../core/consts';
import routerNames from '../router/consts';
import {GET_PROCESSDATA, GET_ID} from '../store/consts';
import queryString from '../../../util/queryString';
import Api from '../../../api/process';

class Jump {
  constructor(vueInstance) {
    this.vueInstance = vueInstance;
  }

  see(row) {
    const {procInstId, serialNumber, type} = row;
    const procCode = this.getProcCode();
    row.procCode = procCode;
    if (type === 1) {
      return Api.getApproveNode({
        serialNumber,
        procCode
      }).then((res) => {
        const data = res.data.dataMap;
        this.toPage(row, data);
      });
    }
    return Api.getStartedProcNodes({
      procInstId,
      procCode
    }).then((res) => {
      const data = res.data.dataMap;
      this.toPage(row, data);
    });
  }

  getProcCode() {
    const {name} = this.vueInstance.$route;
    let procCode;
    switch (name) {
      case routerNames.con_tpl_create:
        procCode = tplMap[0];
        break;
      case routerNames.con_tpl_update:
        procCode = tplMap[1];
        break;
      case routerNames.con_tpl_delete:
        procCode = tplMap[2];
        break;
      case routerNames.con_create:
        procCode = contractMap[0];
        break;
      case routerNames.con_update:
        procCode = contractMap[1];
        break;
      case routerNames.con_delete:
        procCode = contractMap[2];
        break;
      case routerNames.con_purchase_create:
        procCode = prMap[0];
        break;
      case routerNames.con_compensate_create:
        procCode = compensateMap[0];
        break;
      case routerNames.con_check_reject_create:
        procCode = inspectRejectMap[0];
        break;
      case routerNames.con_protocol_create:
        procCode = protocolMap[0];
        break;
      default:
        break;
    }
    return procCode;
  }

  toPage(row, data) {
    const {
      procInstId,
      serialNumber,
      procCode,
      userId,
      type
    } = row;
    const {
      actions,
      approveInfo,
      sign,
      actName
    } = data;
    const processData = {
      type,
      userId,
      procInstId,
      actions,
      serialNumber,
      procCode,
      sign,
      roleName: actName
    };
    let id;
    const {name} = this.vueInstance.$route;
    if (name === routerNames.con_tpl_create) {
      id = approveInfo.id;
    } else if (name === routerNames.con_tpl_update) {
      id = approveInfo.id;
    } else if (name === routerNames.con_tpl_delete) {
      id = approveInfo.id;
    } else if (name === routerNames.con_create) {
      const {baseInfoForm} = approveInfo;
      id = baseInfoForm.id;
    } else if (name === routerNames.con_update) {
      const {baseInfoForm} = approveInfo;
      id = baseInfoForm.id;
    } else if (name === routerNames.con_delete) {
      const {baseInfoForm} = approveInfo;
      id = baseInfoForm.id;
    } else if (name === routerNames.con_sign_create) {
      id = approveInfo.purchaseOrderId;
    } else if (name === routerNames.con_compensate_create) {
      id = procInstId;
    } else if (name === routerNames.con_check_reject_create) {
      id = approveInfo.id;
    } else if (name === routerNames.con_protocol_create) {
      id = approveInfo.id;
    }

    this.vueInstance.$store.commit(GET_PROCESSDATA, {
      data: processData
    });
    this.vueInstance.$store.commit(GET_ID, {
      data: id
    });
  }

  init() {
    const {
      type,
      employeecode,
      processInstanceId,
      sn
    } = queryString();
    const newProcInstId = processInstanceId || sn.split('_')[0];
    return this.see({
      procInstId: newProcInstId,
      serialNumber: sn,
      userId: employeecode,
      type //1：待办 2：已办 3：我发起
    });
  }
}

export default Jump;
