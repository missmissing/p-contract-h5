const obj = {
  id: null,
  contractNo: null, // 合同编号
  creatorId: null,
  contractName: '', //合同名称
  businessOperatorId: '', // 业务申请人id
  businessOperatorName: '', //业务申请人
  businessDeptId: '',
  businessDeptName: '',
  contractType: '', // 合同模式id
  contractTypeName: '', // 合同模式名称
  contractTextType: 1,
  sealOrder: 1, // 0：我方先盖章 1：对方先盖章
  ourSealOpinion: '', //我方先盖章原因
  templateId: '', // 当前模版id
  templateName: '', //模板名称
  belongProject: '',
  prFlag: 0, // 是否有比加单号 1：有 0：无
  prNo: '', // pr号
  contractBusinessTypeFirst: '',
  contractBusinessTypeFirstName: '',
  contractBusinessTypeSecond: '',
  contractBusinessTypeSecondName: '',
  contractBusinessTypeThird: '',
  contractBusinessTypeThirdName: ''
};

export default obj;
