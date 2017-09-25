// 非负数
export const nonNegative = (val) => {
  const reg = new RegExp(/^(\+)?\d+(\.\d+)?$/)
  return reg.test(val)
}
