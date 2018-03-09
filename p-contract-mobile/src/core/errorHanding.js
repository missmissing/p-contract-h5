import bus from './bus'
import Consts from './consts'

class Base {
  static errorProcess () {
    console.log('errorProcess')
  }

  static error401Process () {
    console.log('401未认证')
  }

  static error500Process () {
    // Message.error('系统异常,请刷新页面重试!');
  }

  static errorNot200Process (msg) {
    if (msg) {
      // Message.warning(msg);
    }
  }

  static errorRequestTimeout () {
    // Message.warning('请求超时!');
  }

  constructor () {
    bus.$off(Consts.EVENT_KEY.ERROR, Base.errorProcess)
    bus.$off(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.ERROR_401, Base.error401Process)
    bus.$off(Consts.EVENT_KEY.NET_COMMUNICATION.NORMAL_ERROR.ERROR_500, Base.error500Process)
    bus.$off(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.NOT_200, Base.errorNot200Process)
    bus.$off(Consts.EVENT_KEY.NET_REQUEST_TIMEOUT, Base.errorRequestTimeout)
    bus.$on(Consts.EVENT_KEY.ERROR, Base.errorProcess)
    bus.$on(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.ERROR_401, Base.error401Process)
    bus.$on(Consts.EVENT_KEY.NET_COMMUNICATION.NORMAL_ERROR.ERROR_500, Base.error500Process)
    bus.$on(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.NOT_200, Base.errorNot200Process)
    bus.$on(Consts.EVENT_KEY.NET_REQUEST_TIMEOUT, Base.errorRequestTimeout)
  }
}

export default {
  beforeCreate () {
    new Base() //eslint-disable-line
  }
}
