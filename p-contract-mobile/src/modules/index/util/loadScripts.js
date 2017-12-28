import {env} from '../../../util/env';

const createScript = function (url, callback) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  document.body.appendChild(script);
  script.onload = () => {
    callback && callback();
  };
};

export default (callback) => {
  if (env === 'prd') {
    createScript('https://mapproval.oa.chinaredstar.com/public/moa/static/crossdomainpage.min.js', callback);
  } else {
    createScript('http://10.11.25.157:8000/public/moa/static/crossdomainpage.min.js', callback);
  }
};

