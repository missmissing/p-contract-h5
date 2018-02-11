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
  }
</style>
<template>
  <div class="createCon">
    <div class="mb10 clearfix" v-if="isProcess">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl fb">{{procTitle}}</div>
    </div>
    <el-card v-if="isModify">
      <UpdateInfo ref="updateForm" :updateForm="updateForm" :visible.sync="updateVisible"></UpdateInfo>
    </el-card>
    <div v-if="contentVisible">
      <BaseInfo :disabled="!isCreate" :baseInfoForm="baseInfoForm" ref="baseInfoForm"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title"><i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息</span>
            <ContentInfo :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" :disabled="!isCreate" ref="cardContentInfoForm"></ContentInfo>
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
                    <el-select class="wp100" v-model="cardFinanceInfoForm.invoiceType" placeholder="请选择开票类型" :disabled="financeDisabled">
                      <el-option v-for="item in cardFinanceInfoForm.invoiceTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="币种" prop="currency">
                    <el-select class="wp100" v-model="cardFinanceInfoForm.currency" placeholder="请选择币种" :disabled="financeDisabled">
                      <el-option v-for="item in cardFinanceInfoForm.currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="cardFinanceInfoForm.moneyInvolved&&cardFinanceInfoForm.oneOffPay">
                <el-col :span="8">
                  <el-form-item label="付款条件" prop="paymentTimePeriod">
                    <el-select :disabled="financeDisabled" v-model="cardFinanceInfoForm.paymentTimePeriod" placeholder="请选择付款条件" class="wp100" @change="financeInfoValid">
                      <el-option v-for="item in cardFinanceInfoForm.paymentTimePeriods" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="cardFinanceInfoForm.moneyInvolved">
                <el-form-item label="备注" prop="paymentRemark">
                  <el-input :disabled="!isCreate" v-model="cardFinanceInfoForm.paymentRemark" placeholder="请输入备注" type="textarea" :rows="4"></el-input>
                  <span class="tip">注：备注内容将会被添加到合同条款中</span>
                </el-form-item>
              </el-row>
              <el-card v-show="cardFinanceInfoForm.moneyInvolved&&!cardFinanceInfoForm.oneOffPay" class="mb20">
                <header class="clearfix" slot="header">
                  付款方式<i class="tip ml20">{{cardFinanceInfoForm.paymentErrorMSG}}</i>
                </header>
                <div>
                  <el-dropdown @command="selectPayType" class="mb20">
                    <span class="router-link">付款类型<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                      <template v-for="item in cardFinanceInfoForm.payTypeOpts">
                        <el-dropdown-item :command="item.id">{{item.name}}</el-dropdown-item>
                      </template>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <template v-for="(item,index) in cardFinanceInfoForm.paymentMethods">
                    <Payment :items="[item]" :paymentTimePeriods="cardFinanceInfoForm.paymentTimePeriods" :totalAmount="cardFinanceInfoForm.totalAmount"
                             :backLogFARole="backLogFARole"
                             :show-header="index===0"></Payment>
                  </template>
                </div>
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
            <CheckInfo :cardContCheckInfoForm="cardContCheckInfoForm" :baseInfoForm="baseInfoForm" :cardContentInfoForm="cardContentInfoForm" :disabled="!isCreate" ref="cardContCheckInfoForm"></CheckInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" :baseInfoForm="baseInfoForm" :disabled="!isCreate" ref="cardSealInfoForm"></FileInfo>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="isSP">
            <span slot="label" class="title">
              <i v-if="cardSealFileForm.errorCount" class="errorCount">{{cardSealFileForm.errorCount}}</i>盖章附件
            </span>
            <SealFile :items="cardSealInfoForm.sealAttaches" :disabled="ifuploadSealFile"></SealFile>
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
            <RelateInfo :suppliers="cardContentInfoForm.tableSupplierInfo"></RelateInfo>
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
  import {mapGetters} from 'vuex'
  import {PROCESSSTATUS, PROCESSCREATORID, PROCESSROLE} from '../../store/consts'
  import bus from '../../core/bus'
  import Api from '../../api/manageContract'
  import comLoading from '../../mixins/comLoading'
  import {formatDate} from '../../filters/moment'
  import getContractType from '../../filters/contractType'
  import {routerNames, payTypes} from '../../core/consts'
  import getPageStatus from '../../util/pageStatus'
  import getStructure from '../../util/getStructure'
  import baseInfoStructure from '../../structure/create/baseInfo'
  import contentInfoStructure from '../../structure/create/contentInfo'
  import financeInfoStructure from '../../structure/create/financeInfo'
  import checkInfoStructure from '../../structure/create/checkInfo'
  import sealInfoStructure from '../../structure/create/sealInfo'

  import BaseInfo from './components/baseInfo.vue'
  import ContentInfo from './components/contentInfo.vue'
  import CheckInfo from './components/checkInfo.vue'
  import FileInfo from './components/fileInfo.vue'

  export default {
    mixins: [comLoading],
    data () {
      const payTypeOpts = Object.keys(payTypes).map(key => ({id: +key, name: payTypes[key]}))
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
        }, // 变更信息
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
        }, // 基本信息
        cardContentInfoForm: {
          ...contentInfoStructure,
          errorCount: 0
        }, // 内容信息
        cardFinanceInfoForm: {
          ...financeInfoStructure,
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
        }, // 财务信息
        cardContCheckInfoForm: {
          ...checkInfoStructure,
          errorCount: 0
        }, // 验收信息
        cardSealInfoForm: {
          ...sealInfoStructure,
          contract: [],
          others: [],
          agreenments: [],
          errorMsg: null,
          errorCount: 0
        }, // 附件信息
        cardSealFileForm: {
          errorCount: 0
        }, // 盖章信息
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
        }, // 备注信息
        contractLabels: [], // 自定义标签
        historyDatas: [], // 历史信息
        btnSubmitStatus: false
      }
    },
    computed: {
      ...mapGetters(['backLogCreator', 'backLogFARole', 'backLogSealRole', 'backLogPurchaseRole', 'isCreate', 'isModify', 'isSee', 'isProcess']),
      isSP () { // 报表查看，流程查看
        return (this.see || this.isProcess)
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
        return m
      },
      // 是否允许上传盖章后附件
      ifuploadSealFile () {
        if (this.backLogSealRole || this.backLogPurchaseRole) {
          return false
        }
        return true
      },

      /** 财务信息 **/
      // 是否涉及金额
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
      // 是否一次性付款
      oneOffPayDisabled () {
        if (this.isSP || this.baseInfoForm.contractType === 3) {
          return true
        }
        return false
      },
      // 合同总金额
      totalAmountDisabled () {
        if (!this.isSP) {
          if (this.baseInfoForm.contractType === 3) {
            return false
          }
        }
        return true
      },
      // 开票类型，币种，付款条件禁用
      financeDisabled () {
        if (this.backLogFARole) {
          return false
        }
        if (this.isSP) {
          return true
        }
        return false
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
        this.bindEvents()
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

        this.$store.commit(PROCESSSTATUS, {
          data: this.processData.dataType
        })
        // 当前用户角色为待办流程FA
        this.$store.commit(PROCESSROLE, {
          data: this.processData.roleName
        })

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
          return false
        })
      },

      // 流程审批前置动作
      callback (params) { // isSign:是否是加签人 isAgree:审批操作类型是否是同意
        const t = this
        const promises = []
        const {isSign, isAgree} = params
        if (!isSign && isAgree && (t.backLogSealRole || t.backLogPurchaseRole)) {
          promises.push(t.modifyAddNewFiles())
        } else if (t.backLogFARole) {
          promises.push(t.modifyFA())
        } else if (t.backLogCreator) {
          promises.push(t.modifyFiles())
        } else {
          return Promise.resolve()
        }
        return Promise.all(promises)
      },
      // 印章保管人，采购合同上传，盖章信息修改
      modifyAddNewFiles () {
        const sealAttachments = this.cardSealInfoForm.sealAttaches.filter(item => !item.id)
        return Api.uploadSealAttachments({
          id: this.baseInfoForm.id, type: 1, uploadPerson: true, sealAttachments
        })
      },
      // 待办流程财务信息修改
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
      // 待办流程发起人附件信息修改
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
      },
      initBaseInfo (baseInfoForm) {
        const result = getStructure(baseInfoStructure, baseInfoForm)
        Object.assign(this.baseInfoForm, result)
        // 流程发起人id
        this.$store.commit(PROCESSCREATORID, {
          data: result.creatorId
        })
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

      // 监听事件
      bindEvents () {
        bus.$on('initData', this.initData)

        bus.$on('getResponsibleInfo', this.getResponsibleInfo)
        bus.$on('getAttachmentInfo', this.getAttachmentInfo)
        bus.$on('handlePreview', this.handlePreview)

        bus.$on('getJiaBillingInfo', this.getJiaBillingInfo)
        bus.$on('getYiBillingInfo', this.getYiBillingInfo)
        bus.$on('contentInfoValid', this.contentInfoValid)

        bus.$on('checkInfoValid', this.checkInfoValid)

        bus.$on('sealInfoValid', this.sealInfoValid)
      },

      // 各选项卡表单校验
      updateInfoValid () {
        return this.$refs.updateForm.valid()
      },
      baseInfoValid () {
        return this.$refs.baseInfoForm.valid()
      },
      contentInfoValid () {
        return this.$refs.cardContentInfoForm.valid()
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
        return this.$refs.cardContCheckInfoForm.valid()
      },
      sealInfoValid () {
        return this.$refs.cardSealInfoForm.valid()
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
        const valids = [this.baseInfoValid(), this.contentInfoValid(), this.financeInfoValid(), this.remarkInfoValid()]
        if (this.$refs.updateForm) {
          valids.unshift(this.updateInfoValid())
        }
        if (this.ifCheckInfo) {
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
      ContentInfo,
      CheckInfo,
      FileInfo,
      Preview: (resolve) => {
        require(['./components/preview.vue'], resolve)
      },
      Process: (resolve) => {
        require(['../../components/process.vue'], resolve)
      },
      Payment: (resolve) => {
        require(['./components/payment.vue'], resolve)
      },
      BothInfo: (resolve) => {
        require(['./components/bothInfo.vue'], resolve)
      },
      SealFile: (resolve) => {
        require(['./components/sealFile.vue'], resolve)
      },
      OtherTables: (resolve) => {
        require(['./components/otherTables.vue'], resolve)
      },
      HistoryInfo: (resolve) => {
        require(['./components/historyInfo.vue'], resolve)
      },
      RelateInfo: (resolve) => {
        require(['./components/relateInfo.vue'], resolve)
      },
      UpdateInfo: (resolve) => {
        require(['./components/updateInfo.vue'], resolve)
      }
    }
  }
</script>
