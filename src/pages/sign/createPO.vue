<style type="text/scss" lang="scss" scoped>
  .form-container {

  }
</style>

<template>
  <div class="form-container">
    <div>
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
                width="200">
                <template scope="scope">
                  {{scope.row.createTime | formatTime}}
                </template>
              </el-table-column>
              <el-table-column
                prop="processViewUrl"
                label="PR申请链接">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
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
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-button type="primary" class="ml20">详 情</el-button>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="合同版本">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
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
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="生效日期">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="终止日期">
                      <el-input disabled></el-input>
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
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="订单类型">
                      <el-input disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="公司编码">
                      <el-input disabled></el-input>
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
                  prop="materielCode"
                  label="物料编码"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="materielName"
                  label="物料名称">
                </el-table-column>
                <el-table-column
                  prop="materielCode"
                  label="数量"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="taxPrice"
                  label="含税价"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="taxRate"
                  label="税率"
                  width="80">
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
                  prop="itemNum"
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
                  prop="acceptRequire"
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
        </el-tabs>
      </el-card>
    </div>
    <div class="mt20 mb20 ml20">
      <!--<el-button>保 存</el-button>-->
      <el-button type="primary">提 交</el-button>
    </div>
    <el-dialog
      title="新增服务验收信息"
      :visible.sync="serverDialogVisible">
      <el-form
        ref="serverDialogForm"
        :model="serverDialogForm"
        :rules="serverRules"
        label-width="80px">
        <el-form-item label="服务名称" prop="serverName">
          <el-input v-model="serverDialogForm.serverName"></el-input>
        </el-form-item>
        <el-form-item label="验收要求" prop="acceptRequire">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            resize="none"
            v-model="serverDialogForm.acceptRequire"></el-input>
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
        <el-tabs>
          <el-tab-pane label="框架合同">
            <el-table
              :data="matchData"
              border
              max-height="450"
              class="wp100">
              <el-table-column
                prop="pr"
                label="PR号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="itemNo"
                label="行项目"
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
                label="合同号"
                width="80">
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
                width="100">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="100">
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
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="框架意向合同">
            <el-table
              :data="intentionData"
              border
              max-height="450"
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
                label="合同号"
                width="80">
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
                width="100">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间"
                width="100">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import signModel from '@/api/sign'
  import {formatTime} from '@/filters/moment'
  import fillZero from '@/util/fillZero'

  export default {
    data() {
      return {
        prCode: '',
        contractCode: '',
        prData: [],
        contractData: [],
        matchData: [],
        intentionData: [],
        radio: null,
        radio1: null,
        orderData: [],
        serverData: [],
        serverDialogVisible: false,
        serverDialogForm: {
          serverName: '',
          acceptRequire: '',
          remark: ''
        },
        serverRules: {
          serverName: [{
            required: true,
            message: '请输入服务名称',
            trigger: 'blur'
          }],
          acceptRequire: [{
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
        dialogVisible: false
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

        signModel.getPr({
          pr: prCode
        }).then((res) => {
          const {data} = res
          if (!data) {
            this.$message.warning('采购申请号不存在！')
            return
          }
          const {dataMap} = data
          this.prData.push(dataMap)
          console.log(this.prData)
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
        signModel.getMatch({
          pr,
          contractNo: this.contractCode
        }).then((res) => {
          console.log(res)
          const data = res.data.dataMap
          const {intentionContVos, materialsMatchVoList} = data
          this.intentionData = intentionContVos
          this.dialogVisible = true
          this.contractData = materialsMatchVoList
          this.matchData = this.getSource(materialsMatchVoList)
        })
      },
      getSource(data) {
        const result = []
        const materialList = data
        this.prData.forEach((singlePr) => {
          const {pr, purOrderMaterialsList = []} = singlePr
          purOrderMaterialsList.forEach((prGood) => {
            const {itemNo, materialName, materialCode} = prGood
            const result1 = this.matchCode(materialCode, materialList)
            if (result1.length) {
              result.push({pr, itemNo, materialCode, materialName})
              result1.forEach((item) => {
                result.push(item)
              })
            }
          })
        })
        console.log(result)
        return result
      },
      matchCode(code, materialList) {
        const result = []
        materialList.some((material) => {
          const {materialCode} = material
          if (code === materialCode) {
            const {contVos} = material
            contVos.forEach((item) => {
              result.push(item)
            })
            return true
          }
          return false
        })
        return result
      },
      getInfo() {
        if (!this.radio) {
          this.$message.warning('请选择一项！')
          return
        }
        this.dialogVisible = false
        const {contractCode} = this.matchData[this.radio]
        console.log(contractCode, this.prData)
      },
      addService() {
        this.serverDialogVisible = true
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
      }
    },
    filters: {
      formatTime
    }
  }
</script>
