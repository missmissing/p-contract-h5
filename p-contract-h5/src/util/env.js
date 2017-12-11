const origin = window.location.origin;

let env = 'dev';

if (origin.indexOf('uat1.rs') > -1) {
  env = 'uat1';
} else if (origin.indexOf('mklmall') > -1) {
  env = 'stg';
} else if (origin.indexOf('chinaredstar') > -1) {
  env = 'prd';
}

exports.env = env;
