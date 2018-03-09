/**
 * 全屏loading
 * @param {object} options 同element-ui loading选项
 * @param false 则关闭
 */

const defaultOpts = {
  target: document.body,
  body: false,
  fullscreen: true,
  lock: true,
  text: '拼命加载中',
  customClass: ''
}

class LoadingClass {
  static init (options = {}) {
    const loadingInstance = this.$loadingInstance
    loadingInstance && loadingInstance.close()
    if (!options) {
      return
    }
    const config = Object.assign({}, defaultOpts, options)
    this.$loadingInstance = this.$loading(config)
  }
}

export default {
  methods: {
    comLoading: LoadingClass.init
  }
}
