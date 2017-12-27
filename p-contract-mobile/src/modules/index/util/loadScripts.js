import {env} from '../../../util/env';

const createScript = function (url) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  document.body.appendChild(script);
  script.onload = () => {
    window._____processCenterPageAction('pageloaded');
  };
};

if (env === 'prd') {
  createScript('https://mapproval.oa.chinaredstar.com/public/moa/static/crossdomainpage.min.js');
} else {
  createScript('http://10.11.25.157:8000/public/moa/static/crossdomainpage.min.js');
}

