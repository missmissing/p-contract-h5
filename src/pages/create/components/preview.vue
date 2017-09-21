<style type="text/scss" lang="scss" scoped>
  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .flex {
    display: flex;
  }

  .flex50 {
    flex: 1
  }
</style>

<template>
  <el-dialog
    title="合同预览"
    :visible.sync="visible"
    size="large"
    top="10%"
    @close="ok">
    <div>
      <div class="mb20">
        <div class="flex mb20">
          <div>甲方：</div>
          <div>
            <div v-for="item in partAName">{{item}}</div>
          </div>
        </div>
        <div>
          <div>乙方：</div>
          <div>
            <div v-for="item in partBName">{{item}}</div>
          </div>
        </div>
      </div>
      <p>甲乙双方在平等、互利的基础上，遵循自愿、公平和诚信的原则，依照《中华人民共和国合同法》及其他有关法律、行政法规，经友好协商，达成如下协议:</p>
      <p>合作范围及约定</p>
      <div v-show="materialTable.length>0">
        <el-table
          :data="materialTable"
          border
          class="wp100">
          <el-table-column
            prop="materialCode"
            label="物料编码">
          </el-table-column>
          <el-table-column
            prop="materialName"
            label="物料描述">
          </el-table-column>
          <el-table-column
            prop="total"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="price"
            label="含税单价">
          </el-table-column>
          <el-table-column
            prop="taxRate"
            label="税率">
            <template scope="scope">
              {{scope.row.taxRate}}%
            </template>
          </el-table-column>
        </el-table>
      </div>

      <p>合同生效期间：{{startTime}}至{{endTime}}</p>
      <p v-show="materialTable.length>0">备注：合同总价款已包括但不限于增值税、安装费、运输费、送货上门费、人工费、定制费等与家具定制、购买、运输、安装有关的一切费用。</p>
      <div v-show="moneyInvolved">
        <div v-show="oneOffPay">
          付款方式
          <el-table
            :data="priceTable"
            border
            class="wp100 mt10">
            <el-table-column
              prop="type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="paymentAmount"
              label="金额">
            </el-table-column>
            <el-table-column
              prop="paymentTime"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="ratio"
              label="占比">
            </el-table-column>
          </el-table>
        </div>
        <p>合同含税总金额为{{totalAmount}} （CNY {{totalAmount}}元）</p>
        <p>保证金{{deposit | numToChinese}}（CNY {{deposit}}元），占比{{depositRatio}}%。保证金支付时间为{{payTime}}.</p>

        <div class="mt20 mb20">
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
        </div>
        <pre v-html="currentTpl"></pre>
      </div>
      <div class="flex" style="margin-top:50px;">
        <div class="flex50">
          <div class="flex">
            <div>甲方：</div>
            <div>
              <div v-for="item in partAName">{{item}}</div>
            </div>
          </div>
          <p>法定代表人：</p>
          <p>日期：</p>
        </div>
        <div class="flex50">
          <div class="flex">
            <div>乙方：</div>
            <div>
              <div v-for="item in partBName">{{item}}</div>
            </div>
          </div>
          <p>法定代表人：</p>
          <p>日期：</p>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Api from '@/api/support'
  import numToChinese from '@/util/numToChinese'

  export default {
    props: {
      visible: Boolean,
      datas: {
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        materialTable: [],
        priceTable: [],
        partA: [],
        partAName: [],
        partB: [],
        partBName: [],
        startTime: '',
        endTime: '',
        totalAmount: '',
        deposit: '',
        payTime: '',
        depositRatio: '',
        moneyInvolved: false,
        oneOffPay: false,
        tplData: {},
        currentTpl: null
      }
    },
    methods: {
      transformData(data) {
        const priceTable = []
        if (data.length) {
          data.forEach((item) => {
            const {seriousPayments} = item
            if (seriousPayments) {
              priceTable.push(item)
              const {subItem} = item
              subItem.forEach((item1) => {
                const {paymentAmount, paymentTime, paymentTimePeriod, remark, ratio} = item1
                priceTable.push({paymentAmount, paymentTime, paymentTimePeriod, remark, ratio})
              })
              return
            }
            priceTable.push(item)
          })
        }
        return priceTable
      },
      getTplData(templateId) {
        const tplData = this.tplData[templateId]
        if (tplData) {
          this.currentTpl = tplData
          return
        }
        if (!templateId) {
          return
        }
        Api.getTplData({templateId}).then((res) => {
          const data = res.data.dataMap
          const {content} = data
          this.currentTpl = content
          this.tplData[templateId] = data
        })
      },
      ok() {
        this.$emit('update:visible', false)
      }
    },
    watch: {
      datas() {
        console.log(this.datas)
        if (!Object.keys(this.datas).length) {
          return null
        }
        const {conStandard, cardFinanceInfoForm, endTime, startTime, templateId} = this.datas
        const {jiaBillingInfo, yiBillingInfo, deposit, payTime, moneyInvolved, depositRatio, totalAmount, paymentMethods, oneOffPay} = cardFinanceInfoForm
        const {advance, progress, _final} = paymentMethods
        this.materialTable = conStandard
        this.startTime = startTime
        this.endTime = endTime
        if (moneyInvolved) {
          this.moneyInvolved = moneyInvolved
          this.totalAmount = totalAmount
          this.deposit = deposit
          this.depositRatio = depositRatio
          this.payTime = payTime
          this.partA = jiaBillingInfo
          this.partB = yiBillingInfo[0] || {}
          this.partAName = jiaBillingInfo.map((item) => {
            return item.company
          })
          this.partBName = yiBillingInfo.length > 0 ? [yiBillingInfo[0].companyName] : []

          if (oneOffPay) {
            this.oneOffPay = true
          } else {
            this.priceTable = [...this.transformData(advance), ...this.transformData(progress), ...this.transformData(_final)]
          }
        }

        this.getTplData(templateId)
      }
    },
    filters: {
      numToChinese
    }
  }
</script>
