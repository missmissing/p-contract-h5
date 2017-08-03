/**
 * Created by bizhou.liu on 2017/6/9.
 */
import axios from 'axios';
import emitter from './emitter';
import Consts from './consts';

axios.defaults.withCredentials = true;

function checkStatus(response) {
  const {data} = response;
  const {code} = data;
  if (code >= 200 && code < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default class Http {
  static send(config) {
    const configs = Object.assign({}, config);
    return axios(configs).then(checkStatus).catch((error) => {
      const {response} = error;
      if (response) {
        const {data, status} = response;
        const {message = '系统异常！'} = data;
        emitter.emit(Consts.EVENT_KEY.ERROR);
        // 触发网络异常
        emitter.emit(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.NOT_200, message);

        if (status === 401) {
          // 触发401异常
          emitter.emit(Consts.EVENT_KEY.NET_COMMUNICATION.BUSINESS_ERROR.ERROR_401);
        }
        if (status === 500) {
          // 触发500异常
          emitter.emit(Consts.EVENT_KEY.NET_COMMUNICATION.NORMAL_ERROR.ERROR_500);
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);

      throw error;
    });
  }

  static post(url, params) {
    const config = {
      method: 'post',
      url,
      data: params
    };
    return Http.send(config);
  }

  static get(url, params = {}) {
    let urlParams = [];
    Object.keys(params).forEach((key) => {
      urlParams.push(`${key}=${params[key]}`);
    });
    if (urlParams.length) {
      urlParams = `${url}?${urlParams.join('&')}`;
    } else {
      urlParams = url;
    }
    const config = {
      url: urlParams
    };
    return Http.send(config);
  }
}
