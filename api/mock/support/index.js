module.exports = function (api) {
  api.use('/api/support/tmpl/type', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        value: '',
        label: '自定义',
        moduleId: ''
      }, {
        value: '1',
        label: '模板一',
        moduleId: '1,5'
      }]
    });
  });

  api.use('/contract-web/module/findModule', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [
        {
          id: 1,
          moduleName: '头部（甲方乙方）',
          moduleContent: `<div>
<div style="width:50%;float:left;">甲方：jiafang</div>
<div style="width:50%;float:left;">乙方：yifang</div>
</div>`,
          moduleType: 1
        },
        {
          id: 2,
          moduleName: '测试动态表格',
          moduleContent: 'header1',
          moduleType: 1
        },
        {
          id: 3,
          moduleName: '标的物',
          moduleContent: 'header4',
          moduleType: 1
        },
        {
          id: 4,
          moduleName: '付款阶段',
          moduleContent: 'header5',
          moduleType: 1
        },
        {
          id: 5,
          moduleName: '尾部',
          moduleContent: `<div style="margin-bottom:10px;">
<div style="width:50%;float:left;">甲方：jiafang</div>
<div style="width:50%;float:left;">乙方：yifang</div>
<div style="clear:both;"></div>
</div><div style="margin-bottom:10px;">
<div style="width:50%;float:left;">法定代表人：xxx</div>
<div style="width:50%;float:left;">法定代表人：xxx</div>
<div style="clear:both;"></div>
</div><div style="margin-bottom:10px;">
<div style="width:50%;float:left;">日期：xxxx-xx-xx</div>
<div style="width:50%;float:left;">日期：xxxx-xx-xx</div>
</div>`,
          moduleType: 2
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
        creator: '某某',
        version: 'v1',
        updater: '某某某',
        name: '红星合同模板1',
        type: '1',
        startDate: '2017-07-10',
        endDate: '9999-12-31',
        desc: '这只是个说明',
        busiType: '111',
        busiTypeText: '三级 1-1-1',
        tplType: '1',
        moduleId: '1,5',
        tplContent: '这只是个法务文案例子'
      }
    });
  });
};
