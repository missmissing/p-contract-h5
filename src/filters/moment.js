import moment from 'moment'

export const formatTime = (value) => {
  const m = moment(value)
  if (m.isValid()) {
    return m.format('YYYY-MM-DD HH:mm:ss')
  }
  return value
}

export const formatDate = (value) => {
  const m = moment(value)
  if (m.isValid()) {
    return m.format('YYYY-MM-DD')
  }
  return value
}

export const formatTimeStamp = (value) => {
  const m = moment(value)
  if (m.isValid()) {
    return m.valueOf()
  }
  return value
}

export const formatToDate = (value) => {
  const m = moment(value)
  if (m.isValid()) {
    return m.toDate()
  }
  return value
}
