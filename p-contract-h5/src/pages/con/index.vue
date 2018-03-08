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
    <div class="mb10 clearfix" v-if="procInstId">
      <div class="fl fb">{{procTitle}}</div>
      <div class="fr mr20">流程编号 {{procInstId}}</div>
    </div>
    <el-card v-if="showUpdateForm">
      <UpdateInfo ref="updateForm" :updateForm="updateForm" :visible.sync="updateVisible"></UpdateInfo>
    </el-card>
    <div v-show="showMain">
      <BaseInfo :baseInfoForm="baseInfoForm" ref="baseInfoForm"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title"><i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息</span>
            <ContentInfo :cardContentInfoForm="cardContentInfoForm" ref="cardContentInfoForm"></ContentInfo>
          </el-tab-pane>
          <el-tab-pane v-if="showCustomLabel">
            <span slot="label" class="title"><i v-if="customLabelForm.errorCount" class="errorCount">{{customLabelForm.errorCount}}</i>合同内容信息（补充）</span>
            <CustomLabelInfo :items="customLabelForm.contractLabels" ref="customLabelForm"></CustomLabelInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息
              <i v-if="cardFinanceInfoForm.errorCount" class="errorCount">{{cardFinanceInfoForm.errorCount}}</i>
            </span>
            <FincanceInfo :cardFinanceInfoForm="cardFinanceInfoForm" ref="cardFinanceInfoForm"></FincanceInfo>
          </el-tab-pane>
          <el-tab-pane v-if="ifCheckInfo">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <CheckInfo :cardContCheckInfoForm="cardContCheckInfoForm" ref="cardContCheckInfoForm"></CheckInfo>
          </el-tab-pane>
          <el-tab-pane v-if="showSealInfo">
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" ref="cardSealInfoForm"></FileInfo>
          </el-tab-pane>
          <el-tab-pane label="盖章附件" v-if="showSealFile">
            <span slot="label" class="title">盖章附件</span>
            <SealFile :items="cardSealInfoForm.sealAttaches"></SealFile>
          </el-tab-pane>
          <el-tab-pane>
          <span slot="label" class="title">备注
            <i v-if="cardRemarkInfoForm.errorCount" class="errorCount">{{cardRemarkInfoForm.errorCount}}</i>
          </span>
            <el-form ref="cardRemarkInfoForm" :model="cardRemarkInfoForm" :rules="cardRemarkInfoForm.rules">
              <el-form-item prop="otherInstruction" label="其他说明">
                <el-input type="textarea" placeholder="请输入内容" :disabled="disabled" :rows="4" v-model.trim="cardRemarkInfoForm.otherInstruction" @change="remarkInfoValid"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="相关数据" v-if="showRelate">
            <RelateInfo :supplierCode="supplierCode"></RelateInfo>
          </el-tab-pane>
          <el-tab-pane label="其他" v-if="showOther">
            <OtherTables :baseInfoForm="baseInfoForm"></OtherTables>
          </el-tab-pane>
          <el-tab-pane label="历史信息" v-if="showHistory">
            <HistoryInfo :items="historyDatas"></HistoryInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <div v-show="showSubmitBtn" class="mt20 mb20">
      <el-button :disabled="btnSubmitStatus" type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
    <Process :extraFn="callback.bind(this)"></Process>
  </div>
