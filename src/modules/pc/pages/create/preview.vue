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
    size="large"
    @close="ok">
    <div>
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
          <div style="text-align: center;font-size:18px;font-weight:bold;padding-bottom: 10px;" class="mb20 f18 fb">{{title}}合同</div>
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
          <div class="mb20" v-html="currentTpl"></div>
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
              <div>{{paymentRemark}}</div>
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
          <el-row class="mt20" v-if="effectiveCondition===1">
            <el-col :span="5">合同生效日期：{{startTime}}</el-col>
            <el-col :span="5">合同终止日期：{{endTime}}</el-col>
          </el-row>
          <el-row class="mt20" v-if="effectiveCondition===2">
            <el-col :span="3">生效备注：</el-col>
            <el-col :span="21">{{conditionDesc}}</el-col>
          </el-row>
          <p></p>
          <table class="default-table">
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
    </div>
    <div slot="footer">
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Api from '../../../../api/support/index';
  import numToChinese from '../../../../util/numToChinese';

  export default {
    props: {
      visible: Boolean,
      datas: {
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        contractNo: '',
        supplierName: '',
        title: '',
        contractType: null,
        contractBusinessTypeFirst: null,
        materialTable: [],
        priceTable: [],
        paymentTimePeriods: [],
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
        tplData: {},
        currentTpl: null,
        corporeRemark: '',
        paymentRemark: ''
      };
    },
    methods: {
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
      },
      ok() {
        this.$emit('update:visible', false);
      },
      toPdf() {
        document.getElementById('pdf-content').value = document.getElementById('pdf-wrap').innerHTML;
        document.getElementById('pdf-form').submit();
      }
    },
    watch: {
      datas() {
        if (!Object.keys(this.datas).length) {
          return;
        }
        const {
          contractNo, contractBusinessTypeThirdName, conStandard, cardFinanceInfoForm, endTime, startTime, conditionDesc, effectiveCondition, templateId, contractType, contractBusinessTypeFirst, corporeRemark, paymentRemark
        } = this.datas;
        const {
          jiaBillingInfo, yiBillingInfo, moneyInvolved, totalAmount, paymentMethods, oneOffPay, paymentTimePeriods
        } = cardFinanceInfoForm;
        const {
          earnest, advance, progress, _final, deposit
        } = paymentMethods;
        this.paymentTimePeriods = paymentTimePeriods;
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
          this.partA = jiaBillingInfo;
          this.partB = yiBillingInfo[0] || {};

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
