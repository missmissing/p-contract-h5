module.exports = (conf) => {
  const config = conf;
  if (!config.externals) {
    config.externals = {};
  }
  Object.assign(config.externals, {vue: 'Vue'});

  const contract = 'http://cm.uat1.rs.com';
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
