import _ from 'lodash'

export const strToArr = (value) => {
  if (!_.isString(value)) {
    return []
  }
  return value.split(',')
}
