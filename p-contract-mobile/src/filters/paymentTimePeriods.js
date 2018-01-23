import {paymentTimePeriods} from '../core/consts';

export default (type) => {
  const result = paymentTimePeriods.filter(item => item.id === type);
  if (result.length) {
    return result[0].name;
  }
  return '';
};
