import Env from 'rs-browser';

let appId = 'C1C50237';
if (Env.web) {
  appId = '313734E9';
} else if (Env.android) {
  appId = 'C7D84F4B';
}

const env = {
  appId,
  path: 'https://wap.mmall.com',
  newWap: 'https://m.mmall.com',
  couponPath: 'https://user-at.mmall.com',
  call_secret: 'DC11572CFFEC446285CA6C3708EAEACD',
  ptotocol: 'https://'
};

window.__config_env = env;
