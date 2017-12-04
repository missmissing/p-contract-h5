/**
 * 全屏loading
 * @param {object} options 同element-ui loading选项
 * @param false 则关闭
 */
let loadingInstance = null;

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
    //console.log(1, loadingInstance)
    if (!options) {
      if (loadingInstance) {
        loadingInstance.close();
      }
      return loadingInstance;
    }
    if (loadingInstance) {
      //console.log(3, loadingInstance);
      loadingInstance.close();
    }
    const config = Object.assign({}, defaultOpts, options);
    loadingInstance = this.$loading(config);
    //console.log(2)
    return loadingInstance;
  }
}

export default {
  methods: {
    comLoading: LoadingClass.init
  }
};
