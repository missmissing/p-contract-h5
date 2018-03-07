const AssetJsToHtml = require('./src/customWebpackPlugins/asset-js-to-html');

module.exports = (conf) => {
  const config = conf;
  if (!config.externals) {
    config.externals = {};
  }
  Object.assign(config.externals, {vue: 'Vue'});

  const args = process.argv;
  const i = args.indexOf('--env');
  const env = args[i + 1];

  config.plugins.push(new AssetJsToHtml({
    paths: [['prd', 'stg'].indexOf(env) > -1 ? 'https://mapproval.oa.chinaredstar.com/public/moa/static/crossdomainpage.min.js' : 'http://oamapproval.dev.rs.com/public/moa/static/crossdomainpage.min.js']
  }));

  const contract = 'http://cm.dev.rs.com';
  config.devServer = {
    proxy: {
      '/api-contract/**': {
        target: contract,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api-contract': ''
        }
      }
    }
  };

  return config;
};
