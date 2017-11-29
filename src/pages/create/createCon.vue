<style scope>
  .createCon .title {
    position: relative;
  }

  .createCon .errorCount {
    font-style: normal;
    position: absolute;
    top: -11px;
    left: -15px;
    line-height: 18px;
    text-align: center;
    background: red;
    color: white;
    border-radius: 50% 50%;
    width: 18px;
    height: 18px;
  }

  .createCon .errorMsg {
    color: red;
    font-style: normal;
    font-size: 12px;
    margin-left: 20px;
  }

  .createCon .select-money {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .createCon .select-curTime {
    margin-bottom: 5px;
  }

  .createCon table {
    width: 100% !important;
  }

  .createCon table td {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }

  .createCon table .tdPd {
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .createCon .el-table__expanded-cell {
    z-index: 1
  }
</style>
<template>
  <div class="createCon">
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl" style="font-weight: bolder">{{procTitle}}</div>
    </div>
    <el-card v-if="operateType==='update'||updated">
      <!--<header slot="header">变更原因</header>-->
      <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="updateForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input :disabled="operateType==='query'" v-model="updateForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1" v-if="operateType==='update'">
            <el-button :disabled="!updateForm.code" type="primary" @click="handleQuery(updateForm.code)">
              查找
            </el-button>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="8">
            <el-form-item label="变更方式" prop="updateMode">
              <el-select class="wp100" :disabled="operateType==='query'" v-model="updateForm.updateMode"
                         placeholder="请选择变更方式" @change="handleChangeUpdateMode">
                <el-option
                  v-for="item in updateForm.updateModes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="updateForm.updateMode===2">
            <el-form-item label="新合同编号" prop="newCode">
              <el-input :disabled="true" v-model="updateForm.newCode" placeholder="新合同编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-form-item label="备注" prop="remark">
          <el-input
            :disabled="operateType==='query'"
            v-model="updateForm.remark"
            placeholder="请输入备注"
            type="textarea"
            :rows="4"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="contentVisible">
      <header slot="header">合同基本信息</header>
      <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :rules="baseInfoForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同名称" prop="contractName">
              <el-input :disabled="isEnabled1" v-model="baseInfoForm.contractName" placeholder="请输入合同名称"
                        :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item v-if="ifRequest" label="业务申请人" prop="businessOperatorId">
              <el-select
                clearable
                class="wp100"
                :disabled="isEnabled1"
                v-model="baseInfoForm.businessOperatorId"
                filterable
                remote
                placeholder="请输入业务申请人"
                :remote-method="getRemotebusinessOperatorsByKeyWord"
                :loading="baseInfoForm.loading"
                @change="handleBusinessOperatorChange">
                <el-option
                  v-for="item in baseInfoForm.businessOperators"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  <span style="float: left">{{ item.userName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else label="业务申请人" prop="businessOperatorId">
              <el-input :disabled="isEnabled1" v-model="baseInfoForm.businessOperatorName" class="wp100"
                        placeholder="请输入业务申请人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务部门" prop="businessDeptName">
              <el-input :disabled="isEnabled" v-model="baseInfoForm.businessDeptName"
                        placeholder="请输入业务部门"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同模式">
              <el-input :disabled="isEnabled" v-model="baseInfoForm.contractTypeName"
                        placeholder="请输入合同模式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型">
              <el-input :disabled="isEnabled" v-model="baseInfoForm.contractBusinessTypeName"
                        placeholder="请输入业务类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文本类型">
              <el-select class="wp100" :disabled="isEnabled1" v-model="baseInfoForm.contractTextType"
                         placeholder="请选择合同文本类型" @change="handleContractTextTypeChange">
                <el-option
                  v-for="item in baseInfoForm.contractTextTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="模板名称" prop="templateId">
              <el-select v-if="ifRequest" class="wp100" :disabled="isEnabled1" v-model="baseInfoForm.templateId"
                         placeholder="请选择合同模版"
                         @change="handleTemplateChange">
                <el-option
                  v-for="item in baseInfoForm.templateOptions"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId">
                </el-option>
              </el-select>
              <el-input v-else :disabled="isEnabled1" v-model="baseInfoForm.templateName"
                        placeholder="请选择合同模版"></el-input>
              {{conVersion}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="handlePreview" style="margin-left:33px"
                       v-if="baseInfoForm.contractTextType===1">预览
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属项目" prop="belongProject">
              <el-input :disabled="operateType==='query'" v-model="baseInfoForm.belongProject"
                        placeholder="请输入所属项目"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="operateType!=='create'&&updateForm.updateMode===1">
            <el-form-item label="合同编号">
              <el-input v-model="baseInfoForm.contractNo" placeholder="请输入合同编号"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="盖章次序">
              <el-radio-group v-model="baseInfoForm.sealOrder" :disabled="isEnabled1">
                <el-radio :label="1">对方先盖章</el-radio>
                <el-radio :label="0">我方先盖章</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="baseInfoForm.sealOrder===0">
          <el-col :span="16" style="margin-left: 100px">
            <el-input :disabled="isEnabled1" type="textarea" :rows="4" placeholder="请输入内容"
                      v-model="baseInfoForm.ourSealOpinion"></el-input>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="contentVisible">
      <el-tabs v-model="activeTabName">
        <el-tab-pane name="tabContInfo">
          <span slot="label" class="title">合同内容信息<i v-if="cardContentInfoForm.errorCount"
                                                    class="errorCount">{{cardContentInfoForm.errorCount}}</i></span>
          <el-form ref="cardContentInfoForm" :model="cardContentInfoForm" label-width="120px"
                   :rules="cardContentInfoForm.rules">
            <el-card>
              <header slot="header">合同供应商信息<i class="errorMsg">{{cardContentInfoForm.supplierErrorMsg}}</i></header>
              <el-button v-if="isVisibleNewSupplierBtn" size="small" @click="handleAddContractSupplier" icon="plus"
                         class="mb10" type="primary">新增
              </el-button>
              <el-table :data="cardContentInfoForm.tableSupplierInfo">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="code" label="供应商编号"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.tableSupplierInfo[scope.$index].type"
                      @click="handleRemoveSupplier(scope.$index, cardContentInfoForm.tableSupplierInfo)"
                      type="danger"
                      size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="mt20">
              <header slot="header">合同我方主体名称<i class="errorMsg">{{cardContentInfoForm.subjectsErrorMsg}}</i></header>
              <el-button
                v-if="enabledInupdated"
                type="primary"
                size="small"
                @click="handleNewSubjectName"
                icon="plus" class="mb10">新增
              </el-button>
              <el-table :data="cardContentInfoForm.conSubjctName">
                <el-table-column prop="code" label="公司代码"></el-table-column>
                <el-table-column prop="name" label="公司名称"></el-table-column>
                <el-table-column prop="applyAll" label="全公司适用">
                  <template scope="scope">
                    <el-checkbox :disabled="!enabledAllApply(cardContentInfoForm.conSubjctName[scope.$index].code)"
                                 v-model="cardContentInfoForm.conSubjctName[scope.$index].applyAll"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.conSubjctName[scope.$index].type"
                      @click="handleRemoveSubect(scope.$index, cardContentInfoForm.conSubjctName)"
                      type="danger" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card v-if="baseInfoForm.contractType!==2" class="mt20">
              <header slot="header">第三方信息</header>
              <el-button
                v-if="operateType==='create'"
                type="primary"
                @click="handleNewthirdPartyInfo"
                size="small"
                icon="plus" class="mb10">新增
              </el-button>
              <el-table :data="cardContentInfoForm.thirdPartyInfo">
                <el-table-column prop="code" label="供应商编号"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.thirdPartyInfo[scope.$index].type"
                      @click="handleRemoveThirdPartyInfo(scope.$index, cardContentInfoForm.thirdPartyInfo)"
                      type="danger" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card v-if="baseInfoForm.contractType!==4" class="mt20">
              <header slot="header">合同标的</header>
              <el-button
                v-if="baseInfoForm.contractType===3&&!baseInfoForm.prNo&&operateType!=='query'"
                @click="handleAddConStandard"
                size="small"
                icon="plus"
                class="mb10"
                type="primary">新增
              </el-button>
              <el-table :data="cardContentInfoForm.conStandard">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column v-if="baseInfoForm.contractBusinessTypeFirst!==2" prop="materialCode"
                                 label="物料编码" width="250"></el-table-column>
                <el-table-column prop="materialName" width="300"
                                 :label="baseInfoForm.contractBusinessTypeFirst===2?'服务名称':'物料名称'"></el-table-column>
                <el-table-column v-if="baseInfoForm.contractType!==3" prop="total" label="数量"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="taxRate" label="税率">
                  <template scope="scope">
                    {{cardContentInfoForm.conStandard[scope.$index].taxRate}}%
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.conStandard[scope.$index].operate"
                      @click="handleRemoveConStandard(scope.$index,cardContentInfoForm.conStandard)"
                      type="danger" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="mt20" v-if="cardContentInfoForm.conStandard.length">
                <el-form-item label="备注" prop="corporeRemark" label-width="60px">
                  <el-input
                    :disabled="!enabledInupdated"
                    v-model="cardContentInfoForm.corporeRemark"
                    placeholder="请输入备注"
                    type="textarea"
                    :rows="4"></el-input>
                </el-form-item>
              </el-row>
              <el-row class="mt20" v-if="operateType==='update'">
                <el-col :span="8">
                  <el-form-item label="是否固定期限">
                    <el-radio-group v-model="cardContentInfoForm.fixedTermFlag" :disabled="!enabledInupdated">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <el-row class="mt20">
              <el-form-item label="生效条件" prop="effectiveCondition">
                <el-radio-group v-model="cardContentInfoForm.effectiveCondition" :disabled="!enabledInupdated"
                                @change="handleChangeValidateForms">
                  <el-radio :label="1">附期限生效</el-radio>
                  <el-radio :label="2">附条件生效</el-radio>
                  <el-radio :label="3">签订生效</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row class="mt20" v-if="cardContentInfoForm.effectiveCondition===1">
              <el-col :span="8">
                <el-form-item label="合同生效日期" prop="startTime">
                  <el-date-picker v-model="cardContentInfoForm.startTime"
                                  format="yyyy-MM-dd"
                                  @change="handleStartDateChange"
                                  :disabled="!enabledInupdated"
                                  placeholder="请输入合同生效期日期"
                                  type="date"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同终止日期" prop="endTime">
                  <el-date-picker v-model="cardContentInfoForm.endTime"
                                  format="yyyy-MM-dd"
                                  @change="handleChangeValidateForms"
                                  :disabled="!enabledInupdated"
                                  placeholder="请输入合同终止日期"
                                  type="date"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="mt20" v-if="cardContentInfoForm.effectiveCondition===2">
              <el-form-item prop="conditionDesc" class="mr20" label="备注">
                <el-input @change="handleChangeValidateForms" :disabled="!enabledInupdated"
                          v-model="cardContentInfoForm.conditionDesc" type="textarea" :rows="4"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="tabContFinanceInfo">
          <span slot="label" class="title">合同财务信息<i v-if="cardFinanceInfoForm.errorCount"
                                                    class="errorCount">{{cardFinanceInfoForm.errorCount}}</i></span>
          <el-form ref="cardFinanceInfoForm" :model="cardFinanceInfoForm" :rules="cardFinanceInfoForm.rules"
                   label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否涉及金额">
                  <el-radio-group v-model="cardFinanceInfoForm.moneyInvolved"
                                  :disabled="operateType==='query'||!enaledMoneyInvolved||!enabledFianceBtn">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
                <el-form-item label="是否一次性付款">
                  <el-radio-group v-model="cardFinanceInfoForm.oneOffPay"
                                  :disabled="operateType==='query'||baseInfoForm.contractType===3">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="cardFinanceInfoForm.moneyInvolved">
              <el-col :span="8">
                <!--<el-form-item v-if="cardFinanceInfoForm.moneyInvolved&&cardFinanceInfoForm.oneOffPay" label="合同总金额" prop="totalAmount" :rules="[{ required: true, message: '请输入合同总金额', trigger: 'blur' }]">
                  <el-input  :disabled="!cardFinanceInfoForm.oneOffPay||operateType==='query'"
                            v-model="cardFinanceInfoForm.totalAmount" placeholder="根据上表累加(含税价)">{{totalConMoney}}
                  </el-input>
                </el-form-item>-->
                <el-form-item v-if="baseInfoForm.contractType===3" label="合同总金额" prop="totalAmount">
                  <el-input :disabled="!enabledContractSum" v-model.number="cardFinanceInfoForm.totalAmount"
                            placeholder="根据上表累加(含税价)"></el-input>
                </el-form-item>
                <el-form-item v-else label="合同总金额" prop="totalAmount">
                  <el-input :disabled="true"
                            v-model.number="cardFinanceInfoForm.totalAmount" placeholder="根据上表累加(含税价)">{{totalAmount}}
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开票类型" prop="invoiceType">
                  <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" placeholder="请选择开票类型"
                             :disabled="operateType==='query'" @change="handleChangeValidateForms">
                    <el-option
                      v-for="item in cardFinanceInfoForm.invoiceTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="币种" prop="currency">
                  <el-select class="wp100" v-model="cardFinanceInfoForm.currency" placeholder="请选择币种"
                             :disabled="operateType==='query'">
                    <el-option
                      v-for="item in cardFinanceInfoForm.currencyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="cardFinanceInfoForm.oneOffPay&&cardFinanceInfoForm.moneyInvolved">
              <el-col :span="8">
                <el-form-item v-if="cardFinanceInfoForm.moneyInvolved&&cardFinanceInfoForm.oneOffPay" label="付款条件"
                              prop="paymentTimePeriod"
                              :rules="{required: true, message: '请输入付款条件'}">
                  <el-select
                    @change="handleChangeValidateForms"
                    v-model="cardFinanceInfoForm.paymentTimePeriod"
                    placeholder="请选择付款条件"
                    class="wp100"
                    :disabled="operateType==='query'"
                  >
                    <el-option
                      v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else label="付款条件" prop="paymentTimePeriod">
                  <el-select
                    v-model="cardFinanceInfoForm.paymentTimePeriod"
                    placeholder="请选择付款条件"
                    class="wp100"
                    :disabled="operateType==='query'"
                  >
                    <el-option
                      v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-card v-if="cardFinanceInfoForm.moneyInvolved">
              <header slot="header">付款方式<i class="errorMsg">{{cardFinanceInfoForm.paymentErrorMSG}}</i></header>
              <el-table :data="cardFinanceInfoForm.paymentMethods.earnest"
                        v-if="!cardFinanceInfoForm.oneOffPay"
                        style="width: 100%"
              >
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="多次付款">
                  <template scope="scope">
                    <el-checkbox :disabled="true"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentAmount" label="付款金额" width="150px">
                  <template scope="scope">
                    <el-input
                      v-if="cardFinanceInfoForm.paymentMethods.earnest[scope.$index].seriousPayments"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.earnest[scope.$index].seriousPayments"
                      v-model="earnestPaymentAmount"></el-input>
                    <el-input
                      v-else
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.earnest[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.earnest[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款条件"
                  width="200px">
                  <template scope="scope">
                    <el-select
                      v-model="cardFinanceInfoForm.paymentMethods.earnest[scope.$index].paymentTimePeriod"
                      placeholder="请选择付款条件"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.earnest[scope.$index].seriousPayments"
                    >
                      <el-option
                        v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="付款节点说明"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.earnest[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.earnest[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="100px">
                  <template scope="scope">
                    {{setRatio(cardFinanceInfoForm.paymentMethods.earnest[scope.$index],
                    cardFinanceInfoForm.paymentMethods.earnest[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods.advance"
                        v-if="!cardFinanceInfoForm.oneOffPay"
                        style="width: 100%"
              >
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods.advance[0].seriousPayments">
                  <template scope="props">
                    <div v-if="cardFinanceInfoForm.paymentMethods.advance[0].seriousPayments"
                         v-bind:class="{tdPd:cardFinanceInfoForm.paymentMethods.advance[0].seriousPayments}">
                      <el-button
                        size="small"
                        icon="plus"
                        type="primary"
                        v-if="operateType!=='query'"
                        @click="handleAddAdvanceItem(props.row.type)"
                        class="mb10">
                        添加
                      </el-button>
                      <el-table :data="props.row.subItem">
                        <el-table-column width="100px" prop="name" label="名称">
                          <template scope="scope">{{props.row.type}}{{scope.$index + 1}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="paymentAmount"
                          label="付款金额">
                          <template scope="scope">
                            <el-input
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].paymentAmount"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="paymentTimePeriod"
                          label="付款条件"
                          width="200px">
                          <template scope="scope">
                            <el-select
                              v-model="props.row.subItem[scope.$index].paymentTimePeriod"
                              placeholder="请选择付款条件"
                              :disabled="operateType==='query'"
                            >
                              <el-option
                                v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                              >
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="付款节点说明"
                          width="200px">
                          <template scope="scope">
                            <el-input
                              type="textarea"
                              :rows="2"
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].remark"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="ratio" label="占比" width="100px">
                          <template scope="scope">
                            {{setRatio(props.row.subItem[scope.$index], props.row.subItem[scope.$index].paymentAmount)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="100"
                          v-if="operateType!=='query'">
                          <template scope="scope">
                            <el-button
                              @click="handleRemoveAdvanceItem(scope.$index, props.row.subItem)"
                              type="danger" size="small">移除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      :checked="cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                      @change="handleSeriousPaymentsChange(cardFinanceInfoForm.paymentMethods.advance[scope.$index],$event)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentAmount" label="付款金额" width="150px">
                  <template scope="scope">
                    <el-input
                      v-if="cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                      v-model="advancePaymentAmount"></el-input>
                    <el-input
                      v-else
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款条件"
                  width="200px">
                  <template scope="scope">
                    <el-select
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentTimePeriod"
                      placeholder="请选择付款条件"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                    >
                      <el-option
                        v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="付款节点说明"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="100px">
                  <template scope="scope">
                    {{setRatio(cardFinanceInfoForm.paymentMethods.advance[scope.$index],
                    cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods.progress"
                        v-if="!cardFinanceInfoForm.oneOffPay" style="width: 100%">
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods.progress[0].seriousPayments">
                  <template scope="props">
                    <div v-if="cardFinanceInfoForm.paymentMethods.progress[0].seriousPayments"
                         v-bind:class="{tdPd:cardFinanceInfoForm.paymentMethods.progress[0].seriousPayments}">
                      <el-button
                        size="small"
                        icon="plus"
                        type="primary"
                        class="mb10"
                        v-if="operateType!=='query'"
                        @click="handleAddAdvanceItem(props.row.type)">
                        添加
                      </el-button>
                      <el-table :data="props.row.subItem">
                        <el-table-column width="100px" prop="name" label="名称">
                          <template scope="scope">{{props.row.type}}{{scope.$index + 1}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="monpaymentAmountey"
                          label="付款金额">
                          <template scope="scope">
                            <el-input
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].paymentAmount"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="paymentTimePeriod"
                          label="付款条件"
                          width="200px">
                          <template scope="scope">
                            <el-select
                              v-model="props.row.subItem[scope.$index].paymentTimePeriod"
                              placeholder="请选择付款条件"
                              :disabled="operateType==='query'"
                            >
                              <el-option
                                v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                              >
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="付款节点说明"
                          width="200px">
                          <template scope="scope">
                            <el-input
                              type="textarea"
                              :rows="2"
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].remark"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="ratio" label="占比" width="100px">
                          <template scope="scope">
                            {{setRatio(props.row.subItem[scope.$index], props.row.subItem[scope.$index].paymentAmount)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="100"
                          v-if="operateType!=='query'">
                          <template scope="scope">
                            <el-button
                              @click="handleRemoveAdvanceItem(scope.$index, props.row.subItem)"
                              type="danger" size="small">移除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      :checked="cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                      @change="handleSeriousPaymentsChange(cardFinanceInfoForm.paymentMethods.progress[scope.$index],$event)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  label="付款金额"
                  width="150px">
                  <template scope="scope">
                    <el-input
                      v-if="cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                      v-model="progressPaymentAmount"></el-input>
                    <el-input
                      v-else
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款条件"
                  width="200px">
                  <template scope="scope">
                    <el-select
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentTimePeriod"
                      placeholder="请选择付款条件"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                    >
                      <el-option
                        v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="付款节点说明"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="100px">
                  <template scope="scope">
                    {{setRatio(cardFinanceInfoForm.paymentMethods.progress[scope.$index],
                    cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods._final"
                        v-if="!cardFinanceInfoForm.oneOffPay" style="width: 100%">
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods._final[0].seriousPayments">
                  <template scope="props">
                    <div v-if="cardFinanceInfoForm.paymentMethods._final[0].seriousPayments"
                         v-bind:class="{tdPd:cardFinanceInfoForm.paymentMethods._final[0].seriousPayments}">
                      <el-button
                        size="small"
                        icon="plus"
                        type="primary"
                        class="mb10"
                        v-if="operateType!=='query'"
                        @click="handleAddAdvanceItem(props.row.type)">
                        添加
                      </el-button>
                      <el-table :data="props.row.subItem">
                        <el-table-column width="100px" prop="name" label="名称">
                          <template scope="scope">{{props.row.type}}{{scope.$index + 1}}</template>
                        </el-table-column>
                        <el-table-column
                          prop="paymentAmount"
                          label="付款金额">
                          <template scope="scope">
                            <el-input
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].paymentAmount"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="paymentTimePeriod"
                          label="付款条件"
                          width="200px">
                          <template scope="scope">
                            <el-select
                              v-model="props.row.subItem[scope.$index].paymentTimePeriod"
                              placeholder="请选择付款条件"
                              :disabled="operateType==='query'"
                            >
                              <el-option
                                v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"
                              >
                              </el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="remark"
                          label="付款节点说明"
                          width="200px">
                          <template scope="scope">
                            <el-input
                              type="textarea"
                              :rows="2"
                              :disabled="operateType==='query'"
                              v-model="props.row.subItem[scope.$index].remark"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column prop="ratio" label="占比" width="100px">
                          <template scope="scope">
                            {{setRatio(props.row.subItem[scope.$index], props.row.subItem[scope.$index].paymentAmount)}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          label="操作"
                          width="100"
                          v-if="operateType!=='query'">
                          <template scope="scope">
                            <el-button
                              @click="handleRemoveAdvanceItem(scope.$index, props.row.subItem)"
                              type="danger" size="small">移除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column
                  width="90px"
                  prop="seriousPayments"
                  label="多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      :checked="cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                      @change="handleSeriousPaymentsChange(cardFinanceInfoForm.paymentMethods._final[scope.$index],$event)"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  label="付款金额"
                  width="150px">
                  <template scope="scope">
                    <el-input
                      v-if="cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                      v-model="finalPaymentAmount"></el-input>
                    <el-input
                      v-else
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款时间"
                  width="200px">
                  <template scope="scope">
                    <el-select
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentTimePeriod"
                      placeholder="请选择付款条件"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                    >
                      <el-option
                        v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="付款节点说明"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="100px">
                  <template scope="scope">
                    {{setRatio(cardFinanceInfoForm.paymentMethods._final[scope.$index],
                    cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods.deposit"
                        v-if="!cardFinanceInfoForm.oneOffPay"
                        style="width: 100%"
              >
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="多次付款">
                  <template scope="scope">
                    <el-checkbox :disabled="true"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="paymentAmount" label="付款金额" width="150px">
                  <template scope="scope">
                    <el-input
                      v-if="cardFinanceInfoForm.paymentMethods.deposit[scope.$index].seriousPayments"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.deposit[scope.$index].seriousPayments"
                      v-model="depositPaymentAmount"></el-input>
                    <el-input
                      v-else
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.deposit[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.deposit[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款条件"
                  width="200px">
                  <template scope="scope">
                    <el-select
                      v-model="cardFinanceInfoForm.paymentMethods.deposit[scope.$index].paymentTimePeriod"
                      placeholder="请选择付款条件"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.deposit[scope.$index].seriousPayments"
                    >
                      <el-option
                        v-for="item in cardFinanceInfoForm.paymentTimePeriods"
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="付款节点说明"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'||cardFinanceInfoForm.paymentMethods.deposit[scope.$index].seriousPayments"
                      v-model="cardFinanceInfoForm.paymentMethods.deposit[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="100px">
                  <template scope="scope">
                    {{setRatio(cardFinanceInfoForm.paymentMethods.deposit[scope.$index],
                    cardFinanceInfoForm.paymentMethods.deposit[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="mt20">
                <el-form-item label="备注" prop="paymentRemark" label-width="60px">
                  <el-input
                    :disabled="!enabledInupdated"
                    v-model="cardFinanceInfoForm.paymentRemark"
                    placeholder="请输入备注"
                    type="textarea"
                    :rows="4"></el-input>
                </el-form-item>
              </el-row>
            </el-card>
            <el-card class="mt20">
              <header slot="header">开票信息</header>
              <el-row>
                <el-col v-if="cardFinanceInfoForm.jiaBillingInfo.length>1" :span="12">
                  <h4>具体开票信息以采购提供为准</h4>
                </el-col>
                <el-col v-else :span="12" class="billingInfo">
                  <h4>甲方增值税专用开票信息：</h4>
                  <el-row>
                    <el-col :span="6">
                      公司名称:
                    </el-col>
                    <el-col :span="16">
                      {{jia.company}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      统一社会信用代码:
                    </el-col>
                    <el-col :span="16">
                      {{jia.unifiedSocialCreditCode}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      注册地址:
                    </el-col>
                    <el-col :span="16">
                      {{jia.registeredAddress}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      经营地址:
                    </el-col>
                    <el-col :span="16">
                      {{jia.businessAddress}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系电话:
                    </el-col>
                    <el-col :span="16">
                      {{jia.contactNumber}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      银行账号:
                    </el-col>
                    <el-col :span="16">
                      {{jia.bankAccount}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      开 户 行:
                    </el-col>
                    <el-col :span="16">
                      {{jia.depositBank}}
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" class="billingInfo">
                  <h4>乙方指定甲方汇款的账户为：</h4>
                  <el-row>
                    <el-col :span="6">
                      乙方:
                    </el-col>
                    <el-col :span="16">
                      {{yi.company}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      银行账号:
                    </el-col>
                    <el-col :span="16">
                      {{yi.bankAccount}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      开 户 行:
                    </el-col>
                    <el-col :span="16">
                      {{yi.depositBank}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系人:
                    </el-col>
                    <el-col :span="16">
                      {{yi.contacts}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      注册地址:
                    </el-col>
                    <el-col :span="16">
                      {{yi.registeredAddress}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系电话:
                    </el-col>
                    <el-col :span="16">
                      {{yi.contactNumber}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      E-mail:
                    </el-col>
                    <el-col :span="16">
                      {{yi.email}}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="tabContCheckInfo"
                     v-if="baseInfoForm.contractType===3||baseInfoForm.contractType===1">
          <span slot="label" class="title"><i v-if="cardContCheckInfoForm.errorCount"
                                              class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>合同验收与样品信息</span>
          <el-form ref="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="120px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="验收责任人" prop="responsibleName">
                  <el-input class="wp100" :disabled="true" v-model="cardContCheckInfoForm.responsibleName"
                            placeholder="请输入验收责任人"></el-input>
                  <!--<el-select
                    class="wp100"
                    :disabled="true"
                    v-model="cardContCheckInfoForm.responsibleId"
                    filterable
                    remote
                    placeholder="请输入验收责任人"
                    :remote-method="getRemoteResponsiblesByKeyWord"
                    :loading="cardContCheckInfoForm.loading"
                    @change="handleResponsibleChange">
                    <el-option
                      v-for="item in cardContCheckInfoForm.responsibles"
                      :key="item.userId"
                      :label="item.userName"
                      :value="item.userId">
                      <span style="float: left">{{ item.userName }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
                    </el-option>
                  </el-select>-->
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="responsibleDeptName" label="验收责任人部门">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.responsibleDeptName"
                            placeholder="请输入验收责任人部门"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="!showMaterialItems&&baseInfoForm.contractBusinessTypeFirst===2">
                <el-form-item prop="checkType" label="服务类验收方式">
                  <el-select
                    :disabled="operateType==='query'"
                    v-model="cardContCheckInfoForm.checkType"
                    placeholder="请选择服务类验收方式">
                    <el-option
                      v-for="item in cardContCheckInfoForm.checkServiceMethods"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row>
              <el-col :span="8">
                <el-form-item prop="supervisor" label="验收监督人">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.supervisor"
                            placeholder="请输入验收监督人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="supervisorDept" label="验收监督人部门">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.supervisorDept"
                            placeholder="请输入验收监督人部门"></el-input>
                </el-form-item>
              </el-col>
            </el-row>-->
            <el-button
              v-if="operateType!=='query'"
              @click="handleAddUnionCheck"
              size="small"
              icon="plus"
              type="primary"
              class="mb10">添加
            </el-button>
            <el-table class="mb20" :data="cardContCheckInfoForm.unionCheckPersons">
              <el-table-column prop="personName" label="联合验收人"></el-table-column>
              <el-table-column prop="personDept" label="联合验收人部门"></el-table-column>
              <el-table-column prop="required" label="是否必选">
                <template scope="scope">
                  {{cardContCheckInfoForm.unionCheckPersons[scope.$index].required === true ? '是' : '否'}}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
                v-if="this.operateType!=='query'">
                <template scope="scope">
                  <el-button
                    v-if="cardContCheckInfoForm.unionCheckPersons[scope.$index].operate"
                    @click="handleRemoveUnionCheckPerson(scope.$index,cardContCheckInfoForm.unionCheckPersons)"
                    type="danger" size="small">移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item prop="haveSample" label="是否有样品">
              <el-radio-group v-model="cardContCheckInfoForm.haveSample" :disabled="operateType==='query'">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-card v-if="showMaterialItems">
              <header slot="header">物资验收事项</header>
              <el-table :data="cardContCheckInfoForm.materialMatters">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="sampleCode" label="物料编码"></el-table-column>
                <el-table-column prop="sampleDesc" label="物料描述"></el-table-column>
              </el-table>
            </el-card>
            <el-card v-else>
              <header slot="header">服务验收事项<i class="errorMsg">{{cardContCheckInfoForm.serviceCheckMsg}}</i></header>
              <el-button
                size="small"
                v-if="operateType!=='query'"
                type="primary"
                @click="handleAddServiceMatter"
                icon="plus"
                class="mb10">
                添加
              </el-button>
              <el-table :data="cardContCheckInfoForm.serviceMatters">
                <el-table-column type="index" label="序号" width="80"></el-table-column>
                <el-table-column prop="serviceName" label="服务名称"></el-table-column>
                <el-table-column prop="serviceRequire" label="验收要求"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContCheckInfoForm.serviceMatters[scope.$index].type"
                      @click="handleRemoveServiceMatter(scope.$index, cardContCheckInfoForm.serviceMatters)"
                      type="danger" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合同附件及盖章信息" name="tabSealInfo">
          <span slot="label" class="title"><i v-if="cardSealInfoForm.errorMsg"
                                              class="errorCount">1</i>合同附件及盖章信息</span>
          <el-form v-if="baseInfoForm.templateId" rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px"
                   :rules="cardSealInfoForm.rules">
            <el-button
              type="primary"
              @click="handleNewOtherSealFile"
              size="small"
              icon="plus"
              v-if="enabledInupdated1"
              class="mb20">
              添加
            </el-button>
            <i class="errorMsg">{{cardSealInfoForm.errorMsg}}</i>
            <!--<el-button
              type="primary"
              @click="handleNewAgreenmentSealFile"
              size="small"
              icon="plus"
              v-if="enabledInupdated"
              class="mb20">
              新增从协议
            </el-button>-->
            <el-table v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length"
                      :data="cardSealInfoForm.contract" class="mb20">
              <el-table-column type="expand"
                               v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length&&cardSealInfoForm.contract[0].haveSale">
                <template scope="props">
                  <div
                    v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length&&cardSealInfoForm.contract[0].haveSale"
                    v-bind:class="{tdPd:cardSealInfoForm.contract&&cardSealInfoForm.contract.length&&cardSealInfoForm.contract[0].haveSale}">
                    <el-table :data="props.row.filesSealed" class="mb20"
                              v-if="props.row.filesSealed&&props.row.filesSealed.length">
                      <el-table-column label="文件名" prop="sealFileName">
                        <template scope="scope">
                          <a
                            :href="props.row.filesSealed[scope.$index].sealFileUrl">{{props.row.filesSealed[scope.$index].sealFileName}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column label="上传人" prop="sealFileCreatorName"></el-table-column>
                      <el-table-column label="上传时间" prop="sealFileCreateTime">
                        <template scope="scope">
                          {{props.row.filesSealed[scope.$index].sealFileCreateTime | formatDate}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        v-if="props.row.filesSealed[0].operate"
                      >
                        <template scope="scope">
                          <el-button @click="handleRemoveFilesSealedItem(index, props.row.filesSealed)"
                                     type="danger" size="small">移除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="用章次数" prop="saleTime">
                          <el-input-number :disabled="true" size="small"
                                           v-model="props.row.saleTime">
                          </el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="打印份数" prop="printTime" class="el-form-item is-required">
                          <el-input-number :disabled="!enabledUpdateInApprovePrint" size="small" :max="100"
                                           v-model="props.row.printTime"
                                           @change="handleChangeValidateForms"></el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="留存份数" prop="remainTime" class="el-form-item is-required">
                          <el-input-number :disabled="!enabledUpdateInApprovePrint" size="small" :max="100"
                                           v-model="props.row.remainTime"
                                           @change="handleChangeValidateForms"></el-input-number>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="用印后上传" v-if="enabledUpdateInApprove">
                          <el-upload
                            ref="uploadFileAfterSeal"
                            :data="{userId:users.userId}"
                            :show-file-list="false"
                            :action="uploadUrl"
                            :with-credentials="true"
                            :on-success="handleUploadFileAfterSealSuccess"
                            :on-error="handleUploadFileAfterSealError"
                          >
                            <el-button :disabled="!enabledUpdateInApprove||!getEnabledUploadBtn(props.row.filesSealed)"
                                       size="small"
                                       type="primary" @click="handleUpload(cardSealInfoForm.contract[0].attachType)">上传
                            </el-button>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                          <el-checkbox-group v-model="props.row.saleInfos" @change="handleChangeValidateForms">
                            <el-checkbox label="1" name="sealInfo" :disabled="!enabledInupdated">公章</el-checkbox>
                            <el-checkbox label="2" name="sealInfo" :disabled="!enabledInupdated">法人章</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="attachType" label="附件类型" width="150px">
                <template scope="scope">
                  {{getContractAgreenmentName(cardSealInfoForm.contract[scope.$index].attachType)}}
                </template>
              </el-table-column>
              <el-table-column prop="fileName" label="文件名称" width="200px">
                <template scope="scope">
                  <el-input v-if="baseInfoForm.contractTextType===1"
                            :disabled="true"
                            v-model="cardSealInfoForm.contract[scope.$index].fileName"></el-input>
                  <a v-else
                     :href="cardSealInfoForm.contract[scope.$index].fileUrl">{{cardSealInfoForm.contract[scope.$index].fileName}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="haveSale" label="是否盖章" width="70px">
                <template scope="scope">
                  <el-checkbox
                    :disabled="true"
                    v-model="cardSealInfoForm.contract[scope.$index].haveSale"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                width="200px">
                <template scope="scope">
                  <el-input
                    :disabled="true"
                    v-model="cardSealInfoForm.contract[scope.$index].remark"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <template v-if="cardSealInfoForm.others.length" v-for="(item,index) in cardSealInfoForm.others">
              <el-table :data="item" :show-header="index===0?true:false">
                <el-table-column type="expand" v-if="item[0].haveSale">
                  <template scope="props" v-if="item[0].haveSale">
                    <div v-if="item[0].haveSale" v-bind:class="{tdPd:item[0].haveSale}">
                      <el-table :data="props.row.filesSealed" class="mb20"
                                v-if="props.row.filesSealed&&props.row.filesSealed.length">
                        <el-table-column label="文件名" prop="sealFileName">
                          <template scope="scope">
                            <a
                              :href="props.row.filesSealed[scope.$index].sealFileUrl">{{props.row.filesSealed[scope.$index].sealFileName}}</a>
                          </template>
                        </el-table-column>
                        <el-table-column label="上传人" prop="sealFileCreatorName"></el-table-column>
                        <el-table-column label="上传时间" prop="sealFileCreateTime">
                          <template scope="scope">
                            {{props.row.filesSealed[scope.$index].sealFileCreateTime | formatDate}}
                          </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作"
                                         v-if="props.row.filesSealed[0].operate||enabledUpdateInApprove">
                          <template scope="scope">
                            <el-button @click="handleRemoveFilesSealedItem(index, props.row.filesSealed)"
                                       type="danger" size="small">移除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="用章次数" prop="saleTime">
                            <el-input-number size="small" :disabled="true" v-model="props.row.saleTime">
                            </el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="打印份数" prop="printTime" class="el-form-item is-required">
                            <el-input-number :disabled="!enabledUpdateInApprovePrint1" size="small" :max="10"
                                             v-model="props.row.printTime"
                                             @change="handleChangeValidateForms"></el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="留存份数" prop="remainTime" class="el-form-item is-required">
                            <el-input-number :disabled="!enabledUpdateInApprovePrint1" size="small" :max="10"
                                             v-model="props.row.remainTime"
                                             @change="handleChangeValidateForms"></el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="用印后上传" v-if="enabledUpdateInApprove">
                            <el-upload
                              ref="uploadFileAfterSeal"
                              :data="{userId:users.userId}"
                              :show-file-list="false"
                              :action="uploadUrl"
                              :with-credentials="true"
                              :on-success="handleUploadFileAfterSealSuccess"
                              :on-error="handleUploadFileAfterSealError"
                            >
                              <el-button
                                :disabled="!enabledUpdateInApprove||!getEnabledUploadBtn(props.row.filesSealed)"
                                size="small"
                                type="primary" @click="handleUpload(item[props.$index].attachType,index)">上传
                              </el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="选择用章" prop="saleInfos" class="is-required">
                            <el-checkbox-group v-model="props.row.saleInfos" @change="handleChangeValidateForms">
                              <el-checkbox label="1" name="sealInfo" :disabled="!enabledInupdated1">公章</el-checkbox>
                              <el-checkbox label="2" name="sealInfo" :disabled="!enabledInupdated1">法人章</el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="attachType" label="附件类型" width="150px">
                  <template scope="scope">
                    {{getContractAgreenmentName(item[scope.$index].attachType)}}
                  </template>
                </el-table-column>
                <el-table-column prop="fileName" label="文件名称" width="200px">
                  <template scope="scope">
                    <a :href="item[scope.$index].fileUrl">{{item[scope.$index].fileName}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="upload" label="上传" width="100px">
                  <template scope="scope">
                    <el-upload
                      :data="{userId:users.userId}"
                      :show-file-list="false"
                      :action="uploadUrl"
                      ref="uploadSealFile"
                      :with-credentials="true"
                      :on-success="handleUploadSealFileSuccess"
                      :on-error="handleUploadSealFileError"
                    >
                      <el-button :disabled="!enabledInupdated1||!getEnabledUploadBtnOuter(item[scope.$index].fileName)"
                                 size="small" type="primary" @click="handleUploadOuter(index)">上传
                      </el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column prop="haveSale" label="是否盖章" width="70px">
                  <template scope="scope">
                    <el-checkbox
                      @change="handleChangeValidateForms"
                      :disabled="!enabledInupdated1"
                      v-model="item[scope.$index].haveSale"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" :disabled="!enabledInupdated1" label="备注" width="200px">
                  <template scope="scope">
                    <el-input
                      :disabled="operateType==='query'"
                      v-model="item[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  v-if="operateType!=='query'">
                  <template scope="scope">
                    <el-button v-if="item[scope.$index].operate"
                               @click="handleRemoveOthersItem(index, cardSealInfoForm.others)"
                               type="danger" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <el-table v-if="cardSealInfoForm.agreenments.length" :data="cardSealInfoForm.agreenments" class="mt20">
              <el-table-column prop="attachType" label="附件类型" width="150px">
                <template scope="scope">
                  {{getContractAgreenmentName(cardSealInfoForm.agreenments[scope.$index].attachType)}}
                </template>
              </el-table-column>
              <el-table-column prop="fileName" label="从协议编号" width="150px">
                <template scope="scope">
                  <router-link v-if="cardSealInfoForm.agreenments[scope.$index].fileId"
                               :to="{path:'/ConCreate/querySlaveProtocol', query:{id:''+cardSealInfoForm.agreenments[scope.$index].fileId}}">
                    {{cardSealInfoForm.agreenments[scope.$index].fileName}}
                  </router-link>
                  <!--<el-form-item v-else style="margin-left: -100px;margin-bottom:0" prop="slaveProtocolNo">
                    <el-input
                      :disabled="!enabledInupdated"
                      icon="search"
                      @keyup.enter.native="handleCodeBlur(cardSealInfoForm.agreenments[scope.$index],cardSealInfoForm.agreenments[scope.$index].slaveProtocolNo)"
                      v-model="cardSealInfoForm.agreenments[scope.$index].slaveProtocolNo"
                    ></el-input>
                  </el-form-item>-->
                </template>
              </el-table-column>
              <!-- <el-table-column
                 fixed="right"
                 width="80"
                 label="操作">
                 <template scope="scope">
                   <el-button
                     v-if="cardSealInfoForm.agreenments[scope.$index].operate"
                     @click="handleRemoveAgreenmentsItem(scope.$index, cardSealInfoForm.agreenments)"
                     type="danger" size="small">移除
                   </el-button>
                 </template>
               </el-table-column>-->
            </el-table>
          </el-form>
          <h4 v-else>请选择合同基本信息的模版名称！</h4>
        </el-tab-pane>
        <el-tab-pane name="tabRemark">
          <span slot="label" class="title">备注<i v-if="cardRemarkInfoForm.errorCount"
                                                class="errorCount">{{cardRemarkInfoForm.errorCount}}</i></span>
          <el-form ref="cardRemarkInfoForm" :model="cardRemarkInfoForm" :rules="cardRemarkInfoForm.rules">
            <el-form-item prop="otherInstruction" label="其他说明">
              <el-input :disabled="!enabledInupdated" type="textarea"
                        placeholder="请输入内容" :rows="4"
                        v-model.trim="cardRemarkInfoForm.otherInstruction"
                        @change="handleChangeValidateForms"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关数据" name="tabRelatedData" v-if="procInstId">
          <el-form rel="cardRelatedInfoForm" :model="cardRelatedInfoForm" label-width="100px">
            <el-table :data="cardRelatedInfoForm.contractList" border>
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="contractNo" label="合同号"></el-table-column>
              <el-table-column prop="contractType" label="类型">
                <template scope="scope">
                  {{getContractModel(cardRelatedInfoForm.contractList[scope.$index].contractType)}}
                </template>
              </el-table-column>
              <el-table-column prop="contractStatusName" label="状态"></el-table-column>
              <el-table-column prop="startTime" label="开始时间">
                <template scope="scope">
                  {{cardRelatedInfoForm.contractList[scope.$index].startTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column prop="endTime" label="终止时间">
                <template scope="scope">
                  {{cardRelatedInfoForm.contractList[scope.$index].endTime | formatDate}}
                </template>
              </el-table-column>
              <!--<el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button @click="handleContractDetail(scope.$index, scope.row)" type="text"
                             size="small">详情
                  </el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </el-form>
          <div class="mt20">
            <el-pagination
              class="fr"
              @size-change="handleRelatedInfoSizeChange"
              @current-change="handleRelatedInfoCurrentChange"
              :current-page="cardRelatedInfoForm.pageNo"
              :page-size="cardRelatedInfoForm.pageSize"
              :page-sizes="[10, 20, 30, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="cardRelatedInfoForm.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他" name="tabOtherInfo" v-if="operateType!=='create'">
          <el-select
            v-model="cardOtherInfo.condition"
            placeholder="请选择"
            class="mb20"
          >
            <el-option
              v-for="item in cardOtherInfo.conditionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <keep-alive>
            <transition name="component-fade" mode="out-in">
              <component :contractInfo="contractInfo" :prNo="baseInfoForm.prNo" :contractNo="baseInfoForm.contractNo"
                         :is="tabs"></component>
            </transition>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="新增合同供应商信息" :visible.sync="cardContentInfoForm.dialogAddContractSupplier" size="small">
      <el-form :model="formContractSupplier" label-width="100px" ref="formContractSupplier"
               :rules="formContractSupplier.rules">
        <el-form-item label="供应商名称/编码" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="formContractSupplier.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteSuppliersByKeyWord"
            :loading="formContractSupplier.loading">
            <el-option
              v-for="item in formContractSupplier.suppliers"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span style="float: right">{{ item.company }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleNewContractSupplierCancel('formContractSupplier')">取消</el-button>
        <el-button type="primary" @click="handleNewContractSupplier('formContractSupplier')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增合同我方主体" :visible.sync="baseInfoForm.dialogNewSubjectVisible" size="small">
      <el-form :model="formNewSubject" label-width="100px" ref="formNewSubject"
               :rules="formNewSubject.rules">
        <el-form-item label="公司名称/编码" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="formNewSubject.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteSubjectsByKeyWord"
            :loading="formNewSubject.loading">
            <el-option
              v-for="item in formNewSubject.subjects"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span style="float: right">{{ item.company }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddNewSubject('formNewSubject')">取消</el-button>
        <el-button type="primary" @click="handleAddNewSubject('formNewSubject')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="第三方信息" :visible.sync="cardContentInfoForm.dialogNewThirdPartyVisible" size="small">
      <el-form :model="formNewThirdParty" label-width="100px" ref="formNewThirdParty"
               :rules="formNewThirdParty.rules">
        <el-form-item label="供应商名称／编号" prop="search" label-width="150px">
          <el-select
            style="width:300px"
            size="small"
            v-model="formNewThirdParty.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteThirdPartiesByKeyWord"
            :loading="formNewThirdParty.loading">
            <el-option
              v-for="item in formNewThirdParty.thirdParties"
              :key="item.companyCode"
              :label="item.company"
              :value="item.companyCode">
              <span style="float: right">{{ item.company }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{ item.companyCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddNewThirdParty('formNewThirdParty')">取消</el-button>
        <el-button type="primary" @click="handleAddNewThirdParty('formNewThirdParty')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增联合验收人" :visible.sync="cardContCheckInfoForm.dialogAddUnionCheckVisible"
               size="small">
      <el-form ref="formAddUnionCheck" :model="formAddUnionCheck" label-width="120px"
               :rules="formAddUnionCheck.rules">
        <el-form-item label="联合验收人" prop="name">
          <el-select
            style="width:300px"
            v-model="formAddUnionCheck.personName"
            filterable
            remote
            placeholder="请输入联合验收人"
            :remote-method="getRemoteCheckPersonsByKeyWord"
            :loading="formAddUnionCheck.loading"
            @change="handleCheckPersonsChange">
            <el-option
              v-for="item in formAddUnionCheck.checkPersons"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
              <span style="float: left">{{ item.userName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="depart" label="联合验收人部门">
          <el-input style="width:300px" :disabled="true" v-model="formAddUnionCheck.personDept"
                    placeholder="请输入联合验收人部门"></el-input>
        </el-form-item>
        <el-form-item label="是否必选" prop="ifRequired">
          <el-radio-group v-model="formAddUnionCheck.ifRequired">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddUnionCheck('formAddUnionCheck')">取消</el-button>
        <el-button type="primary" @click="handleAddUnionCheckItem('formAddUnionCheck')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增服务验收事项" :visible.sync="cardContCheckInfoForm.dialogAddServiceVisible"
               size="small">
      <el-form ref="formAddServiceCheck" :model="formAddServiceCheck" :rules="formAddServiceCheck.rules"
               label-width="100px">
        <el-form-item prop="name" label="服务名称">
          <el-input v-model="formAddServiceCheck.name" placeholder="请输入服务名称"></el-input>
        </el-form-item>
        <el-form-item prop="requirement" label="验收要求">
          <el-input v-model="formAddServiceCheck.requirement" placeholder="请输入验收要求"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formAddServiceCheck.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddServiceCheck('formAddServiceCheck')">取消</el-button>
        <el-button type="primary" @click="handleAddServiceCheckItem('formAddServiceCheck')">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="新增合同标的" :visible.sync="cardContentInfoForm.dialogAddConStandard"
               size="small">
      <el-form ref="formAddConStandard" :model="formAddConStandard"
               :rules="formAddConStandard.rules"
               label-width="130px">
        <el-form-item label="类型">
          <el-radio-group v-model="formAddConStandard.conStandardType"
                          :disabled="true">
            <el-radio :label="1">一般物资类</el-radio>
            <el-radio :label="2">服务类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formAddConStandard.conStandardType===1" label="物料名称/编码" prop="search">
          <el-select
            class="wp100"
            v-model="formAddConStandard.search"
            filterable
            remote
            placeholder="请输入关键词搜索"
            :remote-method="getRemoteMaterialsByKeyWord"
            :loading="formAddConStandard.loading"
            @change="handleMaterialChange">
            <el-option
              v-for="item in formAddConStandard.materials"
              :key="item.materialCode"
              :label="item.materialName"
              :value="item.materialCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="物料名称" prop="materialName">
          <el-input v-model="formAddConStandard.materialName" placeholder="请输入物料名称"></el-input>
        </el-form-item>
        <el-form-item prop="materialCode" label="物料编码" v-if="formAddConStandard.conStandardType===1">
          <el-input v-model="formAddConStandard.materialCode" :disabled="formAddConStandard.conStandardType===1"
                    placeholder="请输入物料编码"></el-input>
        </el-form-item>
        <el-form-item prop="price" label="价格">
          <el-input v-model="formAddConStandard.price" placeholder="请输入物料价格"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxCode">
          <el-select
            class="wp100"
            v-model="formAddConStandard.taxCode">
            <el-option
              v-for="item in formAddConStandard.taxRates"
              :key="item.code"
              :label="item.value"
              :value="item.code">
              <span style="float: left">{{ item.value}}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.desc }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button @click="handleCancelAddConStandard('formAddConStandard')">取消</el-button>
        <el-button type="primary" @click="handleAddConStandardItem('formAddConStandard')">确定</el-button>
      </footer>
    </el-dialog>
    <Process :extraFn="callback"></Process>
    <el-row class="mt20">
      <!--<el-col :span="4" :offset="4">
        <el-button v-if="operateType!=='query'" :disabled="!btnSaveStatus" type="primary" @click="handleSave('')">保存
        </el-button>
      </el-col>-->
      <!--<el-col :span="6">
        <el-button type="primary" @click="handlePreview" style="margin-left:33px"
                   v-if="operateType!=='query'&&baseInfoForm.contractTextType===1">预览
        </el-button>
      </el-col>-->
      <el-col :span="24" style="text-align:center">
        <el-button v-if="operateType!=='query'" :disabled="!btnSubmitStatus" type="primary" @click="handleSubmit">提交
        </el-button>
      </el-col>
    </el-row>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import store from 'store';
  import _ from 'lodash';
  import Api from '../../api/manageContract';
  import Preview from './components/preview.vue';
  import comLoading from '../../mixins/comLoading';
  import {downloadUrl, uploadUrl} from '../../api/consts';
  import Process from '../../components/process.vue';
  import {formatDate, formatTimeStamp} from '../../filters/moment';
  import {routerNames} from '../../core/consts';

  const user = store.get('user');

  export default {
    mixins: [comLoading],
    data() {
      const validateStartDateRules = (rule, value, callback) => {
        const endTime = this.cardContentInfoForm.endTime;
        if (this.operateType === 'create' || (this.operateType === 'update' && this.updateForm.updateMode === 2)) {
          if (formatDate(new Date(value)) > formatDate(new Date())) {
            callback(new Error('合同生效日期必须小于等于今天'));
          }
        }
        if (endTime) {
          if (formatDate(new Date(value)) > formatDate(new Date(endTime))) {
            callback(new Error('合同终止日期必须大于合同生效日期'));
          }
        }
        callback();
      };
      const validateEndDate = (rule, value, callback) => {
        const startTime = this.cardContentInfoForm.startTime;
        if (this.operateType === 'create' || (this.operateType === 'update' && this.updateForm.updateMode === 2)) {
          /*if (formatDate(new Date(value)) < formatDate(new Date())) {
            callback(new Error('合同终止日期必须大于等于今天'));
          }*/
        }
        if (startTime) {
          if (formatDate(new Date(value)) < formatDate(new Date(startTime))) {
            callback(new Error('合同终止日期必须大于合同生效日期'));
          }
        }
        callback();
      };

      return {
        procInstId: '', //流程id
        procTitle: '', //流程名称
        updated: false, // 在变更合同提交后是否显示变更原因
        previewData: {}, // 预览数据
        visible: false, // 预览
        users: user,
        downloadUrl,
        uploadUrl,
        operateType: '', // create:创建，update:变更，query:查询
        updateForm: {
          visible: false, // 在变更合同中控制合同页面数据的显示与否
          code: '',
          updateMode: 1,
          updateModes: [
            {
              id: 1,
              name: '原合同有效'
            } /*,
            {
              id: 2,
              name: '原合同作废'
            }*/
          ],
          newCode: '',
          remark: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
            remark: [{required: true, message: '请输入合同编号', trigger: 'blur'}]
          }
        },
        contractInfo: [], //合同信息
        baseInfoForm: {
          id: '', // 在更新合同是把合同id传入
          contractName: '', //合同名称
          guid: '', // 草稿箱编号
          // businessOperator: '',
          businessOperatorId: '', // 业务申请人id
          businessOperatorName: '', //业务申请人
          businessDeptId: '',
          businessDeptName: '',
          contractType: '', // 合同模式id
          contractTypeName: '', // 合同模式名称
          businessOperators: [], // 业务操作人数组
          loading: false, // 业务操作人
          contractBusinessTypeName: '', // 业务类型名
          contractTextType: null,
          contractTextTypeOptions: [
            {
              id: 1,
              name: '合同模板'
            },
            {
              id: 2,
              name: '合同文本'
            }
          ],
          sealOrder: 1, // 0：我方先盖章 1：对方先盖章
          ourSealOpinion: '',
          templateId: '', // 当前模版id
          templateOptions: [],
          belongProject: '',
          prFlag: 0, // 是否有比加单号 1：有 0：无
          prNo: '', // pr号
          contractNo: '', // 合同编号
          dialogNewSubjectVisible: false,
          rules: {
            businessOperatorId: [{required: true, message: '请输入业务业务申请人', trigger: 'blur'}],
            templateId: [{required: true, message: '请选择模版名称'}]
          }
        },
        activeTabName: 'tabContInfo',
        cardContentInfoForm: {
          effectiveCondition: 1, //生效条件
          startTime: '',
          endTime: '',
          conditionDesc: '', //期限生效
          tableSupplierInfo: [],
          conSubjctName: [],
          thirdPartyInfo: [],
          conStandard: [],
          errorCount: 0,
          supplierErrorMsg: '',
          subjectsErrorMsg: '',
          fixedTermFlag: null, // 是否固定期限（仅在变更合同时显示）
          dialogAddContractSupplier: false,
          dialogNewThirdPartyVisible: false,
          dialogAddConStandard: false,
          rules: {
            startTime: [{
              validator: validateStartDateRules,
              trigger: 'change'
            }, {
              required: true,
              message: '请输入合同生效日期'
            }],
            endTime: [{
              validator: validateEndDate,
              trigger: 'change'
            }, {
              required: true,
              message: '请输入合同截止日期'
            }],
            effectiveCondition: [{required: true, message: '请选择生效条件'}],
            conditionDesc: [{required: true, message: '请输入附期限生效信息'}]
          }
        },
        cardFinanceInfoForm: {
          moneyInvolved: true,
          oneOffPay: true,
          currency: 1, // 币种1：人民币；2：美元
          currencyOptions: [
            {
              value: 1,
              label: 'CNY 人民币'
            },
            {
              value: 2,
              label: 'USD 美元'
            },
            {
              value: 3,
              label: 'HKD 港币'
            }
          ],
          invoiceType: null, // 开票类型
          invoiceTypeOptions: [
            {
              value: 1,
              label: '增值税专用发票'
            },
            {
              value: 2,
              label: '增值税普通发票'
            }
          ],
          totalAmount: 0,
          depositFlag: true, // 是否收取保证金
          jiaBillingInfo: {
            companyName: '红星美凯龙家居集团股份有限公司',
            creditCode: '913100006624816751',
            registerAddress: '上海市浦东新区临御路518号6楼F801室',
            managementAddress: '上海市普陀区怒江北路598号10楼',
            contactNumber: '021-22300563',
            bankAccount: '0210 0141 7000 7578',
            openBank: '中国民生银行上海市南支行'
          },
          yiBillingInfo: {
            companyName: '上海史泰博股份有限公司',
            contact: 'echo',
            bankAccount: '0210 0141 7000 7578',
            openBank: '中国民生银行上海市南支行',
            address: '上海市浦东新区临御路518号6楼F801室',
            contactNumber: '021-22300563',
            email: '134656343@qq.com'
          },
          paymentErrorMSG: '',
          errorCount: 0,
          paymentMethods: {
            advance: [{
              type: '预付款',
              seriousPayments: true, // 是否多次付款
              paymentAmount: 0, // 付款金额
              paymentTimePeriod: null, // 付款方式
              paymentTime: '', // 付款时间
              times: [
                {
                  value: 1,
                  label: '合同签约15天'
                },
                {
                  value: 2,
                  label: '合同签约30天'
                },
                {
                  value: 3,
                  label: '合同签约90天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: [
                {
                  paymentAmount: 0,
                  paymentTimePeriod: null,
                  paymentTime: '',
                  times: [
                    {
                      value: 1,
                      label: '合同签约15天'
                    },
                    {
                      value: 2,
                      label: '合同签约30天'
                    },
                    {
                      value: 3,
                      label: '合同签约90天'
                    }
                  ],
                  remark: '',
                  ratio: ''
                }
              ]
            }],
            progress: [{
              type: '进度款',
              seriousPayments: false,
              paymentAmount: 0,
              paymentTimePeriod: null,
              paymentTime: '',
              times: [
                {
                  value: 1,
                  label: '验收后15天'
                },
                {
                  value: 2,
                  label: '验收后30天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: []
            }],
            _final: [{
              type: '尾款',
              seriousPayments: true,
              paymentAmount: 0,
              paymentTimePeriod: null,
              paymentTime: '',
              times: [
                {
                  value: 1,
                  label: '合同结束后15天'
                },
                {
                  value: 2,
                  label: '合同结束后30天'
                },
                {
                  value: 3,
                  label: '合同结束后90天'
                },
                {
                  value: 4,
                  label: '合同结束后180天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: []
            }]
          },
          paymentTimePeriod: null,
          paymentTimePeriods: [
            {
              id: 'Z015',
              name: '到票日后15天付款'
            },
            {
              id: 'Z020',
              name: '到票日后20天付款'
            },
            {
              id: 'Z025',
              name: '到票日后25天付款'
            },
            {
              id: 'Z030',
              name: '到票日后30天付款'
            },
            {
              id: 'Z035',
              name: '到票日后35天付款'
            },
            {
              id: 'Z040',
              name: '到票日后40天付款'
            },
            {
              id: 'Z045',
              name: '到票日后45天付款'
            },
            {
              id: 'Z000',
              name: '立即付款'
            }
          ],
          rules: {
            deposit: [{required: true, message: '请输入保证金金额', trigger: 'blur'}, {
              type: 'number',
              message: '保证金必须为数字值',
              trigger: 'blur'
            }],
            totalAmount: [{type: 'number', message: '合同总金额必须为数字值'}],
            payTime: [{required: true, message: '请输入付款时间'}],
            invoiceType: [{required: true, message: '请选择开票类型'}]
          }
        },
        cardContCheckInfoForm: {
          loading: false,
          responsibles: [],
          responsibleId: '',
          responsibleName: '',
          responsibleDeptId: '',
          responsibleDeptName: '',
          checkType: null,
          checkServiceMethods: [
            {
              id: 1,
              name: '收货验收'
            },
            {
              id: 2,
              name: '按阶段验收'
            }
          ],
          supervisor: '',
          supervisorDept: '',
          haveSample: true,
          unionCheckPersons: [],
          materialMatters: [],

          serviceMatters: [],
          serviceCheckMsg: '',
          errorCount: 0,
          dialogAddUnionCheckVisible: false,
          dialogAddServiceVisible: false
        },
        cardSealInfoForm: {
          sealAttachments: [],
          contract: [],
          others: [],
          agreenments: [],
          current: null, // 为上传功能保存当前所在附件列表的索引
          type: null, // 为上传功能保存当前附件类型
          errorMsg: '',
          rules: {
            slaveProtocolNo: [{
              required: true,
              message: '请输入从协议编号'
            }]
          }
        },
        cardRemarkInfoForm: {
          otherInstruction: '',
          errorCount: 0,
          rules: {
            otherInstruction: [{
              validator: (rule, value, callback) => {
                if (this.cardContentInfoForm.effectiveCondition === 1 && this.cardContentInfoForm.startTime) {
                  if (!value) {
                    callback(new Error('合同生效日期小于今天，请输入倒签原因'));
                  }
                }
                callback();
              }
            }]
          }
        },
        cardRelatedInfoForm: {
          contractList: [],
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        cardOtherInfo: {
          condition: 3,
          conditionOptions: [
            /*{
              value: 1,
              label: '采购申请'
            },
            {
              value: 2,
              label: '比价单信息'
            },*/
            {
              value: 3,
              label: '合同信息'
            },
            {
              value: 4,
              label: '订单信息'
            }
          ]
        },
        paymentMethods: {}, // 支付方式备份
        oldSealAttachments: '', //在审批阶段保存接口返回的附件信息
        formNewSubject: {
          rules: {
            search: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]
          },
          search: '',
          subjects: [],
          loading: false
        },
        formAddUnionCheck: {
          id: '',
          personId: '',
          personName: '',
          personDeptId: '',
          personDept: '',
          ifRequired: true,
          loading: false,
          checkPersons: [],
          rules: {
            name: [
              {required: true, message: '请输入验收人', trigger: 'blur'}
            ]
          }
        },
        formAddServiceCheck: {
          name: '',
          requirement: '',
          remark: '',
          rules: {
            name: [{required: true, message: '请输入服务名称', trigger: 'blur'}],
            requirement: [{required: true, message: '请输入验收要求', trigger: 'blur'}]
          }
        },
        formContractSupplier: {
          rules: {
            search: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]
          },
          search: '',
          suppliers: [],
          loading: false
        },
        formNewThirdParty: {
          rules: {
            search: [
              {required: true, message: '请输入搜索关键字', trigger: 'blur'}
            ]
          },
          search: '',
          thirdParties: [],
          loading: false
        },
        formAddConStandard: {
          search: '',
          conStandardType: null,
          name: '',
          loading: false,
          materials: [],
          id: '',
          code: '',
          price: null,
          taxRate: null,
          taxCode: null,
          taxRates: [
            {
              code: 'J0',
              value: '0',
              desc: '0%进税项'
            },
            {
              code: 'J1',
              value: '3',
              desc: '3%进税项'
            },
            {
              code: 'J2',
              value: '6',
              desc: '6%进税项'
            },
            {
              code: 'J3',
              value: '11',
              desc: '11%进税项'
            },
            {
              code: 'J4',
              value: '17',
              desc: '17%进税项'
            },
            {
              code: 'J5',
              value: '13',
              desc: '13%进税项'
            },
            {
              code: 'J6',
              value: '5',
              desc: '5%进税项'
            }
          ],
          rules: {
            price: [
              {required: true, message: '请输入物料价格', trigger: 'blur'}
            ],
            taxCode: [
              {required: true, message: '请选择税率', trigger: 'blur'}
            ]
          }
        },
        isSubmit: false,
        btnSubmitStatus: true, // 提交按钮状态
        btnSaveStatus: true // 保存按钮状态
      };
    },
    computed: {
      ifRequest() { //在创建合同或变更合同的变更方式为原合同作废时，不请求除初始化以外的接口
        let request = false;
        if (this.operateType === 'create' || this.updateForm.updateMode === 2) {
          request = true;
        }
        return request;
      },
      conVersion() {
        const id = this.baseInfoForm.templateId;
        const templateOptions = this.baseInfoForm.templateOptions;
        let result = '';
        if (templateOptions && templateOptions.length > 0) {
          for (let i = 0, len = templateOptions.length; i < len; i += 1) {
            if (id === templateOptions[i].id) {
              result = `V-${templateOptions[i].version}`;
            }
          }
        }
        return result;
      },
      totalConMoney() {
        if (this.cardFinanceInfoForm.oneOffPay) {
          return this.cardFinanceInfoForm.totalAmount;
        }
        const paymentMethods = this.cardFinanceInfoForm.paymentMethods;
        const earnest = parseFloat(paymentMethods.earnest[0].paymentAmount ? paymentMethods.earnest[0].paymentAmount : 0);
        const advance = parseFloat(paymentMethods.advance[0].paymentAmount ? paymentMethods.advance[0].paymentAmount : 0);
        const progress = parseFloat(paymentMethods.progress[0].paymentAmount ? paymentMethods.progress[0].paymentAmount : 0);
        const final = parseFloat(paymentMethods._final[0].paymentAmount ? paymentMethods._final[0].paymentAmount : 0);
        const deposit = parseFloat(paymentMethods.deposit[0].paymentAmount ? paymentMethods.deposit[0].paymentAmount : 0);
        return earnest + advance + progress + final + deposit;
      },
      totalAmount() { //合同总金额即物料总价
        let sum = 0;
        if (this.baseInfoForm.contractType !== 3 && this.baseInfoForm.contractType !== 4) {
          const conStandards = this.cardContentInfoForm.conStandard;
          if (conStandards && conStandards.length) {
            for (let i = 0, len = conStandards.length; i < len; i += 1) {
              sum += parseFloat(conStandards[i].total) * parseFloat(conStandards[i].price);
            }
          }
          this.cardFinanceInfoForm.totalAmount = sum;
        }
        return sum;
      },
      showMaterialItems() {
        let result = false;
        const arrConStandard = this.cardContentInfoForm.conStandard;
        if (arrConStandard && arrConStandard.length > 0) {
          for (let i = 0, len = arrConStandard.length; i < len; i += 1) {
            if (arrConStandard[i].materialCode) {
              result = true;
            }
          }
        }
        return result;
      },
      contentVisible() {
        let visible = false;
        if (this.operateType !== 'update') {
          visible = true;
        } else if (this.updateForm.visible) {
          visible = true;
        }
        return visible;
      },
      // 查询及创建操作时不可用，变更操作选择原合同作废时可用，选择原合同有效时不可用，否则都是可用的状态
      isEnabled() {
        let enabled = false;
        if (this.operateType === 'update') {
          enabled = this.updateForm.updateMode === 1;
        } else if (this.operateType === 'query' || this.operateType === 'create') {
          enabled = true;
        }
        return enabled;
      },
      // 查询操作不可用，创建操作可用，变更操作选择原合同作废时可用，选择原合同有效时不可用，否则都是可用的状态
      isEnabled1() {
        let enabled = false;
        if (this.operateType === 'update') {
          enabled = this.updateForm.updateMode === 1;
        } else if (this.operateType === 'query') {
          enabled = true;
        } else if (this.operateType === 'create') {
          enabled = false;
        }
        return enabled;
      },
      isVisibleNewSupplierBtn() {
        let visible = false;
        if (this.operateType === 'query') {
          visible = false;
        } else if (this.cardContentInfoForm.tableSupplierInfo.length <= 0) {
          visible = true;
        }
        return visible;
      },
      tabs() {
        let type;
        switch (this.cardOtherInfo.condition) {
          case 1:
            type = 'PrTable';
            break;
          case 2:
            type = 'PriceTable';
            break;
          case 3:
            type = 'ContractTable';
            break;
          case 4:
            type = 'OrderTable';
            break;
          default:
            type = '';
        }
        return type;
      },
      jia() {
        const jiaBillingInfo = this.cardFinanceInfoForm.jiaBillingInfo;
        let result = {};
        if (jiaBillingInfo.length === 1) {
          result = jiaBillingInfo[0] || {};
        }
        return result;
      },
      yi() {
        const yiBillingInfo = this.cardFinanceInfoForm.yiBillingInfo;
        let result = {};
        if (yiBillingInfo.length === 1) {
          result = yiBillingInfo[0] || {};
        }
        return result;
      },
      depositRatio() {
        const val = this.getProportion(this.cardFinanceInfoForm.deposit);
        this.cardFinanceInfoForm.depositRatio = val.replace(/%$/g, '');
        return val;
      },
      enabledInupdated() { // 在各种操作类型下，控制元素的是否可见和是否可用
        let result = false;
        if (this.operateType === 'query') {
          result = false;
        } else if (this.operateType === 'create') {
          result = true;
        } else if (this.operateType === 'update') {
          result = this.updateForm.updateMode !== 1;
        }
        return result;
      },
      enabledInupdated1() { // 在各种操作类型下，控制元素的是否可见和是否可用
        let result = false;
        if (this.operateType === 'query') {
          result = false;
        } else if (this.operateType === 'create') {
          result = true;
        } else if (this.operateType === 'update') {
          // result = this.updateForm.updateMode === 1;
          result = true;
        }
        return result;
      },
      enaledMoneyInvolved() {
        let enabled = true;
        const contractType = this.baseInfoForm.contractType;
        if (contractType === 2 || contractType === 4) {
          enabled = false;
        }
        return enabled;
      },
      earnestPaymentAmount() {
        const items = this.cardFinanceInfoForm.paymentMethods.earnest[0].subItem;
        let sum = 0;
        if (items && items.length) {
          for (let i = 0, len = items.length; i < len; i++) {
            sum += parseFloat(items[i].paymentAmount);
          }
        }
        this.cardFinanceInfoForm.paymentMethods.earnest[0].paymentAmount = sum;
        return sum;
      },
      advancePaymentAmount() {
        const items = this.cardFinanceInfoForm.paymentMethods.advance[0].subItem;
        let sum = 0;
        if (items && items.length) {
          for (let i = 0, len = items.length; i < len; i++) {
            sum += parseFloat(items[i].paymentAmount);
          }
        }
        this.cardFinanceInfoForm.paymentMethods.advance[0].paymentAmount = sum;
        return sum;
      },
      progressPaymentAmount() {
        const items = this.cardFinanceInfoForm.paymentMethods.progress[0].subItem;
        let sum = 0;
        if (items && items.length) {
          for (let i = 0, len = items.length; i < len; i++) {
            sum += parseFloat(items[i].paymentAmount);
          }
        }
        this.cardFinanceInfoForm.paymentMethods.progress[0].paymentAmount = sum;
        return sum;
      },
      finalPaymentAmount() {
        const items = this.cardFinanceInfoForm.paymentMethods._final[0].subItem;
        let sum = 0;
        if (items && items.length) {
          for (let i = 0, len = items.length; i < len; i++) {
            sum += parseFloat(items[i].paymentAmount);
          }
        }
        this.cardFinanceInfoForm.paymentMethods._final[0].paymentAmount = sum;
        return sum;
      },
      depositPaymentAmount() {
        const items = this.cardFinanceInfoForm.paymentMethods.deposit[0].subItem;
        let sum = 0;
        if (items && items.length) {
          for (let i = 0, len = items.length; i < len; i++) {
            sum += parseFloat(items[i].paymentAmount);
          }
        }
        this.cardFinanceInfoForm.paymentMethods.deposit[0].paymentAmount = sum;
        return sum;
      },
      enabledFianceBtn() {
        let enabled = true;
        if (parseInt(this.baseInfoForm.contractType, 10) === 3 && !this.baseInfoForm.prFlag) {
          enabled = false;
        }
        return enabled;
      },
      ifRole() {
        const reg = /印章保管人/g;
        return reg.test(this.users.roleName);
      },
      enabledUpdateInApprove() { //在审批阶段修改附件时，上传盖章合同控件的上传按钮状态（仅用章保管人可用）
        let enabled = false;
        if (this.operateType === 'query') {
          enabled = !!this.ifRole();
        }
        return enabled;
      },
      enabledUpdateInApprovePrint() { //创建和变更阶段可用，审批阶段且角色是用章保管人可用
        let enabled = true;
        if (this.operateType === 'query') {
          enabled = !!this.ifRole();
        } else if (this.operateType === 'update') {
          enabled = this.updateForm.updateMode !== 1;
        }
        return enabled;
      },
      enabledUpdateInApprovePrint1() { //创建和变更阶段可用，审批阶段且角色是用章保管人可用
        let enabled = true;
        if (this.operateType === 'query') {
          enabled = !!this.ifRole();
        } else if (this.operateType === 'update') {
          // enabled = this.updateForm.updateMode === 1;
          enabled = true;
        }
        return enabled;
      },
      enabledContractSum() {
        let enabled = false;
        if (this.operateType !== 'query') {
          enabled = this.baseInfoForm.contractType === 3;
        }
        return enabled;
      }
    },
    filters: {
      formatDate
    },
    mounted() {
      const query = this.$route.query;
      if (query.processData) {
        this.procInstId = JSON.parse(query.processData).procInstId;
        this.procTitle = JSON.parse(query.processData).procTitle;
        this.users.roleName = JSON.parse(query.processData).roleName;
      }
      if (JSON.stringify(query) !== '{}') {
        if (query.operateType) {
          this.operateType = query.operateType;
          if (query.operateType === 'create') {
            const params = {};
            const types = query.curConTypeId.split('-');
            params.folio = query.currentFolio;
            params.contractType = query.curConModelId;// 合同模式
            params.contractBusinessTypeFirst = types[0];
            params.contractBusinessTypeSecond = types[1];
            params.contractBusinessTypeThird = types[2];
            Api.getContractBaseInfo(params).then((data) => {
              const dataMap = data.data.dataMap;
              if (dataMap) {
                this.initData(dataMap, params);
              }
            });
          }
        }
      }
      if (this.$route.path && this.$route.path === '/ConCreate/conCheck') {
        this.operateType = 'query';
        const queryParams = {};
        if (query.processData) { //流程进去使用id查询
          queryParams.contractId = query.contractId;
          queryParams.operate = 'PROCESS';
          Api.getContractDetailByContractId(queryParams).then((data) => {
            const dataMap = data.data.dataMap;
            if (dataMap) {
              this.initData(dataMap);
            }
          });
        } else { //使用No查询
          Api.getUpdateInfo(query.contractNo).then((data) => {
            const dataMap = data.data.dataMap;
            if (dataMap) {
              this.initData(dataMap);
            }
          });
        }
      }
      if (this.$route.path && this.$route.path === '/conperf/conupdate') {
        this.operateType = 'update';
      }
    },
    methods: {
      initData(data, params) {
        Object.assign(this.baseInfoForm, data.baseInfoForm);
        Object.assign(this.cardContentInfoForm, data.cardContentInfoForm);
        Object.assign(this.cardFinanceInfoForm, data.cardFinanceInfoForm);
        Object.assign(this.cardContCheckInfoForm, data.cardContCheckInfoForm);
        Object.assign(this.cardSealInfoForm, data.cardSealInfoForm);
        Object.assign(this.cardRemarkInfoForm, data.cardRemarkInfoForm);
        Object.assign(this.cardOtherInfo, data.cardOtherInfo);
        const baseInfo = data.baseInfoForm;
        this.baseInfoForm.contractBusinessTypeName = `${baseInfo.contractBusinessTypeFirstName}-${baseInfo.contractBusinessTypeSecondName}-${baseInfo.contractBusinessTypeThirdName}`;
        const param = {};
        param.bizTypeId = this.baseInfoForm.contractBusinessTypeThird;// 业务类型
        param.templateType = (this.baseInfoForm.contractTextType === 1 ? 'TEMPLATE' : 'TEXT');

        const paymentMethods = this.cardFinanceInfoForm.paymentMethods;
        paymentMethods.earnest.length ? paymentMethods.earnest[0].type = '定金' : null;
        paymentMethods.advance.length ? paymentMethods.advance[0].type = '预付款' : null;
        paymentMethods.progress.length ? paymentMethods.progress[0].type = '进度款' : null;
        paymentMethods._final.length ? paymentMethods._final[0].type = '尾款' : null;
        paymentMethods.deposit.length ? paymentMethods.deposit[0].type = '保证金' : null;
        if (this.operateType !== 'create') {
          this.contractInfo = [this.baseInfoForm];
          this.baseInfoForm.contractTypeName = this.getContractModelName(parseInt(data.baseInfoForm.contractType, 10));// 初始化合同模式
          const sealAttachments = this.cardSealInfoForm.sealAttachments;
          this.oldSealAttachments = JSON.stringify(this.cardSealInfoForm.sealAttachments);
          let contract = [];
          const agreenments = [];
          const others = [];
          if (sealAttachments.length) {
            for (let i = 0, len = sealAttachments.length; i < len; i++) { // 初始化附件类型的数
              const item = sealAttachments[i];
              if (parseInt(item[0].attachType, 10) === 3) {
                contract = item;
              }
              if (parseInt(item[0].attachType, 10) === 1) {
                others.push(item);
              }
              if (parseInt(item[0].attachType, 10) === 2) {
                agreenments.push(item[0]);
              }
            }
            this.cardSealInfoForm.contract = contract;
            this.cardSealInfoForm.agreenments = agreenments;
            this.cardSealInfoForm.others = others;
          }
          //初始化相关数据信息
          this.initRelatedInfo();
          //初始化其他数据
          if (this.baseInfoForm.prNo) {
            this.cardOtherInfo.conditionOptions = [
              {
                value: 2,
                label: '比价单信息'
              },
              {
                value: 3,
                label: '合同信息'
              },
              {
                value: 4,
                label: '订单信息'
              }];
          }
        } else {
          this.baseInfoForm.contractTypeName = this.getContractModelName(parseInt(params.contractType, 10));// 初始化合同模式
          if (this.baseInfoForm.contractBusinessTypeFirst !== 2) { // 初始化当前可添加的合同标的的类型
            this.formAddConStandard.conStandardType = 1;
          } else {
            this.formAddConStandard.conStandardType = 2;
          }
          this.baseInfoForm.prNo = params.folio;// 比加单号
          this.baseInfoForm.contractType = parseInt(params.contractType, 10);
          if (params.folio) {
            this.baseInfoForm.prFlag = 1;
          }
        }
      },
      getEnabledUploadBtn(items) {
        return !(items && items.length >= 1);
      },
      setRatio(item, val) {
        const result = this.getProportion(val);
        item.ratio = result ? result.replace(/%$/g, '') : null;
        return result;
      },
      getContractModelName(id) {
        switch (id) {
          case 1:
            return '单一合同';
          case 2:
            return '固定格式合同';
          case 3:
            return '框架合同';
          case 4:
            return '意向合同';
          default:
            return '';
        }
      },
      handlePreview() {
        if (this.operateType === 'query') {
          this.getPreviewData();
        } else {
          this.isSubmit = true;
          this.validateForms().then(() => {
            this.getPreviewData();
          }).catch(() => {
            this.$message.error('请填写完合同信息再预览！');
          });
        }
      },
      getPreviewData() {
        this.formatTime(this.cardContentInfoForm, this.cardFinanceInfoForm);
        const previewData = {};
        previewData.conStandard = this.cardContentInfoForm.conStandard || [];
        previewData.contractType = this.baseInfoForm.contractType;
        previewData.contractBusinessTypeFirst = this.baseInfoForm.contractBusinessTypeFirst;
        previewData.contractBusinessTypeThirdName = this.baseInfoForm.contractBusinessTypeThirdName;
        previewData.contractNo = this.baseInfoForm.contractNo;
        previewData.effectiveCondition = this.cardContentInfoForm.effectiveCondition;
        previewData.startTime = this.cardContentInfoForm.startTime;
        previewData.endTime = this.cardContentInfoForm.endTime;
        previewData.conditionDesc = this.cardContentInfoForm.conditionDesc;
        previewData.cardFinanceInfoForm = this.cardFinanceInfoForm;
        previewData.templateId = this.baseInfoForm.templateId;
        previewData.corporeRemark = this.cardContentInfoForm.corporeRemark;
        previewData.paymentRemark = this.cardFinanceInfoForm.paymentRemark;
        this.previewData = previewData;
        this.visible = true;
      },
      handleNewSubjectName() {
        this.baseInfoForm.dialogNewSubjectVisible = true;
      },
      handleAddUnionCheck() {
        this.cardContCheckInfoForm.dialogAddUnionCheckVisible = true;
      },
      handleAddServiceMatter() {
        this.cardContCheckInfoForm.dialogAddServiceVisible = true;
      },
      handleAddUnionCheckItem(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const index = _.findIndex(this.cardContCheckInfoForm.unionCheckPersons, (chr) => chr.id === curForm.model.id);
            if (index > -1) {
              this.$message.error('这条数据已存在咯！');
              return;
            }

            this.cardContCheckInfoForm.unionCheckPersons.push({
              id: this.formAddUnionCheck.id,
              personId: this.formAddUnionCheck.personId,
              personName: this.formAddUnionCheck.personName,
              personDeptId: this.formAddUnionCheck.personDeptId,
              personDept: this.formAddUnionCheck.personDept,
              required: this.formAddUnionCheck.ifRequired,
              operate: 'add'
            });
            curForm.resetFields();
            this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false;
          } else {
            console.log('error submit!!');
          }
        });
      },

      handleCancelAddUnionCheck(formName) {
        this.$refs[formName].resetFields();
        this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false;
      },
      handleAddServiceCheckItem(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const index = _.findIndex(this.cardContCheckInfoForm.serviceMatters, (chr) => chr.name === curForm.model.name);
            if (index > -1) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            this.cardContCheckInfoForm.serviceMatters.push({
              serviceRequire: curForm.model.requirement,
              serviceName: curForm.model.name,
              remark: curForm.model.remark,
              type: 'add'
            });
            curForm.resetFields();
            this.cardContCheckInfoForm.dialogAddServiceVisible = false;
            if (this.isSubmit) {
              this.validateForms().catch(() => {
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleCancelAddServiceCheck(formName) {
        this.$refs[formName].resetFields();
        this.cardContCheckInfoForm.dialogAddServiceVisible = false;
      },
      handleContractDetail(index, row) {
        this.$router.push({name: routerNames.con_Check, query: {contractNo: row.contractNo}});
      },
      handleAddNewSubject(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.formNewSubject.subjects;
            const key = this.formNewSubject.search;
            const index = _.findIndex(this.cardContentInfoForm.conSubjctName, (chr) => chr.code === key);
            if (index > -1) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            if (subjects.length) {
              for (let i = 0, len = subjects.length; i < len; i++) {
                if (key === subjects[i].companyCode) {
                  this.cardFinanceInfoForm.jiaBillingInfo.push(subjects[i]);
                  this.cardContentInfoForm.conSubjctName.push({
                    code: subjects[i].companyCode,
                    name: subjects[i].company,
                    type: 'add'
                  });
                }
              }
            }

            curForm.resetFields();
            this.baseInfoForm.dialogNewSubjectVisible = false;
            if (this.isSubmit) {
              this.validateForms().catch(() => {
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleCancelAddNewSubject(formName) {
        this.$refs[formName].resetFields();
        this.baseInfoForm.dialogNewSubjectVisible = false;
      },
      handleAddContractSupplier() {
        this.cardContentInfoForm.dialogAddContractSupplier = true;
      },
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.formContractSupplier.loading = true;
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formContractSupplier.loading = false;
              this.formContractSupplier.suppliers = data.data.dataMap;
            });
        } else {
          this.formContractSupplier.suppliers = [];
        }
      },
      handleNewContractSupplier(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const suppliers = this.formContractSupplier.suppliers;
            const key = this.formContractSupplier.search;
            if (suppliers.length) {
              for (let i = 0, len = suppliers.length; i < len; i++) {
                if (key === suppliers[i].companyCode) {
                  this.cardFinanceInfoForm.yiBillingInfo = [suppliers[i]];
                  this.cardContentInfoForm.tableSupplierInfo = [{
                    code: suppliers[i].companyCode,
                    name: suppliers[i].company,
                    type: 'add'
                  }];
                }
              }
            }

            curForm.resetFields();
            this.cardContentInfoForm.dialogAddContractSupplier = false;
            if (this.isSubmit) {
              this.validateForms().catch(() => {
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogAddContractSupplier = false;
      },
      handleRemoveSupplier(index, rows) {
        rows.splice(index, 1);
      },
      getRemoteSubjectsByKeyWord(query) {
        if (query !== '') {
          this.formNewSubject.loading = true;
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.formNewSubject.loading = false;
              this.formNewSubject.subjects = data.data.dataMap || [];
            });
        } else {
          this.formNewSubject.subjects = [];
        }
      },
      handleRemoveSubect(index, rows) {
        rows.splice(index, 1);
      },
      handleNewthirdPartyInfo() {
        this.cardContentInfoForm.dialogNewThirdPartyVisible = true;
      },
      handleRemoveThirdPartyInfo(index, rows) {
        rows.splice(index, 1);
      },
      getRemoteThirdPartiesByKeyWord(query) {
        if (query !== '') {
          this.formNewThirdParty.loading = true;
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formNewThirdParty.loading = false;
              this.formNewThirdParty.thirdParties = data.data.dataMap;
            });
        } else {
          this.formNewThirdParty.thirdParties = [];
        }
      },
      handleAddNewThirdParty(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const thirdParties = this.formNewThirdParty.thirdParties;
            const key = this.formNewThirdParty.search;
            const index = _.findIndex(this.cardContentInfoForm.thirdPartyInfo, (chr) => chr.code === key);
            if (index > -1) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            if (thirdParties && thirdParties.length) {
              for (let i = 0, len = thirdParties.length; i < len; i++) {
                if (thirdParties[i].companyCode === key) {
                  this.cardContentInfoForm.thirdPartyInfo.push({
                    code: thirdParties[i].companyCode,
                    name: thirdParties[i].company,
                    type: 'add'
                  });
                }
              }
            }

            curForm.resetFields();
            this.cardContentInfoForm.dialogNewThirdPartyVisible = false;
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleCancelAddNewThirdParty(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogNewThirdPartyVisible = false;
      },
      handleAddAdvanceItem(type) {
        const paymentMethods = this.cardFinanceInfoForm.paymentMethods;
        const item = {
          paymentAmount: 0,
          paymentTimePeriod: null,
          paymentTime: '',
          times: [
            {
              value: 1,
              label: '合同签约15天'
            },
            {
              value: 2,
              label: '合同签约30天'
            },
            {
              value: 3,
              label: '合同签约90天'
            }
          ],
          remark: '',
          ratio: ''
        };
        _.forIn(paymentMethods, (value, key) => {
          const cur = paymentMethods[key];
          if (cur && cur[0] && cur[0].type === type) {
            cur[0].subItem.push(item);
          }
        });
      },
      handleRemoveAdvanceItem(index, rows) {
        rows.splice(index, 1);
      },
      getProportion(money) {
        let result = 0,
          totalAmount = 0;
        if (this.baseInfoForm.contractType === 3) {
          totalAmount = this.cardFinanceInfoForm.totalAmount ? parseFloat(this.cardFinanceInfoForm.totalAmount) : 0;
        } else {
          totalAmount = this.totalAmount ? parseFloat(this.totalAmount) : 0;
        }
        if (totalAmount === 0) {
          return `${0}%`;
        }
        if (money) {
          result = parseFloat(money) / totalAmount;
        }
        result = Number(result) * 100;
        if (result >= 100) {
          result = 100;
        }
        return `${result.toFixed(2)}%`;
      },
      handleRemoveServiceMatter(index, rows) {
        rows.splice(index, 1);
      },
      handleUploadSealFileSuccess(res) {
        const dataMap = res.dataMap;
        if (dataMap.fileId) {
          const index = this.cardSealInfoForm.current;
          const curentFile = this.cardSealInfoForm.others[index];
          curentFile[0].fileId = dataMap.fileId;
          curentFile[0].fileName = dataMap.fileName;
          curentFile[0].fileUrl = downloadUrl + dataMap.fileId;
          this.$message.success('文件上传成功');
        }
      },
      handleUploadSealFileError(err, file, fileList) {
        console.log('error', err);
        console.log('file', file);
        console.log('fileList', fileList);
      },
      getAgreenmentFieldName(id) {
        switch (id) {
          case 1:
            return 'others';
          case 2:
            return 'agreenments';
          case 3:
            return 'contract';
          default:
            return '';
        }
      },
      handleUploadFileAfterSealSuccess(res) {
        const dataMap = res.dataMap;
        if (dataMap.fileId) {
          const type = parseInt(this.cardSealInfoForm.type, 10);
          const index = this.cardSealInfoForm.current;
          let curentFile = this.cardSealInfoForm[this.getAgreenmentFieldName(type)];
          type === 1 ? curentFile = curentFile[index][0] : curentFile = curentFile[index];
          curentFile.filesSealed = [{
            sealFileId: dataMap.fileId,
            sealFileName: dataMap.fileName,
            sealFileUrl: downloadUrl + dataMap.fileId,
            sealFileCreatorName: dataMap.userName,
            sealFileCreateTime: formatDate(dataMap.createTime),
            operate: 'add'
          }];
          console.log('this.cardSealInfoForm', this.cardSealInfoForm);
          this.$message.success('文件上传成功');
        }
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err);
        console.log('file', file);
        console.log('fileList', fileList);
      },
      validateForms() {
        return new Promise((resolve, reject) => {
          const errors = {
            cardContentInfoForm: {
              errorCount: 0,
              supplierErrorMsg: '',
              subjectsErrorMsg: ''
            },
            cardContCheckInfoForm: {
              errorCount: 0,
              serviceCheckMsg: ''
            },
            cardFinanceInfoForm: {
              errorCount: 0
            },
            cardRemarkInfoForm: {
              errorCount: 0
            },
            baseInfoForm: false
          };
          if (this.operateType === 'update') {
            errors.updateError = false;
            this.$refs.updateForm.validate((valid) => {
              if (!valid) {
                this.$message.error('请填写完整变更原因再提交！');
              } else {
                errors.updateError = true;
              }
            });
          }
          this.$refs.baseInfoForm.validate((valid) => {
            if (!valid) {
              return;
            }
            errors.baseInfoForm = true;
          });
          this.$refs.cardContentInfoForm.validate((valid) => {
            const supplier = this.cardContentInfoForm.tableSupplierInfo;
            const subjects = this.cardContentInfoForm.conSubjctName;
            if (supplier.length === 0) {
              errors.cardContentInfoForm.errorCount += 1;
              errors.cardContentInfoForm.supplierErrorMsg = '合同供应商信息不能为空';
            }
            if (subjects.length === 0) {
              errors.cardContentInfoForm.errorCount += 1;
              errors.cardContentInfoForm.subjectsErrorMsg = '我方主体信息不能为空';
            }
            if (!valid) {
              /*effectiveCondition:1,//生效条件
               startTime: '',
               endTime: '',
               conditionDesc:'',//期限生效*/
              if (this.cardContentInfoForm.effectiveCondition === 1) {
                errors.cardContentInfoForm.errorCount += 2;
              } else if (this.cardContentInfoForm.effectiveCondition === 2) {
                errors.cardContentInfoForm.errorCount += 1;
              }
            }
          });
          this.$refs.cardFinanceInfoForm.validate((valid) => {
            const cardFinanceInfoForm = this.cardFinanceInfoForm;
            if (cardFinanceInfoForm.paymentErrorMSG) {
              errors.cardFinanceInfoForm.errorCount = 1;
            }
            if (!valid) {
              if (cardFinanceInfoForm.moneyInvolved) {
                if (cardFinanceInfoForm.oneOffPay) {
                  if (!cardFinanceInfoForm.invoiceType) {
                    errors.cardFinanceInfoForm.errorCount += 1;
                  }
                  if (!cardFinanceInfoForm.paymentTimePeriod) {
                    errors.cardFinanceInfoForm.errorCount += 1;
                  }
                }
              }
              console.log('errors.cardFinanceInfoForm.errorCount', errors.cardFinanceInfoForm.errorCount);
            }
          });
          this.$refs.cardRemarkInfoForm.validate((valid) => {
            const cardRemarkInfoForm = this.cardRemarkInfoForm;
            if (!valid) {
              if (!cardRemarkInfoForm.otherInstruction) {
                errors.cardRemarkInfoForm.errorCount = 1;
              }
              console.log('errors.cardRemarkInfoForm.errorCount', errors.cardRemarkInfoForm.errorCount);
            }
          });

          //验证附件的数据是否填写完整
          const sealAttachments = this.combineSealsInfo1();
          if (sealAttachments && sealAttachments.length) {
            for (let i = 0, len = sealAttachments.length; i < len; i++) {
              const item = sealAttachments[i];
              if (item[0].haveSale) {
                if (item[0].printTime && item[0].remainTime && item[0].saleInfos.length) {
                  this.cardSealInfoForm.errorMsg = '';
                } else {
                  this.cardSealInfoForm.errorMsg = '请确保所有附件信息填写完整';
                }
              }
            }
          }

          if (!this.showMaterialItems) {
            if (this.$refs.cardContCheckInfoForm) {
              this.$refs.cardContCheckInfoForm.validate((valid) => {
                if (valid) {
                  const service = this.cardContCheckInfoForm.serviceMatters;
                  if (!service.length) {
                    errors.cardContCheckInfoForm.errorCount += 1;
                    errors.cardContCheckInfoForm.serviceCheckMsg = '服务验收事项不能为空';
                  }
                }
              });
            }
          }

          this.cardContentInfoForm.errorCount = errors.cardContentInfoForm.errorCount;
          this.cardContentInfoForm.supplierErrorMsg = errors.cardContentInfoForm.supplierErrorMsg;
          this.cardContentInfoForm.subjectsErrorMsg = errors.cardContentInfoForm.subjectsErrorMsg;
          this.cardContCheckInfoForm.errorCount = errors.cardContCheckInfoForm.errorCount;
          this.cardContCheckInfoForm.serviceCheckMsg = errors.cardContCheckInfoForm.serviceCheckMsg;
          this.cardFinanceInfoForm.errorCount = errors.cardFinanceInfoForm.errorCount;
          this.cardRemarkInfoForm.errorCount = errors.cardRemarkInfoForm.errorCount;

          if (!this.cardContentInfoForm.errorCount && !this.cardContCheckInfoForm.errorCount && errors.baseInfoForm && !errors.cardFinanceInfoForm.errorCount && !this.cardSealInfoForm.errorMsg && !this.cardRemarkInfoForm.errorCount) {
            if (this.operateType === 'update' && !errors.updateError) {
              reject();
            } else {
              resolve();
            }
          } else {
            reject();
          }
        });
      },
      combineSealsInfo() { //剔除空数据项
        const contract = this.cardSealInfoForm.contract;
        const agreenments = this.cardSealInfoForm.agreenments;
        const others = this.cardSealInfoForm.others;
        let sealAttachments = [];

        contract.forEach((item) => {
          const {filesSealed} = item;
          if (filesSealed) {
            const {sealFileCreateTime} = filesSealed[0];
            if (sealFileCreateTime) {
              filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime);
            }
          }
        });

        const sealOthers = [],
          sealAgreenments = [];
        if (others && others.length) {
          others.forEach((item) => {
            if (item[0]) {
              const inItem = item[0];
              const {filesSealed} = inItem;
              if (filesSealed && filesSealed[0]) {
                const {sealFileCreateTime} = filesSealed[0];
                filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime);
              }
            }
            sealOthers.push(item);
          });
        }
        if (agreenments && agreenments.length) {
          for (let i = 0, len = agreenments.length; i < len; i++) {
            const item = agreenments[i];
            if (item && item.slaveProtocolNo) {
              sealAgreenments.push([item]);
            }
          }
        }

        // 判断附件类型，当该附件类型的数据为空是，则该数组为空
        contract.length ? sealAttachments.push(contract) : null;
        sealOthers.length ? sealAttachments = sealAttachments.concat(sealOthers) : null;
        sealAgreenments.length ? sealAttachments = sealAttachments.concat(sealAgreenments) : null;
        return sealAttachments;
      },
      combineSealsInfo1() { //不剔除空数据项
        const contract = this.cardSealInfoForm.contract;
        const others = this.cardSealInfoForm.others;
        let sealAttachments = [];

        const sealOthers = [],
          sealAgreenments = [];
        if (others && others.length) {
          for (let i = 0, len = others.length; i < len; i++) {
            sealOthers.push(others[i]);
          }
        }

        // 判断附件类型，当该附件类型的数据为空是，则该数组为空
        contract.length ? sealAttachments.push(contract) : null;
        sealOthers.length ? sealAttachments = sealAttachments.concat(sealOthers) : null;
        sealAgreenments.length ? sealAttachments = sealAttachments.concat(sealAgreenments) : null;
        return sealAttachments;
      },
      combineSealsInfoWithoudAgreenments() { //剔除空数据项
        const contract = this.cardSealInfoForm.contract;
        const others = this.cardSealInfoForm.others;
        let sealAttachments = [];

        contract.forEach((item) => {
          const {filesSealed} = item;
          if (filesSealed) {
            const {sealFileCreateTime} = filesSealed[0];
            filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime);
          }
        });

        const sealOthers = [];
        if (others && others.length) {
          for (let i = 0, len = others.length; i < len; i++) {
            const item = others[i];
            if (item[0] && item[0].fileName) {
              const {filesSealed} = item[0];
              if (filesSealed && filesSealed[0]) {
                const {sealFileCreateTime} = filesSealed[0];
                filesSealed[0].sealFileCreateTime = formatDate(sealFileCreateTime);
              }
              sealOthers.push(item);
            }
          }
        }

        // 判断附件类型，当该附件类型的数据为空是，则该数组为空
        contract.length ? sealAttachments.push(contract) : null;
        sealOthers.length ? sealAttachments = sealAttachments.concat(sealOthers) : null;
        return sealAttachments;
      },
      handleSave() {
        this.btnSaveStatus = false;
        this.isSubmit = true;
        this.validateForms().then(() => {
          this.btnSaveStatus = true;
          this.cardSealInfoForm.sealAttachments = this.combineSealsInfo();
          this.formatTime(this.cardContentInfoForm, this.cardFinanceInfoForm);
          const paras = {};
          paras.baseInfoForm = this.baseInfoForm;
          paras.cardContentInfoForm = this.cardContentInfoForm;
          paras.cardFinanceInfoForm = this.cardFinanceInfoForm;
          paras.cardContCheckInfoForm = this.cardContCheckInfoForm;
          paras.cardSealInfoForm = this.cardSealInfoForm;
          paras.cardRemarkInfoForm = this.cardRemarkInfoForm;
          paras.cardOtherInfo = this.cardOtherInfo;
          this.comLoading();
          Api.saveContract(paras).then((data) => {
            this.comLoading();
            if (data.data.dataMap.id) {
              this.$message.success('保存成功！');
            }
            this.comLoading(false);
          });
        }).catch(() => {
          this.btnSaveStatus = true;
          this.$message.error('请填写完合同信息再保存！');
          this.comLoading(false);
        });
      },
      formatTime(content, finance) {
        content.startTime = formatDate(content.startTime);
        content.endTime = formatDate(content.endTime);
        finance.payTime = formatDate(finance.payTime);
        this.formatItemTime(finance.paymentMethods.advance);
        this.formatItemTime(finance.paymentMethods.progress);
        this.formatItemTime(finance.paymentMethods._final);
      },
      formatItemTime(arr) {
        if (arr && arr.length) {
          for (let i = 0, len = arr.length; i < len; i++) {
            arr[i].paymentTime = formatDate(arr[i].paymentTime);
            if (arr[i].subItem && arr[i].subItem.length) {
              this.formatItemTime(arr[i].subItem);
            }
          }
        }
      },
      handleSubmit() {
        this.btnSubmitStatus = false;
        this.isSubmit = true;
        this.validateForms().then(() => {
          this.formatTime(this.cardContentInfoForm, this.cardFinanceInfoForm);
          this.cardSealInfoForm.sealAttachments = this.combineSealsInfo();
          const paras = {};
          paras.baseInfoForm = this.baseInfoForm;
          paras.cardContentInfoForm = this.cardContentInfoForm;
          paras.cardFinanceInfoForm = this.cardFinanceInfoForm;
          paras.cardContCheckInfoForm = this.cardContCheckInfoForm;
          paras.cardSealInfoForm = this.cardSealInfoForm;
          paras.cardRemarkInfoForm = this.cardRemarkInfoForm;
          paras.cardOtherInfo = this.cardOtherInfo;

          if (this.operateType === 'create') {
            this.comLoading();
            Api.submit(paras).then((data) => {
              if (data.data.dataMap.id) {
                this.btnSubmitStatus = true;
                this.$message.success('提交成功！');
                this.operateType = 'query';
                this.$router.push({name: routerNames.con_index});
              }
              this.comLoading(false);
            })
              .catch(() => {
                this.btnSubmitStatus = true;
                this.comLoading(false);
              });
          } else {
            const updateForm = this.updateForm;
            const updateParams = {};
            updateParams.alterMode = updateForm.updateMode;
            updateParams.alterRemark = updateForm.remark;
            updateParams.contractVo = paras;
            this.comLoading();
            Api.updatedSubmit(updateParams).then((data) => {
              if (data.data.dataMap.id) {
                if (this.operateType === 'update') {
                  this.updated = true;
                }
                this.$message.success('提交成功！');
                this.operateType = 'query';
                this.$router.push({name: routerNames.con_index});
              }
              this.comLoading(false);
            }).catch(() => {
              this.btnSubmitStatus = true;
              this.comLoading(false);
            });
          }
        })
          .catch(() => {
            this.btnSubmitStatus = true;
            this.$message.error('请填写完合同信息再提交！');
          });
      },

      handleCurTimeChange(value, row) {
        if (value) {
          row.paymentTime = '';
        }
      },
      handleExactDateChange(value, row) {
        if (value) {
          row.paymentTimePeriod = null;
        }
      },
      handleItemCurTimeChange(value, row) {
        if (value) {
          row.paymentTime = '';
        }
      },
      handleItemExactDateChange(value, row) {
        if (value) {
          row.paymentTimePeriod = null;
        }
      },
      handleNewSealFile() {
        const file = {
          operate: 'add',
          id: '',
          fileName: '',
          fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          attachType: 1, // 附件类型
          slaveProtocolNo: '0011001', // 从协议编号
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            }
          ], // 附件类型集合
          haveSale: true, // 是否用章
          remark: '',
          saleTime: 1, // 用章次数
          printTime: '', // 打印份数
          remainTime: '', // 我方留存份数
          saleInfos: [], // 当前选中的张
          useSeals: [
            {
              id: '1',
              name: '公章'
            },
            {
              id: '2',
              name: '法人章'
            }
          ], // 章列表
          filesSealed: [] // 上传的盖章后的文件信息
        };
        const sealAttachments = this.cardSealInfoForm.sealAttachments;

        if (sealAttachments.length) {
          for (let i = sealAttachments.length - 1; i >= 0; i--) {
            const item = sealAttachments[i];
            if (item[0].attachType !== 2) {
              sealAttachments.splice(i + 1, 0, [file]);
              return;
            }
          }
        }
      },
      handleNewOtherSealFile() {
        const file = [{
          operate: 'add',
          id: '',
          fileName: '',
          fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          attachType: 1, // 附件类型
          slaveProtocolNo: '0011001', // 从协议编号
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            }
          ], // 附件类型集合
          haveSale: true, // 是否用章
          remark: '',
          saleTime: 1, // 用章次数
          printTime: '', // 打印份数
          remainTime: '', // 我方留存份数
          saleInfos: [], // 当前选中的张
          useSeals: [
            {
              id: '1',
              name: '公章'
            },
            {
              id: '2',
              name: '法人章'
            }
          ], // 章列表
          filesSealed: [] // 上传的盖章后的文件信息
        }];
        this.cardSealInfoForm.others.push(file);
      },
      /*handleNewAgreenmentSealFile() {
       const file = {
       operate: 'add',
       agreementId: '',
       id: '',
       fileName: '',
       fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
       attachType: 2, // 附件类型
       slaveProtocolNo: '', // 从协议编号
       types: [
       {
       id: 1,
       name: '其他'
       },
       {
       id: 2,
       name: '从协议'
       }
       ], // 附件类型集合
       haveSale: true, // 是否用章
       remark: '',
       saleTime: 1, // 用章次数
       printTime: '', // 打印份数
       remainTime: '', // 我方留存份数
       saleInfos: [], // 当前选中的张
       useSeals: [
       {
       id: '1',
       name: '公章'
       },
       {
       id: '2',
       name: '法人章'
       }
       ], // 章列表
       filesSealed: []// 上传的盖章后的文件信息
       }
       this.cardSealInfoForm.agreenments.push(file)
       },*/
      handleQuery(code) {
        const params = {};
        params.code = code;
        params.operate = 'ALTER';
        // 根据合同编号获取合同模式设置当前合同模式及业务类型
        Api.getUpdateInfo(params).then((data) => {
          const dataMap = data.data.dataMap;
          if (dataMap && dataMap.baseInfoForm.id) {
            this.initData(dataMap);
            this.updateForm.visible = true;
          }
        });
      },
      handleChangeType(index, row) {
        const currentType = row.attachType;
        currentType === 2 ? (row.haveSale = false) : (row.haveSale = true);
        // const file = [row];
        //        rows.splice(index, 1)
        // const sealAttachments = this.cardSealInfoForm.sealAttachments;
        // sealAttachments.splice(index,1)

        /* if(currentType===2){
         sealAttachments.push(file);
         }else{
         for(let i=sealAttachments.length;i>0;i--){
         const item=sealAttachments[i]
         if(item[0].attachType!==2){
         sealAttachments.splice(i,0,file)
         return
         }
         }
         } */
      },
      handleRemoveSealItem(index, rows) {
        console.log('index', index);
        console.log('rows', rows);
        rows.splice(index, 1);
      },
      getRemotebusinessOperatorsByKeyWord(query) {
        if (this.ifRequest && query) {
          this.baseInfoForm.loading = true;
          console.log('getRemotebusinessOperatorsByKeyWord', query);
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.baseInfoForm.loading = false;
              this.baseInfoForm.businessOperators = data.data.dataMap;
            });
        } else {
          this.baseInfoForm.businessOperatorId = '';
          this.baseInfoForm.businessOperatorName = '';
          this.baseInfoForm.businessOperators = [];
        }
      },
      getRemoteResponsiblesByKeyWord(query) {
        if (this.ifRequest && query) {
          this.cardContCheckInfoForm.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.cardContCheckInfoForm.loading = false;
              this.cardContCheckInfoForm.responsibles = data.data.dataMap;
            });
        } else {
          this.cardContCheckInfoForm.responsibles = [];
        }
      },
      handleContractTextTypeChange(val) {
        const params = {};
        params.bizTypeId = this.baseInfoForm.contractBusinessTypeThird;
        params.templateType = (val === 1 ? 'TEMPLATE' : 'TEXT');
        if (this.operateType === 'create') {
          this.baseInfoForm.templateId = '';
        }

        if (this.ifRequest) {
          Api.getTemplateByBizTypeId(params).then((data) => {
            this.baseInfoForm.templateOptions = data.data.dataMap || [];
          });
        }
      },
      handleBusinessOperatorChange(val) {
        const businessOperators = this.baseInfoForm.businessOperators;
        if (this.ifRequest && businessOperators.length) {
          for (let i = 0, len = businessOperators.length; i < len; i++) {
            if (val === businessOperators[i].userId) {
              this.baseInfoForm.businessOperatorName = businessOperators[i].userName;
              this.baseInfoForm.businessDeptName = businessOperators[i].deptName;
              this.baseInfoForm.businessDeptId = businessOperators[i].deptCode;
              this.cardContCheckInfoForm.responsibleId = businessOperators[i].superiorId;
              this.cardContCheckInfoForm.responsibleName = businessOperators[i].superiorName;
              this.getPerson(this.cardContCheckInfoForm.responsibleId, (data) => {
                if (data && data.length) {
                  this.cardContCheckInfoForm.responsibleDeptName = data[0].deptName;
                  this.cardContCheckInfoForm.responsibleDeptId = data[0].deptCode;
                } else {
                  this.cardContCheckInfoForm.responsibleDeptName = '';
                  this.cardContCheckInfoForm.responsibleDeptId = '';
                }
              });
            }
          }
        }
      },
      handleResponsibleChange(val) {
        const responsibles = this.cardContCheckInfoForm.responsibles;
        if (responsibles.length) {
          for (let i = 0, len = responsibles.length; i < len; i++) {
            if (val === responsibles[i].userId) {
              this.cardContCheckInfoForm.responsibleDeptName = responsibles[i].deptName;
              this.cardContCheckInfoForm.responsibleDeptId = responsibles[i].deptCode;
            }
          }
        }
      },
      getRemoteCheckPersonsByKeyWord(query) {
        if (this.ifRequest && query !== '') {
          this.formAddUnionCheck.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.formAddUnionCheck.loading = false;
              this.formAddUnionCheck.checkPersons = data.data.dataMap;
            });
        } else {
          this.formAddUnionCheck.checkPersons = [];
        }
      },
      handleCheckPersonsChange(val) {
        const checkPersons = this.formAddUnionCheck.checkPersons;
        if (checkPersons.length) {
          for (let i = 0, len = checkPersons.length; i < len; i++) {
            if (val === checkPersons[i].userId) {
              this.formAddUnionCheck.personDept = checkPersons[i].deptName;
              this.formAddUnionCheck.personDeptId = checkPersons[i].deptCode;
              this.formAddUnionCheck.personId = checkPersons[i].userId;
              this.formAddUnionCheck.personName = checkPersons[i].userName;
              this.formAddUnionCheck.id = '';
            }
          }
        }
      },
      handleTemplateChange(val) {
        if (this.ifRequest && val) {
          const contractTextType = this.baseInfoForm.contractTextType;
          const templateOptions = this.baseInfoForm.templateOptions;
          let templateName = '';
          for (let i = 0, len = templateOptions.length; i < len; i++) {
            if (templateOptions[i].templateId === val) {
              templateName = templateOptions[i].templateName;
            }
          }
          const params = {templateId: val, templateName, contractTextType};
          Api.getSealAttachments(params).then((data) => {
            if (data.data.dataMap) {
              const dataMap = data.data.dataMap;
              if (this.operateType === 'create') {
                const contract = [];
                const others = [];
                if (dataMap && dataMap.length) {
                  for (let i = 0, len = dataMap.length; i < len; i++) { // 初始化附件类型
                    const item = dataMap[i];
                    if (parseInt(item.attachType, 10) === 3) {
                      contract.push(item);
                    }
                    if (parseInt(item.attachType, 10) === 1) {
                      others.push([item]);
                    }
                  }
                  this.cardSealInfoForm.contract = contract;
                  this.cardSealInfoForm.others = others;
                }
              }
            }
          });
        }
      },
      handleCodeBlur(item, val) {
        if (val) {
          Api.getAgreenmentDetailByAgreenmentNo(val).then((data) => {
            const dataMap = data.data.dataMap;
            if (dataMap && dataMap.id) {
              const agreenments = this.cardSealInfoForm.agreenments;
              if (agreenments && agreenments.length) {
                const index = _.findIndex(agreenments, (chr) => chr.id === dataMap.id);
                if (index > -1) {
                  this.$message.error('这条数据已存在咯！');
                  return;
                }
              }
              item.id = dataMap.id;
            }
          })
            .catch(() => {
              item.slaveProtocolNo = '';
            });
        }
      },
      handleRemoveFilesSealedItem(index, rows) {
        rows.splice(index, 1);
      },
      handleUpload(type, index) {
        this.cardSealInfoForm.type = type;
        this.cardSealInfoForm.current = index || 0;
      },
      handleUploadOuter(index) {
        this.cardSealInfoForm.current = index;
      },
      handleRemoveUnionCheckPerson(index, rows) {
        rows.splice(index, 1);
      },
      handleAddConStandard() {
        this.cardContentInfoForm.dialogAddConStandard = true;
      },
      handleAddConStandardItem(formName) {
        const curForm = this.$refs[formName];
        const conStandards = this.cardContentInfoForm.conStandard;
        const key = this.formAddConStandard.search;
        const index = _.findIndex(conStandards, (chr) => chr.materialCode === key);
        if (index > -1) {
          this.$message.error('这条数据已存在咯！');
          return;
        }
        curForm.validate((valid) => {
          if (valid) {
            const conStandard = this.cardContentInfoForm.conStandard;
            const item = {};
            item.id = curForm.model.id;
            item.materialCode = curForm.model.materialCode;
            item.materialName = curForm.model.materialName;
            item.total = curForm.model.total;
            item.price = curForm.model.price;
            item.amount = curForm.model.price;
            item.taxCode = curForm.model.taxCode;
            item.taxRate = curForm.model.taxRates.find((t) => t.code === curForm.model.taxCode).value;
            item.operate = 'add';
            conStandard.push(item);
            this.cardContentInfoForm.dialogAddConStandard = false;
            this.$refs[formName].resetFields();
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleCancelAddConStandard(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogAddConStandard = false;
      },
      getRemoteMaterialsByKeyWord(query) {
        if (query !== '') {
          this.formAddConStandard.loading = true;
          Api.getRemoteMaterialsByKeyWord({key: query})
            .then((data) => {
              this.formAddConStandard.loading = false;
              this.formAddConStandard.materials = data.data.dataMap;
            });
        } else {
          this.formAddConStandard.materials = [];
        }
      },
      handleMaterialChange(val) {
        const materials = this.formAddConStandard.materials;

        if (materials.length) {
          for (let i = 0, len = materials.length; i < len; i++) {
            if (val === materials[i].materialCode) {
              this.formAddConStandard.materialCode = materials[i].materialCode;
              this.formAddConStandard.materialName = materials[i].materialName;
            }
          }
        }
      },
      handleRemoveConStandard(index, rows) {
        rows.splice(index, 1);
      },
      getContractAgreenmentName(id) {
        switch (id) {
          case 1:
            return '其他';
          case 2:
            return '从协议';
          case 3:
            return '合同';
          default:
            return '';
        }
      },
      handleRemoveOthersItem(index, rows) {
        rows.splice(index, 1);
      },
      handleRemoveAgreenmentsItem(index, rows) {
        rows.splice(index, 1);
      },
      getEnabledUploadBtnOuter(fileName) {
        return !fileName;
      },
      handleSeriousPaymentsChange(item, event) {
        item.seriousPayments = event.target.checked;
        if (!item.seriousPayments) {
          item.paymentAmount = 0;
          item.paymentTimePeriod = null;
          item.remark = null;
        }
      },
      getPerson(keyword, callback) {
        Api.getRemoteCreatePersonsByKeyWord({keyword}).then((res) => {
          const data = res.data.dataMap;
          callback && callback(data);
        });
      },
      enabledAllApply(code) {
        let enabled = false;
        if (code === '1001' && this.baseInfoForm.contractType >= 3 && this.operateType === 'create') {
          enabled = true;
        }
        return enabled;
      },
      callback(params) { //isSign:是否是加签人 isAgree:审批操作类型是否是同意
        return new Promise((resolve, reject) => {
          const {isSign, isAgree} = params;
          if (!isSign && isAgree && this.ifRole()) {
            const para = {};
            para.sealAttachments = this.combineSealsInfoWithoudAgreenments();
            para.id = this.baseInfoForm.id;
            para.type = 1;
            Api.uploadSealAttachments(para)
              .then(() => {
                resolve();
              })
              .catch(() => {
                reject();
              });
          } else {
            resolve();
          }
        });
      },
      handleChangeValidateForms() {
        if (this.isSubmit) {
          this.validateForms().catch(() => {
          });
        }
      },
      initRelatedInfo() {
        this.comLoading();
        Api.getConList(this.cardRelatedInfoForm).then((data) => {
          const dataMap = data.data.dataMap;
          if (dataMap) {
            this.cardRelatedInfoForm.contractList = dataMap.data;
            this.cardRelatedInfoForm.total = dataMap.total;
          }
          this.comLoading(false);
        }).catch(() => {
          this.comLoading(false);
        });
      },
      handleRelatedInfoSizeChange(val) {
        this.cardRelatedInfoForm.pageSize = val;
        this.initRelatedInfo();
      },
      handleRelatedInfoCurrentChange(page) {
        this.cardRelatedInfoForm.pageNo = page;
        this.initRelatedInfo();
      },
      getContractModel(id) {
        switch (id) {
          case 1:
            return '单一合同';
          case 2:
            return '简易合同';
          case 3:
            return '框架合同';
          case 4:
            return '框架意向合同';
          default:
            return '';
        }
      },
      handleChangeUpdateMode(val) {
        if (val === 2) {
          this.handleContractTextTypeChange(this.baseInfoForm.contractTextType);
        }
      },
      handleStartDateChange(time) {
        if (formatTimeStamp(time) < formatTimeStamp(formatDate(new Date()))) {
          console.log(111);
        }
        this.handleChangeValidateForms();
      }
    },
    components: {
      Preview,
      Process,
      PrTable: (resolve) => {
        require(['./components/tables/prTable'], resolve);
      },
      PriceTable: (resolve) => {
        require(['./components/tables/priceTable'], resolve);
      },
      ContractTable: (resolve) => {
        require(['./components/tables/contractTable'], resolve);
      },
      OrderTable: (resolve) => {
        require(['./components/tables/orderTable'], resolve);
      }
    },
    watch: {
      $route() {
        const path = this.$route.path;
        if (path && path === '/conperf/conupdate') {
          this.operateType = 'update';
        }
      },
      'cardContentInfoForm.conStandard': function (conStandards) {
        if (this.operateType === 'create') {
          const result = [];
          if (conStandards && conStandards.length) {
            for (let i = 0, len = conStandards.length; i < len; i++) {
              const item = conStandards[i];
              if (item.materialCode) {
                result.push({
                  sampleCode: item.materialCode,
                  sampleDesc: item.materialName
                });
              }
            }
          }
          this.cardContCheckInfoForm.materialMatters = result;
        }
      },
      'baseInfoForm.contractType': function (val) {
        if (this.operateType === 'create') {
          if (val === 2) { // 固定格式合同
            this.cardFinanceInfoForm.moneyInvolved = true;
          }
          if (val === 4) {
            this.cardFinanceInfoForm.moneyInvolved = false;
          }
        }
      },
      'cardFinanceInfoForm.oneOffPay': function () {
        if (this.operateType === 'create') {
          this.cardFinanceInfoForm.totalAmount = this.totalAmount;
          const paymentMethods = {
            earnest: [{
              type: '定金',
              seriousPayments: null, // 是否多次付款
              paymentAmount: 0, // 付款金额
              paymentTimePeriod: null, // 付款方式
              paymentTime: '', // 付款时间
              times: [
                {
                  value: 1,
                  label: '合同签约15天'
                },
                {
                  value: 2,
                  label: '合同签约30天'
                },
                {
                  value: 3,
                  label: '合同签约90天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: [
                {
                  paymentAmount: 0,
                  paymentTimePeriod: null,
                  paymentTime: '',
                  times: [
                    {
                      value: 1,
                      label: '合同签约15天'
                    },
                    {
                      value: 2,
                      label: '合同签约30天'
                    },
                    {
                      value: 3,
                      label: '合同签约90天'
                    }
                  ],
                  remark: '',
                  ratio: ''
                }
              ]
            }],
            advance: [{
              type: '预付款',
              seriousPayments: null, // 是否多次付款
              paymentAmount: 0, // 付款金额
              paymentTimePeriod: null, // 付款方式
              paymentTime: '', // 付款时间
              times: [
                {
                  value: 1,
                  label: '合同签约15天'
                },
                {
                  value: 2,
                  label: '合同签约30天'
                },
                {
                  value: 3,
                  label: '合同签约90天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: [
                {
                  paymentAmount: 0,
                  paymentTimePeriod: null,
                  paymentTime: '',
                  times: [
                    {
                      value: 1,
                      label: '合同签约15天'
                    },
                    {
                      value: 2,
                      label: '合同签约30天'
                    },
                    {
                      value: 3,
                      label: '合同签约90天'
                    }
                  ],
                  remark: '',
                  ratio: ''
                }
              ]
            }],
            progress: [{
              type: '进度款',
              seriousPayments: null,
              paymentAmount: 0,
              paymentTimePeriod: null,
              paymentTime: '',
              times: [
                {
                  value: 1,
                  label: '验收后15天'
                },
                {
                  value: 2,
                  label: '验收后30天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: []
            }],
            _final: [{
              type: '尾款',
              seriousPayments: null,
              paymentAmount: 0,
              paymentTimePeriod: null,
              paymentTime: '',
              times: [
                {
                  value: 1,
                  label: '合同结束后15天'
                },
                {
                  value: 2,
                  label: '合同结束后30天'
                },
                {
                  value: 3,
                  label: '合同结束后90天'
                },
                {
                  value: 4,
                  label: '合同结束后180天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: []
            }],
            deposit: [{
              type: '保证金',
              seriousPayments: null, // 是否多次付款
              paymentAmount: 0, // 付款金额
              paymentTimePeriod: null, // 付款方式
              paymentTime: '', // 付款时间
              times: [
                {
                  value: 1,
                  label: '合同签约15天'
                },
                {
                  value: 2,
                  label: '合同签约30天'
                },
                {
                  value: 3,
                  label: '合同签约90天'
                }
              ],
              remark: '',
              ratio: '',
              subItem: [
                {
                  paymentAmount: 0,
                  paymentTimePeriod: null,
                  paymentTime: '',
                  times: [
                    {
                      value: 1,
                      label: '合同签约15天'
                    },
                    {
                      value: 2,
                      label: '合同签约30天'
                    },
                    {
                      value: 3,
                      label: '合同签约90天'
                    }
                  ],
                  remark: '',
                  ratio: ''
                }
              ]
            }]
          };
          this.cardFinanceInfoForm.paymentMethods = paymentMethods;
        }
      },
      totalConMoney(val) {
        if (this.operateType === 'create') {
          let total = 0;
          if (val) {
            total = parseFloat(val);
            if (this.baseInfoForm.contractType !== 3 && this.baseInfoForm.contractType !== 4 && this.cardFinanceInfoForm.moneyInvolved) {
              if (total !== this.totalAmount) {
                this.cardFinanceInfoForm.paymentErrorMSG = '您添加的付款金额必须等于合同总金额';
              } else {
                this.cardFinanceInfoForm.paymentErrorMSG = '';
              }
            }
          }
        }
      }
    }
  };
</script>
