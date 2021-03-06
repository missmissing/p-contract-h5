export default (num, flag) => {
  const fraction = ['角', '分']
  const digit = flag ? ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] : ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = flag ? [['元', '万', '亿'], ['', '十', '百', '千']] : [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  const head = num < 0 ? '欠' : ''
  let n = Math.abs(num)

  let s = ''

  for (let i = 0; i < fraction.length; i += 1) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i += 1) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j += 1) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}
