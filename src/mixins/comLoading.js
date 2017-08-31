/**
 * 局部loading
 * 依赖属性v-loading="loadingFlag",:element-loading-text="loadingText",可加修饰符body,fullscreen,lock
 * 使用方法：在需要显示的标签上添加
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
  data() {
    return {
      loadingFlag: false,
      loadingText: ''
    }
  },
  methods: {
    comLoading: support.comLoading
  }
}
