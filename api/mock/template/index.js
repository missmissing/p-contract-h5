module.exports = function (api) {
  api.post('/api/sample/login', function (req, res) {
    res.status(200).json({
      code: 401,
      message: '登录失败',
      dataMap: {}
    });
  });
};
