export default (num, length) => {
  return (Array(length).join('0') + num).slice(-length)
}
