module.exports = function (api) {
  api.use('/contract-web/contract/getRemoteCreatePersonsByKeyWord', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          "userId": "51042101",
          "userName": "王鹏飞",
          "deptCode": "20003780",
          "deptName": "物业部",
          "companyCode": "2515",
          "companyName": "上海红星美凯龙品牌管理有限公司银川分公司"
        },
        {
          "userId": "51035787",
          "userName": "王鹏飞",
          "deptCode": "70000213",
          "deptName": "CMS组",
          "companyCode": " ",
          "companyName": null
        },
        {
          "userId": "50010743",
          "userName": "王鹏飞",
          "deptCode": "20004365",
          "deptName": "商场管理部",
          "companyCode": "2696",
          "companyName": "上海红星美凯龙品牌管理有限公司石家庄中储分公司"
        }
      ]
    });
  });
  api.use('/contract-web/contract/folio/list', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          "folio": "XBJ1760945",
          "title": "4323",
          "pr": "0010028015",
          "procInstId": "60945",
          "originatorId": "51006793",
          "originatorName": "顾康",
          "originatorDepartmentCode": "10000315",
          "originatorDepartmentName": "财务管理中心.采购部",
          "startTime": 1504074683663,
          "finishTime": 1504577479987,
          "supplierCode": "0040001628",
          "supplierName": "史泰博(上海)有限公司",
          "companyCode": "1001",
          "companyName": "红星美凯龙家居集团股份有限公司",
          "processViewUrl": "http://192.168.122.214:8081/Finance/XBJ/View.aspx?ProcInstId=60945",
          "items": null
        },
        {
          "folio": "XBJ17609451",
          "title": "43231",
          "pr": "0010028015",
          "procInstId": "60945",
          "originatorId": "51006793",
          "originatorName": "顾康",
          "originatorDepartmentCode": "10000315",
          "originatorDepartmentName": "财务管理中心.采购部",
          "startTime": 1504074683663,
          "finishTime": 1504577479987,
          "supplierCode": "0040001628",
          "supplierName": "史泰博(上海)有限公司",
          "companyCode": "1001",
          "companyName": "红星美凯龙家居集团股份有限公司",
          "processViewUrl": "http://192.168.122.214:8081/Finance/XBJ/View.aspx?ProcInstId=60945",
          "items": null
        }
      ]
    });
  });
  api.use('/contract-web/contract/folio', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        "folio": "XBJ1760945",
        "title": "4323",
        "pr": "0010028015",
        "procInstId": "60945",
        "originatorId": "51006793",
        "originatorName": "顾康11",
        "originatorDepartmentCode": "10000315",
        "originatorDepartmentName": "财务管理中心.采购部",
        "startTime": 1504074683663,
        "finishTime": 1504577479987,
        "supplierCode": "0040001628",
        "supplierName": "史泰博(上海)有限公司",
        "companyCode": "1001",
        "companyName": "红星美凯龙家居集团股份有限公司",
        "processViewUrl": "http://192.168.122.214:8081/Finance/XBJ/View.aspx?ProcInstId=60945",
        "items": [
          {
            "itemNo": "00001",
            "materialCode": "2100040006",
            "materialName": "笔记本电脑（6000元职级）",
            "taxRate": "5%",
            "taxCode": "J6",
            "price": "6000.00",
            "amount": "12000.00",
            "quantity": "2"
          }
        ]
      }
    });
  });
  api.use('/contract-web/contract/pre', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        baseInfoForm: {
          businessPerson: '研发部三毛',
          businessDepartment: '研发部',
          conModelName: '框架合同',
          conTypeName: '礼品类',
          conTextType: [
            {
              id: 1,
              name: '模版合同'
            },
            {
              id: 2,
              name: '非模版合同'
            }
          ],
          templateName: [
            {
              id: 'template1',
              name: '模版1',
              version: '1.1'
            },
            {
              id: 'template2',
              name: '模版2',
              version: '1.2'
            },
            {
              id: 'template3',
              name: '模版3',
              version: '1.3'
            }
          ]

        },
        contentInfo: {
          tableSupplierInfo: [
            /*{
              id: 'supplier1',
              name: '供应商1',
              bankAccount: '渣打银行'
            }*/
          ],
          conSubjctName: [
            {
              id: 'subject1-4584358',
              name: '红星美凯龙',
            },
          ],
          thirdPartyInfo: [
            {
              id: 'supplier-4584358',
              name: '红星美凯龙',
            },
            {
              id: 'supplier-8495843085',
              name: '悦家',
            },
          ],
          conStandard: [
            /*{
              id: 'material-4584358',
              name: '红星美凯龙',
              number: 80,
              taxRate: 0.8
            }, {
              id: 'material-8495843085',
              name: '悦家',
              number: 809,
              taxRate: 0.18
            }*/
          ]
        }
      }
    })
  })
  api.use('/api/createContract/getRemoteSuppliersByKeyWord', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        list: [
          {
            id: 'supplier001',
            name: '供应商1'
          },
          {
            id: 'supplier002',
            name: '供应商2'
          },
          {
            id: 'supplier003',
            name: '供应商3'
          },
        ]
      }
    });
  });
  api.use('/api/createContract/getRemoteSubjectsByKeyWord', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        list: [
          {
            id: 'company001',
            name: '公司1'
          },
          {
            id: 'company002',
            name: '公司2'
          },
          {
            id: 'company003',
            name: '公司3'
          },
        ]
      }
    });
  });
  api.use('/api/createContract/getRemoteThirdPartiesByKeyWord', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        list: [
          {
            id: 'supplier001',
            name: '供应商1'
          },
          {
            id: 'supplier002',
            name: '供应商2'
          },
          {
            id: 'supplier003',
            name: '供应商3'
          },
        ]
      }
    });
  });
  api.use('/api/createContract/getRelatedInfo', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        contractList: [
          {
            contractCode: '32489328034',
            type: '合同类型',
            status: '状态',
            company: '公司',
            startTime: '2017-97-34',
          }
        ]
      }
    });
  });
  api.use('/api/createContract/getPrTableData', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        total: 300,
        list: [
          {
            companyCode: '32489328034',
            companyName: '红星美凯龙股份有限公司',
            prNum: 'ABCDEFG',
            creator: '张三',
            createDepart: 'XX部门',
            createTime: '1503629338328',
          }
        ]
      }
    });
  });
  api.use('/api/createContract/getPriceTableData', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        total: 300,
        list: [
          {
            priceCode: '32489328034',
            creator: '张三',
            createDepart: 'XX部门',
            createTime: '1503629338328',
            processStatus: '已审批',
            endTime: '1503629338328',
          }
        ]
      }
    });
  });
  api.use('/api/createContract/getContractTableData', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        total: 300,
        list: [
          {
            contractCode: '32489328034',
            creator: '张三',
            createDepart: 'XX部门',
            createTime: '1503629338328',
            sealTime: '1503629338328',
          }
        ]
      }
    });
  });
  api.use('/api/createContract/getOrderTableData', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: {
        total: 300,
        list: [
          {
            contractCode: '32489328034',
            prOrder: 'ABCDEFG',
            totalWithTax: 10000,
            createTime: '1503629338328',
            orderTime: '1503629338328',
          }
        ]
      }
    });
  });
};
