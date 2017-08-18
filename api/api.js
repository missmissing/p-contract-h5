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

require('./mock')(api);

//测试服务器地址
const contract = '10.11.33.23:8080';

api.use('/api-contract/**', proxyWeb(contract, {
  proxyReqPathResolver: function (req, res) {
    const url = req.originalUrl.replace('/api-contract', '');
    console.log(url);
    return url;
  }
}));

module.exports = api;
