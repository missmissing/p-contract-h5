import Env from 'rs-browser';

let appId = 'C1C50237';
if (Env.web) {
  appId = '313734E9';
} else if (Env.android) {
  appId = 'C7D84F4B';
}

const env = {
  appId,
  path: 'https://mkl.mklmall.com',
  newWap: 'https://m.mklmall.com',
  couponPath: 'https://user-at.mklmall.com',
  call_secret: '1234567890',
  ptotocol: 'https://'
};

window.__config_env = env;
