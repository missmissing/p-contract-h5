/**
 * 全屏loading
 * @param {object} options 同element-ui loading选项
 * @param false 则关闭
 */

let loadingInstance = null

const defaultOpts = {
  target: document.body,
  body: false,
  fullscreen: false,
  lock: false,
  text: '拼命加载中',
  customClass: ''
}

class loading {
  static init(options = {}) {
    if (!options) {
      loadingInstance && loadingInstance.close()
      return
    }
    const config = Object.assign(defaultOpts, options)
    loadingInstance = this.$loading(config)
    return loadingInstance
  }
}

export default {
  methods: {
    comLoading: loading.init
  }
}
