<style type="text/scss" lang="scss" scoped>
  table {
    border-collapse: collapse;
    th, td {
      border: 1px solid;
      text-align: center;
    }
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .default-table {
    th, td {
      border: none;
      text-align: left;
    }
  }

  .preViewTitle input {
    border: 0
  }
</style>

<template>
  <el-dialog
    title="合同预览"
    :visible.sync="visible"
    width="90%"
    @close="ok">
    <div class="preview-container">
      <form action="/api-contract/contract-web/contract/download/pdf" method="post" id="pdf-form">
        <input type="hidden" name="content" value="" id="pdf-content"/>
        <input type="hidden" name="supplierName" :value="supplierName"/>
        <input type="hidden" v-if="title" name="title" :value="title"/>
        <input type="hidden" name="contractNo" :value="contractNo"/>
        <el-row class="previewTitle">
          <el-button style="float:right" native-type="submit" @click.prevent="toPdf" type="primary"
                     size="small">导出pdf
          </el-button>
        </el-row>
        <el-row class="preViewTitle mb20 mt20" style="border-bottom: 1px solid #000;padding-bottom: 10px">
          <el-col :span="8">
            <span v-if="supplierName">{{supplierName}}</span>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <span v-if="title">{{title}}合同</span>
          </el-col>
          <el-col :span="8" style="text-align: right">
            <span v-if="contractNo">{{contractNo}}</span>
          </el-col>
        </el-row>
      </form>
      <div id="pdf-wrap">
        <div>
          <div style="text-align: center;font-size:18px;font-weight:bold;padding-bottom: 10px;" class="mb20 f18 fb">
            {{title}}合同
          </div>
          <div class="mb20">
            <table class="default-table mb20">
              <tbody>
              <tr style="margin-bottom: 10px">
                <td width="45" valign="top" class="w45">甲方：</td>
                <td valign="top">
                  <div v-for="item in partAName" class="mb10">{{item}}</div>
                </td>
              </tr>
              <tr class="trH"></tr>
              <tr>
                <td width="45" valign="top" class="w45">乙方：</td>
                <td valign="top">
                  <div v-for="item in partBName" class="mb10">{{item}}</div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="materialTable.length">
            <p>合同标的：</p>
            <div>
              <template v-if="[1,2,3].indexOf(contractType)>-1&&contractBusinessTypeFirst===2">
                <table>
                  <thead>
                  <tr>
                    <th>物料描述</th>
                    <th>价格</th>
                    <th width="100">税率</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in materialTable">
                    <td>{{item.materialName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <template v-if="[1,2].indexOf(contractType)>-1&&[1,3].indexOf(contractBusinessTypeFirst)>-1">
                <table>
                  <thead>
                  <tr>
                    <th>物料编码</th>
                    <th>物料描述</th>
                    <th>数量</th>
                    <th>含税单价</th>
                    <th>税率</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in materialTable">
                    <td>{{item.materialCode}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <template v-if="contractType===3&&[1,3].indexOf(contractBusinessTypeFirst)>-1">
                <table>
                  <thead>
                  <tr>
                    <th>物料编码</th>
                    <th>物料描述</th>
                    <th>含税单价</th>
                    <th>税率</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in materialTable">
                    <td>{{item.materialCode}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <div class="mt20 mb20" v-if="corporeRemark">
                <div>合同标的备注：</div>
                <div>{{corporeRemark}}</div>
              </div>
            </div>
          </div>
          <div v-if="moneyInvolved">
            <div v-if="!oneOffPay&&priceTable.length">
              <p>付款方式：</p>
              <table>
                <thead>
                <tr>
                  <th width="150">类型</th>
                  <th width="150">金额</th>
                  <th width="250">付款方式</th>
                  <th>备注</th>
                  <th width="100">占比</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in priceTable">
                  <td>{{item.type}}</td>
                  <td>{{item.paymentAmount}}</td>
                  <td>{{item.paymentTimePeriod}}</td>
                  <td>{{item.remark}}</td>
                  <td>{{item.ratio}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="mt20" v-if="paymentRemark">
              <div>付款方式备注：</div>
              <div v-html="paymentRemark" class="pre"></div>
            </div>
            <p>合同含税总金额为{{totalAmount | numToChinese}} （CNY {{totalAmount}}元）</p>
            <!--<div class="mt20 mb20">
              <div class="mb20">
                <div v-show="partA.length===1">
                  <p>甲方增值税专用开票信息：</p>
                  <p>公司名称：{{partA.company}}</p>
                  <p>统一社会信用代码：{{partA.unifiedSocialCreditCode}}</p>
                  <p>注册地址：{{partA.registeredAddress}}</p>
                  <p>经营地址：{{partA.businessAddress}}</p>
                  <p>联系电话：{{partA.contactNumber}}</p>
                  <p>银行账号：{{partA.bankAccount}}</p>
                  <p>开 户 行：{{partA.depositBank}}</p>
                </div>
                <div v-show="partA.length>1">具体开票信息以采购提供为准</div>
              </div>
              <div>
                <p>乙方指定甲方汇款的账户为：</p>
                <p>乙方：{{partB.name}}</p>
                <p>银行账号：{{partB.bankAccount}}</p>
                <p>开户行：{{partB.depositBank}}</p>
                <p>联系人：{{partB.contacts}}</p>
                <p>联系地址：{{partB.contractAddress}}</p>
                <p>联系电话：{{partB.contractNumber}}</p>
                <p>E-mail:{{partB.email}}</p>
              </div>
            </div>-->
          </div>
          <!--<el-row class="mt20">-->
          <!--生效条件:-->
          <!--<span v-if="effectiveCondition===1">附期限生效</span>-->
          <!--<span v-if="effectiveCondition===2">附条件生效</span>-->
          <!--<span v-if="effectiveCondition===3">签订生效</span>-->
          <!--</el-row>-->
          <div class="mb20" v-html="currentTpl"></div>
          <el-row class="mt20" v-if="effectiveCondition===1">
            <el-col :span="5">合同生效日期：{{startTime | formatDate}}</el-col>
            <el-col :span="5">合同终止日期：{{endTime | formatDate}}</el-col>
          </el-row>
          <el-row class="mt20" v-if="effectiveCondition===2">
            <el-col :span="3">生效备注：</el-col>
            <el-col :span="21">{{conditionDesc}}</el-col>
          </el-row>
          <p></p>
          <table class="default-table" style="width:100%;">
            <tbody>
            <tr>
              <td width="100" valign="top" class="w100">甲方：</td>
              <td valign="top">
                <div v-for="item in partAName">{{item}}</div>
              </td>
              <td width="100" valign="top" class="w100">乙方：</td>
              <td valign="top">
                <div v-for="item in partBName">{{item}}</div>
              </td>
            </tr>
            <tr>
              <td>法定代表人：</td>
              <td></td>
              <td>法定代表人：</td>
              <td></td>
            </tr>
            <tr>
              <td>日期：</td>
              <td></td>
              <td>日期：</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb20" v-html="filesContent"></div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Api from '../../api/manageContract'
  import numToChinese from '../../util/numToChinese'
  import paymentTimePeriods from '../../filters/paymentTimePeriods'
  import {formatDate} from '../../filters/moment'

  export default {
    props: {
      visible: Boolean,
      datas: {
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        contractNo: '',
        supplierName: '',
        title: '',
        contractType: null,
        contractBusinessTypeFirst: null,
        materialTable: [],
        priceTable: [],
        partA: [],
        partAName: [],
        partB: [],
        partBName: [],
        effectiveCondition: null,
        conditionDesc: '',
        startTime: '',
        endTime: '',
        totalAmount: '',
        depositRatio: '',
        moneyInvolved: false,
        oneOffPay: false,
        currentTpl: null,
        filesContent: null,
        corporeRemark: '',
        paymentRemark: '',
        contents: null
      }
    },
    methods: {
      transformData (data) {
        const priceTable = []
        let name = ''
        if (data.length) {
          data.forEach((item) => {
            if (!item.paymentAmount) {
              return
            }
            const {seriousPayments, payType} = item
            switch (payType) {
              case 1:
                name = '预付款'
                break
              case 2:
                name = ''
                break
              case 3:
                name = '尾款'
                break
              case 4:
                name = '定金'
                break
              case 5:
                name = '保证金'
                break
            }
            if (seriousPayments) {
              const {financeMores} = item
              financeMores.forEach((item1, index1) => {
                const {
                  paymentAmount, paymentTimePeriod, remark, ratio
                } = item1
                const type = `${name}${index1 + 1}`
                priceTable.push({
                  type,
                  paymentAmount,
                  paymentTimePeriod: paymentTimePeriods(paymentTimePeriod),
                  remark,
                  ratio: `${ratio}%`
                })
              })
              return
            }
            priceTable.push({
              ...item,
              type: name,
              paymentTimePeriod: paymentTimePeriods(item.paymentTimePeriod),
              ratio: `${item.ratio}%`
            })
          })
        }
        return priceTable
      },
      getTplData () {
        Api.getTplContent(this.datas).then((res) => {
          const data = res.data.dataMap
          this.contents = data
          this.currentTpl = data[0]
          this.filesContent = data.slice(1).join('')
        })
      },
      ok () {
        this.$emit('update:visible', false)
      },
      toPdf () {
        const data = document.getElementById('pdf-wrap').innerHTML
        const value = this.contents.slice(0)
        value.splice(0, 1, data)
        document.getElementById('pdf-content').value = value.join('~~~~')
        document.getElementById('pdf-form').submit()
      }
    },
    watch: {
      datas (val) {
        if (!Object.keys(val).length) {
          return
        }
        const {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm
        } = val
        const {
          contractNo,
          contractType,
          contractBusinessTypeFirst,
          contractBusinessTypeThirdName
        } = baseInfoForm
        const {
          effectiveCondition,
          conStandard,
          conditionDesc,
          corporeRemark,
          startTime,
          endTime
        } = cardContentInfoForm
        const {
          jiaBillingInfo,
          yiBillingInfo,
          moneyInvolved,
          totalAmount,
          paymentMethods,
          oneOffPay,
          paymentRemark
        } = cardFinanceInfoForm

        this.contractNo = contractNo
        this.contractType = contractType
        this.contractBusinessTypeFirst = contractBusinessTypeFirst
        this.title = contractBusinessTypeThirdName

        this.startTime = startTime
        this.endTime = endTime
        this.conditionDesc = conditionDesc
        this.effectiveCondition = effectiveCondition
        this.corporeRemark = corporeRemark
        this.paymentRemark = paymentRemark
        this.partAName = jiaBillingInfo.map((item) => item.company)
        this.partBName = yiBillingInfo.length > 0 ? [yiBillingInfo[0].company] : []
        this.supplierName = yiBillingInfo.length > 0 ? yiBillingInfo[0].company : ''
        if (moneyInvolved) {
          this.moneyInvolved = moneyInvolved
          this.totalAmount = totalAmount
          this.partA = jiaBillingInfo
          this.partB = yiBillingInfo[0] || {}

          if (oneOffPay) {
            this.oneOffPay = true
          } else {
            this.priceTable = this.transformData(paymentMethods)
          }
        }

        this.materialTable = conStandard || []

        this.getTplData()
      }
    },
    filters: {
      numToChinese,
      formatDate
    }
  }
</script>
