<style type="text/scss" lang="scss" scoped>
  .createCon {
    .title {
      position: relative;
      padding: 0 15px;
    }
    .errorCount {
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
    .errorMsg {
      color: red;
      font-style: normal;
      font-size: 12px;
      margin-left: 20px;
    }
  }
</style>
<template>
  <div class="createCon">
    <div class="mb10 clearfix" v-if="isProcess">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl fb">{{procTitle}}</div>
    </div>
    <el-card v-if="isModify">
      <UpdateInfo ref="updateForm" :updateForm="updateForm" :visible.sync="updateVisible" @init="initData"></UpdateInfo>
    </el-card>
    <div v-if="contentVisible">
      <BaseInfo :disabled="!isCreate" :baseInfoForm="baseInfoForm" ref="baseInfoForm" @getResponsibleInfo="getResponsibleInfo"
                @getAttachmentInfo="getAttachmentInfo" @handlePreview="handlePreview"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息
            </span>
            <el-card>
              <header slot="header">合同供应商信息<i class="errorMsg">{{cardContentInfoForm.supplierErrorMsg}}</i></header>
              <SupplierInfo :items="cardContentInfoForm.tableSupplierInfo" @validate="contentInfoValid" @getYiBillingInfo="getYiBillingInfo"></SupplierInfo>
            </el-card>
            <el-card class="mt20">
              <header slot="header">合同我方主体名称<i class="errorMsg">{{cardContentInfoForm.subjectsErrorMsg}}</i></header>
              <SubjectInfo :items="cardContentInfoForm.conSubjctName" :contractType="baseInfoForm.contractType" @validate="contentInfoValid" @getJiaBillingInfo="getJiaBillingInfo"></SubjectInfo>
            </el-card>
            <el-card class="mt20" v-if="ifThirdInfo" header="第三方信息">
              <ThirdPartyInfo :items="cardContentInfoForm.thirdPartyInfo"></ThirdPartyInfo>
            </el-card>
            <el-card class="mt20" v-if="ifStandardInfo" header="合同标的">
              <StandardInfo :items="cardContentInfoForm.conStandard" :contractBusinessTypeFirst="baseInfoForm.contractBusinessTypeFirst" :contractType="baseInfoForm.contractType"
              ></StandardInfo>
              <el-row class="mt20" v-if="cardContentInfoForm.conStandard.length">
                <el-form-item label="备注" prop="corporeRemark" label-width="60px">
                  <el-input :disabled="!isCreate" v-model="cardContentInfoForm.corporeRemark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
                  <span style="color:#FF0000;font-size:12px;">注：备注内容将会被添加到合同条款中</span>
                </el-form-item>
              </el-row>
            </el-card>
            <el-form ref="cardContentInfoForm" :model="cardContentInfoForm" label-width="120px" :rules="cardContentInfoForm.rules">
              <el-row class="mt20">
                <el-form-item label="生效条件" prop="effectiveCondition">
                  <el-radio-group v-model="cardContentInfoForm.effectiveCondition" :disabled="!isCreate">
                    <el-radio :label="1">附期限生效</el-radio>
                    <el-radio :label="2">附条件生效</el-radio>
                    <el-radio :label="3">签订生效</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-row v-if="ifTerm">
                  <el-col :span="8">
                    <el-form-item label="合同生效日期" prop="startTime">
                      <el-date-picker v-model="cardContentInfoForm.startTime" format="yyyy-MM-dd" value-format="timestamp" :disabled="!isCreate" placeholder="合同生效日期" type="date"
                                      @change="contentInfoValid">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同终止日期" prop="endTime">
                      <el-date-picker :disabled="!isCreate" v-model="cardContentInfoForm.endTime" format="yyyy-MM-dd" value-format="timestamp" placeholder="合同终止日期" type="date"
                                      @change="contentInfoValid">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-if="ifCondition">
                  <el-form-item prop="conditionDesc" class="mr20" label="备注">
                    <el-input :disabled="!isCreate" @change="contentInfoValid" v-model="cardContentInfoForm.conditionDesc" type="textarea" :rows="4"></el-input>
                  </el-form-item>
                </el-row>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息
              <i v-if="cardFinanceInfoForm.errorCount" class="errorCount">{{cardFinanceInfoForm.errorCount}}</i>
            </span>
            <el-form ref="cardFinanceInfoForm" :model="cardFinanceInfoForm" :rules="cardFinanceInfoForm.rules" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="是否涉及金额">
                    <el-radio-group v-model="cardFinanceInfoForm.moneyInvolved" :disabled="moneyInvolvedDisabled">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="cardFinanceInfoForm.moneyInvolved">
                  <el-form-item label="是否一次性付款">
                    <el-radio-group v-model="cardFinanceInfoForm.oneOffPay" :disabled="oneOffPayDisabled">
                      <el-radio :label="true">是</el-radio>
                      <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="cardFinanceInfoForm.moneyInvolved">
                <el-col :span="8">
                  <el-form-item label="合同总金额" prop="totalAmount">
                    <el-input :disabled="totalAmountDisabled" v-model.number="cardFinanceInfoForm.totalAmount" placeholder="根据上表累加(含税价)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开票类型" prop="invoiceType">
                    <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" placeholder="请选择开票类型" :disabled="invoiceTypeDisabled">
                      <el-option v-for="item in cardFinanceInfoForm.invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="币种" prop="currency">
                    <el-select class="wp100" v-model="cardFinanceInfoForm.currency" placeholder="请选择币种" :disabled="currencyDisabled">
                      <el-option v-for="item in cardFinanceInfoForm.currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="cardFinanceInfoForm.oneOffPay&&cardFinanceInfoForm.moneyInvolved">
                <el-col :span="8">
                  <el-form-item label="付款条件" prop="paymentTimePeriod">
                    <el-select :disabled="paymentTimePeriodDisabled" v-model="cardFinanceInfoForm.paymentTimePeriod" placeholder="请选择付款条件" class="wp100" @change="financeInfoValid">
                      <el-option v-for="item in cardFinanceInfoForm.paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-card v-if="cardFinanceInfoForm.moneyInvolved">
                <header class="clearfix" slot="header">
                  付款方式<i class="errorMsg">{{cardFinanceInfoForm.paymentErrorMSG}}</i>
                  <el-select class="fr" placeholder="选择付款类型" v-model="cardFinanceInfoForm.payType" @change="selectPayType">
                    <el-option v-for="item in cardFinanceInfoForm.payTypeOpts" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </header>
                <div v-if="!cardFinanceInfoForm.oneOffPay">
                  <template v-for="(item,index) in cardFinanceInfoForm.paymentMethods">
                    <Payment :items="[item]" :paymentTimePeriods="cardFinanceInfoForm.paymentTimePeriods" :totalAmount="cardFinanceInfoForm.totalAmount"
                             :backLogFA="backLogFA"
                             :show-header="index===0"></Payment>
                  </template>
                </div>
                <el-row class="mt20">
                  <el-form-item label="备注" prop="paymentRemark" label-width="60px">
                    <el-input :disabled="!isCreate" v-model="cardFinanceInfoForm.paymentRemark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
                    <span style="color:#FF0000;font-size:12px;">注：备注内容将会被添加到合同条款中</span>
                  </el-form-item>
                </el-row>
              </el-card>
              <el-card class="mt20">
                <header slot="header">开票信息</header>
                <BothInfo :jiaBillingInfo="cardFinanceInfoForm.jiaBillingInfo" :yiBillingInfo="cardFinanceInfoForm.yiBillingInfo"></BothInfo>
              </el-card>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="ifCheckInfo">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <el-form ref="cardContCheckInfoForm" :model="cardContCheckInfoForm" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="验收责任人" prop="responsibleName">
                    <el-input class="wp100" :disabled="true" v-model="cardContCheckInfoForm.responsibleName" placeholder="请输入验收责任人"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="responsibleDeptName" label="验收责任人部门">
                    <el-input :disabled="true" v-model="cardContCheckInfoForm.responsibleDeptName" placeholder="请输入验收责任人部门"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="ifServiceCheck">
                  <el-form-item prop="checkType" label="服务类验收方式">
                    <el-select :disabled="isSP" v-model="cardContCheckInfoForm.checkType" placeholder="请选择服务类验收方式">
                      <el-option v-for="item in cardContCheckInfoForm.checkServiceMethods" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                <template v-if="ifServiceCheck">
                  <header slot="header">服务验收事项<i class="errorMsg">{{cardContCheckInfoForm.serviceCheckMsg}}</i></header>
                  <ServiceCheckInfo :items="cardContCheckInfoForm.serviceMatters" @validate="checkInfoValid"></ServiceCheckInfo>
                </template>
                <template v-else>
                  <header slot="header">物资验收事项</header>
                  <MaterialCheckInfo :items="cardContCheckInfoForm.materialMatters"></MaterialCheckInfo>
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
                      <el-input-number size="small" :disabled="true" v-model="cardSealInfoForm.sealNumber" :min="1" :max="10" class="wp100"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="打印份数" prop="printNumber">
                      <el-input-number :disabled="timesDisabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.printNumber" class="wp100"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="留存份数" prop="remainNumber">
                      <el-input-number :disabled="timesDisabled" size="small" :min="1" :max="10" v-model="cardSealInfoForm.remainNumber" class="wp100"></el-input-number>
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
              <SealTable v-if="cardSealInfoForm.contract.length" :items="cardSealInfoForm.contract" :backLogCreator="backLogCreator" :tplType="baseInfoForm.contractTextType" class="mb20"></SealTable>
              <AgreementInfo :items="cardSealInfoForm.agreenments" class="mt20"></AgreementInfo>
            </div>
            <h4 v-else>请选择合同基本信息的模板名称！</h4>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="isSP">
            <span slot="label" class="title">
              <i v-if="cardSealFileForm.errorCount" class="errorCount">{{cardSealFileForm.errorCount}}</i>盖章附件
            </span>
            <SealFile :items="cardSealInfoForm.sealAttaches" :addVisible="ifuploadSealFile"></SealFile>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label" class="title">备注
            <i v-if="cardRemarkInfoForm.errorCount" class="errorCount">{{cardRemarkInfoForm.errorCount}}</i>
          </span>
            <el-form ref="cardRemarkInfoForm" :model="cardRemarkInfoForm" :rules="cardRemarkInfoForm.rules">
              <el-form-item prop="otherInstruction" label="其他说明">
                <el-input :disabled="!isCreate" type="textarea" placeholder="请输入内容" :rows="4" v-model.trim="cardRemarkInfoForm.otherInstruction" @change="remarkInfoValid"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="相关数据" v-if="isProcess">
            <RelateInfo :supplierCode="supplierCode"></RelateInfo>
          </el-tab-pane>
          <el-tab-pane label="其他" v-if="!isCreate">
            <OtherTables :baseInfoForm="baseInfoForm"></OtherTables>
          </el-tab-pane>
          <el-tab-pane label="历史信息" v-if="isSee">
            <HistoryInfo :items="historyDatas"></HistoryInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <Process :extraFn="callback.bind(this)"></Process>
    <div class="mt20 mb20">
      <el-button v-if="!isSP" :disabled="btnSubmitStatus" type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import store from 'store'
  import {mapGetters} from 'vuex'
  import Api from '../../api/manageContract'
  import comLoading from '../../mixins/comLoading'
  import {formatDate} from '../../filters/moment'
  import getContractType from '../../filters/contractType'
  import {routerNames, processListMap, payTypes} from '../../core/consts'
  import getPageStatus from '../../util/pageStatus'
  import getStructure from '../../util/getStructure'
  import baseInfoStructure from '../../structure/create/baseInfo'
  import contentInfoStructure from '../../structure/create/contentInfo'
  import financeInfoStructure from '../../structure/create/financeInfo'
  import checkInfoStructure from '../../structure/create/checkInfo'
  import sealInfoStructure from '../../structure/create/sealInfo'

  import BaseInfo from './baseInfo.vue'
  import SupplierInfo from './supplierInfo.vue'
  import SubjectInfo from './subjectInfo.vue'
  import ThirdPartyInfo from './thirdPartyInfo.vue'

  export default {
    mixins: [comLoading],
    data () {
      const payTypeOpts = Object.keys(payTypes).map(key => ({id: key, name: payTypes[key]}))
      return {
        processData: null, // 流程数据
        procCode: null, // 流程code
        procInstId: null, // 流程id
        procTitle: null, // 流程名称
        previewData: {}, // 预览数据
        visible: false, // 预览
        updateVisible: false,
        updateForm: {
          code: null,
          remark: null
        },
        baseInfoForm: {
          ...baseInfoStructure,
          loading: false, // 业务操作人
          templateOptions: [],
          businessOperators: [], // 业务操作人数组
          contractTextTypeOptions: [{
            id: 1, name: '合同模板'
          }, {
            id: 2, name: '合同文本'
          }],
          rules: {
            contractName: [{required: true, message: '请输入合同名称'}],
            businessOperatorId: [{required: true, message: '请输入业务业务申请人'}],
            templateId: [{required: true, message: '请选择模板名称'}],
            ourSealOpinion: [{required: true, message: '请输入原因'}]
          }
        },
        cardContentInfoForm: {
          ...contentInfoStructure,
          supplierErrorMsg: null,
          subjectsErrorMsg: null,
          errorCount: 0,
          rules: {
            startTime: [{
              required: true, message: '请输入合同生效日期'
            }, {
              validator: (rule, value, callback) => {
                const endTime = this.cardContentInfoForm.endTime
                if (endTime && value > endTime) {
                  callback(new Error('合同终止日期必须大于合同生效日期'))
                }
                callback()
              },
              trigger: 'change'
            }],
            endTime: [{
              required: true, message: '请输入合同截止日期'
            }, {
              validator: (rule, value, callback) => {
                const startTime = this.cardContentInfoForm.startTime
                if (startTime && value < startTime) {
                  callback(new Error('合同终止日期必须大于合同生效日期'))
                }
                callback()
              },
              trigger: 'change'
            }],
            effectiveCondition: [{required: true, message: '请选择生效条件'}],
            conditionDesc: [{required: true, message: '请输入附期限生效信息'}]
          }
        },
        cardFinanceInfoForm: {
          ...financeInfoStructure,
          payType: null,
          payTypeOpts,
          currencyOptions: [{
            value: 1, label: 'CNY 人民币'
          }, {
            value: 2, label: 'USD 美元'
          }, {
            value: 3, label: 'HKD 港币'
          }],
          paymentTimePeriods: [{
            id: 'Z015', name: '到票日后15天付款'
          }, {
            id: 'Z020', name: '到票日后20天付款'
          }, {
            id: 'Z025', name: '到票日后25天付款'
          }, {
            id: 'Z030', name: '到票日后30天付款'
          }, {
            id: 'Z035', name: '到票日后35天付款'
          }, {
            id: 'Z040', name: '到票日后40天付款'
          }, {
            id: 'Z045', name: '到票日后45天付款'
          }, {
            id: 'Z000', name: '立即付款'
          }],
          invoiceTypeOptions: [{
            value: 1, label: '增值税专用发票'
          }, {
            value: 2, label: '增值税普通发票'
          }],
          paymentErrorMSG: null,
          errorCount: 0,
          rules: {
            totalAmount: [{required: true, message: '请输入合同总金额'}, {type: 'number', message: '合同总金额必须为数字值'}],
            payTime: [{required: true, message: '请输入付款时间'}],
            invoiceType: [{required: true, message: '请选择开票类型'}],
            paymentTimePeriod: [{required: true, message: '请输入付款条件'}]
          }
        },
        cardContCheckInfoForm: {
          ...checkInfoStructure,
          responsibles: [],
          checkServiceMethods: [{
            id: 1, name: '收货验收'
          }, {
            id: 2, name: '按阶段验收'
          }],
          serviceCheckMsg: null,
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
          errorMsg: null,
          errorCount: 0,
          rules: {
            sealUsedInfo: [{required: true, message: '请选择用章'}]
          }
        },
        cardSealFileForm: {
          errorCount: 0
        },
        cardRemarkInfoForm: {
          otherInstruction: null,
          errorCount: 0,
          rules: {
            otherInstruction: [{
              validator: (rule, value, callback) => {
                const {effectiveCondition, startTime} = this.cardContentInfoForm
                if (effectiveCondition === 1 && startTime && formatDate(startTime) < formatDate(new Date())) {
                  if (!value) {
                    callback(new Error('合同生效日期小于今天，请输入倒签原因'))
                  }
                }
                callback()
              }
            }]
          }
        },
        supplierCode: null,
        contractLabels: [],
        historyDatas: [],
        btnSubmitStatus: false
      }
    },
    computed: {
      ...mapGetters(['isCreate', 'isModify', 'isSee', 'isProcess']),
      isSP () { // 报表查看，流程查看
        return (this.see || this.isProcess)
      },
      // 是否为待办流程且当前用户角色为财务
      backLogFA () {
        let isBackLog = false
        let isFA = false
        if (this.isProcess) {
          isBackLog = this.processData.dataType === processListMap[0]
          isFA = isBackLog ? this.isFARole : false
        }

        return isBackLog && isFA
      },
      // 是否为待办流程且当前用户为发起人
      backLogCreator () {
        let isBackLog = false
        let isCreator = false
        if (this.isProcess) {
          isBackLog = this.processData.dataType === processListMap[0]
          const user = store.get('user')
          isCreator = isBackLog ? this.baseInfoForm.creatorId === user.userId : false
        }
        return isBackLog && isCreator
      },
      // 是否为印章保管人
      isSealRole () {
        const reg = /印章保管人/g
        return this.processData ? reg.test(this.processData.roleName) : false
      },
      // 是否为采购合同上传
      isPurchaseRole () {
        const reg = /采购合同上传/g
        return this.processData ? reg.test(this.processData.roleName) : false
      },
      // 是否为财务
      isFARole () {
        return this.processData ? this.processData.roleName.indexOf('FA') > -1 : false
      },
      // 是否允许上传盖章后附件
      ifuploadSealFile () {
        return this.isSealRole || this.isPurchaseRole
      },

      contentVisible () {
        let visible = false
        if (!this.isModify) {
          visible = true
        } else if (this.updateVisible) {
          visible = true
        }
        return visible
      },
      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo () {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      },
      // 当合同模式不是固定格式合同时，显示第三方信息
      ifThirdInfo () {
        return this.baseInfoForm.contractType !== 2
      },
      // 当合同模式不是框架意向合同时，显示合同标的信息
      ifStandardInfo () {
        return this.baseInfoForm.contractType !== 4
      },
      // 附期限生效
      ifTerm () {
        return this.cardContentInfoForm.effectiveCondition === 1
      },
      // 附条件生效
      ifCondition () {
        return this.cardContentInfoForm.effectiveCondition === 2
      },
      // 是否显示服务类验收方式，服务类验收事项
      ifServiceCheck () {
        const exist = this.cardContentInfoForm.conStandard.some(item => !!item.materialCode)
        return !exist && this.baseInfoForm.contractBusinessTypeFirst === 2
      },
      // 计算分批付款金额之和
      totalConMoney () {
        const {oneOffPay, totalAmount, paymentMethods} = this.cardFinanceInfoForm
        if (oneOffPay) {
          return totalAmount
        }
        let m = 0
        paymentMethods.forEach((item) => {
          const {paymentAmount} = item
          if (paymentAmount) {
            m += parseFloat(paymentAmount)
          }
        })
        if (m !== this.cardFinanceInfoForm.totalAmount) {
          this.cardFinanceInfoForm.paymentErrorMSG = '您添加的付款金额必须等于合同总金额'
        } else {
          this.cardFinanceInfoForm.paymentErrorMSG = null
        }
        return m
      },

      moneyInvolvedDisabled () {
        const {contractType} = this.baseInfoForm
        if (this.isSP) {
          return true
        } else if ([2, 4].indexOf(contractType) > -1) {
          return true
        } else if (contractType === 3 && !this.baseInfoForm.prFlag) {
          return true
        }
        return false
      },
      oneOffPayDisabled () {
        if (this.isSP || this.baseInfoForm.contractType === 3) {
          return true
        }
        return false
      },
      totalAmountDisabled () {
        if (!this.isSP) {
          if (this.baseInfoForm.contractType === 3) {
            return false
          }
        }
        return true
      },
      invoiceTypeDisabled () {
        if (this.backLogFA) {
          return false
        }
        if (this.isSP) {
          return true
        }
        return false
      },
      currencyDisabled () {
        if (this.backLogFA) {
          return false
        }
        if (this.isSP) {
          return true
        }
        return false
      },
      paymentTimePeriodDisabled () {
        if (this.backLogFA) {
          return false
        }
        if (this.isSP) {
          return true
        }
        return false
      },
      timesDisabled () {
        if (this.isCreate || this.backLogCreator) {
          return false
        }
        return true
      }
    },
    watch: {
      $route () {
        this.setCurrentStatus()
      },
      totalConMoney (val) {
        if (val !== this.cardFinanceInfoForm.totalAmount) {
          this.cardFinanceInfoForm.paymentErrorMSG = '您添加的付款金额必须等于合同总金额'
        } else {
          this.cardFinanceInfoForm.paymentErrorMSG = null
        }
      }
    },
    created () {
      this.setCurrentStatus()
      const {query} = this.$route
      if (this.isCreate) {
        this.getCreateInfo()
      } else if (this.isSee) {
        this.comLoading()
        Api.getContractDetailByNo({
          contractNo: query.contractNo
        }).then((res) => {
          const data = res.data.dataMap
          if (data) {
            this.initData(data)
          }
        }).finally(() => {
          this.comLoading(false)
        })
      } else if (this.isProcess) {
        this.processData = JSON.parse(query.processData)
        this.procCode = this.processData.procCode
        this.procInstId = this.processData.procInstId
        this.procTitle = this.processData.procTitle

        this.comLoading()
        Api.getContractDetailById({
          id: query.contractId, operate: 'PROCESS'
        }).then((res) => {
          const data = res.data.dataMap
          if (data) {
            this.initData(data)
          }
        }).finally(() => {
          this.comLoading(false)
        })
      }

      if (this.isSP) {
        this.noValidate()
      }
    },
    methods: {
      setCurrentStatus () {
        const {query, name} = this.$route
        if (query.processData) {
          getPageStatus(this, 3)
          return
        }
        if (name === routerNames.con_update) {
          getPageStatus(this, 1)
          return
        }
        if (name === routerNames.con_Check) {
          getPageStatus(this, 2)
          return
        }
        getPageStatus(this, 0)
      },
      // 获取预览数据
      getPreviewData () {
        this.previewData = this.getResult()
        this.visible = true
      },
      // 预览按钮
      handlePreview () {
        if (this.isCreate) {
          this.validateForms().then(() => {
            this.getPreviewData()
          }).catch(() => {
            this.$message.error('请填写完合同信息再预览！')
          })
          return
        }
        this.getPreviewData()
      },
      // 获取责任人信息
      getResponsibleInfo (item) {
        const {superiorId, superiorName} = item
        Object.assign(this.cardContCheckInfoForm, {
          responsibleId: superiorId,
          responsibleName: superiorName
        })
        Api.getRemoteCreatePersonsByKeyWord({keyword: superiorId}).then((res) => {
          const data = res.data.dataMap
          if (data && data.length) {
            this.cardContCheckInfoForm.responsibleDeptName = data[0].deptName
            this.cardContCheckInfoForm.responsibleDeptId = data[0].deptCode
          } else {
            this.cardContCheckInfoForm.responsibleDeptName = null
            this.cardContCheckInfoForm.responsibleDeptId = null
          }
        })
      },
      // 获取甲方开票信息
      getJiaBillingInfo (info) {
        this.cardFinanceInfoForm.jiaBillingInfo.push(info)
      },
      // 获取乙方开票信息
      getYiBillingInfo (info) {
        this.cardFinanceInfoForm.yiBillingInfo = [info]
      },
      // 判断多次付款，付款条件是否选择
      checkPayCondition () {
        return this.cardFinanceInfoForm.paymentMethods.some((item) => {
          const {financeMores, seriousPayments, paymentAmount} = item
          if (seriousPayments) {
            if (financeMores.length) {
              return this.checkPayCondition(financeMores)
            }
            return false
          }
          if (paymentAmount) {
            return !item.paymentTimePeriod
          }
          return false
        })
      },
      // 获取合同附件，从协议附件，合同模板附件
      getDiviFiles (files) {
        if (!files || !files.length) {
          return {}
        }
        const contract = []
        const others = []
        const agreements = []
        files.forEach((item) => {
          const attachType = item.attachType
          if (attachType === 2) {
            agreements.push(item)
            return
          }
          if (this.baseInfoForm.contractTextType === 1) {
            if (attachType === 3) {
              contract.push(item)
            } else {
              others.push(item)
            }
          } else {
            contract.push(item)
          }
        })
        return {
          contract, others, agreements
        }
      },
      // 获取模板附件信息
      getAttachmentInfo (params) {
        Api.getSealAttachments(params).then((res) => {
          const data = res.data.dataMap
          if (data) {
            const {contractAttaches, templateLabels} = data
            const allFiles = this.getDiviFiles(contractAttaches)
            Object.assign(this.cardSealInfoForm, allFiles, {attaches: allFiles.contract})
            this.contractLabels = templateLabels
          }
        })
      },
      // 选择付款类型
      selectPayType (val) {
        this.cardFinanceInfoForm.paymentMethods.some((item) => {
          if (item.payType === val) {
            item.visible = true
            return true
          }
        })
      },

      // 流程审批前置动作
      callback (params) { // isSign:是否是加签人 isAgree:审批操作类型是否是同意
        const t = this
        const promises = []
        const {isSign, isAgree} = params
        if (!isSign && isAgree && (t.isSealRole || t.isPurchaseRole)) {
          promises.push(t.modifyAddNewFiles())
        } else if (t.backLogFA) {
          promises.push(t.modifyFA())
        } else if (t.backLogCreator) {
          promises.push(t.modifyFiles())
        } else {
          return Promise.resolve()
        }
        return Promise.all(promises)
      },
      modifyAddNewFiles () {
        const t = this
        const sealAttachments = t.cardSealInfoForm.sealAttaches.filter(item => !item.id)
        return Api.uploadSealAttachments({
          id: t.baseInfoForm.id, type: 1, uploadPerson: true, sealAttachments
        })
      },
      modifyFA () {
        if (!this.financeInfoValid()) {
          this.$message.warning('合同财务信息不完整')
          return Promise.reject(new Error('合同财务信息不完整'))
        }
        const {currency, invoiceType, paymentTimePeriod, paymentMethods} = this.cardFinanceInfoForm

        return Api.updateFinanceByContractId({
          contractId: this.$route.query.contractId,
          currency,
          invoiceType,
          paymentTimePeriod,
          finances: paymentMethods
        })
      },
      modifyFiles () {
        return Api.updateAttach({
          contractId: this.$route.query.contractId, contractAttachments: this.cardSealInfoForm.contract
        })
      },

      // 获取创建初始数据
      getCreateInfo () {
        const {query} = this.$route
        const {currentFolio, curConTypeId, curConModelId, curConTypeName} = query
        const contractType = +curConModelId
        const types = curConTypeId.split('-')
        const names = curConTypeName.split('-')
        Object.assign(this.baseInfoForm, {
          contractBusinessTypeFirst: +types[0],
          contractBusinessTypeSecond: types[1],
          contractBusinessTypeThird: types[2],
          contractBusinessTypeFirstName: names[0],
          contractBusinessTypeSecondName: names[1],
          contractBusinessTypeThirdName: names[2],
          prNo: currentFolio,
          prFlag: currentFolio ? 1 : null,
          contractTypeName: getContractType(curConModelId),
          contractType
        })

        if (contractType === 4) {
          this.cardFinanceInfoForm.moneyInvolved = false
        }

        const params = {
          folio: currentFolio,
          contractType,
          contractBusinessTypeFirst: types[0],
          contractBusinessTypeSecond: types[1],
          contractBusinessTypeThird: types[2]
        }
        Api.getContractBaseInfo(params).then((res) => {
          const data = res.data.dataMap
          if (data) {
            const {tableSupplierInfo, conSubjctName, conStandard, totalAmount, jiaBillingInfo, yiBillingInfo} = data

            if (conSubjctName && conSubjctName.length) {
              this.cardContentInfoForm.conSubjctName = conSubjctName
            }
            if (tableSupplierInfo && tableSupplierInfo.length) {
              this.cardContentInfoForm.tableSupplierInfo = tableSupplierInfo
            }
            const materialMatters = []
            let exist = false
            conStandard.forEach((item) => {
              const {materialCode, materialName, taxCode} = item
              if (materialCode) {
                materialMatters.push({
                  sampleCode: materialCode, sampleDesc: materialName
                })
              }
              if (taxCode !== 'J0') {
                exist = true
              }
            })
            if (materialMatters.length) {
              this.cardContCheckInfoForm.materialMatters = materialMatters
            }
            if (exist) {
              this.cardFinanceInfoForm.invoiceType = this.cardFinanceInfoForm.invoiceTypeOptions[0].value
            }

            Object.assign(this.cardFinanceInfoForm, {
              totalAmount, jiaBillingInfo, yiBillingInfo
            })
          }
        })
      },
      // 回填数据
      initData (data) {
        const {baseInfoForm, cardContentInfoForm, cardFinanceInfoForm, cardContCheckInfoForm, contractAttachAndSeal, cardRemarkInfoForm, simpleContract} = data

        this.initBaseInfo(baseInfoForm)
        this.initContentInfo(cardContentInfoForm)
        this.initFinanceInfo(cardFinanceInfoForm)
        this.initCheckInfo(cardContCheckInfoForm)
        this.initSealInfo(contractAttachAndSeal)
        this.initRemarkInfo(cardRemarkInfoForm)

        if (this.isSee) {
          this.historyDatas = simpleContract
        }
        if (this.isProcess) {
          const items = this.cardContentInfoForm.tableSupplierInfo
          if (items.length) {
            this.supplierCode = items[0].code
          }
        }
      },
      initBaseInfo (baseInfoForm) {
        const result = getStructure(baseInfoStructure, baseInfoForm)
        Object.assign(this.baseInfoForm, result)
      },
      initContentInfo (cardContentInfoForm) {
        const result = getStructure(contentInfoStructure, cardContentInfoForm)
        Object.assign(this.cardContentInfoForm, result)
      },
      initFinanceInfo (cardFinanceInfoForm) {
        const paymentMethods = []
        financeInfoStructure.paymentMethods.forEach((originItem) => {
          const exist = cardFinanceInfoForm.paymentMethods.some((item) => {
            if (originItem.payType === item.payType) {
              paymentMethods.push(Object.assign(item, {visible: true}))
              return true
            }
            return false
          })
          if (!exist) {
            paymentMethods.push(originItem)
          }
        })
        cardFinanceInfoForm.paymentMethods = paymentMethods
        const result = getStructure(financeInfoStructure, cardFinanceInfoForm)
        Object.assign(this.cardFinanceInfoForm, result)
      },
      initCheckInfo (cardContCheckInfoForm) {
        if (!this.$refs.cardContCheckInfoForm) {
          return
        }
        const result = getStructure(checkInfoStructure, cardContCheckInfoForm)
        Object.assign(this.cardContCheckInfoForm, result)
      },
      initSealInfo (contractAttachAndSeal) {
        const result = getStructure(sealInfoStructure, contractAttachAndSeal)
        Object.assign(this.cardSealInfoForm, result, this.getDiviFiles(result.attaches))
      },
      initRemarkInfo (cardRemarkInfoForm) {
        Object.assign(this.cardRemarkInfoForm, {otherInstruction: cardRemarkInfoForm.otherInstruction})
      },

      // 各选项卡表单校验
      updateInfoValid () {
        return this.$refs.updateForm.valid()
      },
      baseInfoValid () {
        return this.$refs.baseInfoForm.valid()
      },
      contentInfoValid () {
        let errorCount = 0
        const form = this.cardContentInfoForm
        const {tableSupplierInfo, conSubjctName} = form
        this.$refs.cardContentInfoForm.validate((valid) => {
          if (!tableSupplierInfo.length) {
            errorCount++
            form.supplierErrorMsg = '合同供应商信息不能为空'
          } else {
            form.supplierErrorMsg = null
          }
          if (!conSubjctName.length) {
            errorCount++
            form.subjectsErrorMsg = '我方主体信息不能为空'
          } else {
            form.subjectsErrorMsg = null
          }
          if (!valid) {
            errorCount++
          }
          form.errorCount = errorCount
        })
        return !errorCount
      },
      financeInfoValid () {
        let errorCount = 0
        const form = this.cardFinanceInfoForm
        const {moneyInvolved, oneOffPay, totalAmount} = this.cardFinanceInfoForm
        this.$refs.cardFinanceInfoForm.validate((valid) => {
          if (moneyInvolved) {
            if (!oneOffPay) {
              if (this.totalConMoney !== totalAmount) {
                errorCount++
              }
              if (this.checkPayCondition()) { // 判断付款条件是否选择
                errorCount++
              }
            }
          }
          if (!valid) {
            errorCount++
          }
          form.errorCount = errorCount
        })
        return !errorCount
      },
      checkInfoValid () {
        let errorCount = 0
        const form = this.cardContCheckInfoForm
        const {serviceMatters} = form
        this.$refs.cardContCheckInfoForm.validate((valid) => {
          if (this.ifServiceCheck) {
            if (!serviceMatters.length) {
              errorCount++
              this.cardContCheckInfoForm.serviceCheckMsg = '服务验收事项不能为空'
            } else {
              this.cardContCheckInfoForm.serviceCheckMsg = null
            }
          }
          if (!valid) {
            errorCount++
          }
          form.errorCount = errorCount
        })
        return !errorCount
      },
      sealInfoValid () {
        let errorCount = 0
        const form = this.cardSealInfoForm
        this.$refs.cardSealInfoForm.validate((valid) => {
          if (!valid) {
            errorCount++
          }
          const {contract} = form
          const exist = contract.some(item => !item[0].fileName)
          if (exist) {
            errorCount++
          }
          form.errorCount = errorCount
        })
        return !errorCount
      },
      sealFileValid () {
        let errorCount = 0
        const form = this.cardSealInfoForm
        const {sealAttaches} = form
        if (this.isModify) {
          const exist = sealAttaches.some(item => !item[0].id) // 合同变更必须上传附件
          if (!exist) {
            errorCount++
            this.$message.warning('变更合同必须上传附件！')
          }
        }
        this.cardSealFileForm.errorCount = errorCount
        return !errorCount
      },
      remarkInfoValid () {
        let errorCount = 0
        const form = this.cardRemarkInfoForm
        this.$refs.cardRemarkInfoForm.validate((valid) => {
          if (!valid) {
            errorCount++
          }
          form.errorCount = errorCount
        })
        return !errorCount
      },
      // 校验全部
      validateForms () {
        const valids = [this.baseInfoValid(), this.contentInfoValid(), this.financeInfoValid(), this.sealFileValid(), this.remarkInfoValid()]
        if (this.isModify) {
          valids.unshift(this.updateInfoValid())
        }
        if (this.$refs.cardContCheckInfoForm) {
          valids.push(this.checkInfoValid())
        }
        if (this.$refs.cardSealInfoForm) {
          valids.push(this.sealInfoValid())
        }
        return new Promise((resolve, reject) => {
          const exist = valids.some(item => !item)
          if (exist) {
            return reject(new Error('验证不通过'))
          }
          return resolve()
        })
      },
      // 取消校验全部
      noValidate () {
        this.cardContentInfoForm.rules = {}
        this.cardFinanceInfoForm.rules = {}
        this.cardSealInfoForm.rules = {}
        this.cardRemarkInfoForm.rules = {}
      },

      // 删除
      handleRemove (index, rows) {
        rows.splice(index, 1)
      },
      // 获取全部数据
      getResult () {
        const baseInfoForm = getStructure(baseInfoStructure, this.baseInfoForm)
        const cardContentInfoForm = getStructure(contentInfoStructure, this.cardContentInfoForm)
        const cardFinanceInfoForm = getStructure(financeInfoStructure, this.cardFinanceInfoForm)
        const cardContCheckInfoForm = getStructure(checkInfoStructure, this.cardContCheckInfoForm)
        const contractAttachAndSeal = getStructure(sealInfoStructure, this.cardSealInfoForm)
        const cardRemarkInfoForm = this.cardRemarkInfoForm
        const contractLabels = this.contractLabels

        return {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm,
          cardContCheckInfoForm,
          contractAttachAndSeal,
          cardRemarkInfoForm,
          contractLabels
        }
      },
      // 提交
      handleSubmit () {
        this.validateForms().then(() => {
          this.btnSubmitStatus = true
          const result = this.getResult()
          if (this.isCreate) {
            this.comLoading()
            Api.submit(result).then(() => {
              this.$message.success('提交成功！')
              this.$router.push({name: routerNames.con_index})
            }).finally(() => {
              this.btnSubmitStatus = false
              this.comLoading(false)
            })
          } else {
            const exist = this.cardSealInfoForm.sealAttaches.some(item => !item.id) // 合同变更必须上传附件
            if (!exist) {
              this.$message.warning('变更合同必须上传附件！')
              return
            }
            this.comLoading()
            Api.updatedSubmit({
              alterMode: 1, alterRemark: this.updateForm.remark, contractVo: result
            }).then(() => {
              this.$message.success('提交成功！')
              this.$router.push({name: routerNames.con_index})
            }).finally(() => {
              this.btnSubmitStatus = false
              this.comLoading(false)
            })
          }
        }).catch(() => {
          this.$message.warning('表单填写不完整！')
        })
      }
    },
    filters: {
      formatDate
    },
    components: {
      BaseInfo,
      SupplierInfo,
      SubjectInfo,
      ThirdPartyInfo,
      StandardInfo: (resolve) => {
        require(['./standardInfo.vue'], resolve)
      },
      Preview: (resolve) => {
        require(['./preview.vue'], resolve)
      },
      Process: (resolve) => {
        require(['../../components/process.vue'], resolve)
      },
      FileList: (resolve) => {
        require(['./fileList.vue'], resolve)
      },
      Payment: (resolve) => {
        require(['./payment.vue'], resolve)
      },
      BothInfo: (resolve) => {
        require(['./bothInfo.vue'], resolve)
      },
      SealTable: (resolve) => {
        require(['./sealTable.vue'], resolve)
      },
      SealFile: (resolve) => {
        require(['./sealFile.vue'], resolve)
      },
      UnionCheckInfo: (resolve) => {
        require(['./unionCheckInfo.vue'], resolve)
      },
      MaterialCheckInfo: (resolve) => {
        require(['./materialCheckInfo.vue'], resolve)
      },
      ServiceCheckInfo: (resolve) => {
        require(['./serviceCheckInfo.vue'], resolve)
      },
      OtherTables: (resolve) => {
        require(['./otherTables.vue'], resolve)
      },
      HistoryInfo: (resolve) => {
        require(['./historyInfo.vue'], resolve)
      },
      RelateInfo: (resolve) => {
        require(['./relateInfo.vue'], resolve)
      },
      AgreementInfo: (resolve) => {
        require(['./agreementInfo.vue'], resolve)
      },
      UpdateInfo: (resolve) => {
        require(['./updateInfo.vue'], resolve)
      }
    }
  }
</script>
