//测试服务器地址
const contract = 'http://cm.uat1.rs.com';
// const contract = 'http://10.11.29.129:56101';

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
