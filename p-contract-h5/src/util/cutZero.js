export default (num, length) => {
  if (!num) {
    return num
  }
  if (!length) {
    return num.replace(/^0+/, '')
  }
  return num.slice(-length)
}
