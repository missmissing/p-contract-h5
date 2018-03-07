<style type="text/scss" lang="scss" scoped>
  .preview-container {
    padding: 62px 10px 20px 10px;
    height: 100%;
    overflow-y: auto;
    .title {
      text-align: center;
      font-size: 16px;
      margin-bottom: 20px;
    }
    table {
      th, td {
        border: 1px solid;
        border-collapse: collapse;
      }
      &.no-border {
        th, td {
          border: none;
        }
      }
    }

    .pre {
      white-space: pre-wrap;
    }
  }
</style>

<template>
  <mt-popup
    v-model="visible"
    :modal="false"
    :closeOnClickModal="false"
    position="bottom"
    class="popup">
    <div style="height:100%;">
      <mt-header fixed title="合同预览">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      <div class="preview-container">
        <div class="tr">
          <span>{{contractNo}}</span>
        </div>
        <div>
          <div class="title">{{title}}</div>
          <table class="no-border mb20">
            <tbody>
            <tr>
              <td>甲方：</td>
              <td>
                <div v-for="item in partAName">{{item}}</div>
              </td>
            </tr>
            <tr>
              <td>乙方：</td>
              <td>
                <div v-for="item in partBName">{{item}}</div>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-if="materialTable&&materialTable.length" class="mb20">
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
          <div v-if="moneyInvolved" class="mb20">
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
            <div>合同含税总金额为{{totalAmount | numToChinese}} （CNY {{totalAmount}}元）</div>
          </div>
          <div class="pre mt20 mb20" v-html="currentTpl"></div>
          <div class="mb20" v-if="effectiveCondition===1">
            <span>合同起止日期：{{startTime | formatDate}} ~ {{endTime | formatDate}}</span>
          </div>
          <div class="mb20" v-if="effectiveCondition===2">
            <p>生效备注：</p>
            <div>{{conditionDesc}}</div>
          </div>
          <table class="no-border mb20">
            <tbody>
            <tr>
              <td>甲方：</td>
              <td>
                <div v-for="item in partAName" class="mb10">{{item}}</div>
              </td>
            </tr>
            <tr>
              <td>法定代表人：</td>
              <td></td>
            </tr>
            <tr>
              <td>日期：</td>
              <td></td>
            </tr>
            <tr>
              <td>乙方：</td>
              <td>
                <div v-for="item in partBName" class="mb10">{{item}}</div>
              </td>
            </tr>
            <tr>
              <td>法定代表人：</td>
              <td></td>
            </tr>
            <tr>
              <td>日期：</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
  import Api from '../../../../api/manageContract';
  import numToChinese from '../../../../filters/numToChinese';
  import {formatDate} from '../../../../filters/moment';
  import paymentTimePeriods from '../../../../filters/paymentTimePeriods';

  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        contractNo: '',
        title: '',
        contractType: null,
        contractBusinessTypeFirst: null,
        materialTable: [],
        priceTable: [],
        partAName: [],
        partBName: [],
        effectiveCondition: null,
        conditionDesc: '',
        startTime: '',
        endTime: '',
        totalAmount: 0,
        depositRatio: '',
        moneyInvolved: false,
        oneOffPay: false,
        currentTpl: '',
        corporeRemark: '',
        paymentRemark: '',
        tplData: {}
      };
    },
    methods: {
      back() {
        this.$emit('update:visible', false)
      },
      transformData(data) {
        const priceTable = [];
        let name = '';
        if (data.length) {
          data.forEach((item) => {
            if (!item.paymentAmount) {
              return
            }
            const {seriousPayments, payType} = item;
            switch (payType) {
              case 1:
                name = '定金';
                break;
              case 2:
                name = '预付款';
                break;
              case 3:
                name = '';
                break;
              case 4:
                name = '尾款';
                break;
              case 5:
                name = '保证金';
                break
            }
            if (seriousPayments) {
              const {financeMores} = item;
              financeMores.forEach((item1, index1) => {
                const {
                  paymentAmount, paymentTimePeriod, remark, ratio
                } = item1;
                const type = `${name}${index1 + 1}`;
                priceTable.push({
                  type,
                  paymentAmount,
                  paymentTimePeriod: paymentTimePeriods(paymentTimePeriod),
                  remark,
                  ratio: `${ratio}%`
                })
              });
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
      getTplData(templateId) {
        const tplData = this.tplData[templateId];
        if (tplData) {
          const {content} = tplData;
          this.currentTpl = content;
          return;
        }
        if (!templateId) {
          return;
        }
        Api.getTplContent(this.info.datas).then((res) => {
          const data = res.data.dataMap;
          this.currentTpl = data;
          this.tplData[templateId] = data;
        });
      }
    },
    watch: {
      info(val) {
        const {
          baseInfoForm,
          cardContentInfoForm,
          cardFinanceInfoForm
        } = val.datas;
        const {contractNo, templateId, contractType, contractBusinessTypeFirst, contractBusinessTypeThirdName} = baseInfoForm;
        const {startTime, endTime, conStandard, effectiveCondition, conditionDesc, corporeRemark} = cardContentInfoForm;
        const {paymentMethods, paymentRemark, jiaBillingInfo, yiBillingInfo, moneyInvolved, totalAmount, oneOffPay} = cardFinanceInfoForm;
        this.contractType = contractType;
        this.contractBusinessTypeFirst = contractBusinessTypeFirst;
        this.materialTable = conStandard;
        this.startTime = startTime;
        this.endTime = endTime;
        this.conditionDesc = conditionDesc;
        this.effectiveCondition = effectiveCondition;
        this.contractNo = contractNo;
        this.corporeRemark = corporeRemark;
        this.paymentRemark = paymentRemark;
        this.title = contractBusinessTypeThirdName;
        this.partAName = jiaBillingInfo.map((item) => item.company);
        this.partBName = yiBillingInfo.length > 0 ? [yiBillingInfo[0].company] : [];
        this.supplierName = yiBillingInfo.length > 0 ? yiBillingInfo[0].company : '';
        if (moneyInvolved) {
          this.moneyInvolved = moneyInvolved;
          this.totalAmount = totalAmount;

          if (oneOffPay) {
            this.oneOffPay = true;
          } else {
            this.priceTable = this.transformData(paymentMethods);
          }
        }

        this.getTplData(templateId);
      }
    },
    filters: {
      numToChinese,
      formatDate
    }
  };
</script>
