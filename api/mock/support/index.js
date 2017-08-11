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

  api.use('/api/support/tmpl/busiType', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        value: '1',
        label: '一级 1',
        children: [{
          value: '11',
          label: '二级 1-1',
          children: [{
            value: '111',
            label: '三级 1-1-1'
          }]
        }]
      }, {
        value: '2',
        label: '一级 2',
        children: [{
          value: '21',
          label: '二级 2-1',
          children: [{
            value: '211',
            label: '三级 2-1-1'
          }]
        }, {
          value: '22',
          label: '二级 2-2',
          children: [{
            value: '221',
            label: '三级 2-2-1'
          }]
        }]
      }, {
        value: '3',
        label: '一级 3',
        children: [{
          value: '31',
          label: '二级 3-1',
          children: [{
            value: '311',
            label: '三级 3-1-1'
          }]
        }, {
          value: '32',
          label: '二级 3-2',
          children: [{
            value: '321',
            label: '三级 3-2-1'
          }]
        }]
      }]
    });
  });

  api.use('/api/support/list', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    });
  });

  api.use('/api/support/tmpl/data', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: {
        id: 1,
        number: '213423543545',
        name: '红星合同模板1',
        type: '1',
        startDate: '2017-07-10',
        endDate: '9999-12-31',
        desc: '这只是个说明',
        busiType: '111',
        busiTypeText: '三级 1-1-1'
      }
    });
  });
};
