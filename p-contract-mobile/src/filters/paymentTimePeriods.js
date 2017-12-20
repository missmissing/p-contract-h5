import {paymentTimePeriods} from '../core/consts';

export default type => paymentTimePeriods.filter(item => item.id === type)[0].name;
