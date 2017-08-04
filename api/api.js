const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = module.exports = express();
const proxyWeb = require('express-http-proxy');
const compression = require('compression');
api.use(logger('dev'));
api.use(compression());
api.use('/api/', bodyParser.json({"limit": "100000kb"}));
api.use('/api/', bodyParser.urlencoded({extended: true}));

require('./mock');

//测试服务器地址
const im = 'http://im.uat1.rs.com';

api.use('/api-im/**', proxyWeb(im, {
  forwardPath: function (req, res) {
    const url = req.originalUrl.replace('/api', 'api');
    console.log(url);
    return url;
  }
}));

module.exports = api;
