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


</style>

<template>
  <el-dialog
    title="合同预览"
    :visible.sync="visible"
    size="large"
    top="10%"
    @close="ok">
    <div>
      <form action="/api-contract/contract-web/contract/download/pdf" method="post" id="pdf-form">
        <input type="hidden" name="content" value="" id="pdf-content">
        <el-button native-type="submit" @click.prevent="toPdf" type="primary" class="fr" style="margin:-54px 50px 0 0"
                   size="small">导出pdf
        </el-button>
      </form>
      <div id="pdf-wrap">
        <div class="mb20">
          <div class="flex mb20">
            <div>甲方：</div>
            <div>
              <div v-for="item in partAName">{{item}}</div>
            </div>
          </div>
          <div class="flex mb20">
            <div>乙方：</div>
            <div>
              <div v-for="item in partBName">{{item}}</div>
            </div>
          </div>
        </div>
        <p>甲乙双方在平等、互利的基础上，遵循自愿、公平和诚信的原则，依照《中华人民共和国合同法》及其他有关法律、行政法规，经友好协商，达成如下协议:</p>
        <p>合作范围及约定</p>
        <div v-if="materialTable.length>0">
          <template v-if="[1,2,3].indexOf(contractType)>-1&&contractBusinessTypeFirst===2">
            <table>
              <thead>
              <tr>
                <th>物料描述</th>
                <th>价格</th>
                <th>税率</th>
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
        </div>
        <p>合同生效期间：{{startTime}}至{{endTime}}</p>
        <p v-if="materialTable.length>0">备注：合同总价款已包括但不限于增值税、安装费、运输费、送货上门费、人工费、定制费等与家具定制、购买、运输、安装有关的一切费用。</p>
        <div v-if="moneyInvolved">
          <div v-if="!oneOffPay">
            付款方式
            <table>
              <thead>
              <tr>
                <th>类型</th>
                <th>金额</th>
                <th>付款方式</th>
                <th>备注</th>
                <th>占比</th>
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
          <p>合同含税总金额为{{totalAmount}} （CNY {{totalAmount}}元）</p>
          <p>保证金{{deposit | numToChinese}}（CNY {{deposit}}元），占比{{depositRatio}}%。保证金支付时间为{{payTime}}.</p>
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
          <pre v-html="currentTpl"></pre>
        </div>
        <p></p>
        <table class="default-table">
          <tbody>
          <tr>
            <td>甲方：</td>
            <td>
              <div v-for="item in partAName">{{item}}</div>
            </td>
            <td>乙方：</td>
            <td>
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
    <div slot="footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Api from '@/api/support'
  import ApiContract from '@/api/manageContract'
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
        contractType: null,
        contractBusinessTypeFirst: null,
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
          const {content} = tplData
          this.currentTpl = content
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
      },
      toPdf() {
        document.getElementById('pdf-content').value = document.getElementById('pdf-wrap').innerHTML
        console.log(document.getElementById('pdf-wrap').innerHTML.toString())
        document.getElementById('pdf-form').submit()
        // ApiContract.toPdf({content: document.getElementById('pdf-wrap').innerHTML})
      }
    },
    watch: {
      datas() {
        console.log(this.datas)
        if (!Object.keys(this.datas).length) {
          return null
        }
        const {conStandard, cardFinanceInfoForm, endTime, startTime, templateId, contractType, contractBusinessTypeFirst} = this.datas
        const {jiaBillingInfo, yiBillingInfo, deposit, payTime, moneyInvolved, depositRatio, totalAmount, paymentMethods, oneOffPay} = cardFinanceInfoForm
        const {advance, progress, _final} = paymentMethods
        this.contractType = contractType
        this.contractBusinessTypeFirst = contractBusinessTypeFirst
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
          this.partBName = yiBillingInfo.length > 0 ? [yiBillingInfo[0].company] : []

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
