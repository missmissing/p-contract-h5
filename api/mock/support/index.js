module.exports = function (api) {
  api.use('/api/support/tmpl/type', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        value: '',
        label: '自定义',
        contentModule: ''
      }, {
        value: '1',
        label: '模板一',
        contentModule: '1,5'
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
          moduleName: '物料明细',
          moduleContent: `<div style="clear:both;"></div><table style="width:100%;margin-top:20px;" border="1" cellspacing="0" cellpadding="0">
<thead>
<tr>
<th>物料编码</th>
<th>物料描述</th>
<th>数量</th>
<th>含税单价</th>
<th>税率</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">物料编码</td>
<td align="center">物料描述</td>
<td align="center">数量</td>
<td align="center">含税单价</td>
<td align="center">税率</td>
<td align="center">备注</td>
</tr>
</tbody>
</table>`,
          moduleType: 1
        },
        {
          id: 3,
          moduleName: '付款信息',
          moduleContent: `<div style="clear:both;"></div>
<table style="width:100%;margin-top:20px;" border="1" cellspacing="0" cellpadding="0">
<thead>
<tr>
<th>类型</th>
<th>金额</th>
<th>时间</th>
<th>占比</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">类型</td>
<td align="center">金额</td>
<td align="center">时间</td>
<td align="center">占比</td>
<td align="center">备注</td>
</tr>
</tbody>
</table>`,
          moduleType: 1
        },
        {
          id: 4,
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

  api.use('/contract-web/contractBizType/getAllTypes', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        id: '1',
        businessName: '一级 1',
        children: [{
          id: '11',
          businessName: '二级 1-1',
          children: [{
            id: '111',
            businessName: '三级 1-1-1'
          }]
        }]
      }]
    });
  });

  api.use('/contract-web/template/getTemplate', function (req, res) {
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
        contentModule: '1,4',
        tplContent: '这只是个法务文案例子'
      }
    });
  });

  api.use('/api/contractTemplate/addTemplate', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功'
    });
  });
};
