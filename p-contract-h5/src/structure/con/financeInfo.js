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

const paymentMethods = []
Object.keys(payTypes).forEach((key) => {
  const item = {
    payType: +key,
    type: payTypes[key],
    ..._.cloneDeep(payment)
  }
  if (item.payType === 4) {
    paymentMethods.unshift(item)
  } else {
    paymentMethods.push(item)
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
