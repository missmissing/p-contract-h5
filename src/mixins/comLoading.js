/**
 * 依赖v-loading="loadingFlag",:element-loading-text="loadingText"
 * @param {number}type 不传则关闭
 */

class support {
  static comLoading(type) {
    if (!type) {
      this.loadingFlag = false
      return
    }
    this.loadingFlag = true
    let text = ''
    switch (type) {
      case 1:
        text = '拼命加载中'
        break
      case 2:
        text = '正在提交中'
        break
      default:
        text = 'loading'
    }
    this.loadingText = text
  }
}

export default {
  methods: {
    comLoading: support.comLoading
  }
}
