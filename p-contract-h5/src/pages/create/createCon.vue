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
                <el-input v-model="baseInfoForm.contractNo"
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
                      <el-date-picker
                        v-model="cardContentInfoForm.startTime"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        @change="contentInfoValid"
                        :disabled="!isCreate"
                        placeholder="请输入合同生效期日期"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同终止日期" prop="endTime">
                      <el-date-picker
                        v-model="cardContentInfoForm.endTime"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        @change="contentInfoValid"
                        :disabled="!isCreate"
                        placeholder="请输入合同终止日期"
                        type="date">
                      </el-date-picker>
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
            <div v-if="baseInfoForm.templateId">
              <el-form rel="cardSealInfoForm" :model="cardSealInfoForm" label-width="100px"
                       :rules="cardSealInfoForm.rules">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="用章次数" prop="sealNumber">
                      <el-input-number
                        size="small"
                        :disabled="true"
                        v-model="cardSealInfoForm.sealNumber"
                        :min="1"
                        :max="10"
                        class="wp100"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="打印份数" prop="printNumber">
                      <el-input-number
                        :disabled="timesDisabled"
                        size="small"
                        :min="1"
                        :max="10"
                        v-model="cardSealInfoForm.printNumber"
                        class="wp100">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="留存份数" prop="remainNumber">
                      <el-input-number
                        :disabled="timesDisabled"
                        size="small"
                        :min="1"
                        :max="10"
                        v-model="cardSealInfoForm.remainNumber"
                        class="wp100"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="选择用章" prop="sealUsedInfo">
                      <el-checkbox-group :disabled="!isCreate" v-model="cardSealInfoForm.sealUsedInfo">
                        <el-checkbox label="1" name="sealInfo">公章</el-checkbox>
                        <el-checkbox label="2" name="sealInfo">法人章</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <SealTable
                v-if="cardSealInfoForm.contract&&cardSealInfoForm.contract.length"
                :items="cardSealInfoForm.contract"
                :backLogCreator="backLogCreator"
                :tplType="baseInfoForm.contractTextType"
                class="mb20"></SealTable>
              <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
            </div>
            <h4 v-else>请选择合同基本信息的模板名称！</h4>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="isSP">
            <span slot="label" class="title">
              <i v-if="cardSealFileForm.errorCount" class="errorCount">{{cardSealFileForm.errorCount}}</i>
              盖章附件
            </span>
            <SealFile
              :items="cardSealInfoForm.sealAttaches"
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
    <div class="mt20 mb20">
      <el-button v-if="!isSP" :disabled="btnSubmitStatus" type="primary" @click="handleSubmit">提交
      </el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import store from 'store';
  import {mapGetters} from 'vuex';
  import Api from '../../api/manageContract';
  import comLoading from '../../mixins/comLoading';
  import {formatDate} from '../../filters/moment';
  import getContractType from '../../filters/contractType';
  import {routerNames, processListMap} from '../../core/consts';
  import getPageStatus from '../../util/pageStatus';
  import getStructure from '../../util/getStructure';
  import baseInfoStructure from '../../structure/create/baseInfo';
  import contentInfoStructure from '../../structure/create/contentInfo';
  import financeInfoStructure from '../../structure/create/financeInfo';
  import checkInfoStructure from '../../structure/create/checkInfo';
  import sealInfoStructure from '../../structure/create/sealInfo';

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

      return {
        processData: null,
        procCode: '', //流程code
        procInstId: '', //流程id
        procTitle: '', //流程名称
        previewData: {}, // 预览数据
        visible: false, // 预览
        contractInfo: [], //合同信息
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
        baseInfoForm: {
          ...baseInfoStructure,
          loading: false, // 业务操作人
          templateOptions: [],
          businessOperators: [], // 业务操作人数组
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
          ...contentInfoStructure,
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
          ...financeInfoStructure,
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
          ...checkInfoStructure,
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
          ...sealInfoStructure,
          contract: [],
          others: [],
          agreenments: [],
          errorMsg: '',
          errorCount: 0,
          rules: {
            sealUsedInfo: [{required: true, message: '请选择用章'}]
          }
        },
        cardSealFileForm: {
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
        supplierCode: null,
        contractLabels: [],
        btnSubmitStatus: false,
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
        const {oneOffPay, totalAmount, paymentMethods} = this.cardFinanceInfoForm;
        if (oneOffPay) {
          return totalAmount;
        }
        const {earnest, advance, progress, _final, deposit} = paymentMethods;
        const m1 = parseFloat(earnest[0].paymentAmount ? earnest[0].paymentAmount : 0);
        const m2 = parseFloat(advance[0].paymentAmount ? advance[0].paymentAmount : 0);
        const m3 = parseFloat(progress[0].paymentAmount ? progress[0].paymentAmount : 0);
        const m4 = parseFloat(_final[0].paymentAmount ? _final[0].paymentAmount : 0);
        const m5 = parseFloat(deposit[0].paymentAmount ? deposit[0].paymentAmount : 0);
        return m1 + m2 + m3 + m4 + m5;
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
      'cardContentInfoForm.tableSupplierInfo': function (items) {
        if (items.length <= 1) {
          this.contentInfoValid();
        }
      },
      'cardContentInfoForm.conSubjctName': function (items) {
        if (items.length <= 1) {
          this.contentInfoValid();
        }
      },
      'cardContCheckInfoForm.serviceMatters': function (items) {
        if (!this.showMaterialItems && items.length <= 1) {
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
        Api.getContractDetailById({
          id: query.contractId,
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
        this.previewData = this.getResult();
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
          Api.getSealAttachments(params).then((res) => {
            const data = res.data.dataMap;
            const {contractAttaches, templateLabels} = data;
            const allFiles = this.getDiviFiles(contractAttaches);
            Object.assign(this.cardSealInfoForm, allFiles, {attaches: allFiles.contract});
            this.contractLabels = templateLabels;
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
        const sealAttachments = t.cardSealInfoForm.sealAttaches.filter((item => !item.id));
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
      getDiviFiles(files) {
        if (!files || !files.length) {
          return {};
        }
        const contract = [];
        const others = [];
        const agreements = [];
        files.forEach((item) => {
          const attachType = +item.attachType;
          if (attachType === 2) {
            agreements.push(item);
            return;
          }
          if (this.baseInfoForm.contractTextType === 1) {
            if (attachType === 3) {
              contract.push(item);
            } else {
              others.push(item);
            }
          } else {
            contract.push(item);
          }
        });
        return {
          contract,
          others,
          agreements
        };
      },

      getCreateInfo() {
        const {query} = this.$route;
        const {currentFolio, curConTypeId, curConModelId} = query;
        const contractType = +curConModelId;
        const types = curConTypeId.split('-');
        Object.assign(this.baseInfoForm, {
          contractBusinessTypeFirst: types[0],
          contractBusinessTypeSecond: types[1],
          contractBusinessTypeThird: types[2],
          prNo: currentFolio,
          prFlag: currentFolio ? 1 : null,
          contractTypeName: getContractType(curConModelId),
          contractType: +curConModelId
        });

        if (contractType === 4) {
          this.cardFinanceInfoForm.moneyInvolved = false;
        }

        const params = {
          folio: currentFolio,
          contractType: curConModelId,
          contractBusinessTypeFirst: types[0],
          contractBusinessTypeSecond: types[1],
          contractBusinessTypeThird: types[2]
        };
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
            if (conSubjctName && conSubjctName.length) {
              this.cardContentInfoForm.conSubjctName = conSubjctName;
            }
            if (tableSupplierInfo && tableSupplierInfo.length) {
              this.cardContentInfoForm.tableSupplierInfo = tableSupplierInfo;
            }
            const materialMatters = [];
            conStandard.forEach((item) => {
              const {materialCode, materialName} = item;
              if (materialCode) {
                materialMatters.push({
                  sampleCode: materialCode,
                  sampleDesc: materialName
                });
              }
            });
            if (!materialMatters.length) {
              return;
            }
            this.cardContCheckInfoForm.materialMatters = materialMatters;
            const exist = conStandard.some(item => item.taxCode !== 'J0');
            if (exist) {
              this.cardFinanceInfoForm.invoiceType = this.cardFinanceInfoForm.invoiceTypeOptions[0].value;
            }

            const {jiaBillingInfo, yiBillingInfo, totalAmount} = cardFinanceInfoForm;
            Object.assign(this.cardFinanceInfoForm, {
              totalAmount,
              jiaBillingInfo,
              yiBillingInfo
            });
          }
        });
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
          contractAttachAndSeal,
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
        this.initSealInfo(contractAttachAndSeal);
        this.initRemarkInfo(cardRemarkInfoForm);

        if (this.isSee) {
          this.historyDatas = simpleContract;
        }
        if (this.isProcess) {
          const items = this.cardContentInfoForm.tableSupplierInfo;
          if (items.length) {
            this.supplierCode = items[0].code;
          }
        }
      },
      initBaseInfo(baseInfoForm) {
        const result = getStructure(baseInfoStructure, baseInfoForm);
        Object.assign(this.baseInfoForm, result);
      },
      initContentInfo(cardContentInfoForm) {
        const result = getStructure(contentInfoStructure, cardContentInfoForm);
        Object.assign(this.cardContentInfoForm, result);
      },
      initFinanceInfo(cardFinanceInfoForm) {
        const result = getStructure(financeInfoStructure, cardFinanceInfoForm);
        const paymentMethods = result.paymentMethods;
        Object.keys(this.cardFinanceInfoForm.paymentMethods).forEach((key) => {
          paymentMethods[key][0].type = financeInfoStructure.paymentMethods[key][0].type;
        });
        Object.assign(this.cardFinanceInfoForm, result);
      },
      initCheckInfo(cardContCheckInfoForm) {
        if (!this.$refs.cardContCheckInfoForm) {
          return;
        }
        const result = getStructure(checkInfoStructure, cardContCheckInfoForm);
        Object.assign(this.cardContCheckInfoForm, result);
      },
      initSealInfo(contractAttachAndSeal) {
        const result = getStructure(sealInfoStructure, contractAttachAndSeal);
        Object.assign(this.cardSealInfoForm, result, this.getDiviFiles(result.attaches));
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
          const sealAttachments = this.cardSealInfoForm.sealAttaches.filter((item => !item.id)); //合同变更必须上传附件
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
          } else {
            form.supplierErrorMsg = '';
          }
          if (!conSubjctName.length) {
            errorCount++;
            form.subjectsErrorMsg = '我方主体信息不能为空';
          } else {
            form.subjectsErrorMsg = '';
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
        const form = this.cardSealInfoForm;
        const {sealAttaches} = form;
        if (this.isModify) {
          const exist = sealAttaches.some(item => !item[0].id); //合同变更必须上传附件
          if (!exist) {
            errorCount++;
            this.$message.warning('变更合同必须上传附件！');
          }
        }
        this.cardSealFileForm.errorCount = errorCount;
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
        const baseInfoForm = getStructure(baseInfoStructure, this.baseInfoForm);
        const cardContentInfoForm = getStructure(contentInfoStructure, this.cardContentInfoForm);
        const cardFinanceInfoForm = getStructure(financeInfoStructure, this.cardFinanceInfoForm);
        const cardContCheckInfoForm = getStructure(checkInfoStructure, this.cardContCheckInfoForm);
        const contractAttachAndSeal = getStructure(sealInfoStructure, this.cardSealInfoForm);
        const cardRemarkInfoForm = this.getRemarkInfo(this.cardRemarkInfoForm);
        const contractLabels = this.contractLabels;

        return {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm,
          cardContCheckInfoForm,
          contractAttachAndSeal,
          cardRemarkInfoForm,
          contractLabels
        };
      },
      handleSubmit() {
        this.validateForms().then(() => {
          this.btnSubmitStatus = true;
          const result = this.getResult();
          if (this.isCreate) {
            this.comLoading();
            Api.submit(result).then(() => {
              this.$message.success('提交成功！');
              this.$router.push({name: routerNames.con_index});
            }).finally(() => {
              this.btnSubmitStatus = false;
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
              this.btnSubmitStatus = false;
              this.comLoading(false);
            });
          }
        }).catch(() => {
          this.$message.warning('表单填写不完整！');
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
