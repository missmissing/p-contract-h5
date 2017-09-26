<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div
    class="pd20"
    v-loading="loadingFlag"
    :element-loading-text="loadingText">
    <el-tabs>
      <el-tab-pane label="合同信息">
        <div class="contract-info">
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input :value="contractForm.contractNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20">详 情</el-button>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同版本">
                  <el-input :value="contractForm.version?`V${contractForm.version}`:''" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同模式">
                  <el-input :value="contractForm.curConModelId" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同类型">
                  <el-input :value="contractForm.contractType" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属项目">
                  <el-input :value="contractForm.belongProject" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生效日期">
                  <el-input :value="contractForm.startTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="终止日期">
                  <el-input :value="contractForm.endTime | formatDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="订单信息">
        <div class="order-info">
          <el-form label-width="100px">
            <el-row>
              <el-col :span="7">
                <el-form-item label="供应商">
                  <el-input :value="orderForm.supplierName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="订单类型">
                  <el-input :value="orderForm.type" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="公司编码">
                  <el-input :value="orderForm.companyCode" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            :data="orderData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料编码"
              width="100">
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxPrice"
              label="含税价"
              width="80">
              <template scope="scope">
                <div v-if="radio">{{scope.row.taxPrice}}</div>
                <div v-else>
                  <el-input v-model="scope.row.taxPrice"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="taxRate"
              label="税率"
              width="80">
              <template scope="scope">
                <div v-if="radio">{{scope.row.taxRate}}</div>
                <div v-else>
                  <el-input v-model="scope.row.taxRate"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="deliveryDate"
              label="交货日期"
              width="100">
            </el-table-column>
            <el-table-column
              prop="purchseRequest"
              label="采购申请"
              width="100">
            </el-table-column>
            <el-table-column
              prop="itemNo"
              label="行项目号"
              width="100">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="服务验收信息">
        <div class="server-info">
          <el-table
            :data="serverData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="serverName"
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
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <Process></Process>
  </div>
</template>

<script>
  import Api from '@/api/sign'
  import {formatDate} from '@/filters/moment'
  import comLoading from '@/mixins/comLoading'
  import Process from '@/components/process'

  export default {
    mixins: [comLoading],
    data() {
      return {
        info: {},
        orderForm: {},
        orderData: [],
        serverData: [],
        contractForm: {}
      }
    },
    methods: {
      getInfo(id) {
        this.comLoading(1)
        Api.detail({id}).then((res) => {
          console.log(res)
          this.info = res.data.dataMap
          this.setOrderForm()
          this.setOrderData()
          this.setServerData()
          this.setContractForm()
          this.comLoading()
        })
      },
      setOrderForm() {

      },
      setOrderData() {

      },
      setServerData() {

      },
      setContractForm() {

      }
    },
    created() {
      const {id} = this.$router.query
      this.getInfo(id)
    },
    filters: {
      formatDate
    },
    components: {
      Process
    }
  }
</script>
