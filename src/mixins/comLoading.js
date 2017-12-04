/**
 * 全屏loading
 * @param {object} options 同element-ui loading选项
 * @param false 则关闭
 */

const defaultOpts = {
  target: document.body,
  body: false,
  fullscreen: false,
  lock: false,
  text: '拼命加载中',
  customClass: ''
};

class LoadingClass {
  static init(options = {}) {
    const loadingInstance = this.$loadingInstance;
    if (!options) {
      if (loadingInstance) {
        loadingInstance.close();
      }
      return loadingInstance;
    }
    const config = Object.assign({}, defaultOpts, options);
    this.$loadingInstance = this.$loading(config);
    return loadingInstance;
  }
}

export default {
  methods: {
    comLoading: LoadingClass.init
  }
};
