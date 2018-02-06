import {Loading} from 'element-ui';

let instance = null;

const defaultOpts = {
  target: document.body,
  body: false,
  fullscreen: true,
  lock: true,
  text: '拼命加载中',
  customClass: ''
};

export default (options = {}) => {
  instance && instance.close();
  if (!options) {
    return;
  }
  const config = Object.assign({}, defaultOpts, options);
  instance = Loading.service(config);
};
