//测试服务器地址
const contract = 'http://cm.dev.rs.com';

module.exports = {
  '/api-contract': {
    changeOrigin: true,
    target: contract,
    secure: false,
    pathRewrite: {
      '/api-contract': ''
    }
  }
};
