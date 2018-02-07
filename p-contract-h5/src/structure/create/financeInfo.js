import _ from 'lodash';

const payment = {
  paymentAmount: null,
  paymentTime: null,
  paymentTimePeriod: null,
  ratio: null,
  remark: null,
  seriousPayments: null,
  subItem: []
};
const paymentMethods = {
  earnest: [{
    type: '定金',
    ..._.cloneDeep(payment)
  }],
  advance: [{
    type: '预付款',
    ..._.cloneDeep(payment)
  }],
  progress: [{
    type: '进度款',
    ..._.cloneDeep(payment)
  }],
  _final: [{
    type: '尾款',
    ..._.cloneDeep(payment)
  }],
  deposit: [{
    type: '保证金',
    ..._.cloneDeep(payment)
  }]
};

const obj = {
  moneyInvolved: true,
  oneOffPay: true,
  currency: 1, // 币种1：人民币；2：美元
  invoiceType: 1, // 开票类型
  totalAmount: 0,
  paymentMethods,
  paymentTimePeriod: null,
  paymentRemark: '',
  jiaBillingInfo: [],
  yiBillingInfo: []
};

export default obj;
