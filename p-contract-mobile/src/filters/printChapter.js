const map = {
  1: '公章',
  2: '法人章'
}

export default (arr) => {
  if (!arr) {
    return arr
  }
  if (arr.length === 1) {
    return map[arr[0]]
  }

  return arr.map(item => map[item]).join(',')
}
