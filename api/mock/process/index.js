module.exports = function (api) {
  api.post('/api/contract-web/process/getProcesses', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: {
        "procList": [
          {
            "procInstId": "61100",
            "serialNumber": "61100_23",
            "startTime": "1504685165330",
            "approveTime": null,
            "arrivalTime": "1504685167690",
            "procTitle": "合同模板创建审批",
            "procCode": "CRS_Contract_CreateTemplate",
            "status": "审批中",
            "organigerId": "51006793",
            "organigerName": "顾康",
            "applicantId": "51006793",
            "applicantName": "顾康"
          },
          {
            "procInstId": "61099",
            "serialNumber": "61099_23",
            "startTime": "1504685164760",
            "approveTime": null,
            "arrivalTime": "1504685167647",
            "procTitle": "合同模板创建审批",
            "procCode": "CRS_Contract_CreateTemplate",
            "status": "审批中",
            "organigerId": "51006793",
            "organigerName": "顾康",
            "applicantId": "51006793",
            "applicantName": "顾康"
          },
          {
            "procInstId": "61098",
            "serialNumber": "61098_23",
            "startTime": "1504685164450",
            "approveTime": null,
            "arrivalTime": "1504685167650",
            "procTitle": "合同模板创建审批",
            "procCode": "CRS_Contract_CreateTemplate",
            "status": "审批中",
            "organigerId": "51006793",
            "organigerName": "顾康",
            "applicantId": "51006793",
            "applicantName": "顾康"
          },
          {
            "procInstId": "61097",
            "serialNumber": "61097_23",
            "startTime": "1504685163990",
            "approveTime": null,
            "arrivalTime": "1504685165867",
            "procTitle": "合同模板创建审批",
            "procCode": "CRS_Contract_CreateTemplate",
            "status": "审批中",
            "organigerId": "51006793",
            "organigerName": "顾康",
            "applicantId": "51006793",
            "applicantName": "顾康"
          },
          {
            "procInstId": "61096",
            "serialNumber": "61096_23",
            "startTime": "1504685163633",
            "approveTime": null,
            "arrivalTime": "1504685165853",
            "procTitle": "合同模板创建审批",
            "procCode": "CRS_Contract_CreateTemplate",
            "status": "审批中",
            "organigerId": "51006793",
            "organigerName": "顾康",
            "applicantId": "51006793",
            "applicantName": "顾康"
          }
        ],
        "totalPage": 1
      }
    });
  });
  api.post('/api/contract-web/process/getApproveNode', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: {
        "procInstId": "61100",
        "procCode": "CRS_Contract_CreateTemplate",
        "startTime": "1504685167020",
        "finishTime": "1504685167020",
        "actName": "部门负责人",
        "approverId": "",
        "approverName": null,
        "sign": 0,
        "actions": [
          "同意",
          "拒绝"
        ]
      }
    });
  });
  api.post('/api/contract-web/process/getStartedProcNodes', function (req, res) {
    res.status(200).json({
      code: 200,
      message: '成功',
      dataMap: [{
        id: 1,
        role: 'BU负责人',
        name: '王艳军',
        status: '同意',
        comment: '同意',
        time: '2017/6/27 13:52:38'
      }, {
        id: 2,
        role: 'BU负责人',
        name: '王艳军',
        status: '同意',
        comment: '同意',
        time: '2017/6/27 13:52:38'
      }]
    });
  });
};