</template>
<script>
  import _ from 'lodash'
  import {mapState, mapGetters} from 'vuex'

  import {PROCESSCREATORID} from '../../store/consts'
  import {PRFLAG, CONTRACTTYPE, CONTRACTBUSINESSTYPE, SERVICEFLAG, TEXTTYPE} from '../../store/modules/con/consts'
  import Api from '../../api/manageContract'
  import comLoading from '../../mixins/comLoading'
  import {formatDate} from '../../filters/moment'
  import {routerNames} from '../../core/consts'
  import getStructure from '../../util/getStructure'
  import baseInfoStructure from '../../structure/con/baseInfo'
  import contentInfoStructure from '../../structure/con/contentInfo'
  import financeInfoStructure from '../../structure/con/financeInfo'
  import checkInfoStructure from '../../structure/con/checkInfo'
  import sealInfoStructure from '../../structure/con/sealInfo'

  import bus from '../../core/bus'

  import BaseInfo from './baseInfo.vue'
  import ContentInfo from './contentInfo.vue'
  import FincanceInfo from './finaceInfo.vue'
  import CheckInfo from './checkInfo.vue'
  import FileInfo from './fileInfo.vue'
  import SealFile from './sealFile.vue'
  import RelateInfo from './relateInfo.vue'
  import OtherTables from './otherTables.vue'
  import HistoryInfo from './historyInfo.vue'
  import Preview from './preview.vue'
  import UpdateInfo from './updateInfo.vue'
  import CustomLabelInfo from './customLabelInfo.vue'
  import Process from '../../components/process.vue'

  export default {
    mixins: [comLoading],
    data () {
      return {
        baseInfoForm: {
          ..._.cloneDeep(baseInfoStructure)
        }, // 基本信息
        cardContentInfoForm: {
          ..._.cloneDeep(contentInfoStructure),
          errorCount: 0
        }, // 内容信息
        cardFinanceInfoForm: {
          ..._.cloneDeep(financeInfoStructure),
          errorCount: 0
        }, // 财务信息
        cardContCheckInfoForm: {
          ..._.cloneDeep(checkInfoStructure),
          errorCount: 0
        }, // 验收信息
        cardSealInfoForm: {
          ..._.cloneDeep(sealInfoStructure),
          contract: [],
          others: [],
          agreenments: [],
          errorCount: 0
        }, // 合同附件,盖章附件
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
        historyDatas: [], // 历史信息
        previewData: {}, // 预览数据
        visible: false, // 预览
        btnSubmitStatus: false,
        updateVisible: false,
        updateForm: {
          code: null,
          remark: null
        }, // 变更信息
        customLabelForm: {
          contractLabels: [], // 自定义标签
          errorCount: 0
        }, // 自定义标签信息,
        processData: {}, // 流程展示数据
        procTitle: null,
        procInstId: null
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      ...mapGetters(['backLogFARole', 'backLogCreator', 'backLogSealRole', 'backLogPurchaseRole']),
      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo () {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      },
      // 是否显示变更表单
      showUpdateForm () {
        return this.pageStatus === 2
      },
      showMain () {
        if (this.pageStatus === 2) {
          return this.updateVisible
        }
        return true
      },
      // 是否显示自定义标签选项卡
      showCustomLabel () {
        if (this.baseInfoForm.templateId && this.customLabelForm.contractLabels.length) {
          return true
        }
        return false
      },
      // 是否显示合同附件选项卡
      showSealInfo () {
        return this.baseInfoForm.templateId
      },
      // 是否显示盖章信息选项卡
      showSealFile () {
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      // 是否显示相关数据选项卡
      showRelate () {
        return this.pageStatus === 4
      },
      // 是否显示其它选项卡
      showOther () {
        return this.pageStatus !== 1
      },
      // 是否显示历史信息选项卡
      showHistory () {
        return this.pageStatus === 3
      },
      // 是否显示提交按钮
      showSubmitBtn () {
        return [1, 2].indexOf(this.pageStatus) > -1
      },
      // 根据合同供应商code获取相关数据
      supplierCode () {
        const items = this.cardContentInfoForm.tableSupplierInfo
        if (items.length) {
          return items[0].code
        }
        return null
      },
      disabled () {
        return this.pageStatus !== 1
      }
    },
    watch: {
      $route () {
        this.resetData()
      }
    },
    created () {
      this.bindEvents()
      if (this.pageStatus === 1) {
        this.getCreateInfo()
      } else if (this.pageStatus === 3) {
        this.getData()
      } else if (this.pageStatus === 4) {
        this.getProcessData()
      }
    },
    methods: {
      // 获取创建初始数据
      getCreateInfo () {
        const {query} = this.$route
        const {currentFolio, curConTypeId, curConModelId, curConTypeName} = query
        const contractType = +curConModelId
        const types = curConTypeId.split('-')
        const names = curConTypeName.split('-')
        Object.assign(this.baseInfoForm, {
          contractBusinessTypeFirst: +types[0],
          contractBusinessTypeSecond: +types[1],
          contractBusinessTypeThird: +types[2],
          contractBusinessTypeFirstName: names[0],
          contractBusinessTypeSecondName: names[1],
          contractBusinessTypeThirdName: names[2],
          prNo: currentFolio,
          prFlag: currentFolio ? 1 : null,
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
            if (conStandard && conStandard.length) {
              this.cardContentInfoForm.conStandard = conStandard
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
              this.cardFinanceInfoForm.invoiceType = 1 // 增值税专用发票
            }

            Object.assign(this.cardFinanceInfoForm, {
              totalAmount, jiaBillingInfo, yiBillingInfo
            })
          }
        })

        this.commitState()
      },
      // 查看获取数据
      getData () {
        const {query} = this.$route
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
      },
      // 流程查看获取数据
      getProcessData () {
        const {query} = this.$route
        this.processData = JSON.parse(query.processData)
        this.procInstId = this.processData.procInstId
        this.procTitle = this.processData.procTitle

        this.comLoading()
        Api.getContractDetailById({
          id: query.contractId, operate: 'PROCESS'
        }).then((res) => {
          const data = res.data.dataMap
          if (data) {
            this.initData(data)
            // 流程发起人id
            this.$store.commit(PROCESSCREATORID, {
              data: data.baseInfoForm.creatorId
            })
          }
        }).finally(() => {
          this.comLoading(false)
        })
      },
      // vuex commit
      commitState () {
        const {prFlag, contractType, contractBusinessTypeFirst, contractBusinessTypeSecond, contractBusinessTypeThird, contractTextType} = this.baseInfoForm
        this.$store.commit(`con/${PRFLAG}`, {
          data: prFlag
        })
        this.$store.commit(`con/${CONTRACTTYPE}`, {
          data: contractType
        })
        this.$store.commit(`con/${CONTRACTBUSINESSTYPE}`, {
          data: {
            first: contractBusinessTypeFirst,
            second: contractBusinessTypeSecond,
            third: contractBusinessTypeThird
          }
        })

        const exist = this.cardContentInfoForm.conStandard.some(item => !!item.materialCode)
        this.$store.commit(`con/${SERVICEFLAG}`, {
          data: !exist && this.baseInfoForm.contractBusinessTypeFirst === 2
        })

        this.$store.commit(`con/${TEXTTYPE}`, {
          data: contractTextType
        })
      },

      // 获取预览数据
      getPreviewData () {
        this.previewData = this.getResult()
        this.visible = true
      },
      // 预览按钮
      handlePreview () {
        this.handlePreviewValid().then(() => {
          this.getPreviewData()
        }).catch(() => {
          this.$message.error('合同信息不完整！')
        })
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
            this.customLabelForm.contractLabels = templateLabels.map((item) => {
              item.value = null
              return item
            })
          }
        })
      },
      // 获取合同附件
      getFiles (files) {
        if (!files || !files.length) {
          return {}
        }
        const contract = []
        const agreements = []
        files.forEach((item) => {
          const attachType = item.attachType
          if (attachType === 2) {
            agreements.push(item)
            return
          }
          contract.push(item)
        })
        return {
          contract, agreements
        }
      },
      // 过滤财务付款信息
      getPaymentMethods (items) {
        return items.filter((item) => {
          if (item.visible && item.paymentAmount) {
            return true
          }
          return false
        })
      },

      // 回填数据
      initData (data) {
        const {baseInfoForm, cardContentInfoForm, contractLabels, cardFinanceInfoForm, cardContCheckInfoForm, contractAttachAndSeal, cardRemarkInfoForm, simpleContract} = data

        this.initBaseInfo(baseInfoForm)
        this.initContentInfo(cardContentInfoForm)
        this.initFinanceInfo(cardFinanceInfoForm)
        this.initCheckInfo(cardContCheckInfoForm)
        this.initSealInfo(contractAttachAndSeal)
        this.initRemarkInfo(cardRemarkInfoForm)
        this.customLabelForm.contractLabels = contractLabels
        if (this.pageStatus === 3) {
          this.historyDatas = simpleContract
        }

        this.commitState()
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
            if (originItem.payType === item.payType && item.paymentAmount) {
              paymentMethods.push(Object.assign(item, {visible: true, type: originItem.type}))
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
        const result = getStructure(checkInfoStructure, cardContCheckInfoForm)
        Object.assign(this.cardContCheckInfoForm, result)
      },
      initSealInfo (contractAttachAndSeal) {
        const result = getStructure(sealInfoStructure, contractAttachAndSeal)
        const allFiles = this.getFiles(result.attaches)
        Object.assign(this.cardSealInfoForm, result, allFiles, {attaches: allFiles.contract})
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

        bus.$on('financeInfoValid', this.financeInfoValid)
        bus.$on('checkInfoValid', this.checkInfoValid)
        bus.$on('sealInfoValid', this.sealInfoValid)
        bus.$on('customLabelValid', this.customLabelValid)
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
        return this.$refs.cardFinanceInfoForm.valid()
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
      customLabelValid () {
        if (!this.$refs.customLabelForm.valid()) {
          this.customLabelForm.errorCount = 1
          return false
        }
        this.customLabelForm.errorCount = 0
        return true
      },
      // 提交校验全部
      validateForms () {
        let valids = []
        if (this.pageStatus === 1) {
          valids = this.createValid()
        } else if (this.pageStatus === 2) {
          valids = this.updateValid()
        }
        return new Promise((resolve, reject) => {
          const exist = valids.some(item => !item)
          if (exist) {
            return reject(new Error('验证不通过'))
          }
          return resolve()
        })
      },
      createValid () {
        const valids = [this.baseInfoValid(), this.contentInfoValid(), this.financeInfoValid(), this.remarkInfoValid()]
        if (this.showSealInfo) {
          valids.push(this.sealInfoValid())
        }
        if (this.ifCheckInfo) {
          valids.push(this.checkInfoValid())
        }
        if (this.customLabelForm.contractLabels.length) {
          valids.push(this.customLabelValid())
        }
        return valids
      },
      updateValid () {
        const valids = [this.updateInfoValid(), this.financeInfoValid(), this.sealInfoValid()]
        const exist = this.cardSealInfoForm.sealAttaches.some(item => !item.id) // 合同变更必须上传附件
        if (!exist) {
          this.$message.warning('变更合同必须上传附件！')
          valids.unshift(Promise.reject(new Error('变更合同必须上传附件！')))
        }
        return valids
      },
      handlePreviewValid () {
        let valids = []
        if (this.pageStatus === 1) {
          valids = this.createValid()
        } else if (this.pageStatus === 2) {
          valids = [this.financeInfoValid()]
        } else if (this.pageStatus === 4) {
          if (this.backLogFARole) {
            valids.push(this.financeInfoValid())
          }
        }
        return new Promise((resolve, reject) => {
          const exist = valids.some(item => !item)
          if (exist) {
            return reject(new Error('验证不通过'))
          }
          return resolve()
        })
      },

      // 获取全部数据
      getResult () {
        const baseInfoForm = getStructure(baseInfoStructure, this.baseInfoForm)
        const cardContentInfoForm = getStructure(contentInfoStructure, this.cardContentInfoForm)

        const paymentMethods = this.getPaymentMethods(this.cardFinanceInfoForm.paymentMethods)
        const cardFinanceInfoForm = Object.assign({}, getStructure(financeInfoStructure, this.cardFinanceInfoForm), {paymentMethods})

        const cardContCheckInfoForm = getStructure(checkInfoStructure, this.cardContCheckInfoForm)
        const contractAttachAndSeal = getStructure(sealInfoStructure, this.cardSealInfoForm)
        const cardRemarkInfoForm = this.cardRemarkInfoForm
        const contractLabels = this.customLabelForm.contractLabels

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
          this.comLoading()
          let promise = null
          if (this.pageStatus === 1) {
            promise = Api.submit(result)
          } else {
            promise = Api.updatedSubmit(result)
          }
          promise.then(() => {
            this.$message.success('提交成功！')
            this.$router.push({name: routerNames.con_index})
          }).finally(() => {
            this.btnSubmitStatus = false
            this.comLoading(false)
          })
        }).catch(() => {
          this.$message.warning('表单填写不完整！')
        })
      },
      // 重置数据
      resetData () {
        this.baseInfoForm = {..._.cloneDeep(baseInfoStructure)}
        this.cardContentInfoForm = {
          ..._.cloneDeep(contentInfoStructure),
          errorCount: 0
        }
        this.cardFinanceInfoForm = {
          ..._.cloneDeep(financeInfoStructure),
          errorCount: 0
        }
        this.cardContCheckInfoForm = {
          ..._.cloneDeep(checkInfoStructure),
          errorCount: 0
        }
        this.cardSealInfoForm = {
          ..._.cloneDeep(sealInfoStructure),
          contract: [],
          others: [],
          agreenments: [],
          errorCount: 0
        }
        this.cardRemarkInfoForm = {
          otherInstruction: null,
          errorCount: 0
        }
        this.historyDatas = []
        this.previewData = {}
        this.customLabelForm = {
          contractLabels: [], // 自定义标签
          errorCount: 0
        }
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
        const fileIds = []
        this.cardSealInfoForm.sealAttaches.forEach((item) => {
          if (!item.id) {
            fileIds.push(item.fileId)
          }
        })
        return Api.uploadSealAttachments({
          id: this.baseInfoForm.id, type: 1, uploadPerson: true, fileIds
        })
      },
      // 待办流程财务信息修改
      modifyFA () {
        if (!this.financeInfoValid()) {
          this.$message.warning('合同财务信息不完整')
          return Promise.reject(new Error('合同财务信息不完整'))
        }
        const {currency, invoiceType, paymentTimePeriod, paymentMethods} = this.cardFinanceInfoForm
        const finances = this.getPaymentMethods(paymentMethods)

        return Api.updateFinanceByContractId({
          contractId: this.$route.query.contractId,
          currency,
          invoiceType,
          paymentTimePeriod,
          finances
        })
      },
      // 待办流程发起人附件信息修改
      modifyFiles () {
        return Api.updateAttach({
          ...getStructure(sealInfoStructure, this.cardSealInfoForm)
        })
      }
    },
    filters: {
      formatDate
    },
    components: {
      BaseInfo,
      ContentInfo,
      FincanceInfo,
      CheckInfo,
      FileInfo,
      SealFile,
      RelateInfo,
      OtherTables,
      HistoryInfo,
      Preview,
      UpdateInfo,
      CustomLabelInfo,
      Process
    }
  }
</script>
