//测试服务器地址
const contract = 'http://cm.dev.rs.com';
// const contract = 'http://10.11.28.106:56101'

module.exports = {
  '/api-contract': {
    changeOrigin: true,
    target: contract,
    secure: false,
    pathRewrite: {
      '/api-contract': ''
    }
  }
}
