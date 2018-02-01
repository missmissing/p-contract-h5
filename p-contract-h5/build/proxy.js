//测试服务器地址
const contract = 'http://cm.dev.rs.com';
// const contract = 'http://10.11.29.6:56101';

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
