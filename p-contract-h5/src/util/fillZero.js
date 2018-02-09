export default (num, length) => (Array(length).join('0') + num).slice(-length)
