module.exports = function (api) {
    api.use('/api/createContract/getQrList', function (req, res) {
        res.status(200).json({
            code: 200,
            message: 'success',
            dataMap: {
                list: [
                    {
                        id: 111,
                        name: 'wyy',
                        department: '技术研发部',
                        startTime: '2017-09-09',
                        processStatus: '1',
                        endTime: '2017-10-09'
                    },
                    {
                        id: 222,
                        name: 'wyy',
                        department: '技术研发部',
                        startTime: '2017-09-09',
                        processStatus: '1',
                        endTime: '2017-10-09'
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
                modelList: [{id: 1, name: '框架意向合同'},
                    {id: 2, name: '框架合同'},
                    {id: 3, name: '单一合同'},
                    {id: 4, name: '简易合同'},],
                typeList: [{id: 11, name: '服务类'},
                    {id: 22, name: '礼品类'},
                    {id: 33, name: '企划礼品类'},]
            }
        });
    });
};
