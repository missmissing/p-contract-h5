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
    <div class="mb10 clearfix">
      <div class="fr">流程编号 {{procInstId}}</div>
      <div class="fl fb">{{procTitle}}</div>
    </div>
    <div>
      <BaseInfo :disabled="true" :baseInfoForm="baseInfoForm" ref="baseInfoForm"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title"><i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息</span>
            <ContentInfo :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardContentInfoForm"></ContentInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息
              <i v-if="cardFinanceInfoForm.errorCount" class="errorCount">{{cardFinanceInfoForm.errorCount}}</i>
            </span>
            <FincanceInfo :cardFinanceInfoForm="cardFinanceInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardFinanceInfoForm"></FincanceInfo>
          </el-tab-pane>
          <el-tab-pane v-if="ifCheckInfo">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <CheckInfo :cardContCheckInfoForm="cardContCheckInfoForm" :baseInfoForm="baseInfoForm" :cardContentInfoForm="cardContentInfoForm" :disabled="true" ref="cardContCheckInfoForm"></CheckInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardSealInfoForm"></FileInfo>
          </el-tab-pane>
          <el-tab-pane label="盖章附件">
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
                <el-input :disabled="true" type="textarea" placeholder="请输入内容" :rows="4" v-model.trim="cardRemarkInfoForm.otherInstruction" @change="remarkInfoValid"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="相关数据">
            <RelateInfo :suppliers="cardContentInfoForm.tableSupplierInfo"></RelateInfo>
          </el-tab-pane>
          <el-tab-pane label="其他">
            <OtherTables :baseInfoForm="baseInfoForm"></OtherTables>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <Process :extraFn="callback.bind(this)"></Process>
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
  import getStructure from '../../util/getStructure'
  import baseInfoStructure from '../../structure/create/baseInfo'
  import contentInfoStructure from '../../structure/create/contentInfo'
  import financeInfoStructure from '../../structure/create/financeInfo'
  import checkInfoStructure from '../../structure/create/checkInfo'
  import sealInfoStructure from '../../structure/create/sealInfo'

  import BaseInfo from './components/baseInfo.vue'
  import ContentInfo from './components/contentInfo.vue'
  import FincanceInfo from './components/processCon/finaceInfo.vue'
  import CheckInfo from './components/checkInfo.vue'
  import FileInfo from './components/processCon/fileInfo.vue'
  import Preview from './components/preview.vue'
  import SealFile from './components/sealFile.vue'
  import OtherTables from './components/otherTables.vue'
  import RelateInfo from './components/relateInfo.vue'
  import Process from '../../components/process.vue'

  export default {
    mixins: [comLoading],
    data () {
      return {
        processData: null, // 流程数据
        procCode: null, // 流程code
        procInstId: null, // 流程id
        procTitle: null, // 流程名称
        previewData: {}, // 预览数据
        visible: false, // 预览
        baseInfoForm: {
          ...baseInfoStructure
        }, // 基本信息
        cardContentInfoForm: {
          ...contentInfoStructure,
          errorCount: 0
        }, // 内容信息
        cardFinanceInfoForm: {
          ...financeInfoStructure,
          errorCount: 0
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
        btnSubmitStatus: false
      }
    },
    computed: {
      ...mapGetters(['backLogCreator', 'backLogFARole', 'backLogSealRole', 'backLogPurchaseRole']),

      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo () {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      },
      // 是否允许上传盖章后附件
      ifuploadSealFile () {
        if (this.backLogSealRole || this.backLogPurchaseRole) {
          return false
        }
        return true
      }
    },
    created () {
      const {query} = this.$route
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
    },
    methods: {
      // 获取预览数据
      getPreviewData () {
        this.previewData = this.getResult()
        this.visible = true
      },
      // 预览按钮
      handlePreview () {
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
          if (attachType === 2) { // 从协议
            agreements.push(item)
            return
          }
          contract.push(item)
        })
        return {
          contract, others, agreements
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
        const {id, sealNumber, printNumber, remainNumber, sealUsedInfo, contract} = this.cardSealInfoForm
        return Api.updateAttach({
          id,
          relationId: this.$route.query.contractId,
          sealNumber,
          printNumber,
          remainNumber,
          sealUsedInfo,
          attaches: contract
        })
      },

      // 回填数据
      initData (data) {
        const {baseInfoForm, cardContentInfoForm, cardFinanceInfoForm, cardContCheckInfoForm, contractAttachAndSeal, cardRemarkInfoForm} = data

        this.initBaseInfo(baseInfoForm)
        this.initContentInfo(cardContentInfoForm)
        this.initFinanceInfo(cardFinanceInfoForm)
        this.initCheckInfo(cardContCheckInfoForm)
        this.initSealInfo(contractAttachAndSeal)
        this.initRemarkInfo(cardRemarkInfoForm)
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

        bus.$on('financeInfoValid', this.financeInfoValid)

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
      Preview,
      Process,
      SealFile,
      OtherTables,
      RelateInfo
    }
  }
</script>
