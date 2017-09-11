module.exports = function (api) {
  api.post('/api/contract/user/list', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        "userId": "51042101",
        "userName": "王鹏飞",
        "deptCode": "20003780",
        "deptName": "物业部",
        "companyCode": "2515",
        "companyName": "上海红星美凯龙品牌管理有限公司银川分公司"
      }, {
        "userId": "51035787",
        "userName": "王鹏飞",
        "deptCode": "70000213",
        "deptName": "CMS组",
        "companyCode": " ",
        "companyName": null
      }, {
        "userId": "50010743",
        "userName": "王鹏飞",
        "deptCode": "20004365",
        "deptName": "商场管理部",
        "companyCode": "2696",
        "companyName": "上海红星美凯龙品牌管理有限公司石家庄中储分公司"
      }]
    });
  });
};
