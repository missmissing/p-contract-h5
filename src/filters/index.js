import _ from 'lodash';
import moment from 'moment';

export const strToArr = (value) => {
  if (!_.isString(value)) {
    return [];
  }
  return value.split(',');
};

export const formatDate = (value) => {
  const m = moment(value);
  if (m.isValid()) {
    return m.format('YYYY-MM-DD');
  }
  return value;
};

export const formatTimeStamp = (value) => {
  const m = moment(value);
  if (m.isValid()) {
    return m.valueOf();
  }
  return value;
};
