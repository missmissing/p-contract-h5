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
    <el-card v-if="showUpdateForm">
      <UpdateInfo ref="updateForm" :updateForm="updateForm" :visible.sync="updateVisible"></UpdateInfo>
    </el-card>
    <div v-show="showMain">
      <BaseInfo :baseInfoForm="baseInfoForm" ref="baseInfoForm"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title"><i v-if="cardContentInfoForm.errorCount" class="errorCount">{{cardContentInfoForm.errorCount}}</i>合同内容信息</span>
            <ContentInfo :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" ref="cardContentInfoForm"></ContentInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息
              <i v-if="cardFinanceInfoForm.errorCount" class="errorCount">{{cardFinanceInfoForm.errorCount}}</i>
            </span>
            <FincanceInfo :cardFinanceInfoForm="cardFinanceInfoForm" :baseInfoForm="baseInfoForm" ref="cardFinanceInfoForm"></FincanceInfo>
          </el-tab-pane>
          <el-tab-pane v-if="ifCheckInfo">
            <span slot="label" class="title">
              <i v-if="cardContCheckInfoForm.errorCount" class="errorCount">{{cardContCheckInfoForm.errorCount}}</i>
              合同验收与样品信息
            </span>
            <CheckInfo :cardContCheckInfoForm="cardContCheckInfoForm" :baseInfoForm="baseInfoForm" :cardContentInfoForm="cardContentInfoForm" ref="cardContCheckInfoForm"></CheckInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">
              <i v-if="cardSealInfoForm.errorCount" class="errorCount">{{cardSealInfoForm.errorCount}}</i>
              合同附件
            </span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" :baseInfoForm="baseInfoForm" ref="cardSealInfoForm"></FileInfo>
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
            <RelateInfo :suppliers="cardContentInfoForm.tableSupplierInfo"></RelateInfo>
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
    <div class="mt20 mb20">
      <el-button :disabled="btnSubmitStatus" type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  import {PROCESSSTATUS, PROCESSCREATORID, PROCESSROLE} from '../../store/consts'
  import Api from '../../api/manageContract/index'
  import comLoading from '../../mixins/comLoading'
  import {formatDate} from '../../filters/moment'
  import getContractType from '../../filters/contractType'
  import {routerNames} from '../../core/consts'
  import getStructure from '../../util/getStructure'
  import baseInfoStructure from '../../structure/create/baseInfo'
  import contentInfoStructure from '../../structure/create/contentInfo'
  import financeInfoStructure from '../../structure/create/financeInfo'
  import checkInfoStructure from '../../structure/create/checkInfo'
  import sealInfoStructure from '../../structure/create/sealInfo'

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

  export default {
    mixins: [comLoading],
    data () {
      return {
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
        contractLabels: [], // 自定义标签
        btnSubmitStatus: false,
        updateVisible: false,
        updateForm: {
          code: null,
          remark: null
        } // 变更信息
      }
    },
    computed: {
      ...mapState(['pageStatus']),
      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo () {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      },
      showUpdateForm () {
        return this.pageStatus === 2
      },
      showMain () {
        if (this.pageStatus === 2) {
          return this.updateVisible
        }
        return true
      },
      showSealFile () {
        return [3, 4].indexOf(this.pageStatus) > -1
      },
      showRelate () {
        return this.pageStatus === 4
      },
      showOther () {
        return this.pageStatus !== 1
      },
      showHistory () {
        return this.pageStatus === 3
      },
      disabled () {
        return this.pageStatus !== 1
      }
    },
    created () {
      this.bindEvents()
      if (this.pageStatus === 1) {
        this.getCreateInfo()
      }
      if (this.pageStatus === 3) {
        this.getData()
      }
      if (this.pageStatus === 4) {
        this.getProcessData()
      }
    },
    methods: {
      // 获取预览数据
      getPreviewData () {
        this.previewData = this.getResult()
        this.visible = true
      },
      // 预览按钮
      handlePreview () {
        this.validateForms().then(() => {
          this.getPreviewData()
        }).catch(() => {
          this.$message.error('请填写完合同信息再预览！')
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
            this.contractLabels = templateLabels
          }
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
              this.cardFinanceInfoForm.invoiceType = 1 // 增值税专用发票
            }

            Object.assign(this.cardFinanceInfoForm, {
              totalAmount, jiaBillingInfo, yiBillingInfo
            })
          }
        })
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
            // 流程发起人id
            this.$store.commit(PROCESSCREATORID, {
              data: data.baseInfoForm.creatorId
            })
          }
        }).finally(() => {
          this.comLoading(false)
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

        if (this.pageStatus === 3) {
          this.historyDatas = simpleContract
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
        if (this.ifCheckInfo) {
          valids.push(this.checkInfoValid())
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
      },
      // 提交
      handleSubmit () {
        this.validateForms().then(() => {
          this.btnSubmitStatus = true
          const result = this.getResult()
          this.comLoading()
          Api.submit(result).then(() => {
            this.$message.success('提交成功！')
            this.$router.push({name: routerNames.con_index})
          }).finally(() => {
            this.btnSubmitStatus = false
            this.comLoading(false)
          })
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
      FincanceInfo,
      CheckInfo,
      FileInfo,
      SealFile,
      RelateInfo,
      OtherTables,
      HistoryInfo,
      Preview,
      UpdateInfo
    }
  }
</script>
