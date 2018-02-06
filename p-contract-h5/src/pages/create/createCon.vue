<style scoped>
  .createCon .title {
    position: relative;
    padding: 0 15px;
  }

  .createCon .errorCount {
    font-style: normal;
    position: absolute;
    top: -9px;
    left: 0;
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
    <div class="mb10 clearfix" v-if="isProcess">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl" style="font-weight: bolder">{{procTitle}}</div>
    </div>
    <el-card v-if="isModify">
      <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="updateForm.rules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="合同编号" prop="code">
              <el-input :readonly="isSP" v-model="updateForm.code" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button :disabled="!updateForm.code" type="primary" @click="handleQuery">
              查找
            </el-button>
          </el-col>
        </el-row>
        <el-form-item label="变更原因" prop="remark">
          <el-input
            :readonly="isSP"
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
                <el-input :readonly="!isCreate" :class="{disabledInput:!isCreate}" v-model="baseInfoForm.contractName"
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
                  :disabled="!isCreate"
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
                <el-input :readonly="!isCreate" v-model="baseInfoForm.businessOperatorName"
                          :class="{wp100:true,disabledInput:!isCreate}"
                          placeholder="请输入业务申请人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务部门" prop="businessDeptName">
                <el-input
                  :readonly="true"
                  :class="{disabledInput:true}"
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
                <el-input :readonly="true" :class="{disabledInput:true}" v-model="contractBusinessTypeName"
                          placeholder="请输入业务类型"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="文本类型">
                <el-select class="wp100" :disabled="!isCreate" v-model="baseInfoForm.contractTextType"
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
              <el-form-item v-if="isCreate" label="模板名称" prop="templateId">
                <el-select class="wp100" :disabled="!isCreate" v-model="baseInfoForm.templateId"
                           placeholder="请选择合同模版"
                           @change="handleTemplateChange">
                  <el-option
                    v-for="item in baseInfoForm.templateOptions"
                    :key="item.templateId"
                    :label="item.templateName"
                    :value="item.templateId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else label="模板名称">
                <el-input
                  :readonly="true"
                  :class="{disabledInput:true}"
                  v-model="baseInfoForm.templateName"
                  placeholder="请选择合同模版"></el-input>
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
                <el-input :readonly="!isCreate" :class="{disabledInput:!isCreate}"
                          v-model="baseInfoForm.belongProject"
                          placeholder="请输入所属项目"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="!isCreate">
              <el-form-item label="合同编号">
                <el-input v-model="baseInfoForm.contractNo" placeholder="请输入合同编号"
                          :readonly="true" :class="{disabledInput:true}"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="盖章次序">
                <el-radio-group v-model="baseInfoForm.sealOrder" :disabled="!isCreate">
                  <el-radio :label="1">对方先盖章</el-radio>
                  <el-radio :label="0">我方先盖章</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="baseInfoForm.sealOrder===0">
            <el-col :span="16">
              <el-form-item prop="ourSealOpinion">
                <el-input :disabled="!isCreate" type="textarea" :rows="4"
                          placeholder="请输入内容"
                          v-model="baseInfoForm.ourSealOpinion"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息
            </span>
            <el-form ref="cardContentInfoForm" :model="cardContentInfoForm" label-width="120px"
                     :rules="cardContentInfoForm.rules">
              <el-card>
                <header slot="header">合同供应商信息<i class="errorMsg">{{cardContentInfoForm.supplierErrorMsg}}</i></header>
                <SupplierInfo :items="cardContentInfoForm.tableSupplierInfo"
                              @getYiBillingInfo="getYiBillingInfo"></SupplierInfo>
              </el-card>
              <el-card class="mt20">
                <header slot="header">合同我方主体名称<i class="errorMsg">{{cardContentInfoForm.subjectsErrorMsg}}</i></header>
                <SubjectInfo :items="cardContentInfoForm.conSubjctName"
                             :contractType="+baseInfoForm.contractType"
                             @getJiaBillingInfo="getJiaBillingInfo"></SubjectInfo>
              </el-card>
              <el-card v-if="baseInfoForm.contractType!==2" class="mt20">
                <header slot="header">第三方信息</header>
                <ThirdPartyInfo :items="cardContentInfoForm.thirdPartyInfo"></ThirdPartyInfo>
              </el-card>
              <el-card v-if="baseInfoForm.contractType!==4" class="mt20">
                <header slot="header">合同标的</header>
                <StandardInfo
                  :items="cardContentInfoForm.conStandard"
                  :contractBusinessTypeFirst="+baseInfoForm.contractBusinessTypeFirst"
                  :contractType="+baseInfoForm.contractType"
                ></StandardInfo>
                <el-row class="mt20" v-if="cardContentInfoForm.conStandard.length">
                  <el-form-item label="备注" prop="corporeRemark" label-width="60px">
                    <el-input
                      :disabled="!isCreate"
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
                  <el-radio-group v-model="cardContentInfoForm.effectiveCondition" :disabled="!isCreate">
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
                                      @change="contentInfoValid"
                                      :disabled="!isCreate"
                                      placeholder="请输入合同生效期日期"
                                      type="date"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同终止日期" prop="endTime">
                      <el-date-picker v-model="cardContentInfoForm.endTime"
                                      format="yyyy-MM-dd"
                                      @change="contentInfoValid"
                                      :disabled="!isCreate"
                                      placeholder="请输入合同终止日期"
                                      type="date"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="cardContentInfoForm.effectiveCondition===2">
                  <el-form-item prop="conditionDesc" class="mr20" label="备注">
                    <el-input @change="contentInfoValid" :disabled="!isCreate"
                              v-model="cardContentInfoForm.conditionDesc" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-row>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息
              <i v-if="cardFinanceInfoForm.errorCount" class="errorCount">{{cardFinanceInfoForm.errorCount}}</i>
            </span>
            <el-form ref="cardFinanceInfoForm" :model="cardFinanceInfoForm" :rules="cardFinanceInfoForm.rules"
                     label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否涉及金额">
                    <el-radio-group
                      v-model="cardFinanceInfoForm.moneyInvolved"
                      :disabled="moneyInvolvedDisabled">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
                  <el-form-item label="是否一次性付款">
                    <el-radio-group
                      v-model="cardFinanceInfoForm.oneOffPay"
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
                  >
                    <el-select
                      @change="financeInfoValid"
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
                  <template v-for="(key,index) in ['earnest','advance','progress','_final','deposit']">
                    <Payment
                      :items="cardFinanceInfoForm.paymentMethods[key]"
                      :paymentTimePeriods="cardFinanceInfoForm.paymentTimePeriods"
                      :totalAmount="cardFinanceInfoForm.totalAmount"
                      :backLogFA="backLogFA"
                      :show-header="index===0"></Payment>
                  </template>
                </div>
                <el-row class="mt20">
                  <el-form-item label="备注" prop="paymentRemark" label-width="60px">
                    <el-input
                      :disabled="!isCreate"
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
          <el-tab-pane v-if="[1,3].indexOf(baseInfoForm.contractType)>-1">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <el-form ref="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="验收责任人" prop="responsibleName">
                    <el-input class="wp100" :disabled="true" v-model="cardContCheckInfoForm.responsibleName"
                              placeholder="请输入验收责任人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="responsibleDeptName" label="验收责任人部门">
                    <el-input :disabled="true" v-model="cardContCheckInfoForm.responsibleDeptName"
                              placeholder="请输入验收责任人部门"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="!showMaterialItems&&baseInfoForm.contractBusinessTypeFirst===2">
                  <el-form-item prop="checkType" label="服务类验收方式">
                    <el-select
                      :disabled="isSP"
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
              <UnionCheckInfo :items="cardContCheckInfoForm.unionCheckPersons"></UnionCheckInfo>
              <el-form-item prop="haveSample" label="是否有样品">
                <el-radio-group v-model="cardContCheckInfoForm.haveSample" :disabled="isSP">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-card>
                <template v-if="showMaterialItems">
                  <header slot="header">物资验收事项</header>
                  <MaterialCheckInfo :items="cardContCheckInfoForm.materialMatters"></MaterialCheckInfo>
                </template>
                <template v-else>
                  <header slot="header">服务验收事项<i class="errorMsg">{{cardContCheckInfoForm.serviceCheckMsg}}</i></header>
                  <ServiceCheckInfo :items="cardContCheckInfoForm.serviceMatters"></ServiceCheckInfo>
                </template>
              </el-card>
            </el-form>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileList v-if="cardSealInfoForm.others.length" :items="cardSealInfoForm.others" class="mb20"></FileList>
            <el-form v-if="baseInfoForm.templateId" rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px"
                     :rules="cardSealInfoForm.rules">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="用章次数" prop="saleTime">
                    <el-input-number
                      size="small"
                      :disabled="true"
                      v-model="cardSealInfoForm.saleTime"
                      :min="1"
                      :max="10"
                      class="wp100"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="打印份数" prop="printTime">
                    <el-input-number
                      :disabled="timesDisabled"
                      size="small"
                      :min="1"
                      :max="10"
                      v-model="cardSealInfoForm.printTime"
                      class="wp100">
                    </el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="留存份数" prop="remainTime">
                    <el-input-number
                      :disabled="timesDisabled"
                      size="small"
                      :min="1"
                      :max="10"
                      v-model="cardSealInfoForm.remainTime"
                      class="wp100"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="选择用章" prop="saleInfos">
                    <el-checkbox-group :disabled="!isCreate" v-model="cardSealInfoForm.saleInfos">
                      <el-checkbox label="1" name="sealInfo">公章</el-checkbox>
                      <el-checkbox label="2" name="sealInfo">法人章</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <SealTable
                v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length"
                :items="cardSealInfoForm.contract"
                :backLogCreator="backLogCreator"
                :tplType="baseInfoForm.contractTextType"
                class="mb20"></SealTable>
              <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
            </el-form>
            <h4 v-else>请选择合同基本信息的模板名称！</h4>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="isSP">
            <SealFile
              :items="cardSealFileForm.sealAttaches"
              :addVisible="isSealRole||isPurchaseRole"
            ></SealFile>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label" class="title">备注
            <i v-if="cardRemarkInfoForm.errorCount" class="errorCount">{{cardRemarkInfoForm.errorCount}}</i>
          </span>
            <el-form ref="cardRemarkInfoForm" :model="cardRemarkInfoForm" :rules="cardRemarkInfoForm.rules">
              <el-form-item prop="otherInstruction" label="其他说明">
                <el-input :disabled="!isCreate" type="textarea"
                          placeholder="请输入内容" :rows="4"
                          v-model.trim="cardRemarkInfoForm.otherInstruction"
                          @change="remarkInfoValid"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="相关数据" v-if="isProcess">
            <RelateInfo :supplierCode="supplierCode"></RelateInfo>
          </el-tab-pane>
          <el-tab-pane label="其他" v-if="!isCreate">
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
          <el-tab-pane label="历史信息" v-if="isSee">
            <HistoryInfo :items="historyDatas"></HistoryInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <Process :extraFn="callback.bind(this)"></Process>
    <div class="mt20 mb20 tc">
      <el-button v-if="!isSP" :disabled="!btnSubmitStatus" type="primary" @click="handleSubmit">提交
      </el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import _ from 'lodash';
  import store from 'store';
  import {mapGetters} from 'vuex';
  import Api from '../../api/manageContract';
  import comLoading from '../../mixins/comLoading';
  import {downloadUrl, uploadUrl} from '../../api/consts';
  import {formatDate} from '../../filters/moment';
  import getContractType from '../../filters/contractType';
  import {routerNames, processListMap} from '../../core/consts';
  import getPageStatus from '../../util/pageStatus';

  import SupplierInfo from './supplierInfo.vue';
  import SubjectInfo from './subjectInfo.vue';
  import ThirdPartyInfo from './thirdPartyInfo.vue';

  export default {
    mixins: [comLoading],
    data() {
      const validateStartDateRules = (rule, value, callback) => {
        const endTime = this.cardContentInfoForm.endTime;
        if (endTime) {
          if (formatDate(new Date(value)) > formatDate(new Date(endTime))) {
            callback(new Error('合同终止日期必须大于合同生效日期'));
          }
        }
        callback();
      };
      const validateEndDate = (rule, value, callback) => {
        const startTime = this.cardContentInfoForm.startTime;
        if (startTime) {
          if (formatDate(new Date(value)) < formatDate(new Date(startTime))) {
            callback(new Error('合同终止日期必须大于合同生效日期'));
          }
        }
        callback();
      };
      const payment = {
        paymentAmount: null,
        paymentTime: null,
        paymentTimePeriod: null,
        ratio: null,
        remark: null,
        seriousPayments: null,
        subItem: []
      };
      const paymentMethods = {
        earnest: [{
          type: '定金',
          ..._.cloneDeep(payment)
        }],
        advance: [{
          type: '预付款',
          ..._.cloneDeep(payment)
        }],
        progress: [{
          type: '进度款',
          ..._.cloneDeep(payment)
        }],
        _final: [{
          type: '尾款',
          ..._.cloneDeep(payment)
        }],
        deposit: [{
          type: '保证金',
          ..._.cloneDeep(payment)
        }]
      };

      return {
        processData: null,
        procCode: '', //流程code
        procInstId: '', //流程id
        procTitle: '', //流程名称
        previewData: {}, // 预览数据
        visible: false, // 预览
        downloadUrl,
        uploadUrl,
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
          id: null,
          creatorId: null,
          contractName: '', //合同名称
          businessOperatorId: '', // 业务申请人id
          businessOperatorName: '', //业务申请人
          businessDeptId: '',
          businessDeptName: '',
          contractType: '', // 合同模式id
          contractTypeName: '', // 合同模式名称
          businessOperators: [], // 业务操作人数组
          contractTextType: 1,
          sealOrder: 1, // 0：我方先盖章 1：对方先盖章
          ourSealOpinion: '',
          templateId: '', // 当前模版id
          belongProject: '',
          prFlag: 0, // 是否有比加单号 1：有 0：无
          prNo: '', // pr号
          contractNo: '', // 合同编号
          contractBusinessTypeFirstName: '',
          contractBusinessTypeSecondName: '',
          contractBusinessTypeThirdName: '',
          loading: false, // 业务操作人
          templateOptions: [],
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
          rules: {
            contractName: [{required: true, message: '请输入合同名称'}],
            businessOperatorId: [{required: true, message: '请输入业务业务申请人'}],
            templateId: [{required: true, message: '请选择模板名称'}],
            ourSealOpinion: [{required: true, message: '请输入原因'}]
          }
        },
        cardContentInfoForm: {
          effectiveCondition: 1, //生效条件
          startTime: '',
          endTime: '',
          conditionDesc: '', //期限生效
          tableSupplierInfo: [],
          conSubjctName: [],
          thirdPartyInfo: [],
          conStandard: [],
          supplierErrorMsg: '',
          subjectsErrorMsg: '',
          errorCount: 0,
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
          invoiceType: 1, // 开票类型
          totalAmount: 0,
          jiaBillingInfo: [],
          yiBillingInfo: [],
          paymentMethods,
          paymentTimePeriod: null,
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
          paymentErrorMSG: '',
          errorCount: 0,
          rules: {
            totalAmount: [
              {required: true, message: '请输入合同总金额'},
              {type: 'number', message: '合同总金额必须为数字值'}
            ],
            payTime: [{required: true, message: '请输入付款时间'}],
            invoiceType: [{required: true, message: '请选择开票类型'}],
            paymentTimePeriod: [{required: true, message: '请输入付款条件'}]
          }
        },
        cardContCheckInfoForm: {
          responsibleId: '',
          responsibleName: '',
          responsibleDeptId: '',
          responsibleDeptName: '',
          checkType: null,
          haveSample: true,
          unionCheckPersons: [],
          materialMatters: [],
          serviceMatters: [],
          responsibles: [],
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
          serviceCheckMsg: '',
          errorCount: 0,
          rules: {
            responsibleName: [{required: true, message: '基本信息中业务申请人填写后自动带出'}],
            responsibleDeptName: [{required: true, message: '业务申请人填写后自动带出'}],
            checkType: [{required: true, message: '请选择服务类验收方式'}]
          }
        },
        cardSealInfoForm: {
          contract: [],
          others: [],
          agreenments: [],
          saleTime: 1,
          printTime: 4,
          remainTime: 2,
          saleInfos: ['1'],
          attaches: [],
          sealAttaches: [],
          errorMsg: '',
          errorCount: 0,
          rules: {
            saleInfos: [{required: true, message: '请选择用章'}]
          }
        },
        cardSealFileForm: {
          sealAttaches: [],
          errorCount: 0
        },
        cardRemarkInfoForm: {
          otherInstruction: '',
          errorCount: 0,
          rules: {
            otherInstruction: [{
              validator: (rule, value, callback) => {
                if (this.cardContentInfoForm.effectiveCondition === 1 && this.cardContentInfoForm.startTime && formatDate(this.cardContentInfoForm.startTime) < formatDate(new Date())) {
                  if (!value) {
                    callback(new Error('合同生效日期小于今天，请输入倒签原因'));
                  }
                }
                callback();
              }
            }]
          }
        },
        cardOtherInfo: {
          condition: 4,
          conditionOptions: [
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
        btnSubmitStatus: true, // 提交按钮状态
        historyDatas: []
      };
    },
    computed: {
      ...mapGetters([
        'isCreate',
        'isModify',
        'isSee',
        'isProcess'
      ]),
      isSP() { //报表查看，流程查看
        return (this.see || this.isProcess);
      },
      backLogFA() {
        let isBackLog = false;
        let isFA = false;
        if (this.isProcess) {
          isBackLog = this.processData.dataType === processListMap[0];
          isFA = isBackLog ? this.isFARole : false;
        }

        return isBackLog && isFA;
      },
      backLogCreator() {
        let isBackLog = false;
        let isCreator = false;
        if (this.isProcess) {
          isBackLog = this.processData.dataType === processListMap[0];
          const user = store.get('user');
          isCreator = isBackLog ? this.baseInfoForm.creatorId === user.userId : false;
        }
        return isBackLog && isCreator;
      },

      contentVisible() {
        let visible = false;
        if (!this.isModify) {
          visible = true;
        } else if (this.updateForm.visible) {
          visible = true;
        }
        return visible;
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
        return this.cardContentInfoForm.conStandard.some(item => !!item.materialCode);
      },
      tabs() {
        let type;
        switch (this.cardOtherInfo.condition) {
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
      supplierCode() {
        const items = this.cardContentInfoForm.tableSupplierInfo;
        if (items.length) {
          return items[0].code;
        }
        return null;
      },
      contractBusinessTypeName() {
        const {
          contractBusinessTypeFirstName,
          contractBusinessTypeSecondName,
          contractBusinessTypeThirdName
        } = this.baseInfoForm;
        return `${contractBusinessTypeFirstName}-${contractBusinessTypeSecondName}-${contractBusinessTypeThirdName}`;
      },

      moneyInvolvedDisabled() {
        if (this.isSP) {
          return true;
        } else if ([2, 4].indexOf(this.baseInfoForm.contractType) > -1) {
          return true;
        } else if (this.baseInfoForm.contractType === 3 && !this.baseInfoForm.prFlag) {
          return true;
        }
        return false;
      },
      oneOffPayDisabled() {
        if (this.isSP || this.baseInfoForm.contractType === 3) {
          return true;
        }
        return false;
      },
      totalAmountDisabled() {
        if (!this.isSP) {
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
        if (this.isSP) {
          return true;
        }
        return false;
      },
      currencyDisabled() {
        if (this.backLogFA) {
          return false;
        }
        if (this.isSP) {
          return true;
        }
        return false;
      },
      paymentTimePeriodDisabled() {
        if (this.backLogFA) {
          return false;
        }
        if (this.isSP) {
          return true;
        }
        return false;
      },
      timesDisabled() {
        if (this.isCreate || this.backLogCreator) {
          return false;
        }
        return true;
      }
    },
    watch: {
      $route() {
        this.setCurrentStatus();
      },
      'baseInfoForm.contractType': function (val) {
        if (this.isCreate) {
          if (val === 2) { // 固定格式合同
            this.cardFinanceInfoForm.moneyInvolved = true;
          }
          if (val === 4) {
            this.cardFinanceInfoForm.moneyInvolved = false;
          }
        }
      },
      'cardContentInfoForm.conStandard': function (conStandards) {
        if (this.isCreate) {
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
      'cardContCheckInfoForm.serviceMatters': function (items) {
        const len = items.length;
        if (!this.showMaterialItems && len <= 1) {
          this.checkInfoValid();
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
    created() {
      this.setCurrentStatus();
      const {query} = this.$route;
      if (this.isCreate) {
        this.getCreateInfo();
        this.handleContractTextTypeChange();
      } else if (this.isSee) {
        this.comLoading();
        Api.getUpdateInfo(query.contractNo).then((res) => {
          const data = res.data.dataMap;
          if (data) {
            this.initData(data);
          }
        }).finally(() => {
          this.comLoading(false);
        });
      } else if (this.isProcess) {
        this.processData = JSON.parse(query.processData);
        this.procCode = this.processData.procCode;
        this.procInstId = this.processData.procInstId;
        this.procTitle = this.processData.procTitle;

        this.comLoading();
        Api.getContractDetailByContractId({
          contractId: query.contractId,
          operate: 'PROCESS'
        }).then((res) => {
          const data = res.data.dataMap;
          if (data) {
            this.initData(data);
          }
        }).finally(() => {
          this.comLoading(false);
        });
      }

      if (this.isSP) {
        this.noValidate();
      }
    },
    methods: {
      getPreviewData() {
        const previewData = {};
        previewData.conStandard = this.cardContentInfoForm.conStandard || [];
        previewData.contractType = this.baseInfoForm.contractType;
        previewData.contractBusinessTypeFirst = this.baseInfoForm.contractBusinessTypeFirst;
        previewData.contractBusinessTypeThirdName = this.baseInfoForm.contractBusinessTypeThirdName;
        previewData.contractNo = this.baseInfoForm.contractNo;
        previewData.effectiveCondition = this.cardContentInfoForm.effectiveCondition;
        previewData.startTime = formatDate(this.cardContentInfoForm.startTime);
        previewData.endTime = formatDate(this.cardContentInfoForm.endTime);
        previewData.conditionDesc = this.cardContentInfoForm.conditionDesc;
        previewData.cardFinanceInfoForm = this.cardFinanceInfoForm;
        previewData.templateId = this.baseInfoForm.templateId;
        previewData.corporeRemark = this.cardContentInfoForm.corporeRemark;
        previewData.paymentRemark = this.cardFinanceInfoForm.paymentRemark;
        this.previewData = previewData;
        this.visible = true;
      },
      handlePreview() {
        if (this.isCreate) {
          this.validateForms().then(() => {
            this.getPreviewData();
          }).catch(() => {
            this.$message.error('请填写完合同信息再预览！');
          });
          return;
        }
        this.getPreviewData();
      },
      handleQuery() {
        const params = {
          code: this.updateForm.code,
          operate: 'ALTER'
        };
        // 根据合同编号获取合同模式设置当前合同模式及业务类型
        Api.getUpdateInfo(params).then((res) => {
          const data = res.data.dataMap;
          if (data) {
            this.initData(data);
            this.updateForm.visible = true;
          }
        });
      },
      getRemotebusinessOperatorsByKeyWord(keyword) {
        if (keyword !== '') {
          this.baseInfoForm.loading = true;
          Api.getRemoteCreatePersonsByKeyWord({keyword})
            .then((res) => {
              this.baseInfoForm.loading = false;
              this.baseInfoForm.businessOperators = res.data.dataMap;
            });
        } else {
          this.baseInfoForm.businessOperatorId = '';
          this.baseInfoForm.businessOperatorName = '';
          this.baseInfoForm.businessOperators = [];
        }
      },
      handleContractTextTypeChange() {
        const {contractBusinessTypeThird, contractTextType} = this.baseInfoForm;
        Api.getTemplateByBizTypeId({
          bizTypeId: contractBusinessTypeThird,
          templateType: contractTextType === 1 ? 'TEMPLATE' : 'TEXT'
        }).then((res) => {
          this.baseInfoForm.templateOptions = res.data.dataMap || [];
        });
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
            Api.getRemoteCreatePersonsByKeyWord({keyword: this.cardContCheckInfoForm.responsibleId}).then((res) => {
              const data = res.data.dataMap;
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
        const sealAttachments = t.cardSealFileForm.sealAttaches.filter((item => !item.id));
        return Api.uploadSealAttachments({
          id: t.baseInfoForm.id,
          type: 1,
          uploadPerson: true,
          sealAttachments
        });
      },
      modifyFA() {
        if (!this.financeInfoValid()) {
          this.$message.warning('合同财务信息不完整');
          return Promise.reject();
        }
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
          return Object.assign({}, item, {payType, financeMores: item.subItem});
        });
        return Api.updateFinanceByContractId({
          contractId: this.$route.query.contractId,
          currency,
          invoiceType,
          paymentTimePeriod,
          finances
        });
      },
      modifyFiles() {
        return Api.updateAttach({
          contractId: this.$route.query.contractId,
          contractAttachments: this.cardSealInfoForm.contract
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
        return this.conditionLoop(items);
      },
      handleRemove(index, rows) {
        rows.splice(index, 1);
      },
      setCurrentStatus() {
        const {query, name} = this.$route;
        if (query.processData) {
          getPageStatus(this, 3);
          return;
        }
        if (name === routerNames.con_update) {
          getPageStatus(this, 1);
          return;
        }
        if (name === routerNames.con_Check) {
          getPageStatus(this, 2);
          return;
        }
        getPageStatus(this, 0);
      },
      getYiBillingInfo(info) {
        this.cardFinanceInfoForm.yiBillingInfo = [info];
      },
      getJiaBillingInfo(info) {
        this.cardFinanceInfoForm.jiaBillingInfo.push(info);
      },
      getCreateInfo() {
        const {query} = this.$route;
        const types = query.curConTypeId.split('-');
        this.baseInfoForm.contractBusinessTypeThird = types[2];
        this.baseInfoForm.prNo = query.currentFolio;// 比加单号
        this.baseInfoForm.contractTypeName = getContractType(query.curConModelId);// 初始化合同模式
        this.baseInfoForm.contractType = +query.curConModelId;
        if (query.currentFolio) {
          this.baseInfoForm.prFlag = 1;
        }
        const params = {};
        params.folio = query.currentFolio;
        params.contractType = query.curConModelId;// 合同模式
        params.contractBusinessTypeFirst = types[0];
        params.contractBusinessTypeSecond = types[1];
        params.contractBusinessTypeThird = types[2];
        Api.getContractBaseInfo(params).then((res) => {
          const data = res.data.dataMap;
          if (data) {
            const {baseInfoForm, cardContentInfoForm, cardFinanceInfoForm} = data;
            const {
              contractBusinessTypeFirstName,
              contractBusinessTypeSecondName,
              contractBusinessTypeThirdName
            } = baseInfoForm;
            Object.assign(this.baseInfoForm, {
              contractBusinessTypeFirstName,
              contractBusinessTypeSecondName,
              contractBusinessTypeThirdName
            });

            const {conStandard, conSubjctName, tableSupplierInfo} = cardContentInfoForm;
            this.cardContentInfoForm.conSubjctName = conSubjctName;
            this.cardContentInfoForm.tableSupplierInfo = tableSupplierInfo;
            const exist = conStandard.some(item => item.taxCode !== 'J0');
            if (exist) {
              this.cardFinanceInfoForm.invoiceType = this.cardFinanceInfoForm.invoiceTypeOptions[0].value;
            }

            const {jiaBillingInfo, yiBillingInfo, totalAmount} = cardFinanceInfoForm;
            this.cardFinanceInfoForm.totalAmount = totalAmount;
            this.cardFinanceInfoForm.jiaBillingInfo = jiaBillingInfo;
            this.cardFinanceInfoForm.yiBillingInfo = yiBillingInfo;
          }
        });
      },
      getBaseInfo(data) {
        const {
          creatorId,
          contractName,
          businessOperatorName,
          businessDeptName,
          contractBusinessTypeFirstName,
          contractBusinessTypeSecondName,
          contractBusinessTypeThirdName,
          contractType,
          contractTextType,
          templateId,
          templateName,
          belongProject,
          contractNo,
          sealOrder,
          ourSealOpinion
        } = data;
        return {
          creatorId,
          contractName,
          businessOperatorName,
          businessDeptName,
          contractBusinessTypeFirstName,
          contractBusinessTypeSecondName,
          contractBusinessTypeThirdName,
          contractType,
          contractTextType,
          templateId,
          templateName,
          belongProject,
          contractNo,
          sealOrder,
          ourSealOpinion
        };
      },
      getContentInfo(data) {
        const {
          tableSupplierInfo,
          conSubjctName,
          thirdPartyInfo,
          conStandard,
          effectiveCondition,
          startTime,
          endTime,
          conditionDesc
        } = data;
        return {
          tableSupplierInfo,
          conSubjctName,
          thirdPartyInfo,
          conStandard,
          effectiveCondition,
          startTime,
          endTime,
          conditionDesc
        };
      },
      getFinanceInfo(data) {
        const {
          totalAmount,
          moneyInvolved,
          oneOffPay,
          currency,
          invoiceType,
          paymentTimePeriod,
          paymentRemark
        } = data;
        const paymentMethods = data.paymentMethods;
        Object.keys(this.cardFinanceInfoForm.paymentMethods).forEach((key) => {
          paymentMethods[key][0].type = this.cardFinanceInfoForm.paymentMethods[key][0].type;
        });
        return {
          totalAmount,
          moneyInvolved,
          oneOffPay,
          currency,
          invoiceType,
          paymentTimePeriod,
          paymentRemark,
          paymentMethods
        };
      },
      getCheckInfo(data) {
        const {
          responsibleId,
          responsibleName,
          responsibleDeptId,
          responsibleDeptName,
          checkType,
          haveSample,
          unionCheckPersons,
          materialMatters,
          serviceMatters
        } = data;
        return {
          responsibleId,
          responsibleName,
          responsibleDeptId,
          responsibleDeptName,
          checkType,
          haveSample,
          unionCheckPersons,
          materialMatters,
          serviceMatters
        };
      },
      getSealInfo(data) {
        const {
          sealNumber,
          printNumber,
          remainNumber,
          sealUsedInfo,
          attaches,
          sealAttaches
        } = data;
        const contract = [];
        const others = [];
        const agreenments = [];
        attaches.forEach((item) => {
          if (+item[0].attachType === 2) {
            agreenments.push(item[0]);
            return;
          }
          if (this.baseInfoForm.contractTextType === 1) {
            if (+item[0].attachType === 3) {
              contract.push(item[0]);
            } else {
              others.push(item[0]);
            }
          } else {
            contract.push(item[0]);
          }
        });
        return {
          contract,
          others,
          agreenments,
          sealNumber,
          printNumber,
          remainNumber,
          sealUsedInfo,
          attaches,
          sealAttaches
        };
      },
      getRemarkInfo(data) {
        const {otherInstruction} = data;
        return {otherInstruction};
      },
      initData(data) {
        const {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm,
          cardContCheckInfoForm,
          cardSealInfoForm,
          cardRemarkInfoForm,
          simpleContract
        } = data;
        if (this.baseInfoForm.prNo) {
          this.cardOtherInfo.conditionOptions.unshift({
            value: 2,
            label: '比价单信息'
          });
        }

        this.contractInfo = [baseInfoForm];
        this.initBaseInfo(baseInfoForm);
        this.initContentInfo(cardContentInfoForm);
        this.initFinanceInfo(cardFinanceInfoForm);
        this.initCheckInfo(cardContCheckInfoForm);
        this.initSealInfo(cardSealInfoForm);
        this.initRemarkInfo(cardRemarkInfoForm);

        if (this.isSee) {
          this.historyDatas = simpleContract;
        }
      },
      initBaseInfo(baseInfoForm) {
        Object.assign(this.baseInfoForm, this.getBaseInfo(baseInfoForm));
      },
      initContentInfo(cardContentInfoForm) {
        Object.assign(this.cardContentInfoForm, this.getContentInfo(cardContentInfoForm));
      },
      initFinanceInfo(cardFinanceInfoForm) {
        Object.assign(this.cardFinanceInfoForm, this.getFinanceInfo(cardFinanceInfoForm));
      },
      initCheckInfo(cardContCheckInfoForm) {
        Object.assign(this.cardContCheckInfoForm, this.getCheckInfo(cardContCheckInfoForm));
      },
      initSealInfo(cardSealInfoForm) {
        Object.assign(this.cardSealInfoForm, this.getSealInfo(cardSealInfoForm));
        Object.assign(this.cardSealFileForm, {sealAttaches: this.cardSealInfoForm.sealAttaches});
      },
      initRemarkInfo(cardRemarkInfoForm) {
        Object.assign(this.cardRemarkInfoForm, this.getRemarkInfo(cardRemarkInfoForm));
      },

      updateInfoValid() {
        let errorCount = 0;
        this.$refs.updateForm.validate((valid) => {
          if (!valid) {
            errorCount++;
            this.$message.warning('请填写变更原因再提交！');
            return;
          }
          const sealAttachments = this.cardSealFileForm.sealAttaches.filter((item => !item.id)); //合同变更必须上传附件
          if (!sealAttachments.length) {
            errorCount++;
            this.$message.warning('变更合同必须上传附件！');
          }
        });
        return !errorCount;
      },
      baseInfoValid() {
        let flag = false;
        this.$refs.baseInfoForm.validate((valid) => {
          flag = valid;
        });
        return flag;
      },
      contentInfoValid() {
        let errorCount = 0;
        const form = this.cardContentInfoForm;
        const {tableSupplierInfo, conSubjctName} = form;
        this.$refs.cardContentInfoForm.validate((valid) => {
          if (!tableSupplierInfo.length) {
            errorCount++;
            form.supplierErrorMsg = '合同供应商信息不能为空';
          }
          if (!conSubjctName.length) {
            errorCount++;
            form.subjectsErrorMsg = '我方主体信息不能为空';
          }
          if (!valid) {
            errorCount++;
          }
          form.errorCount = errorCount;
        });
        return !errorCount;
      },
      financeInfoValid() {
        let errorCount = 0;
        const form = this.cardFinanceInfoForm;
        const {
          moneyInvolved,
          oneOffPay,
          totalAmount
        } = this.cardFinanceInfoForm;
        this.$refs.cardFinanceInfoForm.validate((valid) => {
          if (moneyInvolved) {
            if (!oneOffPay) {
              if (this.totalConMoney !== totalAmount) {
                errorCount++;
              }
              if (this.checkPayCondition()) { //判断付款条件是否选择
                errorCount++;
              }
            }
          }
          if (!valid) {
            errorCount++;
          }
          form.errorCount = errorCount;
        });
        return !errorCount;
      },
      checkInfoValid() {
        let errorCount = 0;
        const form = this.cardContCheckInfoForm;
        const {serviceMatters} = form;
        this.$refs.cardContCheckInfoForm.validate((valid) => {
          if (!this.showMaterialItems) {
            if (!serviceMatters.length) {
              errorCount++;
              this.cardContCheckInfoForm.serviceCheckMsg = '服务验收事项不能为空';
            } else {
              this.cardContCheckInfoForm.serviceCheckMsg = '';
            }
          }
          if (!valid) {
            errorCount++;
          }
          form.errorCount = errorCount;
        });
        return !errorCount;
      },
      sealInfoValid() {
        let errorCount = 0;
        const form = this.cardSealInfoForm;
        this.$refs.cardSealInfoForm.validate((valid) => {
          if (!valid) {
            errorCount++;
          }
          const {contract} = form;
          const exist = contract.some(item => !item[0].fileName);
          if (exist) {
            errorCount++;
          }
          form.errorCount = errorCount;
        });
        return !errorCount;
      },
      sealFileValid() {
        let errorCount = 0;
        const form = this.cardSealFileForm;
        const {sealAttaches} = form;
        if (this.isModify) {
          const exist = sealAttaches.some(item => !item[0].id); //合同变更必须上传附件
          if (!exist) {
            errorCount++;
            this.$message.warning('变更合同必须上传附件！');
          }
        }
        form.errorCount = errorCount;
        return !errorCount;
      },
      remarkInfoValid() {
        let errorCount = 0;
        const form = this.cardRemarkInfoForm;
        this.$refs.cardRemarkInfoForm.validate((valid) => {
          if (!valid) {
            errorCount++;
          }
          form.errorCount = errorCount;
        });
        return !errorCount;
      },
      validateForms() {
        const valids = [
          this.baseInfoValid(),
          this.contentInfoValid(),
          this.financeInfoValid(),
          this.sealFileValid(),
          this.remarkInfoValid()
        ];
        if (this.isModify) {
          valids.unshift(this.updateInfoValid());
        }
        if (this.$refs.cardContCheckInfoForm) {
          valids.push(this.checkInfoValid());
        }
        if (this.$refs.cardSealInfoForm) {
          valids.push(this.sealInfoValid());
        }
        return new Promise((resolve, reject) => {
          const exist = valids.some((item => !item));
          if (exist) {
            return reject();
          }
          return resolve();
        });
      },
      noValidate() {
        this.updateForm.rules = {};
        this.baseInfoForm.rules = {};
        this.cardContentInfoForm.rules = {};
        this.cardFinanceInfoForm.rules = {};
        this.cardSealInfoForm.rules = {};
        this.cardRemarkInfoForm.rules = {};
      },

      getResult() {
        const baseInfoForm = this.getBaseInfo(this.baseInfoForm);
        const cardContentInfoForm = this.getContentInfo(this.cardContentInfoForm);
        const cardFinanceInfoForm = this.initFinanceInfo(this.cardFinanceInfoForm);
        const cardContCheckInfoForm = this.getCheckInfo(this.cardContCheckInfoForm);
        const cardSealInfoForm = this.getSealInfo(this.cardSealInfoForm);
        const cardRemarkInfoForm = this.getRemarkInfo(this.cardRemarkInfoForm);

        Object.assign(cardContentInfoForm, {
          startTime: formatDate(cardContentInfoForm.startTime),
          endTime: formatDate(cardContentInfoForm.endTime)
        });
        return {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm,
          cardContCheckInfoForm,
          cardSealInfoForm,
          cardRemarkInfoForm
        };
      },
      handleSubmit() {
        this.btnSubmitStatus = false;
        this.validateForms().then(() => {
          const result = this.getResult();
          if (this.isCreate) {
            this.comLoading();
            Api.submit(result).then(() => {
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
            updateParams.contractVo = result;
            this.comLoading();
            Api.updatedSubmit(updateParams).then(() => {
              this.$message.success('提交成功！');
              this.$router.push({name: routerNames.con_index});
            }).finally(() => {
              this.btnSubmitStatus = true;
              this.comLoading(false);
            });
          }
        }).catch(() => {
          this.$message.warning('表单填写不完整！');
        }).finally(() => {
          this.btnSubmitStatus = true;
        });
      }
    },
    filters: {
      formatDate
    },
    components: {
      FileList: (resolve) => {
        require(['./fileList.vue'], resolve);
      },
      SupplierInfo,
      SubjectInfo,
      ThirdPartyInfo,
      StandardInfo: (resolve) => {
        require(['./standardInfo.vue'], resolve);
      },
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
      },
      SealFile: (resolve) => {
        require(['./sealFile.vue'], resolve);
      },
      UnionCheckInfo: (resolve) => {
        require(['./unionCheckInfo.vue'], resolve);
      },
      MaterialCheckInfo: (resolve) => {
        require(['./materialCheckInfo.vue'], resolve);
      },
      ServiceCheckInfo: (resolve) => {
        require(['./serviceCheckInfo.vue'], resolve);
      },
      HistoryInfo: (resolve) => {
        require(['./historyInfo.vue'], resolve);
      },
      RelateInfo: (resolve) => {
        require(['./relateInfo.vue'], resolve);
      },
      AgreementInfo: (resolve) => {
        require(['./agreementInfo.vue'], resolve);
      }
    }
  };
</script>
