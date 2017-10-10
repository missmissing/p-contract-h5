import {Loading} from 'element-ui'

let instance = null

const defaultOpts = {
  target: document.body,
  body: false,
  fullscreen: false,
  lock: true,
  text: '拼命加载中',
  customClass: ''
}

export default (options = {}) => {
  if (!options) {
    instance && instance.close()
  }
  const config = Object.assign(defaultOpts, options)
  instance = Loading.service(config)
  return instance
}
