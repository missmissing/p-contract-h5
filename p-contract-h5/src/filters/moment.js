import moment from 'moment'

export const formatTime = (value) => {
  const m = moment(value || '')
  if (m.isValid()) {
    return m.format('YYYY-MM-DD HH:mm:ss')
  }
  return value
}

export const formatDate = (value) => {
  const m = moment(value || '')
  if (m.isValid()) {
    return m.format('YYYY-MM-DD')
  }
  return value
}

export const formatTimeStamp = (value) => {
  const m = moment(value || '')
  if (m.isValid()) {
    return m.valueOf()
  }
  return value
}

export const formatToDate = (value) => {
  const m = moment(value || '')
  if (m.isValid()) {
    return m.toDate()
  }
  return value
}

export const formatTimeText = (value) => {
  const timeTextMap = [
    {
      label: '凌晨',
      from: 3,
      to: 6
    },
    {
      label: '早晨',
      from: 6,
      to: 8
    },
    {
      label: '上午',
      from: 8,
      to: 11
    },
    {
      label: '中午',
      from: 11,
      to: 13
    },
    {
      label: '下午',
      from: 13,
      to: 17
    },
    {
      label: '傍晚',
      from: 17,
      to: 19
    },
    {
      label: '晚上',
      from: 19,
      to: 23
    },
    {
      label: '深夜',
      from: 23,
      to: 3
    }
  ]
  const m = value ? moment(value) : moment()
  if (m.isValid()) {
    const h = m.hours()
    let text = ''
    timeTextMap.some((item) => {
      if (h >= item.from && h < item.to) {
        text = item.label
        return true
      }
      return false
    })
    return `${text}好！`
  }
  return value
}
