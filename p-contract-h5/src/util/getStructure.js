export default (structure, data) => {
  const result = {}
  Object.keys(structure).forEach((key) => {
    const originValue = structure[key]
    const originType = Object.prototype.toString.call(originValue)
    const value = data[key]
    const type = Object.prototype.toString.call(value)
    if (originType === type) {
      if (originType === '[object Array]' && !value.length) {
        return
      }
    }
    if (typeof data[key] !== 'undefined') {
      result[key] = data[key]
    }
  })
  return result
}
