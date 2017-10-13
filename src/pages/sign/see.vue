<style type="text/scss" lang="scss" scoped>

</style>

<template>
  <div class="pd20">
    <el-row class="mb20">采购订单号{{info.orderNo}}</el-row>
    <el-tabs>
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
            class="wp100">
            <el-table-column
              type="index"
              label="序号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="category"
              label="类型"
              width="100"
              :formatter="formatType">
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料编码"
              min-width="150">
              <template scope="scope">
                {{scope.row.materialCode | cutZero}}
              </template>
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="total"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="price"
              label="含税价"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxRate"
              label="税率"
              width="80">
              <template scope="scope">
                {{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}
              </template>
            </el-table-column>
            <el-table-column
              prop="deliveryTime"
              label="交货日期"
              width="120"
              :formatter="formatDate">
            </el-table-column>
            <el-table-column
              prop="pr"
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
      <el-tab-pane label="合同信息">
        <div class="contract-info">
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input :value="contractForm.contractNo" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
                <router-link class="router-link-default" :to="toDetail" target="_blank">详 情</router-link>
              </el-button>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同模式">
                  <el-input :value="contractForm.contractBusinessTypeThirdName" disabled></el-input>
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
      <el-tab-pane label="服务验收信息" v-if="serverData.length>0">
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
  import cutZero from '@/util/cutZero'
  import {routerNames, contractPatternMap, prTypeMap} from '@/core/consts'

  export default {
    mixins: [comLoading],
    data() {
      return {
        info: {},
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}},
        orderForm: {},
        orderData: [],
        serverData: [],
        contractForm: {}
      }
    },
    methods: {
      getInfo(id) {
        this.comLoading()
        Api.detailByPoId({id}).then((res) => {
          console.log(res)
          this.info = res.data.dataMap
          this.toDetail.query.contractId = this.info.contractId
          this.setOrderData()
          this.setServerData()
          this.setContractForm()
          this.comLoading(false)
        })
      },
      setContractForm() {
        const {contractNo, contractBusinessTypeThirdName, contractType, belongProject, startTime, endTime} = this.info
        this.contractForm = {
          contractNo,
          contractBusinessTypeThirdName,
          contractType: contractPatternMap[contractType],
          belongProject,
          startTime,
          endTime
        }
      },
      setOrderData() {
        const {purOrderMaterials, supplierName, companyCode} = this.info
        const type = purOrderMaterials.length ? [1, 3].indexOf(purOrderMaterials[0].category) > -1 ? prTypeMap[1] : prTypeMap[2] : ''
        this.orderData = purOrderMaterials
        this.orderForm = {supplierName, type, companyCode}
      },
      setServerData() {
        const {orderCheckItems} = this.info
        this.serverData = orderCheckItems
      },
      formatType(row, column, cellValue) {
        return prTypeMap[cellValue]
      },
      formatDate(value) {
        return formatDate(value)
      }
    },
    created() {
      const {id} = this.$route.query
      this.getInfo(id)
    },
    filters: {
      formatDate,
      cutZero
    },
    components: {
      Process
    }
  }
</script>
