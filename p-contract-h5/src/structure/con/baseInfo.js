const obj = {
  id: null,
  contractNo: null, // 合同编号
  creatorId: null,
  creator: null,
  creatorDept: null,
  contractName: null, // 合同名称
  businessOperatorId: null,
  businessOperatorName: null, // 业务申请人
  businessDeptId: null,
  businessDeptName: null, // 业务申请人部门
  contractType: null, // 合同模式id
  contractTextType: 1, // 文本类型
  sealOrder: 1, // 0：我方先盖章 1：对方先盖章
  ourSealOpinion: null, // 我方先盖章原因
  templateId: null, // 当前模版id
  templateName: null, // 模板名称
  belongProject: null,
  prFlag: 0, // 是否有比加单号 1：有 0：无
  prNo: null, // pr号
  contractBusinessTypeFirst: null,
  contractBusinessTypeFirstName: null,
  contractBusinessTypeSecond: null,
  contractBusinessTypeSecondName: null,
  contractBusinessTypeThird: null,
  contractBusinessTypeThirdName: null,
  submitTime: null,
  sealTime: null
}

export default obj
