import {paymentTimePeriods} from '../core/consts'

export default (id) => {
  let name = ''
  paymentTimePeriods.some((item) => {
    if (item.id === id) {
      name = item.name
      return true
    }
    return false
  })
  return name
}
