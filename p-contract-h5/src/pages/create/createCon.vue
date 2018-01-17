<style scoped>
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
    <el-card v-if="operateType==='update'">
      <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="updateForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input :readonly="operateType==='query'" v-model="updateForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1" v-if="operateType==='update'">
            <el-button :disabled="!updateForm.code" type="primary" @click="handleQuery(updateForm.code)">
              查找
            </el-button>
          </el-col>
        </el-row>
        <el-form-item label="变更原因" prop="remark">
          <el-input
            :readonly="operateType==='query'"
            v-model="updateForm.remark"
            placeholder="变更原因"
            type="textarea"
            :rows="4"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div v-if="contentVisible">
      <el-card>
        <header slot="header">合同基本信息</header>
        <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :rules="baseInfoForm.rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName">
                <el-input :readonly="isEnabled1" :class="{disabledInput:isEnabled1}" v-model="baseInfoForm.contractName"
                          placeholder="请输入合同名称"
                          :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item v-if="isCreate" label="业务申请人" prop="businessOperatorId">
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
                <el-input :readonly="isEnabled1" v-model="baseInfoForm.businessOperatorName"
                          :class="{wp100:true,disabledInput:isEnabled1}"
                          placeholder="请输入业务申请人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务部门" prop="businessDeptName">
                <el-input
                  :readonly="isEnabled"
                  :class="{disabledInput:isEnabled}"
                  v-model="baseInfoForm.businessDeptName"
                  placeholder="请输入业务部门"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同模式">
                <el-input :readonly="true" :class="{disabledInput:true}" v-model="baseInfoForm.contractTypeName"
                          placeholder="请输入合同模式"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务类型">
                <el-input :readonly="true" :class="{disabledInput:true}" v-model="baseInfoForm.contractBusinessTypeName"
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
                <el-select v-if="isCreate" class="wp100" :disabled="isEnabled1" v-model="baseInfoForm.templateId"
                           placeholder="请选择合同模版"
                           @change="handleTemplateChange">
                  <el-option
                    v-for="item in baseInfoForm.templateOptions"
                    :key="item.templateId"
                    :label="item.templateName"
                    :value="item.templateId">
                  </el-option>
                </el-select>
                <el-input v-else :readonly="isEnabled1" :class="{disabledInput:isEnabled1}"
                          v-model="baseInfoForm.templateName"
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
                <el-input :readonly="operateType==='query'" :class="{disabledInput:operateType==='query'}"
                          v-model="baseInfoForm.belongProject"
                          placeholder="请输入所属项目"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="operateType!=='create'&&updateForm.updateMode===1">
              <el-form-item label="合同编号">
                <el-input v-model="baseInfoForm.contractNo" placeholder="请输入合同编号"
                          :readonly="true" :class="{disabledInput:true}"></el-input>
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
              <el-input :disabled="isEnabled1" type="textarea" :rows="4"
                        placeholder="请输入内容"
                        v-model="baseInfoForm.ourSealOpinion"></el-input>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <el-tabs v-model="activeTabName">
          <el-tab-pane name="tabContInfo">
            <span slot="label" class="title">
              合同内容信息
              <i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>
            </span>
            <el-form ref="cardContentInfoForm" :model="cardContentInfoForm" label-width="120px"
                     :rules="cardContentInfoForm.rules">
              <el-card>
                <header slot="header">合同供应商信息<i class="errorMsg">{{cardContentInfoForm.supplierErrorMsg}}</i></header>
                <el-button v-if="isVisibleNewSupplierBtn" size="small" @click="handleAddContractSupplier" icon="plus"
                           class="mb10" type="primary">新增
                </el-button>
                <el-table :data="cardContentInfoForm.tableSupplierInfo">
                  <el-table-column type="index" label="序号" width="80">
                    <template scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="供应商编号"></el-table-column>
                  <el-table-column prop="name" label="供应商名称"></el-table-column>
                  <el-table-column
                    label="操作"
                    width="100"
                    v-if="this.operateType!=='query'">
                    <template scope="scope">
                      <el-button
                        v-if="cardContentInfoForm.tableSupplierInfo[scope.$index].type"
                        @click="handleRemove(scope.$index, cardContentInfoForm.tableSupplierInfo)"
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
                    label="操作"
                    width="100"
                    v-if="this.operateType!=='query'">
                    <template scope="scope">
                      <el-button
                        v-if="cardContentInfoForm.conSubjctName[scope.$index].type"
                        @click="handleRemove(scope.$index, cardContentInfoForm.conSubjctName)"
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
                    label="操作"
                    width="100"
                    v-if="this.operateType!=='query'">
                    <template scope="scope">
                      <el-button
                        v-if="cardContentInfoForm.thirdPartyInfo[scope.$index].type"
                        @click="handleRemove(scope.$index, cardContentInfoForm.thirdPartyInfo)"
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
                <el-table :data="cardContentInfoForm.conStandard" border>
                  <el-table-column type="index" label="序号" width="80">
                    <template scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
                  <el-table-column v-if="baseInfoForm.contractBusinessTypeFirst!==2" prop="materialCode" label="物料编码"
                                   width="250"></el-table-column>
                  <el-table-column prop="materialName"
                                   :label="baseInfoForm.contractBusinessTypeFirst===2?'服务名称':'物料名称'"></el-table-column>
                  <el-table-column v-if="baseInfoForm.contractType!==3" prop="total" label="数量"
                                   width="100"></el-table-column>
                  <el-table-column prop="price" label="价格" width="100"></el-table-column>
                  <el-table-column prop="taxRate" label="税率" width="100">
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
                        @click="handleRemove(scope.$index,cardContentInfoForm.conStandard)"
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
                    <span style="color:#FF0000;font-size:12px;">注：备注内容将会被添加到合同条款中</span>
                  </el-form-item>
                </el-row>
              </el-card>
              <el-row class="mt20">
                <el-form-item label="生效条件" prop="effectiveCondition">
                  <el-radio-group v-model="cardContentInfoForm.effectiveCondition" :disabled="!enabledInupdated"
                                  @change="validateForms">
                    <el-radio :label="1">附期限生效</el-radio>
                    <el-radio :label="2">附条件生效</el-radio>
                    <el-radio :label="3">签订生效</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-row v-if="cardContentInfoForm.effectiveCondition===1">
                  <el-col :span="8">
                    <el-form-item label="合同生效日期" prop="startTime">
                      <el-date-picker v-model="cardContentInfoForm.startTime"
                                      format="yyyy-MM-dd"
                                      @change="validateForms"
                                      :disabled="!enabledInupdated"
                                      placeholder="请输入合同生效期日期"
                                      type="date"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同终止日期" prop="endTime">
                      <el-date-picker v-model="cardContentInfoForm.endTime"
                                      format="yyyy-MM-dd"
                                      @change="validateForms"
                                      :disabled="!enabledInupdated"
                                      placeholder="请输入合同终止日期"
                                      type="date"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="cardContentInfoForm.effectiveCondition===2">
                  <el-form-item prop="conditionDesc" class="mr20" label="备注">
                    <el-input @change="validateForms" :disabled="!enabledInupdated"
                              v-model="cardContentInfoForm.conditionDesc" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-row>
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
                                    :disabled="moneyInvolvedDisabled">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
                  <el-form-item label="是否一次性付款">
                    <el-radio-group v-model="cardFinanceInfoForm.oneOffPay"
                                    :disabled="oneOffPayDisabled">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="cardFinanceInfoForm.moneyInvolved">
                <el-col :span="8">
                  <el-form-item label="合同总金额" prop="totalAmount">
                    <el-input :disabled="totalAmountDisabled" v-model.number="cardFinanceInfoForm.totalAmount"
                              placeholder="根据上表累加(含税价)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开票类型" prop="invoiceType">
                    <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" placeholder="请选择开票类型"
                               :disabled="invoiceTypeDisabled">
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
                               :disabled="currencyDisabled">
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
                  <el-form-item
                    label="付款条件"
                    prop="paymentTimePeriod"
                    :rules="{required: true, message: '请输入付款条件'}">
                    <el-select
                      @change="validateForms"
                      v-model="cardFinanceInfoForm.paymentTimePeriod"
                      placeholder="请选择付款条件"
                      class="wp100"
                      :disabled="paymentTimePeriodDisabled"
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
                <div v-if="!cardFinanceInfoForm.oneOffPay">
                  <Payment :items="cardFinanceInfoForm.paymentMethods.earnest" :moreDatas="finaceMoreDatas"
                           :show-header="true"></Payment>
                  <Payment :items="cardFinanceInfoForm.paymentMethods.advance" :moreDatas="finaceMoreDatas"></Payment>
                  <Payment :items="cardFinanceInfoForm.paymentMethods.progress" :moreDatas="finaceMoreDatas"></Payment>
                  <Payment :items="cardFinanceInfoForm.paymentMethods._final" :moreDatas="finaceMoreDatas"></Payment>
                  <Payment :items="cardFinanceInfoForm.paymentMethods.deposit" :moreDatas="finaceMoreDatas"></Payment>
                </div>
                <el-row class="mt20">
                  <el-form-item label="备注" prop="paymentRemark" label-width="60px">
                    <el-input
                      :disabled="!enabledInupdated"
                      v-model="cardFinanceInfoForm.paymentRemark"
                      placeholder="请输入备注"
                      type="textarea"
                      :rows="4"></el-input>
                    <span style="color:#FF0000;font-size:12px;">注：备注内容将会被添加到合同条款中</span>
                  </el-form-item>
                </el-row>
              </el-card>
              <el-card class="mt20">
                <header slot="header">开票信息</header>
                <BothInfo :jiaBillingInfo="cardFinanceInfoForm.jiaBillingInfo"
                          :yiBillingInfo="cardFinanceInfoForm.yiBillingInfo"></BothInfo>
              </el-card>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="tabContCheckInfo" v-if="baseInfoForm.contractType===3||baseInfoForm.contractType===1">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <el-form ref="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="验收责任人" prop="responsibleName">
                    <el-input class="wp100" :disabled="true" v-model="cardContCheckInfoForm.responsibleName"
                              placeholder="请输入验收责任人"></el-input>
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
              <el-button
                v-if="operateType!=='query'&&operateType!=='update'"
                @click="handleAddUnionCheck"
                size="small"
                icon="plus"
                type="primary"
                class="mb10">添加
              </el-button>
              <el-table class="mb20" :data="cardContCheckInfoForm.unionCheckPersons">
                <el-table-column prop="personName" label="联合验收人"></el-table-column>
                <el-table-column prop="personDept" label="联合验收人部门"></el-table-column>
                <el-table-column
                  label="操作"
                  width="100"
                  v-if="this.operateType!=='query'">
                  <template scope="scope">
                    <el-button
                      v-if="cardContCheckInfoForm.unionCheckPersons[scope.$index].operate"
                      @click="handleRemove(scope.$index,cardContCheckInfoForm.unionCheckPersons)"
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
                  <el-table-column type="index" label="序号" width="80">
                    <template scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
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
                  <el-table-column type="index" label="序号" width="80">
                    <template scope="scope">
                      {{scope.$index + 1}}
                    </template>
                  </el-table-column>
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
                        @click="handleRemove(scope.$index, cardContCheckInfoForm.serviceMatters)"
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
                v-if="addOtherSealFileDisabled"
                class="mb20">
                添加
              </el-button>
              <i class="errorMsg">{{cardSealInfoForm.errorMsg}}</i>
              <SealTable
                v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length"
                :items="cardSealInfoForm.contract"
                :show-header="true"
                :removeColumns="['upload','handleBtns']"
                :moreDatas="{type:1,isSealRole,isPurchaseRole,isCreate,isSee,isModify,backLogCreator,tplType:baseInfoForm.contractTextType}"
                @validateForms="validateForms"
                class="mb20"></SealTable>
              <template v-if="cardSealInfoForm.others.length" v-for="(item,index) in cardSealInfoForm.others">
                <SealTable
                  v-if="item&&item.length"
                  :items="item"
                  :show-header="index===0"
                  :moreDatas="{type:2,isSealRole,isPurchaseRole,isCreate,isSee,isModify,backLogCreator}"
                  @handleRemove="handleRemove(index,cardSealInfoForm.others)"
                  @validateForms="validateForms"></SealTable>
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
                  </template>
                </el-table-column>
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
                          @change="validateForms"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="相关数据" name="tabRelatedData" v-if="procInstId">
            <el-form rel="cardRelatedInfoForm" :model="cardRelatedInfoForm" label-width="100px">
              <el-table :data="cardRelatedInfoForm.contractList" border>
                <el-table-column type="index" label="序号" width="80">
                  <template scope="scope">
                    {{scope.$index + 1}}
                  </template>
                </el-table-column>
                <el-table-column prop="contractNo" label="合同号"></el-table-column>
                <el-table-column prop="contractType" label="类型">
                  <template scope="scope">
                    {{cardRelatedInfoForm.contractList[scope.$index].contractType | contractType}}
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
            <transition name="component-fade" mode="out-in">
              <component :contractInfo="contractInfo" :prNo="baseInfoForm.prNo" :contractNo="baseInfoForm.contractNo"
                         :is="tabs"></component>
            </transition>
          </el-tab-pane>
          <el-tab-pane label="历史信息" name="conHistory" v-if="operateType==='query'&&!procInstId">
            <el-table :data="historyDatas">
              <el-table-column prop="procInstId" label="流程id">
                <template scope="scope">
                  <div v-if="[2,4].indexOf(scope.row.contractType)>-1||!scope.row.procInstId">自动创建</div>
                  <div class="router-link" @click="goToProcess(scope.row)" v-else>
                    {{scope.row.procInstId}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="operatorName" label="操作者"></el-table-column>
              <el-table-column prop="operateTime" label="操作时间">
                <template scope="scope">{{scope.row.operateTime | formatDate}}</template>
              </el-table-column>
              <el-table-column prop="operateType" label="操作类型"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
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
        <el-form-item label="联合验收人" prop="personName">
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
    <Process :extraFn="callback.bind(this)"></Process>
    <div class="mt20 mb20 tc">
      <el-button v-if="operateType!=='query'" :disabled="!btnSubmitStatus" type="primary" @click="handleSubmit">提交
      </el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import store from 'store';
  import Api from '../../api/manageContract';
  import comLoading from '../../mixins/comLoading';
  import {downloadUrl, uploadUrl} from '../../api/consts';
  import {formatDate} from '../../filters/moment';
  import contractType from '../../filters/contractType';
  import {routerNames, contractMap, processListMap} from '../../core/consts';
  import toPage from '../../assets/js/toPage';

  export default {
    mixins: [comLoading],
    data() {
      const validateStartDateRules = (rule, value, callback) => {
        const endTime = this.cardContentInfoForm.endTime;
        if (this.operateType === 'create' || (this.operateType === 'update' && this.updateForm.updateMode === 2)) {
          /*if (formatDate(new Date(value)) > formatDate(new Date())) {
            callback(new Error('合同生效日期必须小于等于今天'));
          }*/
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
        if (this.operateType === 'create') {
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
      const paymentMethods = {};
      ['earnest', 'advance', 'progress', '_final', 'deposit'].forEach((i) => {
        paymentMethods[i] = [];
      });

      return {
        processData: null,
        procCode: '', //流程code
        procInstId: '', //流程id
        procTitle: '', //流程名称
        previewData: {}, // 预览数据
        visible: false, // 预览
        downloadUrl,
        uploadUrl,
        operateType: '', // create:创建，update:变更，query:查询
        updateForm: {
          visible: false, // 在变更合同中控制合同页面数据的显示与否
          code: '',
          updateMode: 1,
          remark: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
            remark: [{required: true, message: '请输入变更原因', trigger: 'blur'}]
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
            contractName: [{required: true, message: '请输入合同名称', trigger: 'blur'}],
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
          invoiceType: 1, // 开票类型
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
          jiaBillingInfo: [],
          yiBillingInfo: [],
          paymentErrorMSG: '',
          errorCount: 0,
          paymentMethods,
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
          errorMsg: ''
        },
        cardRemarkInfoForm: {
          otherInstruction: '',
          errorCount: 0,
          rules: {
            otherInstruction: [{
              validator: (rule, value, callback) => {
                if (this.cardContentInfoForm.effectiveCondition === 1 && this.cardContentInfoForm.startTime && formatDate(this.cardContentInfoForm.startTime) < formatDate(new Date()) && !this.isSee) {
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
          supplierCode: null,
          contractList: [],
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        cardOtherInfo: {
          condition: 4,
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
            personName: [
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
        btnSubmitStatus: true, // 提交按钮状态
        historyDatas: []
      };
    },
    computed: {
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

      isSealRole() {
        const reg = /印章保管人/g;
        return this.processData ? reg.test(this.processData.roleName) : false;
      },
      isPurchaseRole() {
        const reg = /采购合同上传/g;
        return this.processData ? reg.test(this.processData.roleName) : false;
      },
      isFARole() {
        return this.processData ? this.processData.roleName.indexOf('FA') > -1 : false;
      },

      finaceMoreDatas() {
        return {
          paymentTimePeriods: this.cardFinanceInfoForm.paymentTimePeriods,
          totalAmount: this.cardFinanceInfoForm.totalAmount,
          isCreate: this.isCreate,
          isSee: this.isSee,
          isModify: this.isModify,
          backLogFA: this.backLogFA
        };
      },

      /**判断当前页面类型**/
      isCreate() { //创建
        return this.operateType === 'create';
      },
      isSee() { //查看
        return this.operateType === 'query';
      },
      isModify() { //变更
        return this.operateType === 'update';
      },
      backLogFA() {
        let isBackLog = false;
        let isFA = false;
        if (this.processData) {
          isBackLog = this.processData.dataType === processListMap[0];
          isFA = isBackLog ? this.isFARole : false;
        }

        return isBackLog && isFA;
      },
      backLogCreator() {
        let isBackLog = false;
        let isCreator = false;
        if (this.processData) {
          isBackLog = this.processData.dataType === processListMap[0];
          const user = store.get('user');
          isCreator = isBackLog ? this.baseInfoForm.creatorId === user.userId : false;
        }

        return isBackLog && isCreator;
      },
      /**判断当前页面类型**/
      addOtherSealFileDisabled() {
        if (this.backLogCreator) {
          return true;
        }
        if (!this.isSee) {
          return true;
        }
        return false;
      },

      /**if disabled element**/
      //cardSealInfoForm
      //cardFinanceInfoForm
      moneyInvolvedDisabled() {
        if (this.isSee) {
          return true;
        } else if ([2, 4].indexOf(this.baseInfoForm.contractType) > -1) {
          return true;
        } else if (this.baseInfoForm.contractType === 3 && !this.baseInfoForm.prFlag) {
          return true;
        }
        return false;
      },
      oneOffPayDisabled() {
        if (this.isSee || this.baseInfoForm.contractType === 3) {
          return true;
        }
        return false;
      },
      totalAmountDisabled() {
        if (!this.isSee) {
          if (this.baseInfoForm.contractType === 3) {
            return false;
          }
        }
        return true;
      },
      invoiceTypeDisabled() {
        if (this.backLogFA) {
          return false;
        }
        if (this.isSee) {
          return true;
        }
        return false;
      },
      currencyDisabled() {
        if (this.backLogFA) {
          return false;
        }
        if (this.isSee) {
          return true;
        }
        return false;
      },
      paymentTimePeriodDisabled() {
        if (this.backLogFA) {
          return false;
        }
        if (this.isSee) {
          return true;
        }
        return false;
      }

      /**if disabled element**/
    },
    filters: {
      formatDate,
      contractType
    },
    created() {
      const query = this.$route.query;
      if (query.processData) {
        this.processData = JSON.parse(query.processData);
        this.procCode = this.processData.procCode;
        this.procInstId = this.processData.procInstId;
        this.procTitle = this.processData.procTitle;
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
          this.comLoading();
          Api.getUpdateInfo(query.contractNo).then((data) => {
            const dataMap = data.data.dataMap;
            if (dataMap) {
              this.initData(dataMap);
            }
          }).finally(() => {
            this.comLoading(false);
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
          this.baseInfoForm.contractTypeName = contractType(data.baseInfoForm.contractType);// 初始化合同模式
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
          if (this.procInstId) {
            this.initRelatedInfo();
          }
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

          if (this.operateType === 'query' && !this.procInstId) {
            this.historyDatas = data.simpleContract || [];
          }
        } else {
          this.baseInfoForm.contractTypeName = contractType(params.contractType);// 初始化合同模式
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
          if (this.cardContentInfoForm.conStandard.length) {
            const exist = this.cardContentInfoForm.conStandard.some(item => item.taxCode !== 'J0');
            if (exist) {
              this.cardFinanceInfoForm.invoiceType = this.cardFinanceInfoForm.invoiceTypeOptions[0].value;
            }
          }
        }
      },
      handlePreview() {
        if (this.operateType === 'query') {
          this.getPreviewData();
        } else {
          this.validateForms().then(() => {
            this.getPreviewData();
          }).catch(() => {
            this.$message.error('请填写完合同信息再预览！');
          });
        }
      },
      getPreviewData() {
        this.cardContentInfoForm.startTime = formatDate(this.cardContentInfoForm.startTime);
        this.cardContentInfoForm.endTime = formatDate(this.cardContentInfoForm.endTime);
        this.formatItemTime(this.cardFinanceInfoForm.paymentMethods.advance);
        this.formatItemTime(this.cardFinanceInfoForm.paymentMethods.progress);
        this.formatItemTime(this.cardFinanceInfoForm.paymentMethods._final);
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
            const exist = this.cardContCheckInfoForm.unionCheckPersons.some(chr => chr.personId === this.formAddUnionCheck.personId);
            if (exist) {
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
            const exist = this.cardContCheckInfoForm.serviceMatters.some(chr => chr.name === this.formAddServiceCheck.name);
            if (exist) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            this.cardContCheckInfoForm.serviceMatters.push({
              serviceRequire: this.formAddServiceCheck.requirement,
              serviceName: this.formAddServiceCheck.name,
              remark: this.formAddServiceCheck.remark,
              type: 'add'
            });
            curForm.resetFields();
            this.cardContCheckInfoForm.dialogAddServiceVisible = false;
            this.validateForms();
          }
        });
      },
      handleCancelAddServiceCheck(formName) {
        this.$refs[formName].resetFields();
        this.cardContCheckInfoForm.dialogAddServiceVisible = false;
      },
      handleAddNewSubject(formName) {
        const curForm = this.$refs[formName];
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.formNewSubject.subjects;
            const key = this.formNewSubject.search;
            const exist = this.cardContentInfoForm.conSubjctName.some(chr => chr.code === key);
            if (exist) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            subjects.some((item) => {
              if (item.companyCode === key) {
                this.cardFinanceInfoForm.jiaBillingInfo.push(item);
                this.cardContentInfoForm.conSubjctName.push({
                  code: item.companyCode,
                  name: item.company,
                  type: 'add'
                });
                return true;
              }
              return false;
            });

            curForm.resetFields();
            this.baseInfoForm.dialogNewSubjectVisible = false;
            this.validateForms();
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
      getRemoteSuppliersByKeyWord(key) {
        if (key !== '') {
          this.formContractSupplier.loading = true;
          Api.getRemoteSuppliersByKeyWord({key})
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
            suppliers.some((item) => {
              if (key === item.companyCode) {
                this.cardFinanceInfoForm.yiBillingInfo = [item];
                this.cardContentInfoForm.tableSupplierInfo = [{
                  code: item.companyCode,
                  name: item.company,
                  type: 'add'
                }];
                return true;
              }
              return false;
            });

            curForm.resetFields();
            this.cardContentInfoForm.dialogAddContractSupplier = false;
            this.validateForms();
          }
        });
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogAddContractSupplier = false;
      },
      getRemoteSubjectsByKeyWord(key) {
        if (key !== '') {
          this.formNewSubject.loading = true;
          Api.getRemoteSubjectsByKeyWord({key})
            .then((data) => {
              this.formNewSubject.loading = false;
              this.formNewSubject.subjects = data.data.dataMap || [];
            });
        } else {
          this.formNewSubject.subjects = [];
        }
      },
      handleNewthirdPartyInfo() {
        this.cardContentInfoForm.dialogNewThirdPartyVisible = true;
      },
      getRemoteThirdPartiesByKeyWord(key) {
        if (key !== '') {
          this.formNewThirdParty.loading = true;
          Api.getRemoteSuppliersByKeyWord({key})
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
            const exist = this.cardContentInfoForm.thirdPartyInfo.some(chr => chr.code === key);
            if (exist) {
              this.$message.error('这条数据已存在咯！');
              return;
            }
            thirdParties.some((item) => {
              if (item.companyCode === key) {
                this.cardContentInfoForm.thirdPartyInfo.push({
                  code: item.companyCode,
                  name: item.company,
                  type: 'add'
                });
                return true;
              }
              return false;
            });

            curForm.resetFields();
            this.cardContentInfoForm.dialogNewThirdPartyVisible = false;
          }
        });
      },
      handleCancelAddNewThirdParty(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogNewThirdPartyVisible = false;
      },
      validateForms() {
        console.log(222);
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
            if (cardFinanceInfoForm.moneyInvolved && !cardFinanceInfoForm.oneOffPay) {
              if (this.checkPayCondition()) { //判断付款条件是否选择
                errors.cardFinanceInfoForm.errorCount += 1;
              }
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
            this.cardSealInfoForm.errorMsg = '';
            const exist = sealAttachments.some((item) => {
              if (item[0].haveSale) {
                return !(item[0].printTime && item[0].remainTime && item[0].saleInfos.length && item[0].fileName);
              }
              return false;
            });
            if (exist) {
              this.cardSealInfoForm.errorMsg = '请确保所有附件信息填写完整';
            }
          }

          if (this.operateType === 'update') {
            errors.updateError = false;
            this.$refs.updateForm.validate((valid) => {
              if (!valid) {
                this.$message.warning('请填写完整变更原因再提交！');
              } else {
                errors.updateError = true;
              }
            });
            const exist = sealAttachments.some(item => !item[0].id); //合同变更必须上传附件
            if (!exist) {
              this.$message.warning('变更合同必须上传附件！');
              errors.updateError = false;
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
        const others = this.cardSealInfoForm.others;
        const agreenments = this.cardSealInfoForm.agreenments;
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

        const sealOthers = [];
        const sealAgreenments = [];
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
        if (contract.length) {
          sealAttachments.push(contract);
        }
        if (sealOthers.length) {
          sealAttachments = sealAttachments.concat(sealOthers);
        }
        if (sealAgreenments.length) {
          sealAttachments = sealAttachments.concat(sealAgreenments);
        }

        if (this.procCode === contractMap[1]) {
          sealAttachments = sealAttachments.filter(item => item[0].attachStatus !== 1);
        }
        return sealAttachments;
      },
      combineSealsInfo1() {
        const contract = this.cardSealInfoForm.contract;
        const others = this.cardSealInfoForm.others;
        let sealAttachments = [];

        // 判断附件类型，当该附件类型的数据为空是，则该数组为空
        if (contract.length) {
          sealAttachments.push(contract);
        }
        if (others.length) {
          sealAttachments = sealAttachments.concat(others);
        }
        return sealAttachments;
      },
      combineSealsInfoWithoudAgreenments() {
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

        // 判断附件类型，当该附件类型的数据为空，则该数组为空
        if (contract.length) {
          sealAttachments.push(contract);
        }
        if (sealOthers.length) {
          sealAttachments = sealAttachments.concat(sealOthers);
        }
        return sealAttachments;
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
        this.validateForms().then(() => {
          this.cardContentInfoForm.startTime = formatDate(this.cardContentInfoForm.startTime);
          this.cardContentInfoForm.endTime = formatDate(this.cardContentInfoForm.endTime);
          this.formatItemTime(this.cardFinanceInfoForm.paymentMethods.advance);
          this.formatItemTime(this.cardFinanceInfoForm.paymentMethods.progress);
          this.formatItemTime(this.cardFinanceInfoForm.paymentMethods._final);
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
            Api.submit(paras).then(() => {
              this.$message.success('提交成功！');
              this.$router.push({name: routerNames.con_index});
            }).finally(() => {
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
            Api.updatedSubmit(updateParams).then(() => {
              this.$message.success('提交成功！');
              this.$router.push({name: routerNames.con_index});
            }).finally(() => {
              this.btnSubmitStatus = true;
              this.comLoading(false);
            });
          }
        }).finally(() => {
          this.btnSubmitStatus = true;
        });
      },
      handleQuery(code) {
        const params = {
          code,
          operate: 'ALTER'
        };
        // 根据合同编号获取合同模式设置当前合同模式及业务类型
        Api.getUpdateInfo(params).then((data) => {
          const dataMap = data.data.dataMap;
          if (dataMap && dataMap.baseInfoForm.id) {
            this.initData(dataMap);
            this.updateForm.visible = true;
          }
        });
      },
      getRemotebusinessOperatorsByKeyWord(keyword) {
        if (keyword !== '') {
          this.baseInfoForm.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword})
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
      handleContractTextTypeChange(val) {
        if (this.isCreate) {
          this.baseInfoForm.templateId = '';
          const params = {};
          params.bizTypeId = this.baseInfoForm.contractBusinessTypeThird;
          params.templateType = (val === 1 ? 'TEMPLATE' : 'TEXT');
          Api.getTemplateByBizTypeId(params).then((data) => {
            this.baseInfoForm.templateOptions = data.data.dataMap || [];
          });
        }
      },
      handleBusinessOperatorChange(val) {
        const businessOperators = this.baseInfoForm.businessOperators;
        if (this.isCreate) {
          const exist = businessOperators.some((item) => {
            if (item.userId === val) {
              this.baseInfoForm.businessOperatorName = item.userName;
              this.baseInfoForm.businessDeptName = item.deptName;
              this.baseInfoForm.businessDeptId = item.deptCode;
              this.cardContCheckInfoForm.responsibleId = item.superiorId;
              this.cardContCheckInfoForm.responsibleName = item.superiorName;
              return true;
            }
            return false;
          });
          if (exist) {
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
      },
      getRemoteCheckPersonsByKeyWord(keyword) {
        if (this.isCreate && keyword !== '') {
          this.formAddUnionCheck.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword})
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
        checkPersons.some((item) => {
          if (item.userId === val) {
            this.formAddUnionCheck.personDept = item.deptName;
            this.formAddUnionCheck.personDeptId = item.deptCode;
            this.formAddUnionCheck.personId = item.userId;
            this.formAddUnionCheck.personName = item.userName;
            this.formAddUnionCheck.id = '';
            return true;
          }
          return false;
        });
      },
      handleTemplateChange(val) {
        if (this.isCreate && val) {
          const contractTextType = this.baseInfoForm.contractTextType;
          const templateOptions = this.baseInfoForm.templateOptions;
          let templateName = '';
          templateOptions.some((item) => {
            if (item.templateId === val) {
              templateName = item.templateName;
              return true;
            }
            return false;
          });
          const params = {templateId: val, templateName, contractTextType};
          Api.getSealAttachments(params).then((data) => {
            if (data.data.dataMap) {
              const dataMap = data.data.dataMap;

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
          });
        }
      },
      handleAddConStandard() {
        this.cardContentInfoForm.dialogAddConStandard = true;
      },
      handleAddConStandardItem(formName) {
        const curForm = this.$refs[formName];
        const conStandards = this.cardContentInfoForm.conStandard;
        const key = this.formAddConStandard.search;
        const exist = conStandards.some(chr => chr.materialCode === key);
        if (exist) {
          this.$message.error('这条数据已存在咯！');
          return;
        }
        curForm.validate((valid) => {
          if (valid) {
            const conStandard = this.cardContentInfoForm.conStandard;
            const {
              materialCode,
              materialName,
              total,
              price,
              taxCode,
              taxRates
            } = this.formAddConStandard;
            const item = {};
            item.id = curForm.model.id;
            item.materialCode = materialCode;
            item.materialName = materialName;
            item.total = total;
            item.price = price;
            item.amount = price;
            item.taxCode = taxCode;
            item.taxRate = taxRates.find(t => t.code === taxCode).value;
            item.operate = 'add';
            conStandard.push(item);
            this.cardContentInfoForm.dialogAddConStandard = false;
            this.$refs[formName].resetFields();
          }
        });
      },
      handleCancelAddConStandard(formName) {
        this.$refs[formName].resetFields();
        this.cardContentInfoForm.dialogAddConStandard = false;
      },
      getRemoteMaterialsByKeyWord(key) {
        if (key !== '') {
          this.formAddConStandard.loading = true;
          Api.getRemoteMaterialsByKeyWord({key})
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
        materials.some((item) => {
          if (item.materialCode === val) {
            this.formAddConStandard.materialCode = item.materialCode;
            this.formAddConStandard.materialName = item.materialName;
            return true;
          }
          return false;
        });
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
      getPerson(keyword, callback) {
        Api.getRemoteCreatePersonsByKeyWord({keyword}).then((res) => {
          const data = res.data.dataMap;
          callback && callback(data);
        });
      },
      enabledAllApply(code) {
        let enabled = false;
        if (code === '1001' && this.baseInfoForm.contractType >= 3 && this.isCreate) {
          enabled = true;
        }
        return enabled;
      },
      initRelatedInfo() {
        this.comLoading();
        this.cardRelatedInfoForm.supplierCode = this.cardContentInfoForm.tableSupplierInfo[0].code;
        Api.getConList(this.cardRelatedInfoForm).then((data) => {
          const dataMap = data.data.dataMap;
          if (dataMap) {
            this.cardRelatedInfoForm.contractList = dataMap.data;
            this.cardRelatedInfoForm.total = dataMap.total;
          }
        }).finally(() => {
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
      goToProcess(row) {
        toPage.call(this, row);
      },

      callback(params) { //isSign:是否是加签人 isAgree:审批操作类型是否是同意
        const t = this;
        const promises = [];
        const {isSign, isAgree} = params;
        if (!isSign && isAgree && (t.isSealRole || t.isPurchaseRole)) {
          promises.push(t.modifyAddNewFiles());
        } else if (t.backLogFA) {
          promises.push(t.modifyFA());
        } else if (t.backLogCreator) {
          promises.push(t.modifyFiles());
        } else {
          return Promise.resolve();
        }
        return Promise.all(promises);
      },
      modifyAddNewFiles() {
        const t = this;
        const para = {};
        para.sealAttachments = t.combineSealsInfoWithoudAgreenments();
        para.id = t.baseInfoForm.id;
        para.type = 1;
        para.uploadPerson = t.isPurchaseRole;
        return Api.uploadSealAttachments(para);
      },
      modifyFA() {
        const {
          currency,
          invoiceType,
          paymentTimePeriod,
          paymentMethods
        } = this.cardFinanceInfoForm;
        const finances = Object.keys(paymentMethods).map((key) => {
          const item = paymentMethods[key][0];
          let payType = 1;
          if (key === 'advance') {
            payType = 1;
          } else if (key === 'progress') {
            payType = 2;
          } else if (key === '_final') {
            payType = 3;
          } else if (key === 'earnest') {
            payType = 4;
          } else if (key === 'deposit') {
            payType = 5;
          }
          return Object.assign({}, item, {payType, finances: item.subItem});
        });
        if (this.cardFinanceInfoForm.paymentErrorMSG || !this.checkPayCondition()) {
          this.$message.warning('合同财务信息不完整');
          return Promise.reject();
        }
        return Api.updateFinanceByContractId({
          contractId: this.$route.query.contractId,
          currency,
          invoiceType,
          paymentTimePeriod,
          finances
        });
      },
      modifyFiles() {
        const contractAttachments = [];
        contractAttachments.push(this.cardSealInfoForm.contract[0]);
        this.cardSealInfoForm.others.forEach((item) => {
          contractAttachments.push(item[0]);
        });
        return Api.updateAttach({
          contractId: this.$route.query.contractId,
          contractAttachments
        });
      },
      conditionLoop(items) {
        return items.some((item) => {
          const {subItem, seriousPayments, paymentAmount} = item;
          if (seriousPayments) {
            if (subItem.length) {
              return this.conditionLoop(subItem);
            }
            return false;
          }
          if (paymentAmount) {
            return !item.paymentTimePeriod;
          }
          return false;
        });
      },
      checkPayCondition() {
        const {paymentMethods} = this.cardFinanceInfoForm;
        const items = Object.keys(paymentMethods).map(key => paymentMethods[key][0]);
        return !this.conditionLoop(items);
      },
      handleRemove(index, rows) {
        rows.splice(index, 1);
      },
      copyPrevSealData(file) {
        const {contract, others} = this.cardSealInfoForm;
        let prev;
        if (others.length) {
          prev = others[others.length - 1][0];
        } else {
          prev = contract[0];
        }
        file[0].saleInfos = prev.saleInfos.slice(0);
        return file;
      },
      handleNewOtherSealFile() {
        let file = [{
          addNew: true,
          fileName: '',
          fileUrl: '', // 合同文本类型为非模版合同时，附件类型的合同的文件下载地址
          attachType: 1, // 附件类型
          haveSale: true, // 是否用章
          remark: '',
          saleTime: 1, // 用章次数
          printTime: 4, // 打印份数
          remainTime: 2, // 我方留存份数
          saleInfos: ['1'], // 当前选中的章
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
        if (this.backLogCreator) {
          file = this.copyPrevSealData(file);
        }
        this.cardSealInfoForm.others.push(file);
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
      totalConMoney(val) {
        if (val !== this.cardFinanceInfoForm.totalAmount) {
          this.cardFinanceInfoForm.paymentErrorMSG = '您添加的付款金额必须等于合同总金额';
        } else {
          this.cardFinanceInfoForm.paymentErrorMSG = '';
        }
      }
    },
    components: {
      Preview: (resolve) => {
        require(['./preview.vue'], resolve);
      },
      Process: (resolve) => {
        require(['../../components/process.vue'], resolve);
      },
      Payment: (resolve) => {
        require(['./payment.vue'], resolve);
      },
      PrTable: (resolve) => {
        require(['./prTable.vue'], resolve);
      },
      PriceTable: (resolve) => {
        require(['./priceTable.vue'], resolve);
      },
      ContractTable: (resolve) => {
        require(['./contractTable.vue'], resolve);
      },
      OrderTable: (resolve) => {
        require(['./orderTable.vue'], resolve);
      },
      BothInfo: (resolve) => {
        require(['./bothInfo.vue'], resolve);
      },
      SealTable: (resolve) => {
        require(['./sealTable.vue'], resolve);
      }
    }
  };
</script>
