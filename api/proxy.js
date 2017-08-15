module.exports = {
  '/api': {
    changeOrigin: true,
    target: 'http://localhost:3000',
    secure: false
  },
  '/contract-web': {
    changeOrigin: true,
    target: 'http://localhost:3000',
    secure: false
  }
};
