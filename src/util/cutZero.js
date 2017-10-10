export default (num, length) => {
  if (!length) {
    return num.replace(/^0+/, '')
  }
  return num.slice(-length)
}
