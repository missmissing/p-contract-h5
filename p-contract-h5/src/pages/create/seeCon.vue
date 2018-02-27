<style type="text/scss" lang="scss" scoped>
  .createCon {
    .title {
      position: relative;
      padding: 0 15px;
    }
  }
</style>
<template>
  <div class="createCon">
    <div>
      <BaseInfo :disabled="true" :baseInfoForm="baseInfoForm" ref="baseInfoForm"></BaseInfo>
      <el-card>
        <el-tabs>
          <el-tab-pane>
            <span slot="label" class="title">合同内容信息</span>
            <ContentInfo :cardContentInfoForm="cardContentInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardContentInfoForm"></ContentInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同财务信息</span>
            <FincanceInfo :cardFinanceInfoForm="cardFinanceInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardFinanceInfoForm"></FincanceInfo>
          </el-tab-pane>
          <el-tab-pane v-if="ifCheckInfo">
            <span slot="label" class="title">合同验收与样品信息</span>
            <CheckInfo :cardContCheckInfoForm="cardContCheckInfoForm" :baseInfoForm="baseInfoForm" :cardContentInfoForm="cardContentInfoForm" :disabled="true" ref="cardContCheckInfoForm"></CheckInfo>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">合同附件</span>
            <FileInfo :cardSealInfoForm="cardSealInfoForm" :baseInfoForm="baseInfoForm" :disabled="true" ref="cardSealInfoForm"></FileInfo>
          </el-tab-pane>
          <el-tab-pane label="盖章附件">
            <span slot="label" class="title">盖章附件</span>
            <SealFile :items="cardSealInfoForm.sealAttaches"></SealFile>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="title">备注</span>
            <el-form ref="cardRemarkInfoForm" :model="cardRemarkInfoForm" :rules="cardRemarkInfoForm.rules">
              <el-form-item prop="otherInstruction" label="其他说明">
                <el-input :disabled="true" type="textarea" placeholder="请输入内容" :rows="4" v-model.trim="cardRemarkInfoForm.otherInstruction"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="其他">
            <OtherTables :baseInfoForm="baseInfoForm"></OtherTables>
          </el-tab-pane>
          <el-tab-pane label="历史信息">
            <HistoryInfo :items="historyDatas"></HistoryInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <Preview :visible.sync="visible" :datas="previewData"></Preview>
  </div>
</template>
<script>
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
  import FincanceInfo from './components/seeCon/finaceInfo.vue'
  import CheckInfo from './components/checkInfo.vue'
  import FileInfo from './components/seeCon/fileInfo.vue'
  import Preview from './components/preview.vue'
  import SealFile from './components/sealFile.vue'
  import OtherTables from './components/otherTables.vue'
  import HistoryInfo from './components/historyInfo.vue'
  import RelateInfo from './components/relateInfo.vue'

  export default {
    mixins: [comLoading],
    data () {
      return {
        previewData: {}, // 预览数据
        visible: false, // 预览
        baseInfoForm: {
          ...baseInfoStructure
        }, // 基本信息
        cardContentInfoForm: {
          ...contentInfoStructure
        }, // 内容信息
        cardFinanceInfoForm: {
          ...financeInfoStructure
        }, // 财务信息
        cardContCheckInfoForm: {
          ...checkInfoStructure
        }, // 验收信息
        cardSealInfoForm: {
          ...sealInfoStructure,
          contract: [],
          others: [],
          agreenments: [],
          errorMsg: null
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
        historyDatas: [] // 历史信息
      }
    },
    computed: {
      // 当合同模式为单一合同和框架协议合同时,显示合同验收与样品信息
      ifCheckInfo () {
        return [1, 3].indexOf(this.baseInfoForm.contractType) > -1
      }
    },
    created () {
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
          contract.push(item)
        })
        return {
          contract, others, agreements
        }
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

        this.historyDatas = simpleContract
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
      SealFile,
      OtherTables,
      HistoryInfo,
      RelateInfo
    }
  }
</script>
