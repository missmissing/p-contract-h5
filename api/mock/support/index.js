module.exports = function (api) {
  api.use('/api/support/tmpl/type', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        value: '',
        label: '自定义',
        moduleId: []
      }, {
        value: 1,
        label: '模板一',
        moduleId: [1, 6]
      }]
    });
  });

  api.use('/api/support/module/data', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [
        {
          key: 1,
          label: '测试动态表格',
          content: 'header1',
          type: 1
        },
        {
          key: 2,
          label: '头部(红星甲方)',
          content: 'header2',
          type: 1
        },
        {
          key: 3,
          label: '头部(红星乙方)',
          content: 'header3',
          type: 1
        },
        {
          key: 4,
          label: '标的物',
          content: 'header4',
          type: 1
        },
        {
          key: 5,
          label: '付款阶段',
          content: 'header5',
          type: 1
        },
        {
          key: 6,
          label: '尾部',
          content: 'footer1',
          type: 2
        }
      ]
    });
  });

  api.use('/api/support/list', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    });
  });
};
