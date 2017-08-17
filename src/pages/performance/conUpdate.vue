<style type="text/scss" lang="scss" scoped></style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="common-title">变更原因</span>
      </div>
      <div>
        <el-form label-width="120px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="合同编号">
                <el-input
                  icon="search"
                  placeholder="点击图标进行搜索"
                  v-model="form.contractCode"
                  :on-icon-click="search">
                </el-input>
              </el-form-item>
            </el-col>
            <el-button type="info" class="ml20">详 情</el-button>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="变更方式">
                <el-select
                  class="wp100"
                  v-model="form.changeMode"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新合同编号">
                <el-input disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :maxlength="300"
              :autosize="{ minRows: 2 }"
              resize="none"
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="common-title">合同信息</span>
      </div>
      <div>
        <el-tabs value="1" type="card">
          <el-tab-pane label="合同基本信息" name="1">
            <template>
              <el-form label-width="120px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="业务经办人">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="业务部门">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同编号">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同模式">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同类型">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所属项目">
                      <el-input readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同版本">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同文本类型">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="模板名称">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="模板编号">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="盖章次序">
                  <el-radio v-model="form.radio" label="1">对方先盖章</el-radio>
                  <el-radio v-model="form.radio" label="2">我方先盖章</el-radio>
                </el-form-item>
                <el-row v-show="form.radio==='2'">
                  <el-form-item label="我方先盖章原因">
                    <el-input
                      type="textarea"
                      :maxlength="300"
                      :autosize="{ minRows: 2 }"
                      resize="none"
                      v-model="form.signReason">
                    </el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </template>
          </el-tab-pane>
          <el-tab-pane label="合同内容信息" name="2">
            <template>
              <div class="mb20">
                <div class="mb20">
                  <div class="mb10">合同供应商信息</div>
                  <el-table
                    :data="supplierData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="supplierCode"
                      label="供应商编号">
                    </el-table-column>
                    <el-table-column
                      prop="supplierName"
                      label="供应商名称">
                    </el-table-column>
                    <el-table-column
                      prop="bandAccount"
                      label="银行账号">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mb20">
                  <div class="mb10">合同我方主体名称</div>
                  <el-table
                    :data="mainData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="companyCode"
                      label="公司代码">
                    </el-table-column>
                    <el-table-column
                      prop="companyName"
                      label="公司名称">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mb20">
                  <div class="mb10">第三方信息</div>
                  <el-table
                    :data="thirdPartyData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="supplierCode"
                      label="供应商编号">
                    </el-table-column>
                    <el-table-column
                      prop="supplierName"
                      label="供应商名称">
                    </el-table-column>
                    <el-table-column
                      prop="bandAccount"
                      label="银行账号">
                    </el-table-column>
                  </el-table>
                </div>
                <div>
                  <div class="mb10">合同标的</div>
                  <el-table
                    :data="goodsData"
                    border
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="materielCode"
                      label="物料编码">
                    </el-table-column>
                    <el-table-column
                      prop="materielName"
                      label="物料名称">
                    </el-table-column>
                    <el-table-column
                      prop="count"
                      label="数量">
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="价格">
                    </el-table-column>
                    <el-table-column
                      prop="taxRate"
                      label="税率">
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <el-form label-width="120px">
                <el-form-item label="固定期限">
                  <el-switch
                    v-model="form.fixedDate"
                    on-text=""
                    off-text="">
                  </el-switch>
                </el-form-item>
                <el-row v-show="form.fixedDate">
                  <el-col :span="8">
                    <el-form-item label="合同生效日期">
                      <el-date-picker
                        v-model="form.startDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同终止日期">
                      <el-date-picker
                        v-model="form.endDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-tab-pane>
          <el-tab-pane label="合同财务信息" name="3">
            <template>
              <el-form label-width="120px">
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="一次性付款">
                      <el-switch
                        v-model="form.payOnce"
                        on-text=""
                        off-text="">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="含税">
                      <el-switch
                        v-model="form.tax"
                        on-text=""
                        off-text="">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="mb20">
                <div class="mb10">付款方式</div>
                <el-table
                  :data="payData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="type"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="payMulti"
                    label="多次付款">
                  </el-table-column>
                  <el-table-column
                    prop="payAmount"
                    label="付款金额">
                  </el-table-column>
                  <el-table-column
                    prop="payTime"
                    label="付款时间">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    prop="percent"
                    label="占比">
                  </el-table-column>
                </el-table>
              </div>
              <el-form label-width="120px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="币种">
                      <el-select v-model="form.currency" class="wp100">
                        <el-option
                          v-for="item in currencyOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="开票类型">
                      <el-select v-model="form.invoiceType" class="wp100">
                        <el-option
                          v-for="item in invoiceOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="税率" class="wp100">
                      <el-select v-model="form.taxRate">
                        <el-option
                          v-for="item in taxOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同总金额">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="收取保证金">
                  <el-switch
                    v-model="form.bond"
                    on-text=""
                    off-text="">
                  </el-switch>
                </el-form-item>
                <el-row v-show="form.bond">
                  <el-col :span="8">
                    <el-form-item label="保证金金额">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保证金占比">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="付款时间">
                      <el-select v-model="form.bondTime" class="wp100">
                        <el-option
                          v-for="item in bondOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-tab-pane>
          <el-tab-pane label="合同验收与样品信息" name="4">
            <template>
              <el-form label-width="120px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="验收责任人">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="验收责任部门">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="服务类验收方式">
                      <el-input readonly></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="验收监督人">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="验收监督人部门">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-table
                :data="jointData"
                border
                class="mb20 wp100">
                <el-table-column
                  prop="receiver"
                  label="联合验收人">
                </el-table-column>
                <el-table-column
                  prop="receiverApart"
                  label="联合验收人部门">
                </el-table-column>
                <el-table-column
                  prop="mandatory"
                  label="必选">
                </el-table-column>
                <el-table-column
                  label="操作">
                </el-table-column>
              </el-table>
              <el-form label-width="120px">
                <el-form-item label="是否有样品">
                  <el-switch
                    v-model="form.sample"
                    on-text="是"
                    off-text="否">
                  </el-switch>
                </el-form-item>
              </el-form>
              <div class="mb20">
                <div class="mb10">物资验收事项</div>
                <el-table
                  :data="materielData"
                  border
                  class="wp100">
                  <el-table-column
                    type="index"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="materielCode"
                    label="物料编码">
                  </el-table-column>
                  <el-table-column
                    prop="materielDesc"
                    label="物料描述">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <div class="mb10">服务验收事项</div>
                <el-table
                  :data="serviceData"
                  border
                  class="wp100">
                  <el-table-column
                    type="index"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="serviceName"
                    label="服务名称">
                  </el-table-column>
                  <el-table-column
                    prop="acceptRequire"
                    label="验收要求">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="从协议" name="5">
            <template>
              <div class="mb10">附件信息</div>
              <el-table
                :data="filesData"
                border
                class="wp100">
                <el-table-column
                  prop="fileType"
                  label="附件类型">
                </el-table-column>
                <el-table-column
                  prop="addAgreement"
                  label="从协议编号">
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名称">
                </el-table-column>
                <el-table-column
                  prop="files"
                  label="附件">
                </el-table-column>
                <el-table-column
                  label="操作">
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="备注" name="6">
            <template>
              <el-form label-width="120px">
                <el-form-item label="其他说明">
                  <el-input
                    type="textarea"
                    :maxlength="300"
                    :autosize="{ minRows: 2 }"
                    resize="none"
                    v-model="form.otherDesc">
                  </el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <div class="mt20 mb20">
      <el-button @click="save" class="ml20">保 存</el-button>
      <el-button type="primary" @click="submit">提 交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          contractCode: '',
          remark: '',
          changeMode: '',
          radio: '1',
          signReason: '',
          fixedDate: false,
          startDate: '',
          endDate: '',
          currency: 1,
          invoiceType: 1,
          taxRate: 1,
          bond: false,
          bondTime: 1,
          otherDesc: '',
          payOnce: false,
          tax: false,
          sample: ''
        },
        currencyOptions: [{
          value: 1,
          label: 'CNY人民币'
        }],
        invoiceOptions: [{
          value: 1,
          label: '增值税专用发票'
        }],
        taxOptions: [{
          value: 1,
          label: '17%'
        }],
        bondOptions: [{
          value: 1,
          label: '合同结束后15天'
        }],
        options: [{
          value: 1,
          label: '原合同有效'
        }],
        supplierData: [],
        mainData: [],
        thirdPartyData: [],
        goodsData: [],
        payData: [],
        jointData: [],
        materielData: [],
        serviceData: [],
        filesData: []
      };
    },
    methods: {
      search() {
        console.log(JSON.stringify(this.form));
      },
      save() {

      },
      submit() {

      }
    }
  };
</script>
