import _ from 'lodash'
import {payTypes} from '../../core/consts'

const payment = {
  visible: false,
  paymentAmount: null,
  paymentTimePeriod: null,
  ratio: null,
  remark: null,
  seriousPayments: null,
  financeMores: []
}

const paymentMethods = Object.keys(payTypes).map((key) => {
  return {
    payType: key,
    type: payTypes[key],
    ..._.cloneDeep(payment)
  }
})

const obj = {
  moneyInvolved: true,
  oneOffPay: true,
  currency: 1, // 币种1：人民币；2：美元
  invoiceType: 1, // 开票类型
  totalAmount: 0,
  paymentMethods,
  paymentTimePeriod: null,
  paymentRemark: null,
  jiaBillingInfo: [],
  yiBillingInfo: []
}

export default obj
