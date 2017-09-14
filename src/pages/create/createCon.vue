<style>
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
  .createCon .select-money{
    padding-top:5px;
    padding-bottom:5px;
  }
  .createCon .select-curTime{
    margin-bottom:5px;
  }
  .createCon table{
    width: 100%!important;
  }
</style>
<template>
  <div class="createCon">
    <el-card v-if="operateType==='update'">
      <header slot="header">变更原因</header>
      <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="updateForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input v-model="updateForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button :disabled="!updateForm.code" type="primary" @click="handleQuery(updateForm.code)">
              查找
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button :disabled="!updateForm.code" type="primary" @click="handleDetail(updateForm.code)"
                       style="margin-left:33px">详情
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="变更方式" prop="updateMode">
              <el-select v-model="updateForm.updateMode" placeholder="请选择变更方式">
                <el-option
                  v-for="item in updateForm.updateModes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="!updateForm.updateMode">
            <el-form-item label="新合同编号" prop="newCode">
              <el-input :disabled="true" v-model="updateForm.newCode" placeholder="新合同编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="updateForm.remark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="contentVisible">
      <header slot="header">合同基本信息</header>
      <el-form ref="baseInfoForm" :model="baseInfoForm" label-width="100px" :rules="baseInfoForm.rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务经办人" prop="businessOperator">
              <el-select
                :disabled="isEnabled1"
                size="small"
                v-model="baseInfoForm.businessOperator"
                filterable
                remote
                placeholder="请输入业务经办人"
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务部门" prop="businessDept">
              <el-input :disabled="isEnabled" v-model="baseInfoForm.businessDept"
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
            <el-form-item label="合同类型">
              <el-input :disabled="isEnabled" v-model="baseInfoForm.contractBusinessTypeName"
                        placeholder="请输入合同类型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同文本类型">
              <el-select :disabled="isEnabled1" v-model="baseInfoForm.contractTextType"
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
          <el-col :span="16">
            <el-form-item label="模版名称" prop="templateId">
              <el-select :disabled="isEnabled1" v-model="baseInfoForm.templateId" placeholder="请选择合同模版">
                <el-option
                  v-for="item in baseInfoForm.templateOptions"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId">
                </el-option>
              </el-select>
              {{conVersion}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属项目" prop="belongProject">
              <el-input :disabled="operateType==='query'" v-model="baseInfoForm.belongProject"
                        placeholder="请输入所属项目"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="operateType!=='create'&&updateForm.updateMode">
            <el-form-item label="合同编号">
              <el-input v-model="baseInfoForm.contractNo" placeholder="请输入合同编号"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
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
      <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
        <el-tab-pane name="tabContInfo">
          <span slot="label" class="title">合同内容信息<i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i></span>
          <el-form ref="cardContentInfoForm" :model="cardContentInfoForm" label-width="120px"
                   :rules="cardContentInfoForm.rules">
            <el-card>
              <header slot="header">合同供应商信息<i class="errorMsg">{{cardContentInfoForm.supplierErrorMsg}}</i></header>
              <el-button v-if="isVisibleNewSupplierBtn"
                         @click="handleAddContractSupplier" icon="plus" class="mb10"
                         type="primary">新增
              </el-button>
              <el-table :data="cardContentInfoForm.tableSupplierInfo">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="code" label="供应商编号"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.tableSupplierInfo[scope.$index].type"
                      @click="handleRemoveSupplier(scope.$index, cardContentInfoForm.tableSupplierInfo)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="mt20">
              <header slot="header">合同我方主体名称<i class="errorMsg">{{cardContentInfoForm.subjectsErrorMsg}}</i></header>
              <el-button v-if="operateType!=='query'" type="primary" @click="handleNewSubjectName"
                         icon="plus" class="mb10">新增
              </el-button>
              <el-table :data="cardContentInfoForm.conSubjctName">
                <el-table-column prop="code" label="公司代码"></el-table-column>
                <el-table-column prop="name" label="公司名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.conSubjctName[scope.$index].type"
                      @click="handleRemoveSubect(scope.$index, cardContentInfoForm.conSubjctName)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card v-if="baseInfoForm.contractType!==2" class="mt20">
              <header slot="header">第三方信息</header>
              <el-button v-if="operateType==='create'" type="primary" @click="handleNewthirdPartyInfo"
                         icon="plus" class="mb10">新增
              </el-button>
              <el-table :data="cardContentInfoForm.thirdPartyInfo">
                <el-table-column prop="code" label="供应商编号"></el-table-column>
                <el-table-column prop="name" label="供应商名称"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="cardContentInfoForm.thirdPartyInfo[scope.$index].type"
                      @click="handleRemoveThirdPartyInfo(scope.$index, cardContentInfoForm.thirdPartyInfo)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card v-if="baseInfoForm.contractType!==4" class="mt20">
              <header slot="header">合同标的</header>
              <el-table :data="cardContentInfoForm.conStandard">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="materialCode" label="物料编码"></el-table-column>
                <el-table-column prop="materialName" label="物料名称"></el-table-column>
                <el-table-column v-if="baseInfoForm.contractType!==3" prop="total" label="数量"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="taxRate" label="税率"></el-table-column>
              </el-table>
              <el-row class="mt20" v-if="operateType==='update'">
                <el-col :span="8">
                  <el-form-item label="是否固定期限">
                    <el-radio-group v-model="cardContentInfoForm.ifFixedTerm">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-form-item label="合同生效日期"
                                prop="startTime">
                    <el-date-picker v-model="cardContentInfoForm.startTime"
                                    :disabled="operateType==='query'"
                                    placeholder="请输入合同生效期日期"
                                    type="date"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同终止日期"
                                prop="endTime">
                    <el-date-picker v-model="cardContentInfoForm.endTime"
                                    :disabled="operateType==='query'"
                                    placeholder="请输入合同终止日期"
                                    type="date"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合同财务信息" name="tabContFinanceInfo">
          <el-form rel="cardFinanceInfoForm" :model="cardFinanceInfoForm" :rules="cardFinanceInfoForm.rules"
                   label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否涉及金额">
                  <el-radio-group v-model="cardFinanceInfoForm.moneyInvolved"
                                  :disabled="operateType==='query'">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved===true">
                <el-form-item label="是否一次性付款" label-width="120px">
                  <el-radio-group v-model="cardFinanceInfoForm.oneOffPay" :disabled="operateType==='query'">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-card v-if="cardFinanceInfoForm.moneyInvolved===true">
              <header slot="header">付款方式</header>
              <el-table :data="cardFinanceInfoForm.paymentMethods.advance"
                        v-if="!cardFinanceInfoForm.oneOffPay"
                        style="width: 100%"
              >
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods.advance[0].seriousPayments">
                  <template scope="props">
                    <el-button icon="plus" type="primary"
                               v-if="operateType!=='query'"
                               @click="handleAddAdvanceItem(props.row.type)"
                               class="mb10">
                      添加
                    </el-button>
                    <el-table :data="props.row.subItem">
                      <el-table-column width="100px" prop="name" label="名称">
                        <template scope="scope">{{props.row.type}}{{scope.$index+1}}</template>
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
                        label="付款时间"
                        width="250px">
                        <template scope="scope">
                          <el-row class="select-money">
                            <el-col>
                              <el-select
                                class="select-curTime"
                                @change="handleItemCurTimeChange(props.row.subItem[scope.$index].paymentTimePeriod,props.row.subItem[scope.$index])"
                                :disabled="operateType==='query'"
                                placeholder="请选择付款时间"
                                v-model="props.row.subItem[scope.$index].paymentTimePeriod">
                                <el-option
                                  v-for="item in props.row.subItem[scope.$index].times"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-col>
                            <el-col>
                              <el-date-picker
                                @change="handleItemExactDateChange(props.row.subItem[scope.$index].paymentTime,props.row.subItem[scope.$index])"
                                v-model="props.row.subItem[scope.$index].paymentTime"
                                :disabled="operateType==='query'"
                                placeholder="请输入具体付款日期"
                                type="date"></el-date-picker>
                            </el-col>
                          </el-row>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="remark"
                        label="备注"
                        width="200px">
                        <template scope="scope">
                          <el-input
                            type="textarea"
                            :rows="2"
                            :disabled="operateType==='query'"
                            v-model="props.row.subItem[scope.$index].remark"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="ratio" label="占比" width="80px">
                        <template scope="scope">
                          {{getProportion(props.row.subItem[scope.$index].paymentAmount)}}
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
                            type="text" size="small">移除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="是否多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].seriousPayments"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  label="付款金额"
                  width="150px">
                  <template scope="scope">
                    <el-input
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款时间"
                  width="250px">
                  <template scope="scope">
                    <el-row class="select-money">
                      <el-col>
                        <el-select
                          class="select-curTime"
                          v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentTimePeriod"
                          :disabled="operateType==='query'"
                          placeholder="请选择付款时间"
                          @change="handleCurTimeChange(cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentTimePeriod,cardFinanceInfoForm.paymentMethods.advance[scope.$index])">
                          <el-option
                            v-for="item in cardFinanceInfoForm.paymentMethods.advance[scope.$index].times"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col>
                        <el-date-picker
                          @change="handleExactDateChange(cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentTime,cardFinanceInfoForm.paymentMethods.advance[scope.$index])"
                          v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentTime"
                          :disabled="operateType==='query'"
                          placeholder="请输入具体付款日期"
                          type="date"></el-date-picker>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"
                width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.advance[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="80px">
                  <template scope="scope">
                    {{getProportion(cardFinanceInfoForm.paymentMethods.advance[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods.progress"
                        v-if="!cardFinanceInfoForm.oneOffPay" style="width: 100%">
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods.progress[0].seriousPayments">
                  <template scope="props">
                    <el-button icon="plus" type="primary" class="mb10" v-if="operateType!=='query'"
                               @click="handleAddAdvanceItem(props.row.type)">
                      添加
                    </el-button>
                    <el-table :data="props.row.subItem">
                      <el-table-column width="100px" prop="name" label="名称">
                        <template scope="scope">{{props.row.type}}{{scope.$index+1}}</template>
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
                        label="付款时间"
                        width="250px">
                        <template scope="scope">
                          <el-row class="select-money">
                            <el-col>
                              <el-select
                                class="select-curTime"
                                @change="handleItemCurTimeChange(props.row.subItem[scope.$index].paymentTimePeriod,props.row.subItem[scope.$index])"
                                :disabled="operateType==='query'"
                                placeholder="请选择付款时间"
                                v-model="props.row.subItem[scope.$index].paymentTimePeriod">
                                <el-option
                                  v-for="item in props.row.subItem[scope.$index].times"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-col>
                            <el-col>
                              <el-date-picker
                                @change="handleItemExactDateChange(props.row.subItem[scope.$index].paymentTime,props.row.subItem[scope.$index])"
                                v-model="props.row.subItem[scope.$index].paymentTime"
                                :disabled="operateType==='query'"
                                placeholder="请输入具体付款日期"
                                type="date"></el-date-picker>
                            </el-col>
                          </el-row>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="remark"
                        label="备注"
                        width="200px">
                        <template scope="scope">
                          <el-input
                            type="textarea"
                            :rows="2"
                            :disabled="operateType==='query'"
                            v-model="props.row.subItem[scope.$index].remark"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="ratio" label="占比" width="80px">
                        <template scope="scope">
                          {{getProportion(props.row.subItem[scope.$index].paymentAmount)}}
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
                            type="text" size="small">移除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column width="90px" prop="seriousPayments" label="是否多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].seriousPayments"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  label="付款金额"
                  width="150px">
                  <template scope="scope">
                    <el-input
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款时间"
                  width="250px">
                  <template scope="scope">
                    <el-row class="select-money">
                      <el-col>
                        <el-select
                          class="select-curTime"
                          v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentTimePeriod"
                          :disabled="operateType==='query'"
                          placeholder="请选择付款时间"
                          @change="handleCurTimeChange(cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentTimePeriod,cardFinanceInfoForm.paymentMethods.progress[scope.$index])">
                          <el-option
                            v-for="item in cardFinanceInfoForm.paymentMethods.progress[scope.$index].times"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col>
                        <el-date-picker
                          @change="handleExactDateChange(cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentTime,cardFinanceInfoForm.paymentMethods.progress[scope.$index])"
                          v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentTime"
                          :disabled="operateType==='query'"
                          placeholder="请输入具体付款日期"
                          type="date"></el-date-picker>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods.progress[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比"  width="80px">
                  <template scope="scope">
                    {{getProportion(cardFinanceInfoForm.paymentMethods.progress[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-table :show-header="false" :data="cardFinanceInfoForm.paymentMethods._final"
                        v-if="!cardFinanceInfoForm.oneOffPay" style="width: 100%">
                <el-table-column type="expand" v-if="cardFinanceInfoForm.paymentMethods._final[0].seriousPayments">
                  <template scope="props">
                    <el-button icon="plus" type="primary" class="mb10"
                               v-if="operateType!=='query'"
                               @click="handleAddAdvanceItem(props.row.type)">
                      添加
                    </el-button>
                    <el-table :data="props.row.subItem">
                      <el-table-column width="100px" prop="name" label="名称">
                        <template scope="scope">{{props.row.type}}{{scope.$index+1}}</template>
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
                        label="付款时间"
                        width="250px">
                        <template scope="scope">
                          <el-row class="select-money">
                            <el-col>
                              <el-select
                                class="select-curTime"
                                @change="handleItemCurTimeChange(props.row.subItem[scope.$index].paymentTimePeriod,props.row.subItem[scope.$index])"
                                :disabled="operateType==='query'"
                                placeholder="请选择付款时间"
                                v-model="props.row.subItem[scope.$index].paymentTimePeriod">
                                <el-option
                                  v-for="item in props.row.subItem[scope.$index].times"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-col>
                            <el-col>
                              <el-date-picker
                                @change="handleItemExactDateChange(props.row.subItem[scope.$index].paymentTime,props.row.subItem[scope.$index])"
                                v-model="props.row.subItem[scope.$index].paymentTime"
                                :disabled="operateType==='query'"
                                placeholder="请输入具体付款日期"
                                type="date"></el-date-picker>
                            </el-col>
                          </el-row>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="remark"
                        label="备注"
                        width="200px">
                        <template scope="scope">
                          <el-input
                            type="textarea"
                            :rows="2"
                            :disabled="operateType==='query'"
                            v-model="props.row.subItem[scope.$index].remark"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column prop="ratio" label="占比" width="80px">
                        <template scope="scope">
                          {{getProportion(props.row.subItem[scope.$index].paymentAmount)}}
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
                            type="text" size="small">移除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="100px"></el-table-column>
                <el-table-column
                  width="90px"
                  prop="seriousPayments"
                  label="是否多次付款">
                  <template scope="scope">
                    <el-checkbox
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].seriousPayments"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentAmount"
                  label="付款金额"
                  width="150px">
                  <template scope="scope">
                    <el-input
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentAmount"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="paymentTimePeriod"
                  label="付款时间"
                  width="250px">
                  <template scope="scope">
                    <el-row class="select-money">
                      <el-col>
                        <el-select
                          class="select-curTime"
                          v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentTimePeriod"
                          :disabled="operateType==='query'"
                          placeholder="请选择付款时间"
                          @change="handleCurTimeChange(cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentTimePeriod,cardFinanceInfoForm.paymentMethods._final[scope.$index])">
                          <el-option
                            v-for="item in cardFinanceInfoForm.paymentMethods._final[scope.$index].times"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col>
                        <el-date-picker
                          @change="handleExactDateChange(cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentTime,cardFinanceInfoForm.paymentMethods._final[scope.$index])"
                          v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentTime"
                          :disabled="operateType==='query'"
                          placeholder="请输入具体付款日期"
                          type="date"></el-date-picker>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注"
                  width="250px">
                  <template scope="scope">
                    <el-input
                      type="textarea"
                      :rows="2"
                      :disabled="operateType==='query'"
                      v-model="cardFinanceInfoForm.paymentMethods._final[scope.$index].remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="ratio" label="占比" width="80px">
                  <template scope="scope">
                    {{getProportion(cardFinanceInfoForm.paymentMethods._final[scope.$index].paymentAmount)}}
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="mt20">
                <el-col :span="8">
                  <el-form-item label="币种" prop="currency">
                    <el-select v-model="cardFinanceInfoForm.currency" placeholder="请选择币种"
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
                <el-col :span="8">
                  <el-form-item label="开票类型" prop="invoiceType">
                    <el-select v-model="cardFinanceInfoForm.invoiceType"
                               placeholder="请选择开票类型"
                               :disabled="operateType==='query'">
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
                  <el-form-item label="合同总金额" prop="totalConMoney">
                    <el-input :disabled="true" v-model="totalConMoney"
                              placeholder="根据上表累加(含税价)"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否收取保证金" label-width="120px">
                    <el-radio-group v-model="cardFinanceInfoForm.depositFlag" :disabled="operateType==='query'">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="cardFinanceInfoForm.depositFlag">
                <el-col :span="8">
                  <el-form-item label="保证金金额" prop="deposit">
                    <el-input v-model="cardFinanceInfoForm.deposit" :disabled="operateType==='query'"
                              placeholder="请输入保证金金额"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="付款时间" prop="payTime">
                    <el-date-picker v-model="cardFinanceInfoForm.payTime"
                                    placeholder="请输入付款时间"
                                    :disabled="operateType==='query'"
                                    type="date"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="保证金占比" prop="depositRatio">
                    {{getProportion(cardFinanceInfoForm.deposit)}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <el-card class="mt20" v-if="baseInfoForm.contractType===3&&cardFinanceInfoForm.moneyInvolved===true">
              <header slot="header">开票信息</header>
              <el-row>
                <el-col v-if="cardContentInfoForm.conSubjctName.length>1" :span="12">
                  <h4>甲方数据不只一条</h4>
                </el-col>
                <el-col v-else :span="12" class="billingInfo">
                  <h4>甲方增值税专用开票信息：</h4>
                  <el-row>
                    <el-col :span="6">
                      公司名称:
                    </el-col>
                    <el-col :span="16">
                      {{jia.companyName}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      统一社会信用代码:
                    </el-col>
                    <el-col :span="16">
                      {{jia.creditCode}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      注册地址:
                    </el-col>
                    <el-col :span="16">
                      {{jia.registerAddress}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      经营地址:
                    </el-col>
                    <el-col :span="16">
                      {{jia.managementAddress}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系电话:
                    </el-col>
                    <el-col :span="16">
                      {{jia.phone}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系电话:
                    </el-col>
                    <el-col :span="16">
                      {{jia.phone}}
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
                      {{jia.openBank}}
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
                      {{cardFinanceInfoForm.yiBillingInfo.companyName}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      银行账号:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.bankAccount}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      开 户 行:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.openBank}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系人:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.contact}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      注册地址:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.address}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      联系电话:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.phone}}
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      E-mail:
                    </el-col>
                    <el-col :span="16">
                      {{cardFinanceInfoForm.yiBillingInfo.email}}
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="tabContCheckInfo"
                     v-if="baseInfoForm.contractType===3">
          <span slot="label" class="title"><i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>合同验收与样品信息</span>
          <el-form ref="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item prop="responsible" label="验收责任人">
                  <el-input v-model="cardContCheckInfoForm.responsible" :disabled="isEnabled"
                            placeholder="请输入验收责任人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="responsibleDept" label="验收责任人部门" label-width="120px">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.responsibleDept"
                            placeholder="请输入验收责任人部门"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="!showMaterialItems">
                <el-form-item :disabled="operateType==='query'" prop="checkType" label="服务类验收方式"
                              label-width="120px">
                  <el-select
                    size="small"
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
            <el-row>
              <el-col :span="8">
                <el-form-item prop="supervisor" label="验收监督人">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.supervisor"
                            placeholder="请输入验收监督人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="supervisorDept" label="验收监督人部门" label-width="120px">
                  <el-input :disabled="isEnabled" v-model="cardContCheckInfoForm.supervisorDept"
                            placeholder="请输入验收监督人部门"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button v-if="operateType!=='query'" @click="handleAddUnionCheck" icon="plus" type="primary"
                       class="mb20">添加
            </el-button>
            <el-table :data="cardContCheckInfoForm.unionCheckPersons">
              <el-table-column prop="personName" label="联合验收人"></el-table-column>
              <el-table-column prop="personDept" label="联合验收人部门"></el-table-column>
              <el-table-column prop="required" label="是否必选">
                <template scope="scope">
                  {{cardContCheckInfoForm.unionCheckPersons[scope.$index].required===true?'是':'否'}}
                </template>
              </el-table-column>
            </el-table>
            <el-form-item prop="haveSample" label="是否有样品">
              <el-radio-group v-model="cardContCheckInfoForm.haveSample" :disabled="operateType==='query'">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-card v-if="showMaterialItems">
              <header slot="header">物资验收事项</header>
              <el-table :data="cardContCheckInfoForm.materialMatters">
                <el-table-column type="index" label="序号" width="100px"></el-table-column>
                <el-table-column prop="number" label="物料编码"></el-table-column>
                <el-table-column prop="description" label="物料描述"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
              </el-table>
            </el-card>
            <el-card v-if="!showMaterialItems">
              <header slot="header">服务验收事项<i class="errorMsg">{{cardContCheckInfoForm.serviceCheckMsg}}</i></header>
              <el-button v-if="operateType!=='query'" type="primary" @click="handleAddServiceMatter" icon="plus"
                         class="mb20">
                添加
              </el-button>
              <el-table :data="cardContCheckInfoForm.serviceMatters">
                <el-table-column type="index" label="序号" width="100px"></el-table-column>
                <el-table-column prop="name" label="服务名称"></el-table-column>
                <el-table-column prop="requirement" label="验收要求"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template scope="scope">
                    <el-button
                      v-if="cardContCheckInfoForm.serviceMatters[scope.$index].type"
                      @click="handleRemoveServiceMatter(scope.$index, cardContCheckInfoForm.serviceMatters)"
                      type="text" size="small">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合同附件及盖章信息" name="tabSealInfo" v-if="baseInfoForm.contractType!==2">
          <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px">
            <el-button type="primary" @click="handleNewSealFile" icon="plus" v-if="operateType!=='query'" class="mb20">
              新增
            </el-button>
            <template v-for="(item,index) in cardSealInfoForm.sealAttachments">
              <template v-if="index===0">
                <el-table :data="item">
                  <el-table-column type="expand" v-if="item[0].isSeal">
                    <template scope="props">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="用章次数" prop="sealTimes">
                            <el-input :disabled="operateType==='query'" v-model="props.row.sealTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="打印份数" prop="printTimes">
                            <el-input :disabled="operateType==='query'"
                                      v-model="props.row.printTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="我方留存份数" prop="retainFileNumber">
                            <el-input :disabled="operateType==='query'"
                                      v-model="props.row.retainFileNumber"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="用印后上传">
                            <el-upload
                              ref="uploadFileAfterSeal"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :with-credentials="true"
                              :on-success="handleUploadFileAfterSealSuccess"
                              :on-error="handleUploadFileAfterSealError"
                            >
                              <el-button :disabled="operateType==='query'" size="small" type="primary">上传
                              </el-button>
                              </el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item prop="useSeal">
                            <el-checkbox-group v-model="props.row.useSeal">
                              <el-checkbox
                                :disabled="operateType==='query'"
                                v-for="item in props.row.useSeals"
                                :label="item.id"
                                :key="item.id">
                                {{item.name}}
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="附件类型" width="150px">
                    <template scope="scope">
                      <el-select
                        :disabled="item[scope.$index].type===3"
                        size="small"
                        v-model="item[scope.$index].type">
                        <el-option
                          v-for="item in item[scope.$index].types"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="从协议编号" width="150px">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].code"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="文件名称" width="200px">
                    <template scope="scope">
                      <el-input :disabled="item[scope.$index].type===3"
                                v-model="item[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="upload" label="上传" width="100px">
                    <template scope="scope">
                      <el-upload
                        ref="uploadSealFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :with-credentials="true"
                        :on-success="handleUploadSealFileSuccess"
                        :on-error="handleUploadSealFileError"
                      >
                        <el-button :disabled="item[scope.$index].type===3"
                                   size="small" type="primary">上传
                        </el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isSeal" label="是否盖章" width="70px">
                    <template scope="scope">
                      <el-checkbox
                        :disabled="item[scope.$index].type===3||item[scope.$index].type==2"
                        v-model="item[scope.$index].isSeal"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注"
                    width="200px">
                    <template scope="scope">
                      <el-input
                        :disabled="item[scope.$index].type===3"
                        v-model="item[scope.$index].remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作"></el-table-column>
                </el-table>
              </template>
              <template v-else>
                <el-table :show-header="false" :data="item">
                  <el-table-column type="expand" v-if="item[0].isSeal">
                    <template scope="props">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="用章次数" prop="sealTimes">
                            <el-input :disabled="operateType==='query'||props.row.type!==1"
                                      v-model="props.row.sealTimes">
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="打印份数" prop="printTimes">
                            <el-input :disabled="operateType==='query'||props.row.type!==1"
                                      v-model="props.row.printTimes"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="我方留存份数" prop="retainFileNumber">
                            <el-input :disabled="operateType==='query'||props.row.type!==1"
                                      v-model="props.row.retainFileNumber"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="用印后上传">
                            <el-upload
                              ref="uploadFileAfterSeal"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :with-credentials="true"
                              :on-success="handleUploadFileAfterSealSuccess"
                              :on-error="handleUploadFileAfterSealError"
                            >
                              <el-button :disabled="operateType==='query'||props.row.type!==1" size="small"
                                         type="primary">上传
                              </el-button>
                              </el-button>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item prop="useSeal">
                            <el-checkbox-group v-model="props.row.useSeal">
                              <el-checkbox
                                disabled
                                v-for="item in props.row.useSeals"
                                :label="item.id"
                                :key="item.id">
                                {{item.name}}
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="附件类型" width="150px">
                    <template scope="scope">
                      <el-select
                        size="small"
                        v-model="item[scope.$index].type"
                        :disabled="operateType==='query'"
                        @change="handleChangeType(item[scope.$index].type,item[scope.$index])">
                        <el-option
                          v-for="item in item[scope.$index].types"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="code" label="从协议编号" width="150px">
                    <template scope="scope">
                      <el-input :disabled="operateType==='query'||item[scope.$index].type===3"
                                v-model="item[scope.$index].code"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="文件名称" width="200px">
                    <template scope="scope">
                      <el-input :disabled="operateType==='query'||item[scope.$index].type===3"
                                v-model="item[scope.$index].name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="upload" label="上传" width="100px">
                    <template scope="scope">
                      <el-upload
                        ref="uploadSealFile"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :with-credentials="true"
                        :on-success="handleUploadSealFileSuccess"
                        :on-error="handleUploadSealFileError"
                      >
                        <el-button :disabled="operateType==='query'||item[scope.$index].type===3"
                                   size="small" type="primary">上传
                        </el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column prop="isSeal" label="是否盖章" width="70px">
                    <template scope="scope">
                      <el-checkbox
                        :disabled="operateType==='query'||item[scope.$index].type!==1"
                        v-model="item[scope.$index].isSeal"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注"
                    width="200px">
                    <template scope="scope">
                      <el-input
                        :disabled="operateType==='query'||item[scope.$index].type===3"
                        v-model="item[scope.$index].remark"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作">
                    <template v-if="item[scope.$index].operate==='add'" scope="scope">
                      <el-button @click="handleRemoveSealItem(index, cardSealInfoForm.sealAttachments)"
                                 type="text" size="small">移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </template>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="备注" name="tabRemark">
          <el-form rel="cardRemarkInfoForm" :model="cardRemarkInfoForm" label-width="100px">
            <el-card>
              <header slot="header">其他说明</header>
              <el-form-item prop="otherInstruction">
                <el-input :disabled="operateType==='query'" style="margin-left: -100px" type="textarea"
                          placeholder="请输入内容" :rows="6"
                          v-model="cardRemarkInfoForm.otherInstruction"></el-input>
              </el-form-item>
            </el-card>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="相关数据" name="tabRelatedData"
                     v-if="cardRelatedInfoForm.contractList.length">
          <el-form rel="cardRelatedInfoForm" :model="cardRelatedInfoForm" label-width="100px">
            <el-table :data="cardRelatedInfoForm.contractList">
              <el-table-column type="index" label="序号" width="100px"></el-table-column>
              <el-table-column prop="contractCode" label="合同号"></el-table-column>
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="company" label="公司"></el-table-column>
              <el-table-column prop="startTime" label="开始时间"></el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button @click="handleContractDetail(scope.$index, scope.row)" type="text"
                             size="small">详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="其他" name="tabOtherInfo" v-if="operateType==='query'">
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
              <component :is="tabs"></component>
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
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleNewContractSupplier('formContractSupplier')">确定</el-button>
        <el-button type="primary" @click="handleNewContractSupplierCancel('formContractSupplier')">取消
        </el-button>
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
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAddNewSubject('formNewSubject')">确定</el-button>
        <el-button type="primary" @click="handleCancelAddNewSubject('formNewSubject')">取消</el-button>
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
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAddNewThirdParty('formNewThirdParty')">确定</el-button>
        <el-button type="primary" @click="handleCancelAddNewThirdParty('formNewThirdParty')">取消</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="添加联合验收人" :visible.sync="cardContCheckInfoForm.dialogAddUnionCheckVisible"
               size="small">
      <el-form ref="formAddUnionCheck" :model="formAddUnionCheck" label-width="120px"
               :rules="formAddUnionCheck.rules">
        <el-form-item prop="name" label="联合验收人">
          <el-input v-model="formAddUnionCheck.name" placeholder="请输入联合验收人"></el-input>

        </el-form-item>
        <el-form-item prop="depart" label="联合验收人部门">
          <el-input :disabled="true" v-model="formAddUnionCheck.depart" placeholder="请输入联合验收人部门"></el-input>
        </el-form-item>
        <el-form-item label="是否必选" prop="ifRequired">
          <el-radio-group v-model="formAddUnionCheck.ifRequired">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAddUnionCheckItem('formAddUnionCheck')">确定</el-button>
        <el-button type="primary" @click="handleCancelAddUnionCheck('formAddUnionCheck')">取消</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="添加服务验收事项" :visible.sync="cardContCheckInfoForm.dialogAddServiceVisible"
               size="small">
      <el-form ref="formAddServiceCheck" :model="formAddServiceCheck" label-width="100px">
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
        <el-button type="primary" @click="handleAddServiceCheckItem('formAddServiceCheck')">确定</el-button>
        <el-button type="primary" @click="handleCancelAddServiceCheck('formAddServiceCheck')">取消</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="添加附件信息" :visible.sync="cardRemarkInfoForm.dialogAddAttachmentVisible"
               size="small">
      <el-form ref="formAddAttachment" :model="formAddAttachment" label-width="100px">
        <el-form-item prop="name" label="文本名称">
          <el-form-item label="附件类型" prop="type">
            <el-select v-model="formAddAttachment.type" placeholder="请选择附件类型">
              <el-option v-for="item in formAddAttachment.typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item prop="code" label="编号">
          <el-input v-model="formAddAttachment.code" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="formAddAttachment.fileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="attachmentUrl">
          <el-input v-model="formAddAttachment.attachmentUrl" placeholder="显示附件链接地址"></el-input>
        </el-form-item>
        <el-form-item label="上传" prop="uploadFile">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="formAddAttachment.fileList"
            :with-credentials="true"
            :auto-upload="false"
            :before-upload="handlebeforeFileUpload"
            :on-success="handleFileUploadSuccess"
            :on-error="handleFileUploadError"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <footer slot="footer">
        <el-button type="primary" @click="handleAddAttachmentItem('formAddAttachment')">确定</el-button>
        <el-button type="primary" @click="handleCancelAttachment('formAddAttachment')">取消</el-button>
      </footer>
    </el-dialog>
    <el-row class="mt20">
      <el-col :span="4" :offset="4">
        <el-button v-if="operateType!=='query'" type="primary" @click="handleSave('')">保存</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="handlePreview" style="margin-left:33px"
                   v-if="baseInfoForm.contractTextType===1">预览
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button v-if="operateType!=='query'" type="primary" @click="handleSubmit">提交</el-button>
      </el-col>
    </el-row>
    <Preview :visible.sync="visible"></Preview>
  </div>
</template>
<script>
  import Api from '../../api/manageContract'
  import _ from 'lodash'
  import Preview from './components/preview.vue';

  export default {
    data() {
      let validateEffectiveDateRules = (rule, value, callback) => {
        let endTime = this.cardContentInfoForm.endTime
        if (endTime) {
          if (new Date(value) > new Date(endTime)) {
            callback(new Error('合同终止日期必须大于合同生效日期'))
          }
        }
        callback()
      }
      let validateEndDate = (rule, value, callback) => {
        let startTime = this.cardContentInfoForm.startTime
        if (startTime) {
          if (new Date(value) < new Date(startTime)) {
            callback(new Error('合同终止日期必须大于合同生效日期'))
          }
        }
        callback()
      }
      return {
        visible: false,//预览
        operateType: 'create', // create:创建，update:变更，query:查询
        updateForm: {
          visible: false,
          code: '',
          updateMode: 1,
          updateModes: [
            {
              id: 1,
              name: '原合同有效'
            },
            {
              id: 0,
              name: '原合同作废'
            }
          ],
          newCode: '',
          remark: '',
          rules: {
            code: [{required: true, message: '请输入合同编号', trigger: 'blur'}],
            remark: [{required: true, message: '请输入合同编号', trigger: 'blur'}]
          }
        },
        baseInfoForm: {
          id: '',//在更新合同是把合同id传入
          procInstId: '',//流程编号
          guid: '',//草稿箱编号
          businessOperator: '', // 业务经办人
          businessDept: '',
          contractType: '',//合同模式id
          contractTypeName: '',//合同模式名称
          businessOperators: [],//业务操作人数组
          loading: false,//业务操作人
          contractBusinessTypeName: '',//业务类型名
          contractTextType: null,
          contractTextTypeOptions: [
            {
              id: 1,
              name: '模板合同'
            },
            {
              id: 2,
              name: '非模板合同'
            }
          ],
          sealOrder: 1, // 0：我方先盖章 1：对方先盖章
          ourSealOpinion: '',
          templateId: '',//当前模版id
          templateOptions: [{
            id: '1',
            name: '模版1',
            version: '1'
          }],
          belongProject: '',
          prFlag: 1,//是否有比加单号 1：有 0：无
          prNo: '',//pr号
          contractNo: '',//合同编号
          dialogNewSubjectVisible: false,
          rules: {
            businessOperator: [{required: true, message: '请输入业务经办人', trigger: 'blur'}],
            businessDept: [{required: true, message: '请输入业务部门', trigger: 'blur'}],
            templateId: [{required: true, message: '请选择模版名称', trigger: 'blur'}],
          }
        },
        activeTabName: 'tabContInfo',
        cardContentInfoForm: {
          startTime: '',
          endTime: '',
          tableSupplierInfo: [],
          conSubjctName: [],
          thirdPartyInfo: [],
          conStandard: [],

          errorCount: 0,
          supplierErrorMsg: '',
          subjectsErrorMsg: '',
          ifFixedTerm: 1,//是否固定期限（仅在变更合同时显示）
          dialogAddContractSupplier: false,
          dialogNewThirdPartyVisible: false,
          rules: {
            startTime: [{
              validator: validateEffectiveDateRules,
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
            }]
          }
        },
        cardFinanceInfoForm: {
          moneyInvolved: true,
          oneOffPay: true,
          currency: 1,//币种1：人民币；2：美元
          currencyOptions: [
            {
              value: 1,
              label: 'CNY 人民币'
            },
            {
              value: 2,
              label: 'USD 美元'
            }
          ],
          invoiceType: null,//开票类型
          invoiceTypeOptions: [
            {
              value: 1,
              label: '增值税专用发票'
            },
            {
              value: 2,
              label: '增值税普通发票'
            },
            {
              value: 3,
              label: '普通发票'
            }
          ],
          totalAmount: 0,
          depositFlag: true,//是否收取保证金
          deposit: 0,
          depositRatio: '',
          payTime: '',
          jiaBillingInfo: {
            companyName: '红星美凯龙家居集团股份有限公司',
            creditCode: '913100006624816751',
            registerAddress: '上海市浦东新区临御路518号6楼F801室',
            managementAddress: '上海市普陀区怒江北路598号10楼',
            phone: '021-22300563',
            bankAccount: '0210 0141 7000 7578',
            openBank: '中国民生银行上海市南支行'
          },
          yiBillingInfo: {
            companyName: '上海史泰博股份有限公司',
            contact: 'echo',
            bankAccount: '0210 0141 7000 7578',
            openBank: '中国民生银行上海市南支行',
            address: '上海市浦东新区临御路518号6楼F801室',
            phone: '021-22300563',
            email: '134656343@qq.com'
          },
          paymentMethods: {
            advance: [{
              type: '预付款',
              seriousPayments: true,//是否多次付款
              paymentAmount: 0,//付款金额
              paymentTimePeriod: null,//付款方式
              paymentTime: '',//付款时间
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
          rules: {
            deposit: [{required: true, message: '请输入保证金金额', trigger: 'blur'}],
            payTime: [{required: true, message: '请输入付款时间', trigger: 'blur'}]
          },
        },
        cardContCheckInfoForm: {
          responsible: '',
          responsibleDept: '',
          checkType: '',
          checkServiceMethods: [
            {
              id: '1',
              name: '验收方式1'
            },
            {
              id: '2',
              name: '验收方式2'
            },
            {
              id: '3',
              name: '验收方式3'
            }
          ],
          supervisor: '',
          supervisorDept: '',
          haveSample: 1,
          unionCheckPersons: [],


          materialMatters: [],
          serviceMatters: [],
          serviceCheckMsg: '',
          errorCount: 0,
          dialogAddUnionCheckVisible: false,
          dialogAddServiceVisible: false
        },
        cardSealInfoForm: {
          sealAttachments: [
            [{
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

            }]
          ]
        },
        cardRemarkInfoForm: {
          otherInstruction: ''
        },
        cardRelatedInfoForm: {
          contractList: [
            /*{
             contractCode: '0001001',
             type: '类型',
             status: '状态',
             company: '公司',
             startTime: '2018-09-11'
             }*/
          ]
        },
        cardOtherInfo: {
          condition: 1,
          conditionOptions: [
            {
              value: 1,
              label: '采购申请'
            },
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
            }
          ],
        },
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
          name: '',
          depart: '',
          ifRequired: 1,
          rules: {
            name: [
              {required: true, message: '请输入验收人', trigger: 'blur'}
            ]
          }
        },
        formAddServiceCheck: {
          name: '',
          requirement: '',
          remark: ''
        },
        formAddContract: {
          name: '',
          sealTimes: '',
          printTimes: '',
          retainFileNumber: '',
          sealName: '',
          remark: '',
          ifPrint: 1
        },
        formAddAttachment: {
          type: '1',
          typeOptions: [
            {
              value: '0',
              label: '其他'
            },
            {
              value: '1',
              label: '从协议'
            },
            {
              value: '2',
              label: '合同'
            }
          ],
          fileList: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
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
        isSubmit: false
      }
    },
    created() {
      let path = this.$route.path
      if (path && path === '/conperf/conupdate') {
        ;
        this.operateType = 'update'
      }

      let query = this.$route.query
      if (JSON.stringify(query) !== '{}') {
        this.operateType = query.operateType
        this.baseInfoForm.prNo = query.currentFolio//比加单号
        this.baseInfoForm.contractType = query.curConModelId
      }
    },
    computed: {
      conVersion: function () {
        let id = this.baseInfoForm.templateId
        let templateOptions = this.baseInfoForm.templateOptions
        let result = ''
        if (templateOptions && templateOptions.length > 0) {
          for (let i = 0, len = templateOptions.length; i < len; i++) {
            if (id === templateOptions[i].id) {
              result = 'V-' + templateOptions[i].version
            }
          }
        }
        return result
      },
      totalConMoney: function () {
        const paymentMethods = this.cardFinanceInfoForm.paymentMethods
        const advance = parseFloat(paymentMethods.advance[0].paymentAmount ? paymentMethods.advance[0].paymentAmount : 0)
        const progress = parseFloat(paymentMethods.progress[0].paymentAmount ? paymentMethods.progress[0].paymentAmount : 0)
        const _final = parseFloat(paymentMethods._final[0].paymentAmount ? paymentMethods._final[0].paymentAmount : 0)
        this.cardFinanceInfoForm.totalAmount = advance + progress + _final
        return advance + progress + _final
      },
      showMaterialItems: function () {
        let result = false
        let arrConStandard = this.cardContentInfoForm.conStandard
        if (arrConStandard && arrConStandard.length > 0) {
          for (let i = 0, len = arrConStandard.length; i < len; i++) {
            if (arrConStandard[i].id) {
              result = true
            }
          }
        }
        return result
      },
      contentErrorLen: function () { // 合同内容信息错误数量
        const supplier = this.cardContentInfoForm.tableSupplierInfo
        if (supplier.length > 0) {
          console.log('success')
        } else {
          this.cardContentInfoForm.errCount = supplier
        }
        return 0
      },
      contentVisible: function () {
        let visible = false
        if (this.operateType !== 'update') {
          visible = true
        } else if (this.updateForm.visible) {
          visible = true
        }
        return visible
      },
      //查询及创建操作时不可用，变更操作选择原合同作废时可用，选择原合同有效时不可用，否则都是可用的状态
      isEnabled: function () {
        let enabled = false;
        if (this.operateType === 'update') {
          this.updateForm.updateMode ? enabled = true : enabled = false;
        }
        if (this.operateType === 'query' || this.operateType === 'create') {
          enabled = true;
        }
        return enabled;
      },
      //查询操作不可用，创建操作可用，变更操作选择原合同作废时可用，选择原合同有效时不可用，否则都是可用的状态
      isEnabled1: function () {
        let enabled = false;
        if (this.operateType === 'update') {
          this.updateForm.updateMode ? enabled = true : enabled = false;
        }
        if (this.operateType === 'query') {
          enabled = true;
        }
        if (this.operateType === 'create') {
          enabled = false;
        }
        return enabled;
      },
      isVisibleNewSupplierBtn: function () {
        let visible = false;
        if (this.operateType === 'query') {
          visible = false;
        } else if (this.cardContentInfoForm.tableSupplierInfo.length <= 0) {
          visible = true;
        }
        return visible;
      },
      tabs: function () {
        switch (this.cardOtherInfo.condition) {
          case 1:
            return 'PrTable'
          case 2:
            return 'PriceTable'
          case 3:
            return 'ContractTable'
          case 4:
            return 'OrderTable'
        }
      },
    },
    mounted() {
      const params = {};
      const query = this.$route.query, types = query.curConTypeId.split('-');
      if (JSON.stringify(query) !== '{}') {
        params.folio = query.currentFolio
        params.contractType = query.curConModelId;//合同模式
        params.contractBusinessTypeFirst = types[0];
        params.contractBusinessTypeSecond = types[1];
        params.contractBusinessTypeThird = types[2];
      }


      Api.getContractBaseInfo(params).then((data) => {
        Object.assign(this.baseInfoForm, data.data.dataMap.baseInfoForm);
        Object.assign(this.cardContentInfoForm, data.data.dataMap.cardContentInfoForm);
        Object.assign(this.cardFinanceInfoForm, data.data.dataMap.cardFinanceInfoForm);
        Object.assign(this.cardContCheckInfoForm, data.data.dataMap.cardContCheckInfoForm);
        Object.assign(this.cardSealInfoForm, data.data.dataMap.cardSealInfoForm);
        Object.assign(this.cardRemarkInfoForm, data.data.dataMap.cardRemarkInfoForm);
        Object.assign(this.cardOtherInfo, data.data.dataMap.cardOtherInfo);
        const baseInfo = data.data.dataMap.baseInfoForm;
        this.baseInfoForm.contractBusinessTypeName = baseInfo.contractBusinessTypeFirstName + '-' + baseInfo.contractBusinessTypeSecondName + '-' + baseInfo.contractBusinessTypeThirdName
        const params = {}
        params.bizTypeId = this.baseInfoForm.contractBusinessTypeThird;//业务类型
        params.templateType = (this.baseInfoForm.contractTextType === 1 ? 'TEMPLATE' : 'TEXT');
        Api.getTemplateByBizTypeId(params).then((data)=> {
          this.baseInfoForm.templateOptions = data.data.dataMap || []
        });
        console.log('Api.getContractBaseInfo');

        const paymentMethods=this.cardFinanceInfoForm.paymentMethods;
        paymentMethods.advance[0].type="预付款"
        paymentMethods.progress[0].type="进度款"
        paymentMethods._final[0].type="尾款"
      })

      this.baseInfoForm.contractTypeName = this.getContractModelName(params.contractType);
      this.baseInfoForm.contractBusinessTypeThird = types[types.length - 1];

      if (query.currentFolio) {
        this.baseInfoForm.prNo = query.currentFolio
        this.baseInfoForm.prFlag = 1
      }
    },
    methods: {
      getContractModelName(id){
        switch (id) {
          case '1':
            return '单一合同'
          case '2':
            return '简易合同'
          case '3':
            return '框架合同'
          case '4':
            return '意向合同'

        }
      },
      handlePreview() {
        this.visible = true;
      },
      handleTabClick(tab, event) {
        console.log('handleTabClick')
      },
      handleNewSubjectName() {
        this.baseInfoForm.dialogNewSubjectVisible = true
      },
      handleAddUnionCheck() {
        this.cardContCheckInfoForm.dialogAddUnionCheckVisible = true
      },
      handleAddServiceMatter(formName) {
        this.cardContCheckInfoForm.dialogAddServiceVisible = true
      },
      handleAddUnionCheckItem(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*Api.getRemoteCreatePersonsByKeyWord({key: query})
             .then((data) => {
             this.cardContCheckInfoForm.loading = false
             this.cardContCheckInfoForm.unionCheckPersons = data.data.dataMap
             })*/
            this.$refs[formName].resetFields()
            this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },

      handleCancelAddUnionCheck(formName) {
        this.$refs[formName].resetFields()
        this.cardContCheckInfoForm.dialogAddUnionCheckVisible = false
      },
      handleAddServiceCheckItem(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let index = _.findIndex(this.cardContCheckInfoForm.serviceMatters, function (chr) {
              return chr.name === curForm.model.name
            })
            if (index > -1) {
              this.$message.error('这条数据已存在咯！')
              return false
            }
            this.cardContCheckInfoForm.serviceMatters.push({
              requirement: curForm.model.requirement,
              name: curForm.model.name,
              remark: curForm.model.remark,
              type: 'add'
            })
            curForm.resetFields()
            this.cardContCheckInfoForm.dialogAddServiceVisible = false
            if (this.isSubmit) {
              this.validateForms()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancelAddServiceCheck(formName) {
        this.$refs[formName].resetFields()
        this.cardContCheckInfoForm.dialogAddServiceVisible = false
      },
      handleAttachment() {
        console.log('添加附件信息')
        this.cardRemarkInfoForm.dialogAddAttachmentVisible = true
      },
      handleAddAttachmentItem(formName) {
        this.$refs.upload.submit()
        this.$refs[formName].resetFields()
        this.cardRemarkInfoForm.dialogAddAttachmentVisible = false
      },
      handleCancelAttachment(formName) {
        this.$refs[formName].resetFields()
        this.cardRemarkInfoForm.dialogAddAttachmentVisible = false
      },
      handlebeforeFileUpload(file) {
        console.log('upload-file', file)
        return file
      },
      handleFileUploadSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
      },
      handleFileUploadError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handlebeforeFileUploadItem(file) {
        console.log('upload-file', file)
        return file
      },
      handleFileUploadSuccessItem(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
      },
      handleFileUploadErrorItem(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleContractDetail(index, row) {
        console.log('详情', index, row)
      },

      handleAddNewSubject(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            const subjects = this.formNewSubject.subjects
            const key = this.formNewSubject.search
            let index = _.findIndex(this.cardContentInfoForm.conSubjctName, function (chr) {
              return chr.code === key
            })
            if (index > -1) {
              this.$message.error('这条数据已存在咯！')
              return false
            }
            this.cardContentInfoForm.conSubjctName.push({
              code: subjects[0].companyCode,
              name: subjects[0].company,
              type: 'add'
            })
            curForm.resetFields()
            this.baseInfoForm.dialogNewSubjectVisible = false
            if (this.isSubmit) {
              this.validateForms()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancelAddNewSubject(formName) {
        this.$refs[formName].resetFields()
        this.baseInfoForm.dialogNewSubjectVisible = false
      },
      handleAddContractSupplier() {
        this.cardContentInfoForm.dialogAddContractSupplier = true
      },
      getRemoteSuppliersByKeyWord(query) {
        if (query !== '') {
          this.formContractSupplier.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formContractSupplier.loading = false
              this.formContractSupplier.suppliers = data.data.dataMap
            })
        } else {
          this.formContractSupplier.suppliers = []
        }
      },
      handleNewContractSupplier(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let suppliers = this.formContractSupplier.suppliers
            this.cardContentInfoForm.tableSupplierInfo = [{
              code: suppliers[0].companyCode,
              name: suppliers[0].company,
              type: 'add'
            }]
            curForm.resetFields()
            this.cardContentInfoForm.dialogAddContractSupplier = false
            if (this.isSubmit) {
              this.validateForms()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleNewContractSupplierCancel(formName) {
        this.$refs[formName].resetFields()
        this.cardContentInfoForm.dialogAddContractSupplier = false
      },
      handleRemoveSupplier(index, rows) {
        rows.splice(index, 1)
      },
      getRemoteSubjectsByKeyWord(query) {
        if (query !== '') {
          this.formNewSubject.loading = true
          Api.getRemoteSubjectsByKeyWord({key: query})
            .then((data) => {
              this.formNewSubject.loading = false
              this.formNewSubject.subjects = data.data.dataMap || [];
            })
        } else {
          this.formNewSubject.subjects = []
        }
      },
      handleRemoveSubect(index, rows) {
        rows.splice(index, 1)
      },
      handleNewthirdPartyInfo() {
        this.cardContentInfoForm.dialogNewThirdPartyVisible = true
      },
      handleRemoveThirdPartyInfo(index, rows) {
        rows.splice(index, 1)
      },
      getRemoteThirdPartiesByKeyWord(query) {
        if (query !== '') {
          this.formNewThirdParty.loading = true
          Api.getRemoteSuppliersByKeyWord({key: query})
            .then((data) => {
              this.formNewThirdParty.loading = false
              this.formNewThirdParty.thirdParties = data.data.dataMap
            })
        } else {
          this.formNewThirdParty.thirdParties = []
        }
      },
      handleAddNewThirdParty(formName) {
        let curForm = this.$refs[formName]
        curForm.validate((valid) => {
          if (valid) {
            let thirdParties = this.formNewThirdParty.thirdParties
            const key = this.formNewThirdParty.search
            let index = _.findIndex(this.cardContentInfoForm.thirdPartyInfo, function (chr) {
              return chr.code === key
            })
            if (index > -1) {
              this.$message.error('这条数据已存在咯！')
              return false
            }
            this.cardContentInfoForm.thirdPartyInfo.push({
              code: thirdParties[0].companyCode,
              name: thirdParties[0].company,
              type: 'add'
            })
            curForm.resetFields()
            this.cardContentInfoForm.dialogNewThirdPartyVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleCancelAddNewThirdParty(formName) {
        this.$refs[formName].resetFields()
        this.cardContentInfoForm.dialogNewThirdPartyVisible = false
      },
      handleAddAdvanceItem(type) {
        let paymentMethods = this.cardFinanceInfoForm.paymentMethods
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
        }
        _.forIn(paymentMethods, function (value, key) {
          let cur = paymentMethods[key]
          if (cur && cur[0] && cur[0].type === type) {
            cur[0].subItem.push(item)
          }
        })
      },
      handleRemoveAdvanceItem(index, rows) {
        rows.splice(index, 1)
      },
      getProportion(money) {
        let result = 0
        if (money) {
          result = parseFloat(money) / parseFloat(this.totalConMoney)
        }
        return result.toFixed(2) * 100 + '%'
      },
      handleRemoveServiceMatter(index, rows) {
        rows.splice(index, 1)
      },
      handleUploadSealFileSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadSealFileError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadFileAfterSealSuccess(res, file, fileList) {
        console.log('res', res)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      handleUploadFileAfterSealError(err, file, fileList) {
        console.log('error', err)
        console.log('file', file)
        console.log('fileList', fileList)
      },
      validateForms() {
        let errors = {
          cardContentInfoForm: {
            errorCount: 0,
            supplierErrorMsg: '',
            subjectsErrorMsg: ''
          },
          cardContCheckInfoForm: {
            errorCount: 0,
            serviceCheckMsg: ''
          }
        }
        this.$refs.cardContentInfoForm.validate((valid) => {
          if (valid) {
            const supplier = this.cardContentInfoForm.tableSupplierInfo
            const subjects = this.cardContentInfoForm.conSubjctName
            if (supplier.length === 0) {
              errors.cardContentInfoForm.errorCount += 1
              errors.cardContentInfoForm.supplierErrorMsg = '合同供应商信息不能为空'
            }
            if (subjects.length === 0) {
              errors.cardContentInfoForm.errorCount += 1
              errors.cardContentInfoForm.subjectsErrorMsg = '我方主体信息不能为空'
            }
          } else {
            this.$message.error('请填写完整信息再提交！')
            return false
          }
        })
        if (this.$refs.cardContCheckInfoForm) {
          this.$refs.cardContCheckInfoForm.validate((valid) => {
            if (valid) {
              const service = this.cardContCheckInfoForm.serviceMatters
              if (service.length === 0) {
                errors.cardContCheckInfoForm.errorCount += 1
                errors.cardContCheckInfoForm.serviceCheckMsg = '服务验收事项不能为空'
              }
            } else {
              this.$message.error('请填写完整信息再提交！')
              return false
            }
          })
        }
        this.cardContentInfoForm.errorCount = errors.cardContentInfoForm.errorCount
        this.cardContentInfoForm.supplierErrorMsg = errors.cardContentInfoForm.supplierErrorMsg
        this.cardContentInfoForm.subjectsErrorMsg = errors.cardContentInfoForm.subjectsErrorMsg
        this.cardContCheckInfoForm.errorCount = errors.cardContCheckInfoForm.errorCount
        this.cardContCheckInfoForm.serviceCheckMsg = errors.cardContCheckInfoForm.serviceCheckMsg
      },
      handleSave() {
        let startTime = this.cardContentInfoForm.startTime, endTime = this.cardContentInfoForm.endTime;
        startTime = startTime.getFullYear() + '-' + (startTime.getMonth() + 1) + '-' + startTime.getDate()
        endTime = endTime.getFullYear() + '-' + (endTime.getMonth() + 1) + '-' + endTime.getDate()
      },
      handleSubmit() {
        /* Api.getRelatedInfo({}).then((data)=> {
         this.cardRelatedInfoForm.contractList = data.data.dataMap.contractList;
         }); */
        this.isSubmit = true
        this.validateForms()
      },
      handleCurTimeChange(value, row) {
        if (value) {
          row.paymentTime = ''
        }
      },
      handleExactDateChange(value, row) {
        if (value) {
          row.paymentTimePeriod = null
        }
      },
      handleItemCurTimeChange(value, row) {
        if (value) {
          row.paymentTime = ''
        }
      },
      handleItemExactDateChange(value, row) {
        if (value) {
          row.paymentTimePeriod = null
        }
      },
      handleNewSealFile() {
        let item = [{
          operate: 'add',
          name: '',
          type: 1,
          code: '',
          types: [
            {
              id: 1,
              name: '其他'
            },
            {
              id: 2,
              name: '从协议'
            }
          ],
          isSeal: true,
          remark: ''
          /* sealTimes: '',
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
           },
           ], */

        }]
        this.cardSealInfoForm.sealAttachments.push(item)
      },
      handleQuery(id) {
        console.log('handleQuery', id)
        this.updateForm.visible = true
        //根据合同编号获取合同模式设置当前合同模式及合同类型
        // Api.getUpdateInfo()
      },
      handleDetail(id) {
        console.log('id', id)
      },
      handleChangeType(index, row) {
        index === 2 ? row.isSeal = false : row.isSeal = true;
      },
      handleRemoveSealItem(index, rows) {
        console.log('index', index);
        console.log('rows', rows);
        rows.splice(index, 1)
      },
      getRemotebusinessOperatorsByKeyWord(query){
        if (query !== '') {
          this.baseInfoForm.loading = true
          Api.getRemoteCreatePersonsByKeyWord({keyword: query})
            .then((data) => {
              this.baseInfoForm.loading = false
              this.baseInfoForm.businessOperators = data.data.dataMap
            })
        } else {
          this.baseInfoForm.businessOperators = []
        }
      },
      handleContractTextTypeChange(val){
        const params = {};
        params.bizTypeId = this.baseInfoForm.contractBusinessTypeThird
        params.templateType = (val === 1 ? 'TEMPLATE' : 'TEXT')
        Api.getTemplateByBizTypeId(params).then((data)=> {
          this.baseInfoForm.templateOptions = data.data.dataMap || [];
        });
      },
      handleBusinessOperatorChange(val){
        const businessOperators = this.baseInfoForm.businessOperators
        if (businessOperators.length) {
          for (let i = 0, len = businessOperators.length; i < len; i++) {
            if (val === businessOperators[i].userId) {
              this.baseInfoForm.businessDept = businessOperators[i].deptName
            }
          }
        }
      }
    },
    components: {
      Preview,
      PrTable: (resolve) => {
        require(['./components/tables/prTable'], resolve)
      },
      PriceTable: (resolve) => {
        require(['./components/tables/priceTable'], resolve)
      },
      ContractTable: (resolve) => {
        require(['./components/tables/contractTable'], resolve)
      },
      OrderTable: (resolve) => {
        require(['./components/tables/orderTable'], resolve)
      }
    },
    watch: {
      '$route'(to, from) {
        console.log('watch');
        // 刷新参数放到这里里面去触发就可以刷新相同界面了
        let path = this.$route.path
        if (path && path === '/conperf/conupdate') {
          console.log('request');
          this.operateType = 'update'
        }
      }

    }
  }
</script>
