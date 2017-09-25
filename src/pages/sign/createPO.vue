<style type="text/scss" lang="scss" scoped>
  .form-container {
    .router-link {
      color: #FFFFFF;
    }
  }
</style>

<template>
  <div class="form-container">
    <div
      v-loading="loadingFlag"
      :element-loading-text="loadingText">
      <el-card>
        <div slot="header">
          <span class="common-title">基本信息</span>
        </div>
        <div class="basic-info">
          <el-form label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购申请">
                  <el-input v-model.trim="prCode"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" class="ml20" @click="add">添 加</el-button>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input v-model.trim="contractCode"></el-input>
                </el-form-item>
              </el-col>
              <el-button type="primary" @click="match" class="ml20">匹 配</el-button>
            </el-row>
          </el-form>
          <div v-if="prData.length!==0">
            <el-table
              :data="prData"
              border
              class="wp100">
              <el-table-column
                prop="pr"
                label="采购申请号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="companyCode"
                label="公司编码"
                width="100">
              </el-table-column>
              <el-table-column
                prop="companyName"
                label="公司名称">
              </el-table-column>
              <el-table-column
                prop="originatorName"
                label="发起人"
                width="100">
              </el-table-column>
              <el-table-column
                prop="originatorDepartmentName"
                label="发起部门">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                width="150">
                <template scope="scope">
                  {{scope.row.createTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="processViewUrl"
                label="PR申请链接">
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="80">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, prData)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <el-card>
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
                  <el-button type="primary" class="ml20" v-show="toDetail.query.contractId">
                    <router-link class="router-link" :to="toDetail" target="_blank">详 情</router-link>
                  </el-button>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同模式">
                      <el-input :value="contractForm.contractType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="合同类型">
                      <el-input :value="contractForm.contractBusinessTypeThirdName" disabled></el-input>
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
                  prop="category"
                  label="类型"
                  width="100"
                  :formatter="formatType">
                </el-table-column>
                <el-table-column
                  prop="materialCode"
                  label="物料编码"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="materialName"
                  min-width="100"
                  label="物料名称">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="数量"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="含税价"
                  width="120">
                  <template scope="scope">
                    <div v-if="radio">{{scope.row.price}}</div>
                    <div v-else>
                      <el-input v-model="scope.row.price"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="taxRate"
                  label="税率"
                  width="120">
                  <template scope="scope">
                    <div v-if="radio">{{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}</div>
                    <div v-else>
                      <el-input style="width:50px" v-model="scope.row.taxRate"></el-input>
                      %
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="deliveryTime"
                  label="交货日期"
                  width="186">
                  <template scope="scope">
                    <div>
                      <el-date-picker
                        v-model="scope.row.deliveryTime"
                        type="date"
                        style="width:150px"
                        :editable="false"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </template>
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
                <el-table-column
                  label="操作"
                  fixed="right"
                  width="100">
                  <template scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, orderData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <template v-if="showService">
            <el-tab-pane label="服务验收信息">
              <div class="server-info">
                <div class="mb20">
                  <el-button type="primary" @click="addService">新 增</el-button>
                </div>
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
                    prop="serviceName"
                    label="服务名称">
                  </el-table-column>
                  <el-table-column
                    prop="serviceRequire"
                    label="验收要求">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    label="备注">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, serverData)"
                        type="text"
                        size="small">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-card>
      <div class="mt20 mb20 ml20">
        <!--<el-button>保 存</el-button>-->
        <el-button type="primary" @click="submit">提 交</el-button>
      </div>
    </div>
    <el-dialog
      title="新增服务验收信息"
      :visible.sync="serverDialogVisible">
      <el-form
        ref="serverDialogForm"
        :model="serverDialogForm"
        :rules="serverRules"
        label-width="80px">
        <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="serverDialogForm.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="验收要求" prop="serviceRequire">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model="serverDialogForm.serviceRequire"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model="serverDialogForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="serverDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addDialogOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="匹配界面"
      size="large"
      :visible.sync="dialogVisible">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="框架合同" name="1">
            <el-table
              :data="matchData"
              border
              max-height="450"
              @row-click="rowClick"
              class="wp100">
              <el-table-column
                prop="pr"
                label="PR号">
              </el-table-column>
              <el-table-column
                prop="itemNo"
                label="行项目"
                width="80">
              </el-table-column>
              <el-table-column
                prop="materialCode"
                label="物料编码">
              </el-table-column>
              <el-table-column
                prop="materialName"
                label="物料名称">
                <template scope="scope">
                  <template v-if="!scope.row.materialName">
                    <el-radio v-model="radio" :label="scope.$index">{{''}}</el-radio>
                  </template>
                  <template v-else>
                    {{scope.row.materialName}}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractNo"
                label="合同号">
              </el-table-column>
              <el-table-column
                prop="supplierCode"
                label="供应商"
                width="100">
              </el-table-column>
              <el-table-column
                prop="supplierName"
                label="供应商名称">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                width="120">
                <template scope="scope">
                  {{scope.row.startTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="120">
                <template scope="scope">
                  {{scope.row.endTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="价格"
                width="80">
              </el-table-column>
              <el-table-column
                prop="taxRate"
                label="税率"
                width="80">
                <template scope="scope">{{scope.row.taxRate ? `${scope.row.taxRate}%` : ''}}</template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="框架意向合同" name="2">
            <el-table
              :data="intentionData"
              border
              max-height="450"
              @row-click="rowClick"
              class="wp100">
              <el-table-column
                label=""
                width="80">
                <template scope="scope">
                  <el-radio v-model="radio1" :label="scope.$index">{{''}}</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                prop="contractNo"
                label="合同号">
              </el-table-column>
              <el-table-column
                prop="supplierCode"
                label="供应商">
              </el-table-column>
              <el-table-column
                prop="supplierName"
                label="供应商名称">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="开始时间"
                width="120">
                <template scope="scope">
                  {{scope.row.startTime | formatDate}}
                </template>
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="120">
                <template scope="scope">
                  {{scope.row.endTime | formatDate}}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import signModel from '@/api/sign'
  import {routerNames, prTypeMap, contractPatternMap} from '@/core/consts'
  import {formatTime, formatDate} from '@/filters/moment'
  import fillZero from '@/util/fillZero'
  import comLoading from '@/mixins/comLoading'

  export default {
    mixins: [comLoading],
    data() {
      return {
        prCode: '',
        contractCode: '',
        prData: [],
        materialsMatchData: [],
        activeName: '1',
        matchData: [],
        intentionData: [],
        radio: null,
        radio1: null,
        orderData: [],
        serverData: [],
        serverDialogVisible: false,
        serverDialogForm: {
          serviceName: '',
          serviceRequire: '',
          remark: ''
        },
        serverRules: {
          serviceName: [{
            required: true,
            message: '请输入服务名称',
            trigger: 'blur'
          }],
          serviceRequire: [{
            required: true,
            message: '请输入验收要求',
            trigger: 'blur'
          }, {
            max: 300,
            message: '长度不超过300个字符',
            trigger: 'change'
          }],
          remark: [{max: 300, message: '长度不超过300个字符', trigger: 'change'}]
        },
        dialogVisible: false,
        contractForm: {},
        orderForm: {},
        showService: false,
        toDetail: {name: routerNames.con_Check, query: {contractId: ''}}
      }
    },
    methods: {
      add() {
        const prCode = this.prCode
        const prData = this.prData
        const exist = prData.some((item) => {
          return item.pr === fillZero(prCode, 10)
        })
        if (exist) {
          this.$message.warning('列表中已存在！')
          return
        }

        this.comLoading(1)
        signModel.getPr({
          pr: prCode
        }).then((res) => {
          this.comLoading()
          const data = res.data.dataMap
          console.log(data)
          if (this.prData.length) {
            if (this.prData[0].companyCode !== data.companyCode) {
              this.$message.warning('采购申请号所属公司编码不同!')
              return
            }
            if (this.prData[0].category !== data.category) {
              this.$message.warning('采购申请号类型不同!')
              return
            }
          }
          this.prData.push(data)
        })
      },
      match() {
        const prData = this.prData
        if (!prData.length) {
          this.$message.warning('请输入采购申请号！')
          return
        }

        const pr = prData.map((item) => {
          return item.pr
        })

        this.comLoading(1)
        signModel.getMatch({
          pr,
          contractNo: this.contractCode
        }).then((res) => {
          this.comLoading()
          console.log(res)
          const data = res.data.dataMap
          const {intentionContVos, materialsMatchVoList} = data
          this.intentionData = intentionContVos
          this.materialsMatchData = materialsMatchVoList
          this.matchData = this.getSource(materialsMatchVoList)
          this.dialogVisible = true
        })
      },
      getSource(data) {
        const result = []
        const materialList = data || []
        materialList.forEach((item) => {
          const {pr, itemNo, materialName, materialCode, contVos} = item
          if (contVos && contVos.length) {
            result.push({pr, itemNo, materialCode, materialName})
            contVos.forEach((cont) => {
              result.push(cont)
            })
          }
        })
        console.log(result)
        return result
      },
      setInfo() {
        if (!this.radio && !(String(this.radio1))) {
          this.$message.warning('请选择一项！')
          return
        }
        this.dialogVisible = false

        this.setContractData()
        this.setOrderData()
        this.setOrderForm()
        this.showServiceTab()
      },
      setContractData() {
        console.log(this.activeName)
        if (this.activeName === '1') {
          this.contractForm = this.matchData[this.radio]
        } else {
          this.contractForm = this.intentionData[this.radio1]
        }
        this.contractForm.contractType = contractPatternMap[this.contractForm.contractType]
        this.toDetail.query.contractId = this.contractForm.id
        console.log('合同信息', this.contractForm)
      },
      setOrderForm() {
        const {companyCode} = this.prData[0]
        const {supplierName} = this.contractForm
        const type = this.orderData.length ? [1, 3].indexOf(this.orderData[0].category) > -1 ? prTypeMap[1] : prTypeMap[2] : ''
        this.orderForm = {
          companyCode,
          type,
          supplierName
        }
      },
      setOrderData() {
        const {id} = this.contractForm
        const orderData = []
        if (this.radio) {
          this.materialsMatchData.forEach((item) => {
            const {pr, itemNo, materialName, materialCode, contVos, category} = item
            if (contVos && contVos.length) {
              contVos.forEach((cont) => {
                if (cont.id === id) {
                  console.log(cont)
                  orderData.push({
                    pr,
                    category,
                    itemNo,
                    materialName,
                    materialCode,
                    price: cont.totalAmount,
                    total: cont.total,
                    taxRate: cont.taxRate,
                    deliveryTime: ''
                  })
                }
              })
            }
          })
        } else {
          this.prData.forEach((item) => {
            console.log(item)
            const {purOrderMaterialsList} = item
            const {pr, category} = item
            purOrderMaterialsList.forEach((material) => {
              const {itemNo, materialName, materialCode, total} = material
              orderData.push({
                pr,
                category,
                itemNo,
                materialName,
                materialCode,
                price: '',
                total,
                taxRate: '',
                deliveryTime: ''
              })
            })
          })
        }
        this.orderData = orderData
      },
      showServiceTab() {
        this.showService = this.prData.length && this.prData[0].category === 2 && this.radio1
      },
      formatType(row, column, cellValue) {
        return prTypeMap[cellValue]
      },
      addService() {
        this.serverDialogVisible = true
      },
      rowClick(row) {
        console.log(row)
        let index = 0
        if (this.activeName === '1') {
          const {pr} = row
          if (pr) {
            return
          }
          index = this.matchData.indexOf(row)
          this.radio = index
        } else {
          index = this.intentionData.indexOf(row)
          this.radio1 = index
        }
      },
      handleServiceItem(index, row) {
        console.log(row)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      addDialogOk() {
        this.$refs['serverDialogForm'].validate((valid) => {
          if (valid) {
            const form = this.serverDialogForm
            this.serverData.push({...form})
            Object.keys(form).forEach((key) => {
              form[key] = ''
            })
            this.serverDialogVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      check(result) {
        const {purOrderMaterials} = result
        if (!purOrderMaterials.length) {
          this.$message.warning('订单信息不能为空！')
          return
        }
        if (this.radio) {
          const exist = purOrderMaterials.some(item => !item.deliveryTime)
          if (exist) {
            this.$message.warning('请选择订单交货日期！')
            return
          }
        } else {
          const exist = purOrderMaterials.some(item => (!item.totalAmount || !item.taxRate || !item.deliveryTime))
          if (exist) {
            this.$message.warning('订单信息不完整！')
            return
          }
          if (this.showService && this.serverData.length) {
            this.$message.warning('服务验收信息不能为空！')
            return
          }
        }

        return true
      },
      getResult() {
        const {id, contractNo} = this.contractForm

        return {
          id,
          contractNo,
          orderCheckItems: this.serverData,
          purOrderMaterials: this.orderData
        }
      },
      submit() {
        const result = this.getResult()
        console.log(result)
        if (!this.check(result)) {
          return
        }
        signModel.submit(result).then((res) => {
          this.$router.push({
            name: routerNames.con_order_list
          })
        })
      }
    },
    filters: {
      formatTime,
      formatDate
    },
    watch: {
      radio() {
        if (this.activeName === '1') {
          this.radio1 = null
        }
      },
      radio1() {
        if (this.activeName === '2') {
          this.radio = null
        }
      }
    }
  }
</script>
