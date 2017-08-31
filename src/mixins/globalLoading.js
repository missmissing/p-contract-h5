/**
 * 全屏loading
 * @param {Boolean}flag 不传则关闭
 */

let loadingInstance = null

class support {
  static globalLoading(flag) {
    if (flag) {
      loadingInstance = this.$loading({
        lock: true,
        text: '拼命加载中'
      })
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
