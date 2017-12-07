import {routerNames, processListMap} from '../../core/consts';
import Jump from './jump';

export default function (row) {
  const {procInstId, serialNumber, procCode} = row;
  const query = {
    procInstId,
    serialNumber: serialNumber || '',
    procCode,
    routeName: ''
  };
  if (this.dataType === processListMap[0]) {
    query.routeName = routerNames.con_process_approve;
  } else {
    query.routeName = routerNames.con_process_see;
  }
  new Jump(this.$router).init(query);
}
