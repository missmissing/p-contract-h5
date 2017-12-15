import {
  tplMap,
  prMap,
  contractMap,
  contractDel,
  compensateMap,
  inspectRejectMap,
  protocolMap,
  procTitles
} from '../../../core/consts';
import routerNames from '../router';
import Api from '../../../api/process/index';

class Jump {
  constructor(router) {
    this.router = router;
    this.approve = false;
  }

  static getProcTitle(procCode) {
    let title = '';
    switch (procCode) {
      case tplMap[0]:
        title = procTitles[0];
        break;
      case tplMap[1]:
        title = procTitles[1];
        break;
      case tplMap[2]:
        title = procTitles[2];
        break;
      case contractMap[0]:
        title = procTitles[3];
        break;
      case contractMap[1]:
        title = procTitles[4];
        break;
      case contractDel[0]:
        title = procTitles[5];
        break;
      case protocolMap[0]:
        title = procTitles[6];
        break;
      case prMap[0]:
        title = procTitles[7];
        break;
      case compensateMap[0]:
        title = procTitles[8];
        break;
      case inspectRejectMap[0]:
        title = procTitles[9];
        break;
      default:
        break;
    }
    return title;
  }


  see(row) {
    const {procInstId, serialNumber, procCode} = row;
    if (this.approve) {
      Api.getApproveNode({
        serialNumber,
        procCode
      }).then((res) => {
        const data = res.data.dataMap;
        this.toPage(row, data);
      });
    } else {
      Api.getStartedProcNodes({
        procInstId,
        procCode
      }).then((res) => {
        const data = res.data.dataMap;
        this.toPage(row, data);
      });
    }
  }

  toPage(row, data) {
    const {
      procInstId,
      serialNumber,
      procCode
    } = row;
    const {
      actions, approveInfo, sign, actName
    } = data;
    const processData = {
      procInstId,
      actions,
      serialNumber,
      procCode,
      sign,
      roleName: actName,
      approve: this.approve
    };
    let param = {};
    let name = null;
    if (tplMap.indexOf(procCode) > -1) {
      const {id} = approveInfo;
      param = {
        id
      };
      name = routerNames.con_tpl_see;
    } else if (contractMap.indexOf(procCode) > -1) {
      const {baseInfoForm} = approveInfo;
      const {id} = baseInfoForm;
      param = {
        contractId: id
      };
      name = routerNames.con_Check;
    } else if (prMap.indexOf(procCode) > -1) {
      const {purchaseOrderId} = approveInfo;
      param = {
        id: purchaseOrderId
      };
      name = routerNames.con_purchase_see;
    } else if (contractDel.indexOf(procCode) > -1) {
      const {baseInfoForm} = approveInfo;
      const {id} = baseInfoForm;
      param = {
        id
      };
      name = routerNames.con_stop_see;
    } else if (compensateMap.indexOf(procCode) > -1) {
      param = {
        id: procInstId
      };
      name = routerNames.con_compensate_see;
    } else if (inspectRejectMap.indexOf(procCode) > -1) {
      param = {
        id: procInstId
      };
      name = routerNames.con_check_reject_see;
    } else if (protocolMap.indexOf(procCode) > -1) {
      const {id} = approveInfo;
      param = {
        id
      };
      name = routerNames.con_querySlaveProtocol;
    } else {
      console.log('找不到相应类型', procCode);
      return;
    }

    processData.procTitle = Jump.getProcTitle(procCode);

    this.router.push({
      name,
      query: {
        ...param,
        processData: JSON.stringify(processData)
      }
    });
  }

  init(query) {
    if (query.routeName === routerNames.con_process_approve) {
      this.approve = true;
    }
    const {
      procInstId, serialNumber, procCode, sn
    } = query;
    const newSerialNumber = serialNumber || sn;
    const newProcInstId = procInstId || newSerialNumber.split('_')[0];
    this.see({
      procInstId: newProcInstId,
      serialNumber: newSerialNumber,
      procCode
    });
  }
}

export default Jump;
