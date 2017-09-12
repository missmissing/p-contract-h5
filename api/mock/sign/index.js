module.exports = function (api) {
  api.post('/contract-web/getPr', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: {
        prNum: '1',
        itemNum: 10,
        companyCode: '2',
        companyName: '红星美凯龙',
        initiator: 'tester',
        sponsDepart: 'hh',
        prCreateTime: '2017-09-08',
        prLink: 'baidu.com',
        prGoods: [{
          materielCode: 'abc',
          materielName: '笔记本'
        }]
      }
    });
  });
};
