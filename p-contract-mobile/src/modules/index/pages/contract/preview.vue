<style type="text/scss" lang="scss" scoped>
  .preview-container {
    padding-top: 62px;
  }
</style>

<template>
  <mt-popup
    v-model="visible"
    :modal="false"
    :closeOnClickModal="false"
    position="bottom"
    class="popup">
    <div>
      <mt-header fixed title="合同预览">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      <div class="preview-container">
        <div class="tr">
          <span>{{contractNo}}</span>
        </div>
        <div>
          <div class="mb20">{{title}}</div>
          <table>
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
          <div v-if="materialTable&&materialTable.length">
            <p>合同标的：</p>
            <div>
              <template v-if="[1,2,3].indexOf(info.contractType)>-1&&info.contractBusinessTypeFirst===2">
                <table>
                  <thead>
                  <tr>
                    <th>物料描述</th>
                    <th>价格</th>
                    <th width="100">税率</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in info.materialTable">
                    <td>{{item.materialName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <template v-if="[1,2].indexOf(info.contractType)>-1&&[1,3].indexOf(info.contractBusinessTypeFirst)>-1">
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
                  <tr v-for="item in info.materialTable">
                    <td>{{item.materialCode}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <template v-if="info.contractType===3&&[1,3].indexOf(info.contractBusinessTypeFirst)>-1">
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
                  <tr v-for="item in info.materialTable">
                    <td>{{item.materialCode}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.taxRate}}%</td>
                  </tr>
                  </tbody>
                </table>
              </template>
              <div class="mt20 mb20" v-if="info.corporeRemark">
                <div>合同标的备注：</div>
                <div>{{info.corporeRemark}}</div>
              </div>
            </div>
          </div>
          <div v-if="moneyInvolved">
            <div v-if="!oneOffPay">
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
                <tr v-for="item in info.priceTable">
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
              <div>{{paymentRemark}}</div>
            </div>
            <div>合同含税总金额为{{totalAmount | numToChinese}} （CNY {{totalAmount}}元）</div>
          </div>
          <div class="mb20" v-html="currentTpl"></div>
          <div class="mb20" v-if="effectiveCondition===1">
            <span>合同起止日期：{{startTime}} ~ {{endTime}}</span>
          </div>
          <div class="mt20" v-if="effectiveCondition===2">
            <p>生效备注：</p>
            <div>{{conditionDesc}}</div>
          </div>
          <table>
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
  import Api from '../../../../api/support';
  import numToChinese from '../../../../filters/numToChinese';

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
        paymentTimePeriods: [],
        partAName: [],
        partBName: [],
        effectiveCondition: null,
        conditionDesc: '',
        startTime: '',
        endTime: '',
        totalAmount: '',
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
      transformData(data, name) {
        const priceTable = [];
        if (data.length) {
          data.forEach((item) => {
            const {seriousPayments} = item;
            if (seriousPayments) {
              const {subItem} = item;
              subItem.forEach((item1, index1) => {
                const {
                  paymentAmount, paymentTimePeriod, remark, ratio
                } = item1;
                const type = `${name}${index1 + 1}`;
                priceTable.push({
                  type,
                  paymentAmount,
                  paymentTimePeriod: this.getPaymentTimePeriodName(paymentTimePeriod),
                  remark,
                  ratio: `${ratio}%`
                });
              });
              return;
            }
            priceTable.push({
              ...item,
              type: item.type === '进度款' ? '' : item.type,
              paymentTimePeriod: this.getPaymentTimePeriodName(item.paymentTimePeriod),
              ratio: `${item.ratio}%`
            });
          });
        }
        return priceTable;
      },
      getPaymentTimePeriodName(id) {
        const paymentTimePeriods = this.paymentTimePeriods;
        let name = '';
        paymentTimePeriods.some((item) => {
          if (item.id === id) {
            name = item.name;
            return true;
          }
          return false;
        });

        return name;
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
        Api.getTplData({templateId}).then((res) => {
          const data = res.data.dataMap;
          const {content} = data;
          this.currentTpl = content;
          this.tplData[templateId] = data;
        });
      }
    },
    watch: {
      info(val) {
        const {
          contractNo,
          contractBusinessTypeFirst,
          contractBusinessTypeThirdName,
          materialTable,
          endTime,
          startTime,
          conditionDesc,
          effectiveCondition,
          templateId,
          contractType,
          corporeRemark,
          paymentRemark,
          jiaBillingInfo,
          yiBillingInfo,
          moneyInvolved,
          totalAmount,
          oneOffPay,
          paymentMethods
        } = val.datas;
        const {
          earnest,
          advance,
          progress,
          _final,
          deposit
        } = paymentMethods;
        this.paymentTimePeriods = paymentTimePeriods;
        this.contractType = contractType;
        this.contractBusinessTypeFirst = contractBusinessTypeFirst;
        this.materialTable = materialTable;
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
            this.priceTable = [...this.transformData(earnest, '定金'), ...this.transformData(advance, '预付款'), ...this.transformData(progress, ''), ...this.transformData(_final, '尾款'), ...this.transformData(deposit, '保证金')];
          }
        }

        this.getTplData(templateId);
      }
    },
    filters: {
      numToChinese
    }
  };
</script>
