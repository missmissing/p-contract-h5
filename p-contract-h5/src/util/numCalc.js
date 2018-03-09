// 加法函数，用来得到精确的加法结果

// 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果

// 调用：accAdd(arg1,arg2)

// 返回值：arg1加上arg2的精确结果
const add = (a, b) => {
  let c
  let d
  let e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) + mul(b, e)) / e
}

// 乘法函数，用来得到精确的乘法结果
// 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果

// 调用：accMul(arg1,arg2)

// 返回值：arg1乘以arg2的精确结果

const mul = (a, b) => {
  let c = 0
  let d = a.toString()
  let e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {
  }
  try {
    c += e.split('.')[1].length
  } catch (f) {
  }
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

// 减法函数，用来得到精确的减法结果

// 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果

// 调用：accSubtr(arg1,arg2)

// 返回值：arg1减去arg2的精确结果

function sub (a, b) {
  let c
  let d
  let e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) - mul(b, e)) / e
}

// 除法函数，用来得到精确的除法结果

// 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果

// 调用：accDiv(arg1,arg2)

// 返回值：arg1除以arg2的精确结果

function div (a, b) {
  let c
  let d
  let e = 0
  let f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {
  }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {
  }
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return mul(c / d, Math.pow(10, f - e))
}

export default {
  add,
  sub,
  mul,
  div
}
