import iView from 'iview';
import emitter from '../core/emitter';
import Consts from '../core/consts';

class Base {
  static errorProcess() {
    console.log('errorProcess');
  }

  static error401Process() {
    console.log('401未认证');
  }

  static error500Process() {
    iView.Message.error('系统异常!');
  }

  static errorNot200Process(msg) {
    iView.Message.warning(msg);
  }

  constructor() {
    emitter.off(Consts.EVENT_KEY.ERROR, Base.errorProcess);
    emitter.off(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.ERROR_401, Base.error401Process);
    emitter.off(Consts.EVENT_KEY.NET_COMMUNICATION.NORMAL_ERROR.ERROR_500, Base.error500Process);
    emitter.off(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.NOT_200, Base.errorNot200Process);
    emitter.on(Consts.EVENT_KEY.ERROR, Base.errorProcess);
    emitter.on(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.ERROR_401, Base.error401Process);
    emitter.on(Consts.EVENT_KEY.NET_COMMUNICATION.NORMAL_ERROR.ERROR_500, Base.error500Process);
    emitter.on(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.NOT_200, Base.errorNot200Process);
  }
}

export default {
  beforeCreate() {
    new Base();
  }
}
