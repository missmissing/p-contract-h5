module.exports = function (api) {
  api.post('/api/sample/login', function (req, res) {
    res.status(200).json({
      code: 401,
      message: '登录失败',
      dataMap: {}
    })
  })
  api.use('/api/performance/conList', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        id: 1,
        createDate: '2016-05-03',
        owner: '王小虎',
        province: '上海',
        conCode: '123456123456',
        pr: '0000123456',
        materialCode: 200333,
        price: 100,
        counts: 1,
        conModelName:'框架合同',
        curConModelId:'con2',
        conTypeName:'礼品类',
        conTypeId:'service2',
      }, {
        id: 2,
        createDate: '2016-05-02',
        owner: '王小虎',
        province: '上海',
        conCode: '123456123456',
        pr: '0000123456',
        materialCode: 200333,
        price: 100,
        counts: 1,
        conModelName:'框架合同',
        curConModelId:'con2',
        conTypeName:'礼品类',
        conTypeId:'service2',
      }, {
        id: 3,
        createDate: '2016-05-04',
        owner: '王小虎',
        province: '上海',
        conCode: '123456123456',
        pr: '0000123456',
        materialCode: 200333,
        price: 100,
        counts: 1,
        conModelName:'框架合同',
        curConModelId:'con2',
        conTypeName:'礼品类',
        conTypeId:'service2',
      }, {
        id: 4,
        createDate: '2016-05-01',
        owner: '王小虎',
        province: '上海',
        conCode: '123456123456',
        pr: '0000123456',
        materialCode: 200333,
        price: 100,
        counts: 1,
        conModelName:'框架合同',
        curConModelId:'con2',
        conTypeName:'礼品类',
        conTypeId:'service2',
      }]
    })
  })
}
