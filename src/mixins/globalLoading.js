/**
 * 全屏loading
 * @param {Boolean}flag 不传则关闭
 */

let loadingInstance = null

class support {
  static globalLoading(flag, options = {}) {
    if (flag) {
      const config = Object.assign({
        lock: true,
        text: '拼命加载中'
      }, options)
      loadingInstance = this.$loading(config)
      return loadingInstance
    }
    loadingInstance && loadingInstance.close()
  }
}

export default {
  methods: {
    globalLoading: support.globalLoading.bind(this)
  }
}
