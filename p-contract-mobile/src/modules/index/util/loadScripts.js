import {env} from '../../../util/env';

const createScript = function (url) {
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
};

if (env === 'prd') {
  createScript('https://mapproval.oa.chinaredstar.com/public/moa/static/crossdomainpage.min.js');
} else {
  createScript('http://10.11.25.157:8000/public/moa/static/crossdomainpage.min.js');
}

window._____processCenterPageAction('pageloaded');
