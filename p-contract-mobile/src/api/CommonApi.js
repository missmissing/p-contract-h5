/**
 * Created by lenovo on 2017/9/29.
 */
import Http from './CommonHttp';

export default {

  login: () => Http.get('/api-longguo/api/common/listSystemCode/tag_type/'),

  sign: param => Http.get('/sign', param),

  staffList: param => Http.post('/api-longguo/api/userEL/listSubUserELInfo', param),

  qrCode: param => Http.post('/api-innovation/test/generateQRURL', param),

  refreshData: param => Http.get('/api-innovation/test/getQRViewData', param),

  getWokerListByCondition: param => Http.post('/api-innovation/e/worker/getWokerListByCondition', param)

};
