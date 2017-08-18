module.exports = function (api) {
    api.use('/api/createContract/getQrList', function (req, res) {
        res.status(200).json({
            code: 200,
            message: 'success',
            dataMap: {
                list: [
                    {
                        id: '111',
                        name: 'wyy',
                        department: '技术研发部',
                        startTime: '2017-09-09',
                        processStatus: '1',
                        endTime: '2017-10-09',
                        url: 'http://www.baidu.com',
                    },
                    {
                        id: '222',
                        name: 'echo',
                        department: '技术研发部11',
                        startTime: '2017-11-11',
                        processStatus: '2',
                        endTime: '2017-11-11',
                        url: 'http://www.baidu.com',
                    }
                ]
            }
        });
    });
    api.use('/api/createContract/getContractModelsAndTypes', function (req, res) {
        res.status(200).json({
            code: 200,
            message: 'success',
            dataMap: {
                modelList: [{id: 'con1', name: '框架意向合同'},
                    {id: 'con2', name: '框架合同'},
                    {id: 'con3', name: '单一合同'},
                    {id: 'con4', name: '简易合同'},],
                typeList: [{id: 'service1', name: '服务类'},
                    {id: 'service2', name: '礼品类'},
                    {id: 'service3', name: '企划礼品类'},]
            }
        });
    });
    api.use('/api/createContract/getPrDetail', function (req, res) {
        res.status(200).json({
            code: 200,
            message: 'success',
            dataMap: {
                url: 'http://www.baidu.com'
            }
        });
    });
    api.use('/api/createContract/getContractBaseInfo', function (req, res) {
        res.status(200).json({
            code: 200,
            message: 'success',
            dataMap: {
                baseInfo: {
                    businessPerson: '研发部三毛',
                    businessDepartment: '研发部',
                    conModelName: '框架合同',
                    conTypeName: '礼品类',
                    conTextType: [
                        {
                            id: '1',
                            name: '模版合同'
                        },
                        {
                            id: '2',
                            name: '非模版合同'
                        }
                    ],
                    templateName: [
                        {
                            id: 'template1',
                            name: '模版1'
                        },
                        {
                            id: 'template2',
                            name: '模版2'
                        },
                        {
                            id: 'template3',
                            name: '模版3'
                        },
                    ]

                },
                contentInfo: {
                    tableSupplierInfo: [
                        {
                            id: 'supplier1',
                            name: '供应商1',
                            bankAccount: '渣打银行'
                        },
                        {
                            id: 'supplier2',
                            name: '供应商2',
                            bankAccount: '中国银行'
                        },
                    ],
                    conSubjctName: [
                        {
                            id: 'subject1-4584358',
                            name: '红星美凯龙',
                        },
                        {
                            id: 'subject2-8495843085',
                            name: '悦家',
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
                        {
                            id: 'material-4584358',
                            name: '红星美凯龙',
                            number: 80,
                            taxRate: 0.8
                        },
                        {
                            id: 'material-8495843085',
                            name: '悦家',
                            number: 809,
                            taxRate: 0.18
                        },
                    ],
                },
            }
        });
    });
};
