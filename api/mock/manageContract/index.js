module.exports = function (api) {
  api.use('/contract-web/contract/user/list', function (req, res) {
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
      "dataMap": {
        "baseInfoForm": {
          "id": null,
          "prFlag": null,
          "procInstId": null,
          "guid": null,
          "prNo": "XBJ1760945",
          "contractType": 3,
          "contractNo": null,
          "contractBusinessTypeFirst": 3,
          "contractBusinessTypeFirstName": "固定资产类",
          "contractBusinessTypeSecond": 12,
          "contractBusinessTypeSecondName": "动产",
          "contractBusinessTypeThird": 40,
          "contractBusinessTypeThirdName": "IT软硬件",
          "contractTextType": 1,
          "templateId": null,
          "belongProject": null,
          "sealOrder": 1,
          "ourSealOpinion": null,
          "businessOperator": null,
          "businessDept": null
        },
        "cardContentInfoForm": {
          "startTime": null,
          "endTime": null,
          "tableSupplierInfo": [],
          "conSubjctName": [],
          "thirdPartyInfo": [],
          "conStandard": []
        },
        "cardFinanceInfoForm": {
          "moneyInvolved": true,
          "oneOffPay": true,
          "currency": 1,
          "invoiceType": null,
          "totalAmount": null,
          "depositFlag": true,
          "deposit": null,
          "payTime": null,
          "depositRatio": null,
          "paymentMethods": {
            "advance": [
              {
                "id": null,
                "paymentAmount": null,
                "seriousPayments": null,
                "paymentTimePeriod": null,
                "paymentTime": null,
                "ratio": null,
                "remark": null,
                "subItem": []
              }
            ],
            "progress": [
              {
                "id": null,
                "paymentAmount": null,
                "seriousPayments": null,
                "paymentTimePeriod": null,
                "paymentTime": null,
                "ratio": null,
                "remark": null,
                "subItem": []
              }
            ],
            "_final": [
              {
                "id": null,
                "paymentAmount": null,
                "seriousPayments": null,
                "paymentTimePeriod": null,
                "paymentTime": null,
                "ratio": null,
                "remark": null,
                "subItem": []
              }
            ]
          },
          "jiaBillingInfo": [],
          "yiBillingInfo": []
        },
        "cardContCheckInfoForm": {
          "id": null,
          "responsible": null,
          "responsibleDept": null,
          "checkType": null,
          "supervisor": null,
          "supervisorDept": null,
          "haveSample": true,
          "unionCheckPersons": [],
          "materialMatters": [],
          "serviceMatters": []
        },
        "cardSealInfoForm": {
          "sealAttachments": []
        },
        "cardRemarkInfoForm": {
          "otherInstruction": null
        },
        "cardOtherInfo": null
      }
    })
  })
  api.use('/contract-web/contract/party/second', function (req, res) {
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
  api.use('/contract-web/contract/party/first', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
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
  api.use('/contract-web/contract/commit', function (req, res) {
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
  api.use('/api/agreeement/getAgreementList', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          contractId:'001',
          id:'001001',
          name:'从协议1',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11'
        },
        {
          contractId:'002',
          id:'001002',
          name:'从协议2',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11',
          version:'1'
        },
        {
          contractId:'003',
          id:'001003',
          name:'从协议3',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11',
          version:'1'
        },
        {
          contractId:'004',
          id:'001004',
          name:'从协议4',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11',
          version:'1'
        },
        {
          contractId:'005',
          id:'001005',
          name:'从协议5',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11',
          version:'1'
        },
      ]
    });
  });
  api.use('/contract-web/template/getTemplateByBizTypeId', function (req, res) {
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          contractId:'001',
          id:'001001',
          name:'从协议1',
          createPerson:'wyy',
          createDepart:'development',
          createTime:'2017-09-11',
          version:'1'
        }
      ]
    });
  });
  api.use('/contract-web/contract/template/attach',function(req,res){
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          id: '',
          fileId: 15,//附件类型为其他时，上传的文件的id
          attachType: 3,//附件类型
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            },
            {
              id: 3,
              name: '合同'
            }
          ],//附件类型集合
          fileName: '文件名',
          fileUrl: '',//合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          slaveProtocolNo: '',//从协议编号
          haveSale: true,//是否用章
          saleTime: null,//用章次数
          printTime: null,//打印份数
          remainTime: null,//我方留存份数
          saleInfos: ['seal1', 'seal2'],//当前选中的张
          useSeals: [
            {
              id: 'seal1',
              name: '公章'
            },
            {
              id: 'seal2',
              name: '法人章'
            },
            {
              id: 'seal3',
              name: '人事章'
            }
          ],//章列表
          remark: '',
          filesSealed: [//上传的盖章后的文件信息
            {
              sealFileId:'',
              sealFileName: 'filename',//文件名
              sealFileUrl: '',
              sealFileCreatorName: 'wyy',//上传人
              sealFileCreateTime: '2017-09-15',//上传时间
            }
          ]
        }
      ]
    });
  });
  api.use('/contract-web/contract/save',function(req,res){
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          id: '',
          name: '文件名',
          type: 3,
          code: '0011001',
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            },
            {
              id: 3,
              name: '合同'
            }
          ],
          isSeal: true,
          remark: '',
          sealTimes: '',
          printTimes: '',
          retainFileNumber: '',
          sealName: '',
          ifPrint: '',
          useSeal: ['seal1', 'seal2'],
          useSeals: [
            {
              id: 'seal1',
              name: '公章'
            },
            {
              id: 'seal2',
              name: '法人章'
            },
            {
              id: 'seal3',
              name: '人事章'
            }
          ]
        }
      ]
    });
  });
  api.use('/contract-web/contract/materials',function(req,res){
    res.status(200).json({
      code: 200,
      message: 'success',
      dataMap: [
        {
          id: 'material1',
          materialName: '物料1',
          materialCode:'material111111',
          total:20,
          price:200,
          taxRate:3
        },
        {
          id: 'material2',
          materialName: '物料2',
          materialCode:'material22222',
          total:20,
          price:3000,
          taxRate:6
        },
        {
          id: 'material3',
          materialName: '物料3',
          materialCode:'material33333',
          total:20,
          price:400,
          taxRate:17
        }
      ]
    });
  });
};
